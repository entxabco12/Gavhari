// patch-demo-v3.js — اجرا: node patch-demo-v3.js  (داخل پوشه Gavhari)
const fs=require('fs');
const F='site/index.html';
if(!fs.existsSync(F)){console.error('site/index.html پیدا نشد؛ داخل پوشه Gavhari اجرا کنید');process.exit(1)}
let h=fs.readFileSync(F,'utf8');
if(!fs.existsSync(F+'.bak-before-v3'))fs.writeFileSync(F+'.bak-before-v3',h);
const CSS=String.raw`@keyframes ghIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
.page.active{animation:ghIn .35s ease both}
.topbar{background:linear-gradient(90deg,#04122c,#082554);backdrop-filter:blur(8px)}
.card{transition:transform .2s,border-color .2s,box-shadow .2s}
.card:hover{transform:translateY(-3px);border-color:#f5c51f;box-shadow:0 12px 26px #0006}
.sect{color:#f5c51f;font-size:20px;margin:30px 0 14px;display:flex;align-items:center;gap:10px}
.sect:before{content:"";width:5px;height:22px;border-radius:3px;background:#f5c51f}
.chips{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:0 0 14px}
.chip{border:1px solid #31517d;background:#102d59;color:#fff;border-radius:20px;padding:6px 13px;font-size:12px}
button.chip:hover{border-color:#f5c51f;color:#f5c51f}
.chip.count{background:#f5c51f;color:#071a38;border-color:#f5c51f;font-weight:bold}
.resbar{grid-column:1/-1;color:#b8c6df;font-size:13px}
.pc{padding:0;overflow:hidden;border-top:3px solid var(--cc,#f5c51f)}
.pc-vis{position:relative;height:118px;display:grid;place-items:center;font-size:50px;background:radial-gradient(circle at 50% 70%,#17407a,#071a38 72%)}.pc-vis:before{content:"";position:absolute;inset:0;background:var(--cc);opacity:.16}.pc-vis span{position:relative}
.pc-tag{position:absolute;top:8px;right:8px;font-style:normal;font-size:10px;background:#031127cc;border:1px solid var(--cc);color:#fff;border-radius:12px;padding:3px 9px}
.pc h3{margin:12px 14px 8px;font-size:14px;line-height:1.8;min-height:50px}
.pc-meta{list-style:none;margin:0 14px;padding:0;font-size:12px;color:#b8c6df}
.pc-meta li{display:flex;justify-content:space-between;gap:8px;padding:5px 0;border-bottom:1px dashed #24436d}
.pc-meta b{color:#8ea3c4;font-weight:normal}.pc-meta span{direction:ltr;text-align:left;overflow-wrap:anywhere}
.pc-foot{padding:12px 14px 14px;display:flex;flex-direction:column;gap:10px;margin-top:auto}
.pc-foot .price{font-size:17px}.pc-foot .price small{font-size:11px;color:#b8c6df}
.pc-actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.pc-actions .btn{padding:9px 8px;font-size:13px}
.category{border-right:4px solid var(--cc,#f5c51f);transition:transform .2s,border-color .2s}
.category:hover{transform:translateY(-2px);border-color:#f5c51f}
.detail-visual{font-size:110px}
#home .gh-quick{padding:22px 3% 6px;background:linear-gradient(180deg,#061a3b,#03132e);text-align:center}
.gh-qsearch{display:flex;max-width:720px;margin:0 auto 16px;background:#fff;border-radius:34px;padding:5px;box-shadow:0 14px 34px #0008}
.gh-qsearch input{flex:1;min-width:0;border:0;outline:0;background:transparent;padding:14px 20px;font-size:14px;color:#0b1f44}
.gh-qsearch button{border:0;border-radius:28px;background:#f5c51f;color:#071a38;font-weight:bold;padding:0 28px;font-size:15px}
.gh-chips{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin-bottom:18px}
.gh-chips button{border:1px solid var(--cc,#31517d);background:#0a2147;color:#fff;border-radius:22px;padding:8px 15px;font-size:12px;transition:.2s}
.gh-chips button:hover{background:var(--cc);color:#071a38}
.gh-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;max-width:860px;margin:0 auto 10px}
.gh-stats div{background:#0a2147;border:1px solid #24436d;border-radius:14px;padding:12px 6px}
.gh-stats b{display:block;font-size:22px;color:#f5c51f}.gh-stats span{font-size:11px;color:#b8c6df}
#home .gh-feat{padding:6px 3% 18px;background:#03132e}
#home .gh-car-list button{transition:.2s}
#home .gh-car-list button:hover{transform:translateY(-3px);box-shadow:0 8px 18px #0006}
#home .gh-address{text-decoration:none;color:#e9efff}
@media(max-width:800px){.gh-stats{grid-template-columns:repeat(2,1fr)}.gh-qsearch button{padding:0 18px}.sect{font-size:17px}}
@media(max-width:420px){.pc-vis{height:92px;font-size:40px}.pc h3{font-size:12px;margin:10px 10px 6px;min-height:44px}.pc-meta{margin:0 10px;font-size:11px}.pc-foot{padding:10px}.pc-actions{grid-template-columns:1fr}}
`;
const JS=String.raw`(function(){
'use strict';
var D=document;
function $(s,r){return (r||D).querySelector(s)}
function $$(s,r){return Array.prototype.slice.call((r||D).querySelectorAll(s))}
function esc(v){return String(v==null?'':v).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function nz(v){return String(v==null?'':v).toLowerCase()
  .replace(/[\u06f0-\u06f9]/g,function(c){return c.charCodeAt(0)-1776})
  .replace(/[\u0660-\u0669]/g,function(c){return c.charCodeAt(0)-1632})
  .replace(/[\u064a\u0649]/g,'\u06cc').replace(/\u0643/g,'\u06a9')
  .replace(/[\u200c\u200e\u200f]/g,' ').replace(/\s+/g,' ').trim()}

var CARRE={
  'پراید':/پراید/,'تیبا':/تیبا/,'ساینا':/ساینا/,'کوییک':/کوییک|کوئیک/,'شاهین':/شاهین/,
  'سمند سورن':/سمند|سورن/,'دنا':/دنا/,'پژو ۲۰۷':/207/,'پژو پارس':/پارس|405/,'رانا':/رانا/
};
var CATCOL={'کاسه‌نمد و آب‌بندی':'#3b82f6','لنت ترمز':'#ef4444','جلوبندی و دسته‌موتور':'#f59e0b','رادیاتور آب':'#06b6d4','کندانسور و بخاری':'#8b5cf6','کمک‌فنر':'#22c55e','رینگ موتور':'#eab308'};
var carFilter='';
var ALL='همه محصولات';
var AXIS={'جلو':1,'عقب':1,'کشفکی':1};

function catEm(c){var r=cats.filter(function(x){return x[0]===c})[0];return r?r[1]:'⚙️'}
function matchCar(p,car){if(!car)return true;var m=CARRE[car];return m?m.test(nz(p.name+' '+p.vehicle)):true}
function curCat(){return (selectedCat&&selectedCat!==ALL)?selectedCat:''}
function carBrand(car){return cars.indexOf(car)<5?'ایران‌خودرو':'سایپا'}
function brandOfCar(car){return ['پراید','تیبا','ساینا','کوییک','شاهین'].indexOf(car)>-1?'سایپا':'ایران‌خودرو'}

/* ---------- cards ---------- */
function productCard(p){
  var col=CATCOL[p.cat]||'#f5c51f';
  var lab=AXIS[p.vehicle]?'محور':'خودرو';
  return '<article class="card product pc" style="--cc:'+col+'">'+
    '<div class="pc-vis"><span>'+catEm(p.cat)+'</span><i class="pc-tag">'+esc(p.cat)+'</i></div>'+
    '<h3>'+esc(p.name)+'</h3>'+
    '<ul class="pc-meta"><li><b>کد فنی</b><span>'+esc(p.partCode||'—')+'</span></li>'+
    '<li><b>'+lab+'</b><span>'+esc(p.vehicle||'—')+'</span></li>'+
    (p.pack?'<li><b>در بسته</b><span>'+esc(p.pack)+'</span></li>':'')+'</ul>'+
    '<div class="pc-foot"><div class="price">'+fa(p.price)+' <small>تومان</small></div>'+
    '<div class="pc-actions"><button class="btn secondary" data-product="'+p.id+'">جزئیات</button>'+
    '<button class="btn" data-quick="'+p.id+'" aria-label="افزودن به سبد">+ سبد</button></div></div></article>';
};

/* ---------- search ---------- */
function searchList(q){
  var t=nz(q).split(' ').filter(Boolean);
  if(!t.length)return products.slice();
  return products.filter(function(p){var h=nz(p.name+' '+p.cat+' '+p.vehicle+' '+p.partCode);return t.every(function(x){return h.indexOf(x)>-1})});
}
function doSearch(q){
  var f=searchList(q);
  var inp=$('#searchInput');if(inp)inp.value=q;
  $('#searchResults').innerHTML=f.length?
    '<div class="resbar">'+fa(f.length)+' نتیجه برای «'+esc(q)+'»</div>'+f.map(productCard).join(''):
    '<div class="empty"><div class="emoji">🔍</div>نتیجه‌ای پیدا نشد.<br>نام قطعه یا کد فنی را ساده‌تر بنویسید.</div>';
  go('search');
}

/* ---------- products page ---------- */
function headText(){
  var c=curCat();
  var t=c?('قطعات '+c):'همه قطعات';
  if(carFilter)t+=' — '+carFilter;
  return t;
}
function renderProducts(){
  var q=($('#filterText')||{}).value||'';
  var s=($('#sortProducts')||{}).value||'default';
  var c=curCat();
  var tk=nz(q).split(' ').filter(Boolean);
  var arr=products.filter(function(p){
    if(c&&p.cat!==c)return false;
    if(!matchCar(p,carFilter))return false;
    if(!tk.length)return true;
    var h=nz(p.name+' '+p.cat+' '+p.vehicle+' '+p.partCode);
    return tk.every(function(x){return h.indexOf(x)>-1});
  });
  if(s==='low')arr.sort(function(a,b){return a.price-b.price});
  if(s==='high')arr.sort(function(a,b){return b.price-a.price});
  var pt=$('#productsTitle');if(pt)pt.textContent=headText();
  var pc=$('#productCrumb');if(pc)pc.textContent=c||'همه قطعات';
  var ch=$('#ghChips');
  if(ch){
    var h='<span class="chip count">'+fa(arr.length)+' قطعه</span>';
    if(carFilter)h+='<button class="chip" data-clearcar="1">🚘 '+esc(carFilter)+' ✕</button>';
    if(c)h+='<button class="chip" data-clearcat="1">'+catEm(c)+' '+esc(c)+' ✕</button>';
    ch.innerHTML=h;
  }
  $('#productGrid').innerHTML=arr.length?arr.map(productCard).join(''):
    '<div class="empty"><div class="emoji">📦</div>قطعه‌ای با این مشخصات پیدا نشد.<br><button class="btn ghost" data-clearall="1">نمایش همه قطعات</button></div>';
}

/* ---------- categories / car pages ---------- */
function catCards(target,car){
  target.innerHTML=cats.map(function(r){
    var c=r[0],n=products.filter(function(p){return (c===ALL||p.cat===c)&&matchCar(p,car)}).length;
    return '<button class="category" data-cat="'+esc(c)+'" style="--cc:'+(CATCOL[c]||'#f5c51f')+'"><span>'+r[1]+'</span><div><b>'+esc(c)+'</b><small>'+fa(n)+' قطعه</small></div></button>';
  }).join('');
}
function renderCats(){
  catCards($('#categoryGrid'),carFilter);
  var l=$('#selectedCarLabel');
  if(l)l.innerHTML=carFilter?('خودرو: '+esc(carFilter)+' <button class="chip" data-clearcar="1">همه خودروها ✕</button>'):'همه خودروها';
};
function renderCar(){
  var car=selectedCar,n=products.filter(function(p){return matchCar(p,car)});
  catCards($('#carCategories'),car);
  var sp=$$('#car .specs .spec');
  if(sp[0])sp[0].innerHTML='<b>برند</b>'+brandOfCar(car);
  if(sp[2])sp[2].innerHTML='<b>قطعات کاتالوگ</b>'+fa(n.length)+' قلم';
  if(sp[3])sp[3].innerHTML='<b>وضعیت</b>کاتالوگ در حال تکمیل';
  var cr=$('#car .crumb');if(cr)cr.textContent='خانه / خودرو / '+car;
  var box=$('#ghCarParts');
  if(box){
    box.innerHTML='<h2 class="sect">قطعات '+esc(car)+'</h2>'+(n.length?
      '<div class="grid">'+n.slice(0,8).map(productCard).join('')+'</div>'+
      (n.length>8?'<div style="text-align:center;margin-top:16px"><button class="btn" data-showall="1">مشاهده هر '+fa(n.length)+' قطعه</button></div>':''):
      '<div class="empty"><div class="emoji">🛠️</div>قطعات این خودرو به‌زودی به کاتالوگ اضافه می‌شود.</div>');
  }
}

/* ---------- detail ---------- */
function renderDetail(){
  var p=selectedProduct;if(!p)return;
  var v=$('#detail .detail-visual');if(v)v.textContent=catEm(p.cat);
  var rel=$('#ghRelated');
  if(rel){
    var r=products.filter(function(x){return x.cat===p.cat&&x.id!==p.id}).slice(0,4);
    rel.innerHTML=r.length?'<h2 class="sect">قطعات مرتبط</h2><div class="grid">'+r.map(productCard).join('')+'</div>':'';
  }
}

/* ---------- go wrapper ---------- */
var _go=go;
go=function(id){
  if(id==='car')carFilter=selectedCar;
  try{_go(id)}catch(e){}
  if(id==='car')renderCar();
  if(id==='detail')renderDetail();
  if(id==='categories')renderCats();
  if(id==='products')renderProducts();
};
window.productCard=productCard;window.doSearch=doSearch;window.renderProducts=renderProducts;window.renderCats=renderCats;

/* ---------- DOM init ---------- */
function resetControl(sel){var el=$(sel);if(!el)return null;var c=el.cloneNode(true);el.parentNode.replaceChild(c,el);return c}
function init(){
  /* products page: filters */
  var ft=resetControl('#filterText'),so=resetControl('#sortProducts'),fb=$('#filterBrand');
  if(fb){
    fb.style.display='none';
    var lb=fb.previousElementSibling;if(lb&&lb.tagName==='LABEL')lb.style.display='none';
    var nl=D.createElement('label');nl.textContent='خودرو';
    var ns=D.createElement('select');ns.className='field';ns.id='filterCar';
    ns.innerHTML='<option value="">همه خودروها</option>'+cars.map(function(c){return '<option>'+c+'</option>'}).join('');
    fb.parentNode.insertBefore(nl,fb.nextSibling);fb.parentNode.insertBefore(ns,nl.nextSibling);
    ns.addEventListener('change',function(){carFilter=ns.value;renderProducts()});
  }
  if(ft)ft.addEventListener('input',renderProducts);
  if(so)so.addEventListener('input',renderProducts);
  var pl=$('#products .product-layout');
  if(pl){var cb=D.createElement('div');cb.id='ghChips';cb.className='chips';pl.parentNode.insertBefore(cb,pl)}
  var dl=$('#detail .detail-layout');
  if(dl){var rl=D.createElement('div');rl.id='ghRelated';dl.parentNode.insertBefore(rl,dl.nextSibling)}
  var cc=$('#carCategories');
  if(cc){var cp=D.createElement('div');cp.id='ghCarParts';cc.parentNode.insertBefore(cp,cc.nextSibling)}

  /* search page form */
  var sf=resetControl('#searchForm');
  if(sf)sf.addEventListener('submit',function(e){e.preventDefault();var q=$('#searchInput').value.trim();if(q)doSearch(q)});

  /* home */
  $$('#home .gh-car-list button').forEach(function(b){b.setAttribute('data-car',b.textContent.trim());b.removeAttribute('data-page')});
  var hero=$('#home .gh-hero');
  if(hero){
    var st=D.createElement('section');st.className='gh-quick';
    st.innerHTML='<form id="ghQuickForm" class="gh-qsearch"><input id="ghQuickInput" autocomplete="off" placeholder="نام قطعه، کد فنی یا خودرو… مثلاً: لنت پراید"><button>جستجو</button></form>'+
      '<div class="gh-chips">'+cats.slice(1).map(function(r){return '<button data-cat="'+r[0]+'" style="--cc:'+(CATCOL[r[0]]||'#f5c51f')+'">'+r[1]+' '+r[0]+'</button>'}).join('')+'</div>'+
      '<div class="gh-stats"><div><b>'+fa(products.length)+'</b><span>قطعه در کاتالوگ</span></div><div><b>'+fa(cats.length-1)+'</b><span>دسته‌بندی تخصصی</span></div><div><b>'+fa(cars.length)+'</b><span>مدل خودرو</span></div><div><b>۲</b><span>گروه ایران‌خودرو و سایپا</span></div></div>';
    hero.parentNode.insertBefore(st,hero.nextSibling);
    $('#ghQuickForm').addEventListener('submit',function(e){e.preventDefault();var q=$('#ghQuickInput').value.trim();if(q)doSearch(q)});
  }
  var br=$('#home .gh-brands');
  if(br){
    var seen={},pick=[];
    products.forEach(function(p){if(!seen[p.cat]&&pick.length<4){seen[p.cat]=1;pick.push(p)}});
    var fs=D.createElement('section');fs.className='gh-feat';
    fs.innerHTML='<h2 class="sect">نمونه قطعات کاتالوگ</h2><div class="grid">'+pick.map(productCard).join('')+'</div><div style="text-align:center;margin-top:16px"><button class="btn" data-showall="1">مشاهده همه قطعات</button></div>';
    br.parentNode.insertBefore(fs,br);
  }
  var ad=$('#home .gh-address');
  if(ad){
    var a=D.createElement('a');a.className='gh-address';a.target='_blank';a.rel='noopener';
    a.href='https://www.google.com/maps/search/?api=1&query='+encodeURIComponent('سقز بلوار کردستان تالار کریستال');
    a.innerHTML=ad.innerHTML+' <small style="color:#f5c51f">· مسیریابی</small>';
    ad.parentNode.replaceChild(a,ad);
  }
}

/* ---------- clicks ---------- */
D.addEventListener('click',function(e){
  var t=e.target;
  if(t.closest('.gh-quick [data-cat]')||t.closest('.gh-feat [data-showall]'))carFilter='';
  if(t.closest('#home [data-car]')||t.closest('[data-car]')){/* handled by original, go() wrapper sets filter */}
},true);
D.addEventListener('click',function(e){
  var b;
  if((b=e.target.closest('[data-quick]'))){
    e.preventDefault();
    var p=products.filter(function(x){return x.id===+b.dataset.quick})[0];if(!p)return;
    var row=cart.filter(function(x){return x.id===p.id})[0];
    if(row)row.qty+=1;else cart.push(Object.assign({},p,{qty:1}));
    updateCount();toast('به سبد اضافه شد');return;
  }
  if(e.target.closest('[data-clearcar]')){carFilter='';var s=$('#filterCar');if(s)s.value='';if($('#categories').classList.contains('active'))renderCats();else renderProducts();return}
  if(e.target.closest('[data-clearcat]')){selectedCat='';renderProducts();return}
  if(e.target.closest('[data-clearall]')){selectedCat='';carFilter='';var f=$('#filterText');if(f)f.value='';var s2=$('#filterCar');if(s2)s2.value='';renderProducts();return}
  if(e.target.closest('[data-showall]')){selectedCat='';go('products');return}
  if(e.target.closest('[data-brand]')){toast('اطلاعات برند هر قطعه در حال تکمیل است؛ همه قطعات نمایش داده می‌شود');selectedCat='';renderProducts()}
});

/* sync car select when entering products */
var _g2=go;
go=function(id){_g2(id);if(id==='products'){var s=$('#filterCar');if(s)s.value=carFilter}};

init();
renderProducts();
})();
`;
h=h.replace(/<!--GH-V3-->[\s\S]*?<!--\/GH-V3-->/,'');
const block='<!--GH-V3--><style id="gh-v3-css">'+CSS+'</style><script id="gh-v3-js">'+JS+'<\/script><!--/GH-V3-->';
if(!h.includes('</body>')){console.error('تگ body پیدا نشد');process.exit(1)}
h=h.replace('</body>',()=>block+'</body>');
fs.writeFileSync(F,h);
console.log('OK: patch v3 applied. backup: '+F+'.bak-before-v3');
