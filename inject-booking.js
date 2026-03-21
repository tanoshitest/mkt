const fs = require('fs');

const MODAL_HTML = `
<!-- ═══ BOOKING MODAL ═══ -->
<div id="booking-modal">
  <button class="bm-close" id="bm-close-btn">&#x2715;</button>
  <div class="bm-inner">
    <div class="bm-left">
      <div class="bm-service-card">
        <div class="bm-service-brand">MKT &middot; Premium Custom</div>
        <div class="bm-service-name">Private Consultation</div>
        <div class="bm-service-dur">45 &ndash; 60 Minutes</div>
        <div class="bm-service-loc">
          <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><path d="M6 0C3.239 0 1 2.239 1 5c0 3.75 5 9 5 9s5-5.25 5-9c0-2.761-2.239-5-5-5zm0 7a2 2 0 110-4 2 2 0 010 4z" fill="currentColor" opacity=".7"/></svg>
          Ho Chi Minh City, Vietnam
        </div>
      </div>
      <div class="bm-summary" id="bm-summary" style="display:none">
        <div class="bm-summary-row"><div class="bm-summary-label">Date</div><div class="bm-summary-value" id="bm-summary-date">&mdash;</div></div>
        <div class="bm-summary-row"><div class="bm-summary-label">Time</div><div class="bm-summary-value" id="bm-summary-time">&mdash;</div></div>
      </div>
    </div>
    <div class="bm-right">
      <div class="bm-step active" id="bm-step-1">
        <div class="bm-step-heading">Select a Date</div>
        <div class="bm-step-sub">Available: Thursday &mdash; Sunday</div>
        <div class="bm-cal-header">
          <button class="bm-cal-nav" id="bm-cal-prev">&lsaquo;</button>
          <div class="bm-cal-month" id="bm-cal-month-label"></div>
          <button class="bm-cal-nav" id="bm-cal-next">&rsaquo;</button>
        </div>
        <div class="bm-cal-dow"><span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span></div>
        <div class="bm-cal-grid" id="bm-cal-grid"></div>
      </div>
      <div class="bm-step" id="bm-step-2">
        <div class="bm-step-heading">Select a Time</div>
        <div class="bm-step-sub">All times in Vietnam (GMT+7)</div>
        <div class="bm-time-grid" id="bm-time-grid">
          <button class="bm-time-btn" data-time="10:00 AM">10:00 AM</button>
          <button class="bm-time-btn" data-time="11:00 AM">11:00 AM</button>
          <button class="bm-time-btn" data-time="1:00 PM">1:00 PM</button>
          <button class="bm-time-btn" data-time="2:00 PM">2:00 PM</button>
          <button class="bm-time-btn" data-time="3:00 PM">3:00 PM</button>
          <button class="bm-time-btn" data-time="4:00 PM">4:00 PM</button>
          <button class="bm-time-btn" data-time="5:00 PM">5:00 PM</button>
          <button class="bm-time-btn" data-time="6:00 PM">6:00 PM</button>
        </div>
      </div>
      <div class="bm-step" id="bm-step-3">
        <div class="bm-step-heading">Your Details</div>
        <div class="bm-step-sub">We&rsquo;ll confirm your appointment shortly</div>
        <form class="bm-form" id="bm-booking-form">
          <div class="bm-form-row">
            <div class="bm-field"><label for="bm-name">Full Name</label><input type="text" id="bm-name" name="name" required placeholder="Your name"></div>
            <div class="bm-field"><label for="bm-phone">Phone / WhatsApp</label><input type="tel" id="bm-phone" name="phone" required placeholder="+84 ..."></div>
          </div>
          <div class="bm-field"><label for="bm-email">Email Address</label><input type="email" id="bm-email" name="email" placeholder="Optional"></div>
          <div class="bm-field"><label for="bm-note">Design Reference / Notes</label><textarea id="bm-note" name="note" placeholder="Describe your vision..."></textarea></div>
          <button type="submit" class="bm-btn-primary" style="width:100%;padding:18px;">Confirm Booking</button>
        </form>
        <div class="bm-confirm" id="bm-confirm">
          <div class="bm-confirm-check">&#x2713;</div>
          <div class="bm-confirm-title">Appointment Requested</div>
          <p class="bm-confirm-msg">Thank you. Our team will contact you within 24 hours to confirm your appointment.</p>
        </div>
      </div>
    </div>
  </div>
  <div class="bm-footer" id="bm-footer">
    <div class="bm-step-ind">
      <span class="bm-step-num" id="bm-footer-num">01 / 03</span>
      <span class="bm-step-lbl" id="bm-footer-lbl">Select Date</span>
    </div>
    <div class="bm-footer-btns">
      <button class="bm-btn-secondary" id="bm-back-btn" style="display:none">Back</button>
      <button class="bm-btn-primary" id="bm-next-btn" disabled>Next &rarr;</button>
    </div>
  </div>
</div>`;

