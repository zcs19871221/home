var T=Object.defineProperty;var B=(s,t,r)=>t in s?T(s,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[t]=r;var x=(s,t,r)=>(B(s,typeof t!="symbol"?t+"":t,r),r);import{m as p,u as A,r as f,j as e,I as $,c as L,a as z,b as R,F as m,d as y,T as M,e as D,f as V,E as q,D as H,M as C,g as U,S as W,h as v,C as G,B as K,i as J,k as Q,l as X,R as Y,n as Z,o as ee,p as se,q as te,L as k,H as ae,s as _,t as re,v as ne,w as I,x as le,y as oe,z as P}from"./vendor-D9ooQo9U.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const l of n.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&o(l)}).observe(document,{childList:!0,subtree:!0});function r(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(a){if(a.ep)return;a.ep=!0;const n=r(a);fetch(a.href,n)}})();const ie="modulepreload",ce=function(s){return"/"+s},O={},E=function(t,r,o){let a=Promise.resolve();if(r&&r.length>0){const n=document.getElementsByTagName("link");a=Promise.all(r.map(l=>{if(l=ce(l),l in O)return;O[l]=!0;const u=l.endsWith(".css"),d=u?'[rel="stylesheet"]':"";if(!!o)for(let h=n.length-1;h>=0;h--){const j=n[h];if(j.href===l&&(!u||j.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${l}"]${d}`))return;const c=document.createElement("link");if(c.rel=u?"stylesheet":ie,u||(c.as="script",c.crossOrigin=""),c.href=l,document.head.appendChild(c),u)return new Promise((h,j)=>{c.addEventListener("load",h),c.addEventListener("error",()=>j(new Error(`Unable to preload CSS for ${l}`)))})}))}return a.then(()=>t()).catch(n=>{const l=new Event("vite:preloadError",{cancelable:!0});if(l.payload=n,window.dispatchEvent(l),!l.defaultPrevented)throw n})},F="http://localhost:9981/api",S=async(s,t,r)=>{try{const o=await window.fetch(`${F}${s}`,{method:t,...r&&{body:typeof r=="string"?r:JSON.stringify(r)},headers:{"Content-Type":"application/json"}}),a=await o.json();if(o.status!==200)throw new Error(a==null?void 0:a.data);return a.data}catch(o){throw p.error(o==null?void 0:o.message),o}},ke=s=>fetch(s,{method:"GET"}).then(t=>t.text()).then(t=>t.replace(/\[1m/g,"").replace(/\\x1B/g,"").replace(/\[22m/g,"").replace(/\[32m/g,"").replace(/\[33m/g,"").replace(/\[39m/g,"").replace(//g,"").replace(/(\x00)+/g,`
`)),de=(s,t={})=>A(s?`${F}/${s.startsWith("/")?s.slice(1):s}`:void 0,{revalidateIfStale:!1,revalidateOnMount:!0,revalidateOnFocus:!1,revalidateOnReconnect:!1,...t});async function ue(s){switch(s){case"zh-cn":return(await E(()=>import("./zh-cn-1g_AHQ2i.js"),__vite__mapDeps([]))).default;case"en-us":return(await E(()=>import("./en-us-4z8Y_dfN.js"),__vite__mapDeps([]))).default;default:{const t=s;throw new Error(t)}}}const N=f.createContext(void 0);function me(){const s=f.useContext(N);if(s===void 0)throw new Error("useLocale must be used within the LocaleProvider context");return s}class fe{constructor(){x(this,"currentLocale",null);x(this,"cache",z());x(this,"currentIntl",L({locale:"zh-cn",messages:{}},this.cache));x(this,"currentMessages",null)}get locale(){return this.currentLocale}get intl(){return this.currentIntl}get messages(){return this.currentMessages}update(t,r){this.currentIntl=L({locale:t,messages:r},this.cache),this.currentLocale=t,this.currentMessages=r}}const g=new fe;function he({children:s,fallback:t,defaultLocale:r}){const[o,a]=f.useState(null),[n,l]=f.useState(r);f.useLayoutEffect(()=>{async function d(){const i=await ue(n);g.update(n,i),a(i),document.documentElement.lang=n}d()},[n]);const u=f.useMemo(()=>({locale:n,setLocale:l}),[n]);return e.jsx(N.Provider,{value:u,children:o?e.jsx($,{locale:n,messages:o,children:s}):t})}const w="/processStatus",ge=()=>[{dataIndex:"name",title:g.intl.formatMessage({id:"key0046",defaultMessage:"日志状态名称"})},{dataIndex:"label",title:g.intl.formatMessage({id:"key0047",defaultMessage:"日志状态标签"}),render:(s,t)=>e.jsx("span",{style:{color:t.color},children:s})},{dataIndex:"matchers",title:g.intl.formatMessage({id:"key0048",defaultMessage:"日志状态匹配规则"}),render:s=>e.jsx(e.Fragment,{children:s.map(t=>e.jsx("div",{children:t}))})},{dataIndex:"clear",title:g.intl.formatMessage({id:"key0049",defaultMessage:"当前状态是否清除之前日志"}),render:s=>s?g.intl.formatMessage({id:"key0018",defaultMessage:"清除日志"}):g.intl.formatMessage({id:"key0050",defaultMessage:"不清除日志"})}];function xe(){const s=R(),{data:t,mutate:r,isLoading:o}=de(w),[a]=m.useForm(),[n,l]=f.useState(!1),u=ge();return e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-center items-center h-8 ",children:[e.jsx("h2",{className:"mr-auto",children:e.jsx(y,{id:"key0051",defaultMessage:"日志状态管理"})}),e.jsx(M,{title:s.formatMessage({id:"key0052",defaultMessage:"增加日志状态"}),placement:"leftBottom",children:e.jsx(D,{onClick:()=>{a.resetFields(),l(!0)}})})]}),t!==void 0&&e.jsx(V,{rowKey:"id",dataSource:t,loading:o,pagination:!1,columns:[...u,{title:s.formatMessage({id:"key0024",defaultMessage:"操作"}),render:(d,i)=>e.jsxs("div",{className:"space-x-5",children:[e.jsx(M,{title:s.formatMessage({id:"key0032",defaultMessage:"编辑项目"}),children:e.jsx(q,{onClick:()=>{a.setFieldsValue(i),l(!0)}})}),e.jsx(M,{title:s.formatMessage({id:"key0053",defaultMessage:"删除日志状态配置"}),children:e.jsx(H,{onClick:()=>{C.confirm({title:s.formatMessage({id:"key0034",defaultMessage:"是否删除?"}),icon:e.jsx(U,{}),onOk(){S(`${w}/${i.id}`,"DELETE").then(()=>{p.success(s.formatMessage({id:"key0027",defaultMessage:"删除成功"})),r()})}})}})})]})}]}),e.jsxs(C,{open:n,title:a.getFieldValue("id")===void 0?s.formatMessage({id:"key0036",defaultMessage:"新建项目"}):s.formatMessage({id:"key0032",defaultMessage:"编辑项目"}),okButtonProps:{autoFocus:!0,htmlType:"submit"},onCancel:()=>l(!1),destroyOnClose:!0,modalRender:d=>e.jsx(m,{layout:"vertical",form:a,name:"form_in_modal",onFinish:i=>{const c=a.getFieldValue("id");S(w,c?"PUT":"POST",{...i,id:c}).then(()=>{p.success(s.formatMessage({id:"key0037",defaultMessage:"操作成功"})),l(!1),r()})},children:d}),children:[e.jsx(m.Item,{name:"matchers",label:s.formatMessage({id:"key0054",defaultMessage:"匹配规则"}),rules:[{required:!0,message:s.formatMessage({id:"key0039",defaultMessage:"文件夹地址不能为空"}),validator:(d,i)=>{try{return new RegExp(i),Promise.resolve()}catch{return Promise.reject(new Error(s.formatMessage({id:"key0055",defaultMessage:"不是有效的正则表达式"})))}}}],children:e.jsx(m.List,{name:"matchers",children:(d,i)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",rowGap:16},children:[d.map((c,h)=>e.jsxs(W,{children:[e.jsx(m.Item,{noStyle:!0,name:h,children:e.jsx(v,{placeholder:"first"})}),e.jsx(G,{onClick:()=>{i.remove(c.name)}})]},c.key)),e.jsx(K,{type:"dashed",onClick:()=>i.add(),block:!0,children:"+ Add Sub Item"})]})})}),e.jsx(m.Item,{name:"name",label:s.formatMessage({id:"key0056",defaultMessage:"名称"}),children:e.jsx(v,{})}),e.jsx(m.Item,{name:"label",label:s.formatMessage({id:"key0057",defaultMessage:"标签名"}),children:e.jsx(v,{})}),e.jsx(m.Item,{name:"color",label:s.formatMessage({id:"key0058",defaultMessage:"标签颜色"}),getValueFromEvent:d=>d.toHexString(),children:e.jsx(J,{})}),e.jsx(m.Item,{name:"clear",label:s.formatMessage({id:"key0059",defaultMessage:"是否清除之前日志"}),valuePropName:"checked",children:e.jsx(Q,{})})]})]})}const{Option:b}=_,je=s=>fetch(s).then(t=>t.json().then(r=>r.data)),ye=f.lazy(()=>E(()=>import("./index-WaX7pA9L.js"),__vite__mapDeps([0,1,2]))),pe=()=>{const s=R(),t=ee(),{locale:r,setLocale:o}=me();return e.jsx(se,{value:{fetcher:je,revalidateOnFocus:!0,revalidateOnMount:!0,revalidateOnReconnect:!0,revalidateIfStale:!1},children:e.jsx(te,{locale:{locale:"en-us"},theme:{token:{colorPrimary:"#7939cb",borderRadius:2,fontSize:16}},children:e.jsxs(k,{style:{minHeight:"100vh"},children:[e.jsxs(ae,{className:"text-white flex items-center",children:[e.jsx("div",{children:e.jsx(y,{id:"key0002",defaultMessage:"前端管理系统"})}),e.jsx("div",{className:"ml-auto cursor-pointer",onClick:()=>{S("/system/shutdown","PUT").then(()=>{p.success(s.formatMessage({id:"key0003",defaultMessage:"后台服务关闭成功"}))})},children:e.jsx(y,{id:"key0004",defaultMessage:"关闭系统"})}),e.jsxs(_,{onChange:o,value:r,className:"ml-5 w-28",children:[e.jsx(b,{value:"en-us",children:"English"}),e.jsx(b,{value:"zh-cn",children:e.jsx(y,{id:"key0044",defaultMessage:"中文"})})]})]}),e.jsxs(k,{children:[e.jsx(re,{children:e.jsx(ne,{mode:"inline",onClick:a=>{t(a.key)},items:[{key:"processes",label:s.formatMessage({id:"key0006",defaultMessage:"服务"}),icon:e.jsx(I,{})},{key:"logStatus",label:s.formatMessage({id:"key0045",defaultMessage:"日志状态"}),icon:e.jsx(I,{})}]})}),e.jsx(k,{children:e.jsx(le,{children:e.jsx(f.Suspense,{fallback:e.jsx("div",{children:"loading"}),children:e.jsx("div",{className:"ml-4 mr-4",children:e.jsxs(oe,{children:[e.jsx(P,{path:"/processes",element:e.jsx(ye,{})}),e.jsx(P,{path:"/logStatus",element:e.jsx(xe,{})})]})})})})})]})]})})})};X(document.getElementById("root")).render(e.jsx(Y.StrictMode,{children:e.jsx(Z,{children:e.jsx(he,{defaultLocale:"zh-cn",children:e.jsx(pe,{})})})}));export{ke as a,F as b,ge as c,g as i,S as j,w as s,de as u};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-WaX7pA9L.js","assets/vendor-D9ooQo9U.js","assets/index-ubpXYuuh.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
