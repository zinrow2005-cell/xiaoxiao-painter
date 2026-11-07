/* V1.8.24 — post-save actions. No new storage, no duplicate drawing engine. */
(()=>{
 'use strict';
 const modal=document.getElementById('savedNextModal');
 if(!modal)return;
 const dialog=modal.querySelector('.v1824-card');
 const next=document.getElementById('savedNextNext');
 const restart=document.getElementById('savedNextRestart');
 const picker=document.getElementById('savedNextPicker');
 const stay=document.getElementById('savedNextStay');
 let timer=null,previousFocus=null,pendingTemplate=null;
 const close=()=>{
   clearTimeout(timer);timer=null;
   modal.hidden=true;modal.setAttribute('aria-hidden','true');
   pendingTemplate=null;
   if(previousFocus?.isConnected && !previousFocus.disabled)previousFocus.focus({preventScroll:true});
 };
 const open=()=>{
   if(!document.querySelector('#drawView.active'))return;
   previousFocus=document.activeElement;
   modal.hidden=false;modal.setAttribute('aria-hidden','false');
   next.focus({preventScroll:true});
 };
 document.addEventListener('kidsdrawing:work-saved',e=>{
   clearTimeout(timer);
   pendingTemplate=e.detail?.templateId;
   timer=setTimeout(()=>{
     const check={templateId:pendingTemplate,valid:false};
     document.dispatchEvent(new CustomEvent('kidsdrawing:validate-saved-dialog',{detail:check}));
     if(check.valid && document.querySelector('#drawView.active'))open();
     else pendingTemplate=null;
   },1800); // allow existing star-reward overlay to finish first
 });
 const doAction=(target)=>{close();document.getElementById(target)?.click();};
 next.addEventListener('click',()=>doAction('nextTemplateBtn'));
 picker.addEventListener('click',()=>doAction('backToPickerBtn'));
 restart.addEventListener('click',()=>{close();document.dispatchEvent(new Event('kidsdrawing:restart-saved'))});
 stay.addEventListener('click',close);
 modal.addEventListener('click',e=>{if(e.target===modal)close()});
 document.addEventListener('keydown',e=>{
   if(modal.hidden)return;
   if(e.key==='Escape'){e.preventDefault();close()}
   if(e.key==='Tab'){
     const tabs=[next,restart,picker,stay];const idx=tabs.indexOf(document.activeElement);
     if(e.shiftKey&&idx<=0){e.preventDefault();tabs[tabs.length-1].focus()}
     else if(!e.shiftKey&&idx===tabs.length-1){e.preventDefault();tabs[0].focus()}
   }
 });
 const cancelPending=()=>{
   clearTimeout(timer);timer=null;pendingTemplate=null;
   if(!modal.hidden)close();
 };
 document.addEventListener('kidsdrawing:template-changed',cancelPending);
 document.querySelectorAll('#homeBtn,#galleryBtn,#backToPickerBtn,#prevTemplateBtn,#nextTemplateBtn,#randomTemplateBtn,#focusPrevTemplateBtn,#focusNextTemplateBtn').forEach(el=>el.addEventListener('click',cancelPending));
})();