const MODAL_CSS = `
  /* BOOKING MODAL */
  #booking-modal{position:fixed;inset:0;z-index:9500;background:rgba(4,4,4,0.96);display:flex;flex-direction:column;opacity:0;visibility:hidden;transition:opacity .4s,visibility .4s;}
  #booking-modal.open{opacity:1;visibility:visible;}
  .bm-inner{display:flex;flex:1;overflow:hidden;height:100%;}
  .bm-left{width:360px;min-width:360px;background:#0d0d0d;border-right:1px solid rgba(65,105,225,.12);display:flex;flex-direction:column;padding:48px 36px;gap:28px;}
  .bm-service-card{border:1px solid rgba(65,105,225,.15);padding:24px 20px;display:flex;flex-direction:column;gap:12px;}
  .bm-service-brand{font-size:11px;letter-spacing:.2em;color:var(--gold);text-transform:uppercase;}
  .bm-service-name{font-size:22px;font-weight:300;color:var(--white);line-height:1.2;}
  .bm-service-dur{font-size:11px;letter-spacing:.12em;color:var(--gray);text-transform:uppercase;}
  .bm-service-loc{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--gray-light);}
  .bm-summary{display:flex;flex-direction:column;gap:16px;margin-top:auto;}
  .bm-summary-row{display:flex;flex-direction:column;gap:4px;border-bottom:1px solid rgba(65,105,225,.08);padding-bottom:14px;}
  .bm-summary-label{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--gray);}
  .bm-summary-value{font-size:17px;font-weight:300;color:var(--white);}
  .bm-right{flex:1;overflow-y:auto;display:flex;flex-direction:column;padding:48px 60px 0;}
  .bm-step{display:none;flex-direction:column;flex:1;}
  .bm-step.active{display:flex;}
  .bm-step-heading{font-size:clamp(22px,2.8vw,36px);font-weight:300;color:var(--white);margin-bottom:6px;}
  .bm-step-sub{font-size:10px;letter-spacing:.15em;text-transform:uppercase;color:var(--gray);margin-bottom:34px;}
  .bm-cal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;}
  .bm-cal-month{font-size:18px;font-weight:300;color:var(--white);letter-spacing:.05em;}
  .bm-cal-nav{background:none;border:1px solid rgba(65,105,225,.2);color:var(--gold);width:32px;height:32px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;transition:border-color .2s,background .2s;}
  .bm-cal-nav:hover{border-color:var(--gold);background:rgba(65,105,225,.06);}
  .bm-cal-dow{display:grid;grid-template-columns:repeat(7,40px);gap:4px;margin-bottom:6px;}
  .bm-cal-dow span{width:40px;height:20px;display:flex;align-items:center;justify-content:center;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--gray);}
  .bm-cal-grid{display:grid;grid-template-columns:repeat(7,40px);gap:4px;}
  .bm-day{width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:300;cursor:pointer;background:none;border:1px solid transparent;color:var(--white);transition:border-color .2s,color .2s,background .2s;}
  .bm-day:hover:not(.disabled):not(.selected){border-color:rgba(65,105,225,.5);}
  .bm-day.disabled{opacity:.2;cursor:default;pointer-events:none;}
  .bm-day.selected{border-color:var(--gold);color:var(--gold);}
  .bm-day.today{border-color:rgba(65,105,225,.3);}
  .bm-day.empty{pointer-events:none;}
  .bm-time-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(110px,1fr));gap:10px;margin-top:8px;}
  .bm-time-btn{background:none;border:1px solid rgba(65,105,225,.2);color:var(--white);font-family:var(--sans);font-size:13px;font-weight:300;letter-spacing:.08em;padding:14px 10px;cursor:pointer;transition:border-color .2s,color .2s,background .2s;text-align:center;}
  .bm-time-btn:hover{border-color:var(--gold);color:var(--gold);background:rgba(65,105,225,.04);}
  .bm-time-btn.selected{border-color:var(--gold);color:var(--gold);background:rgba(65,105,225,.06);}
  .bm-form{display:flex;flex-direction:column;gap:0;}
  .bm-form-row{display:grid;grid-template-columns:1fr 1fr;gap:0 28px;}
  .bm-field{display:flex;flex-direction:column;margin-bottom:24px;}
  .bm-field label{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--gray);margin-bottom:8px;}
  .bm-field input,.bm-field textarea{background:transparent;border:none;border-bottom:1px solid rgba(65,105,225,.25);color:var(--white);font-family:var(--sans);font-size:14px;font-weight:300;padding:10px 0;outline:none;transition:border-color .2s;resize:none;}
  .bm-field input:focus,.bm-field textarea:focus{border-bottom-color:var(--gold);}
  .bm-field textarea{min-height:72px;}
  .bm-confirm{display:none;flex-direction:column;align-items:center;justify-content:center;flex:1;text-align:center;gap:18px;padding:60px 0;}
  .bm-confirm.show{display:flex;}
  .bm-confirm-check{width:64px;height:64px;border:2px solid var(--gold);border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:22px;color:var(--gold);}
  .bm-confirm-title{font-size:28px;font-weight:300;color:var(--white);}
  .bm-confirm-msg{font-size:14px;color:var(--gray-light);line-height:1.7;max-width:360px;}
  .bm-footer{border-top:1px solid rgba(65,105,225,.1);padding:22px 60px;display:flex;justify-content:space-between;align-items:center;flex-shrink:0;}
  .bm-step-ind{display:flex;align-items:baseline;gap:12px;}
  .bm-step-num{font-size:26px;font-weight:300;color:var(--gold);}
  .bm-step-lbl{font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:var(--gray);}
  .bm-footer-btns{display:flex;gap:12px;}
  .bm-btn-secondary{background:none;border:1px solid rgba(65,105,225,.35);color:var(--gold);font-family:var(--sans);font-size:10px;letter-spacing:.2em;text-transform:uppercase;padding:14px 28px;cursor:pointer;transition:border-color .2s,background .2s;}
  .bm-btn-secondary:hover{border-color:var(--gold);background:rgba(65,105,225,.06);}
  .bm-btn-primary{background:var(--gold);border:1px solid var(--gold);color:#080808;font-family:var(--sans);font-size:10px;letter-spacing:.2em;text-transform:uppercase;padding:14px 28px;cursor:pointer;transition:opacity .2s;}
  .bm-btn-primary:disabled{opacity:.3;cursor:default;}
  .bm-btn-primary:not(:disabled):hover{opacity:.85;}
  .bm-close{position:absolute;top:22px;right:28px;background:none;border:none;color:var(--gray);font-size:20px;cursor:pointer;z-index:10;width:44px;height:44px;display:flex;align-items:center;justify-content:center;transition:color .2s;}
  .bm-close:hover{color:var(--white);}
  @media(max-width:768px){.bm-left{display:none;}.bm-right{padding:32px 24px 0;}.bm-footer{padding:18px 24px;}.bm-cal-dow,.bm-cal-grid{grid-template-columns:repeat(7,minmax(34px,1fr));}.bm-day{width:34px;height:34px;font-size:11px;}.bm-cal-dow span{width:34px;}}`;

