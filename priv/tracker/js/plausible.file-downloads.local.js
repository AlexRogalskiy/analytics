!function(){"use strict";var o=window.location,n=window.document,r=n.currentScript,p=r.getAttribute("data-api")||new URL(r.src).origin+"/api/event";function t(t,e){if(!(window._phantom||window.__nightmare||window.navigator.webdriver||window.Cypress)){try{if("true"==window.localStorage.plausible_ignore)return void console.warn("Ignoring Event: localStorage flag")}catch(t){}var i={};i.n=t,i.u=o.href,i.d=r.getAttribute("data-domain"),i.r=n.referrer||null,i.w=window.innerWidth,e&&e.meta&&(i.m=JSON.stringify(e.meta)),e&&e.props&&(i.p=JSON.stringify(e.props));var a=new XMLHttpRequest;a.open("POST",p,!0),a.setRequestHeader("Content-Type","text/plain"),a.send(JSON.stringify(i)),a.onreadystatechange=function(){4==a.readyState&&e&&e.callback&&e.callback()}}}var e=r.getAttribute("file-types"),s=e&&e.split(",")||["pdf","xlsx","docx","txt","rtf","csv","exe","key","pps","ppt","pptx","7z","pkg","rar","gz","zip","avi","mov","mp4","mpeg","wmv","midi","mp3","wav","wma"];function i(t){for(var e,i,a=t.target,n="auxclick"==t.type&&2==t.which,r="click"==t.type;a&&(void 0===a.tagName||"a"!=a.tagName.toLowerCase()||!a.href);)a=a.parentNode;a&&a.href&&(e=a.href,i=e.split(".").pop(),s.some(function(t){return t==i}))&&((n||r)&&plausible("File Download",{props:{url:a.href}}),a.target&&!a.target.match(/^_(self|parent|top)$/i)||t.ctrlKey||t.metaKey||t.shiftKey||!r||(setTimeout(function(){o.href=a.href},150),t.preventDefault()))}n.addEventListener("click",i),n.addEventListener("auxclick",i);var a=window.plausible&&window.plausible.q||[];window.plausible=t;for(var l,d=0;d<a.length;d++)t.apply(this,a[d]);function c(){l!==o.pathname&&(l=o.pathname,t("pageview"))}var w,u=window.history;u.pushState&&(w=u.pushState,u.pushState=function(){w.apply(this,arguments),c()},window.addEventListener("popstate",c)),"prerender"===n.visibilityState?n.addEventListener("visibilitychange",function(){l||"visible"!==n.visibilityState||c()}):c()}();