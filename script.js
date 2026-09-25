document.addEventListener('DOMContentLoaded',()=>{
 const menuGroups=[...document.querySelectorAll('.menu-group')];
 const closeAll=(except=null)=>menuGroups.forEach(g=>{
   if(g!==except){
     g.querySelector('.submenu')?.classList.remove('open');
     g.querySelector('[data-menu-toggle]')?.classList.remove('active');
   }
 });
 menuGroups.forEach(group=>{
  const button=group.querySelector('[data-menu-toggle]');
  const submenu=group.querySelector('.submenu');
  if(!button||!submenu)return;
  button.setAttribute('aria-expanded','false');
  button.addEventListener('click',e=>{
   e.preventDefault();
   e.stopPropagation();
   const open=!submenu.classList.contains('open');
   closeAll(group);
   submenu.classList.toggle('open',open);
   button.classList.toggle('active',open);
   button.setAttribute('aria-expanded',String(open));
  });
 });
 document.addEventListener('click',e=>{
   if(!e.target.closest('.menu-group')) closeAll();
 });
 document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll()});
 const mobile=document.querySelector('.mobile-toggle');
 if(mobile) mobile.addEventListener('click',e=>{e.stopPropagation();document.querySelector('.menu')?.classList.toggle('mobile-open')});
 const search=document.querySelector('#siteSearch');
 const btn=document.querySelector('#searchBtn');
 const run=()=>{
   const q=(search?.value||'').trim().toLowerCase();
   if(!q)return;
   const links=[...document.querySelectorAll('.menu a')];
   const hit=links.find(a=>a.textContent.toLowerCase().includes(q));
   if(hit) location.href=hit.getAttribute('href');
   else alert('इस साइट पर यह खोज नहीं मिली।');
 };
 btn?.addEventListener('click',run);
 search?.addEventListener('keydown',e=>{if(e.key==='Enter')run()});
 document.querySelectorAll('form[data-demo]').forEach(f=>f.addEventListener('submit',e=>{
   e.preventDefault();
   const note=f.querySelector('.form-note');
   if(note) note.textContent='आपकी जानकारी दर्ज कर ली गई है। यह डेमो फॉर्म है; वास्तविक ई-मेल भेजने के लिए backend जोड़ें।';
 }));
});
