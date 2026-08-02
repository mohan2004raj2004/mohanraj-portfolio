/* ================================================
   BROCHURE PROJECT GALLERY FEATURE (scalable, image-based)
   ================================================ */

/* BROCHURE PROJECT DATA
   -------------------------------------------------
   To add a new project: duplicate one object below, change
   title / category / client / year / cover / images, and give
   it a unique "slug" (used in the URL hash, e.g. #brochure-slug).
   The gallery, numbering, cards, slideshow, thumbnails and nav
   are all generated automatically from this array — no HTML to write.
   ================================================= */
const brochureProjects = [
  /* =================================================
     ADD NEW BROCHURE PROJECTS HERE
     ================================================= */
  {
    slug: 'mws-industrial-brochure',
    title: 'MWS Industrial Brochure',
    category: 'Industrial Brochure',
    client: 'MWS',
    year: '2026',
    cover: 'assets/brochures/mws/cover.png',
    images: [
      'assets/brochures/mws/page-01.png',
      'assets/brochures/mws/page-02.png',
      'assets/brochures/mws/page-03.png',
      'assets/brochures/mws/page-04.png',
      'assets/brochures/mws/page-05.png',
    ]
  },
  {
    slug: 'company-profile-design',
    title: 'Company Profile Design',
    category: 'Company Profile',
    client: 'Client Name',
    year: '2026',
    cover: 'assets/brochures/project-02/cover.jpg',
    images: [
      'assets/brochures/project-02/page-01.jpg',
      'assets/brochures/project-02/page-02.jpg',
      'assets/brochures/project-02/page-03.jpg'
    ]
  },
  {
    slug: 'industrial-catalogue',
    title: 'Industrial Catalogue',
    category: 'Catalogue',
    client: 'Client Name',
    year: '2026',
    cover: 'assets/brochures/project-03/cover.jpg',
    images: [
      'assets/brochures/project-03/page-01.jpg',
      'assets/brochures/project-03/page-02.jpg'
    ]
  }
  /* copy the block above this line to add the next project */
];

