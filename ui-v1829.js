/* V1.8.29: Mobile quick colors delegate to the canonical fixed palette; no duplicate selection state. */
(()=>{
 'use strict';
 const strip=document.getElementById('v1829ColorStrip');
 const palette=document.getElementById('colorRow');
 const more=document.getElementById('v1829MoreColors');
 if(!strip||!palette)return;
 let updating=false;
 const sync=()=>{
   if(updating)return;
   updating=true;
   const original=[...palette.querySelectorAll('.color-chip[data-color]')];
   const chosen=original.find(x=>x.classList.contains('active'))?.dataset.color||'';
   // A stable set of buttons prevents focus from jumping when the canvas color changes.
   const key=original.map(x=>x.dataset.color).join('|');
   if(strip.dataset.key!==key){
     strip.replaceChildren(...original.map(o=>{
       const b=document.createElement('button');
       b.type='button';b.className='v1829-color-dot';b.dataset.color=o.dataset.color;
       b.style.background=o.dataset.color;
       b.setAttribute('aria-label','選擇顏色 '+o.dataset.color);
       b.addEventListener('click',()=>{
         const target=[...palette.querySelectorAll('.color-chip[data-color]')].find(x=>x.dataset.color===b.dataset.color);
         target?.click();
         requestAnimationFrame(sync);
       });
       return b;
     }));
     strip.dataset.key=key;
   }
   strip.querySelectorAll('.v1829-color-dot').forEach(b=>{
     const on=b.dataset.color.toLowerCase()===chosen.toLowerCase();
     b.classList.toggle('active',on);
     b.setAttribute('aria-pressed',String(on));
   });
   updating=false;
 };
 more?.addEventListener('click',()=>{
   const dock=document.getElementById('paletteDock');
   const toggle=document.getElementById('paletteToggleBtn');
   if(dock?.classList.contains('collapsed'))toggle?.click();
   const target=document.getElementById('colorRow');
   target?.scrollIntoView({behavior:'smooth',block:'nearest'});
 });
 const observer=new MutationObserver(sync);
 observer.observe(palette,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});
 sync();
 // Restore focus after navigating off/on draw view; no new drawing state is introduced.
 document.getElementById('drawQuickTools')?.addEventListener('click',()=>requestAnimationFrame(sync));
})();
