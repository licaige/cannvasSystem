var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,n=Object.getOwnPropertySymbols,r=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,l=(t,a,n)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[a]=n,i=(e,t)=>{for(var a in t||(t={}))r.call(t,a)&&l(e,a,t[a]);if(n)for(var a of n(t))o.call(t,a)&&l(e,a,t[a]);return e};import{p as c,g as s,e as d,f as p,o as h,c as u,h as m}from"./vendor.6780e994.js";c("data-v-1093a0ba");const f={class:"lignth-box"},v=m("button",null,"点击绘制折线",-1),b=m("svg",{viewBox:"-50 -450 1000 500",id:"chart"},null,-1);s();const x={setup(e){function n(e,t={}){let a=document.createElementNS("http://www.w3.org/2000/svg",e);return Object.entries(t).forEach((([e,t])=>{a.setAttribute(e,t)})),a}let r={"font-size":"12px",color:"black"};let o=[{name:"x1",val:100},{name:"x2",val:200},{name:"x3",val:250},{name:"x4",val:200},{name:"x5",val:200},{name:"x6",val:200},{name:"x7",val:250},{name:"x8",val:200},{name:"x9",val:200}];function l(){let e=document.querySelector("#chart");const l=n("g",{id:"polyline"});let c=[],s=["M 0 0"];o.forEach(((e,o)=>{let l=100*o,d=-e.val,p=n("g",{class:"item"}),h=n("circle",{r:5,cx:l,cy:d,fill:"white",stroke:"blue","stroke-width":3}),u=n("text",(m=i({x:l,y:d-10},r),t(m,a({color:"red"}))));var m;u.textContent=`${e.name} ${e.val}`,p.appendChild(u),p.appendChild(h),c=c.concat(p),s=s.concat(`L ${l} ${d}`)}));let d=n("path",{id:"line","stroke-width":2,stroke:"pink",fill:"none",d:s.join(",")});l.appendChild(d),c.forEach((e=>{l.appendChild(e)})),e.appendChild(l)}function c(){let e=document.getElementById("line"),t=e.getTotalLength();e.setAttribute("stroke-dasharray",t),e.setAttribute("stroke-dashoffset",t);let a=t,n=0;n=requestAnimationFrame((function t(r){a<=0?cancelAnimationFrame(n):(a-=10,e.setAttribute("stroke-dashoffset",a),n=requestAnimationFrame(t))}))}return d((()=>{l(),function(){const e=document.querySelector("#chart"),{width:t,height:a}=e.viewBox.baseVal,o=n("g",{id:"coor"});let l=n("path",{d:"M 0 0, h 800, M 0 0, v -400",stroke:"black"});const c=Array.from({length:(t-150)/100},((e,t)=>{let a=100*(t+1),l=n("text",i({x:a-10,y:15},r));return l.textContent=a,o.appendChild(l),`M ${a} 0, v -5`})).join(","),s=Array.from({length:(a-150)/100},((e,t)=>{let a=100*(t+1),l=-a,c=n("text",i({x:-26,y:l+3},r));return c.textContent=a,o.appendChild(c),`M 0 ${l}, h 5`})).join(",");let d=n("path",{d:`${c}`,stroke:"black"}),p=n("path",{d:`${s}`,stroke:"black"});o.appendChild(l),o.appendChild(d),o.appendChild(p),e.appendChild(o)}(),c()})),p((()=>{})),(e,t)=>(h(),u("div",f,[m("div",{class:"form",onClick:c},[v]),b]))},__scopeId:"data-v-1093a0ba"};export{x as default};
