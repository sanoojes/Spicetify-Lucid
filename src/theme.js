!async function(){for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(t=>setTimeout(t,10));(()=>{var M=Object.defineProperty,R=Object.defineProperties,D=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,O=Object.prototype.hasOwnProperty,G=Object.prototype.propertyIsEnumerable,n=(t,e,a)=>e in t?M(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,o=(t,e)=>{for(var a in e=e||{})O.call(e,a)&&n(t,a,e[a]);if(i)for(var a of i(e))G.call(e,a)&&n(t,a,e[a]);return t},l=(t,e)=>R(t,D(e)),r=[{section:"Default Background",items:[{label:"Blur",key:"static-bg-blur",min:0,max:100,unit:"px",default:24,tooltip:"Amount of blur to apply to the Default Background."},{label:"Brightness",key:"static-bg-brightness",min:0,max:200,unit:"%",default:65,tooltip:"Brightness level of the Default Background."},{label:"Contrast",key:"static-bg-contrast",min:0,max:200,unit:"%",default:80,tooltip:"Contrast level of the Default Background."},{label:"Saturation",key:"static-bg-saturation",min:0,max:200,unit:"%",default:90,tooltip:"Saturation level of the Default Background."}]},{section:"Animated Background",items:[{label:"Blur",key:"animated-background-blur",min:32,max:256,unit:"px",default:64,tooltip:"Amount of blur to apply to the animated background."},{label:"Saturation",key:"animated-background-saturation",min:0,max:500,unit:"%",default:150,tooltip:"Saturation level of the animated background."},{label:"Contrast",key:"animated-background-contrast",min:0,max:200,unit:"%",default:115,tooltip:"Contrast level of the animated background."},{label:"Brightness",key:"animated-background-brightness",min:0,max:200,unit:"%",default:65,tooltip:"Brightness level of the animated background."},{label:"Animation Time",key:"animated-background-time",tooltip:"Time it takes for the animated background to complete one cycle. (30s-60s prefered, 0 = no animation)",min:0,max:120,unit:"s",default:45}]},{section:"Now Playing Bar",items:[{label:"Opacity",key:"now-playing-bar-opacity",min:0,max:100,unit:"%",default:100,tooltip:"Opacity of the whole backdrop."},{label:"Background Color Opacity",key:"now-playing-bar-bg-opacity",min:0,max:100,unit:"%",default:50,tooltip:"Background Color Opacity of the now playing bar."},{label:"Height",key:"now-playing-bar-height",min:0,max:500,unit:"px",default:80,tooltip:"Height of the now playing bar."},{label:"Padding in X axis",key:"now-playing-bar-padding-x",min:0,max:50,unit:"px",default:4,tooltip:"Space between the content and the edges of the now playing bar."},{label:"Margin Bottom",key:"margin-bottom-now-playing-bar",min:0,max:50,unit:"px",default:8,tooltip:"Adjusts the spacing between the bottom of the now playing bar and the content below it."},{label:"Border Radius",key:"border-radius-now-playing-bar",min:0,max:100,unit:"px",default:8,tooltip:"Rounded corners for the now playing bar."},{label:"Blur",key:"now-playing-bar-blur",min:0,max:100,unit:"px",default:32,tooltip:"Amount of blur to apply to the now playing bar."},{label:"Saturation",key:"now-playing-saturation",min:0,max:200,unit:"%",default:100,tooltip:"Saturation level of the now playing bar."},{label:"Contrast",key:"now-playing-contrast",min:0,max:200,unit:"%",default:100,tooltip:"Contrast level of the now playing bar."},{label:"Brightness",key:"now-playing-brightness",min:0,max:200,unit:"%",default:100,tooltip:"Brightness level of the now playing bar."}]}],v=!1,s=!1;async function f(t,e=50,a=100){let i=0;for(;i<e;){var n=document.querySelector(t);if(n)return n;await new Promise(t=>setTimeout(t,a)),i++}throw new Error(`Element ${t} not found after ${e} attempts.`)}var t="",e=document.createElement("style");function h(){t=Spicetify.Player.data.item.metadata.image_xlarge_url||Spicetify.Player.data.item.metadata.image_large_url||Spicetify.Player.data.item.metadata.image_url;try{e.innerText="",e.innerText=`:root { --image-url: url(${t}); }`}catch(t){console.error("Error updating album art:",t)}}document.head.appendChild(e);var c=document.createElement("style"),d=(document.head.appendChild(c),null);var u=document.createElement("style");async function w(){var e,a,i;try{var n=await f("section");let t="relative";(null!=(e=n.dataset.testid)&&e.match(/(album|playlist|artist)/)||null!=(a=n.dataset.testUri)&&a.toLowerCase().includes("artist")||null!=(i=n.dataset.testUri)&&i.toLowerCase().includes("album-page")||0<document.querySelectorAll(".playlist-playlist-playlist, .main-entityHeader-container, .main-entityHeader-nonWrapped").length)&&(t="absolute"),u.innerText=`:root { --header-position: ${t}; }`}catch(t){console.error("[Lucid] Error waiting for section element:",t)}}document.head.appendChild(u);var k=document.createElement("div");function p(t,e,a=1,i=0,n=Number.POSITIVE_INFINITY){return Math.max(i,Math.min(t*(e+a-1),n))}var m=document.createElement("style");async function x(){var t,e,a,i;v||(e=document.querySelector(".global-nav")||document.querySelector(".Root__globalNav"),i=window.innerWidth,i=window.outerWidth/i*100,t=window.innerWidth/window.outerWidth,i=Math.round(i**.912872807*100/100-3),await Spicetify.CosmosAsync.post("sp://messages/v1/container/control",{type:"update_titlebar",height:i}),i=p(64,t,1),a=p(135,t,1),m.innerText=e?`
.spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav {
  padding-inline-end: ${a}px !important;
  padding-inline-start: ${i}px !important;
}
      `:`
.main-topBar-container {
  padding-inline-end: ${a}px !important;
  padding-inline-start: ${i}px !important;
}

.spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav {
  padding-inline: ${i}px ${a}px !important;
}
        `,"windows"===Spicetify.Platform.PlatformData.os_name&&"light"!==Spicetify.Config.color_scheme&&(e=p(135,t,1),i=64,a=e,k.classList.add("lucid-transperent-window-controls"),k.style.setProperty("--control-height",i+"px"),k.style.setProperty("--control-width",a+"px")))}async function g(t){let e=await f(".Root__top-container").catch(t=>console.error(t));var a,i,n,o,l;a=null==e?void 0:e.querySelector(".lucid-animated-background-container"),i=null==e?void 0:e.querySelector(".lucid-static-background-container"),n=null==e?void 0:e.querySelector(".lucid-solid-background-container"),a&&a.remove(),i&&i.remove(),n&&n.remove();try{if("animated"===t){var r,s=function(){var t=Math.floor(360*Math.random());document.documentElement.style.setProperty("--random-degree",t+"deg")},c=(s(),document.createElement("div")),d=(c.classList.add("lucid-animated-background-container"),["front","back","backleft","backright"]);for(r of d){var u=document.createElement("div");u.classList.add(r),c.appendChild(u)}null!=e&&e.prepend(c)}t&&"static"!==t||((o=document.createElement("div")).classList.add("lucid-static-background-container"),null!=e&&e.prepend(o)),"solid"===t&&((l=document.createElement("div")).classList.add("lucid-solid-background-container"),null!=e)&&e.prepend(l)}catch(t){console.error(t)}}document.head.appendChild(m);var a=document.createElement("style");function y(t){try{t&&"stary"!==t||(a.innerText=`
      :root {
        --background-noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3E%3Cdefs%3E%3Cfilter id='nnnoise-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.184' numOctaves='4' seed='15' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'%3E%3C/feTurbulence%3E%3CfeSpecularLighting surfaceScale='13' specularConstant='0.3' specularExponent='20' lighting-color='%23ffffff' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' result='specularLighting'%3E%3CfeDistantLight azimuth='3' elevation='133'%3E%3C/feDistantLight%3E%3C/feSpecularLighting%3E%3CfeColorMatrix type='saturate' values='0' x='0%25' y='0%25' width='100%25' height='100%25' in='specularLighting' result='colormatrix'%3E%3C/feColorMatrix%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='%2300000000'%3E%3C/rect%3E%3Crect width='700' height='700' fill='%23ffffff' filter='url(%23nnnoise-filter)'%3E%3C/rect%3E%3C/svg%3E") !important;
        }
        `),"normal"===t&&(a.innerText=`
        :root {
          --background-noise: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=) !important;
}
`),"none"===t&&(a.innerText=`
  :root {
    --background-noise: none !important;
    }
    `)}catch(t){console.error(t)}}document.head.appendChild(a);var b,S,L=document.createElement("div");function C(t,e){document.body.style.setProperty("--"+t,e)}function E(){var e=localStorage.getItem("settings");if(e)try{let t=JSON.parse(e);return r.map(e=>{let a=t.find(t=>t.section===e.section);return l(o({},e),{items:e.items.map(e=>{var t=a?a.items.find(t=>t.key===e.key):void 0;return l(o({},e),{value:t?t.value:e.default})})})})}catch(t){console.error("Error loading settings:",t)}return JSON.parse(JSON.stringify(r))}L.className="lucid-settings-container";{for(b of E()){var B=document.createElement("div"),$=(B.className="lucid-settings-card",document.createElement("h2"));$.classList.add("settings-section-heading","encore-text-title-small","encore-internal-color-text-base"),$.textContent=b.section,B.appendChild($);for(let r of b.items){var P=document.createElement("div"),I=(P.className="lucid-settings-input-card",document.createElement("label")),_=(I.classList.add("settings-section-label","encore-text-title-small","encore-internal-color-text-subdued"),I.innerText=r.label,I.htmlFor=r.key+"-input",document.createElement("p"));_.classList.add("encore-text-body-small","encore-internal-color-text-subdued"),_.innerText=r.tooltip||"";let o=document.createElement("input"),l=(o.className="Lucid-slider",o.type="range",o.id=r.key+"-input",o.min=String(r.min),o.max=String(r.max),o.value=String(void 0!==r.value?r.value:r.default),document.createElement("span"));l.id=r.key+"-value",l.textContent=""+o.value+r.unit,l.className="Lucid-slider-value",C(r.key,""+o.value+r.unit),o.addEventListener("input",()=>{var t,e=Number.parseInt(o.value,10),a=(l.textContent=""+e+r.unit,C(r.key,""+e+r.unit),r.key),i=E(),n=i.findIndex(t=>t.items.some(t=>t.key===a));-1!==n&&-1!==(t=i[n].items.findIndex(t=>t.key===a))&&(i[n].items[t].value=e,localStorage.setItem("settings",JSON.stringify(i)))}),P.appendChild(I),P.appendChild(_);I=document.createElement("div");I.className="Lucid-slider-container",I.appendChild(o),I.appendChild(l),P.appendChild(I),B.appendChild(P)}L.appendChild(B)}let e=async(t,e,a,i)=>{var n,o=document.createElement("div"),l=(o.classList.add("lucid-dropdown-container"),document.createElement("h2"));l.classList.add("lucid-slider-label"),l.textContent=a,o.appendChild(l);let r=document.createElement("select");r.classList.add("lucid-dropdown","main-dropDown-dropDown"),r.id=e+"-dropdown";for(n of t){var s=document.createElement("option");s.textContent=n.text,s.value=n.value,r.appendChild(s)}a=localStorage.getItem(e)||t[0].value;return r.value=a,i(a),r.addEventListener("change",()=>{var t=r.value;localStorage.setItem(e,t),i(t)}),o.appendChild(r),o},a=document.createElement("div"),i=(a.classList.add("lucid-settings-section"),[{text:"Default Background",value:"static"},{text:"Animated Background",value:"animated"},{text:"Solid Background",value:"solid"}]),n=[{text:"Stary Grains (default)",value:"stary"},{text:"Normal Grains",value:"normal"},{text:"No Grains",value:"none"}],o=[{text:"New Scroll",value:"new"},{text:"Default Scroll",value:"default"}];(async()=>{var t=await e(i,"selectedBackground","Background",t=>{g(t)}),t=(a.appendChild(t),await e(n,"lucid-selectedGrains","Background Grains",t=>{y(t)})),t=(a.appendChild(t),await e(o,"lucid-scrollEffect","Artist Page Scroll Effect",t=>{s="new"===t,N()}));a.appendChild(t)})(),L.appendChild(a);var j=document.createElement("button");j.className="lucid-reset-btn",j.textContent="Reset to Defaults",j.addEventListener("click",()=>{if(confirm("Are you sure you want to reset all settings to their default values?")){var t;localStorage.removeItem("settings"),g("static"),localStorage.setItem("selectedBackground","static"),y("stary"),localStorage.setItem("lucid-selectedGrains","stary");for(t of Array.from(document.querySelectorAll(".Lucid-slider"))){var e=t.id.replace("-input",""),a=function(e){for(var t of r){t=t.items.find(t=>t.key===e);if(t)return t}}(e);a&&(t.value=String(a.default),t=document.getElementById(e+"-value"))&&(e=""+a.default+a.unit,t.textContent=e,C(a.key,e))}s=!0,localStorage.setItem("lucid-scrollEffect","new"),N()}}),L.appendChild(j)}function N(){var t=document.querySelector(".Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]");t?s?(console.log("[Lucid] Applying new scroll effect."),t.removeEventListener("scroll",A),T.call(t),t.addEventListener("scroll",T)):(console.log("[Lucid] Applying default scroll effect"),t.removeEventListener("scroll",T),A.call(t,new Event("scroll")),t.addEventListener("scroll",A)):console.error("Scroll container not found.")}function z(e){d=requestAnimationFrame(()=>{var t=window.innerHeight,t=e/t,t=Math.min(t,.5);c.innerText=`:root {
      --scroll-coefficient: ${t} ;
    }`,d=null})}function T(){0===this.scrollTop&&w(),z(this.scrollTop)}function A(t){d&&cancelAnimationFrame(d),d=requestAnimationFrame(()=>{var a;0===this.scrollTop&&w(),z(this.scrollTop),document.querySelector(".under-main-view div")&&this.scrollTop!==window.innerHeight&&(a=this,d&&cancelAnimationFrame(d),d=requestAnimationFrame(()=>{var t=a.scrollTop,e=window.innerHeight,t=Math.min(t,e);c.innerText=`:root {--scroll-top: ${t}px;}`,d=null})),d=null})}S=L,new Spicetify.Menu.Item("Lucid Settings",!1,()=>{Spicetify.PopupModal.display({title:"Lucid Settings",content:S})},'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252Zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" fill="#fff"/></svg>').register();var Z=async function(){for(;!(null!=Spicetify&&Spicetify.CosmosAsync&&null!=Spicetify&&Spicetify.React&&null!=Spicetify&&Spicetify.Platform&&null!=Spicetify&&Spicetify.Locale&&null!=Spicetify&&Spicetify.Player.data);)await new Promise(t=>setTimeout(t,100));"windows"===(null==Spicetify?void 0:Spicetify.Platform.PlatformData.os_name)&&"light"!==Spicetify.Config.color_scheme&&null!=(a=document.querySelector(".Root__top-container"))&&a.appendChild(k);var a=Spicetify["Locale"];function i(t){return t.replace(/[{0}{1}«»”“]/g,"").trim()}if(a){var n=i(a.get("playlist.a11y.play")),o=i(a.get("playlist.a11y.pause")),l=a.get("${playLabel}"),r=a.get("${pauseLabel}"),s=a.get("browse"),c=a.get("web-player.aligned-curation.tooltips.add-to-liked-songs"),d=a.get("web-player.aligned-curation.tooltips.add-to-playlist"),u=a.get("playback-control.skip-forward"),p=a.get("playback-control.skip-back"),m=a.get("web-player.whats-new-feed.button-label"),g=a.get("buddy-feed.friend-activity"),y=a.get("tracklist.a11y.play"),b=a.get("view.web-player-home");let t,e;["zh-CN","zh-TW","am","fi"].includes(a.getLocale())?[t,e]=y.split("{1}"):[t,e]=y.split("{0}"),t=i(t),e=i(e);y=document.createElement("style");y.innerText=`
.main-playButton-button[aria-label*="${l}"],
.main-playButton-PlayButton > button[aria-label*="${l}"],
.main-playPauseButton-button[aria-label="${l}"],
.main-playPauseButton-button[aria-label="${a.get("playback-control.play")}"],
.main-trackList-rowPlayPauseButton[aria-label*="${l}"],
.main-trackList-rowImagePlayButton[aria-label*="${t}"][aria-label*="${e}"],
.main-playButton-PlayButton > button[aria-label*="${n}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/play.svg") !important;
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/play.svg") !important;
}
.main-playButton-button[aria-label*="${r}"],
.main-playButton-PlayButton > button[aria-label*="${r}"],
.main-playPauseButton-button[aria-label*="${r}"],
.main-playPauseButton-button[aria-label="${a.get("playback-control.pause")}"],
.main-trackList-rowPlayPauseButton[aria-label*="${r}"],
.main-trackList-rowImagePlayButton[aria-label*="${r}"],
.main-playButton-PlayButton > button[aria-label*="${o}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/pause.svg") !important;
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/pause.svg") !important;
}

.Root__globalNav
  button:is([aria-label="${a.get("search.a11y.clear-input")}"]) {
  background-color: transparent !important;
  border: none !important;
}

button[aria-label="${s}"] path {
  display: none !important;
}

button[aria-label="${s}"] svg {
  display: none;
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/compass_outline.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/compass_outline.svg");
  background-color: var(--spice-subtext) !important;
  scale: 1.25;
}
.main-repeatButton-button[aria-label="${a.get("playback-control.enable-repeat")}"] ,
  .main-repeatButton-button[aria-label="${a.get("playback-control.disable-repeat")}"],
  .main-repeatButton-button[aria-label="${a.get("playback-control.enable-repeat-one")}"], {
  scale: 0.75 !important;
  background-color: var(--spice-subtext) !important;
  color: var(--spice-subtext);
  svg {
    display: none;
  }
}

.main-playPauseButton-button,
button[aria-label="${c}"],
button[aria-label="${d}"],
.player-controls button[aria-label="${p}"],
.player-controls button[aria-label="${u}"], {
  display: block;
  mask-size: 100%;
  mask-position: 50% 50%;
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
  svg,
  span {
    display: none;
    visibility: hidden;
  }
}

button[aria-label="${d}"],
button[aria-label="${c}"] {
  background-color: var(--spice-subtext);
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart-outline.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart-outline.svg") !important;
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
button[aria-label="${d}"] {
  background-color: var(--spice-accent);
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/heart.svg") !important;
}

.player-controls button[aria-label="${p}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/prev.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/prev.svg");
}
.player-controls button[aria-label="${u}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/next.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/next.svg");
}

button[aria-label="${g}"] > path,
button[aria-label="${m}"] > path {
  display: none;
}

.main-actionButtons > div > button[aria-label="${m}"] svg,
.main-actionButtons > button[aria-label="${m}"] svg {
  background-color: var(--spice-subtext) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/alert.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/alert.svg");
}
.main-actionButtons > div > button[aria-label="${g}"] svg,
.main-actionButtons > button[aria-label="${g}"] svg {
  background-color: var(--spice-subtext) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/people-team.svg");
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/people-team.svg");
}

.main-yourLibraryX-navLink[aria-label="${b}"] svg,
button[aria-label="${b}"] svg {
  path {
    display: none !important;
  }
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-outline.svg");
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-outline.svg");
  background-color: var(--spice-subtext) !important;
}


.main-yourLibraryX-navLink[aria-label="${b}"].active svg,
.main-globalNav-navLinkActive[aria-label="${b}"] svg {
  path {
    display: none !important;
  }
  mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-filled.svg");
  -webkit-mask-image: url("https://sanooj.is-a.dev/Spicetify-Lucid/assets/icons/home-filled.svg");
  background-color: var(--spice-text) !important;
}

.main-yourLibraryX-navLink[aria-label="${b}"].active svg{
  path {
    display: none !important;
  }
  background-color: var(--spice-accent) !important;
}
#context-menu ul[aria-label*="${a.get("web-player.aligned-curation.add-to-playlist-menu")}"] {
  p {
    max-width: 10rem;
  }
}

`,document.head.appendChild(y)}h(),x(),w(),Spicetify.Player.addEventListener("songchange",()=>{!async function(){document.documentElement.style.setProperty("--fade-time","1s")}(),h()}),window.addEventListener("resize",x),N(),console.log("Lucid theme loaded."),setTimeout(()=>{(async()=>{var t;await f("#customControls")&&(v=!0,null!=(t=document.querySelector(".lucid-transperent-window-controls")))&&t.remove()})()},100)};(async()=>{await Z()})()})()}();