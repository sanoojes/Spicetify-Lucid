!async function(){for(;!Spicetify.React||!Spicetify.ReactDOM;)await new Promise(t=>setTimeout(t,10));(()=>{var o=Object.defineProperty,a=Object.defineProperties,n=Object.getOwnPropertyDescriptors,i=Object.getOwnPropertySymbols,l=Object.prototype.hasOwnProperty,r=Object.prototype.propertyIsEnumerable,s=(t,e,a)=>e in t?o(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a,c=(t,e)=>{for(var a in e=e||{})l.call(e,a)&&s(t,a,e[a]);if(i)for(var a of i(e))r.call(e,a)&&s(t,a,e[a]);return t},d=(t,e)=>a(t,n(e)),m=[{section:"Default Background",items:[{label:"Blur",key:"static-bg-blur",min:0,max:100,unit:"px",default:24,tooltip:"Amount of blur to apply to the Default Background."},{label:"Brightness",key:"static-bg-brightness",min:0,max:200,unit:"%",default:65,tooltip:"Brightness level of the Default Background."},{label:"Contrast",key:"static-bg-contrast",min:0,max:200,unit:"%",default:80,tooltip:"Contrast level of the Default Background."},{label:"Saturation",key:"static-bg-saturation",min:0,max:200,unit:"%",default:90,tooltip:"Saturation level of the Default Background."}]},{section:"Animated Background",items:[{label:"Blur",key:"animated-background-blur",min:32,max:256,unit:"px",default:64,tooltip:"Amount of blur to apply to the animated background."},{label:"Saturation",key:"animated-background-saturation",min:0,max:500,unit:"%",default:150,tooltip:"Saturation level of the animated background."},{label:"Contrast",key:"animated-background-contrast",min:0,max:200,unit:"%",default:115,tooltip:"Contrast level of the animated background."},{label:"Brightness",key:"animated-background-brightness",min:0,max:200,unit:"%",default:65,tooltip:"Brightness level of the animated background."},{label:"Animation Time",key:"animated-background-time",tooltip:"Time it takes for the animated background to complete one cycle. (30s-60s prefered, 0 = no animation)",min:0,max:120,unit:"s",default:45}]},{section:"Now Playing Bar",items:[{label:"Opacity",key:"now-playing-bar-opacity",min:0,max:100,unit:"%",default:100,tooltip:"Opacity of the whole backdrop."},{label:"Background Color Opacity",key:"now-playing-bar-bg-opacity",min:0,max:100,unit:"%",default:50,tooltip:"Background Color Opacity of the now playing bar."},{label:"Height",key:"now-playing-bar-height",min:0,max:500,unit:"px",default:80,tooltip:"Height of the now playing bar."},{label:"Padding in X axis",key:"now-playing-bar-padding-x",min:0,max:50,unit:"px",default:4,tooltip:"Space between the content and the edges of the now playing bar."},{label:"Padding in Y axis",key:"now-playing-bar-padding-y",min:0,max:50,unit:"px",default:4,tooltip:"Space between the content and the edges of the now playing bar."},{label:"Border Radius",key:"border-radius-now-playing-bar",min:0,max:100,unit:"px",default:8,tooltip:"Rounded corners for the now playing bar."},{label:"Blur",key:"now-playing-bar-blur",min:0,max:100,unit:"px",default:16,tooltip:"Amount of blur to apply to the now playing bar."},{label:"Saturation",key:"now-playing-saturation",min:0,max:200,unit:"%",default:100,tooltip:"Saturation level of the now playing bar."},{label:"Contrast",key:"now-playing-contrast",min:0,max:200,unit:"%",default:100,tooltip:"Contrast level of the now playing bar."},{label:"Brightness",key:"now-playing-brightness",min:0,max:200,unit:"%",default:100,tooltip:"Brightness level of the now playing bar."}]}],t=document.createElement("style"),h=!1;async function f(t,e=50,a=100){let o=0;for(;o<e;){var n=document.querySelector(t);if(n)return n;await new Promise(t=>setTimeout(t,a)),o++}throw new Error(`Element ${t} not found after ${e} attempts.`)}var e="",u=document.createElement("style");function k(){e=(e=Spicetify.Player.data.item.metadata.image_xlarge_url||Spicetify.Player.data.item.metadata.image_large_url||Spicetify.Player.data.item.metadata.image_url).replace("spotify:image:","https://i.scdn.co/image/");try{u.innerText="",u.innerText=`:root { --image-url: url(${e}); }`}catch(t){console.error("Error updating album art:",t)}}document.head.appendChild(u);var w=document.createElement("style");document.head.appendChild(w);var p=document.createElement("style");async function x(){var e;try{var a,o,n,i=await f("section");let t="relative";"album-page"===i.dataset.testid&&(t="absolute"),i&&null!=(e=i.dataset)&&e.testUri&&(o=(a=i.dataset.testUri.toLowerCase()).includes("artist"),n=a.includes("album-page"),t=o||0!==document.querySelectorAll(".playlist-playlist-playlist, .main-entityHeader-container, .main-entityHeader-nonWrapped").length||n?"absolute":"relative"),p.innerText=`:root { --header-position: ${t}; }`,console.log(`[Better-Bloom] Setting header position to ${t} for section`)}catch(t){console.error("[Better-Bloom] Error waiting for section element:",t)}}async function b(t){let a=await f(".Root__top-container").catch(t=>console.error(t));function e(){var t=null==a?void 0:a.querySelector(".bloom-animated-background-container"),e=null==a?void 0:a.querySelector(".bloom-static-background-container");t&&t.remove(),e&&e.remove()}e();try{if("animated"===t){var o,n=function(){var t=Math.floor(360*Math.random());document.documentElement.style.setProperty("--random-degree",t+"deg")},i=(n(),document.createElement("div")),l=(i.classList.add("bloom-animated-background-container"),["front","back","backleft","backright"]);for(o of l){var r=document.createElement("div");r.classList.add(o),i.appendChild(r)}null!=a&&a.prepend(i)}var s;"static"===t&&((s=document.createElement("div")).classList.add("bloom-static-background-container"),null!=a)&&a.prepend(s),"solid"===t&&e()}catch(t){console.error(t)}}document.head.appendChild(p),document.head.appendChild(p);var B=document.createElement("div");var g=document.createElement("style");async function S(){var t,e,a;h||(t=document.querySelector(".global-nav")||document.querySelector(".Root__globalNav"),a=window.innerWidth,e=0<(a=window.outerWidth/a*100)?a/50:0,t||(console.log(`Current zoom level: ${a}%`),t=Math.round(a**.912872807*100)/100-2,a=4*1**e,e=9+1**e,await Spicetify.CosmosAsync.post("sp://messages/v1/container/control",{type:"update_titlebar",height:t}),g.innerText=`
            .main-topBar-container {
                padding-inline-end: ${e}rem !important;
                padding-inline-start: ${a}rem !important;
            }

            .spotify__container--is-desktop.spotify__os--is-windows .Root__globalNav {
                padding-inline: ${a}rem ${e}rem !important;
            }
        `),"windows"===Spicetify.Platform.PlatformData.os_name&&"light"!==Spicetify.Config.color_scheme&&(B.classList.add("bloom-transperent-window-controls"),B.style.setProperty("--control-height","64px"),B.style.setProperty("--control-width","135px")))}document.head.appendChild(g);var y,v=document.createElement("div");function $(t,e){document.body.style.setProperty("--"+t,e)}function C(){var e=localStorage.getItem("settings");if(e)try{let t=JSON.parse(e);return m.map(e=>{let a=t.find(t=>t.section===e.section);return d(c({},e),{items:e.items.map(e=>{var t=a?a.items.find(t=>t.key===e.key):void 0;return d(c({},e),{value:t?t.value:e.default})})})})}catch(t){console.error("Error loading settings:",t)}return JSON.parse(JSON.stringify(m))}v.className="bloom-settings-container";{C().forEach(t=>{let o=document.createElement("div");o.className="bloom-settings-card";var e=document.createElement("h2");e.classList.add("settings-section-heading","encore-text-title-small","encore-internal-color-text-base"),e.textContent=t.section,o.appendChild(e),t.items.forEach(i=>{var t=document.createElement("div"),e=(t.className="bloom-settings-input-card",document.createElement("label")),a=(e.classList.add("settings-section-label","encore-text-title-small","encore-internal-color-text-subdued"),e.innerText=i.label,e.htmlFor=i.key+"-input",document.createElement("p"));a.classList.add("encore-text-body-small","encore-internal-color-text-subdued"),a.innerText=i.tooltip||"";let l=document.createElement("input"),r=(l.className="better-bloom-slider",l.type="range",l.id=i.key+"-input",l.min=String(i.min),l.max=String(i.max),l.value=String(void 0!==i.value?i.value:i.default),document.createElement("span"));r.id=i.key+"-value",r.textContent=""+l.value+i.unit,r.className="better-bloom-slider-value",$(i.key,""+l.value+i.unit),l.addEventListener("input",()=>{var t,e=parseInt(l.value,10),a=(r.textContent=""+e+i.unit,$(i.key,""+e+i.unit),i.key),o=C(),n=o.findIndex(t=>t.items.some(t=>t.key===a));-1!==n&&-1!==(t=o[n].items.findIndex(t=>t.key===a))&&(o[n].items[t].value=e,localStorage.setItem("settings",JSON.stringify(o)))}),t.appendChild(e),t.appendChild(a);e=document.createElement("div");e.className="better-bloom-slider-container",e.appendChild(l),e.appendChild(r),t.appendChild(e),o.appendChild(t)}),v.appendChild(o)});var E=document.createElement("div"),P=(E.classList.add("bloom-settings-section"),document.createElement("h2")),_=(P.classList.add("bloom-settings-subtitle"),P.textContent="Background Options",document.createElement("div")),L=(_.classList.add("bloom-dropdown-container"),document.createElement("h2"));L.classList.add("bloom-slider-label"),L.textContent="Background",_.appendChild(L);let a=document.createElement("select");a.classList.add("bloom-dropdown","main-dropDown-dropDown"),[{text:"Default Background",value:"static"},{text:"Animated Background",value:"animated"},{text:"Solid Background",value:"solid"}].forEach(t=>{var e=document.createElement("option");e.textContent=t.text,e.value=t.value,a.appendChild(e)}),L=localStorage.getItem("selectedBackground")||"static",b(a.value=L),a.addEventListener("change",function(){try{var t=this.value;console.log("[Better-Bloom] Selected Background:",t),localStorage.setItem("selectedBackground",t),b(t)}catch(t){console.log("[Better-Bloom] Error setting Stored Background: ",t)}}),E.appendChild(P),E.appendChild(_),_.appendChild(a),v.appendChild(E),(L=document.createElement("button")).className="bloom-reset-btn",L.textContent="Reset to Defaults",L.addEventListener("click",()=>{confirm("Are you sure you want to reset all settings to their default values?")&&(localStorage.removeItem("settings"),document.querySelectorAll(".better-bloom-slider").forEach(t=>{var e=t.id.replace("-input",""),a=function(e){for(var t of m){t=t.items.find(t=>t.key===e);if(t)return t}}(e);a&&(t.value=String(a.default),t=document.getElementById(e+"-value"))&&(e=""+a.default+a.unit,t.textContent=e,$(a.key,e))}))}),v.appendChild(L)}y=v,new Spicetify.Menu.Item("Better Bloom Settings",!1,()=>{Spicetify.PopupModal.display({title:"Better Bloom Settings",content:y})},'<svg width="16" height="16" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.012 2.25c.734.008 1.465.093 2.182.253a.75.75 0 0 1 .582.649l.17 1.527a1.384 1.384 0 0 0 1.927 1.116l1.401-.615a.75.75 0 0 1 .85.174 9.792 9.792 0 0 1 2.204 3.792.75.75 0 0 1-.271.825l-1.242.916a1.381 1.381 0 0 0 0 2.226l1.243.915a.75.75 0 0 1 .272.826 9.797 9.797 0 0 1-2.204 3.792.75.75 0 0 1-.848.175l-1.407-.617a1.38 1.38 0 0 0-1.926 1.114l-.169 1.526a.75.75 0 0 1-.572.647 9.518 9.518 0 0 1-4.406 0 .75.75 0 0 1-.572-.647l-.168-1.524a1.382 1.382 0 0 0-1.926-1.11l-1.406.616a.75.75 0 0 1-.849-.175 9.798 9.798 0 0 1-2.204-3.796.75.75 0 0 1 .272-.826l1.243-.916a1.38 1.38 0 0 0 0-2.226l-1.243-.914a.75.75 0 0 1-.271-.826 9.793 9.793 0 0 1 2.204-3.792.75.75 0 0 1 .85-.174l1.4.615a1.387 1.387 0 0 0 1.93-1.118l.17-1.526a.75.75 0 0 1 .583-.65c.717-.159 1.45-.243 2.201-.252Zm0 1.5a9.135 9.135 0 0 0-1.354.117l-.109.977A2.886 2.886 0 0 1 6.525 7.17l-.898-.394a8.293 8.293 0 0 0-1.348 2.317l.798.587a2.881 2.881 0 0 1 0 4.643l-.799.588c.32.842.776 1.626 1.348 2.322l.905-.397a2.882 2.882 0 0 1 4.017 2.318l.11.984c.889.15 1.798.15 2.687 0l.11-.984a2.881 2.881 0 0 1 4.018-2.322l.905.396a8.296 8.296 0 0 0 1.347-2.318l-.798-.588a2.881 2.881 0 0 1 0-4.643l.796-.587a8.293 8.293 0 0 0-1.348-2.317l-.896.393a2.884 2.884 0 0 1-4.023-2.324l-.11-.976a8.988 8.988 0 0 0-1.333-.117ZM12 8.25a3.75 3.75 0 1 1 0 7.5 3.75 3.75 0 0 1 0-7.5Zm0 1.5a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Z" fill="#fff"/></svg>').register();var j=async function(){for(;!(null!=Spicetify&&Spicetify.CosmosAsync&&null!=Spicetify&&Spicetify.React&&null!=Spicetify&&Spicetify.Platform&&null!=Spicetify&&Spicetify.Locale&&null!=Spicetify&&Spicetify.Player.data);)await new Promise(t=>setTimeout(t,100));"windows"===(null==Spicetify?void 0:Spicetify.Platform.PlatformData.os_name)&&"light"!==Spicetify.Config.color_scheme&&null!=(a=document.querySelector(".Root__main-view"))&&a.prepend(B);var a=Spicetify["Locale"];function o(t){return t.replace(/[{0}{1}«»”“]/g,"").trim()}if(a){var n=o(a.get("playlist.a11y.play")),i=o(a.get("playlist.a11y.pause")),l=a.get("${playLabel}"),r=a.get("${pauseLabel}"),s=a.get("browse"),c=a.get("web-player.aligned-curation.tooltips.add-to-liked-songs"),d=a.get("web-player.aligned-curation.tooltips.add-to-playlist"),m=a.get("playback-control.skip-forward"),u=a.get("playback-control.skip-back"),p=a.get("web-player.whats-new-feed.button-label"),b=a.get("buddy-feed.friend-activity"),g=a.get("tracklist.a11y.play"),y=a.get("view.web-player-home");let t,e;["zh-CN","zh-TW","am","fi"].includes(a.getLocale())?[t,e]=g.split("{1}"):[t,e]=g.split("{0}"),t=o(t),e=o(e);g=document.createElement("style");g.innerText=`
.main-playButton-button[aria-label*="${l}"],
.main-playButton-PlayButton > button[aria-label*="${l}"],
.main-playPauseButton-button[aria-label="${l}"],
.main-playPauseButton-button[aria-label="${a.get("playback-control.play")}"],
.main-trackList-rowPlayPauseButton[aria-label*="${l}"],
.main-trackList-rowImagePlayButton[aria-label*="${t}"][aria-label*="${e}"],
.main-playButton-PlayButton > button[aria-label*="${n}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/play.svg") !important;
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/play.svg") !important;
}
.main-playButton-button[aria-label*="${r}"],
.main-playButton-PlayButton > button[aria-label*="${r}"],
.main-playPauseButton-button[aria-label*="${r}"],
.main-playPauseButton-button[aria-label="${a.get("playback-control.pause")}"],
.main-trackList-rowPlayPauseButton[aria-label*="${r}"],
.main-trackList-rowImagePlayButton[aria-label*="${r}"],
.main-playButton-PlayButton > button[aria-label*="${i}"] {
  background-color: var(--spice-text) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/pause.svg") !important;
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/pause.svg") !important;
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
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/compass_outline.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/compass_outline.svg");
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
.player-controls button[aria-label="${u}"],
.player-controls button[aria-label="${m}"], {
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
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/heart-outline.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/heart-outline.svg") !important;
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
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/heart.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/heart.svg") !important;
}

.player-controls button[aria-label="${u}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/prev.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/prev.svg");
}
.player-controls button[aria-label="${m}"] {
  background-color: var(--spice-text);
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/next.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/next.svg");
}

button[aria-label="${b}"] > path,
button[aria-label="${p}"] > path {
  display: none;
}

.main-actionButtons > div > button[aria-label="${p}"] svg,
.main-actionButtons > button[aria-label="${p}"] svg {
  background-color: var(--spice-subtext) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/alert.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/alert.svg");
}
.main-actionButtons > div > button[aria-label="${b}"] svg,
.main-actionButtons > button[aria-label="${b}"] svg {
  background-color: var(--spice-subtext) !important;
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/people-team.svg");
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/people-team.svg");
}

.main-yourLibraryX-navLink[aria-label="${y}"] svg,
button[aria-label="${y}"] svg {
  path {
    display: none !important;
  }
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/home-outline.svg");
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/home-outline.svg");
  background-color: var(--spice-subtext) !important;
}


.main-yourLibraryX-navLink[aria-label="${y}"].active svg,
.main-globalNav-navLinkActive[aria-label="${y}"] svg {
  path {
    display: none !important;
  }
  mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/home-filled.svg");
  -webkit-mask-image: url("https://sanooj.is-a.dev/better-bloom/assets/icons/home-filled.svg");
  background-color: var(--spice-text) !important;
}

.main-yourLibraryX-navLink[aria-label="${y}"].active svg{
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

`,document.head.appendChild(g)}document.head.appendChild(t),k(),S(),x(),Spicetify.Player.addEventListener("songchange",()=>{!async function(){document.documentElement.style.setProperty("--fade-time","1s")}(),k()}),window.addEventListener("resize",S);let v=await f(".Root__main-view .os-viewport, .Root__main-view .main-view-container > .main-view-container__scroll-node:not([data-overlayscrollbars-initialize]), .Root__main-view .main-view-container__scroll-node > [data-overlayscrollbars-viewport]");null!=v&&v.addEventListener("scroll",()=>{var t,e;0===v.scrollTop&&x(),document.querySelector(".under-main-view div")&&v.scrollTop!==window.innerHeight&&(t=(t=v).scrollTop,e=window.innerHeight,e=Math.min(t,e),w.innerText=`:root {--scroll-top: ${e}px;}`,0)}),console.log("Better Bloom theme loaded."),setTimeout(()=>{(async()=>{var t;await f("#customControls")&&(h=!0,null!=(t=document.querySelector(".bloom-transperent-window-controls")))&&t.remove()})()},300)};(async()=>{await j()})()})()}();