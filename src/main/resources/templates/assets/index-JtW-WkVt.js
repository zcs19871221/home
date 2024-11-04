var B=Object.defineProperty;var D=(s,t,r)=>t in s?B(s,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[t]=r;var p=(s,t,r)=>(D(s,typeof t!="symbol"?t+"":t,r),r);import{m as v,u as $,r as f,j as e,I as V,c as P,a as z,b as _,F as m,t as W,g as q,d as H,e as U,f as G,h as M,T as y,i as K,k as J,E as Y,D as Q,M as I,l as X,S as Z,n as S,C as ee,B as se,o as te,p as ae,q as re,s as ne,R as oe,v as le,w as ie,x as ce,y as de,L,H as ue,z as F,A as me,G as fe,J as O,K as he,N as ge,O as b}from"./vendor-AUb_t5Eg.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))l(a);new MutationObserver(a=>{for(const n of a)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function r(a){const n={};return a.integrity&&(n.integrity=a.integrity),a.referrerPolicy&&(n.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?n.credentials="include":a.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function l(a){if(a.ep)return;a.ep=!0;const n=r(a);fetch(a.href,n)}})();const xe="modulepreload",je=function(s){return"/"+s},k={},E=function(t,r,l){let a=Promise.resolve();if(r&&r.length>0){const n=document.getElementsByTagName("link");a=Promise.all(r.map(o=>{if(o=je(o),o in k)return;k[o]=!0;const d=o.endsWith(".css"),x=d?'[rel="stylesheet"]':"";if(!!l)for(let c=n.length-1;c>=0;c--){const i=n[c];if(i.href===o&&(!d||i.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${x}`))return;const u=document.createElement("link");if(u.rel=d?"stylesheet":xe,d||(u.as="script",u.crossOrigin=""),u.href=o,document.head.appendChild(u),d)return new Promise((c,i)=>{u.addEventListener("load",c),u.addEventListener("error",()=>i(new Error(`Unable to preload CSS for ${o}`)))})}))}return a.then(()=>t()).catch(n=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=n,window.dispatchEvent(o),!o.defaultPrevented)throw n})},T="http://localhost:9981/api",w=async(s,t,r)=>{try{const l=await window.fetch(`${T}${s}`,{method:t,...r&&{body:typeof r=="string"?r:JSON.stringify(r)},headers:{"Content-Type":"application/json"}}),a=await l.json();if(l.status!==200)throw new Error(a==null?void 0:a.data);return a.data}catch(l){throw v.error(l==null?void 0:l.message),l}},be=s=>fetch(s,{method:"GET"}).then(t=>t.text()).then(t=>t.replace(/\[1m/g,"").replace(/\\x1B/g,"").replace(/\[22m/g,"").replace(/\[32m/g,"").replace(/\[33m/g,"").replace(/\[39m/g,"").replace(//g,"").replace(/(\x00)+/g,`
`)),pe=(s,t={})=>$(s?`${T}/${s.startsWith("/")?s.slice(1):s}`:void 0,{revalidateIfStale:!1,revalidateOnMount:!0,revalidateOnFocus:!1,revalidateOnReconnect:!1,...t});async function Me(s){switch(s){case"zh-cn":return(await E(()=>import("./zh-cn-dvsiyqV4.js"),__vite__mapDeps([]))).default;case"en-us":return(await E(()=>import("./en-us-aJY6SYEB.js"),__vite__mapDeps([]))).default;default:{const t=s;throw new Error(t)}}}const N=f.createContext(void 0);function ve(){const s=f.useContext(N);if(s===void 0)throw new Error("useLocale must be used within the LocaleProvider context");return s}class ye{constructor(){p(this,"currentLocale",null);p(this,"cache",z());p(this,"currentIntl",P({locale:"zh-cn",messages:{}},this.cache));p(this,"currentMessages",null)}get locale(){return this.currentLocale}get intl(){return this.currentIntl}get messages(){return this.currentMessages}update(t,r){this.currentIntl=P({locale:t,messages:r},this.cache),this.currentLocale=t,this.currentMessages=r}}const g=new ye;function Se({children:s,fallback:t,defaultLocale:r}){const[l,a]=f.useState(null),[n,o]=f.useState(r);f.useLayoutEffect(()=>{async function x(){const j=await Me(n);g.update(n,j),a(j),document.documentElement.lang=n}x()},[n]);const d=f.useMemo(()=>({locale:n,setLocale:o}),[n]);return e.jsx(N.Provider,{value:d,children:l?e.jsx(V,{locale:n,messages:l,children:s}):t})}const C="/processStatus",Le=()=>[{dataIndex:"name",title:g.intl.formatMessage({id:"LogStatusName",defaultMessage:"日志状态名称"})},{dataIndex:"label",title:g.intl.formatMessage({id:"LogStatusLabel",defaultMessage:"日志状态标签"}),render:(s,t)=>e.jsx("span",{style:{color:t.color},children:s})},{dataIndex:"matchers",title:g.intl.formatMessage({id:"LogStatusMatchingRule",defaultMessage:"日志状态匹配规则"}),render:s=>e.jsx(e.Fragment,{children:s.map(t=>e.jsx("div",{children:t}))})},{dataIndex:"clear",title:g.intl.formatMessage({id:"WhetherToClearThePreviousLogIn_",defaultMessage:"当前状态是否清除之前日志"}),render:s=>s?g.intl.formatMessage({id:"ClearLog",defaultMessage:"清除日志"}):g.intl.formatMessage({id:"DoNotClearTheLog",defaultMessage:"不清除日志"})}];function Ce(){const s=_(),{data:t,mutate:r,isLoading:l}=pe(C),[a]=m.useForm(),[n,o]=f.useState(!1),d=Le(),x=(c=re)=>Object.entries(c).map(([i,h])=>({label:i,colors:h})),{token:j}=W.useToken(),u=x({primary:q(j.colorPrimary),red:H,green:U,blue:G});return e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-center items-center h-8 ",children:[e.jsx("h2",{className:"mr-auto",children:e.jsx(M,{id:"LogStatusManagement",defaultMessage:"日志状态管理"})}),e.jsx(y,{title:s.formatMessage({id:"AddLogStatus",defaultMessage:"增加日志状态"}),placement:"leftBottom",children:e.jsx(K,{onClick:()=>{a.resetFields(),o(!0)}})})]}),t!==void 0&&e.jsx(J,{rowKey:"id",dataSource:t,loading:l,pagination:!1,columns:[...d,{title:s.formatMessage({id:"Operation",defaultMessage:"操作"}),render:(c,i)=>e.jsxs("div",{className:"space-x-5",children:[e.jsx(y,{title:s.formatMessage({id:"EditProject",defaultMessage:"编辑项目"}),children:e.jsx(Y,{onClick:()=>{a.setFieldsValue(i),o(!0)}})}),e.jsx(y,{title:s.formatMessage({id:"DeleteLogStatusConfiguration",defaultMessage:"删除日志状态配置"}),children:e.jsx(Q,{onClick:()=>{I.confirm({title:s.formatMessage({id:"DoYouWantToDeleteTheProject",defaultMessage:"是否删除?"}),icon:e.jsx(X,{}),onOk(){w(`${C}/${i.id}`,"DELETE").then(()=>{v.success(s.formatMessage({id:"DeletedSuccessfully",defaultMessage:"删除成功"})),r()})}})}})})]})}]}),e.jsxs(I,{open:n,title:a.getFieldValue("id")===void 0?s.formatMessage({id:"CreateANewProject",defaultMessage:"新建项目"}):s.formatMessage({id:"EditProject",defaultMessage:"编辑项目"}),okButtonProps:{autoFocus:!0,htmlType:"submit"},onCancel:()=>o(!1),destroyOnClose:!0,modalRender:c=>e.jsx(m,{layout:"vertical",form:a,name:"form_in_modal",onFinish:i=>{const h=a.getFieldValue("id");w(C,h?"PUT":"POST",{...i,id:h}).then(()=>{v.success(s.formatMessage({id:"OperationSuccessful",defaultMessage:"操作成功"})),o(!1),r()})},children:c}),children:[e.jsx(m.Item,{name:"matchers",label:s.formatMessage({id:"MatchingRule",defaultMessage:"匹配规则"}),rules:[{required:!0,message:s.formatMessage({id:"FolderAddressCannotBeEmpty",defaultMessage:"文件夹地址不能为空"}),validator:(c,i)=>{try{return new RegExp(i),Promise.resolve()}catch{return Promise.reject(new Error(s.formatMessage({id:"NotAValidRegularExpression",defaultMessage:"不是有效的正则表达式"})))}}}],children:e.jsx(m.List,{name:"matchers",children:(c,i)=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",rowGap:16},children:[c.map((h,A)=>e.jsxs(Z,{children:[e.jsx(m.Item,{noStyle:!0,name:A,children:e.jsx(S,{placeholder:"first"})}),e.jsx(ee,{onClick:()=>{i.remove(h.name)}})]},h.key)),e.jsx(se,{type:"dashed",onClick:()=>i.add(),block:!0,children:"+ Add Sub Item"})]})})}),e.jsx(m.Item,{name:"name",label:s.formatMessage({id:"Name",defaultMessage:"名称"}),children:e.jsx(S,{})}),e.jsx(m.Item,{name:"label",label:s.formatMessage({id:"LabelName",defaultMessage:"标签名"}),children:e.jsx(S,{})}),e.jsx(m.Item,{name:"color",label:s.formatMessage({id:"LabelColor",defaultMessage:"标签颜色"}),getValueFromEvent:c=>c.toHexString(),children:e.jsx(te,{presets:u})}),e.jsx(m.Item,{name:"clear",label:s.formatMessage({id:"WhetherToClearThePreviousLog",defaultMessage:"是否清除之前日志"}),valuePropName:"checked",children:e.jsx(ae,{})})]})]})}const{Option:R}=F,Ee=s=>fetch(s).then(t=>t.json().then(r=>r.data)),we=f.lazy(()=>E(()=>import("./index-XGKhQlPj.js"),__vite__mapDeps([0,1,2]))),Pe=()=>{const s=_(),t=ie(),{locale:r,setLocale:l}=ve();return e.jsx(ce,{value:{fetcher:Ee,revalidateOnFocus:!0,revalidateOnMount:!0,revalidateOnReconnect:!0,revalidateIfStale:!1},children:e.jsx(de,{locale:{locale:"en-us"},theme:{token:{colorPrimary:"#7939cb",borderRadius:2,fontSize:16}},children:e.jsxs(L,{style:{minHeight:"100vh"},children:[e.jsxs(ue,{className:"text-white flex items-center",children:[e.jsx("div",{children:e.jsx(M,{id:"FrontendManagementSystem",defaultMessage:"前端管理系统"})}),e.jsx("div",{className:"ml-auto cursor-pointer",onClick:()=>{w("/system/shutdown","PUT").then(()=>{v.success(s.formatMessage({id:"BackendServiceClosedSuccessful_",defaultMessage:"后台服务关闭成功"}))})},children:e.jsx(M,{id:"ShutdownSystem",defaultMessage:"关闭系统"})}),e.jsxs(F,{onChange:l,value:r,className:"ml-5 w-28",children:[e.jsx(R,{value:"en-us",children:"English"}),e.jsx(R,{value:"zh-cn",children:e.jsx(M,{id:"Chinese",defaultMessage:"中文"})})]})]}),e.jsxs(L,{children:[e.jsx(me,{children:e.jsx(fe,{mode:"inline",onClick:a=>{t(a.key)},items:[{key:"processes",label:s.formatMessage({id:"Service",defaultMessage:"服务"}),icon:e.jsx(O,{})},{key:"logStatus",label:s.formatMessage({id:"LogStatus",defaultMessage:"日志状态"}),icon:e.jsx(O,{})}]})}),e.jsx(L,{children:e.jsx(he,{children:e.jsx(f.Suspense,{fallback:e.jsx("div",{children:"loading"}),children:e.jsx("div",{className:"ml-4 mr-4",children:e.jsxs(ge,{children:[e.jsx(b,{path:"/processes",element:e.jsx(we,{})}),e.jsx(b,{path:"/logStatus",element:e.jsx(Ce,{})})]})})})})})]})]})})})};ne(document.getElementById("root")).render(e.jsx(oe.StrictMode,{children:e.jsx(le,{children:e.jsx(Se,{defaultLocale:"zh-cn",children:e.jsx(Pe,{})})})}));export{be as a,T as b,Le as c,g as i,w as j,C as s,pe as u};
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/index-XGKhQlPj.js","assets/vendor-AUb_t5Eg.js","assets/index-ubpXYuuh.css"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
