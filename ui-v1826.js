/* V1.8.26: bridge artwork tiles to existing, already-wired app controls. */
(()=>{
  const bind=(id,original)=>{
    const control=document.getElementById(id), old=document.getElementById(original);
    if(control && old)control.addEventListener('click',()=>old.click());
  };
  const setup=()=>{
    bind('v1826Start','heroStartBtn');bind('v1826Sample','openStyleBoardBtn');
    bind('v1826Random','homeRandomBtn');bind('v1826Library','heroBrowseBtn');
    bind('v1826Works','galleryBtn');
    const grid=document.getElementById('levelGrid');
    if(grid){
      const decorate=()=>{grid.querySelectorAll('.level-btn').forEach((b,i)=>{
        const lv=Number(b.dataset.lv)||i+1;
        const level=lv<=2?'入門':lv<=5?'基礎':lv<=8?'進階':'挑戰';
        const icons={入門:'🐣',基礎:'🚙',進階:'🏡',挑戰:'🏰'};
        b.classList.add('v1826-level'); b.dataset.tier=level;
        b.innerHTML='<span class="v1826-level-icon">'+icons[level]+'</span><strong>LV '+lv+'</strong><span>'+level+'</span>';
        b.setAttribute('aria-label','難度 '+lv+'，'+level);
      });};
      decorate();
      const obs=new MutationObserver(()=>{obs.disconnect();decorate();obs.observe(grid,{childList:true});});
      obs.observe(grid,{childList:true});
    }
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup,{once:true});else setup();
})();
