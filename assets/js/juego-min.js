const miModulo=(()=>{"use strict";let e=[],t=["C","D","H","S"],l=["A","J","Q","K"],r=[],a=document.querySelector("#btnPedir"),n=document.querySelector("#btnDetener"),d=document.querySelector("#btnNuevo"),s=document.querySelectorAll(".divCartas"),o=document.querySelectorAll("small"),i=(t=2)=>{e=c(),r=[];for(let l=0;l<t;l++)r.push(0);o.forEach(e=>e.innerText=0),s.forEach(e=>e.innerHTML=""),n.disabled=!1,a.disabled=!1},c=()=>{e=[];for(let r=2;r<=10;r++)for(let a of t)e.push(r+a);for(let n of t)for(let d of l)e.push(d+n);return _.shuffle(e)},u=()=>{if(0===e.length)throw"No hay cartas en el deck";return e.pop()},$=e=>{let t=e.substring(0,e.length-1),l;return isNaN(t)?"A"===t?11:10:1*t},f=(e,t)=>(r[t]=r[t]+$(e),o[t].innerText=r[t],r[t]),h=(e,t)=>{let l=document.createElement("img");l.src=`assets/cartas/${e}.png`,l.classList.add("carta"),s[t].append(l)},b=()=>{let[e,t]=r;setTimeout(()=>{t===e?alert("Nadie gana :("):e>21?alert("Computadora gana :("):t>21?alert("Ganaste :)"):alert("Computadora gana")},200)},g=e=>{let t=0;do{let l=u();t=f(l,r.length-1),h(l,r.length-1)}while(e<=21&&t<e);b()};return a.addEventListener("click",()=>{let e=u(),t=f(e,0);h(e,0),t>21?(a.disabled=!0,n.disabled=!0,g(t)):21===t&&(n.disabled=!0,a.disabled=!0,g(t))}),n.addEventListener("click",()=>{n.disabled=!0,a.disabled=!0,g(r[0])}),d.addEventListener("click",()=>{i()}),{nuevoJuego:i}})();