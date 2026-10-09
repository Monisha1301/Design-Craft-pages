(function(){
'use strict';
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const money=n=>'₹'+Number(n).toLocaleString('en-IN');
const debounce=(fn,ms)=>{let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms)}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={get(k,d){try{const v=localStorage.getItem('dc_'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('dc_'+k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem('dc_'+k)}catch(e){}}};

/* toast */
function toast(msg,type){let root=$('#toast-root');if(!root){root=document.createElement('div');root.id='toast-root';root.setAttribute('role','status');root.setAttribute('aria-live','polite');document.body.appendChild(root)}
 const t=document.createElement('div');t.className='toast '+(type||'');t.textContent=msg;root.appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(()=>t.remove(),320)},3500)}

/* modal helpers */
function openModal(id){const m=document.getElementById(id);if(m){m.classList.add('open');const f=$('input,select,textarea',m);if(f)setTimeout(()=>f.focus(),60)}}
function closeModal(id){const m=document.getElementById(id);if(m)m.classList.remove('open')}
function closeAll(){$$('.backdrop.open').forEach(m=>m.classList.remove('open'));closeCart()}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
document.addEventListener('click',e=>{if(e.target.classList&&e.target.classList.contains('backdrop'))e.target.classList.remove('open');const c=e.target.closest('[data-close]');if(c)closeModal(c.getAttribute('data-close'));const o=e.target.closest('[data-open]');if(o){e.preventDefault();openModal(o.getAttribute('data-open'))}});

/* logo renderer */
const ICONS={bolt:'M13 2 4 14h6l-1 8 9-12h-6z',star:'M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.3 5.9 20.6l1.4-6.8L2.2 9.1l6.9-.8z',shield:'M12 2l8 3v6c0 5-3.4 9.3-8 11-4.6-1.7-8-6-8-11V5z',heart:'M12 21s-8-5.3-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.7-8 11-8 11z',diamond:'M12 2l9 10-9 10L3 12z',hex:'M12 2l8.7 5v10L12 22l-8.7-5V7z',leaf:'M5 19C5 9 10 4 20 4c0 10-5 15-15 15zM5 19c2-5 5-8 9-10',wave:'M3 9c3-4 6 4 9 0s6 4 9 0v4c-3 4-6-4-9 0s-6 4-9 0z'};
const FONTS={grotesk:"'Space Grotesk',sans-serif",jakarta:"'Plus Jakarta Sans',sans-serif",serif:"Georgia,'Times New Roman',serif",mono:"'Courier New',monospace",round:"'Trebuchet MS',Verdana,sans-serif"};
let gid=0;
function logoSVG(o){o=Object.assign({name:'Your Brand',tagline:'',icon:'bolt',c1:'#4f46e5',c2:'#06b6d4',font:'grotesk',layout:'horizontal',iconSize:64,bg:'none',textColor:null},o||{});
 const id='g'+(++gid),name=esc(o.name||'Your Brand'),tag=esc(o.tagline||''),ff=FONTS[o.font]||FONTS.grotesk,p=ICONS[o.icon]||ICONS.bolt,s=+o.iconSize||64;
 const tc=o.textColor||(o.bg==='dark'?'#f8fafc':'#0f172a');const fs=Math.max(22,Math.min(40,420/Math.max(8,name.length)));
 const defs=`<defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${o.c1}"/><stop offset="1" stop-color="${o.c2}"/></linearGradient></defs>`;
 const bgRect=o.bg==='dark'?'<rect width="400" height="240" fill="#0f172a" rx="14"/>':o.bg==='light'?'<rect width="400" height="240" fill="#ffffff" rx="14"/>':'';
 const sc=s/24;let body='';
 if(o.layout==='stacked'){const x=200-s/2;body=`<g transform="translate(${x},${52}) scale(${sc})"><rect x="-3" y="-3" width="30" height="30" rx="8" fill="url(#${id})" opacity=".14"/><path d="${p}" fill="url(#${id})" stroke="url(#${id})" stroke-width="${o.icon==='leaf'?1.6:0}" stroke-linejoin="round"/></g>
  <text x="200" y="${60+s+30}" text-anchor="middle" font-family="${ff}" font-weight="800" font-size="${fs}" fill="${tc}">${name}</text>${tag?`<text x="200" y="${60+s+54}" text-anchor="middle" font-family="${ff}" font-size="13" fill="${tc}" opacity=".6" letter-spacing="2">${tag.toUpperCase()}</text>`:''}`}
 else if(o.layout==='emblem'){const r=Math.max(40,s*.8);body=`<circle cx="200" cy="${70+r*.4}" r="${r}" fill="url(#${id})"/><g transform="translate(${200-s/2*.8},${70+r*.4-s/2*.8}) scale(${sc*.8})"><path d="${p}" fill="#fff" stroke="#fff" stroke-width="${o.icon==='leaf'?1.6:0}" stroke-linejoin="round"/></g>
  <text x="200" y="${70+r*1.4+34}" text-anchor="middle" font-family="${ff}" font-weight="800" font-size="${fs*.9}" fill="${tc}">${name}</text>${tag?`<text x="200" y="${70+r*1.4+56}" text-anchor="middle" font-family="${ff}" font-size="12" fill="${tc}" opacity=".6" letter-spacing="2">${tag.toUpperCase()}</text>`:''}`}
 else{const bx=36,by=120-s/2-8;body=`<rect x="${bx}" y="${by}" width="${s+16}" height="${s+16}" rx="${Math.round(s*.28)}" fill="url(#${id})"/><g transform="translate(${bx+8},${by+8}) scale(${sc})"><path d="${p}" fill="#fff" stroke="#fff" stroke-width="${o.icon==='leaf'?1.6:0}" stroke-linejoin="round"/></g>
  <text x="${bx+s+34}" y="${tag?112:128}" font-family="${ff}" font-weight="800" font-size="${Math.min(fs,(400-bx-s-50)/Math.max(5,name.length)*1.75)}" fill="${tc}">${name}</text>${tag?`<text x="${bx+s+36}" y="138" font-family="${ff}" font-size="12" fill="${tc}" opacity=".6" letter-spacing="2">${tag.toUpperCase()}</text>`:''}`}
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 240" role="img" aria-label="${name} logo">${defs}${bgRect}${body}</svg>`}

/* catalog */
const CATALOG=[
['Brewline Cafe','food','leaf','#b45309','#f59e0b','serif',1499],['Crumb & Co','food','heart','#be123c','#f43f5e','round',1499],['Spice Route','food','star','#c2410c','#f59e0b','serif',1999],['Fresh Fork','food','leaf','#047857','#10b981','jakarta',1499],
['NovaStack','tech','bolt','#4f46e5','#06b6d4','grotesk',1999],['Pixelforge','tech','hex','#7c3aed','#06b6d4','mono',2499],['CloudNest','tech','wave','#0369a1','#38bdf8','jakarta',1999],['Datalume','tech','diamond','#4338ca','#a78bfa','grotesk',2499],
['Petal & Thread','fashion','heart','#be185d','#f9a8d4','serif',1999],['Urban Loom','fashion','diamond','#0f172a','#64748b','grotesk',1499],['Velvet Hour','fashion','star','#7e22ce','#f43f5e','serif',2499],['Linen Lane','fashion','leaf','#78716c','#a8a29e','round',1499],
['VitalPeak','health','shield','#047857','#06b6d4','jakarta',1999],['Calm Clinic','health','heart','#0e7490','#34d399','round',1499],['PulseCare','health','wave','#be123c','#fb7185','grotesk',1999],['Herbal Root','health','leaf','#166534','#84cc16','serif',1499],
['BrightPath','education','star','#1d4ed8','#fbbf24','round',1499],['Scholar Lane','education','shield','#4338ca','#06b6d4','serif',1999],['CodeNest Kids','education','hex','#f59e0b','#f43f5e','round',1499],['Lumen Academy','education','bolt','#0f766e','#38bdf8','jakarta',1999],
['Orbit Fitness','health','bolt','#dc2626','#f59e0b','grotesk',1999],['Harbor Legal','tech','shield','#1e293b','#475569','serif',2499],['Bloom Studio','fashion','leaf','#db2777','#f59e0b','round',1499],['Saffron Table','food','diamond','#b91c1c','#f59e0b','serif',1999]
].map((r,i)=>({id:i+1,name:r[0],cat:r[1],icon:r[2],c1:r[3],c2:r[4],font:r[5],price:r[6]}));

/* auth */
const auth={user:()=>store.get('user',null),
 set(u){u?store.set('user',u):store.del('user');renderAuth()},
 logout(){auth.set(null);toast('You have been logged out');}};
function renderAuth(){const u=auth.user();const g=$('#auth-guest'),a=$('#auth-user');if(!g||!a)return;g.hidden=!!u;a.hidden=!u;if(u){$('#user-name').textContent=u.name.split(' ')[0];$('#user-avatar').textContent=u.name.charAt(0).toUpperCase()}document.dispatchEvent(new CustomEvent('dc:auth',{detail:u}))}
function requireLogin(msg){if(auth.user())return true;toast(msg||'Please log in to continue','error');openModal('login-modal');return false}
function setBusy(btn,busy,label){if(!btn)return;if(busy){btn.dataset.l=btn.innerHTML;btn.disabled=true;btn.innerHTML='<span class="spinner"></span> '+(label||'Please wait...')}else{btn.disabled=false;btn.innerHTML=btn.dataset.l||btn.innerHTML}}
const validEmail=e=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
function fieldErr(input,msg){input.classList.toggle('invalid',!!msg);let e=input.parentElement.querySelector('.error');if(!e){e=document.createElement('div');e.className='error';e.setAttribute('role','alert');input.insertAdjacentElement('afterend',e)}e.textContent=msg||''}

function initAuth(){
 const lf=$('#login-form');if(lf)lf.addEventListener('submit',async e=>{e.preventDefault();const em=$('#login-email'),pw=$('#login-password'),btn=$('#login-submit');let bad=false;
  if(!validEmail(em.value.trim())){fieldErr(em,'Enter a valid email address.');bad=true}else fieldErr(em,'');
  if(pw.value.length<6){fieldErr(pw,'Password must be at least 6 characters.');bad=true}else fieldErr(pw,'');
  $('#login-msg').textContent='';if(bad)return;setBusy(btn,true,'Signing in...');await sleep(1400);setBusy(btn,false);
  if(pw.value==='wrongpass'){$('#login-msg').textContent='Incorrect email or password. Please try again.';return}
  const name=em.value.split('@')[0].replace(/[._-]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());auth.set({name,email:em.value.trim()});closeModal('login-modal');toast('Welcome back, '+name.split(' ')[0]+'!','success');lf.reset()});
 const sp=$('#show-pass');if(sp)sp.addEventListener('change',()=>{$('#login-password').type=sp.checked?'text':'password'});
 const fl=$('#forgot-link');if(fl)fl.addEventListener('click',e=>{e.preventDefault();$('#login-form').hidden=true;$('#forgot-form').hidden=false;$('#login-title').textContent='Reset password'});
 const bk=$('#back-login');if(bk)bk.addEventListener('click',e=>{e.preventDefault();$('#login-form').hidden=false;$('#forgot-form').hidden=true;$('#login-title').textContent='Welcome back'});
 const ff=$('#forgot-form');if(ff)ff.addEventListener('submit',async e=>{e.preventDefault();const em=$('#forgot-email');if(!validEmail(em.value.trim())){fieldErr(em,'Enter a valid email address.');return}fieldErr(em,'');const b=$('#forgot-submit');setBusy(b,true,'Sending...');await sleep(1300);setBusy(b,false);$('#forgot-msg').textContent='If an account exists for '+em.value.trim()+', a reset link is on its way.'});
 const se=$('#signup-email');if(se)se.addEventListener('blur',async()=>{const v=se.value.trim();const st=$('#signup-email-status');st.textContent='';if(!validEmail(v))return;st.className='hint';st.textContent='Checking availability...';await sleep(800);if(v.toLowerCase()==='taken@designcraft.com'){st.className='error';st.textContent='This email is already registered. Try logging in.'}else{st.className='ok';st.textContent='✓ Email is available'}});
 const spw=$('#signup-password');if(spw)spw.addEventListener('input',()=>{const v=spw.value;let sc=0;if(v.length>=8)sc++;if(/[A-Z]/.test(v))sc++;if(/[0-9]/.test(v))sc++;if(/[^A-Za-z0-9]/.test(v))sc++;const L=['Too short','Weak','Fair','Good','Strong'][v.length?sc:0]||'';const bar=$('#pw-bar');bar.style.width=(v.length?(sc||1)*25:0)+'%';bar.style.background=['#f43f5e','#f43f5e','#f59e0b','#10b981','#059669'][sc];$('#pw-label').textContent=v.length?'Strength: '+(v.length<6?'Too short':L):''});
 const sf=$('#signup-form');if(sf)sf.addEventListener('submit',async e=>{e.preventDefault();const n=$('#signup-name'),em=$('#signup-email'),pw=$('#signup-password'),cf=$('#signup-confirm'),tm=$('#signup-terms'),btn=$('#signup-submit');let bad=false;
  if(n.value.trim().length<2){fieldErr(n,'Please enter your full name.');bad=true}else fieldErr(n,'');
  if(!validEmail(em.value.trim())){$('#signup-email-status').textContent='';fieldErr(em,'Enter a valid email address.');bad=true}else if(em.value.trim().toLowerCase()==='taken@designcraft.com'){bad=true}else fieldErr(em,'');
  if(pw.value.length<6){fieldErr(pw,'Use at least 6 characters.');bad=true}else fieldErr(pw,'');
  if(cf.value!==pw.value){fieldErr(cf,'Passwords do not match.');bad=true}else fieldErr(cf,'');
  $('#signup-terms-err').textContent=tm.checked?'':'Please accept the Terms & Conditions to continue.';if(!tm.checked)bad=true;
  if(bad)return;setBusy(btn,true,'Creating account...');await sleep(1800);setBusy(btn,false);auth.set({name:n.value.trim(),email:em.value.trim(),role:$('#signup-role').value});closeModal('signup-modal');toast('Account created. Welcome to DesignCraft!','success');sf.reset();$('#pw-bar').style.width='0';$('#pw-label').textContent=''});
 const lo=$('#logout-btn');if(lo)lo.addEventListener('click',()=>auth.logout());
}

/* cart + orders */
const cart={items:()=>store.get('cart',[]),save(a){store.set('cart',a);renderCart()},
 add(it){const a=cart.items();if(a.some(x=>x.key===it.key)){toast('Already in your cart','error');return false}a.push(it);cart.save(a);toast(it.title+' added to cart','success');return true},
 remove(key){cart.save(cart.items().filter(x=>x.key!==key))},clear(){cart.save([])},total:()=>cart.items().reduce((s,x)=>s+x.price,0)};
function renderCart(){const a=cart.items();const c=$('#cart-count');if(c){c.textContent=a.length;c.hidden=!a.length}const body=$('#cart-body');if(!body)return;
 body.innerHTML=a.length?a.map(x=>`<div class="cart-item" data-key="${esc(x.key)}"><div class="thumb">${x.svg||'🎨'}</div><div class="meta"><b>${esc(x.title)}</b><span>${esc(x.note||'')}</span></div><div><div class="price">${money(x.price)}</div><button class="btn btn-sm btn-danger" data-rm="${esc(x.key)}" style="margin-top:4px;padding:3px 10px">Remove</button></div></div>`).join(''):'<div style="text-align:center;padding:50px 10px;color:#64748b"><div style="font-size:42px">🛒</div><p style="margin-top:8px">Your cart is empty</p></div>';
 $('#cart-total').textContent=money(cart.total());$('#checkout-btn').disabled=!a.length}
function openCart(){$('#cart-drawer').classList.add('open');$('#scrim').classList.add('open')}
function closeCart(){const d=$('#cart-drawer');if(d){d.classList.remove('open');$('#scrim').classList.remove('open')}}
const orders={all:()=>store.get('orders',[]),create(items,total){const id='DC-'+(10500+Math.floor(Math.random()*8999));const o={id,created:Date.now(),items:items.map(i=>i.title),total,live:true};const a=orders.all();a.unshift(o);store.set('orders',a);return o}};
const STAGES=[['Order placed','We have received your order',0],['Design review','Our team is checking your files',15],['In production','Your items are being prepared',40],['Dispatched','Handed over to the courier',75],['Delivered','Delivered to your address',120]];
function stageOf(o){if(o.fixed!==undefined)return o.fixed;if(o.cancelled)return -1;const age=(Date.now()-o.created)/1000;let s=0;STAGES.forEach((x,i)=>{if(age>=x[2])s=i});return s}
function initCart(){const d=$('#cart-btn');if(d)d.addEventListener('click',openCart);const sc=$('#scrim');if(sc)sc.addEventListener('click',closeCart);const cc=$('#cart-close');if(cc)cc.addEventListener('click',closeCart);
 const body=$('#cart-body');if(body)body.addEventListener('click',e=>{const b=e.target.closest('[data-rm]');if(b&&window.confirm('Remove this item from your cart?'))cart.remove(b.getAttribute('data-rm'))});
 const co=$('#checkout-btn');if(co)co.addEventListener('click',async()=>{if(!cart.items().length)return;if(!requireLogin('Log in to complete your purchase')){closeCart();return}setBusy(co,true,'Processing payment...');await sleep(2200);const items=cart.items(),total=cart.total();const o=orders.create(items,total);cart.clear();setBusy(co,false);closeCart();$('#order-id').textContent=o.id;$('#order-total').textContent=money(total);$('#order-track').href='orders.html?id='+o.id;openModal('order-modal')});
 renderCart()}

/* chat */
const REPLIES=[[/track|order|where/i,'You can follow any order on the Orders page using its ID (for example DC-10458). Want me to open it?'],[/price|cost|plan|pricing/i,'Our plans start at ₹1,499 for a single logo. The Growth Suite at ₹3,499 is the most popular. Use code LAUNCH20 for 20% off.'],[/refund|money back/i,'Digital logo packages can be refunded within 7 days if no final files were downloaded. See our Refund Policy for the full details.'],[/human|agent|person|call/i,'Sure! Our team is available 9am to 7pm IST on weekdays. You can also raise a ticket from the Help Centre and we will reply within a few hours.'],[/logo|design|brand/i,'Open the Logo Studio to design your logo live, or the Brand Kit tool to build colours and fonts for your brand.'],[/card|print/i,'Our Card Designer lets you pick paper, finishes and quantity with a live price. Delivery takes 3 to 6 working days.']];
function initChat(){const fab=$('#chat-fab'),box=$('#chat');if(!fab)return;const log=$('#chat-log');let greeted=false;
 const add=(t,who)=>{const m=document.createElement('div');m.className='msg '+who;m.textContent=t;log.appendChild(m);log.scrollTop=log.scrollHeight;return m};
 async function bot(text){const t=document.createElement('div');t.className='msg bot typing';t.id='chat-typing';t.innerHTML='<i></i><i></i><i></i>';log.appendChild(t);log.scrollTop=log.scrollHeight;await sleep(1300);t.remove();add(text,'bot')}
 fab.addEventListener('click',async()=>{box.classList.toggle('open');if(box.classList.contains('open')&&!greeted){greeted=true;await bot('Hi there! 👋 I am the DesignCraft assistant. How can I help you today?')}if(box.classList.contains('open'))$('#chat-input').focus()});
 $('#chat-close').addEventListener('click',()=>box.classList.remove('open'));
 async function send(txt){txt=txt.trim();if(!txt)return;add(txt,'me');const r=REPLIES.find(x=>x[0].test(txt));await bot(r?r[1]:'Thanks for your message! I have noted it. For anything detailed, please visit the Help Centre and raise a ticket.')}
 $('#chat-form').addEventListener('submit',e=>{e.preventDefault();const i=$('#chat-input');const v=i.value;i.value='';send(v)});
 $$('#chat-quick button').forEach(b=>b.addEventListener('click',()=>send(b.textContent)))}

/* misc shared */
function initPromo(){const t=$('#promo-timer');if(t){let end=store.get('promoEnd',0);if(!end||end<Date.now()){end=Date.now()+3*3600*1000+20*60*1000;store.set('promoEnd',end)}
 const tick=()=>{let s=Math.max(0,Math.floor((end-Date.now())/1000));const h=String(Math.floor(s/3600)).padStart(2,'0'),m=String(Math.floor(s%3600/60)).padStart(2,'0'),x=String(s%60).padStart(2,'0');t.textContent=h+':'+m+':'+x};tick();setInterval(tick,1000)}
 const c=$('#promo-copy');if(c)c.addEventListener('click',async()=>{try{await navigator.clipboard.writeText('LAUNCH20')}catch(e){}toast('Code LAUNCH20 copied','success')})}
function initNav(){const t=$('#nav-toggle');if(t)t.addEventListener('click',()=>$('.nav').classList.toggle('open'));
 const p=location.pathname.split('/').pop()||'index.html';$$('.nav a.nav-link').forEach(a=>{if(a.getAttribute('href')===p)a.classList.add('active')});
 $$('[data-top]').forEach(b=>b.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'})));
 const fy=$('#year');if(fy)fy.textContent=new Date().getFullYear()}
window.addEventListener('storage',e=>{if(!e.key||!e.key.startsWith('dc_'))return;renderCart();renderAuth();document.dispatchEvent(new CustomEvent('dc:storage',{detail:e.key}))});


/* click latency: every action takes a moment, so a test that does not wait still runs slowly and is easy to watch.
   BLOCK MODE (block:true): the page holds each click, typing, selection and page load for the time below, so Selenium's own commands take that long.
   WAIT MODE  (block:false): the click returns at once and the result appears after the time (tests then need explicit waits).
   Change the numbers (milliseconds). Add ?fast=1 to the address to switch everything off, ?fast=0 to switch on again, ?block=0 for wait mode, ?block=1 for block mode. */
const LAT={click:3000,nav:3000,tab:3000,type:300,change:3000,load:1500,block:true};
(function(){
 let fast=false,block=LAT.block;
 try{const q=new URLSearchParams(location.search);if(q.has('fast'))sessionStorage.setItem('dc_fast',q.get('fast'));if(q.has('block'))sessionStorage.setItem('dc_block',q.get('block'));fast=sessionStorage.getItem('dc_fast')==='1';const bv=sessionStorage.getItem('dc_block');if(bv!==null)block=bv==='1'}catch(e){}
 let bar=null,replaying=false,dispatching=false;
 function hold(ms){const end=performance.now()+ms;while(performance.now()<end){}dispatching=true;setTimeout(()=>{dispatching=false},0)}
 if(block&&!fast&&LAT.load)hold(LAT.load);
 const T1='a[href],button,[role="button"],[role="tab"]';
 const T2=T1+',input[type="checkbox"],input[type="radio"]';
 const TEXT='input[type="text"],input[type="email"],input[type="password"],input[type="search"],input[type="tel"],input[type="url"],input[type="number"],input:not([type]),textarea';
 const CHG='select,input[type="file"],input[type="range"],input[type="color"]';
 function showBar(ms){if(!bar){bar=document.createElement('div');bar.id='dc-bar';bar.style.cssText='position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,#4f46e5,#06b6d4);z-index:5000;opacity:0;pointer-events:none';document.body.appendChild(bar)}bar.style.transition='none';bar.style.width='0';bar.style.opacity='1';void bar.offsetWidth;bar.style.transition='width '+ms+'ms linear';bar.style.width='100%'}
 function hideBar(){if(bar)bar.style.opacity='0'}
 document.addEventListener('click',e=>{
  if(fast||replaying||!e.target.closest)return;
  const t=e.target.closest(block?T2:T1);
  if(!t||t.disabled||t.hasAttribute('data-instant'))return;
  const href=t.tagName==='A'?t.getAttribute('href'):null;
  const isNav=!!href&&!/^(#|javascript:|mailto:|tel:)/i.test(href);
  const blank=isNav&&t.target==='_blank';
  const ms=isNav?(blank?LAT.tab:LAT.nav):LAT.click;
  if(block){if(dispatching)return;hold(ms);return}
  if(t.matches('button[type="submit"],form button:not([type])'))return;
  if(t.getAttribute('aria-busy')==='true'){e.preventDefault();e.stopImmediatePropagation();return}
  e.preventDefault();e.stopImmediatePropagation();
  t.setAttribute('aria-busy','true');document.body.style.cursor='progress';showBar(ms);
  let w=null;if(blank){try{w=window.open('about:blank','_blank')}catch(x){}}
  setTimeout(()=>{
   t.removeAttribute('aria-busy');document.body.style.cursor='';hideBar();
   if(isNav){const url=t.href;if(blank){if(w){try{w.location.href=url}catch(x){window.open(url,'_blank')}}else window.open(url,'_blank')}else window.location.href=url;return}
   if(!t.isConnected)return;
   replaying=true;try{t.click()}finally{replaying=false}
  },ms);
 },true);
 if(block){
  document.addEventListener('input',e=>{if(fast)return;const t=e.target;if(t&&t.matches&&t.matches(TEXT))hold(LAT.type)},true);
  document.addEventListener('change',e=>{if(fast)return;const t=e.target;if(t&&t.matches&&t.matches(CHG))hold(LAT.change)},true);
  document.addEventListener('submit',e=>{if(fast||dispatching)return;hold(LAT.click)},true);
 }
})();

window.DC={LAT,$,$$,sleep,money,debounce,esc,store,toast,openModal,closeModal,logoSVG,CATALOG,ICONS,FONTS,auth,cart,orders,STAGES,stageOf,requireLogin,setBusy,validEmail,fieldErr};
document.addEventListener('DOMContentLoaded',()=>{initNav();initAuth();initCart();initChat();initPromo();renderAuth();document.dispatchEvent(new Event('dc:ready'))});
})();
