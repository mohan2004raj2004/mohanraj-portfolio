/* ================= NAV SCROLL BEHAVIOUR ================= */
(function(){
  const nav = document.getElementById('nav');
  const progress = document.getElementById('scrollProgress');
  let lastY = 0;
  window.addEventListener('scroll', ()=>{
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y>40);
    if(y>lastY && y>200){ nav.classList.add('hide'); } else { nav.classList.remove('hide'); }
    lastY = y;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.width = (h>0 ? (y/h)*100 : 0)+'%';
  }, {passive:true});
})();

