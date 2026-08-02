/* ================= PROJECTS DATA + RENDER ================= */
(function(){
  const projects = [
    {title:'Torque Industrial Brochure', cat:'Industrial', hue:'0deg'},
    {title:'Anvil Manufacturing Rebrand', cat:'Branding', hue:'350deg'},
    {title:'Guindy Motors Wordmark', cat:'Logo', hue:'10deg'},
    {title:'Investor Deck — Volt Systems', cat:'Presentation', hue:'340deg'},
    {title:'Aera Skincare Social Kit', cat:'Social', hue:'20deg'},
    {title:'Forgeline Company Profile', cat:'Industrial', hue:'355deg'},
    {title:'Nimbus Studio Identity', cat:'Branding', hue:'5deg'},
    {title:'Kernel Logo Mark', cat:'Logo', hue:'345deg'},
  ];
  const grid = document.getElementById('projGrid');
  grid.innerHTML = projects.map((p,i)=>`
    <div class="proj-card" data-cat="${p.cat}" data-cursor-hover>
      <div class="proj-bg" style="background:
        radial-gradient(circle at 30% 20%, hsla(${p.hue},90%,45%,.35), transparent 60%),
        repeating-linear-gradient(135deg, rgba(255,255,255,.03) 0 2px, transparent 2px 26px),
        linear-gradient(160deg,#0d0a0a,#050505);"></div>
      <div class="proj-overlay"></div>
      <div class="proj-info">
        <div>
          <span class="cat">${p.cat}</span>
          <h3>${p.title}</h3>
        </div>
        <div class="proj-arrow">→</div>
      </div>
    </div>
  `).join('');

  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.proj-card').forEach(card=>{
        card.classList.toggle('hidden', f!=='all' && card.dataset.cat!==f);
      });
    });
  });
})();

