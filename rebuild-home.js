const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const file = path.join(process.cwd(), 'site/index.html');
const expectedHash = '5ddea4686f3608d80299d2b69eb3cda9231e13c6260205c9466c0933d84813c0';

if (!fs.existsSync(file)) {
  console.error('خطا: فایل site/index.html پیدا نشد.');
  process.exit(1);
}

const original = fs.readFileSync(file, 'utf8');
const hash = crypto.createHash('sha256').update(original).digest('hex');

if (hash !== expectedHash) {
  console.error('توقف: نسخه فایل با نسخه بررسی‌شده مطابقت ندارد.');
  console.error('SHA256 فعلی:', hash);
  console.error('هیچ فایلی تغییر نکرد.');
  process.exit(1);
}

const homeMatch = original.match(/<section class="page active" id="home">[\s\S]*?<\/section>/);
if (!homeMatch) {
  console.error('خطا: بخش اصلی صفحه پیدا نشد.');
  process.exit(1);
}

const imageMatch = homeMatch[0].match(/<img[^>]+src="(data:image\/[^"]+)"/);
if (!imageMatch) {
  console.error('خطا: تصویر مرجع داخل صفحه اصلی پیدا نشد.');
  process.exit(1);
}

if (!original.includes('</head>') || !original.includes('</body>')) {
  console.error('خطا: ساختار HTML قابل تشخیص نیست.');
  process.exit(1);
}

const referenceImage = imageMatch[1];

const newHome = `
<section class="page active" id="home">
  <div class="gh-home">
    <header class="gh-header">
      <a class="gh-brand" href="#" data-page="home">
        <span class="gh-logo">♞</span>
        <span><b>فروشگاه</b> <strong>ایساکو گوهری</strong></span>
      </a>
      <nav class="gh-nav">
        <button class="gh-nav-active" data-page="home">صفحه اصلی</button>
        <button data-page="categories">دسته‌بندی قطعات</button>
        <button data-page="help">راهنما</button>
        <button data-page="about">درباره ما</button>
      </nav>
      <div class="gh-tools">
        <form class="gh-search" id="gh-search-form">
          <input id="gh-search-input" type="search" placeholder="جستجوی قطعه..." aria-label="جستجوی قطعه">
          <button type="submit" aria-label="جستجو">⌕</button>
        </form>
        <button class="gh-icon-btn" data-page="account" aria-label="حساب کاربری">♙</button>
        <button class="gh-icon-btn gh-cart" data-page="cart" aria-label="سبد خرید">🛒</button>
      </div>
    </header>

    <div class="gh-hero">
      <div class="gh-hero-art gh-art" data-crop="0,80,1024,330">
        <img alt="سمند در فضای نمایشگاهی" class="gh-crop-image">
      </div>
      <div class="gh-hero-caption">
        <span>فروشگاه قطعات خودرو</span>
        <strong>انتخاب مطمئن، خرید آسان</strong>
      </div>
    </div>

    <section class="gh-parts">
      <div class="gh-section-heading">
        <span>دنیای قطعات خودرو</span>
        <h2>هر قطعه‌ای که نیاز داری، پیدا کن</h2>
      </div>
      <div class="gh-parts-art gh-art" data-crop="0,410,1024,380">
        <img alt="نمای فنی و اجزای خودرو" class="gh-crop-image">
        <div class="gh-part-links">
          <button data-page="categories">بدنه</button>
          <button data-page="categories">موتور</button>
          <button data-page="categories">سیستم برق</button>
          <button data-page="categories">گیربکس</button>
          <button data-page="categories">سیستم تعلیق</button>
          <button data-page="categories">چرخ‌ها</button>
          <button data-page="categories">سیستم ترمز</button>
        </div>
      </div>
    </section>

    <section class="gh-cars" id="gh-car-selection">
      <div class="gh-car-search">
        <form id="gh-car-search-form">
          <input id="gh-car-search-input" type="search" placeholder="جستجوی خودرو یا قطعه...">
          <button type="submit">جستجو</button>
        </form>
        <h2>🚘 انتخاب خودرو</h2>
      </div>
      <div class="gh-car-groups">
        <div class="gh-car-group">
          <h3>سایپا <span class="gh-saipa-mark">✦</span></h3>
          <div class="gh-car-list">
            <button data-page="cars">پراید</button>
            <button data-page="cars">تیبا</button>
            <button data-page="cars">ساینا</button>
            <button data-page="cars">کوییک</button>
            <button data-page="cars">شاهین</button>
          </div>
        </div>
        <div class="gh-car-group">
          <h3>ایران‌خودرو <span class="gh-ikco-mark">♞</span></h3>
          <div class="gh-car-list">
            <button data-page="cars">سمند سورن</button>
            <button data-page="cars">دنا</button>
            <button data-page="cars">پژو ۲۰۷</button>
            <button data-page="cars">پژو پارس</button>
            <button data-page="cars">رانا</button>
          </div>
        </div>
      </div>
    </section>

    <section class="gh-brands">
      <h2>برندهای معتبر</h2>
      <div class="gh-brand-list">
        <span>ایساکو</span><span>سایپا یدک</span><span>عظام</span>
        <span>کروز</span><span>ایسکرا</span><span>امیرنیا</span><span>سازه‌پویش</span>
      </div>
    </section>

    <section class="gh-benefits">
      <div class="gh-benefit-art gh-art" data-crop="0,1220,360,210">
        <img alt="قطعات و لوازم خودرو" class="gh-crop-image">
      </div>
      <div class="gh-benefit-items">
        <div><span>♢</span><strong>کیفیت تضمینی قطعات</strong></div>
        <div><span>♧</span><strong>ارسال سریع به سراسر کشور</strong></div>
        <div><span>♧</span><strong>پشتیبانی تخصصی و مشاوره فنی</strong></div>
      </div>
    </section>

    <footer class="gh-footer">
      <div class="gh-footer-brand"><span class="gh-logo">♞</span><strong>فروشگاه ایساکو گوهری</strong></div>
      <div class="gh-address"><span>⌖</span> سقز، بلوار کردستان، جنب تالار کریستال</div>
    </footer>
  </div>
  <img id="gh-reference-source" src="${referenceImage}" hidden alt="">
</section>`;

