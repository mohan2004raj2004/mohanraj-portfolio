/* ================= LOADER ================= */
(function(){
  const mark = document.getElementById('loaderMark');
  const name = "MOHANRAJ K";
  name.split('').forEach((ch,i)=>{
    const s = document.createElement('span');
    s.textContent = ch === ' ' ? '\u00A0' : ch;
    s.style.transitionDelay = (i*0.03)+'s';
    mark.appendChild(s);
  });
  requestAnimationFrame(()=> requestAnimationFrame(()=>{
    mark.querySelectorAll('span').forEach(s=>{
      s.style.transition = 'transform .7s cubic-bezier(.16,1,.3,1), opacity .7s ease';
      s.style.transform = 'translateY(0)';
      s.style.opacity = '1';
    });
  }));

  const numEl = document.getElementById('loaderNum');
  const barFill = document.getElementById('loaderBarFill');
  let pct = 0;
  const iv = setInterval(()=>{
    pct += Math.random()*14;
    if(pct >= 100){ pct = 100; clearInterval(iv); finish(); }
    numEl.textContent = Math.floor(pct);
    barFill.style.width = pct+'%';
  }, 140);

  function finish(){
    setTimeout(()=>{
      document.getElementById('loader').classList.add('done');
      document.body.style.overflow = '';
      playHeroIn();
    }, 300);
  }
  document.body.style.overflow = 'hidden';
})();

