/* V1.8.28 - Synchronize the illustrated tier controls with the canonical app filter. */
(()=>{
  const cards=[...document.querySelectorAll('.v1827-tier')];
  const status=document.getElementById('v1827LevelStatus');
  const all=document.getElementById('v1827AllLevels');
  if(!cards.length)return;
  cards.forEach(card=>card.addEventListener('click',()=>{
    const begin=Number(card.dataset.startLv);
    if(typeof window.setHomeLevelRange==='function')window.setHomeLevelRange(begin);
  }));
  all?.addEventListener('click',()=>{
    if(typeof window.setHomeLevelRange==='function'){
      // An explicit 'all' action must clear the exact-LV filter too.
      const selected=document.querySelector('#levelGrid .level-btn.active');
      if(selected)selected.click();
      else window.setHomeLevelRange(null);
    }
  });
  document.addEventListener('kidsdrawing:level-filter-changed',e=>{
    const {level,range,label,count}=e.detail||{};
    cards.forEach(card=>{
      const on=!level&&Number(card.dataset.startLv)===range;
      card.setAttribute('aria-pressed',String(on));
      card.classList.toggle('active',on);
    });
    if(status)status.textContent=`${label||'全部難度'}・${count??0} 張`;
  });
  // Initial state is all levels; renderHome() in app.js runs before this file.
  if(status)status.textContent='全部難度';
})();
