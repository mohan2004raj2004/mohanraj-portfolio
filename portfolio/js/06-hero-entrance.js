/* ================= HERO ENTRANCE ================= */
function playHeroIn(){
  if(!window.gsap) return;
  gsap.utils.toArray('.hero-inner [data-reveal], .hero-tag, .hero-desc, .hero-cta').forEach((el,i)=>{
    gsap.fromTo(el, {opacity:0, y:26, filter:'blur(6px)'}, {opacity:1, y:0, filter:'blur(0px)', duration:1, delay:0.15+i*0.08, ease:'power3.out'});
  });
  const title = document.querySelector('.split-title');
  if(title){
    gsap.fromTo(title, {opacity:0, y:60, scale:1.06}, {opacity:1, y:0, scale:1, duration:1.2, ease:'power4.out'});
  }
}

