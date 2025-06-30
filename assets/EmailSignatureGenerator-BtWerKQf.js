import{N as j,r as p,X as B,o as G,w as y,c as V,x as s,e as t,O as n,B as g,f as O,d as k,A as S,t as I,l as $,a7 as P,h as F}from"./vue-vendor-Cz_6vv8x.js";import{c as A,g as z,z as J,x as u,f as U,y as M,a as h}from"./primevue-mN0ou_16.js";const K={class:"w-full"},X={class:"bg-gray-100 py-2 px-4 rounded-md shadow-sm mb-6"},q={class:"text-sm","aria-label":"Miga de pan"},Q={class:"list-none p-0 inline-flex space-x-2"},W={class:"flex items-center"},Y={class:"min-h-screen bg-surface-ground py-6"},Z={class:"container mx-auto px-4 sm:px-6 lg:px-8"},_={class:"grid grid-cols-1 lg:grid-cols-2 gap-8"},ee={class:"space-y-6"},le={class:"text-xs text-surface-600 mt-1"},te={class:"space-y-4"},oe={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},ie={class:"md:col-span-2"},se={class:"space-y-4"},ae={class:"grid grid-cols-1 md:grid-cols-2 gap-4"},ne={class:"space-y-4"},re={class:"grid grid-cols-1 md:grid-cols-3 gap-4"},de={class:"space-y-4"},ue={class:"space-y-4"},me={class:"grid grid-cols-1 md:grid-cols-3 gap-4"},pe={class:"text-xs text-surface-600"},ve={class:"flex items-center justify-between"},ce={class:"flex space-x-2"},ge={class:"space-y-4"},be={key:0,class:"bg-surface-100 p-4 rounded-lg"},fe=["innerHTML"],xe={key:1},Ve=j({__name:"EmailSignatureGenerator",setup(ye){const T=[{label:"Clásica",value:"classic",preview:"Firma clásica con información básica"},{label:"Moderno",value:"modern",preview:"Diseño moderno con iconos"},{label:"Minimalista",value:"minimalist",preview:"Diseño limpio y simple"},{label:"Corporativo",value:"corporate",preview:"Estilo profesional empresarial"}],i=p({name:localStorage.getItem("signature-name")||"",title:localStorage.getItem("signature-title")||"",company:localStorage.getItem("signature-company")||"",email:localStorage.getItem("signature-email")||"",phone:localStorage.getItem("signature-phone")||"",mobile:localStorage.getItem("signature-mobile")||"",website:localStorage.getItem("signature-website")||"",address:localStorage.getItem("signature-address")||"",linkedin:localStorage.getItem("signature-linkedin")||"",twitter:localStorage.getItem("signature-twitter")||"",github:localStorage.getItem("signature-github")||"",logo:localStorage.getItem("signature-logo")||""}),b=p(T[0]),a=p(localStorage.getItem("signature-primary-color")||"#2563eb"),d=p(localStorage.getItem("signature-secondary-color")||"#64748b"),r=p(Number(localStorage.getItem("signature-font-size"))||14),v=p(!0),c=p(!1),f=B(()=>{const l=i.value;switch(b.value.value){case"classic":return C(l);case"modern":return L(l);case"minimalist":return E(l);case"corporate":return H(l);default:return C(l)}}),C=l=>`
<table style="border-collapse: collapse; font-family: Arial, sans-serif; font-size: ${r.value}px; color: ${d.value}; max-width: 500px;">
  <tr>
    <td style="padding: 0;">
      <div style="border-left: 4px solid ${a.value}; padding-left: 15px;">
        <div style="font-size: ${r.value+4}px; font-weight: bold; color: ${a.value}; margin-bottom: 5px;">
          ${l.name||"Tu Nombre"}
        </div>
        <div style="margin-bottom: 3px;">
          ${l.title||"Tu Cargo"}
        </div>
        <div style="margin-bottom: 3px;">
          ${l.company||"Tu Empresa"}
        </div>
        <div style="margin-top: 10px;">
          <div style="margin-bottom: 2px;">
            📧 <a href="mailto:${l.email}" style="color: ${a.value}; text-decoration: none;">${l.email||"tu@email.com"}</a>
          </div>
          ${l.phone?`<div style="margin-bottom: 2px;">📞 ${l.phone}</div>`:""}
          ${l.mobile?`<div style="margin-bottom: 2px;">📱 ${l.mobile}</div>`:""}
          ${l.website?`<div style="margin-bottom: 2px;">🌐 <a href="${l.website}" style="color: ${a.value}; text-decoration: none;">${l.website}</a></div>`:""}
        </div>
      </div>
    </td>
  </tr>
</table>`,L=l=>`
<table style="border-collapse: collapse; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: ${r.value}px; color: ${d.value}; max-width: 500px;">
  <tr>
    <td style="padding: 0;">
      <div style="background: linear-gradient(135deg, ${a.value}20, ${d.value}10); padding: 20px; border-radius: 8px; border-left: 4px solid ${a.value};">
        <div style="display: flex; align-items: center; margin-bottom: 15px;">
          ${l.logo?`<img src="${l.logo}" alt="Logo" style="width: 50px; height: 50px; margin-right: 15px; border-radius: 50%;">`:""}
          <div>
            <div style="font-size: ${r.value+6}px; font-weight: 600; color: ${a.value}; margin-bottom: 3px;">
              ${l.name||"Tu Nombre"}
            </div>
            <div style="font-size: ${r.value-1}px; color: ${d.value};">
              ${l.title||"Tu Cargo"}
            </div>
          </div>
        </div>
        <div style="margin-bottom: 10px; font-weight: 500;">
          ${l.company||"Tu Empresa"}
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; font-size: ${r.value-1}px;">
          <div>📧 <a href="mailto:${l.email}" style="color: ${a.value}; text-decoration: none;">${l.email||"tu@email.com"}</a></div>
          ${l.phone?`<div>📞 ${l.phone}</div>`:""}
          ${l.mobile?`<div>📱 ${l.mobile}</div>`:""}
          ${l.website?`<div>🌐 <a href="${l.website}" style="color: ${a.value}; text-decoration: none;">${l.website}</a></div>`:""}
        </div>
        ${l.linkedin||l.twitter||l.github?`
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid ${d.value}30;">
          <div style="display: flex; gap: 15px;">
            ${l.linkedin?`<a href="${l.linkedin}" style="color: ${a.value}; text-decoration: none;">🔗 LinkedIn</a>`:""}
            ${l.twitter?`<a href="${l.twitter}" style="color: ${a.value}; text-decoration: none;">🐦 Twitter</a>`:""}
            ${l.github?`<a href="${l.github}" style="color: ${a.value}; text-decoration: none;">💻 GitHub</a>`:""}
          </div>
        </div>`:""}
      </div>
    </td>
  </tr>
</table>`,E=l=>`
<table style="border-collapse: collapse; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: ${r.value}px; color: ${d.value}; max-width: 400px;">
  <tr>
    <td style="padding: 0;">
      <div style="padding: 15px 0;">
        <div style="font-size: ${r.value+2}px; font-weight: 500; color: ${a.value}; margin-bottom: 8px;">
          ${l.name||"Tu Nombre"}
        </div>
        <div style="margin-bottom: 5px; font-size: ${r.value-1}px;">
          ${l.title||"Tu Cargo"}
        </div>
        <div style="margin-bottom: 15px; font-size: ${r.value-1}px;">
          ${l.company||"Tu Empresa"}
        </div>
        <div style="font-size: ${r.value-1}px; line-height: 1.6;">
          <div>${l.email||"tu@email.com"}</div>
          ${l.phone?`<div>${l.phone}</div>`:""}
          ${l.website?`<div>${l.website}</div>`:""}
        </div>
      </div>
    </td>
  </tr>
</table>`,H=l=>`
<table style="border-collapse: collapse; font-family: 'Times New Roman', serif; font-size: ${r.value}px; color: ${d.value}; max-width: 600px;">
  <tr>
    <td style="padding: 0;">
      <div style="border: 2px solid ${a.value}; padding: 20px; background-color: #fafafa;">
        <div style="display: flex; align-items: center; margin-bottom: 20px;">
          ${l.logo?`<img src="${l.logo}" alt="Logo" style="width: 60px; height: 60px; margin-right: 20px;">`:""}
          <div>
            <div style="font-size: ${r.value+4}px; font-weight: bold; color: ${a.value}; margin-bottom: 5px;">
              ${l.name||"Tu Nombre"}
            </div>
            <div style="font-size: ${r.value}px; font-weight: bold; margin-bottom: 3px;">
              ${l.title||"Tu Cargo"}
            </div>
            <div style="font-size: ${r.value}px; color: ${a.value};">
              ${l.company||"Tu Empresa"}
            </div>
          </div>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-size: ${r.value-1}px;">
          <div>
            <strong>Email:</strong><br>
            <a href="mailto:${l.email}" style="color: ${a.value}; text-decoration: none;">${l.email||"tu@email.com"}</a>
          </div>
          ${l.phone?`<div>
            <strong>Teléfono:</strong><br>
            ${l.phone}
          </div>`:""}
          ${l.mobile?`<div>
            <strong>Móvil:</strong><br>
            ${l.mobile}
          </div>`:""}
          ${l.website?`<div>
            <strong>Sitio web:</strong><br>
            <a href="${l.website}" style="color: ${a.value}; text-decoration: none;">${l.website}</a>
          </div>`:""}
        </div>
        ${l.address?`
        <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid ${d.value}30;">
          <strong>Dirección:</strong><br>
          ${l.address}
        </div>`:""}
      </div>
    </td>
  </tr>
</table>`,N=async()=>{try{await navigator.clipboard.writeText(f.value),c.value=!0,setTimeout(()=>{c.value=!1},2e3)}catch(l){console.error("Error copying to clipboard:",l)}},D=()=>{const l=new Blob([f.value],{type:"text/html"}),e=URL.createObjectURL(l),m=document.createElement("a");m.href=e,m.download="firma-email.html",document.body.appendChild(m),m.click(),document.body.removeChild(m),URL.revokeObjectURL(e)},R=()=>{v.value=!v.value},x=()=>{Object.entries(i.value).forEach(([l,e])=>{e?localStorage.setItem(`signature-${l}`,e):localStorage.removeItem(`signature-${l}`)}),localStorage.setItem("signature-primary-color",a.value),localStorage.setItem("signature-secondary-color",d.value),localStorage.setItem("signature-font-size",r.value.toString())};return G(()=>{Object.keys(i.value).forEach(l=>{const e=l;y(()=>i.value[e],x)}),y(a,x),y(d,x),y(r,x)}),(l,e)=>{const m=O("router-link"),w=F("tooltip");return k(),V("div",K,[s(n(A)),t("div",X,[t("nav",q,[t("ol",Q,[t("li",W,[s(m,{to:"/",class:"text-blue-500 hover:text-blue-700"},{default:g(()=>e[16]||(e[16]=[t("i",{class:"inline-block w-4 h-4 mr-1 align-text-bottom"},null,-1),S(" Herramientas ")])),_:1,__:[16]})]),e[17]||(e[17]=t("li",null,[t("i",{class:"inline-block w-4 h-4 text-gray-400 align-text-bottom"})],-1)),e[18]||(e[18]=t("li",{class:"text-gray-700"},"Generador de Firmas de Email",-1))])])]),t("div",Y,[t("div",Z,[e[43]||(e[43]=t("header",{class:"text-center mb-8"},[t("h1",{class:"text-4xl font-extrabold text-primary-700 mb-2"}," ✉️ Generador de Firmas de Email "),t("p",{class:"text-xl text-surface-600"}," Crea firmas de correo electrónico profesionales en HTML. ")],-1)),t("div",_,[s(n(z),null,{title:g(()=>e[19]||(e[19]=[t("div",{class:"flex items-center"},[t("i",{class:"pi pi-cog mr-2"}),S(" Configuración ")],-1)])),content:g(()=>[t("div",ee,[t("div",null,[e[20]||(e[20]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Plantilla ",-1)),s(n(J),{modelValue:b.value,"onUpdate:modelValue":e[0]||(e[0]=o=>b.value=o),options:T,"option-label":"label",placeholder:"Selecciona una plantilla",class:"w-full"},null,8,["modelValue"]),t("p",le,I(b.value.preview),1)]),t("div",te,[e[24]||(e[24]=t("h4",{class:"font-medium text-surface-700"}," Información personal ",-1)),t("div",oe,[t("div",null,[e[21]||(e[21]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Nombre completo ",-1)),s(n(u),{modelValue:i.value.name,"onUpdate:modelValue":e[1]||(e[1]=o=>i.value.name=o),class:"w-full",placeholder:"Juan Pérez"},null,8,["modelValue"])]),t("div",null,[e[22]||(e[22]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Cargo ",-1)),s(n(u),{modelValue:i.value.title,"onUpdate:modelValue":e[2]||(e[2]=o=>i.value.title=o),class:"w-full",placeholder:"Desarrollador Senior"},null,8,["modelValue"])]),t("div",ie,[e[23]||(e[23]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Empresa ",-1)),s(n(u),{modelValue:i.value.company,"onUpdate:modelValue":e[3]||(e[3]=o=>i.value.company=o),class:"w-full",placeholder:"Mi Empresa S.A."},null,8,["modelValue"])])])]),t("div",se,[e[29]||(e[29]=t("h4",{class:"font-medium text-surface-700"}," Información de contacto ",-1)),t("div",ae,[t("div",null,[e[25]||(e[25]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Email ",-1)),s(n(u),{modelValue:i.value.email,"onUpdate:modelValue":e[4]||(e[4]=o=>i.value.email=o),class:"w-full",type:"email",placeholder:"juan.perez@empresa.com"},null,8,["modelValue"])]),t("div",null,[e[26]||(e[26]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Teléfono ",-1)),s(n(u),{modelValue:i.value.phone,"onUpdate:modelValue":e[5]||(e[5]=o=>i.value.phone=o),class:"w-full",placeholder:"+57 1 234 5678"},null,8,["modelValue"])]),t("div",null,[e[27]||(e[27]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Móvil ",-1)),s(n(u),{modelValue:i.value.mobile,"onUpdate:modelValue":e[6]||(e[6]=o=>i.value.mobile=o),class:"w-full",placeholder:"+57 300 123 4567"},null,8,["modelValue"])]),t("div",null,[e[28]||(e[28]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Sitio web ",-1)),s(n(u),{modelValue:i.value.website,"onUpdate:modelValue":e[7]||(e[7]=o=>i.value.website=o),class:"w-full",placeholder:"https://www.misitio.com"},null,8,["modelValue"])])])]),t("div",ne,[e[33]||(e[33]=t("h4",{class:"font-medium text-surface-700"},"Redes sociales",-1)),t("div",re,[t("div",null,[e[30]||(e[30]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," LinkedIn ",-1)),s(n(u),{modelValue:i.value.linkedin,"onUpdate:modelValue":e[8]||(e[8]=o=>i.value.linkedin=o),class:"w-full",placeholder:"https://linkedin.com/in/usuario"},null,8,["modelValue"])]),t("div",null,[e[31]||(e[31]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Twitter ",-1)),s(n(u),{modelValue:i.value.twitter,"onUpdate:modelValue":e[9]||(e[9]=o=>i.value.twitter=o),class:"w-full",placeholder:"https://twitter.com/usuario"},null,8,["modelValue"])]),t("div",null,[e[32]||(e[32]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," GitHub ",-1)),s(n(u),{modelValue:i.value.github,"onUpdate:modelValue":e[10]||(e[10]=o=>i.value.github=o),class:"w-full",placeholder:"https://github.com/usuario"},null,8,["modelValue"])])])]),t("div",de,[e[36]||(e[36]=t("h4",{class:"font-medium text-surface-700"}," Información adicional ",-1)),t("div",null,[e[34]||(e[34]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," URL del logo ",-1)),s(n(u),{modelValue:i.value.logo,"onUpdate:modelValue":e[11]||(e[11]=o=>i.value.logo=o),class:"w-full",placeholder:"https://ejemplo.com/logo.png"},null,8,["modelValue"])]),t("div",null,[e[35]||(e[35]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Dirección ",-1)),s(n(U),{modelValue:i.value.address,"onUpdate:modelValue":e[12]||(e[12]=o=>i.value.address=o),class:"w-full",rows:3,placeholder:"Calle 123 # 45-67, Bogotá, Colombia"},null,8,["modelValue"])])]),t("div",ue,[e[40]||(e[40]=t("h4",{class:"font-medium text-surface-700"},"Personalización",-1)),t("div",me,[t("div",null,[e[37]||(e[37]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Color primario ",-1)),s(n(M),{modelValue:a.value,"onUpdate:modelValue":e[13]||(e[13]=o=>a.value=o)},null,8,["modelValue"])]),t("div",null,[e[38]||(e[38]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Color secundario ",-1)),s(n(M),{modelValue:d.value,"onUpdate:modelValue":e[14]||(e[14]=o=>d.value=o)},null,8,["modelValue"])]),t("div",null,[e[39]||(e[39]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Tamaño de fuente ",-1)),$(t("input",{"onUpdate:modelValue":e[15]||(e[15]=o=>r.value=o),type:"range",min:"10",max:"20",class:"w-full"},null,512),[[P,r.value]]),t("span",pe,I(r.value)+"px",1)])])])])]),_:1}),s(n(z),null,{title:g(()=>[t("div",ve,[e[41]||(e[41]=t("div",{class:"flex items-center"},[t("i",{class:"pi pi-eye mr-2"}),S(" Vista previa ")],-1)),t("div",ce,[$(s(n(h),{onClick:R,size:"small",severity:"secondary",icon:v.value?"pi pi-eye-slash":"pi pi-eye"},null,8,["icon"]),[[w,v.value?"Ocultar HTML":"Mostrar HTML",void 0,{top:!0}]]),$(s(n(h),{onClick:N,size:"small",severity:c.value?"success":"secondary",icon:c.value?"pi pi-check":"pi pi-copy"},null,8,["severity","icon"]),[[w,c.value?"Copiado!":"Copiar HTML",void 0,{top:!0}]]),$(s(n(h),{onClick:D,size:"small",severity:"info",icon:"pi pi-download"},null,512),[[w,"Descargar HTML",void 0,{top:!0}]])])])]),content:g(()=>[t("div",ge,[v.value?(k(),V("div",be,[t("div",{innerHTML:f.value},null,8,fe)])):(k(),V("div",xe,[e[42]||(e[42]=t("label",{class:"block text-sm font-medium text-surface-700 mb-2"}," Código HTML ",-1)),s(n(U),{"model-value":f.value,class:"w-full font-mono text-sm",rows:20,readonly:""},null,8,["model-value"])]))])]),_:1})])])])])}}});export{Ve as default};
