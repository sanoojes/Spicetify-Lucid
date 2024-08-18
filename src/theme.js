(async()=>{for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(e=>setTimeout(e,10));var V,n,R,D,z,F,G,T,A,W,U,_,C,e,t,a,q,H,l,J,Z,X,Y,K,Q,ee,te,ae,r,le,re,o,ne,oe,s,c,u,ie,se,d,ce,ue,de,me,pe,i,fe,m,p,ge,f,be,g,b,y,v,h,ye,ve,w,he,we,k,ke,E,Ee,Se,S,x,xe,L,_e,Ce,P,M,Le,Pe,N,Me,B,Ne,Be,$e,$,je,Ie,Oe,Ve,Re,De,ze,Fe,Ge,Te,j,Ae,We,Ue,qe,He;async function Je(){var e,t;window.isCustomControls||(t=J(),e=Z(),t=Math.round(t**.912872807*100/100-3),await Spicetify.CosmosAsync.post("sp://messages/v1/container/control",{type:"update_titlebar",height:t}),!window.isWindows)||window.isCustomControls||window.isLightMode||(t=X(135,e,1),window.rootStyle.setProperty("--control-height","64px"),window.rootStyle.setProperty("--control-width",t+"px"))}function I(e,t,a){return"#"+(e<<16|t<<8|a).toString(16).padStart(6,"0")}function Ze(e,t,a){var[e,t,a]=[e/255,t/255,a/255],[e,t,a]=[e<=.03928?e/12.92:((e+.055)/1.055)**2.4,t<=.03928?t/12.92:((t+.055)/1.055)**2.4,a<=.03928?a/12.92:((a+.055)/1.055)**2.4];return.2126*e+.7152*t+.0722*a}function Xe(e,t){return C(_({},e),{r:Math.max(0,Math.round(e.r*t)),g:Math.max(0,Math.round(e.g*t)),b:Math.max(0,Math.round(e.b*t)),hex:I(Math.max(0,Math.round(e.r*t)),Math.max(0,Math.round(e.g*t)),Math.max(0,Math.round(e.b*t)))})}function O(e,t){return C(_({},e),{r:Math.min(255,Math.round(e.r+(255-e.r)*t)),g:Math.min(255,Math.round(e.g+(255-e.g)*t)),b:Math.min(255,Math.round(e.b+(255-e.b)*t)),hex:I(Math.min(255,Math.round(e.r+(255-e.r)*t)),Math.min(255,Math.round(e.g+(255-e.g)*t)),Math.min(255,Math.round(e.b+(255-e.b)*t)))})}function Ye(e,t){e=Ze(e.r,e.g,e.b),t=Ze(t.r,t.g,t.b);return(Math.max(e,t)+.05)/(Math.min(e,t)+.05)}async function Ke(r){try{var n=await(0,de.loadImage)(r),o=Math.max(n.width/20,10),i=Math.max(n.height/20,10),s=(0,de.createCanvas)(o,i).getContext("2d"),c=(s.drawImage(n,0,0,o,i),s.getImageData(0,0,o,i)),u=c.data,d={};let t={};var m=Math.floor(.2*u.length);for(let e=0;e<m;e+=4){var p=u[e],f=u[e+1],g=u[e+2],b=p+`-${f}-`+g;d[b]=(d[b]||0)+1,t[b]={r:p,g:f,b:g,hex:I(p,f,g)}}var y=Object.entries(d).sort((e,t)=>t[1]-e[1]).map(([e])=>t[e]),v=y[0];let e=y[1],a=y[2],l=2;for(;!e||Ye(v,e)<2.5;){if(l>=y.length){e=O(v,.2);break}e=y[l],l++}for(;!a||Ye(v,a)<2.5||Ye(e,a)<2.5;){if(l>=y.length){a=O(e,.2);break}a=y[l],l++}var h,w={main:Xe(v,.8),sidebar:Xe(e,.9),card:Xe(a,.9),accent:O(a,.4),highlight:O(e,.2),button:O(a,.4),"button-active":O(a,.4),text:O(v,.8),subtext:O(v,.9),primary:v,secondary:e,tertiary:a};for(h of[w.main,w.sidebar,w.card]).3<Ze(h.r,h.g,h.b)&&(h.r=Math.max(0,Math.round(.7*h.r)),h.g=Math.max(0,Math.round(.7*h.g)),h.b=Math.max(0,Math.round(.7*h.b)),h.hex=I(h.r,h.g,h.b)),h=(k=h,E=.5,x=S=void 0,S=Math.max(0,Math.min(255,Math.round(k.r*E))),x=Math.max(0,Math.min(255,Math.round(k.g*E))),E=Math.max(0,Math.min(255,Math.round(k.b*E))),C(_({},k),{r:S,g:x,b:E,hex:I(S,x,E)}));return w.accent&&w.main&&Ye(w.accent,w.main)<4.5&&(w.accent=O(w.accent,.2)),w}catch(e){return console.error("Error extracting colors:",e),e}var k,E,S,x}async function Qe(t,e){try{if(e){if(!window.currentArtUrl)return null;var a,l,r=await Ke(window.currentArtUrl);if(r instanceof Error)return console.error("[Lucid] Error extracting colors:",r.message),null;let e=":root{";for([a,l]of Object.entries(r))e+=` --spice-${a}: ${l.hex} !important;
 --spice-rgb-${a}: ${l.r}, ${l.g}, ${l.b} !important;
`;return e+="}",t.innerHTML=e,r}return t.innerHTML="",null}catch(e){return console.error("Error saving colors to style:",e),null}}async function et(e){e&&e.remove()}V=Object.create,n=Object.defineProperty,R=Object.defineProperties,D=Object.getOwnPropertyDescriptor,z=Object.getOwnPropertyDescriptors,F=Object.getOwnPropertyNames,G=Object.getOwnPropertySymbols,T=Object.getPrototypeOf,A=Object.prototype.hasOwnProperty,W=Object.prototype.propertyIsEnumerable,U=(e,t,a)=>t in e?n(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,_=(e,t)=>{for(var a in t=t||{})A.call(t,a)&&U(e,a,t[a]);if(G)for(var a of G(t))W.call(t,a)&&U(e,a,t[a]);return e},C=(e,t)=>R(e,z(t)),t=(e,t,a)=>(a=null!=e?V(T(e)):{},((t,a,l,r)=>{if(a&&"object"==typeof a||"function"==typeof a)for(let e of F(a))A.call(t,e)||e===l||n(t,e,{get:()=>a[e],enumerable:!(r=D(a,e))||r.enumerable});return t})(!t&&e&&e.__esModule?a:n(a,"default",{value:e,enumerable:!0}),e)),a=(e=(e,t)=>function(){return t||(0,e[F(e)[0]])((t={exports:{}}).exports,t),t.exports})({"external-global-plugin:react"(e,t){t.exports=Spicetify.React}}),q=e({"node_modules/canvas/lib/parse-font.js"(e,t){var a=`'([^']+)'|"([^"]+)"|[\\w\\s-]+`,r=new RegExp("(bold|bolder|lighter|[1-9]00) +","i"),n=new RegExp("(italic|oblique) +","i"),o=new RegExp("(small-caps) +","i"),i=new RegExp("(ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded) +","i"),s=new RegExp(`([\\d\\.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q) *((?:${a})( *, *(?:${a}))*)`),c={};t.exports=e=>{if(c[e])return c[e];var t=s.exec(e);if(t){var a,l={weight:"normal",style:"normal",stretch:"normal",variant:"normal",size:parseFloat(t[1]),unit:t[2],family:t[3].replace(/["']/g,"").replace(/ *, */g,",")},t=e.substring(0,t.index);switch((a=r.exec(t))&&(l.weight=a[1]),(a=n.exec(t))&&(l.style=a[1]),(a=o.exec(t))&&(l.variant=a[1]),(a=i.exec(t))&&(l.stretch=a[1]),l.unit){case"pt":l.size/=.75;break;case"pc":l.size*=16;break;case"in":l.size*=96;break;case"cm":l.size*=96/2.54;break;case"mm":l.size*=96/25.4;break;case"%":break;case"em":case"rem":l.size*=16/.75;break;case"q":l.size*=96/25.4/4}return c[e]=l}}}}),e=e({"node_modules/canvas/browser.js"(e){var t=q();e.parseFont=t,e.createCanvas=function(e,t){return Object.assign(document.createElement("canvas"),{width:e,height:t})},e.createImageData=function(e,t,a){switch(arguments.length){case 0:return new ImageData;case 1:return new ImageData(e);case 2:return new ImageData(e,t);default:return new ImageData(e,t,a)}},e.loadImage=function(r,n){return new Promise(function(e,t){let a=Object.assign(document.createElement("img"),n);function l(){a.onload=null,a.onerror=null}a.onload=function(){l(),e(a)},a.onerror=function(){l(),t(new Error('Failed to load the image "'+r+'"'))},a.src=r})}}}),H=t(a()),l=t(a()),J=()=>{var e=window.innerWidth;return window.outerWidth/e*100},Z=()=>window.innerWidth/window.outerWidth,X=(e,t,a=1,l=0,r=Number.POSITIVE_INFINITY)=>Math.max(l,Math.min(e*(t+a-1),r)),Y=t(a()),K=()=>{var e=Y.default.useRef(null);return Y.default.createElement("div",{ref:e,className:"lucid-transperent-window-controls"})},Q=t(a()),ee=Spicetify.React.createContext(null),te=({children:e})=>{let[t,a]=Q.default.useState(!1);return Q.default.createElement(ee.Provider,{value:{isOpen:t,openModal:()=>a(!0),closeModal:()=>a(!1)}},e)},ae=()=>{var e=Spicetify.React.useContext(ee);if(e)return e;throw new Error("[Lucid] Wrap Element with ModalContextProvider")},r=t(a()),le=t(a()),re=()=>le.default.createElement("div",{className:"static-background"}),o=t(a()),ne=()=>o.default.createElement("div",{className:"animated-background-container"},o.default.createElement("div",{className:"back"}),o.default.createElement("div",{className:"backleft"}),o.default.createElement("div",{className:"backright"}),o.default.createElement("div",{className:"front"})),oe=t(a()),s=t(a()),c="lucid:background",u={animated:{blur:"62px",opacity:"1",contrast:"1.1",brightness:"0.8",saturation:"1.5",time:"35s"},static:{blur:"32px",opacity:"1",contrast:"1.1",saturation:"1.2",brightness:"0.8"},solid:{opacity:"1",bgColor:"var(--spice-main, #202020)",brightness:"0.9",backdropBlur:"0"}},ie=Spicetify.React.createContext(null),se=({children:e})=>{let[t,a]=s.default.useState(localStorage.getItem(c)?JSON.parse(localStorage.getItem(c)||"{}").selectedBackground:"animated"),[l,r]=s.default.useState(()=>{var e=localStorage.getItem(c);if(e){var t,e=JSON.parse(e).backgroundOptions,a=_({},e);for(t of Object.keys(u))a[t]||(a[t]=u[t]);return a}return u}),[n,o]=s.default.useState(Boolean(JSON.parse(localStorage.getItem("lucid:isDynamicColor")||"false"))||!1),i=(Spicetify.React.useEffect(()=>{localStorage.setItem("lucid:isDynamicColor",n?"true":"false")},[n]),Spicetify.React.useEffect(()=>{i()},[t,l]),()=>{localStorage.setItem(c,JSON.stringify({selectedBackground:t,backgroundOptions:l}))});return s.default.createElement(ie.Provider,{value:{selectedBackground:t,setSelectedBackground:a,backgroundOptions:l,setBackgroundOptions:r,resetBackgroundSettings:()=>{localStorage.removeItem(c),a("static"),o(!1),r(u)},isDynamicColor:n,setIsDynamicColor:o}},e)},d=()=>{var e=Spicetify.React.useContext(ie);if(e)return e;throw new Error("[Lucid] Wrap Element with BackgroundContextProvider")},ce=()=>{var{backgroundOptions:e,selectedBackground:t}=d();return oe.default.createElement("div",{className:"solid-background",style:{"--background-color":e[t].bgColor}})},ue=t(a()),de=t(e()),me=()=>{let t=d().isDynamicColor,a=document.getElementById("lucid_dynamic_colors");return a||((a=document.createElement("style")).id="lucid_dynamic_colors",document.head.appendChild(a)),ue.default.useEffect(()=>{if(t){let e=()=>{Qe(a,t).then(()=>console.log("[Lucid] Dynamic colors updated!")).catch(e=>console.error("[Lucid] Error updating dynamic colors:",e))};return Spicetify.Player.addEventListener("songchange",e),Qe(a,t).then(()=>console.log("[Lucid] Dynamic colors applied initially!")).catch(e=>console.error("[Lucid] Error applying dynamic colors initially:",e)),()=>{Spicetify.Player.removeEventListener("songchange",e),et(a)}}et(a)},[t,a]),ue.default.createElement("div",{id:"dynamic-colors"})},pe=()=>{let{selectedBackground:e,backgroundOptions:t}=d(),[a,l]=r.default.useState({});return r.default.useEffect(()=>{l({"--background-color":t[e].bgColor,"--opacity":t[e].opacity,"--brightness":t[e].brightness,"--contrast":t[e].contrast,"--time":t[e].time,"--blur":t[e].blur,"--saturation":t[e].saturation,"--backdrop-blur":t[e].backdropBlur})},[e,t]),r.default.createElement("div",{className:"background-wrapper",style:a},"animated"===e&&r.default.createElement(ne,null),"static"===e&&r.default.createElement(re,null),"solid"===e&&r.default.createElement(ce,null),r.default.createElement(me,null))},i=t(a()),fe=({cb:t})=>(Spicetify.React.useEffect(()=>{let e=new Spicetify.Menu.Item("Lucid Settings",!1,()=>t(),'<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252Zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" fill="#fff"/></svg>');return e.register(),()=>{e.deregister()}},[t]),null),m=t(a()),p=t(a()),ge=p.default.memo(({title:e,children:t,headingChild:a})=>{let{isOpen:l,closeModal:r}=ae();return l?p.default.createElement("div",{className:"modal-container"},p.default.createElement("div",{className:"modal-overlay "+(l&&"open"),style:{zIndex:20},onClick:r}),p.default.createElement("div",{className:"modal-section "+(l&&"open"),role:"dialog","aria-label":e,"aria-modal":"true"},p.default.createElement("div",{className:"main-embedWidgetGenerator-container"},p.default.createElement("div",{className:"main-trackCreditsModal-header"},p.default.createElement("h1",{className:"main-type-alto"},e),a&&p.default.createElement("div",null,a),p.default.createElement("button",{type:"button","aria-label":"Close",className:"main-trackCreditsModal-closeBtn",onClick:()=>r()},p.default.createElement("svg",{width:"18",height:"18",viewBox:"0 0 32 32",xmlns:"http://www.w3.org/2000/svg"},p.default.createElement("title",null,"Close"),p.default.createElement("path",{d:"M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143",fill:"currentColor","fill-rule":"evenodd"})))),p.default.createElement("div",{className:"modal-contents"},p.default.createElement("main",{className:"modal-wrapper"},t))))):null}),f=t(a()),be=({title:e,description:t,children:a})=>f.default.createElement("div",{className:"setting-section"},f.default.createElement("div",{className:"heading-wrapper"},f.default.createElement("h3",{className:"title"},e),t&&f.default.createElement("p",{className:"description"},t)),f.default.createElement("div",{className:"cards-wrapper"},a)),g=t(a()),b=t(a()),y=({options:e,selectedValue:a,onSelect:l,label:t})=>{let[r,n]=b.default.useState(!1),o=b.default.useRef(null);var i=b.default.useRef(null);b.default.useEffect(()=>{let e=e=>{o.current&&!o.current.contains(e.target)&&n(!1)};return document.addEventListener("mousedown",e),()=>{document.removeEventListener("mousedown",e)}},[]);return b.default.createElement("div",{className:"dropdown-container",ref:o},b.default.createElement("button",{className:"dropdown-button "+(r&&"open"),onClick:()=>{n(!r)},"aria-haspopup":"listbox","aria-expanded":r,"aria-label":"Toggle dropdown menu",type:"button"},t||a,b.default.createElement("span",{className:"dropdown-arrow"},b.default.createElement("svg",{role:"img","aria-labelledby":"title",width:"24",height:"24",fill:"none",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},b.default.createElement("span",{id:"title"},"Down"),b.default.createElement("path",{d:"M4.293 8.293a1 1 0 0 1 1.414 0L12 14.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7a1 1 0 0 1-1.414 0l-7-7a1 1 0 0 1 0-1.414Z",fill:"#ffffff"})))),r&&b.default.createElement("ul",{className:"dropdown-menu","aria-label":"Dropdown menu",ref:i},e.map(t=>b.default.createElement("li",{key:t.value,onClick:()=>{return e=t.value,l(e),void n(!1);var e},className:a===t.value?"dropdown-item selected":"dropdown-item","aria-selected":a===t.value,tabIndex:-1},t.label))))},v=t(a()),h=({title:e,tooltip:t,selectedValue:a,children:l})=>v.default.createElement("div",{className:"card"},v.default.createElement("div",{className:"title-wrapper"},e&&v.default.createElement("h5",{className:"title"},e),t&&v.default.createElement("p",{className:"tooltip"},t),a&&v.default.createElement("p",{className:"selected-value"},"Selected: "+a)),v.default.createElement("div",{className:"children-wrapper"},l)),ye=t(a()),ve=({name:e,type:t,placeholder:a,value:l,step:r,onChange:n})=>ye.default.createElement("input",{type:t,name:e,step:r,placeholder:a,value:void 0!==l?l.toString():"",className:"input",onChange:e=>{n(e)}}),w=t(a()),he=({onChange:e,currentValue:t})=>{let[a,l]=w.default.useState(t||!1);return w.default.useEffect(()=>{e(a)},[a,e]),w.default.createElement("div",{className:"slider-wrapper"},w.default.createElement("label",{className:"switch"},w.default.createElement("input",{type:"checkbox",checked:a,onChange:()=>{l(e=>!e)}}),w.default.createElement("span",{className:"slider round"})))},we=g.default.memo(()=>{let{selectedBackground:l,setSelectedBackground:e,backgroundOptions:t,setBackgroundOptions:r,isDynamicColor:a,setIsDynamicColor:n}=d(),[o,i]=g.default.useState(l);g.default.useEffect(()=>e(o),[o,e]);let s=e=>{let t=e.target.name,a=e.target.value.trim();"opacity"===t||"brightness"===t||"contrast"===t?a=""+Number.parseFloat(a):"blur"===t&&(a=a.replace(/[^0-9.]/g,""),a+="px"),r(e=>C(_({},e),{[l]:C(_({},e[l]),{[t]:a})}))};return g.default.createElement(g.default.Fragment,null,g.default.createElement(h,{title:"Set Background",selectedValue:"animated"===l?"Animated Background":"solid"===l?"Solid Background":"static"===l?"Static Background":void 0},g.default.createElement("div",null,g.default.createElement(y,{options:[{label:"Animated",value:"animated"},{label:"Static",value:"static"},{label:"Solid",value:"solid"}],selectedValue:o,onSelect:e=>{i(e)},label:"Select an option"}))),Object.entries(t[l]).map(([e,t])=>g.default.createElement(h,{key:e,title:"Set "+e},g.default.createElement(ve,{name:e,type:"opacity"===e||"brightness"===e||"contrast"===e||"saturation"===e?"number":"text",placeholder:"bgColor"===e||"color"===e?"Value In Hex or Rgb":"opacity"===e?"Value between 0 and 1":"brightness"===e||"contrast"===e?"Value between 0 and 2":"blur"===e?"Value with px unit":"Value In Hex or Rgb",value:t||"",step:"opacity"===e||"brightness"===e||"contrast"===e?.01:void 0,onChange:s}))),g.default.createElement(h,{title:"Dynamic Color (Experimental)"},g.default.createElement(he,{currentValue:a,onChange:e=>n(e)})))}),k=t(a()),ke=e=>{try{return new URL(e),!0}catch(e){return!1}},E=t(a()),Ee=E.default.createContext(null),Se="lucid:fontValue",S="Poppins",x=()=>{var e=(0,E.useContext)(Ee);if(e)return e;throw new Error("[Lucid] useFontContext must be used within a FontContextProvider")},xe=({children:e})=>{let[r,t]=(0,E.useState)(localStorage.getItem(Se)||S);(0,E.useEffect)(()=>{localStorage.setItem(Se,r)},[r]),(0,E.useEffect)(()=>{let e,t,a=r;var l;ke(r)&&(a=decodeURIComponent((null==(t=null==(e=r.match(/family=([^&:]+)/))?void 0:e[1])?void 0:t.replace(/\+/g," "))||""),(l=document.getElementById("custom-font"))?l.href=r:((l=document.createElement("link")).rel="preload stylesheet",l.as="style",l.href=r,l.id="custom-font",document.head.appendChild(l))),window.rootStyle.setProperty("--font-to-use",a)},[r]);return E.default.createElement(Ee.Provider,{value:{fontValue:r,setFontValue:t,resetFontSettings:()=>{var e=document.getElementById("custom-font");e&&document.head.removeChild(e),t(S),window.rootStyle.setProperty("--font-to-use",S)}}},e)},L=t(a()),_e=L.default.createContext(null),Ce=({children:e})=>{let[t,a]=L.default.useState("stary");L.default.useEffect(()=>{var e=localStorage.getItem("lucid:selectedGrain");e&&a(e)},[]),L.default.useEffect(()=>{localStorage.setItem("lucid:selectedGrain",t)},[t]);return L.default.createElement(_e.Provider,{value:{selectedGrain:t,setSelectedGrain:a,resetGrainSettings:()=>{a("stary")}}},e)},P=()=>{var e=L.default.useContext(_e);if(e)return e;throw Error("[Lucid] useGrainContext must be used within a GrainContextProvider")},M=t(a()),Le=M.default.createContext(null),Pe=({children:e})=>{let[t,a]=M.default.useState("compact");M.default.useEffect(()=>{var e=localStorage.getItem("lucid:selectedPlaylistView");e&&a(e)},[]),M.default.useEffect(()=>{localStorage.setItem("lucid:selectedPlaylistView",t)},[t]);return M.default.createElement(Le.Provider,{value:{selectedPlaylistView:t,setSelectedPlaylistView:a,resetPlaylistViewSettings:()=>{a("card")}}},e)},N=()=>{var e=M.default.useContext(Le);if(e)return e;throw Error("[Lucid] usePlaylistViewContext must be used within a PlaylistViewContextProvider")},Me=()=>{let e=d().resetBackgroundSettings,t=x().resetFontSettings,a=P().resetGrainSettings,l=N().resetPlaylistViewSettings;return k.default.createElement("div",null,k.default.createElement(h,{title:"Reset to Default"},k.default.createElement("button",{type:"button",className:"button reset-button",onClick:()=>{confirm("Are you sure you want to reset all background settings to their default values? This action cannot be undone.")&&(e(),t(),a(),l())}},"Reset")))},B=t(a()),Ne=t(a()),Be=()=>{let{fontValue:e,setFontValue:a}=x();return Ne.default.createElement("div",null,Ne.default.createElement(ve,{name:"Font Family",onChange:e=>{e.stopPropagation(),e.preventDefault(),a(e.target.value);let t=e.target.value;ke(t)&&(t=decodeURIComponent((null==(e=null==(e=t.match(/family=([^&:]+)/))?void 0:e[1])?void 0:e.replace(/\+/g," "))||""),(e=document.getElementById("custom-font"))?e.href=t:((e=document.createElement("link")).rel="preload stylesheet",e.as="style",e.href=t,e.id="custom-font",document.head.appendChild(e))),window.rootStyle.setProperty("--font-to-use",t)},placeholder:"Enter Font Family Name or Google Fonts link",type:"text",value:e}))},$e=()=>{var e=x().fontValue;return B.default.createElement("div",null,B.default.createElement(h,{title:"Font Family",selectedValue:e},B.default.createElement(Be,null)))},$=t(a()),je=()=>{let{selectedGrain:e,setSelectedGrain:t}=P();return $.default.createElement("div",null,$.default.createElement(h,{title:"Set Grains",selectedValue:e},$.default.createElement(y,{options:[{label:"Stary",value:"stary"},{label:"Default",value:"default"},{label:"None",value:"none"}],onSelect:e=>{t(e)},selectedValue:e})))},Ie=t(a()),Oe=()=>{let{selectedPlaylistView:e,setSelectedPlaylistView:t}=N();return Ie.default.createElement("div",null,Ie.default.createElement(h,{title:"Set Playlist View",selectedValue:e},Ie.default.createElement(y,{options:[{label:"Default",value:"default"},{label:"compact",value:"compact"},{label:"card",value:"card"}],onSelect:e=>{t(e)},selectedValue:e})))},Ve=()=>{var e=[{key:"background",title:"Background",description:"Customize the look and feel of your theme with a variety of backgrounds.",content:m.default.createElement(we,null)},{key:"font",title:"Font",description:"Set your desired font.",content:m.default.createElement($e,null)},{key:"grains",title:"Grains",description:"Set your desired grain texture.",content:m.default.createElement(je,null)},{key:"playlistView",title:"Playlist View",description:"Set your desired Playlist View.",content:m.default.createElement(Oe,null)},{key:"reset",title:"Reset Settings",description:"Reset all settings to factory value.",content:m.default.createElement(Me,null)}];return m.default.createElement(ge,{title:"Lucid Settings"},m.default.createElement("div",{className:"sections-container"},e.map(e=>m.default.createElement("div",{className:"section-wrapper",key:e.key,id:e.key},m.default.createElement(be,{title:e.title,description:e.description},e.content)))))},Re=i.default.memo(()=>{let{isOpen:e,openModal:t}=ae();return i.default.createElement(i.default.Fragment,null,i.default.createElement(fe,{cb:()=>t()}),e?i.default.createElement(Ve,null):null)}),De=t(a()),ze=()=>{let e=P().selectedGrain;return(0,De.useEffect)(()=>(document.body.classList.remove("grain-stary","grain-default","grain-none"),document.body.classList.add("grain-"+e),()=>{document.body.classList.remove("grain-"+e)}),[e]),De.default.createElement("div",{id:"selectedGrain","data-selectedGrain":e})},Fe=t(a()),Ge=()=>{let e=N().selectedPlaylistView;return(0,Fe.useEffect)(()=>(document.body.classList.remove("playlist-view-compact","playlist-view-default","playlist-view-card"),document.body.classList.add("playlist-view-"+e),()=>{document.body.classList.remove("playlist-view-"+e)}),[e]),Fe.default.createElement("div",{id:"selectedPlaylistView","data-selectedPlaylistView":e})},Te=()=>{Spicetify.React.useEffect(()=>{(()=>{var a=Spicetify.Locale;function l(e){return e.replace(/[{0}{1}«»”“]/g,"").trim()}if(a){var r=l(a.get("playlist.a11y.play")||""),n=l(a.get("playlist.a11y.pause")||""),o=a.get("play"),i=a.get("pause"),s=a.get("browse"),c=a.get("web-player.aligned-curation.tooltips.add-to-liked-songs"),u=a.get("web-player.aligned-curation.tooltips.add-to-playlist"),d=a.get("playback-control.skip-forward"),m=a.get("playback-control.skip-back"),p=a.get("buddy-feed.friend-activity"),f=a.get("tracklist.a11y.play")||"",g=a.get("view.web-player-home");let e,t;["zh-CN","zh-TW","am","fi"].includes(a.getLocale())?[e,t]=f.split("{1}"):[e,t]=f.split("{0}"),e=l(e),t=l(t);var f=a.get("playback-control.enable-repeat"),b=a.get("playback-control.enable-repeat-one"),a=a.get("playback-control.disable-repeat"),y=document.createElement("style");y.innerHTML=`
.main-repeatButton-button[aria-checked="false"],
.player-controls__right button[aria-label*="${f}"]  span{
  -webkit-mask-image: var(--repeat-off-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-off.svg"));
  mask-image: var(--repeat-off-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-off.svg"));
  background-color: var(--spice-subtext);
  mask-size: contain;
}

.main-repeatButton-button[aria-checked="mixed"],
.player-controls__right button[aria-label*="${a}"] span {
  -webkit-mask-image: var(--repeat-mixed-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-mixed.svg"));
  mask-image: var(--repeat-mixed-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-mixed.svg"));
  background-color: var(--spice-accent);
  mask-size: contain;
}

.main-repeatButton-button[aria-checked="true"],
.player-controls__right button[aria-label*="${b}"] span {
  -webkit-mask-image: var(--repeat-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat.svg"));
  mask-image: var(--repeat-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat.svg"));
  background-color: var(--spice-accent);
  mask-size: contain;
}

.player-controls__right button[aria-label*="${a}"] svg,
.player-controls__right button[aria-label*="${f}"] svg {
  transform: scale(1.15);
}

.player-controls__right button[aria-label*="${a}"] svg,
.player-controls__right button[aria-label*="${f}"] svg {
  visibility: hidden;
  opacity: 0;
}

.main-repeatButton-button {
  transform: scale(0.65) !important;
}

.player-controls__buttons button[aria-label*="${o}"] span,
.main-playButton-button[aria-label*="${o}"],
.main-playButton-PlayButton>button[aria-label*="${o}"],
.main-playPauseButton-button[aria-label="${o}"],
.main-trackList-rowPlayPauseButton[aria-label*="${o}"],
.main-trackList-rowImagePlayButton[aria-label*="${e}"][aria-label*="${t}"],
.main-playButton-PlayButton>button[aria-label*="${r}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: var(--play-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/play.svg")) !important;
  mask-image: var(--play-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/play.svg")) !important;
}

.main-playButton-button[aria-label*="${i}"],
.main-playButton-PlayButton>button[aria-label*="${i}"],
.main-playPauseButton-button[aria-label*="${i}"],
.player-controls__buttons button[aria-label*="${i}"] span,
.main-trackList-rowPlayPauseButton[aria-label*="${i}"],
.main-trackList-rowImagePlayButton[aria-label*="${i}"],
.main-playButton-PlayButton>button[aria-label*="${n}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: var(--pause-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/pause.svg")) !important;
  mask-image: var(--pause-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/pause.svg")) !important;
}

.Root__globalNav button:is([aria-label="Clear search field"]) {
  background-color: transparent !important;
  border: none !important;
}

button[aria-label="${s}"] path {
  display: none !important;
}

button[aria-label="${s}"] svg {
  display: none;
  -webkit-mask-image: var(--compass-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/compass-outline.svg"));
  mask-image: var(--compass-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/compass-outline.svg"));
  background-color: var(--spice-subtext) !important;
  scale: 1.25;
}

.main-repeatButton-button[aria-label="${f}"],
.main-repeatButton-button[aria-label="${a}"],
.main-repeatButton-button[aria-label="${b}"],
{
scale: 0.75 !important;
background-color: var(--spice-subtext) !important;
color: var(--spice-subtext);

svg {
  display: none;
}
}

.player-controls__buttons button[aria-label*="${o}"] span,
.player-controls__buttons button[aria-label*="${i}"] span{
  display: block;
  mask-size: 100%;
  -webkit-mask-position: center center;
  mask-position: center center;
  background-color: var(--spice-subtext);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-size: cover;
  aspect-ratio: 1/1;
}

.main-playPauseButton-button,
button[aria-label="${c}"],
button[aria-label="${u}"],
.player-controls button[aria-label="${m}"],
.player-controls button[aria-label="${d}"]
{
  display: block;
  mask-size: 100%;
  -webkit-mask-position: center center;
  mask-position: center center;
  background-color: var(--spice-subtext);
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  mask-size: cover;
  min-height: 1rem;
  min-width: 1rem;
  aspect-ratio: 1/1;
  border-radius: 0 !important;
  border: none !important;
  height: var(--button-size, 24px);
  width: var(--button-size, 24px);
  
  svg,
  span {
    display: none;
    visibility: hidden;
  }
}

.player-controls__buttons button[aria-label*="${o}"] span svg,
.player-controls__buttons button[aria-label*="${i}"] span svg {
  display: none;
  visibility: hidden;
}

button[aria-label="${u}"],
button[aria-label="${c}"] {
  background-color: var(--spice-subtext);
  -webkit-mask-image: var(--heart-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart-outline.svg"));
  mask-image: var(--heart-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart-outline.svg")) !important;
  mask-size: 100%;
  mask-position: 50% 50%;
  min-width: 1.2rem;
  min-height: 1.2rem;

  svg,
  span {
display: none;
visibility: hidden;
  }
}

button[aria-label="${u}"] {
  background-color: var(--spice-accent);
  -webkit-mask-image: var(--heart-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart.svg"));
  mask-image: var(--heart-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart.svg")) !important;
}

.player-controls button[aria-label="${m}"] span,
.player-controls button[aria-label="${d}"] span {
  opacity: 0;
}

.player-controls button[aria-label="${m}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: var(--prev-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/prev.svg"));
  mask-image: var(--prev-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/prev.svg"));
}

.player-controls button[aria-label="${d}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: var(--next-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/next.svg"));
  mask-image: var(--next-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/next.svg"));
}

button[aria-label="${p}"]>path {
  display: none;
}

.main-actionButtons>div>button[aria-label="${p}"] svg,
.main-actionButtons>button[aria-label="${p}"] svg {
  background-color: var(--spice-subtext) !important;
  -webkit-mask-image: var(--people-team-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/people-team.svg"));
  mask-image: var(--people-team-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/people-team.svg"));
}

.main-yourLibraryX-navLink[aria-label="${g}"] svg,
button[aria-label="${g}"] svg {
  path {
display: none !important;
  }

  mask-image: var(--home-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-outline.svg"));
  -webkit-mask-image: var(--home-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-outline.svg"));
  background-color: var(--spice-subtext) !important;
}


.main-yourLibraryX-navLink[aria-label="${g}"].active svg,
.main-globalNav-navLinkActive[aria-label="${g}"] svg {
  path {
display: none !important;
  }

  mask-image: var(--home-filled-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-filled.svg"));
  -webkit-mask-image: var(--home-filled-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-filled.svg"));
  background-color: var(--spice-text) !important;
}

.main-yourLibraryX-navLink[aria-label="${g}"].active svg {
  path {
display: none !important;
  }

  background-color: var(--spice-accent) !important;
}

#context-menu ul[aria-label*="Add to playlist menu"] {
  p {
max-width: 10rem;
  }
}
`,document.head.appendChild(y)}})(),Je(),e()},[]);let e=()=>{(()=>{window.currentArtUrl=Spicetify.Player.data.item.metadata.image_xlarge_url||Spicetify.Player.data.item.metadata.image_large_url||Spicetify.Player.data.item.metadata.image_url||Spicetify.Player.data.item.metadata.image_small_url||"";try{window.rootStyle.setProperty("--image-url",`url(${window.currentArtUrl})`)}catch(e){console.error("Error updating album art:",e)}})()};return window.addEventListener("resize",Je),Spicetify.Player.addEventListener("songchange",e),l.default.createElement(l.default.Fragment,null,l.default.createElement(xe,null,l.default.createElement(se,null,l.default.createElement(Pe,null,l.default.createElement(Ce,null,l.default.createElement("div",{id:"state"},l.default.createElement(Ge,null),l.default.createElement(ze,null)),l.default.createElement("div",{id:"background-container",className:"background-container",style:{containerType:"normal"}},l.default.createElement(pe,null)),l.default.createElement("div",{id:"modal-container",className:"modal-container",style:{containerType:"normal"}},l.default.createElement(te,null,l.default.createElement(Re,null))),window.isWindows&&!window.isLightMode?l.default.createElement("div",{id:"transperent-controls-container",className:"transperent-controls-container",style:{containerType:"normal"}},l.default.createElement(K,null)):null)))))},j=t(a()),Ae=t(a()),We={copyButton:"error-module__copyButton___UntTn_theme",button:"error-module__button___sf48q_theme"},Ue="https://github.com/sanoojes/Spicetify-Lucid/issues",qe=({error:e})=>{let[t,a]=(0,Ae.useState)(!1),l=(0,Ae.useRef)(null),r="";r=e instanceof Error?e.message:JSON.stringify(e,null,2);return j.default.createElement("div",{style:{width:"50vw"}},j.default.createElement("div",{style:{display:"flex",justifyContent:"space-between"}},j.default.createElement("span",{style:{margin:"auto 0"}},j.default.createElement("p",null,"Oops! Lucid theme encountered an error. Please"," ",j.default.createElement("a",{href:Ue,target:"_blank",rel:"noopener noreferrer"},"report an issue here"))),j.default.createElement("div",null,j.default.createElement("button",{type:"button",onClick:()=>a(!t),className:We.button},t?"Hide Details":"Show Details"),j.default.createElement("button",{type:"button",onClick:()=>{l.current&&(navigator.clipboard.writeText(l.current.textContent||""),Spicetify.showNotification("Error details copied!",!1,2e3))},className:We.copyButton,style:{marginLeft:"8px"}},"Copy Error"))),t&&j.default.createElement("pre",{style:{whiteSpace:"pre-wrap"},ref:l},r))},He=async function(){var e;try{for(;null==Spicetify||!Spicetify.showNotification||null==Spicetify||!Spicetify.Player||null==Spicetify||!Spicetify.React;)await new Promise(e=>setTimeout(e,100));var t=document.createElement("div"),a=(t.id="lucid-main",document.getElementById("main"));null!=a&&a.append(t),t&&Spicetify.ReactDOM.createRoot(t).render(H.default.createElement(Te,null)),window.rootStyle=document.documentElement.style,window.isCustomControls=!1,window.isLightMode="light"===(null==Spicetify?void 0:Spicetify.Config.color_scheme)||!1,window.isWindows="windows"===(null==(e=null==Spicetify?void 0:Spicetify.Platform)?void 0:e.operatingSystem).toLowerCase()||(null==Spicetify?void 0:Spicetify.Platform.PlatformData.os_name).toLowerCase().includes("win"),window.isGlobalNav=!(!document.querySelector(".globalNav")&&!document.querySelector(".Root__globalNav")),(async()=>{var e;document.getElementById("customControls")&&(window.isCustomControls=!0,null!=(e=document.querySelector(".lucid-transperent-window-controls")))&&e.remove()})()}catch(e){e&&(a=e,console.error("[Lucid] Error:",a),Spicetify.showNotification(j.default.createElement(qe,{error:a}),!0))}},(async()=>{await He()})(),(async()=>{var e;document.getElementById("theme")||((e=document.createElement("style")).id="theme",e.textContent=String.raw`
  .error-module__button___sf48q_theme,.error-module__copyButton___UntTn_theme{background-color:#424242;color:#fff;border:2px solid rgba(var(--spice-rgb-text),.25);padding:8px 16px;font-size:14px;cursor:pointer;border-radius:var(--card-border-radius);transition:all .3s ease-in-out}.error-module__button___sf48q_theme:hover,.error-module__copyButton___UntTn_theme:hover{background-color:#616161;border-radius:100px}
      `.trim(),document.head.appendChild(e))})()})();