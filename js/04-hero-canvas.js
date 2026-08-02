/* ================= HERO PARTICLE WAVE (canvas) ================= */
(function(){
  const canvas = document.getElementById('hero-canvas');
  const ctx = canvas.getContext('2d');
  let w,h,points=[];
  const COLS = 46;
  let mouseX = 0.5, mouseY = 0.5;

  function resize(){
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', e=>{
    mouseX = e.clientX / window.innerWidth;
    mouseY = e.clientY / window.innerHeight;
  });

  let t = 0;
  function draw(){
    t += 0.006;
    ctx.clearRect(0,0,w,h);
    const rows = 22;
    const spacingX = w / COLS;
    const spacingY = h / rows;
    for(let r=0; r<rows; r++){
      ctx.beginPath();
      for(let c=0; c<=COLS; c++){
        const x = c*spacingX;
        const dCenter = (c/COLS - mouseX);
        const wave = Math.sin(c*0.35 + t*2 + r*0.4) * (18*devicePixelRatio)
                   + Math.cos(r*0.5 - t*1.4) * (10*devicePixelRatio)
                   - Math.abs(dCenter)*40*devicePixelRatio*(mouseY);
        const y = r*spacingY + wave*0.5 + (h*0.15);
        if(c===0) ctx.moveTo(x,y); else ctx.lineTo(x,y);
      }
      const alpha = 0.05 + (r/rows)*0.10;
      ctx.strokeStyle = `rgba(255,46,46,${alpha})`;
      ctx.lineWidth = 1*devicePixelRatio;
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

