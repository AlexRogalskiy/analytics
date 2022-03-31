!function(){"use strict";var o=window.location,r=window.document,p=r.currentScript,l=p.getAttribute("data-api")||new URL(p.src).origin+"/api/event",s=p&&p.getAttribute("data-exclude").split(",");function c(e){console.warn("Ignoring Event: "+e)}function e(e,t){if(/^localhost$|^127(\.[0-9]+){0,2}\.[0-9]+$|^\[::1?\]$/.test(o.hostname)||"file:"===o.protocol)return c("localhost");if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"==window.localStorage.plausible_ignore)return c("localStorage flag")}catch(e){}if(s)for(var i=0;i<s.length;i++)if("pageview"==e&&o.pathname.match(new RegExp("^"+s[i].trim().replace(/\*\*/g,".*").replace(/([^\.])\*/g,"$1[^\\s/]*")+"/?$")))return c("exclusion rule");var a={};a.n=e,a.u=o.href,a.d=p.getAttribute("data-domain"),a.r=r.referrer||null,a.w=window.innerWidth,t&&t.meta&&(a.m=JSON.stringify(t.meta)),t&&t.props&&(a.p=JSON.stringify(t.props));var n=new XMLHttpRequest;n.open("POST",l,!0),n.setRequestHeader("Content-Type","text/plain"),n.send(JSON.stringify(a)),n.onreadystatechange=function(){4==n.readyState&&t&&t.callback&&t.callback()}}}var t=p.getAttribute("file-types"),u=t&&t.split(",")||["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"];function i(e){for(var t,i,a=e.target,n="auxclick"==e.type&&2==e.which,r="click"==e.type;a&&(void 0===a.tagName||"a"!=a.tagName.toLowerCase()||!a.href);)a=a.parentNode;a&&a.href&&(t=a.href,i=t.split(".").pop(),u.some(function(e){return e==i}))&&((n||r)&&plausible("File Download",{props:{url:a.href}}),a.target&&!a.target.match(/^_(self|parent|top)$/i)||e.ctrlKey||e.metaKey||e.shiftKey||!r||(setTimeout(function(){o.href=a.href},150),e.preventDefault()))}r.addEventListener("click",i),r.addEventListener("auxclick",i);var a=window.plausible&&window.plausible.q||[];window.plausible=e;for(var n,d=0;d<a.length;d++)e.apply(this,a[d]);function w(){n!==o.pathname&&(n=o.pathname,e("pageview"))}var f,g=window.history;g.pushState&&(f=g.pushState,g.pushState=function(){f.apply(this,arguments),w()},window.addEventListener("popstate",w)),"prerender"===r.visibilityState?r.addEventListener("visibilitychange",function(){n||"visible"!==r.visibilityState||w()}):w()}();