/* V1.8.78 iPad guide panel: put the real existing controls in a viewport dialog.
   No cloning: original control events/data remain intact. */
(()=>{
'use strict';
const details=document.getElementById('guideCompactPanel');
const originalBody=details?.querySelector(':scope > .compact-tool-body');
const content=originalBody?.querySelector('.guide-style-panel');
if(!details||!originalBody||!content)return;
const tablet=()=>matchMedia('(min-width:651px) and (pointer:coarse)').matches ||
  (matchMedia('(min-width:651px) and (max-width:1100px)').matches);
const overlay=document.createElement('div');
overlay.id='tabletGuideOverlay1878';overlay.hidden=true;
overlay.innerHTML='<section class="tablet-guide-dialog" role="dialog" aria-modal="true" aria-labelledby="tabletGuideTitle1878"><header class="tablet-guide-head"><strong id="tabletGuideTitle1878">🖼️ 圖案／底圖設定</strong><button type="button" id="tabletGuideClose1878" aria-label="關閉圖案底圖設定">✕ 關閉</button></header><div id="tabletGuideHost1878" class="tablet-guide-host"></div></section>';
document.body.appendChild(overlay);
const host=overlay.querySelector('#tabletGuideHost1878');
const close=overlay.querySelector('#tabletGuideClose1878');
let portalOpen=false;let active=false;let priorFocus=null;
function restore(){
 if(!portalOpen)return;
 portalOpen=false;overlay.hidden=true;originalBody.appendChild(content);
 document.body.classList.remove('tablet-guide-dialog-open');
 if(priorFocus?.isConnected)priorFocus.focus({preventScroll:true});
 priorFocus=null;
}
function open(){
 if(!tablet()||document.body.classList.contains('draw-focus-mode'))return;
 if(portalOpen)return;
 priorFocus=document.activeElement;
 host.appendChild(content);portalOpen=true;overlay.hidden=false;
 document.body.classList.add('tablet-guide-dialog-open');
 requestAnimationFrame(()=>close.focus({preventScroll:true}));
}
function synchronize(){
 const shouldOpen=tablet() && details.open &&
   document.getElementById('drawView')?.classList.contains('active') &&
   !document.body.classList.contains('draw-focus-mode');
 if(shouldOpen)open();else restore();
}
function dismiss(){details.open=false;restore();}
close.addEventListener('click',dismiss);
overlay.addEventListener('click',e=>{if(e.target===overlay)dismiss();});
document.addEventListener('keydown',e=>{if(!portalOpen)return;
 if(e.key==='Escape'){e.preventDefault();dismiss();return;}
 if(e.key==='Tab'){
   const els=[...overlay.querySelectorAll('button,input,a,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled&&el.offsetParent!==null);
   if(!els.length)return;
   if(e.shiftKey&&document.activeElement===els[0]){e.preventDefault();els[els.length-1].focus();}
   else if(!e.shiftKey&&document.activeElement===els[els.length-1]){e.preventDefault();els[0].focus();}
 }
});
details.addEventListener('toggle',synchronize);
window.addEventListener('resize',synchronize,{passive:true});
document.getElementById('drawFullscreenBtn')?.addEventListener('click',()=>{if(portalOpen)dismiss();},true);
new MutationObserver(synchronize).observe(document.body,{attributes:true,attributeFilter:['class']});
const draw=document.getElementById('drawView');if(draw)new MutationObserver(synchronize).observe(draw,{attributes:true,attributeFilter:['class']});
synchronize();
})();
