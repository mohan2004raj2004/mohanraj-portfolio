/* ================= SCROLL REVEALS ================= */
(function(){
  const els = document.querySelectorAll('[data-reveal]');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.transition = 'opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1)';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  els.forEach(el=>{
    if(el.closest('.hero-inner')) return; /* hero handled separately */
    el.style.opacity='0';
    el.style.transform='translateY(40px)';
    io.observe(el);
  });
})();

