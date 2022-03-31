!function(){"use strict";var o=window.location,a=window.document,r=a.currentScript,l=r.getAttribute("data-api")||new URL(r.src).origin+"/api/event";function p(e){console.warn("Ignoring Event: "+e)}function e(e,t){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(o.hostname)||"file:"===o.protocol)return p("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"==window.localStorage.plausible_ignore)return p("localStorage flag")}catch(e){}var i={};i.n=e,i.u=o.href,i.d=r.getAttribute("data-domain"),i.r=a.referrer||null,i.w=window.innerWidth,t&&t.meta&&(i.m=JSON.stringify(t.meta)),t&&t.props&&(i.p=JSON.stringify(t.props)),i.h=1;var n=new XMLHttpRequest;n.open("POST",l,!0),n.setRequestHeader("Content-Type","text/plain"),n.send(JSON.stringify(i)),n.onreadystatechange=function(){4==n.readyState&&t&&t.callback&&t.callback()}}}var t=r.getAttribute("file-types"),s=t&&t.split(",")||["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"];function i(e){for(var t,i,n=e.target,a="auxclick"==e.type&&2==e.which,r="click"==e.type;n&&(void 0===n.tagName||"a"!=n.tagName.toLowerCase()||!n.href);)n=n.parentNode;n&&n.href&&(t=n.href,i=t.split(".").pop(),s.some(function(e){return e==i}))&&((a||r)&&plausible("File Download",{props:{url:n.href}}),n.target&&!n.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!r||(setTimeout(function(){o.href=n.href},150),e.preventDefault()))}a.addEventListener("click",i),a.addEventListener("auxclick",i);var n=window.plausible&&window.plausible.q||[];window.plausible=e;for(var c,d=0;d<n.length;d++)e.apply(this,n[d]);function w(){c=o.pathname,e("pageview")}window.addEventListener("hashchange",w),"prerender"===a.visibilityState?a.addEventListener("visibilitychange",function(){c||"visible"!==a.visibilityState||w()}):w()}();