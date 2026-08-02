/* ================= SKILL BARS ================= */
(function(){
  const bars = document.querySelectorAll('.skill-bar i');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.transition = 'width 1.4s cubic-bezier(.16,1,.3,1)';
        entry.target.style.width = entry.target.dataset.fill + '%';
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.3});
  bars.forEach(b=>io.observe(b));
})();

