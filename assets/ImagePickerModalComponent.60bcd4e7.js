import{o as l,c as n,a as s,F as m,i as g}from"./index.1128caf2.js";const p={class:"modal-content shadow-2xl bg-gradient-to-r from-[#000] to-[#555] rounded w-4/5 max-w-[500px] absolute top-[25%] left-[25%] p-[20px]"},u={class:"text-white mb-8 flex flex-row items-between justify-between w-100"},w=s("h2",null,"Select an image",-1),f={class:"grid gap-4 sm:gap-8 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"},_=["src","onClick"],C={__name:"ImagePickerModalComponent",props:["imageUrls"],emits:["selectImage"],setup(a,{emit:i}){const r=a,c=o=>{const e=o.slice(o.lastIndexOf(".")+1);if(e.toLowerCase()=="jpg"||e.toLowerCase()=="png"||e.toLowerCase()=="gif"||e.toLowerCase()=="jpeg")i("selectImage",o);else return!1};return(o,e)=>(l(),n("div",null,[s("button",{onClick:e[0]||(e[0]=t=>o.showModal=!0)},"Select an image"),s("div",null,[s("div",p,[s("div",u,[w,s("span",{class:"close-button cursor-pointer",onClick:e[1]||(e[1]=t=>o.$emit("closeModal"))},"\xD7")]),s("div",null,[s("ul",f,[(l(!0),n(m,null,g(r.imageUrls,(t,d)=>(l(),n("li",{key:d},[s("img",{class:"cursor-pointer w-[20vw]",src:t,onClick:x=>c(t)},null,8,_)]))),128))])])])])]))}};export{C as _};