const styles = `
<style id="gohari-home-rebuild">
#home .gh-home{direction:rtl;background:#03132e;color:#f5f7ff;font-family:inherit;overflow:hidden}
#home .gh-header{min-height:82px;padding:10px 3.5%;display:flex;align-items:center;justify-content:space-between;gap:18px;background:linear-gradient(110deg,#03132e,#061e43);border-bottom:1px solid #24436d;flex-wrap:wrap}
#home .gh-brand{display:flex;align-items:center;gap:12px;color:#fff;text-decoration:none;font-size:19px;white-space:nowrap}
#home .gh-brand strong,#home .gh-footer-brand strong{color:#f5c51f}
#home .gh-logo{width:52px;height:58px;display:grid;place-items:center;background:linear-gradient(145deg,#1b4e9c,#061a3b);border:2px solid #d7e4ff;border-radius:12px 12px 19px 19px;color:#fff;font-size:32px}
#home .gh-nav,#home .gh-tools{display:flex;align-items:center;gap:12px}
#home .gh-nav button,#home .gh-icon-btn{border:0;background:transparent;color:#e9efff;cursor:pointer;padding:10px 7px;font:inherit}
#home .gh-nav button:hover,#home .gh-nav .gh-nav-active{color:#ffd21c}
#home .gh-tools{gap:10px}
#home .gh-search{display:flex;align-items:center;border:1px solid #31517f;border-radius:30px;background:#0a2147;padding:3px 10px}
#home .gh-search input{width:150px;background:transparent;border:0;outline:0;color:white;padding:8px}
#home .gh-search button{background:transparent;color:white;border:0;font-size:23px}
#home .gh-icon-btn{font-size:24px}
#home .gh-hero{position:relative;background:#061a3b}
#home .gh-art{position:relative;overflow:hidden}
#home .gh-art img{display:block;width:100%;height:100%;object-fit:fill}
#home .gh-hero-art{width:100%;aspect-ratio:1024/330}
#home .gh-hero-caption{position:absolute;bottom:14px;right:5%;display:flex;flex-direction:column;gap:4px;text-shadow:0 2px 8px #000}
#home .gh-hero-caption span{font-size:13px;color:#f5c51f}
#home .gh-hero-caption strong{font-size:19px}
#home .gh-parts{background:linear-gradient(120deg,#04132d,#082653);padding:24px 3% 12px}
#home .gh-section-heading{text-align:center;margin-bottom:12px}
#home .gh-section-heading span{color:#f5c51f;font-size:14px}
#home .gh-section-heading h2{font-size:21px;margin:5px 0}
#home .gh-parts-art{width:100%;aspect-ratio:1024/380;border-radius:12px}
#home .gh-part-links{position:absolute;inset:0;display:flex;flex-wrap:wrap;justify-content:space-between;align-content:space-between;padding:4%}
#home .gh-part-links button{background:#071e42dd;border:1px solid #e8b91d;color:white;border-radius:22px;padding:8px 15px;font:inherit;cursor:pointer}
#home .gh-cars{margin:16px 2%;border:1px solid #31517f;border-radius:17px;overflow:hidden;background:#061a3b}
#home .gh-car-search{display:flex;align-items:center;justify-content:space-between;gap:12px;background:#0a2147;padding:12px 18px}
#home .gh-car-search form{display:flex;flex:1;max-width:55%;background:#e9efff;border-radius:28px;padding:3px}
#home .gh-car-search input{flex:1;min-width:0;border:0;outline:0;background:transparent;padding:9px 14px;color:#102448}
#home .gh-car-search form button{border:0;border-radius:24px;background:#f5c51f;color:#071a37;padding:8px 17px;font-weight:bold}
#home .gh-car-search h2{margin:0;background:#f5c51f;color:#071a37;padding:9px 22px;border-radius:25px;font-size:19px}
#home .gh-car-groups{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:12px}
#home .gh-car-group{border:1px solid #24436d;border-radius:13px;padding:10px;background:linear-gradient(145deg,#0a2853,#041630)}
#home .gh-car-group h3{text-align:center;margin:3px 0 12px;font-size:21px}
#home .gh-saipa-mark{color:#f28b19}#home .gh-ikco-mark{color:#dce8ff}
#home .gh-car-list{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px}
#home .gh-car-list button{min-height:92px;border:1px solid #31517f;border-radius:11px;background:linear-gradient(145deg,#193761,#071a37);color:#fff;font:inherit;font-size:13px;cursor:pointer;padding:8px 3px}
#home .gh-car-list button:before{content:'🚘';display:block;font-size:24px;margin-bottom:9px}
#home .gh-car-list button:hover{border-color:#f5c51f}
#home .gh-brands{margin:18px 2%;border:1px solid #31517f;border-radius:15px;background:#061a3b;overflow:hidden}
#home .gh-brands h2{display:inline-block;margin:0;background:#f5c51f;color:#071a37;padding:7px 22px;border-radius:0 0 0 16px;font-size:15px}
#home .gh-brand-list{display:flex;justify-content:space-around;align-items:center;gap:12px;flex-wrap:wrap;padding:20px 12px;font-size:18px;font-weight:bold}
#home .gh-benefits{display:grid;grid-template-columns:35% 65%;align-items:stretch;background:linear-gradient(110deg,#0a2b58,#03132e);border-top:1px solid #31517f;border-bottom:1px solid #31517f}
#home .gh-benefit-art{min-height:180px}
#home .gh-benefit-items{display:grid;grid-template-columns:repeat(3,1fr);align-items:center}
#home .gh-benefit-items div{min-height:100px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center;gap:12px;padding:10px;border-left:1px solid #7890b3}
#home .gh-benefit-items span{font-size:30px;color:#f5c51f}
#home .gh-benefit-items strong{font-size:14px;line-height:1.8}
#home .gh-footer{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:20px 4%;background:#03132e;border-top:1px solid #24436d;flex-wrap:wrap}
#home .gh-footer-brand{display:flex;align-items:center;gap:12px;font-size:19px}
#home .gh-footer-brand .gh-logo{width:42px;height:47px;font-size:25px}
#home .gh-address{border:1px solid #24436d;border-radius:28px;padding:12px 22px;color:#e9efff}
#home .gh-address span{color:#f5c51f;margin-left:10px}
@media(max-width:900px){#home .gh-header{justify-content:center}#home .gh-nav{order:3;width:100%;justify-content:center;flex-wrap:wrap}#home .gh-brand{margin-left:auto}#home .gh-tools{margin-right:auto}}
@media(max-width:600px){#home .gh-header{gap:8px;padding:10px}#home .gh-brand{font-size:15px}#home .gh-logo{width:40px;height:46px;font-size:25px}#home .gh-nav{gap:5px}#home .gh-nav button{font-size:12px;padding:7px 4px}#home .gh-search input{width:105px}#home .gh-hero-caption strong{font-size:14px}#home .gh-car-search{flex-wrap:wrap}#home .gh-car-search form{max-width:none;min-width:100%}#home .gh-car-search h2{font-size:15px}#home .gh-car-groups{grid-template-columns:1fr}#home .gh-car-list button{font-size:12px;min-height:76px}#home .gh-brand-list{font-size:14px;padding:13px 8px}#home .gh-benefits{grid-template-columns:1fr}#home .gh-benefit-art{max-height:130px}#home .gh-benefit-items strong{font-size:11px}#home .gh-benefit-items div{padding:5px}#home .gh-footer{justify-content:center}#home .gh-address{font-size:12px;padding:10px}}
</style>`;

