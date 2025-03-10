"use strict";(()=>{var L=Object.defineProperty;var w=Object.getOwnPropertySymbols;var k=Object.prototype.hasOwnProperty,H=Object.prototype.propertyIsEnumerable;var C=(e,o,t)=>o in e?L(e,o,{enumerable:!0,configurable:!0,writable:!0,value:t}):e[o]=t;var E=(e,o)=>{var t={};for(var r in e)k.call(e,r)&&o.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&w)for(var r of w(e))o.indexOf(r)<0&&H.call(e,r)&&(t[r]=e[r]);return t};var p=(e,o,t)=>C(e,typeof o!="symbol"?o+"":o,t);function g(e,o){let t=document.createElement(e);if(!o)return t;if(o.attributes)for(let[a,i]of Object.entries(o.attributes))i?t.setAttribute(a,i):t.removeAttribute(a);o.style&&Object.assign(t.style,o.style);let n=o,{style:r,attributes:c}=n,d=E(n,["style","attributes"]);return Object.assign(t,d),t}var S=e=>{let o=document.querySelector(`#style-${e}`);return o||(o=g("style",{id:`style-${e}`}),document.head.appendChild(o)),o};var I=(e="base")=>`encore-internal-color-text-${e}`,y=(e="variable-text",o="base")=>`encore-text ${e==="variable-text"?`encore-${e}`:`encore-text-${e}`} ${I(o)}`;var h="lucid-guided-tour";var b=(e,o,t="")=>`<button class="${e} ${t} encore-text encore-text-body encore-internal-color-text-base">${o}</button>`,v=class extends HTMLElement{constructor(){super();p(this,"steps",[]);p(this,"currentStepIndex",0);p(this,"tooltip");p(this,"arrow");p(this,"eventElems",[]);S("guided-tour").textContent=`
      .tour-container, .tour-btn {
        border: var(--border-thickness, 1px) var(--border-style, solid) var(--border-color, rgba(var(--clr-surface-5-rgb), 0.25));
      }
      .tour-container {
        position: absolute;
        background-color: rgba(var(--clr-surface-1-rgb), 0.7);
        padding: 1.25rem 1.5rem;
        border-radius: 0.5rem;
        min-width: 20rem;
        box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.15);
        backdrop-filter: blur(0.75rem) saturate(1.5);
        z-index: 99999;
        opacity: 0;
        visibility: hidden;
        transform: translateY(-10px);
        transition: opacity 0.3s ease-out, visibility 0.3s ease-out, transform 0.3s ease-out, top 0.3s ease-out, left: 0.3s ease-out;
      }
      .tour-container.tour-container-visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
      }
      .tour-arrow {
        position: absolute;
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%) translateY(0);
        border: 10px solid transparent;
        border-bottom-color: var(--clr-secondary);
        transition: left 0.2s ease-out, top 0.2s ease-out;
      }
      .tour-container.tour-arrow-top .tour-arrow {
        bottom: auto;
        top: 100%;
        border-bottom-color: transparent;
        border-top-color: var(--clr-secondary);
        transform: translateX(-50%) translateY(-50%);
      }
      .tour-container.arrow-hidden .tour-arrow {
        display: none;
      }
      .hidden {
        display: none;
        visibility: hidden;
      }
      .tour-button-wrapper {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1rem;
        gap: 0.5rem;
      }
      .tour-button-group-right {
        display: flex;
        gap: 0.25rem;
      }
      .tour-btn {
        background-color: var(--clr-primary);
        color: var(--clr-on-primary);
        padding: 0.6rem 1rem;
        border: none;
        border-radius: 0.3rem;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 225ms ease-in-out, color 225ms ease-in-out;
      }
      .tour-btn:hover {
        color: var(--clr-primary);
        background-color: var(--clr-on-primary);
      }
      .tour-btn.skip-btn {
        background-color: var(--clr-tertiary);
        color: var(--clr-on-tertiary);
      }
      .tour-btn.skip-btn:hover {
        background-color: var(--clr-on-tertiary);
        color: var(--clr-tertiary);
      }
      .tour-btn.prev-btn {
        background-color: var(--clr-secondary);
        color: var(--clr-on-secondary);
      }
      .tour-btn.prev-btn:hover {
        background-color: var(--clr-on-secondary);
        color: var(--clr-secondary);
      }
    `}set tourSteps(t){this.steps=t}get tourSteps(){return this.steps}start(){this.currentStepIndex=0,this.showStep()}disablePointerEvents(){document.body.style.pointerEvents="none"}enablePointerEventsForTargetAndTooltip(t,r){var c;if(this.tooltip){if(this.eventElems=[r,this.tooltip],t.eventElems)for(let d of this.eventElems){let n=document.querySelectorAll((c=d.className)!=null?c:d.id);for(let a of n)this.eventElems.push(a)}for(let d of this.eventElems)d.style.pointerEvents="auto"}}resetPointerEvents(){document.body.style.pointerEvents="auto";for(let t of this.eventElems)t.style.pointerEvents="auto";this.eventElems=[]}displayTooltipForStep(t,r){return new Promise(c=>{this.tooltip||(this.tooltip=g("div",{className:"tour-container",innerHTML:'<div class="tour-arrow"></div>'}),document.body.appendChild(this.tooltip),this.arrow=this.tooltip.querySelector(".tour-arrow")),this.tooltip.classList.remove("hidden","arrow-hidden","tour-arrow-top"),this.tooltip.classList.add("tour-container-visible"),this.tooltip.innerHTML=`<div class="tour-arrow"></div>
        <div class="tour-message ${y("body-medium")}">${t.content}</div>
        <div class="tour-button-wrapper">
          ${b("skip-btn tour-btn","Skip Tour")}
          <div class="tour-button-group-right">
            ${b("prev-btn tour-btn hidden","Previous")}
            ${b("next-btn tour-btn",this.currentStepIndex===this.steps.length-1?"End Tour":"Next")}
          </div>
        </div>`,t.arrow===!1&&this.tooltip.classList.add("arrow-hidden");let d=this.tooltip.querySelector(".next-btn"),n=this.tooltip.querySelector(".prev-btn"),a=this.tooltip.querySelector(".skip-btn");n.classList.toggle("hidden",this.currentStepIndex===0),d.textContent=this.currentStepIndex===this.steps.length-1?"End Tour":"Next",d.onclick=()=>{var l;(l=t.onComplete)==null||l.call(t),this.currentStepIndex++,this.showStep()},n.onclick=()=>{var l;(l=t.onPrevious)==null||l.call(t),this.currentStepIndex--,this.showStep()},a.onclick=()=>{this.endTour()};let i=r.getBoundingClientRect();if(this.tooltip&&this.arrow){let l=i.top+i.height+15;l+this.tooltip.offsetHeight>window.innerHeight&&(l=i.top-this.tooltip.offsetHeight-15,this.tooltip.classList.add("tour-arrow-top"));let u=i.left+i.width/2-this.tooltip.offsetWidth/2;u<0?u=10:u+this.tooltip.offsetWidth>window.innerWidth&&(u=window.innerWidth-this.tooltip.offsetWidth-10),this.tooltip.style.top=`${l}px`,this.tooltip.style.left=`${u}px`,this.arrow.style.left=`${i.left+i.width/2-this.tooltip.offsetLeft}px`}c()})}async scrollToElementAndDisplayTooltip(t){let r=document.querySelector(t.target);if(!r){console.warn(`Target element not found: ${t.target}`),this.currentStepIndex++,this.showStep();return}if(r.offsetParent===null&&r.offsetWidth===0&&r.offsetHeight===0){console.warn(`Target element is not visible: ${t.target}`),this.currentStepIndex++,this.showStep();return}r.scrollIntoView({behavior:"smooth",block:"start"}),await new Promise(c=>{var d;return setTimeout(c,(d=t.wait)!=null?d:500)}),this.disablePointerEvents(),await this.displayTooltipForStep(t,r),this.enablePointerEventsForTargetAndTooltip(t,r)}showStep(){if(this.currentStepIndex>=this.steps.length){this.endTour();return}let t=this.steps[this.currentStepIndex];this.scrollToElementAndDisplayTooltip(t)}endTour(){console.debug("Tour skipped or ended."),this.resetPointerEvents(),this.tooltip?(this.tooltip.classList.remove("tour-container-visible"),this.tooltip.addEventListener("transitionend",()=>{var t;(t=this.tooltip)!=null&&t.parentElement&&(this.tooltip.remove(),this.tooltip=void 0,this.arrow=void 0)},{once:!0})):(this.tooltip=void 0,this.arrow=void 0),localStorage.removeItem(h)}};customElements.define("guided-tour",v);var s=null,$=()=>{try{localStorage.getItem(h)||(s||(s=f()),localStorage.setItem(h,"true"),s==null||s.open())}catch(e){console.error("Failed to open guided tour modal.",e)}},x=()=>{var e,o,t;(t=(o=(e=window==null?void 0:window.lucid)==null?void 0:e.settings)==null?void 0:o.openSettings)==null||t.call(o)};function T(e=(t=>(t=(o=>(o=window==null?void 0:window.lucid)==null?void 0:o.store)())==null?void 0:t.getState())()){function r(){var n,a,i,l,u,m;(i=(a=(n=window==null?void 0:window.lucid)==null?void 0:n.settings)==null?void 0:a.openSettings)==null||i.call(a),(m=(u=(l=window==null?void 0:window.lucid)==null?void 0:l.settings)==null?void 0:u.settingModal)==null||m.addEventListener("close",x)}return[...e.position==="nav"?[{target:"button[aria-label='Lucid Settings']",content:"Click here to open settings.",onComplete:r,eventElems:["button[aria-label='Lucid Settings']"]}]:[{target:".main-userWidget-box",content:"Settings open button is in this context menu. Click to open it.",onComplete:()=>{var n;(n=document.querySelector(".main-userWidget-box"))==null||n.click()},eventElems:[".main-userWidget-box"]},{target:".main-userWidget-dropDownMenu .main-contextMenu-menuItem:nth-child(3)",content:"Click here to open settings.",wait:500,onComplete:r,eventElems:[".main-userWidget-dropDownMenu .main-contextMenu-menuItem:nth-child(3)"]}],{target:"lucid-settings-modal .modal-header-container",content:"Explore settings to customize your experience.",arrow:!1,eventElems:[".modal-header-container"]},{target:'lucid-settings-modal setting-section[data-tab-id="background"] .header-wrapper',content:`Let's start with the "Background" tab to explore the theme background.`,arrow:!0,wait:700,eventElems:['lucid-settings-modal setting-section[data-tab-id="background"] .header-wrapper']},{target:"lucid-settings-modal custom-button.close",content:"Once you are done, click here to close the settings modal.",arrow:!0,onComplete:()=>{var n,a,i,l,u,m;(i=(a=(n=window==null?void 0:window.lucid)==null?void 0:n.settings)==null?void 0:a.settingModal)==null||i.removeEventListener("close",x),(m=(u=(l=window==null?void 0:window.lucid)==null?void 0:l.settings)==null?void 0:u.closeSettings)==null||m.call(u)},eventElems:["lucid-settings-modal custom-button.close"]}]}var f=()=>{var d,n,a,i;if(!(window!=null&&window.Modal))return null;let e=new v;e.tourSteps=T(),(a=(n=(d=window==null?void 0:window.lucid)==null?void 0:d.store)==null?void 0:n.subscribe)==null||a.call(n,l=>{e.tourSteps=T(l)},"position"),s=new window.Modal,s.open(),s.setHeader("Welcome to Lucid Theme!");let o=g("div",{className:"tour-container arrow-hidden tour-container-visible",style:{position:"relative"},innerHTML:`
      <div class="tour-arrow"></div>
      <div class="tour-message ${y("body-medium")}">
        Ready to explore lucid theme with a quick guided tour?
      </div>
      <div class="tour-button-wrapper">
        ${b("skip-btn tour-btn","Skip Tour")}
        ${b("start-tour-btn tour-btn","Start Tour")}
      </div>`});s.setContent(o),(i=document.getElementById("lucid-main")||document.getElementById("main"))==null||i.appendChild(s);let r=o.querySelector(".start-tour-btn"),c=o.querySelector(".skip-btn");return r.onclick=()=>{e.start(),e.tourSteps=T(),s==null||s.close()},c.onclick=()=>{e.endTour(),s==null||s.close()},s.addEventListener("open",()=>{localStorage.setItem(h,"true")}),s};f();var M;(M=window==null?void 0:window.lucid)!=null&&M.guide&&(window.lucid.guide.open=$,window.lucid.guide.setup=f);})();
