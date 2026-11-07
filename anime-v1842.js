// V1.8.42: introduce the game-art category without altering existing painting workflows.
document.addEventListener('DOMContentLoaded',()=>{
  const button=document.getElementById('openAnimeGalleryBtn');
  const demonButton=document.getElementById('openDemonGalleryBtn');
  if(demonButton)demonButton.addEventListener('click',()=>{
    if(typeof activeGameArtSeries!=='undefined')activeGameArtSeries='demon';
    if(typeof openCategoryPage==='function')openCategoryPage('anime-games');
  });
  if(button)button.addEventListener('click',()=>{
    if(typeof openCategoryPage==='function')openCategoryPage('anime-games');
  });
});
