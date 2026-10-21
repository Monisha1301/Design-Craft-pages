(function(){
'use strict';
const SITE={name:'StyleNest',a:'Style',b:'Nest',tag:'Fashion & Lifestyle'};
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>Array.from(r.querySelectorAll(s));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const money=n=>'₹'+Math.round(n).toLocaleString('en-IN');
const debounce=(fn,ms)=>{let t;return(...a)=>{clearTimeout(t);t=setTimeout(()=>fn(...a),ms)}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const store={get(k,d){try{const v=localStorage.getItem('sn_'+k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem('sn_'+k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem('sn_'+k)}catch(e){}}};
const validEmail=e=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);
function toast(msg,type,link){let r=$('#toast-root');if(!r){r=document.createElement('div');r.id='toast-root';r.setAttribute('role','status');r.setAttribute('aria-live','polite');document.body.appendChild(r)}
 const t=document.createElement('div');t.className='toast '+(type||'');t.innerHTML=esc(msg)+(link?'<a href="'+link[1]+'">'+esc(link[0])+'</a>':'');r.appendChild(t);setTimeout(()=>{t.style.opacity='0';t.style.transition='opacity .3s';setTimeout(()=>t.remove(),320)},3500)}
function setBusy(b,on,label){if(!b)return;if(on){b.dataset.l=b.innerHTML;b.disabled=true;b.innerHTML='<span class="spinner"></span> '+(label||'Please wait...')}else{b.disabled=false;b.innerHTML=b.dataset.l||b.innerHTML}}
function fieldErr(inp,msg){inp.classList.toggle('invalid',!!msg);let e=inp.parentElement.querySelector('.error');if(!e){e=document.createElement('div');e.className='error';e.setAttribute('role','alert');inp.insertAdjacentElement('afterend',e)}e.textContent=msg||''}
function openModal(id){const m=document.getElementById(id);if(m){m.classList.add('open');const f=$('input,select,textarea',m);if(f)setTimeout(()=>f.focus(),60)}}
function closeModal(id){const m=document.getElementById(id);if(m)m.classList.remove('open')}
document.addEventListener('keydown',e=>{if(e.key==='Escape')$$('.backdrop.open').forEach(m=>m.classList.remove('open'))});
document.addEventListener('click',e=>{if(e.target.classList&&e.target.classList.contains('backdrop'))e.target.classList.remove('open');const c=e.target.closest('[data-close]');if(c)closeModal(c.getAttribute('data-close'));const o=e.target.closest('[data-open]');if(o){e.preventDefault();openModal(o.getAttribute('data-open'))}});
function openNamedTab(url,name){const w=window.open(url,name);if(w){try{w.focus()}catch(e){}}return w}

/* ---------- product data (made up, generated the same way every time) ---------- */
let seed=11;const rnd=()=>{seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff};
const BRANDS=['Urbanite','Northwind','Aurelia','Kestrel','Marlow','Cobalt & Co','Fable','Juniper','Oakline','Veda','Atlas Wear','Birch & Bloom','Dune','Ember','Gather','Harbor','Indigo Row','Linen Lane','Pine & Pearl','Quill','Saffron Lane','Tidal','Willow','Zephyr'];
const COLORS=[['Navy','#1e3a5f'],['Black','#1f2937'],['White','#e5e7eb'],['Olive','#5f6b3a'],['Maroon','#7f1d1d'],['Sky Blue','#38a3d6'],['Mustard','#d9a521'],['Grey','#9ca3af'],['Teal','#0f766e'],['Rose','#e11d48'],['Beige','#c9b18a'],['Indigo','#4338ca']];
const TYPE_LABEL={tshirt:'T-Shirts',shirt:'Shirts',jeans:'Jeans',dress:'Dresses',hoodie:'Hoodies',sneaker:'Sneakers',sandal:'Sandals'};
const TYPES={men:[['tshirt','Crew Neck Cotton T-Shirt',499],['tshirt','Printed Slim Fit T-Shirt',599],['shirt','Slim Fit Check Shirt',899],['shirt','Regular Fit Linen Shirt',1199],['jeans','Slim Fit Stretch Jeans',1499],['hoodie','Zip-Up Fleece Hoodie',1699]],
 women:[['dress','Floral Print Midi Dress',1399],['dress','A-Line Cotton Dress',1099],['tshirt','Relaxed Fit Cotton Top',549],['jeans','High Rise Skinny Jeans',1599],['hoodie','Oversized Graphic Hoodie',1499],['shirt','Striped Poplin Shirt',999]],
 kids:[['tshirt','Cartoon Print T-Shirt',349],['dress','Party Wear Frock',899],['hoodie','Soft Fleece Hoodie',799],['jeans','Elastic Waist Jeans',699],['shirt','Cotton Casual Shirt',599]],
 footwear:[['sneaker','Lace-Up Running Sneakers',1999],['sneaker','Canvas Casual Sneakers',1299],['sandal','Cushioned Flip Flops',499],['sandal','Strappy Flat Sandals',899],['sneaker','High Top Sneakers',2299]]};
const CAT_LABEL={men:'Men',women:'Women',kids:'Kids',footwear:'Footwear',sale:'Sale',new:'New Arrivals',all:'All Products'};
const SIZES={men:['S','M','L','XL','XXL'],women:['XS','S','M','L','XL'],kids:['2-3Y','4-5Y','6-7Y','8-9Y'],footwear:['6','7','8','9','10','11']};
const OFFS=[15,20,25,30,40,45,50,55,60];
const PRODUCTS=[];
(function(){let n=0;[['men',24],['women',24],['kids',18],['footwear',24]].forEach(([cat,count])=>{const T=TYPES[cat];for(let i=0;i<count;i++){const t=T[i%T.length],col=COLORS[Math.floor(rnd()*COLORS.length)],brand=BRANDS[Math.floor(rnd()*BRANDS.length)];
 const mrp=Math.round(t[2]*(1.5+rnd()*.6)/10)*10,off=OFFS[Math.floor(rnd()*OFFS.length)],price=Math.round(mrp*(100-off)/100);
 const sizes=SIZES[cat].map(s=>({s,ok:rnd()>.18}));if(!sizes.some(x=>x.ok))sizes[0].ok=true;
 PRODUCTS.push({id:'SN'+(1001+n),brand,title:t[1],cat,type:t[0],color:col[0],hex:col[1],mrp,price,off,rating:+(3.3+rnd()*1.6).toFixed(1),reviews:Math.floor(20+rnd()*900),isNew:n%5===0,oos:n%19===7,sizes});n++}})})();
const byId=id=>PRODUCTS.find(p=>p.id===id);

/* ---------- product pictures drawn in code ---------- */
function mix(hex,pct){const n=parseInt(hex.slice(1),16);let r=n>>16,g=n>>8&255,b=n&255;const t=pct<0?0:255,p=Math.abs(pct)/100;r=Math.round(r+(t-r)*p);g=Math.round(g+(t-g)*p);b=Math.round(b+(t-b)*p);return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)}
let aid=0;
function drawArt(type,hex,variant){variant=variant||0;const sh=mix(hex,-28),bg=mix(hex,88),id='a'+(++aid);let body='';
 const tee='M92 70 L130 52 Q150 72 170 52 L208 70 L255 118 L222 148 L204 128 L204 330 L96 330 L96 128 L78 148 L45 118 Z';
 if(type==='tshirt')body=`<path d="${tee}" fill="${hex}"/><path d="M130 52 Q150 78 170 52" fill="none" stroke="${sh}" stroke-width="6"/><path d="M96 128 L96 330" stroke="${sh}" stroke-opacity=".25" stroke-width="2"/>`;
 else if(type==='shirt')body=`<path d="${tee}" fill="${hex}"/><path d="M130 52 L150 92 L118 76 Z" fill="#fff" opacity=".92"/><path d="M170 52 L150 92 L182 76 Z" fill="#fff" opacity=".92"/><line x1="150" y1="92" x2="150" y2="330" stroke="${sh}" stroke-width="2"/>${[120,165,210,255,300].map(y=>`<circle cx="150" cy="${y}" r="3.5" fill="${sh}"/>`).join('')}<rect x="168" y="140" width="28" height="32" fill="none" stroke="${sh}" stroke-width="2"/>`;
 else if(type==='jeans')body=`<path d="M100 50 H200 L212 345 H162 L150 140 L138 345 H88 Z" fill="${hex}"/><path d="M100 50 H200 V72 H100 Z" fill="${sh}"/><path d="M150 72 V140" stroke="${sh}" stroke-width="2"/><path d="M108 90 Q130 118 140 98" fill="none" stroke="${sh}" stroke-width="2"/><path d="M192 90 Q170 118 160 98" fill="none" stroke="${sh}" stroke-width="2"/>`;
 else if(type==='dress')body=`<path d="M118 52 Q150 84 182 52 L196 140 L248 340 H52 L104 140 Z" fill="${hex}"/><path d="M104 140 H196" stroke="${sh}" stroke-width="5"/><path d="M118 52 Q150 84 182 52" fill="none" stroke="${sh}" stroke-width="4"/>`;
 else if(type==='hoodie')body=`<path d="M88 82 L130 62 Q150 100 170 62 L212 82 L262 304 L230 316 L204 194 L204 342 L96 342 L96 194 L70 316 L38 304 Z" fill="${hex}"/><path d="M118 58 Q150 16 182 58 Q168 94 150 100 Q132 94 118 58Z" fill="${sh}"/><path d="M110 252 H190 L198 292 H102 Z" fill="${sh}" opacity=".5"/><line x1="140" y1="104" x2="140" y2="150" stroke="#fff" stroke-width="3"/><line x1="160" y1="104" x2="160" y2="150" stroke="#fff" stroke-width="3"/>`;
 else if(type==='sneaker')body=`<path d="M30 272 H282 Q292 272 290 284 Q282 304 250 304 H52 Q28 304 30 272Z" fill="#fff" stroke="#d1d5db"/><path d="M38 272 Q34 202 96 198 L150 172 Q182 198 240 216 Q286 230 286 264 V272 Z" fill="${hex}"/><path d="M214 216 Q286 228 286 264 V272 H226 Z" fill="${sh}" opacity=".45"/>${[0,1,2,3].map(i=>`<line x1="${112+i*18}" y1="${196-i*6}" x2="${130+i*18}" y2="${182-i*6}" stroke="#fff" stroke-width="4"/>`).join('')}<path d="M38 272 Q36 232 60 220" fill="none" stroke="${sh}" stroke-width="4"/>`;
 else body=`<path d="M40 284 Q150 252 270 284 Q292 300 270 314 Q150 336 40 314 Q20 300 40 284Z" fill="${hex}"/><path d="M104 276 Q150 196 196 276" fill="none" stroke="${sh}" stroke-width="14" stroke-linecap="round"/><path d="M128 272 Q150 232 172 272" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="5"/>`;
 let vb='0 0 300 400',tr='';if(variant===1)tr=' transform="translate(300,0) scale(-1,1)"';if(variant===2)vb='55 45 190 250';if(variant===3)tr=' transform="rotate(-8 150 200)"';
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${esc(type)} in colour"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${bg}"/><stop offset="1" stop-color="${mix(hex,70)}"/></linearGradient></defs><rect x="-50" y="-50" width="400" height="500" fill="url(#${id})"/><g${tr}>${body}</g></svg>`}
/* ---------- real photos, NO key needed ----------
   Dresses: real dress photos from Unsplash (free licence).
   Shirts, sneakers, sandals: live product photos from the free DummyJSON demo shop.
   T-shirts, jeans, hoodies: keyword photos from LoremFlickr (Creative Commons Flickr photos).
   Optional upgrade: a free Pexels key (https://www.pexels.com/api/) gives matched live photos for every type.
   Paste it below, or open the site once with ?pexels=YOUR_KEY at the end of the address.
   A drawn picture is used only if a photo cannot load. Add ?photos=0 to the address for drawings only, ?photos=1 for photos again. ---------- */
const PEXELS_KEY='';
const FREE_DRESS=['photo-1777888766761-6af980dc6ef6','photo-1625832954356-6ddaffc45853','photo-1605597342939-540527a23636','photo-1760328249113-31c07547aea8','photo-1705580655802-d71968cd9b87','photo-1584646835188-0e0bac62df29','photo-1627418829655-10fff60e195a','photo-1602793778401-d5ddab8febd5'].map(id=>'https://images.unsplash.com/'+id+'?auto=format&fit=crop&crop=faces%2Cedges&w=480&h=640&q=70');
const SHOP_CAT={shirt:'mens-shirts',sneaker:'mens-shoes',sandal:'womens-shoes'};
const FLICKR_WORD={tshirt:'tshirt',shirt:'shirt',jeans:'jeans',dress:'dress',hoodie:'hoodie',sneaker:'sneakers',sandal:'sandals'};
const PHOTO_Q={tshirt:{q:'t-shirt flat lay',re:/t-?shirt|\btee\b|\btop\b|shirt/i},shirt:{q:'button up shirt on hanger',re:/shirt|blouse|collar/i},jeans:{q:'denim jeans folded',re:/jeans|denim|pants|trousers/i},dress:{q:'dress on hanger',re:/dress|gown|frock/i},hoodie:{q:'hoodie flat lay',re:/hoodie|sweatshirt|sweater|jacket/i},sneaker:{q:'sneakers shoes',re:/sneaker|shoe|trainer/i},sandal:{q:'sandals footwear',re:/sandal|slipper|flip|shoe/i}};
const BLANK='data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';
const POOL={};let poolReady=false,USE_PHOTOS=true,KEY='';
try{const q=new URLSearchParams(location.search);const pq=q.get('photos');if(pq==='0'||pq==='1')sessionStorage.setItem('sn_photos',pq);if(sessionStorage.getItem('sn_photos')==='0')USE_PHOTOS=false;
 const k=q.get('pexels');if(k)localStorage.setItem('sn_pexels',k);KEY=PEXELS_KEY||localStorage.getItem('sn_pexels')||''}catch(e){}
function hash(t){let h=7;for(let i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))>>>0;return h}
function flickrUrl(type,hex,v){return 'https://loremflickr.com/480/640/'+(FLICKR_WORD[type]||'clothing')+'?lock='+((hash(type+hex)%900)+1+v*1000)}
function freeUrl(type,hex,v){return type==='dress'?FREE_DRESS[(hash(type+hex)+v*7)%FREE_DRESS.length]:flickrUrl(type,hex,v)}
function poolUrl(type,hex,v){const l=POOL[type];return l&&l.length?l[(hash(type+hex)+v*7)%l.length]:null}
const needsFetch=type=>KEY?!!PHOTO_Q[type]:!!SHOP_CAT[type];
const isCut=u=>/dummyjson\.com/.test(u);
function art(type,hex,variant){variant=variant||0;if(!USE_PHOTOS)return drawArt(type,hex,variant);
 let url=poolUrl(type,hex,variant),wait=false;
 if(!url&&needsFetch(type)&&!poolReady){wait=true;url=BLANK}else if(!url)url=freeUrl(type,hex,variant);
 return `<img class="ph${isCut(url)?' cut':''}" loading="lazy" decoding="async" alt="${esc(type)} photo" src="${url}"${wait?' data-wait="1"':''} data-type="${type}" data-hex="${hex}" data-v="${variant}">`}
function hydrate(){$$('img.ph[data-wait]').forEach(i=>{const t=i.dataset.type,h=i.dataset.hex,v=+i.dataset.v||0,u=poolUrl(t,h,v)||freeUrl(t,h,v);i.removeAttribute('data-wait');i.classList.toggle('cut',isCut(u));i.src=u})}
async function loadPool(){if(!USE_PHOTOS){poolReady=true;return}
 const mode=KEY||'free';
 try{const c=store.get('pool3',null);
  if(c&&c.p&&c.k===mode&&Date.now()-c.t<864e5){Object.assign(POOL,c.p)}
  else{
   const jobs=KEY?Object.entries(PHOTO_Q).map(([t,d])=>fetch('https://api.pexels.com/v1/search?query='+encodeURIComponent(d.q)+'&per_page=40&orientation=portrait',{headers:{Authorization:KEY}}).then(r=>r.json()).then(j=>{const all=(j.photos||[]).filter(x=>x&&x.src),good=all.filter(x=>d.re.test(x.alt||'')),pick=good.length>=6?good:all;POOL[t]=pick.map(x=>(x.src.original||x.src.large)+'?auto=compress&cs=tinysrgb&fit=crop&w=480&h=640')}).catch(()=>{}))
    :Object.entries(SHOP_CAT).map(([t,cat])=>fetch('https://dummyjson.com/products/category/'+cat+'?limit=30&select=title,images').then(r=>r.json()).then(j=>{POOL[t]=(j.products||[]).flatMap(p=>p.images||[]).filter(u=>/^https:\/\//.test(u))}).catch(()=>{}));
   await Promise.race([Promise.all(jobs),sleep(4000)]);
   if(Object.values(POOL).some(l=>l&&l.length))store.set('pool3',{t:Date.now(),k:mode,p:POOL})}}catch(e){}
 poolReady=true;hydrate()}
document.addEventListener('error',e=>{const t=e.target;if(t&&t.tagName==='IMG'&&t.classList.contains('ph')&&!t.dataset.wait){const d=document.createElement('div');d.innerHTML=drawArt(t.dataset.type,t.dataset.hex,+t.dataset.v||0);t.replaceWith(d.firstChild)}},true);
loadPool();
function pcard(p){const w=Wish.has(p.id);return `<article class="pc" data-id="${p.id}" data-testid="product-card"><div class="img"><a class="imglink" href="product.html?id=${p.id}" aria-label="${esc(p.brand+' '+p.title)}">${art(p.type,p.hex)}</a>${p.oos?'<span class="tag oos">SOLD OUT</span>':p.isNew?'<span class="tag new">NEW</span>':p.off>=50?'<span class="tag">'+p.off+'% OFF</span>':''}<button class="heart" type="button" data-wish="${p.id}" aria-pressed="${w}" aria-label="Add to wishlist">${w?'♥':'♡'}</button><button class="quick" type="button" data-quick="${p.id}">QUICK VIEW</button></div><div class="meta"><div class="brand">${esc(p.brand)}<a class="newtab" href="product.html?id=${p.id}" target="_blank" aria-label="Open in a new tab">↗</a></div><a class="title" style="display:block" href="product.html?id=${p.id}">${esc(p.title)}</a><div class="rate">★ ${p.rating} (${p.reviews})</div><div class="price">${money(p.price)}<s>${money(p.mrp)}</s><b>${p.off}% OFF</b></div></div></article>`}
const skeletons=n=>Array(n).fill('<div class="sk-card"><div class="img skeleton"></div><div class="l skeleton" style="width:50%"></div><div class="l skeleton" style="width:80%"></div></div>').join('');

/* ---------- stores: wishlist, bag, orders, account ---------- */
const Wish={all:()=>store.get('wish',[]),has:id=>Wish.all().includes(id),toggle(id){let a=Wish.all();const on=!a.includes(id);a=on?a.concat(id):a.filter(x=>x!==id);store.set('wish',a);renderCounts();return on}};
const Cart={items:()=>store.get('bag',[]),save(a){store.set('bag',a);renderCounts()},
 add(id,size,qty){const a=Cart.items(),ex=a.find(i=>i.id===id&&i.size===size);qty=qty||1;if(ex)ex.qty+=qty;else a.push({id,size,qty});Cart.save(a)},
 remove(id,size){Cart.save(Cart.items().filter(i=>!(i.id===id&&i.size===size)))},
 setQty(id,size,q){Cart.save(Cart.items().map(i=>i.id===id&&i.size===size?Object.assign({},i,{qty:Math.max(1,Math.min(10,q))}):i))},
 clear(){Cart.save([])},count:()=>Cart.items().reduce((s,i)=>s+i.qty,0)};
const COUPONS={STYLE10:{label:'10% off up to ₹300 (min ₹999)',min:999,fn:s=>Math.min(300,Math.round(s*.10))},NEST20:{label:'20% off up to ₹600 (min ₹1999)',min:1999,fn:s=>Math.min(600,Math.round(s*.20))},FREESHIP:{label:'Free delivery',min:0,fn:()=>0,ship:true}};
function applyCoupon(code,sub){const c=COUPONS[(code||'').trim().toUpperCase()];if(!c)return{ok:false,msg:'This code is invalid or has expired.'};if(sub<c.min)return{ok:false,msg:'Add items worth '+money(c.min-sub)+' more to use this code.'};return{ok:true,amount:c.fn(sub),ship:!!c.ship,msg:code.toUpperCase()+' applied: '+c.label}}
function pricing(items,coupon,opt){opt=opt||{};let mrp=0,sub=0;items.forEach(i=>{const p=byId(i.id);if(p){mrp+=p.mrp*i.qty;sub+=p.price*i.qty}});
 const disc=mrp-sub;let cd=0,freeShip=false;if(coupon){const r=applyCoupon(coupon,sub);if(r.ok){cd=r.amount;freeShip=r.ship}}
 let ship=sub>=999||freeShip||!items.length?0:79;if(opt.express)ship+=99;const cod=opt.cod?40:0;
 return{mrp,disc,sub,cd,ship,cod,total:Math.max(0,sub-cd+ship+cod),count:items.reduce((s,i)=>s+i.qty,0)}}
const STAGES=[['Order placed','We have received your order',0],['Packed','Your items are packed',15],['Shipped','Handed over to the courier',40],['Out for delivery','Arriving today',75],['Delivered','Delivered to your address',120]];
const DEMO_ORDERS=()=>{const now=Date.now(),D=864e5;return[{id:'SN-10458',created:now-9*D,items:['Slim Fit Check Shirt','Lace-Up Running Sneakers'],total:2897,fixed:4},{id:'SN-10459',created:now-2*D,items:['Floral Print Midi Dress'],total:1049,fixed:2},{id:'SN-10462',created:now-3600e3,items:['Zip-Up Fleece Hoodie'],total:1274,fixed:1},{id:'SN-10431',created:now-21*D,items:['High Rise Skinny Jeans'],total:1199,fixed:4},{id:'SN-10417',created:now-34*D,items:['Cartoon Print T-Shirt','Soft Fleece Hoodie'],total:1049,fixed:4},{id:'SN-10402',created:now-41*D,items:['Canvas Casual Sneakers'],total:974,fixed:-1},{id:'SN-10388',created:now-52*D,items:['Strappy Flat Sandals'],total:674,fixed:4}]};
const Orders={mine:()=>store.get('orders',[]),all(){const m=Orders.mine();return DEMO_ORDERS().filter(d=>!m.some(x=>x.id===d.id)).concat(m)},
 create(items,total){const id='SN-'+(10500+Math.floor(Math.random()*8999));const o={id,created:Date.now(),items:items.map(i=>byId(i.id).title),total};const a=Orders.mine();a.unshift(o);store.set('orders',a);return o},
 stage(o){if(o.fixed!==undefined)return o.fixed;if(o.cancelled)return-1;const age=(Date.now()-o.created)/1000;let s=0;STAGES.forEach((x,i)=>{if(age>=x[2])s=i});return s}};
const Auth={user:()=>store.get('user',null),set(u){u?store.set('user',u):store.del('user');renderAuth()},logout(){Auth.set(null);toast('You have been logged out')}};
function requireLogin(msg){if(Auth.user())return true;toast(msg||'Please log in to continue');openModal('login-modal');return false}
function renderCounts(){[['#bag-count',Cart.count()],['#wish-count',Wish.all().length]].forEach(([s,n])=>{const e=$(s);if(e){e.textContent=n;e.hidden=!n}})}
function renderAuth(){const u=Auth.user(),g=$('#auth-guest'),a=$('#auth-user');if(!g||!a)return;g.hidden=!!u;a.hidden=!u;if(u)$('#user-name').textContent=u.name.split(' ')[0];document.dispatchEvent(new CustomEvent('sn:auth',{detail:u}))}

/* ---------- page shell: top bar, header, menu, footer, pop-ups ---------- */
function megaFor(c){const types=[...new Set(TYPES[c].map(t=>t[0]))];const tops=BRANDS.slice(0,6);
 return `<div class="mega"><div><h5>Shop by type</h5>${types.map(t=>`<a href="category.html?c=${c}&type=${t}">${TYPE_LABEL[t]}</a>`).join('')}</div><div><h5>Popular brands</h5>${tops.map(b=>`<a href="category.html?c=${c}&brand=${encodeURIComponent(b)}">${esc(b)}</a>`).join('')}</div><div><h5>Explore</h5><a href="category.html?c=${c}">View all ${CAT_LABEL[c]}</a><a href="category.html?c=sale">Sale picks</a><a href="category.html?c=new">New arrivals</a></div></div>`}
function shell(){
 if(document.body.hasAttribute('data-bare'))return;
 const top=`<div class="topbar"><div class="container"><div class="links"><a href="stores.html" id="top-stores">📍 Store locator</a><a href="help.html#app" id="top-app">📱 Get the app</a></div><div class="offer">New users: extra 15% off with code STYLE15 <span class="timer" id="promo-timer">03:20:00</span></div><div class="links"><a href="orders.html" id="top-track">📦 Track order</a><a href="help.html" id="top-help">Help</a></div></div></div>`;
 const hdr=`<header class="hdr"><div class="hdr-main"><form class="search" id="search-form" role="search" autocomplete="off"><span class="ic">🔍</span><input id="search-input" type="search" placeholder="Search for brands, products and more" aria-label="Search"><div class="suggest" id="suggest" hidden></div></form><a class="logo" href="index.html" id="logo-link">${SITE.a}<span>${SITE.b}</span><small>${SITE.tag}</small></a><div class="actions"><a class="act" href="wishlist.html" id="wish-link" aria-label="Wishlist">♡ <span class="badge" id="wish-count" hidden>0</span></a><a class="act" href="bag.html" id="bag-link" aria-label="Bag">🛍 Bag <span class="badge" id="bag-count" hidden>0</span></a><span id="auth-guest"><button class="act" id="btn-login" type="button" data-open="login-modal">👤 Login</button></span><span id="auth-user" hidden style="display:flex;gap:10px;align-items:center"><b id="user-name">User</b><button class="act" id="btn-logout" type="button">Logout</button></span></div></div>
 <nav class="nav" aria-label="Main"><ul><li class="sale"><a href="category.html?c=sale" id="nav-sale">Sale</a></li><li><a href="category.html?c=new" id="nav-new">New Arrivals</a></li>${['men','women','kids','footwear'].map(c=>`<li><a href="category.html?c=${c}" id="nav-${c}">${CAT_LABEL[c]}</a>${megaFor(c)}</li>`).join('')}<li><a href="brands.html" id="nav-brands">Brands</a></li></ul></nav></header>`;
 const foot=`<footer id="site-footer"><div class="container"><div class="fgrid"><div><div class="logo" style="text-align:left;color:#fff">${SITE.a}<span>${SITE.b}</span></div><p style="margin:12px 0;max-width:290px">Everyday fashion for men, women and kids. Free delivery over ₹999 and easy 15-day returns.</p><form class="news" id="news-form" novalidate><input class="input" id="news-email" type="email" placeholder="Your email" aria-label="Email"><button class="btn accent sm" id="news-btn" type="submit">Join</button></form><div class="ok" id="news-msg"></div><div class="error" id="news-err"></div></div><div><h5>Shop</h5><ul><li><a href="category.html?c=men" id="f-men">Men</a></li><li><a href="category.html?c=women" id="f-women">Women</a></li><li><a href="category.html?c=kids" id="f-kids">Kids</a></li><li><a href="category.html?c=footwear" id="f-footwear">Footwear</a></li><li><a href="brands.html" id="f-brands">All brands</a></li></ul></div><div><h5>Help</h5><ul><li><a href="help.html" id="f-help">Help centre</a></li><li><a href="orders.html" id="f-orders">Track order</a></li><li><a href="help.html#returns" id="f-returns">Returns &amp; refunds</a></li><li><a href="stores.html" id="f-stores">Store locator</a></li></ul></div><div><h5>Account</h5><ul><li><a href="wishlist.html" id="f-wish">Wishlist</a></li><li><a href="bag.html" id="f-bag">Bag</a></li><li><a href="orders.html" id="f-myorders">My orders</a></li></ul></div><div><h5>Policies</h5><ul><li><a href="help.html#terms" id="f-terms">Terms of use</a></li><li><a href="help.html#privacy" id="f-privacy">Privacy policy</a></li><li><a href="help.html#shipping" id="f-shipping">Shipping</a></li></ul></div></div><div class="fbottom"><span id="copyright">© <span id="year">2026</span> ${SITE.name}. A practice shop with made-up brands and products.</span><span>🔒 Secure payments · UPI · Cards · Cash on delivery</span>${USE_PHOTOS?(KEY?'<span id="photo-credit">Photos by <a href="https://www.pexels.com" target="_blank" rel="noopener">Pexels</a></span>':'<span id="photo-credit">Photos: <a href="https://unsplash.com" target="_blank" rel="noopener">Unsplash</a>, Flickr, DummyJSON</span>'):''}</div></div></footer>`;
 const modals=`<div class="backdrop" id="login-modal" role="dialog" aria-modal="true" aria-labelledby="login-title"><div class="modal"><button class="x" type="button" data-close="login-modal" aria-label="Close">✕</button><h3 id="login-title">Welcome back</h3><p class="sub">Log in to see your orders and wishlist.</p><form id="login-form" novalidate><div class="field"><label for="login-email">Email</label><input class="input" id="login-email" type="email" placeholder="you@example.com"></div><div class="field"><label for="login-password">Password</label><input class="input" id="login-password" type="password" placeholder="Your password"></div><label class="check" style="margin-bottom:12px"><input type="checkbox" id="show-pass"> Show password</label><button class="btn block" id="login-submit" type="submit">LOG IN</button><div class="error" id="login-msg" role="alert" style="text-align:center"></div><p style="text-align:center;margin-top:12px">New here? <a href="#" data-open="signup-modal" onclick="SN.closeModal('login-modal')"><b>Create an account</b></a></p></form></div></div>
 <div class="backdrop" id="signup-modal" role="dialog" aria-modal="true" aria-labelledby="signup-title"><div class="modal"><button class="x" type="button" data-close="signup-modal" aria-label="Close">✕</button><h3 id="signup-title">Create your account</h3><p class="sub">Get 15% off your first order with STYLE15.</p><form id="signup-form" novalidate><div class="field"><label for="signup-name">Full name</label><input class="input" id="signup-name"></div><div class="field"><label for="signup-email">Email</label><input class="input" id="signup-email" type="email"><div class="hint" id="signup-email-status" role="status"></div></div><div class="row"><div class="field"><label for="signup-password">Password</label><input class="input" id="signup-password" type="password"></div><div class="field"><label for="signup-confirm">Confirm</label><input class="input" id="signup-confirm" type="password"></div></div><label class="check" style="margin-bottom:6px"><input type="checkbox" id="signup-terms"><span>I agree to the <a href="help.html#terms" target="_blank"><b>Terms of use</b></a></span></label><div class="error" id="signup-terms-err" role="alert" style="margin-bottom:10px"></div><button class="btn block" id="signup-submit" type="submit">CREATE ACCOUNT</button></form></div></div>
 <div class="backdrop" id="quick-modal" role="dialog" aria-modal="true" aria-label="Quick view"><div class="modal wide"><button class="x" type="button" data-close="quick-modal" aria-label="Close">✕</button><div id="quick-body"></div></div></div><div id="toast-root" role="status" aria-live="polite"></div>`;
 document.body.insertAdjacentHTML('afterbegin',top+hdr);document.body.insertAdjacentHTML('beforeend',foot+modals);
}
function initShell(){
 const y=$('#year');if(y)y.textContent=new Date().getFullYear();
 const t=$('#promo-timer');if(t){let end=store.get('promoEnd',0);if(!end||end<Date.now()){end=Date.now()+3*3600e3+20*60e3;store.set('promoEnd',end)}const tick=()=>{let s=Math.max(0,Math.floor((end-Date.now())/1000));t.textContent=String(Math.floor(s/3600)).padStart(2,'0')+':'+String(Math.floor(s%3600/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};tick();setInterval(tick,1000)}
 const p=location.pathname.split('/').pop()||'index.html',c=new URLSearchParams(location.search).get('c');
 $$('.nav>ul>li>a').forEach(a=>{const h=a.getAttribute('href');if((p==='category.html'&&h==='category.html?c='+c)||(h===p&&p!=='category.html'))a.classList.add('active')});
 $('#btn-logout').addEventListener('click',()=>Auth.logout());
 /* wishlist hearts + quick view, everywhere */
 document.addEventListener('click',e=>{const h=e.target.closest('[data-wish]');if(h){e.preventDefault();const on=Wish.toggle(h.dataset.wish);$$('[data-wish="'+h.dataset.wish+'"]').forEach(x=>{x.setAttribute('aria-pressed',on);x.textContent=on?'♥':'♡'});toast(on?'Saved to wishlist':'Removed from wishlist',on?'success':'',on?['View wishlist','wishlist.html']:null);return}
  const q=e.target.closest('[data-quick]');if(q){e.preventDefault();quickView(q.dataset.quick)}});
 /* newsletter */
 $('#news-form').addEventListener('submit',async e=>{e.preventDefault();const i=$('#news-email');$('#news-msg').textContent='';$('#news-err').textContent='';if(!validEmail(i.value.trim())){$('#news-err').textContent='Please enter a valid email.';return}const b=$('#news-btn');setBusy(b,true,'Joining...');await sleep(1200);setBusy(b,false);$('#news-msg').textContent='✓ Welcome! Your code STYLE15 is on its way.';i.value=''});
 initSearch();initAuth();renderCounts();renderAuth();
}
function quickView(id){const p=byId(id);if(!p)return;let size=null;const b=$('#quick-body');
 b.innerHTML=`<div class="row" style="gap:22px;align-items:start"><div class="main-img" style="aspect-ratio:3/4">${art(p.type,p.hex)}</div><div><div style="font-weight:800">${esc(p.brand)}</div><h3 id="qv-title" style="margin:2px 0 8px">${esc(p.title)}</h3><div class="pdp-price"><b>${money(p.price)}</b><s>${money(p.mrp)}</s><span>${p.off}% OFF</span></div><div class="lbl">Colour: ${esc(p.color)}</div><div class="lbl" style="margin-top:10px">Select size</div><div class="sizes" id="qv-sizes">${p.sizes.map(s=>`<button class="size" type="button" data-s="${s.s}" aria-pressed="false" ${s.ok&&!p.oos?'':'disabled'}>${s.s}</button>`).join('')}</div><div class="error" id="qv-err" role="alert"></div><div style="display:flex;gap:10px;margin-top:16px"><button class="btn accent" id="qv-add" type="button" ${p.oos?'disabled':''}>ADD TO BAG</button><a class="btn ghost" id="qv-full" href="product.html?id=${p.id}">FULL DETAILS</a></div></div></div>`;
 $('#qv-sizes').addEventListener('click',e=>{const x=e.target.closest('.size');if(!x||x.disabled)return;size=x.dataset.s;$$('#qv-sizes .size').forEach(s=>s.setAttribute('aria-pressed',s===x));$('#qv-err').textContent=''});
 $('#qv-add').addEventListener('click',async e=>{if(!size){$('#qv-err').textContent='Please select a size.';return}const btn=e.currentTarget;setBusy(btn,true,'Adding...');await sleep(700);setBusy(btn,false);Cart.add(p.id,size,1);closeModal('quick-modal');toast('Added to bag','success',['View bag','bag.html'])});
 openModal('quick-modal')}
/* ---------- search with suggestions ---------- */
function searchAll(raw){const q=raw.trim().toLowerCase();if(!q)return null;const cats=Object.keys(CAT_LABEL).filter(c=>c!=='all'&&CAT_LABEL[c].toLowerCase().includes(q)).map(c=>({label:CAT_LABEL[c],to:'category.html?c='+c,n:PRODUCTS.filter(p=>c==='sale'?p.off>=40:c==='new'?p.isNew:p.cat===c).length}));
 const brands=BRANDS.filter(b=>b.toLowerCase().includes(q)).slice(0,4).map(b=>({label:b,to:'category.html?c=all&brand='+encodeURIComponent(b),n:PRODUCTS.filter(p=>p.brand===b).length}));
 const prods=PRODUCTS.filter(p=>(p.title+' '+p.brand+' '+p.color+' '+p.type).toLowerCase().includes(q)).slice(0,6).map(p=>({label:p.title,sub:p.brand,to:'product.html?id='+p.id}));return{cats,brands,prods}}
const hl=(t,q)=>{const i=t.toLowerCase().indexOf(q.toLowerCase());return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+q.length))+'</mark>'+esc(t.slice(i+q.length))};
function initSearch(){const inp=$('#search-input'),box=$('#suggest'),form=$('#search-form');let idx=-1,tok=0;
 const run=debounce(async()=>{const q=inp.value.trim();idx=-1;if(q.length<2){box.hidden=true;return}const my=++tok;box.hidden=false;box.innerHTML='<div class="none" id="suggest-loading">Searching...</div>';await sleep(600);if(my!==tok)return;
  const r=searchAll(q);const part=(h,arr,f)=>arr.length?'<div class="grp">'+h+'</div>'+arr.map(f).join(''):'';
  const html=part('Categories',r.cats,x=>`<a href="${x.to}" data-suggest>${hl(x.label,q)}<span>${x.n} items</span></a>`)+part('Brands',r.brands,x=>`<a href="${x.to}" data-suggest>${hl(x.label,q)}<span>${x.n} items</span></a>`)+part('Products',r.prods,x=>`<a href="${x.to}" data-suggest>${hl(x.label,q)}<span>${esc(x.sub)}</span></a>`);
  box.innerHTML=html||'<div class="none" id="suggest-none">No matches for "'+esc(q)+'"</div>'},300);
 inp.addEventListener('input',run);
 inp.addEventListener('keydown',e=>{const items=$$('a[data-suggest]',box);if(e.key==='ArrowDown'){e.preventDefault();idx=Math.min(items.length-1,idx+1)}else if(e.key==='ArrowUp'){e.preventDefault();idx=Math.max(0,idx-1)}else if(e.key==='Escape'){box.hidden=true;return}else return;items.forEach((a,i)=>a.classList.toggle('on',i===idx))});
 form.addEventListener('submit',e=>{e.preventDefault();const q=inp.value.trim();const on=$$('a[data-suggest].on',box)[0];if(on){location.href=on.getAttribute('href');return}if(q)location.href='category.html?c=all&q='+encodeURIComponent(q)});
 document.addEventListener('click',e=>{if(!e.target.closest('#search-form'))box.hidden=true})}
/* ---------- login and sign-up ---------- */
function initAuth(){
 $('#login-form').addEventListener('submit',async e=>{e.preventDefault();const em=$('#login-email'),pw=$('#login-password'),b=$('#login-submit');let bad=false;
  if(!validEmail(em.value.trim())){fieldErr(em,'Enter a valid email.');bad=true}else fieldErr(em,'');if(pw.value.length<6){fieldErr(pw,'Password must be at least 6 characters.');bad=true}else fieldErr(pw,'');
  $('#login-msg').textContent='';if(bad)return;setBusy(b,true,'Signing in...');await sleep(1400);setBusy(b,false);
  if(pw.value==='wrongpass'){$('#login-msg').textContent='Incorrect email or password. Please try again.';return}
  const name=em.value.split('@')[0].replace(/[._-]+/g,' ').replace(/\b\w/g,c=>c.toUpperCase());Auth.set({name,email:em.value.trim()});closeModal('login-modal');toast('Welcome back, '+name.split(' ')[0]+'!','success');$('#login-form').reset()});
 $('#show-pass').addEventListener('change',e=>{$('#login-password').type=e.target.checked?'text':'password'});
 $('#signup-email').addEventListener('blur',async()=>{const v=$('#signup-email').value.trim(),s=$('#signup-email-status');s.textContent='';if(!validEmail(v))return;s.className='hint';s.textContent='Checking availability...';await sleep(800);if(v.toLowerCase()==='taken@stylenest.com'){s.className='error';s.textContent='This email is already registered. Try logging in.'}else{s.className='ok';s.textContent='✓ Email is available'}});
 $('#signup-form').addEventListener('submit',async e=>{e.preventDefault();const n=$('#signup-name'),em=$('#signup-email'),pw=$('#signup-password'),cf=$('#signup-confirm'),tm=$('#signup-terms'),b=$('#signup-submit');let bad=false;
  if(n.value.trim().length<2){fieldErr(n,'Please enter your full name.');bad=true}else fieldErr(n,'');
  if(!validEmail(em.value.trim())){fieldErr(em,'Enter a valid email.');bad=true}else if(em.value.trim().toLowerCase()==='taken@stylenest.com'){bad=true}else fieldErr(em,'');
  if(pw.value.length<6){fieldErr(pw,'Use at least 6 characters.');bad=true}else fieldErr(pw,'');if(cf.value!==pw.value){fieldErr(cf,'Passwords do not match.');bad=true}else fieldErr(cf,'');
  $('#signup-terms-err').textContent=tm.checked?'':'Please accept the Terms of use to continue.';if(!tm.checked)bad=true;if(bad)return;
  setBusy(b,true,'Creating account...');await sleep(1800);setBusy(b,false);Auth.set({name:n.value.trim(),email:em.value.trim()});closeModal('signup-modal');toast('Account created. Welcome to '+SITE.name+'!','success');$('#signup-form').reset()})}
window.addEventListener('storage',e=>{if(!e.key||!e.key.startsWith('sn_'))return;renderCounts();renderAuth();document.dispatchEvent(new CustomEvent('sn:storage',{detail:e.key}))});

/* ---------- slow mode: only when a test tool (Selenium) drives the browser ----------
   A person who opens the site normally sees NO delays (the page checks navigator.webdriver).
   BLOCK MODE (block:true): every click, typing, selection and page load is held for the time below, so Selenium's own commands take that long.
   WAIT MODE (block:false): the click returns at once and the result appears after the time (tests then need explicit waits).
   Milliseconds. Address switches (kept for the browser session): ?auto=1 force on, ?auto=0 force off, ?fast=1 everything off, ?block=0 wait mode, ?block=1 block mode.
   Set onlyAutomation:false to slow down every visitor. */
const LAT={click:3000,nav:3000,tab:3000,type:300,change:3000,load:1500,block:true,onlyAutomation:true};
(function(){
 let fast=false,block=LAT.block,auto=null;
 try{const q=new URLSearchParams(location.search);if(q.has('fast'))sessionStorage.setItem('sn_fast',q.get('fast'));if(q.has('block'))sessionStorage.setItem('sn_block',q.get('block'));if(q.has('auto'))sessionStorage.setItem('sn_auto',q.get('auto'));fast=sessionStorage.getItem('sn_fast')==='1';const bv=sessionStorage.getItem('sn_block');if(bv!==null)block=bv==='1';auto=sessionStorage.getItem('sn_auto')}catch(e){}
 const driven=navigator.webdriver===true;const active=auto==='1'?true:auto==='0'?false:(LAT.onlyAutomation?driven:true);if(!active)fast=true;
 if(!fast&&document.body){const bd=document.createElement('div');bd.id='sn-slow-badge';bd.setAttribute('aria-hidden','true');bd.textContent=block?'Slow mode on: actions are held':'Slow mode on: actions are delayed';bd.style.cssText='position:fixed;left:12px;bottom:12px;background:#0b0b0f;color:#fff;font:600 11px/1 sans-serif;padding:6px 10px;border-radius:99px;z-index:4000;opacity:.85;pointer-events:none';document.body.appendChild(bd)}
 let bar=null,replaying=false,dispatching=false;
 function hold(ms){const end=performance.now()+ms;while(performance.now()<end){}dispatching=true;setTimeout(()=>{dispatching=false},0)}
 if(block&&!fast&&LAT.load)hold(LAT.load);
 const T1='a[href],button,[role="button"],[role="tab"]',T2=T1+',input[type="checkbox"],input[type="radio"]';
 const TEXT='input[type="text"],input[type="email"],input[type="password"],input[type="search"],input[type="tel"],input[type="url"],input[type="number"],input:not([type]),textarea',CHG='select,input[type="file"],input[type="range"],input[type="color"]';
 function showBar(ms){if(!bar){bar=document.createElement('div');bar.id='sn-bar';bar.style.cssText='position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,#e11d48,#f59e0b);z-index:5000;opacity:0;pointer-events:none';document.body.appendChild(bar)}bar.style.transition='none';bar.style.width='0';bar.style.opacity='1';void bar.offsetWidth;bar.style.transition='width '+ms+'ms linear';bar.style.width='100%'}
 function hideBar(){if(bar)bar.style.opacity='0'}
 document.addEventListener('click',e=>{
  if(fast||replaying||!e.target.closest)return;
  const t=e.target.closest(block?T2:T1);if(!t||t.disabled||t.hasAttribute('data-instant'))return;
  const href=t.tagName==='A'?t.getAttribute('href'):null,isNav=!!href&&!/^(#|javascript:|mailto:|tel:)/i.test(href),blank=isNav&&t.target==='_blank';
  const ms=isNav?(blank?LAT.tab:LAT.nav):LAT.click;
  if(block){if(dispatching)return;hold(ms);return}
  if(t.matches('button[type="submit"],form button:not([type])'))return;
  if(t.getAttribute('aria-busy')==='true'){e.preventDefault();e.stopImmediatePropagation();return}
  e.preventDefault();e.stopImmediatePropagation();t.setAttribute('aria-busy','true');document.body.style.cursor='progress';showBar(ms);
  let w=null;if(blank){try{w=window.open('about:blank','_blank')}catch(x){}}
  setTimeout(()=>{t.removeAttribute('aria-busy');document.body.style.cursor='';hideBar();
   if(isNav){const url=t.href;if(blank){if(w){try{w.location.href=url}catch(x){window.open(url,'_blank')}}else window.open(url,'_blank')}else window.location.href=url;return}
   if(!t.isConnected)return;replaying=true;try{t.click()}finally{replaying=false}},ms)},true);
 if(block){document.addEventListener('input',e=>{if(fast)return;const t=e.target;if(t&&t.matches&&t.matches(TEXT))hold(LAT.type)},true);
  document.addEventListener('change',e=>{if(fast)return;const t=e.target;if(t&&t.matches&&t.matches(CHG))hold(LAT.change)},true);
  document.addEventListener('submit',e=>{if(fast||dispatching)return;hold(LAT.click)},true)}
})();

window.SN={SITE,LAT,$,$$,sleep,money,debounce,esc,store,toast,setBusy,fieldErr,validEmail,openModal,closeModal,openNamedTab,PRODUCTS,BRANDS,COLORS,TYPES,TYPE_LABEL,CAT_LABEL,SIZES,byId,art,drawArt,pcard,skeletons,Wish,Cart,Orders,Auth,STAGES,COUPONS,applyCoupon,pricing,requireLogin,renderCounts,quickView,searchAll};
shell();
document.addEventListener('DOMContentLoaded',()=>{if(!document.body.hasAttribute('data-bare'))initShell();document.dispatchEvent(new Event('sn:ready'))});
})();