(function(){
  const card           = document.getElementById('svcBrochureCard');
  const transition      = document.getElementById('transitionOverlay');
  const ttMain           = document.getElementById('ttMain');
  const ttSub            = document.getElementById('ttSub');

  const galleryOverlay   = document.getElementById('brGalleryOverlay');
  const galleryScroll    = document.getElementById('brGalleryScroll');
  const galleryGrid      = document.getElementById('brGalleryGrid');
  const galleryBackTop   = document.getElementById('brGalleryBackTop');

  const viewerOverlay    = document.getElementById('brViewerOverlay');
  const viewerScroll     = document.getElementById('brViewerScroll');
  const viewerEyebrow    = document.getElementById('brViewerEyebrow');
  const viewerTitle      = document.getElementById('brViewerTitle');
  const viewerMeta       = document.getElementById('brViewerMeta');
  const viewerBackTop    = document.getElementById('brViewerBackTop');
  const viewerBackBottom = document.getElementById('brViewerBackBottom');
  const contactBtn       = document.getElementById('brContactBtn');

  const stage            = document.getElementById('brStage');
  const stageImg         = document.getElementById('brStageImg');
  const stagePrev        = document.getElementById('brStagePrev');
  const stageNext        = document.getElementById('brStageNext');
  const stageCounter     = document.getElementById('brStageCounter');
  const thumbsWrap       = document.getElementById('brThumbs');

  const lightbox         = document.getElementById('brLightbox');
  const lbImg            = document.getElementById('brLbImg');
  const lbCounter        = document.getElementById('brLbCounter');
  const lbClose          = document.getElementById('brLbClose');
  const lbPrev           = document.getElementById('brLbPrev');
  const lbNext           = document.getElementById('brLbNext');

  if(!card || !galleryOverlay || !viewerOverlay) return;

  let activeProject = null;   /* the project object currently open in the viewer */
  let activeIndex = 0;        /* current image index within activeProject.images */
  let lastFocused = null;
  let suppressHash = false;   /* set true while we change location.hash ourselves */

  /* ---------- BROKEN IMAGE HANDLING ---------- */
  function attachFallback(imgEl, expectedSrc, wrapEl){
    imgEl.addEventListener('error', function onErr(){
      imgEl.removeEventListener('error', onErr);
      imgEl.style.display = 'none';
      const div = document.createElement('div');
      div.className = 'br-broken';
      div.innerHTML = `<b>Brochure image not found</b><span>${expectedSrc}</span>`;
      (wrapEl || imgEl.parentElement).appendChild(div);
    }, { once:true });
  }

  /* ---------- BROCHURE PROJECT GALLERY ---------- */
  function renderGallery(){
    if(!brochureProjects.length){
      galleryGrid.innerHTML = '<div class="br-empty">No brochure projects yet — add one to the brochureProjects array.</div>';
      return;
    }
    galleryGrid.innerHTML = brochureProjects.map((p, i) => `
      <article class="br-card" data-slug="${p.slug}" data-cursor-hover tabindex="0" role="button" aria-label="View ${p.title}">
        <div class="br-card-media">
          <span class="br-card-num">${String(i+1).padStart(2,'0')}</span>
          <div class="br-card-glow"></div>
          <img src="${p.cover}" alt="${p.title} cover" loading="lazy">
        </div>
        <div class="br-card-body">
          <span class="br-card-cat">${p.category}</span>
          <h3>${p.title}</h3>
          <div class="br-card-meta"><span>${p.client}</span><span>${p.year}</span></div>
          <span class="br-card-view">VIEW PROJECT
            <svg width="14" height="10" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" stroke-width="1.4"/></svg>
          </span>
        </div>
      </article>
    `).join('');

    galleryGrid.querySelectorAll('.br-card-media img').forEach(img=>{
      attachFallback(img, img.getAttribute('src'), img.closest('.br-card-media'));
    });

    galleryGrid.querySelectorAll('.br-card').forEach(el=>{
      el.addEventListener('click', ()=> goToProject(el.dataset.slug));
      el.addEventListener('keydown', e=>{
        if(e.key==='Enter' || e.key===' '){ e.preventDefault(); goToProject(el.dataset.slug); }
      });
    });
  }
  renderGallery();

  /* ---------- VIEWER: render one project ---------- */
  function preload(src){ if(src){ const im = new Image(); im.src = src; } }

  function renderViewerMeta(p){
    viewerEyebrow.textContent = 'PROJECT / ' + String(brochureProjects.indexOf(p)+1).padStart(2,'0');
    viewerTitle.textContent = p.title;
    viewerMeta.innerHTML = `
      <span>CLIENT <b>${p.client}</b></span>
      <span>CATEGORY <b>${p.category}</b></span>
      <span>YEAR <b>${p.year}</b></span>
    `;
  }

  function renderThumbs(p){
    thumbsWrap.innerHTML = p.images.map((src,i)=>`
      <div class="br-thumb" data-index="${i}" data-cursor-hover>
        <img src="${src}" alt="Page ${i+1} thumbnail" loading="lazy">
      </div>
    `).join('');
    thumbsWrap.querySelectorAll('.br-thumb img').forEach((img,i)=>{
      attachFallback(img, p.images[i], img.closest('.br-thumb'));
    });
    thumbsWrap.querySelectorAll('.br-thumb').forEach(t=>{
      t.addEventListener('click', ()=> goToImage(parseInt(t.dataset.index,10)));
    });
  }

  function updateStage(){
    if(!activeProject) return;
    const total = activeProject.images.length;
    stageImg.classList.remove('is-loaded');
    stageImg.src = activeProject.images[activeIndex];
    stageImg.alt = activeProject.title + ' — page ' + (activeIndex+1);
    stageImg.onload = ()=> stageImg.classList.add('is-loaded');
    attachFallback(stageImg, activeProject.images[activeIndex], stage);
    stageCounter.innerHTML = `<b>${String(activeIndex+1).padStart(2,'0')}</b> / ${String(total).padStart(2,'0')}`;
    thumbsWrap.querySelectorAll('.br-thumb').forEach(t=>{
      t.classList.toggle('active', parseInt(t.dataset.index,10)===activeIndex);
    });
    stagePrev.style.visibility = activeIndex>0 ? 'visible' : 'hidden';
    stageNext.style.visibility = activeIndex<total-1 ? 'visible' : 'hidden';
    /* preload neighbours so prev/next feels instant */
    preload(activeProject.images[activeIndex-1]);
    preload(activeProject.images[activeIndex+1]);
  }

  function goToImage(i){
    if(!activeProject) return;
    activeIndex = Math.max(0, Math.min(activeProject.images.length-1, i));
    updateStage();
    if(lightbox.classList.contains('active')) updateLightbox();
  }
  function nextImage(){ goToImage(activeIndex+1); }
  function prevImage(){ goToImage(activeIndex-1); }

  /* ---------- swipe (touch) on stage + lightbox ---------- */
  function addSwipe(el, onLeft, onRight){
    let sx=0, sy=0, tracking=false;
    el.addEventListener('touchstart', e=>{
      const t = e.changedTouches[0]; sx=t.clientX; sy=t.clientY; tracking=true;
    }, {passive:true});
    el.addEventListener('touchend', e=>{
      if(!tracking) return; tracking=false;
      const t = e.changedTouches[0];
      const dx = t.clientX - sx, dy = t.clientY - sy;
      if(Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)*1.4){
        if(dx < 0) onLeft(); else onRight();
      }
    }, {passive:true});
  }
  addSwipe(stage, nextImage, prevImage);
  addSwipe(lightbox, ()=>{ if(activeProject && activeIndex<activeProject.images.length-1) nextImage(); }, ()=>{ if(activeIndex>0) prevImage(); });

  /* ---------- mouse wheel on stage (throttled) ---------- */
  let wheelLock = false;
  stage.addEventListener('wheel', e=>{
    if(Math.abs(e.deltaX) < Math.abs(e.deltaY)) return; /* only act on horizontal-ish intent */
    e.preventDefault();
    if(wheelLock) return;
    wheelLock = true;
    if(e.deltaX > 0) nextImage(); else prevImage();
    setTimeout(()=> wheelLock = false, 350);
  }, { passive:false });

  stagePrev.addEventListener('click', prevImage);
  stageNext.addEventListener('click', nextImage);
  stage.addEventListener('click', e=>{
    if(e.target === stagePrev || e.target.closest('#brStagePrev') || e.target.closest('#brStageNext')) return;
    openLightbox();
  });

  /* ---------- lightbox ---------- */
  function openLightbox(){
    if(!activeProject) return;
    lastFocused = document.activeElement;
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden','false');
    updateLightbox();
  }
  function updateLightbox(){
    if(!activeProject) return;
    const total = activeProject.images.length;
    lbCounter.textContent = `${String(activeIndex+1).padStart(2,'0')} / ${String(total).padStart(2,'0')}`;
    lbImg.src = activeProject.images[activeIndex];
    lbImg.alt = activeProject.title + ' — page ' + (activeIndex+1);
    attachFallback(lbImg, activeProject.images[activeIndex], lightbox.querySelector('.br-lb-stage'));
  }
  function closeLightbox(){
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden','true');
    if(lastFocused && lastFocused.focus) lastFocused.focus();
  }
  lbClose.addEventListener('click', closeLightbox);
  lbPrev.addEventListener('click', ()=>{ if(activeIndex>0) prevImage(); });
  lbNext.addEventListener('click', ()=>{ if(activeProject && activeIndex<activeProject.images.length-1) nextImage(); });
  lightbox.addEventListener('click', e=>{ if(e.target===lightbox) closeLightbox(); });

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', e=>{
    if(lightbox.classList.contains('active')){
      if(e.key==='Escape') closeLightbox();
      if(e.key==='ArrowLeft' && activeIndex>0) prevImage();
      if(e.key==='ArrowRight' && activeProject && activeIndex<activeProject.images.length-1) nextImage();
      return;
    }
    if(viewerOverlay.classList.contains('active')){
      if(e.key==='Escape'){ closeViewer(); return; }
      if(e.key==='ArrowLeft') prevImage();
      if(e.key==='ArrowRight') nextImage();
      return;
    }
    if(galleryOverlay.classList.contains('active') && e.key==='Escape'){
      closeGallery();
    }
  });

  /* ---------- cinematic transition (portfolio -> gallery) ---------- */
  function playTransition(mainText, subText, onMid){
    document.body.style.overflow = 'hidden';
    transition.classList.add('active');
    if(window.gsap){
      ttMain.textContent = mainText;
      ttSub.textContent = subText;
      const tl = gsap.timeline();
      tl.to(transition, {opacity:1, duration:.5, ease:'power2.out'})
        .to([ttMain, ttSub], {opacity:1, y:0, duration:.6, stagger:.12, ease:'power3.out'}, '-=.15')
        .call(()=> onMid())
        .to([ttMain, ttSub], {opacity:0, y:-16, duration:.4, ease:'power2.in'}, '+=.55')
        .to(transition, {opacity:0, duration:.6, ease:'power2.inOut', onComplete:()=>{
          transition.classList.remove('active');
          gsap.set([ttMain, ttSub], {clearProps:'all'});
        }}, '-=.1');
    } else {
      transition.style.opacity = 1;
      onMid();
      setTimeout(()=>{ transition.classList.remove('active'); transition.style.opacity=0; }, 700);
    }
  }

  /* ---------- open / close: GALLERY ---------- */
  function openGallery(fromHash){
    lastFocused = fromHash ? lastFocused : document.activeElement;
    card.classList.add('pulse');
    setTimeout(()=> card.classList.remove('pulse'), 650);

    const reveal = ()=>{
      galleryOverlay.classList.add('active');
      galleryOverlay.setAttribute('aria-hidden','false');
      if(window.gsap) gsap.set(galleryOverlay, {opacity:1});
      galleryScroll.scrollTop = 0;
      if(!suppressHash){ suppressHash = true; location.hash = '#brochures'; setTimeout(()=> suppressHash=false, 0); }
    };
    if(fromHash){ reveal(); document.body.style.overflow = 'hidden'; }
    else playTransition('BROCHURE PROJECTS', 'INDUSTRIAL BROCHURE & COMPANY PROFILE', reveal);
  }

  function closeGallery(){
    const finish = ()=>{
      galleryOverlay.classList.remove('active');
      galleryOverlay.setAttribute('aria-hidden','true');
      document.body.style.overflow = '';
      if(!suppressHash){ suppressHash = true; history.replaceState(null,'',location.pathname+location.search); setTimeout(()=> suppressHash=false, 0); }
      if(lastFocused && lastFocused.focus) lastFocused.focus();
      const svc = document.getElementById('services');
      if(svc) svc.scrollIntoView({behavior:'smooth'});
    };
    if(window.gsap){
      gsap.to(galleryOverlay, {opacity:0, duration:.5, ease:'power2.inOut', onComplete:()=>{
        gsap.set(galleryOverlay, {clearProps:'opacity'});
        finish();
      }});
    } else finish();
  }

  /* ---------- open / close: VIEWER (single project) ---------- */
  function goToProject(slug, fromHash){
    const p = brochureProjects.find(pr => pr.slug === slug);
    if(!p) return;
    activeProject = p;
    activeIndex = 0;
    renderViewerMeta(p);
    renderThumbs(p);
    updateStage();

    galleryOverlay.classList.remove('active');
    galleryOverlay.setAttribute('aria-hidden','true');
    viewerOverlay.classList.add('active');
    viewerOverlay.setAttribute('aria-hidden','false');
    viewerScroll.scrollTop = 0;
    document.body.style.overflow = 'hidden';

    if(window.gsap){
      gsap.fromTo(viewerOverlay, {opacity:0}, {opacity:1, duration:.5, ease:'power2.out'});
      gsap.fromTo('.br-viewer-hero, .br-stage-wrap', {opacity:0, y:24}, {opacity:1, y:0, duration:.7, stagger:.08, ease:'power3.out', delay:.05});
    }
    if(!suppressHash){ suppressHash = true; location.hash = '#brochure-' + slug; setTimeout(()=> suppressHash=false, 0); }
  }

  function closeViewer(){
    const finish = ()=>{
      viewerOverlay.classList.remove('active');
      viewerOverlay.setAttribute('aria-hidden','true');
      closeLightbox();
      activeProject = null;
      galleryOverlay.classList.add('active');
      galleryOverlay.setAttribute('aria-hidden','false');
      if(!suppressHash){ suppressHash = true; location.hash = '#brochures'; setTimeout(()=> suppressHash=false, 0); }
    };
    if(window.gsap){
      gsap.to(viewerOverlay, {opacity:0, duration:.4, ease:'power2.inOut', onComplete:()=>{
        gsap.set(viewerOverlay, {clearProps:'opacity'});
        finish();
      }});
    } else finish();
  }

  /* ---------- event wiring ---------- */
  card.addEventListener('click', ()=> openGallery(false));
  card.addEventListener('keydown', e=>{
    if(e.key==='Enter' || e.key===' '){ e.preventDefault(); openGallery(false); }
  });
  galleryBackTop.addEventListener('click', closeGallery);
  viewerBackTop.addEventListener('click', closeViewer);
  viewerBackBottom.addEventListener('click', closeViewer);
  contactBtn.addEventListener('click', e=>{
    e.preventDefault();
    e.stopImmediatePropagation();
    closeViewer();
    closeGallery();
    setTimeout(()=>{
      const contact = document.getElementById('contact');
      if(contact) contact.scrollIntoView({behavior:'smooth'});
    }, 50);
  });

  /* ---------- BROCHURE HASH ROUTING (deep links + back button) ---------- */
  function syncFromHash(){
    if(suppressHash) return;
    const h = location.hash;
    if(h === '#brochures'){
      if(!galleryOverlay.classList.contains('active')) openGallery(true);
      if(viewerOverlay.classList.contains('active')) closeViewer();
    } else if(h.indexOf('#brochure-') === 0){
      const slug = h.replace('#brochure-','');
      if(!galleryOverlay.classList.contains('active') && !viewerOverlay.classList.contains('active')){
        document.body.style.overflow = 'hidden';
        galleryOverlay.classList.add('active');
      }
      goToProject(slug, true);
    } else {
      if(viewerOverlay.classList.contains('active')){
        viewerOverlay.classList.remove('active'); viewerOverlay.setAttribute('aria-hidden','true');
      }
      if(galleryOverlay.classList.contains('active')){
        galleryOverlay.classList.remove('active'); galleryOverlay.setAttribute('aria-hidden','true');
        document.body.style.overflow = '';
      }
    }
  }
  window.addEventListener('hashchange', syncFromHash);
  if(location.hash === '#brochures' || location.hash.indexOf('#brochure-') === 0) syncFromHash();
})();

