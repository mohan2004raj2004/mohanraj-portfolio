/* ================= CUSTOM CURSOR ================= */
(function(){
  if(window.matchMedia('(max-width:860px)').matches) return;
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  let mx=0,my=0, rx=0, ry=0;
  window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
  function loop(){
    rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
    ring.style.left = rx+'px'; ring.style.top = ry+'px';
    requestAnimationFrame(loop);
  }
  loop();
  document.querySelectorAll('[data-cursor-hover]').forEach(el=>{
    el.addEventListener('mouseenter', ()=> ring.classList.add('hover'));
    el.addEventListener('mouseleave', ()=> ring.classList.remove('hover'));
  });
})();

