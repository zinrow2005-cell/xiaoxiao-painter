/* V1.8.30 - Mobile palette lifecycle; no duplicate brush or color state. */
(()=>{
 'use strict';
 const view=document.getElementById('drawView');
 const dock=document.getElementById('paletteDock');
 const toggle=document.getElementById('paletteToggleBtn');
 const backdrop=document.getElementById('v1830PaletteBackdrop');
 const toolsToggle=document.getElementById('v1830ToggleQuickTools');
 if(!view||!dock||!toggle||!backdrop||!toolsToggle)return;
 const mobile=()=>window.matchMedia('(max-width:650px)').matches;
 const inFullscreen=()=>Boolean(document.querySelector('.draw-fullscreen-shell')?.contains(dock));
 const sync=()=>{
   const open=mobile()&&!inFullscreen()&&!dock.classList.contains('collapsed')&&view.classList.contains('active');
   view.classList.toggle('v1830-palette-open',open);
   toolsToggle.setAttribute('aria-expanded',String(!view.classList.contains('v1830-tools-minimized')));
   toolsToggle.innerHTML=view.classList.contains('v1830-tools-minimized')?'展開工具 <span aria-hidden="true">⌄</span>':'收合工具 <span aria-hidden="true">⌃</span>';
   dock.setAttribute('aria-modal',String(open));
   if(open){dock.setAttribute('role','dialog');dock.setAttribute('aria-label','畫具與調色盤');}
   else{dock.removeAttribute('role');}
 };
 toolsToggle.addEventListener('click',()=>{
   view.classList.toggle('v1830-tools-minimized');sync();
 });
 const close=()=>{if(!dock.classList.contains('collapsed'))toggle.click();sync();};
 backdrop.addEventListener('click',close);
 document.addEventListener('keydown',e=>{
   if(e.key==='Escape'&&view.classList.contains('v1830-palette-open')){e.preventDefault();close();document.getElementById('quickPaletteBtn')?.focus();}
 });
 // Keep sheet state in sync with the original palette, navigation and orientation changes.
 const observer=new MutationObserver(sync);
 observer.observe(dock,{attributes:true,attributeFilter:['class']});
 observer.observe(view,{attributes:true,attributeFilter:['class']});
 window.addEventListener('resize',sync,{passive:true});
 window.addEventListener('orientationchange',sync,{passive:true});
 // Existing buttons perform actual tool/color operations. The sheet only wraps them.
 sync();
})();
