const fs = require('fs');
const path = 'site/index.html';
let html = fs.readFileSync(path, 'utf8');

const backup = path + '.backup-' + new Date().toISOString().replace(/[:.]/g, '-');
fs.copyFileSync(path, backup);

function replaceOnce(source, regex, replacement, label) {
  const matches = [...source.matchAll(new RegExp(regex.source, regex.flags.includes('g') ? regex.flags : regex.flags + 'g'))];
  if (matches.length !== 1) {
    throw new Error(label + ': انتظار یک مورد بود، تعداد پیدا شده: ' + matches.length);
  }
  return source.replace(regex, replacement);
}

// 1) حذف کامل تصویر قطعات زیر تصویر اصلی سمند
html = replaceOnce(
  html,
  /<section class="gh-parts">[\s\S]*?<\/section>/,
  '',
  'بخش تصویر قطعات'
);

// 2) حذف جستجوی تکراری پایین صفحه و حفظ عنوان انتخاب خودرو
html = replaceOnce(
  html,
  /<div class="gh-car-search">[\s\S]*?<\/div>/,
  '<div class="gh-car-search"><h2>🚘 انتخاب خودرو</h2></div>',
  'جستجوی پایین صفحه'
);

// 3) اتصال پیشنهادهای زنده به محصولات واقعی و جستجوی اصلی
const oldSearch = "function doSearch(q){let found=products.filter(p=>(p.name+' '+p.cat+' '+p.brand).includes(q));document.getElementById('searchResults').innerHTML=found.length?found.map(productCard).join(''):'<div class=\"empty\">نتیجه‌ای پیدا نشد.</div>';go('search')}";

const newSearch = `function normalizeSearch(v){return String(v||'').toLowerCase().replace(/[يى]/g,'ی').replace(/ك/g,'ک').replace(/\\s+/g,' ').trim()}
function doSearch(q){
  const query=normalizeSearch(q);
  let found=products.filter(p=>normalizeSearch(p.name+' '+p.cat+' '+p.brand+' '+p.id).includes(query));
  document.getElementById('searchInput').value=q;
  document.getElementById('searchResults').innerHTML=found.length?found.map(productCard).join(''):'<div class="empty">نتیجه‌ای پیدا نشد.</div>';
  go('search');
}
(function initHeaderSuggestions(){
  const input=document.getElementById('globalSearch');
  const form=document.getElementById('headerSearch');
  if(!input||!form)return;

  const rail=document.createElement('div');
  rail.className='gh-suggest-rail';
  rail.id='ghSuggestRail';
  rail.hidden=true;
  form.appendChild(rail);

  function hide(){rail.hidden=true;rail.innerHTML=''}
  input.addEventListener('input',function(){
    const q=normalizeSearch(input.value);
    if(q.length<2){hide();return}
    const found=products.filter(p=>
      normalizeSearch(p.name+' '+p.cat+' '+p.brand+' '+p.id).includes(q)
    ).slice(0,8);

    if(!found.length){
      rail.innerHTML='<div class="gh-suggest-empty">موردی پیدا نشد</div>';
      rail.hidden=false;
      return;
    }

    rail.innerHTML=found.map(p=>
      '<button type="button" class="gh-suggest-item" data-gh-suggest-id="'+p.id+'">'+
      '<span class="gh-suggest-emoji">'+p.emoji+'</span>'+
      '<span><b>'+p.name+'</b><small>'+p.brand+' · '+fa(p.price)+' تومان</small></span>'+
      '</button>'
    ).join('');
    rail.hidden=false;
  });

  rail.addEventListener('click',function(e){
    const item=e.target.closest('[data-gh-suggest-id]');
    if(!item)return;
    const p=products.find(x=>x.id===Number(item.dataset.ghSuggestId));
    if(!p)return;
    input.value=p.name;
    hide();
    doSearch(p.name);
  });

  document.addEventListener('click',function(e){
    if(!form.contains(e.target))hide();
  });
})();`;

if (!html.includes(oldSearch)) {
  throw new Error('تابع جستجوی اصلی پیدا نشد؛ فایل تغییر نکرد.');
}
html = html.replace(oldSearch, newSearch);

// 4) استایل نوار افقی پیشنهادها
const style = `
/* پیشنهادهای افقی جستجوی هدر */
#headerSearch{position:relative}
.gh-suggest-rail{
  position:absolute;z-index:9999;top:calc(100% + 10px);right:0;
  width:min(390px,calc(100vw - 28px));max-width:calc(100vw - 28px);
  display:flex;gap:9px;overflow-x:auto;overscroll-behavior-x:contain;
  padding:10px;background:#0b2346;border:1px solid #426087;
  border-radius:13px;box-shadow:0 12px 30px #0006;
  scrollbar-width:thin;direction:rtl
}
.gh-suggest-rail[hidden]{display:none}
.gh-suggest-item{
  flex:0 0 155px;min-width:155px;display:flex;align-items:center;
  gap:9px;text-align:right;padding:10px;border:1px solid #345477;
  border-radius:10px;background:#15345e;color:#fff;cursor:pointer
}
.gh-suggest-item b{display:block;font-size:12px;white-space:normal}
.gh-suggest-item small{display:block;margin-top:5px;color:#d6c18a;font-size:10px}
.gh-suggest-emoji{font-size:24px}
.gh-suggest-empty{padding:10px;color:#fff;font-size:12px;white-space:nowrap}
`;

if (!html.includes('/* پیشنهادهای افقی جستجوی هدر */')) {
  if (!html.includes('</style>')) throw new Error('محل درج CSS پیدا نشد.');
  html = html.replace('</style>', style + '\n</style>');
}

fs.writeFileSync(path, html);
console.log('تغییرات با موفقیت اعمال شد.');
console.log('بکاپ: ' + backup);
console.log('حذف تصویر قطعات زیر سمند: انجام شد');
console.log('حذف جستجوی تکراری پایین صفحه: انجام شد');
console.log('پیشنهادهای افقی جستجوی هدر: اضافه شد');
console.log('تعداد محصولات مبنای پیشنهادها: 8');
