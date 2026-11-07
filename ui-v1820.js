/* V1.8.20: accessible navigation actions only; preserve original app functionality. */
(()=>{
  const start=document.getElementById('heroStartBtn');
  const browse=document.getElementById('heroBrowseBtn');
  const random=document.getElementById('homeRandomBtn');
  const library=document.getElementById('categoryGrid');
  if(start){
    start.addEventListener('click',()=>{
      // Start drawing = choose a subject first; random is a separate action.
      const picker=document.getElementById('categoryGrid')||document.getElementById('templateGrid');
      if(!picker)return;
      picker.scrollIntoView({behavior:'smooth',block:'start'});
      picker.classList.remove('v1855-pick-highlight');
      void picker.offsetWidth;
      picker.classList.add('v1855-pick-highlight');
      window.setTimeout(()=>picker.classList.remove('v1855-pick-highlight'),2300);
    });
  }
  if(browse && library)browse.addEventListener('click',()=>library.scrollIntoView({behavior:'smooth',block:'start'}));
})();
