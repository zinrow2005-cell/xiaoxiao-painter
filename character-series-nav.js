(()=>{
  function launch(series){
    const open=document.getElementById('openAnimeGalleryBtn');
    if(open)open.click();
    const tab=document.querySelector(`[data-game-series="${series}"]`);
    if(tab)tab.click();
  }
  [['openPeppaGalleryBtn','peppa'],['openBlueyGalleryBtn','bluey']].forEach(([id,series])=>{
    const el=document.getElementById(id);if(el)el.addEventListener('click',()=>launch(series));
  });
})();