const runtime = `
<script id="gohari-home-runtime">
(function(){
  function initGohariHome(){
    var root=document.getElementById('home');
    var source=document.getElementById('gh-reference-source');
    if(!root||!source||root.dataset.ghReady)return;
    root.dataset.ghReady='1';

    function makeCrop(node){
      var values=(node.getAttribute('data-crop')||'').split(',').map(Number);
      if(values.length!==4)return;
      var x=values[0],y=values[1],w=values[2],h=values[3];
      function draw(){
        if(!source.naturalWidth||!source.naturalHeight)return;
        var sx=source.naturalWidth/1024,sy=source.naturalHeight/1536;
        var canvas=document.createElement('canvas');
        canvas.width=Math.round(w);canvas.height=Math.round(h);
        var ctx=canvas.getContext('2d');
        ctx.drawImage(source,x*sx,y*sy,w*sx,h*sy,0,0,w,h);
        var img=node.querySelector('img');
        if(img)img.src=canvas.toDataURL('image/jpeg',0.92);
      }
      if(source.complete)draw();else source.addEventListener('load',draw,{once:true});
    }
    root.querySelectorAll('.gh-art').forEach(makeCrop);

    function submitSearch(input){
      var value=(input.value||'').trim();
      if(!value)return;
      var target=document.querySelector('[data-page="search"]');
      if(target)target.click();
    }
    var searchForm=document.getElementById('gh-search-form');
    var carForm=document.getElementById('gh-car-search-form');
    if(searchForm)searchForm.addEventListener('submit',function(e){
      e.preventDefault();submitSearch(document.getElementById('gh-search-input'));
    });
    if(carForm)carForm.addEventListener('submit',function(e){
      e.preventDefault();submitSearch(document.getElementById('gh-car-search-input'));
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initGohariHome);
  else initGohariHome();
})();
</script>`;

let updated = original.replace(homeMatch[0], newHome);

if (updated.includes('id="gohari-home-rebuild"') || updated.includes('id="gohari-home-runtime"')) {
  console.error('توقف: نشانه‌های نسخه جدید از قبل وجود دارند.');
  process.exit(1);
}

updated = updated.replace('</head>', styles + '\n</head>');
updated = updated.replace('</body>', runtime + '\n</body>');

if (updated === original || !updated.includes('id="gh-reference-source"')) {
  console.error('خطا: تغییر صفحه انجام نشد.');
  process.exit(1);
}

const backupDir = path.join(process.cwd(), 'backup');
fs.mkdirSync(backupDir, { recursive: true });
const stamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFile = path.join(backupDir, 'index-before-home-rebuild-' + stamp + '.html');

fs.writeFileSync(backupFile, original, 'utf8');
fs.writeFileSync(file, updated, 'utf8');

console.log('صفحه اصلی بازسازی شد.');
console.log('نسخه پشتیبان:', backupFile);
console.log('حجم فایل جدید:', Buffer.byteLength(updated), 'bytes');
console.log('صفحات و کدهای خارج از بخش اصلی دست‌نخورده باقی ماندند.');
