!function(){"use strict";var e,t,a,o=window.location,n=window.document,l=n.getElementById("plausible"),p=l.getAttribute("data-api")||(e=l.src.split("/"),t=e[0],a=e[2],t+"//"+a+"/api/event"),c=l&&l.getAttribute("data-exclude").split(",");function s(e){console.warn("Ignoring Event: "+e)}function r(e,t){if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"==window.localStorage.plausible_ignore)return s("localStorage flag")}catch(e){}if(c)for(var a=0;a<c.length;a++)if("pageview"==e&&o.pathname.match(new RegExp("^"+c[a].trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$")))return s("exclusion rule");var r={};r.n=e,r.u=t&&t.u?t.u:o.href,r.d=l.getAttribute("data-domain"),r.r=n.referrer||null,r.w=window.innerWidth,t&&t.meta&&(r.m=JSON.stringify(t.meta)),t&&t.props&&(r.p=JSON.stringify(t.props)),r.h=1;var i=new XMLHttpRequest;i.open("POST",p,!0),i.setRequestHeader("Content-Type","text/plain"),i.send(JSON.stringify(r)),i.onreadystatechange=function(){4==i.readyState&&t&&t.callback&&t.callback()}}}function i(e){for(var t=e.target,a="auxclick"==e.type&&2==e.which,r="click"==e.type;t&&(void 0===t.tagName||"a"!=t.tagName.toLowerCase()||!t.href);)t=t.parentNode;t&&t.href&&t.host&&t.host!==o.host&&((a||r)&&plausible("Outbound Link: Click",{props:{url:t.href}}),t.target&&!t.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!r||(setTimeout(function(){o.href=t.href},150),e.preventDefault()))}n.addEventListener("click",i),n.addEventListener("auxclick",i);var u=l.getAttribute("file-types"),f=u&&u.split(",")||["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"];function d(e){for(var t,a,r=e.target,i="auxclick"==e.type&&2==e.which,n="click"==e.type;r&&(void 0===r.tagName||"a"!=r.tagName.toLowerCase()||!r.href);)r=r.parentNode;r&&r.href&&(t=r.href,a=t.split(".").pop(),f.some(function(e){return e==a}))&&((i||n)&&plausible("File Download",{props:{url:r.href}}),r.target&&!r.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!n||(setTimeout(function(){o.href=r.href},150),e.preventDefault()))}n.addEventListener("click",d),n.addEventListener("auxclick",d);var g=window.plausible&&window.plausible.q||[];window.plausible=r;for(var w=0;w<g.length;w++)r.apply(this,g[w])}();