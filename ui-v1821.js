/* V1.8.21: lightweight mobile shortcuts; state lives exclusively in app.js. */
(()=>{
 'use strict';
 const bar=document.getElementById('drawQuickTools');
 if(!bar)return;
 const $=q=>document.querySelector(q);
 const $$=q=>Array.from(document.querySelectorAll(q));
 const compact=()=>window.matchMedia('(max-width:650px)').matches;
 const palette=$('#paletteDock');
 const toggle=$('#paletteToggleBtn');
 const quickPalette=$('#quickPaletteBtn');
 const quickBrush=$('#quickBrushBtn');
 const sync=()=>{
   const selected=$('#toolGroup .tool-btn.active')?.dataset.tool;
   $$('[data-quick-tool]').forEach(button=>{
     const active=button.dataset.quickTool===selected;
     button.classList.toggle('active',active);
     button.setAttribute('aria-pressed',String(active));
   });
   quickPalette?.setAttribute('aria-expanded',String(!!palette&&!palette.classList.contains('collapsed')));
   const brush=$('.brush-control-panel');
   quickBrush?.setAttribute('aria-expanded',String(!!brush&&!brush.classList.contains('quick-brush-hidden')));
 };
 $$('[data-quick-tool]').forEach(button=>button.addEventListener('click',()=>{
   const original=$(`#toolGroup .tool-btn[data-tool="${button.dataset.quickTool}"]`);
   if(!original)return;
   original.click();
   if(compact()&&palette&&!palette.classList.contains('collapsed'))toggle?.click();
   sync();
 }));
 quickPalette?.addEventListener('click',()=>{
   if(!palette||!toggle)return;
   if(palette.classList.contains('collapsed'))toggle.click();
   else toggle.click();
   sync();
 });
 quickBrush?.addEventListener('click',()=>{
   const panel=$('.brush-control-panel');
   if(!panel)return;
   // Reveal the original brush-size controls without duplicating their inputs.
   const hidden=panel.classList.toggle('quick-brush-hidden');
   quickBrush.classList.toggle('active',!hidden);
   quickBrush.setAttribute('aria-expanded',String(!hidden));
 });
 // Only use a mutation observer on the small class-bearing controls.
 if(window.MutationObserver){
   const observer=new MutationObserver(sync);
   $$('#toolGroup .tool-btn').forEach(b=>observer.observe(b,{attributes:true,attributeFilter:['class']}));
   if(palette)observer.observe(palette,{attributes:true,attributeFilter:['class']});
 }
 if(compact())$('.brush-control-panel')?.classList.add('quick-brush-hidden');
 sync();
})();
