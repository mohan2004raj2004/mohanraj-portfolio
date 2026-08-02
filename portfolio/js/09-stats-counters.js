/* ================= STAT COUNTERS ================= */
(function(){
  const stats = document.querySelectorAll('.stat .num');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const el = entry.target;
        const target = parseInt(el.dataset.count,10);
        let cur = 0;
        const step = Math.max(1, Math.round(target/60));
        const iv = setInterval(()=>{
          cur += step;
          if(cur >= target){ cur = target; clearInterval(iv); }
          el.textContent = cur + (target>=100?'+':'+');
        }, 20);
        io.unobserve(el);
      }
    });
  }, {threshold:0.4});
  stats.forEach(s=>io.observe(s));
})();