const MODAL_JS = `<script>
(function(){
  var modal=document.getElementById('booking-modal');
  if(!modal)return;
  var closeBtn=document.getElementById('bm-close-btn');
  var nextBtn=document.getElementById('bm-next-btn');
  var backBtn=document.getElementById('bm-back-btn');
  var footerNum=document.getElementById('bm-footer-num');
  var footerLbl=document.getElementById('bm-footer-lbl');
  var calGrid=document.getElementById('bm-cal-grid');
  var calMonthLbl=document.getElementById('bm-cal-month-label');
  var calPrev=document.getElementById('bm-cal-prev');
  var calNext=document.getElementById('bm-cal-next');
  var timeGrid=document.getElementById('bm-time-grid');
  var bookForm=document.getElementById('bm-booking-form');
  var confirmDiv=document.getElementById('bm-confirm');
  var summaryBox=document.getElementById('bm-summary');
  var summaryDate=document.getElementById('bm-summary-date');
  var summaryTime=document.getElementById('bm-summary-time');
  var bm_footer=document.getElementById('bm-footer');
  var currentStep=1,selectedDate=null,selectedTime=null,calViewDate=new Date();
  calViewDate.setDate(1);
  var MONTHS=['January','February','March','April','May','June','July','August','September','October','November','December'];
  var AVAIL=[4,5,6,0];
  function openBooking(){currentStep=1;selectedDate=null;selectedTime=null;var now=new Date();calViewDate=new Date(now.getFullYear(),now.getMonth(),1);renderCal();goStep(1);modal.classList.add('open');document.body.style.overflow='hidden';}
  function closeBooking(){modal.classList.remove('open');document.body.style.overflow='';}
  function goStep(n){
    currentStep=n;
    document.querySelectorAll('.bm-step').forEach(function(s){s.classList.remove('active');});
    var s=document.getElementById('bm-step-'+n);if(s)s.classList.add('active');
    footerNum.textContent='0'+n+' / 03';
    footerLbl.textContent=['Select Date','Select Time','Your Details'][n-1];
    backBtn.style.display=(n>1)?'':'none';
    if(n===3){nextBtn.style.display='none';summaryBox.style.display='flex';bm_footer.style.display='';if(selectedDate)summaryDate.textContent=selectedDate.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});if(selectedTime)summaryTime.textContent=selectedTime;}
    else{nextBtn.style.display='';nextBtn.disabled=(n===1)?!selectedDate:!selectedTime;summaryBox.style.display='none';bm_footer.style.display='';}
  }
  function renderCal(){
    var y=calViewDate.getFullYear(),m=calViewDate.getMonth();
    calMonthLbl.textContent=MONTHS[m]+' '+y;
    var today=new Date();today.setHours(0,0,0,0);
    var first=new Date(y,m,1).getDay(),dim=new Date(y,m+1,0).getDate();
    calGrid.innerHTML='';
    for(var i=0;i<first;i++){var e=document.createElement('div');e.className='bm-day empty';calGrid.appendChild(e);}
    for(var d=1;d<=dim;d++){
      var dd=new Date(y,m,d);dd.setHours(0,0,0,0);
      var btn=document.createElement('button');btn.textContent=d;btn.className='bm-day';btn.dataset.ts=dd.getTime();
      var avail=AVAIL.indexOf(dd.getDay())!==-1&&dd>=today;
      if(!avail){btn.classList.add('disabled');}
      else{if(dd.getTime()===today.getTime())btn.classList.add('today');if(selectedDate&&dd.getTime()===selectedDate.getTime())btn.classList.add('selected');btn.addEventListener('click',function(e){selectedDate=new Date(parseInt(e.currentTarget.dataset.ts));renderCal();nextBtn.disabled=false;});}
      calGrid.appendChild(btn);
    }
  }
  calPrev.addEventListener('click',function(){calViewDate.setMonth(calViewDate.getMonth()-1);var t=new Date();var f=new Date(t.getFullYear(),t.getMonth(),1);if(calViewDate<f)calViewDate=f;renderCal();});
  calNext.addEventListener('click',function(){calViewDate.setMonth(calViewDate.getMonth()+1);renderCal();});
  timeGrid.querySelectorAll('.bm-time-btn').forEach(function(b){b.addEventListener('click',function(){timeGrid.querySelectorAll('.bm-time-btn').forEach(function(x){x.classList.remove('selected');});b.classList.add('selected');selectedTime=b.dataset.time;nextBtn.disabled=false;});});
  nextBtn.addEventListener('click',function(){if(currentStep<3)goStep(currentStep+1);});
  backBtn.addEventListener('click',function(){if(currentStep>1)goStep(currentStep-1);});
  bookForm.addEventListener('submit',function(e){e.preventDefault();bookForm.style.display='none';confirmDiv.classList.add('show');bm_footer.style.display='none';});
  closeBtn.addEventListener('click',closeBooking);
  modal.addEventListener('click',function(e){if(e.target===modal)closeBooking();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&modal.classList.contains('open'))closeBooking();});
  document.querySelectorAll('.nav-cta').forEach(function(el){if(el.textContent.trim().toUpperCase().indexOf('BOOK')!==-1){el.addEventListener('click',function(e){e.preventDefault();openBooking();});}});
  ['menu-book-btn','footer-book-btn','ql-book-btn'].forEach(function(id){var el=document.getElementById(id);if(el)el.addEventListener('click',function(e){e.preventDefault();openBooking();});});
  window.openBooking=openBooking;
})();
</script>`;

const files = ['index.html','brand.html','events.html','store.html','contact.html','collection.html','pricing.html','collection-mscotik.html','collection-mcelestial.html','collection-mrisingstar.html','collection-knot.html','collection-kethereality.html','collection-kharmonics.html','collection-kboutegon.html'];

files.forEach(function(file) {
  let html = fs.readFileSync(file, 'utf8');

  if (html.includes('id="booking-modal"')) {
    console.log('SKIP (already has modal):', file);
    return;
  }

  // 1. Inject CSS before last </style>
  const styleClose = html.lastIndexOf('</style>');
  if (styleClose !== -1) {
    html = html.slice(0, styleClose) + MODAL_CSS + '\n</style>' + html.slice(styleClose + 8);
  }

  // 2. Inject HTML + JS before </body>
  html = html.replace('</body>', MODAL_HTML + '\n' + MODAL_JS + '\n</body>');

  // 3. Fix nav-cta href — make it href="#" so it won't navigate
  html = html.replace(/<a href="contact\.html" class="nav-cta">/g, '<a href="#" class="nav-cta">');
  html = html.replace(/<a href="#contact" class="nav-cta">/g, '<a href="#" class="nav-cta">');

  fs.writeFileSync(file, html);
  console.log('Done:', file);
});
