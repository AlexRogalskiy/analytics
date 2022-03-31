!function(){"use strict";var e,t,i,o=window.location,r=window.document,p=r.getElementById("plausible"),l=p.getAttribute("data-api")||(e=p.src.split("/"),t=e[0],i=e[2],t+"//"+i+"/api/event"),s=p&&p.getAttribute("data-exclude").split(",");function c(e){console.warn("Ignoring Event: "+e)}function a(e,t){if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"==window.localStorage.plausible_ignore)return c("localStorage flag")}catch(e){}if(s)for(var i=0;i<s.length;i++)if("pageview"==e&&o.pathname.match(new RegExp("^"+s[i].trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$")))return c("exclusion rule");var a={};a.n=e,a.u=o.href,a.d=p.getAttribute("data-domain"),a.r=r.referrer||null,a.w=window.innerWidth,t&&t.meta&&(a.m=JSON.stringify(t.meta)),t&&t.props&&(a.p=JSON.stringify(t.props)),a.h=1;var n=new XMLHttpRequest;n.open("POST",l,!0),n.setRequestHeader("Content-Type","text/plain"),n.send(JSON.stringify(a)),n.onreadystatechange=function(){4==n.readyState&&t&&t.callback&&t.callback()}}}var n=p.getAttribute("file-types"),d=n&&n.split(",")||["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"];function u(e){for(var t,i,a=e.target,n="auxclick"==e.type&&2==e.which,r="click"==e.type;a&&(void 0===a.tagName||"a"!=a.tagName.toLowerCase()||!a.href);)a=a.parentNode;a&&a.href&&(t=a.href,i=t.split(".").pop(),d.some(function(e){return e==i}))&&((n||r)&&plausible("File Download",{props:{url:a.href}}),a.target&&!a.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!r||(setTimeout(function(){o.href=a.href},150),e.preventDefault()))}r.addEventListener("click",u),r.addEventListener("auxclick",u);var w=window.plausible&&window.plausible.q||[];window.plausible=a;for(var f,g=0;g<w.length;g++)a.apply(this,w[g]);function v(){f=o.pathname,a("pageview")}window.addEventListener("hashchange",v),"prerender"===r.visibilityState?r.addEventListener("visibilitychange",function(){f||"visible"!==r.visibilityState||v()}):v()}();