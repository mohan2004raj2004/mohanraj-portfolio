/* ================= TIMELINE ACTIVE STATE ================= */
(function(){
  const items = document.querySelectorAll('.t-item');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('active'); });
  }, {threshold:0.5});
  items.forEach(i=>io.observe(i));
})();

