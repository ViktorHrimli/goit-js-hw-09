const t={buttonsStart:document.querySelector("button[data-start]"),buttonsStop:document.querySelector("button[data-stop]")};let o=null;function n(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}t.buttonsStart.addEventListener("click",(function(){t.buttonsStart.disabled=!0,t.buttonsStart.style.backgroundColor="grey",t.buttonsStop.style.backgroundColor="red",document.body.style.background=n(),o=setInterval((()=>{document.body.style.background=n()}),1e3)})),t.buttonsStop.addEventListener("click",(function(){t.buttonsStart.disabled=!1,t.buttonsStart.style.backgroundColor="green",t.buttonsStop.style.backgroundColor="grey",clearInterval(o)}));
//# sourceMappingURL=01-color-switcher.aa950a7d.js.map
