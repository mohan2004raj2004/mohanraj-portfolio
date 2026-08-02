/* ================= HERO ROLE ROTATOR ================= */
(function(){
  const list = document.getElementById('roleList');
  const items = list.querySelectorAll('li');
  let i = 0;
  setInterval(()=>{
    i = (i+1) % items.length;
    list.style.transform = `translateY(-${i * (items[0].offsetHeight)}px)`;
  }, 2400);
})();

