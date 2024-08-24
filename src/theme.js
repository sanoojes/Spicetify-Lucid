(async()=>{for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(e=>setTimeout(e,10));var e=Object.create,o=Object.defineProperty,O=Object.defineProperties,z=Object.getOwnPropertyDescriptor,R=Object.getOwnPropertyDescriptors,r=Object.getOwnPropertyNames,n=Object.getOwnPropertySymbols,l=Object.getPrototypeOf,s=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable,i=(e,t,a)=>t in e?o(e,t,{enumerable:!0,configurable:!0,writable:!0,value:a}):e[t]=a,C=(e,t)=>{for(var a in t=t||{})s.call(t,a)&&i(e,a,t[a]);if(n)for(var a of n(t))G.call(t,a)&&i(e,a,t[a]);return e},E=(e,t)=>O(e,R(t)),T=(t=(e,t)=>function(){return t||(0,e[r(e)[0]])((t={exports:{}}).exports,t),t.exports})({"node_modules/canvas/lib/parse-font.js"(e,t){var a=`'([^']+)'|"([^"]+)"|[\\w\\s-]+`,i=new RegExp("(bold|bolder|lighter|[1-9]00) +","i"),o=new RegExp("(italic|oblique) +","i"),r=new RegExp("(small-caps) +","i"),l=new RegExp("(ultra-condensed|extra-condensed|condensed|semi-condensed|semi-expanded|expanded|extra-expanded|ultra-expanded) +","i"),s=new RegExp(`([\\d\\.]+)(px|pt|pc|in|cm|mm|%|em|ex|ch|rem|q) *((?:${a})( *, *(?:${a}))*)`),c={};t.exports=e=>{if(c[e])return c[e];var t=s.exec(e);if(t){var a,n={weight:"normal",style:"normal",stretch:"normal",variant:"normal",size:parseFloat(t[1]),unit:t[2],family:t[3].replace(/["']/g,"").replace(/ *, */g,",")},t=e.substring(0,t.index);switch((a=i.exec(t))&&(n.weight=a[1]),(a=o.exec(t))&&(n.style=a[1]),(a=r.exec(t))&&(n.variant=a[1]),(a=l.exec(t))&&(n.stretch=a[1]),n.unit){case"pt":n.size/=.75;break;case"pc":n.size*=16;break;case"in":n.size*=96;break;case"cm":n.size*=96/2.54;break;case"mm":n.size*=96/25.4;break;case"%":break;case"em":case"rem":n.size*=16/.75;break;case"q":n.size*=96/25.4/4}return c[e]=n}}}}),t=t({"node_modules/canvas/browser.js"(e){var t=T();e.parseFont=t,e.createCanvas=function(e,t){return Object.assign(document.createElement("canvas"),{width:e,height:t})},e.createImageData=function(e,t,a){switch(arguments.length){case 0:return new ImageData;case 1:return new ImageData(e);case 2:return new ImageData(e,t);default:return new ImageData(e,t,a)}},e.loadImage=function(i,o){return new Promise(function(e,t){let a=Object.assign(document.createElement("img"),o);function n(){a.onload=null,a.onerror=null}a.onload=function(){n(),e(a)},a.onerror=function(){n(),t(new Error('Failed to load the image "'+i+'"'))},a.src=i})}}}),c=[{section:"Default Background",items:[{label:"Blur",key:"static-bg-blur",min:0,max:100,unit:"px",default:24,tooltip:"Amount of blur to apply to the Default Background."},{label:"Brightness",key:"static-bg-brightness",min:0,max:200,unit:"%",default:65,tooltip:"Brightness level of the Default Background."},{label:"Contrast",key:"static-bg-contrast",min:0,max:200,unit:"%",default:80,tooltip:"Contrast level of the Default Background."},{label:"Saturation",key:"static-bg-saturation",min:0,max:200,unit:"%",default:90,tooltip:"Saturation level of the Default Background."}]},{section:"Animated Background",items:[{label:"Blur",key:"animated-background-blur",min:32,max:256,unit:"px",default:64,tooltip:"Amount of blur to apply to the animated background."},{label:"Saturation",key:"animated-background-saturation",min:0,max:500,unit:"%",default:150,tooltip:"Saturation level of the animated background."},{label:"Contrast",key:"animated-background-contrast",min:0,max:200,unit:"%",default:115,tooltip:"Contrast level of the animated background."},{label:"Brightness",key:"animated-background-brightness",min:0,max:200,unit:"%",default:65,tooltip:"Brightness level of the animated background."},{label:"Animation Time",key:"animated-background-time",tooltip:"Time it takes for the animated background to complete one cycle. (30s-60s prefered, 0 = no animation)",min:0,max:120,unit:"s",default:45}]},{section:"Now Playing Bar",items:[{label:"Opacity",key:"now-playing-bar-opacity",min:0,max:100,unit:"%",default:100,tooltip:"Opacity of the whole backdrop."},{label:"Background Color Opacity",key:"now-playing-bar-bg-opacity",min:0,max:100,unit:"%",default:50,tooltip:"Background Color Opacity of the now playing bar."},{label:"Height",key:"now-playing-bar-height",min:0,max:500,unit:"px",default:80,tooltip:"Height of the now playing bar."},{label:"Padding in X axis",key:"now-playing-bar-padding-x",min:0,max:50,unit:"px",default:4,tooltip:"Space between the content and the edges of the now playing bar."},{label:"Margin Bottom",key:"margin-bottom-now-playing-bar",min:0,max:50,unit:"px",default:8,tooltip:"Adjusts the spacing between the bottom of the now playing bar and the content below it."},{label:"Border Radius",key:"border-radius-now-playing-bar",min:0,max:100,unit:"px",default:8,tooltip:"Rounded corners for the now playing bar."},{label:"Blur",key:"now-playing-bar-blur",min:0,max:100,unit:"px",default:32,tooltip:"Amount of blur to apply to the now playing bar."},{label:"Saturation",key:"now-playing-saturation",min:0,max:200,unit:"%",default:100,tooltip:"Saturation level of the now playing bar."},{label:"Contrast",key:"now-playing-contrast",min:0,max:200,unit:"%",default:100,tooltip:"Contrast level of the now playing bar."},{label:"Brightness",key:"now-playing-brightness",min:0,max:200,unit:"%",default:100,tooltip:"Brightness level of the now playing bar."}]}],h=async(i,o)=>new Promise(n=>{var e=document.querySelector(i);if(e)n(e);else{let t=null,a=Date.now();e=()=>{var e=document.querySelector(i);e?(t&&t.disconnect(),n(e)):o&&Date.now()-a>=o&&(console.log(`[Lucid] ${i} not found within ${o}ms`),t&&t.disconnect(),n(null))};(t=new MutationObserver(e)).observe(document.body,{childList:!0,subtree:!0}),e()}}),M=(t=t(),e=null!=t?e(l(t)):{},((t,a,n,i)=>{if(a&&"object"==typeof a||"function"==typeof a)for(let e of r(a))s.call(t,e)||e===n||o(t,e,{get:()=>a[e],enumerable:!(i=z(a,e))||i.enumerable});return t})(!D&&t&&t.__esModule?e:o(e,"default",{value:t,enumerable:!0}),t));function B(e,t,a){return"#"+(e<<16|t<<8|a).toString(16).padStart(6,"0")}function $(e,t,a){var[e,t,a]=[e/255,t/255,a/255],[e,t,a]=[e<=.03928?e/12.92:((e+.055)/1.055)**2.4,t<=.03928?t/12.92:((t+.055)/1.055)**2.4,a<=.03928?a/12.92:((a+.055)/1.055)**2.4];return.2126*e+.7152*t+.0722*a}function _(e,t){return E(C({},e),{r:Math.max(0,Math.round(e.r*t)),g:Math.max(0,Math.round(e.g*t)),b:Math.max(0,Math.round(e.b*t)),hex:B(Math.max(0,Math.round(e.r*t)),Math.max(0,Math.round(e.g*t)),Math.max(0,Math.round(e.b*t)))})}function I(e,t){return E(C({},e),{r:Math.min(255,Math.round(e.r+(255-e.r)*t)),g:Math.min(255,Math.round(e.g+(255-e.g)*t)),b:Math.min(255,Math.round(e.b+(255-e.b)*t)),hex:B(Math.min(255,Math.round(e.r+(255-e.r)*t)),Math.min(255,Math.round(e.g+(255-e.g)*t)),Math.min(255,Math.round(e.b+(255-e.b)*t)))})}function j(e,t){e=$(e.r,e.g,e.b),t=$(t.r,t.g,t.b);return(Math.max(e,t)+.05)/(Math.min(e,t)+.05)}async function H(i){try{var o=await(0,M.loadImage)(i),r=Math.max(o.width/20,10),l=Math.max(o.height/20,10),s=(0,M.createCanvas)(r,l).getContext("2d"),c=(s.drawImage(o,0,0,r,l),s.getImageData(0,0,r,l)),d=c.data,u={};let t={};var p=Math.floor(.2*d.length);for(let e=0;e<p;e+=4){var m=d[e],g=d[e+1],b=d[e+2],y=m+`-${g}-`+b;u[y]=(u[y]||0)+1,t[y]={r:m,g:g,b:b,hex:B(m,g,b)}}var v=Object.entries(u).sort((e,t)=>t[1]-e[1]).map(([e])=>t[e]),h=v[0];let e=v[1],a=v[2],n=2;for(;!e||j(h,e)<2.5;){if(n>=v.length){e=I(h,.2);break}e=v[n],n++}for(;!a||j(h,a)<2.5||j(e,a)<2.5;){if(n>=v.length){a=I(e,.2);break}a=v[n],n++}var f,k={main:_(h,.8),sidebar:_(e,.9),card:_(a,.9),accent:I(a,.4),highlight:I(e,.2),button:I(a,.4),"button-active":I(a,.4),text:I(h,.8),subtext:I(h,.9),primary:h,secondary:e,tertiary:a};for(f of[k.main,k.sidebar,k.card]).3<$(f.r,f.g,f.b)&&(f.r=Math.max(0,Math.round(.7*f.r)),f.g=Math.max(0,Math.round(.7*f.g)),f.b=Math.max(0,Math.round(.7*f.b)),f.hex=B(f.r,f.g,f.b)),f=(w=f,x=.5,L=S=void 0,S=Math.max(0,Math.min(255,Math.round(w.r*x))),L=Math.max(0,Math.min(255,Math.round(w.g*x))),x=Math.max(0,Math.min(255,Math.round(w.b*x))),E(C({},w),{r:S,g:L,b:x,hex:B(S,L,x)}));return k.accent&&k.main&&j(k.accent,k.main)<4.5&&(k.accent=I(k.accent,.2)),k}catch(e){return e}var w,x,S,L}async function f(t,e){try{var a=await H(e);if(a instanceof Error)console.error("Error extracting colors:",a.message);else{let e=":root {";for(var[n,i]of Object.entries(a))e+=`
`+(o=n,r=i,`--spice-${o}: ${r.hex} !important;
          --spice-rgb-${o}: ${r.r},${r.g},${r.b} !important;`);e+="\n}",t.innerHTML=e}}catch(e){console.error("Error saving colors to style:",e)}var o,r}var k=!1,A=document.documentElement.style,w=document.createElement("style"),x=(document.head.appendChild(w),"");function S(){x=Spicetify.Player.data.item.metadata.image_xlarge_url||Spicetify.Player.data.item.metadata.image_large_url||Spicetify.Player.data.item.metadata.image_url;try{A.setProperty("--image-url",`url(${x})`)}catch(e){console.error("Error updating album art:",e)}}var L=document.createElement("div");function d(e,t,a=1,n=0,i=Number.POSITIVE_INFINITY){return Math.max(n,Math.min(e*(t+a-1),i))}var u=document.createElement("style");async function Z(){var e,t,a;window.window.isCustomControls||(a=window.innerWidth,a=window.outerWidth/a*100,t=window.innerWidth/window.outerWidth,a=Math.round(a**.912872807*100/100-3),await Spicetify.CosmosAsync.post("sp://messages/v1/container/control",{type:"update_titlebar",height:a}),a=d(64,t,1),e=d(135,t,1),window.isGlobalNav?u.innerHTML=`
.spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav {
  padding-inline-end: ${e}px !important;
  padding-inline-start: ${a}px !important;
}
      `:u.innerHTML=`
.main-topBar-container {
  padding-inline-end: ${e}px !important;
  padding-inline-start: ${a}px !important;
}

.spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav {
  padding-inline: ${a}px ${e}px !important;
}
        `,"windows"===Spicetify.Platform.PlatformData.os_name&&"light"!==Spicetify.Config.color_scheme&&(a=d(135,t,1),e=64,t=a,L.classList.add("lucid-transperent-window-controls"),L.style.setProperty("--control-height",e+"px"),L.style.setProperty("--control-width",t+"px")))}async function q(e){let t=await h(".Root__top-container").catch(e=>console.error(e));var a,n,i,o,r;a=null==t?void 0:t.querySelector(".lucid-animated-background-container"),n=null==t?void 0:t.querySelector(".lucid-static-background-container"),i=null==t?void 0:t.querySelector(".lucid-solid-background-container"),a&&a.remove(),n&&n.remove(),i&&i.remove();try{if("animated"===e){var l,s=function(){var e=Math.floor(360*Math.random());document.documentElement.style.setProperty("--random-degree",e+"deg")},c=(s(),document.createElement("div")),d=(c.classList.add("lucid-animated-background-container"),["front","back","backleft","backright"]);for(l of d){var u=document.createElement("div");u.classList.add(l),c.appendChild(u)}null!=t&&t.prepend(c)}e&&"static"!==e||((o=document.createElement("div")).classList.add("lucid-static-background-container"),null!=t&&t.prepend(o)),"solid"===e&&((r=document.createElement("div")).classList.add("lucid-solid-background-container"),null!=t)&&t.prepend(r)}catch(e){console.error(e)}}document.head.appendChild(u);var a=document.createElement("style");function X(e){try{e&&"stary"!==e||(a.innerHTML=`
      :root {
        --background-noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3E%3Cdefs%3E%3Cfilter id='nnnoise-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.184' numOctaves='4' seed='15' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'%3E%3C/feTurbulence%3E%3CfeSpecularLighting surfaceScale='13' specularConstant='0.3' specularExponent='20' lighting-color='%23ffffff' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' result='specularLighting'%3E%3CfeDistantLight azimuth='3' elevation='133'%3E%3C/feDistantLight%3E%3C/feSpecularLighting%3E%3CfeColorMatrix type='saturate' values='0' x='0%25' y='0%25' width='100%25' height='100%25' in='specularLighting' result='colormatrix'%3E%3C/feColorMatrix%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='%2300000000'%3E%3C/rect%3E%3Crect width='700' height='700' fill='%23ffffff' filter='url(%23nnnoise-filter)'%3E%3C/rect%3E%3C/svg%3E") !important;
        }
        `),"normal"===e&&(a.innerHTML=`
        :root {
          --background-noise: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=) !important;
}
`),"none"===e&&(a.innerHTML=`
  :root {
    --background-noise: none !important;
    }
    `)}catch(e){console.error(e)}}document.head.appendChild(a);var p,J,m=document.createElement("div");function g(e,t){document.body.style.setProperty("--"+e,t)}function W(){var t=localStorage.getItem("settings");if(t)try{let e=JSON.parse(t);return c.map(t=>{let a=e.find(e=>e.section===t.section);return E(C({},t),{items:t.items.map(t=>{var e=a?a.items.find(e=>e.key===t.key):void 0;return E(C({},t),{value:e?e.value:t.default})})})})}catch(e){console.error("Error loading settings:",e)}return JSON.parse(JSON.stringify(c))}m.className="lucid-settings-container";{for(p of W()){var b=document.createElement("div"),y=(b.className="lucid-settings-card",document.createElement("h2"));y.classList.add("settings-section-heading","encore-text-title-small","encore-internal-color-text-base"),y.textContent=p.section,b.appendChild(y);for(let l of p.items){var v=document.createElement("div"),P=(v.className="lucid-settings-input-card",document.createElement("label")),N=(P.classList.add("settings-section-label","encore-text-title-small","encore-internal-color-text-subdued"),P.innerHTML=l.label,P.htmlFor=l.key+"-input",document.createElement("p"));N.classList.add("encore-text-body-small","encore-internal-color-text-subdued"),N.innerHTML=l.tooltip||"";let o=document.createElement("input"),r=(o.className="Lucid-slider",o.type="range",o.id=l.key+"-input",o.min=String(l.min),o.max=String(l.max),o.value=String(void 0!==l.value?l.value:l.default),document.createElement("span"));r.id=l.key+"-value",r.textContent=""+o.value+l.unit,r.className="Lucid-slider-value",g(l.key,""+o.value+l.unit),o.addEventListener("input",()=>{var e,t=Number.parseInt(o.value,10),a=(r.textContent=""+t+l.unit,g(l.key,""+t+l.unit),l.key),n=W(),i=n.findIndex(e=>e.items.some(e=>e.key===a));-1!==i&&-1!==(e=n[i].items.findIndex(e=>e.key===a))&&(n[i].items[e].value=t,localStorage.setItem("settings",JSON.stringify(n)))}),v.appendChild(P),v.appendChild(N);P=document.createElement("div");P.className="Lucid-slider-container",P.appendChild(o),P.appendChild(r),v.appendChild(P),b.appendChild(v)}m.appendChild(b)}let t=async(e,t,a,n)=>{var i,o=document.createElement("div"),r=(o.classList.add("lucid-dropdown-container"),document.createElement("h2"));r.classList.add("lucid-slider-label"),r.textContent=a,o.appendChild(r);let l=document.createElement("select");l.classList.add("lucid-dropdown","main-dropDown-dropDown"),l.id=t+"-dropdown";for(i of e){var s=document.createElement("option");s.textContent=i.text,s.value=i.value,l.appendChild(s)}a=localStorage.getItem(t)||e[0].value;return l.value=a,n(a),l.addEventListener("change",()=>{var e=l.value;localStorage.setItem(t,e),n(e)}),o.appendChild(l),o},a=document.createElement("div"),n=(a.classList.add("lucid-settings-section"),[{text:"Default Background",value:"static"},{text:"Animated Background",value:"animated"},{text:"Solid Background",value:"solid"}]),i=[{text:"Stary Grains (default)",value:"stary"},{text:"Normal Grains",value:"normal"},{text:"No Grains",value:"none"}],o=[{text:"Normal",value:"normal"},{text:"Dynamic",value:"dynamic"}];(async()=>{var e=await t(n,"selectedBackground","Background",e=>{q(e)}),e=(a.appendChild(e),await t(i,"lucid-selectedGrains","Background Grains",e=>{X(e)})),e=(a.appendChild(e),await t(o,"lucid-isDynamicColor","Dynamic Color Selection (Experimental)",e=>{(k="dynamic"===e)?f(w,x):w.innerHTML=""}));a.appendChild(e)})(),m.appendChild(a);(l=document.createElement("div")).className="lucid-button-container";var D=document.createElement("button");D.className="lucid-reset-btn",D.textContent="Reset to Defaults",D.addEventListener("click",()=>{if(confirm("Are you sure you want to reset all settings to their default values?")){var e;document.getElementById("selectedBackground-dropdown").value="static",document.getElementById("lucid-selectedGrains-dropdown").value="stary",document.getElementById("lucid-isDynamicColor-dropdown").value="normal",localStorage.removeItem("settings"),q("static"),localStorage.setItem("selectedBackground","static"),X("stary"),localStorage.setItem("lucid-selectedGrains","stary");for(e of Array.from(document.querySelectorAll(".Lucid-slider"))){var t=e.id.replace("-input",""),a=(t=>{for(var e of c){e=e.items.find(e=>e.key===t);if(e)return e}})(t);a&&(e.value=String(a.default),e=document.getElementById(t+"-value"))&&(t=""+a.default+a.unit,e.textContent=t,g(a.key,t))}k=!1,localStorage.setItem("lucid-isDynamicColor","normal")}}),m.appendChild(D),(D=document.createElement("button")).className="lucid-discord-btn",D.textContent="Discord",D.addEventListener("click",()=>{window.open("https://discord.gg/buCmFcEJEr","_blank")}),l.appendChild(D),(D=document.createElement("button")).className="lucid-github-btn",D.textContent="Report Issues",D.addEventListener("click",()=>{window.open("https://github.com/sanoojes/Spicetify-Lucid/issues","_blank")}),l.appendChild(D),m.appendChild(l)}J=m,new Spicetify.Menu.Item("Lucid Settings",!1,()=>{Spicetify.PopupModal.display({title:"Lucid Settings",content:J,isLarge:!0})},'<svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252Zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" fill="#fff"/></svg>').register();var V=async function(){for(;!(null!=Spicetify&&Spicetify.CosmosAsync&&null!=Spicetify&&Spicetify.React&&null!=Spicetify&&Spicetify.Platform&&null!=Spicetify&&Spicetify.Locale&&null!=Spicetify&&Spicetify.Player.data);)await new Promise(e=>setTimeout(e,100));function a(e){return e.replace(/[{0}{1}«»”“]/g,"").trim()}if(window.isGlobalNav=!(!document.querySelector(".globalNav")&&!document.querySelector(".Root__globalNav")),window.isWindows="windows"===(null==(y=null==Spicetify?void 0:Spicetify.Platform)?void 0:y.operatingSystem).toLowerCase()||(null==Spicetify?void 0:Spicetify.Platform.PlatformData.os_name).toLowerCase().includes("win"),window.isWindows&&"light"!==Spicetify.Config.color_scheme&&!document.querySelector("lucid-transperent-window-controls")&&null!=(y=document.querySelector(".Root__top-container"))&&y.appendChild(L),y=Spicetify.Locale){var n=a(y.get("playlist.a11y.play")),i=a(y.get("playlist.a11y.pause")),o=y.get("play"),r=y.get("pause"),l=y.get("browse"),s=y.get("web-player.aligned-curation.tooltips.add-to-liked-songs"),c=y.get("web-player.aligned-curation.tooltips.add-to-playlist"),d=y.get("playback-control.skip-forward"),u=y.get("playback-control.skip-back"),p=y.get("buddy-feed.friend-activity"),m=y.get("tracklist.a11y.play"),g=y.get("view.web-player-home");let e,t;["zh-CN","zh-TW","am","fi"].includes(y.getLocale())?[e,t]=m.split("{1}"):[e,t]=m.split("{0}"),e=a(e),t=a(t);var m=y.get("playback-control.enable-repeat"),b=y.get("playback-control.enable-repeat-one"),y=y.get("playback-control.disable-repeat"),v=document.createElement("style");v.innerHTML=`
.main-repeatButton-button[aria-checked="false"],
.player-controls__right button[aria-label*="${m}"]  span{
  -webkit-mask-image: var(--repeat-off-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-off.svg"));
  mask-image: var(--repeat-off-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/repeat-off.svg"));
  background-color: var(--spice-subtext);
  mask-size: contain;
}

.main-repeatButton-button[aria-checked="mixed"],
.player-controls__right button[aria-label*="${y}"] span {
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

.player-controls__right button[aria-label*="${y}"] svg,
.player-controls__right button[aria-label*="${m}"] svg {
  transform: scale(1.15);
}

.player-controls__right button[aria-label*="${y}"] svg,
.player-controls__right button[aria-label*="${m}"] svg {
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
.main-playButton-PlayButton>button[aria-label*="${n}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: var(--play-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/play.svg")) !important;
  mask-image: var(--play-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/play.svg")) !important;
}

.main-playButton-button[aria-label*="${r}"],
.main-playButton-PlayButton>button[aria-label*="${r}"],
.main-playPauseButton-button[aria-label*="${r}"],
.player-controls__buttons button[aria-label*="${r}"] span,
.main-trackList-rowPlayPauseButton[aria-label*="${r}"],
.main-trackList-rowImagePlayButton[aria-label*="${r}"],
.main-playButton-PlayButton>button[aria-label*="${i}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: var(--pause-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/pause.svg")) !important;
  mask-image: var(--pause-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/pause.svg")) !important;
}

.Root__globalNav button:is([aria-label="Clear search field"]) {
  background-color: transparent !important;
  border: none !important;
}

button[aria-label="${l}"] path {
  display: none !important;
}

button[aria-label="${l}"] svg {
  display: none;
  -webkit-mask-image: var(--compass-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/compass-outline.svg"));
  mask-image: var(--compass-outline-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/compass-outline.svg"));
  background-color: var(--spice-subtext) !important;
  scale: 1.25;
}

.main-repeatButton-button[aria-label="${m}"],
.main-repeatButton-button[aria-label="${y}"],
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
.player-controls__buttons button[aria-label*="${r}"] span{
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
button[aria-label="${s}"],
button[aria-label="${c}"],
.player-controls button[aria-label="${u}"],
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
.player-controls__buttons button[aria-label*="${r}"] span svg {
  display: none;
  visibility: hidden;
}

button[aria-label="${c}"],
button[aria-label="${s}"] {
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

button[aria-label="${c}"] {
  background-color: var(--spice-accent);
  -webkit-mask-image: var(--heart-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart.svg"));
  mask-image: var(--heart-icon, url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart.svg")) !important;
}

.player-controls button[aria-label="${u}"] span,
.player-controls button[aria-label="${d}"] span {
  opacity: 0;
}

.player-controls button[aria-label="${u}"] {
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
`,document.head.appendChild(v)}S(),Z(),k&&f(w,x),Spicetify.Player.addEventListener("songchange",()=>{(async()=>{document.documentElement.style.setProperty("--fade-time","1s")})(),S(),k&&f(w,x)}),window.addEventListener("resize",Z),console.log("Lucid theme loaded."),(async()=>{var e;await h("#customControls",5e3)&&(window.isCustomControls=!0,null!=(e=document.querySelector(".lucid-transperent-window-controls")))&&e.remove()})()};(async()=>{await V()})()})();