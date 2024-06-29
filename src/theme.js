!async function(){for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(t=>setTimeout(t,10));(()=>{var i=Object.defineProperty,a=Object.defineProperties,n=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,s=(t,e,a)=>e in t?i(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,c=(t,e)=>{for(var a in e=e||{})l.call(e,a)&&s(t,a,e[a]);if(o)for(var a of o(e))r.call(e,a)&&s(t,a,e[a]);return t},d=(t,e)=>a(t,n(e)),u=[{section:"Default Background",items:[{label:"Blur",key:"static-bg-blur",min:0,max:100,unit:"px",default:24,tooltip:"Amount of blur to apply to the Default Background."},{label:"Brightness",key:"static-bg-brightness",min:0,max:200,unit:"%",default:65,tooltip:"Brightness level of the Default Background."},{label:"Contrast",key:"static-bg-contrast",min:0,max:200,unit:"%",default:80,tooltip:"Contrast level of the Default Background."},{label:"Saturation",key:"static-bg-saturation",min:0,max:200,unit:"%",default:90,tooltip:"Saturation level of the Default Background."}]},{section:"Animated Background",items:[{label:"Blur",key:"animated-background-blur",min:32,max:256,unit:"px",default:64,tooltip:"Amount of blur to apply to the animated background."},{label:"Saturation",key:"animated-background-saturation",min:0,max:500,unit:"%",default:150,tooltip:"Saturation level of the animated background."},{label:"Contrast",key:"animated-background-contrast",min:0,max:200,unit:"%",default:115,tooltip:"Contrast level of the animated background."},{label:"Brightness",key:"animated-background-brightness",min:0,max:200,unit:"%",default:65,tooltip:"Brightness level of the animated background."},{label:"Animation Time",key:"animated-background-time",tooltip:"Time it takes for the animated background to complete one cycle. (30s-60s prefered, 0 = no animation)",min:0,max:120,unit:"s",default:45}]},{section:"Now Playing Bar",items:[{label:"Opacity",key:"now-playing-bar-opacity",min:0,max:100,unit:"%",default:100,tooltip:"Opacity of the whole backdrop."},{label:"Background Color Opacity",key:"now-playing-bar-bg-opacity",min:0,max:100,unit:"%",default:50,tooltip:"Background Color Opacity of the now playing bar."},{label:"Height",key:"now-playing-bar-height",min:0,max:500,unit:"px",default:80,tooltip:"Height of the now playing bar."},{label:"Padding in X axis",key:"now-playing-bar-padding-x",min:0,max:50,unit:"px",default:4,tooltip:"Space between the content and the edges of the now playing bar."},{label:"Margin Bottom",key:"margin-bottom-now-playing-bar",min:0,max:50,unit:"px",default:8,tooltip:"Adjusts the spacing between the bottom of the now playing bar and the content below it."},{label:"Border Radius",key:"border-radius-now-playing-bar",min:0,max:100,unit:"px",default:8,tooltip:"Rounded corners for the now playing bar."},{label:"Blur",key:"now-playing-bar-blur",min:0,max:100,unit:"px",default:32,tooltip:"Amount of blur to apply to the now playing bar."},{label:"Saturation",key:"now-playing-saturation",min:0,max:200,unit:"%",default:100,tooltip:"Saturation level of the now playing bar."},{label:"Contrast",key:"now-playing-contrast",min:0,max:200,unit:"%",default:100,tooltip:"Contrast level of the now playing bar."},{label:"Brightness",key:"now-playing-brightness",min:0,max:200,unit:"%",default:100,tooltip:"Brightness level of the now playing bar."}]}],h=!1;async function f(t,e=50,a=100){let i=0;for(;i<e;){var n=document.querySelector(t);if(n)return n;await new Promise(t=>setTimeout(t,a)),i++}throw new Error(`Element ${t} not found after ${e} attempts.`)}var t="",e=document.createElement("style");function k(){t=Spicetify.Player.data.item.metadata.image_xlarge_url||Spicetify.Player.data.item.metadata.image_large_url||Spicetify.Player.data.item.metadata.image_url;try{e.innerText="",e.innerText=`:root { --image-url: url(${t}); }`}catch(t){console.error("Error updating album art:",t)}}document.head.appendChild(e);var w=document.createElement("style");document.head.appendChild(w);var p=document.createElement("style");async function x(){var e,a,i,n;try{var o,l,r,s=await f("section");let t="relative";(null!=(e=s.dataset.testid)&&e.includes("album")||null!=(a=s.dataset.testid)&&a.includes("playlist")||null!=(i=s.dataset.testid)&&i.includes("artist"))&&(t="absolute"),s&&null!=(n=s.dataset)&&n.testUri&&(l=(o=s.dataset.testUri.toLowerCase()).includes("artist"),r=o.includes("album-page"),t=l||0!==document.querySelectorAll(".playlist-playlist-playlist, .main-entityHeader-container, .main-entityHeader-nonWrapped").length||r?"absolute":"relative"),p.innerText=`:root { --header-position: ${t}; }`}catch(t){console.error("[Lucid] Error waiting for section element:",t)}}document.head.appendChild(p),document.head.appendChild(p);var S=document.createElement("div");function m(t,e,a=1,i=0,n=1/0){return Math.max(i,Math.min(t*(e+a-1),n))}var g=document.createElement("style");async function L(){var t,e,a,i;h||(e=document.querySelector(".global-nav")||document.querySelector(".Root__globalNav"),i=window.innerWidth,i=window.outerWidth/i*100,t=window.innerWidth/window.outerWidth,i=Math.round(i**.912872807*100/100-3),await Spicetify.CosmosAsync.post("sp://messages/v1/container/control",{type:"update_titlebar",height:i}),i=m(64,t,1),a=m(135,t,1),g.innerText=e?`
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
        `,"windows"===Spicetify.Platform.PlatformData.os_name&&"light"!==Spicetify.Config.color_scheme&&(e=m(135,t,1),i=64,a=e,S.classList.add("lucid-transperent-window-controls"),S.style.setProperty("--control-height",i+"px"),S.style.setProperty("--control-width",a+"px")))}async function y(t){let e=await f(".Root__top-container").catch(t=>console.error(t));var a,i,n,o,l;a=null==e?void 0:e.querySelector(".lucid-animated-background-container"),i=null==e?void 0:e.querySelector(".lucid-static-background-container"),n=null==e?void 0:e.querySelector(".lucid-solid-background-container"),a&&a.remove(),i&&i.remove(),n&&n.remove();try{if("animated"===(t=t||"static")){var r,s=function(){var t=Math.floor(360*Math.random());document.documentElement.style.setProperty("--random-degree",t+"deg")},c=(s(),document.createElement("div")),d=(c.classList.add("lucid-animated-background-container"),["front","back","backleft","backright"]);for(r of d){var u=document.createElement("div");u.classList.add(r),c.appendChild(u)}null!=e&&e.prepend(c)}"static"===t&&((o=document.createElement("div")).classList.add("lucid-static-background-container"),null!=e)&&e.prepend(o),"solid"===t&&((l=document.createElement("div")).classList.add("lucid-solid-background-container"),null!=e)&&e.prepend(l)}catch(t){console.error(t)}}document.head.appendChild(g);var b=document.createElement("style");function v(t){try{"stary"===(t=t||"stary")&&(b.innerText=`
      :root {
        --background-noise: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' version='1.1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:svgjs='http://svgjs.dev/svgjs' viewBox='0 0 700 700' width='700' height='700' opacity='1'%3E%3Cdefs%3E%3Cfilter id='nnnoise-filter' x='-20%25' y='-20%25' width='140%25' height='140%25' filterUnits='objectBoundingBox' primitiveUnits='userSpaceOnUse' color-interpolation-filters='linearRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.184' numOctaves='4' seed='15' stitchTiles='stitch' x='0%25' y='0%25' width='100%25' height='100%25' result='turbulence'%3E%3C/feTurbulence%3E%3CfeSpecularLighting surfaceScale='13' specularConstant='0.3' specularExponent='20' lighting-color='%23ffffff' x='0%25' y='0%25' width='100%25' height='100%25' in='turbulence' result='specularLighting'%3E%3CfeDistantLight azimuth='3' elevation='133'%3E%3C/feDistantLight%3E%3C/feSpecularLighting%3E%3CfeColorMatrix type='saturate' values='0' x='0%25' y='0%25' width='100%25' height='100%25' in='specularLighting' result='colormatrix'%3E%3C/feColorMatrix%3E%3C/filter%3E%3C/defs%3E%3Crect width='700' height='700' fill='%2300000000'%3E%3C/rect%3E%3Crect width='700' height='700' fill='%23ffffff' filter='url(%23nnnoise-filter)'%3E%3C/rect%3E%3C/svg%3E") !important;
        }
        `),"normal"===t&&(b.innerText=`
        :root {
          --background-noise: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=) !important;
}
`),"none"===t&&(b.innerText=`
  :root {
    --background-noise: none !important;
    }
    `)}catch(t){console.error(t)}}document.head.appendChild(b);var C,E=document.createElement("div");function B(t,e){document.body.style.setProperty("--"+t,e)}function $(){var e=localStorage.getItem("settings");if(e)try{let t=JSON.parse(e);return u.map(e=>{let a=t.find(t=>t.section===e.section);return d(c({},e),{items:e.items.map(e=>{var t=a?a.items.find(t=>t.key===e.key):void 0;return d(c({},e),{value:t?t.value:e.default})})})})}catch(t){console.error("Error loading settings:",t)}return JSON.parse(JSON.stringify(u))}E.className="lucid-settings-container";{$().forEach(t=>{let i=document.createElement("div");i.className="lucid-settings-card";var e=document.createElement("h2");e.classList.add("settings-section-heading","encore-text-title-small","encore-internal-color-text-base"),e.textContent=t.section,i.appendChild(e),t.items.forEach(o=>{var t=document.createElement("div"),e=(t.className="lucid-settings-input-card",document.createElement("label")),a=(e.classList.add("settings-section-label","encore-text-title-small","encore-internal-color-text-subdued"),e.innerText=o.label,e.htmlFor=o.key+"-input",document.createElement("p"));a.classList.add("encore-text-body-small","encore-internal-color-text-subdued"),a.innerText=o.tooltip||"";let l=document.createElement("input"),r=(l.className="Lucid-slider",l.type="range",l.id=o.key+"-input",l.min=String(o.min),l.max=String(o.max),l.value=String(void 0!==o.value?o.value:o.default),document.createElement("span"));r.id=o.key+"-value",r.textContent=""+l.value+o.unit,r.className="Lucid-slider-value",B(o.key,""+l.value+o.unit),l.addEventListener("input",()=>{var t,e=parseInt(l.value,10),a=(r.textContent=""+e+o.unit,B(o.key,""+e+o.unit),o.key),i=$(),n=i.findIndex(t=>t.items.some(t=>t.key===a));-1!==n&&-1!==(t=i[n].items.findIndex(t=>t.key===a))&&(i[n].items[t].value=e,localStorage.setItem("settings",JSON.stringify(i)))}),t.appendChild(e),t.appendChild(a);e=document.createElement("div");e.className="Lucid-slider-container",e.appendChild(l),e.appendChild(r),t.appendChild(e),i.appendChild(t)}),E.appendChild(i)});let e=async(t,e,a,i)=>{var n=document.createElement("div"),o=(n.classList.add("lucid-dropdown-container"),document.createElement("h2"));o.classList.add("lucid-slider-label"),o.textContent=a,n.appendChild(o);let l=document.createElement("select");l.classList.add("lucid-dropdown","main-dropDown-dropDown"),t.forEach(t=>{var e=document.createElement("option");e.textContent=t.text,e.value=t.value,l.appendChild(e)});a=localStorage.getItem(e)||t[0].value;return l.value=a,i(a),l.addEventListener("change",()=>{var t=l.value;localStorage.setItem(e,t),i(t)}),n.appendChild(l),n},a=document.createElement("div"),i=(a.classList.add("lucid-settings-section"),[{text:"Default Background",value:"static"},{text:"Animated Background",value:"animated"},{text:"Solid Background",value:"solid"}]),n=[{text:"Stary Grains (default)",value:"stary"},{text:"Normal Grains",value:"normal"},{text:"No Grains",value:"none"}];(async()=>{var t=await e(i,"selectedBackground","Background",t=>{y(t)}),t=(a.appendChild(t),await e(n,"lucid-selectedGrains","Background Grains",t=>{v(t)}));a.appendChild(t)})(),E.appendChild(a);var P=document.createElement("button");P.className="lucid-reset-btn",P.textContent="Reset to Defaults",P.addEventListener("click",()=>{confirm("Are you sure you want to reset all settings to their default values?")&&(localStorage.removeItem("settings"),localStorage.removeItem("selectedBackground"),y(),localStorage.removeItem("lucid-selectedGrains"),v(),document.querySelectorAll(".Lucid-slider").forEach(t=>{var e=t.id.replace("-input",""),a=function(e){for(var t of u){t=t.items.find(t=>t.key===e);if(t)return t}}(e);a&&(t.value=String(a.default),t=document.getElementById(e+"-value"))&&(e=""+a.default+a.unit,t.textContent=e,B(a.key,e))}))}),E.appendChild(P)}C=E,new Spicetify.Menu.Item("Lucid Settings",!1,()=>{Spicetify.PopupModal.display({title:"Lucid Settings",content:C})},'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252Zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" fill="#fff"/></svg>').register();var _=async function(){for(;!(null!=Spicetify&&Spicetify.CosmosAsync&&null!=Spicetify&&Spicetify.React&&null!=Spicetify&&Spicetify.Platform&&null!=Spicetify&&Spicetify.Locale&&null!=Spicetify&&Spicetify.Player.data);)await new Promise(t=>setTimeout(t,100));"windows"===(null==Spicetify?void 0:Spicetify.Platform.PlatformData.os_name)&&"light"!==Spicetify.Config.color_scheme&&null!=(a=document.querySelector(".Root__top-container"))&&a.appendChild(S);var a=Spicetify["Locale"];function i(t){return t.replace(/[{0}{1}«»”“]/g,"").trim()}if(a){var n=i(a.get("playlist.a11y.play")),o=i(a.get("playlist.a11y.pause")),l=a.get("${playLabel}"),r=a.get("${pauseLabel}"),s=a.get("browse"),c=a.get("web-player.aligned-curation.tooltips.add-to-liked-songs"),d=a.get("web-player.aligned-curation.tooltips.add-to-playlist"),u=a.get("playback-control.skip-forward"),p=a.get("playback-control.skip-back"),m=a.get("web-player.whats-new-feed.button-label"),g=a.get("buddy-feed.friend-activity"),y=a.get("tracklist.a11y.play"),b=a.get("view.web-player-home");let t,e;["zh-CN","zh-TW","am","fi"].includes(a.getLocale())?[t,e]=y.split("{1}"):[t,e]=y.split("{0}"),t=i(t),e=i(e);y=document.createElement("style");y.innerText=`
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

`,document.head.appendChild(y)}k(),L(),x(),Spicetify.Player.addEventListener("songchange",()=>{!async function(){document.documentElement.style.setProperty("--fade-time","1s")}(),k()}),window.addEventListener("resize",L);let v=await f(".Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]");null!=v&&v.addEventListener("scroll",()=>{var t,e;0===v.scrollTop&&x(),document.querySelector(".under-main-view div")&&v.scrollTop!==window.innerHeight&&(t=(t=v).scrollTop,e=window.innerHeight,e=Math.min(t,e),w.innerText=`:root {--scroll-top: ${e}px;}`,0)}),console.log("Lucid theme loaded."),setTimeout(()=>{(async()=>{var t;await f("#customControls")&&(h=!0,null!=(t=document.querySelector(".lucid-transperent-window-controls")))&&t.remove()})()},100)};(async()=>{await _()})()})()}();