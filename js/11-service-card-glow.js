/* ================= SERVICE CARD MOUSE GLOW ================= */
(function(){
  document.querySelectorAll('.service-card').forEach(card=>{
    card.addEventListener('mousemove', e=>{
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX-r.left)+'px');
      card.style.setProperty('--my', (e.clientY-r.top)+'px');
    });
  });
})();

