import{O as r}from"./vue-vendor-ByoO1CXK.js";/**
 * @license @tabler/icons-vue v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var s={outline:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"},filled:{xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"currentColor",stroke:"none"}};/**
 * @license @tabler/icons-vue v3.34.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */const m=(t,a,f,h)=>({color:o="currentColor",size:l=24,stroke:w=2,title:i,class:g,...c},{attrs:d,slots:n})=>{let e=[...h.map(u=>r(...u)),...n.default?[n.default()]:[]];return i&&(e=[r("title",i),...e]),r("svg",{...s[t],width:l,height:l,...d,class:["tabler-icon",`tabler-icon-${a}`],...t==="filled"?{fill:o}:{"stroke-width":w??s[t]["stroke-width"],stroke:o},...c},e)};export{m as c};
