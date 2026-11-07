/* V1.8.63 compact brush + palette icon controls. Reuses originals, no duplicate painting state. */
(()=>{
 'use strict';
 const $=id=>document.getElementById(id);
 const details=$('paletteBrushDetails'), brushControls=details?.querySelector('.brush-control-panel');
 const dock=$('paletteDock'), colorRow=$('colorRow');
 if(!details||!brushControls||!dock||!colorRow)return;
 const wrap=document.createElement('div');wrap.id='compactPainterToolsV1862';wrap.setAttribute('role','toolbar');wrap.setAttribute('aria-label','筆觸與調色盤');
 const makeButton=(id,img,label)=>{const btn=document.createElement('button');btn.id=id;btn.type='button';btn.className='compact-painter-icon';btn.title=label;btn.setAttribute('aria-label',label);btn.setAttribute('aria-expanded','false');btn.innerHTML=`<img src="${img}" alt=""><span>${label}</span>`;wrap.append(btn);return btn;};
 const brushButton=makeButton('compactBrushIconV1862','./assets/ui/v1826/brush.webp','筆觸');
 const colorButton=makeButton('compactColorIconV1862','./assets/ui/crayon-icons/palette.svg','調色盤');
 const colorDot=document.createElement('i');colorDot.className='compact-current-color';colorDot.setAttribute('aria-hidden','true');colorButton.append(colorDot);
 document.body.append(wrap);
 const box=document.createElement('section');box.id='compactPainterPanelV1862';box.hidden=true;box.setAttribute('role','dialog');box.setAttribute('aria-modal','false');
 const head=document.createElement('div');head.className='compact-panel-head';const title=document.createElement('strong');const close=document.createElement('button');close.type='button';close.textContent='✕';close.setAttribute('aria-label','關閉設定');head.append(title,close);box.append(head);
 const brushHost=document.createElement('div');brushHost.className='compact-brush-host';brushHost.append(brushControls);
 const colorsHost=document.createElement('div');colorsHost.className='compact-color-host';
 // Move the real swatch/color buttons (and custom-color controls) rather than cloning their state.
 const current=$('currentColorSwatch'),custom=$('customColorSection'),tip=dock.querySelector('.palette-color-tip');
 for(const item of [current,colorRow,custom,tip])if(item)colorsHost.append(item);
 const more=$('v1829MoreColors');
 const moreColors=document.createElement('button');moreColors.type='button';moreColors.className='compact-more-colors';moreColors.textContent='🌈 更多顏色';moreColors.addEventListener('click',()=>more?.click());colorsHost.append(moreColors);
 box.append(brushHost,colorsHost);document.body.append(box);
 let opened=null;
 const isMobile=()=>window.innerWidth<=650;
 const isFullscreen=()=>document.body.classList.contains('draw-focus-mode');
 const isDrawing=()=>$('drawView')?.classList.contains('active')||isFullscreen();
 function reposition(){
   wrap.hidden=!isDrawing();if(wrap.hidden){box.hidden=true;return;}
   const d=dock.getBoundingClientRect();
   wrap.classList.toggle('is-fullscreen',isFullscreen());wrap.classList.toggle('is-mobile',isMobile());
   wrap.style.left='';wrap.style.top='';wrap.style.bottom='';wrap.style.right='';
   if(!isMobile()&&!isFullscreen()){
     // Keep the two icons clearly separated from the collapsible palette rail.
     const railOffset=dock.classList.contains('collapsed')?12:10;
     const desiredLeft=d.right+railOffset;
     const desiredTop=Math.max(84,d.top+8);
     wrap.style.left=Math.max(8,Math.min(window.innerWidth-150,desiredLeft))+'px';
     wrap.style.top=Math.max(72,Math.min(window.innerHeight-120,desiredTop))+'px';
   }
   if(!box.hidden){
     box.style.left='';box.style.top='';box.style.right='';box.style.bottom='';
     if(!isMobile()){
       const button=(opened==='brush'?brushButton:colorButton).getBoundingClientRect();
       const w=Math.min(316,window.innerWidth-24);
       const left=isFullscreen()?Math.max(12,window.innerWidth-w-18):Math.min(window.innerWidth-w-12,Math.max(12,d.right+12));
       const top=isFullscreen()?72:Math.min(Math.max(75,button.top),Math.max(75,window.innerHeight-390));
       box.style.left=left+'px';box.style.top=top+'px';
     }
   }
 }
 function setOpen(mode){
   opened=opened===mode?null:mode;
   box.hidden=!opened;
   brushHost.hidden=opened!=='brush';colorsHost.hidden=opened!=='color';
   title.textContent=opened==='brush'?'🖌️ 筆觸設定':'🎨 調色盤';box.setAttribute('aria-label',title.textContent);
   brushButton.classList.toggle('selected',opened==='brush');colorButton.classList.toggle('selected',opened==='color');
   brushButton.setAttribute('aria-expanded',String(opened==='brush'));colorButton.setAttribute('aria-expanded',String(opened==='color'));
   $('quickBrushBtn')?.setAttribute('aria-expanded',String(opened==='brush'));
   $('quickPaletteBtn')?.setAttribute('aria-expanded',String(opened==='color'));
   $('fullscreenBrushToggle')?.setAttribute('aria-expanded',String(opened==='brush'));
   $('fullscreenPaletteToggle')?.setAttribute('aria-expanded',String(opened==='color'));
   details.open=false;
   reposition();
 }
 brushButton.addEventListener('click',()=>setOpen('brush'));
 colorButton.addEventListener('click',()=>setOpen('color'));
 close.addEventListener('click',()=>setOpen(null));
 // Disable the legacy summary/details toggle while keeping original brush controls interactive.
 details.querySelector('summary')?.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();setOpen('brush');},true);
 for(const [id,mode] of [['quickBrushBtn','brush'],['quickPaletteBtn','color'],['fullscreenBrushToggle','brush'],['fullscreenPaletteToggle','color']]){
   $(id)?.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();setOpen(mode);},true);
 }
 document.addEventListener('pointerdown',e=>{if(!opened||box.contains(e.target)||wrap.contains(e.target)||e.target.closest?.('#quickBrushBtn,#quickPaletteBtn,#fullscreenBrushToggle,#fullscreenPaletteToggle'))return;setOpen(null)},true);
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&opened){e.stopImmediatePropagation();setOpen(null);}},true);
 $('drawFullscreenBtn')?.addEventListener('click',()=>setOpen(null),true);
 window.addEventListener('resize',reposition,{passive:true});window.addEventListener('scroll',reposition,{passive:true,capture:true});
 // Observe actual draw route and focus shell, not every style update.
 const observer=new MutationObserver(()=>{if(!isDrawing()&&opened)setOpen(null);reposition();});
 observer.observe(document.body,{attributes:true,attributeFilter:['class']});
 if($('drawView'))observer.observe($('drawView'),{attributes:true,attributeFilter:['class']});
 if(dock)observer.observe(dock,{attributes:true,attributeFilter:['class']});
 // Reflect actual selected color on compact icon; read rendered background, no second color state.
 const updateColor=()=>{if(current){const bg=getComputedStyle(current).backgroundColor;if(bg&&bg!=='rgba(0, 0, 0, 0)')colorDot.style.background=bg}};
 const colorObserver=new MutationObserver(updateColor);if(current)colorObserver.observe(current,{attributes:true,attributeFilter:['style','class']});
 document.addEventListener('click',e=>{if(e.target.closest?.('#colorRow,#customColorRow,#colorWheelShell'))requestAnimationFrame(updateColor)});
 // Legacy fullscreen brush shell class must not hide the new independent controls.
 $('drawFullscreenShell')?.classList.add('brush-controls-collapsed');
 setOpen(null);reposition();updateColor();
})();
