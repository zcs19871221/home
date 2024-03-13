import{u as Y,j as e,C as A,B as j,S as b,r as m,F as R,I as w,a as W,s as E,b as ie,M as T,E as le,T as F,P as z,c as ce,d as H,D as de,e as ue,f as pe,R as he,g as me,h as fe,i as ve,k as xe,L as J,l as je,m as ge,n as Q,N as Se}from"./vendor-bv2W42_R.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&c(o)}).observe(document,{childList:!0,subtree:!0});function l(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function c(i){if(i.ep)return;i.ep=!0;const n=l(i);fetch(i.href,n)}})();const Re="modulepreload",Ce=function(t){return"/"+t},X={},U=function(a,l,c){let i=Promise.resolve();if(l&&l.length>0){const n=document.getElementsByTagName("link");i=Promise.all(l.map(o=>{if(o=Ce(o),o in X)return;X[o]=!0;const p=o.endsWith(".css"),f=p?'[rel="stylesheet"]':"";if(!!c)for(let C=n.length-1;C>=0;C--){const y=n[C];if(y.href===o&&(!p||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${f}`))return;const v=document.createElement("link");if(v.rel=p?"stylesheet":Re,p||(v.as="script",v.crossOrigin=""),v.href=o,document.head.appendChild(v),p)return new Promise((C,y)=>{v.addEventListener("load",C),v.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${o}`)))})}))}return i.then(()=>a()).catch(n=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=n,window.dispatchEvent(o),!o.defaultPrevented)throw n})},B="http://localhost:9981",Z=()=>Y(`${B}/api/npmProjects`,{revalidateIfStale:!1,revalidateOnMount:!0,revalidateOnFocus:!1,revalidateOnReconnect:!1}),ye=[{name:"UiServer",value:{name:"UI-Server",portConfigFileRelativePath:".env",portReg:"RENDER_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BffServer",value:{name:"BFF-Server",portConfigFileRelativePath:".env",portReg:"BFF_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BuildServer",value:{portConfigFileRelativePath:"project.js",portReg:"port:\\s*(\\d+)",command:"npm run build",postServers:[]}}];function Ee({rootNodeServerStates:t,updateRootNodeServerStates:a,nodeServerState:l}){const[c,i]=m.useState(),{data:n}=Z(),[o]=R.useForm();return m.useEffect(()=>{l.form=o},[l,o]),e.jsxs(R,{form:o,layout:"horizontal",initialValues:l,children:[e.jsx(R.Item,{name:"name",label:"名称",rules:[{required:!0,message:"输入服务名称"}],children:e.jsx(w,{})}),e.jsx(R.Item,{name:"command",label:"npm 命令",rules:[{required:!0,message:"输入npm启动命令"},{pattern:/^npm /,message:"以npm 开头"}],children:e.jsx(w,{})}),e.jsx(R.Item,{name:"npmProjectId",label:"所属项目",rules:[{required:!0,message:"输入npm启动命令"}],children:e.jsx(W,{value:c,onChange:i,children:n==null?void 0:n.map(p=>e.jsx(W.Option,{value:p.id,children:p.path},p.id))})}),e.jsx(R.Item,{name:"portConfigFileRelativePath",label:"port配置文件相对地址",rules:[{required:!0,message:"输入port配置文件相对地址"}],children:e.jsx(w,{})}),e.jsx(R.Item,{name:"portReg",label:"port配置文件正则",rules:[{required:!0,message:"输入正则"},{validator:(p,f)=>{try{return new RegExp(String(f)),Promise.resolve()}catch{return Promise.reject(new Error("not valid RegExp"))}}}],children:e.jsx(w,{placeholder:"输入正则，必须包含括号以获取端口"})}),e.jsx(R.Item,{label:"子服务",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",rowGap:16},children:e.jsx(ee,{nodeServerStates:l.postServers??[],prevNodeServerState:l,rootNodeServerStates:t,updateRootNodeServerStates:a})})})]})}let Pe=0;function ee({rootNodeServerStates:t,updateRootNodeServerStates:a,nodeServerStates:l,prevNodeServerState:c}){const i=()=>{let n=[...l],o=c;for(;o;){o.postServers=n;const p=o.prevServer,f=(p==null?void 0:p.postServers)??t;f[f.indexOf(o)]={...o},n=[...f],o=p}a(n)};return e.jsxs(A,{children:[l.map((n,o)=>e.jsxs(A,{className:"cm1s535",children:[e.jsx(Ee,{nodeServerState:n,updateRootNodeServerStates:a,rootNodeServerStates:t},n.id??n.tmpId),e.jsx(j,{onClick:()=>{l.splice(o,1),i()},children:"删除服务"})]})),e.jsx(b,{className:"c1lck55g",children:ye.map(n=>e.jsxs(j,{type:"primary",onClick:()=>{l.push({...n.value,tmpId:`tmp${Pe++}`,prevServer:c}),i()},children:[n.name,"模板"]}))})]})}var O=(t=>(t.CLOSED="CLOSED",t.COMPILING="COMPILING",t.ERROR="ERROR",t.SUCCESS="SUCCESS",t.UNKNOWN="UNKNOWN",t))(O||{});function Ne(t,a=500){const[l,c]=m.useState(t);return m.useLayoutEffect(()=>{const i=window.setTimeout(()=>c(t),a);return()=>window.clearTimeout(i)},[t,a]),l}function Ie({value:t,onChange:a,...l}){const[c,i]=m.useState(t),n=Ne(c);return m.useEffect(()=>{a(n)},[a,n]),e.jsx(w,{...l,value:c,onChange:o=>{var p;i((p=o.target.value)==null?void 0:p.trim())}})}const ke="http://localhost:9981",S=async(t,a,l)=>{try{const c=await window.fetch(`${ke}${t}`,{method:a,...l&&{body:typeof l=="string"?l:JSON.stringify(l)},headers:{"Content-Type":"application/json"}}),i=await c.json();if(c.status!==200)throw new Error(i==null?void 0:i.data);return i.data}catch(c){throw E.error(c==null?void 0:c.message),c}};function be({rawLogs:t}){const a=m.useRef(""),l=m.useMemo(()=>{a.current=t??"";const c=[];let i=0;return t==null||t.replace(/(?:ERROR in ([^(]+)\((\d+),(\d+)\))|(\berror\b)/gi,(n,o,p,f,P,v)=>(c.push(t.slice(i,v)),i=v+n.length,P?(c.push(e.jsx("span",{className:"c19i87wg",children:P})),n):(c.push(e.jsx(j,{className:"c5s1knt",type:"link",onClick:()=>{S("/api/npmProjects/vscodeError","PUT",encodeURIComponent(`${o}:${p}:${f}`))},target:"_blank",children:n})),n))),t&&c.push(t.slice(i)),c},[t]);return e.jsx("div",{className:"cg3n9dw",children:l})}function Oe(){var K;const{data:t,mutate:a}=Z(),[l,c]=m.useState([]),{nodeIdMapNodeServerResponse:i,rootNodeServerResponses:n}=m.useMemo(()=>{const s={},r={},d=[],u=[];return t==null||t.forEach(h=>{h.nodeServers.forEach(g=>{const x={...g};x.portConfigFileRelativePath=decodeURIComponent(x.portConfigFileRelativePath),x.portReg=decodeURIComponent(x.portReg);const k={...x,postServers:[]};s[x.id]=k,r[x.id]=x,x.prevServerId||(u.push(x),d.push(k))})}),Object.values(s).forEach(h=>{var x;const g=h;g.prevServer=g.prevServerId?s[g.prevServerId]:void 0,g.postServers=((x=g.postServerIds)==null?void 0:x.map(k=>s[k]))??[]}),c(d),{rootNodeServerResponses:u,nodeIdMapNodeServerResponse:r}},[t]),[o,p]=m.useState(null),[f,P]=m.useState(!1),{data:v,mutate:C}=Y(`${B}/api/nodeServers/runningInfos`,{...!f&&{refreshInterval:2e3}}),[y,te]=m.useState(""),[,re]=m.useState(0),se=()=>re(s=>s+1);m.useEffect(()=>{let s;const r=()=>clearTimeout(s);if(r(),!o)return r;async function d(){const h=await(await fetch(`${B}/api/nodeServers/logs/${o}`,{method:"GET"})).text();te(h),setTimeout(d,2e3)}return d(),r},[o]),m.useEffect(()=>{C()},[C]);const M=(s,r)=>S(`/api/nodeServers/${s}/${r}`,"PUT").then(()=>{E.success(`${s}指令已发送`)}),V=(s,r)=>{var h,g;let d="",u="processing";if(!v||s===void 0||s===null||((h=v[s])==null?void 0:h.status)===void 0)d="未开启",u="grey";else{const x=(g=v[s])==null?void 0:g.status;switch(x){case O.CLOSED:d="已关闭",u="grey";break;case O.ERROR:d="错误",u="error";break;case O.COMPILING:d="编译中..",u="processing";break;case O.SUCCESS:d="成功",u="success";break;case O.UNKNOWN:d="未知",u="warning";break;default:{const k=x;throw new Error(k)}}}return e.jsxs(b,{className:"c1cph1bk",children:[e.jsx("div",{children:r??""}),e.jsx(ce,{bordered:!1,color:u,children:d})]})},_=[{title:"名称",dataIndex:"name",render:(s,r)=>V(r.id,r.name)},{title:"命令",dataIndex:"command"},{title:"地址",render:(s,r)=>{var u;const d=(u=t==null?void 0:t.find(h=>h.id===r.npmProjectId))==null?void 0:u.path;return r.errorField==="PROJECT_PATH"?e.jsx(H,{title:r.errorMsg,children:e.jsx("span",{className:"c1oriuqi",children:d})}):d}},{title:"端口",dataIndex:"port",render:(s,r)=>{if(r.errorMsg)return e.jsx(H,{title:r.errorMsg,children:e.jsx("span",{className:"c4u9m77",children:r.errorMsg})});const d=Object.values(i).find(u=>u.id!==r.id&&u.port===s);return e.jsx(Ie,{value:s,style:d?{color:"red"}:{},onChange:u=>{String(u)!==String(s)&&S(`/api/nodeServers/changePort/${r.id}/${u}`,"PUT").then(a)}})}},{title:"操作",render:(s,r)=>{const d=v?v[r.id]:null;return e.jsxs(b,{children:[f&&e.jsx(z,{title:"删除服务",description:"是否要删除服务",onConfirm:()=>{S(`/api/nodeServers/${r.id}`,"DELETE").then(()=>{E.success("删除成功"),a()})},children:e.jsx(j,{type:"link",children:"删除"})}),!f&&e.jsxs(de,{disabled:!!r.errorMsg,children:[e.jsx(j,{type:"link",onClick:()=>S(`/api/npmProjects/vscode/${r.npmProjectId}`,"GET"),children:"vscode"}),e.jsx(j,{type:"link",onClick:()=>M("start",r.id).then(()=>C()),children:"启动"}),e.jsx(j,{type:"link",onClick:()=>{p(r.id??null)},disabled:!d,children:"日志"}),e.jsx(j,{type:"link",onClick:()=>M("restart",r.id).then(()=>C()),children:"重启"}),e.jsx(j,{type:"link",onClick:()=>M("stop",r.id),children:"关闭"})]})]})}}],ne=s=>{var r;return e.jsx(F,{pagination:!1,dataSource:((r=s.nodeServers)==null?void 0:r.map(d=>({...d,key:d.id})))??[],rowKey:"id",columns:_})};function q(s){const{postServerIds:r}=s;if(!r||r.length===0)return null;const d=r.map(u=>({...i[u],key:u}));return e.jsx(F,{pagination:!1,dataSource:d,columns:_,...r.length>0&&{expandable:{expandedRowRender:q,defaultExpandedRowKeys:r}}})}const[oe,N]=m.useState(!1),[$,G]=m.useState(),[I]=R.useForm(),[ae,L]=m.useState(!1);return e.jsxs("div",{children:[e.jsxs(b,{className:"c1ru92bi",children:[e.jsx(ie,{options:["项目分组","服务分组"],defaultValue:f?"项目分组":"服务分组",onChange:s=>{P(s==="项目分组")}}),f&&e.jsxs(e.Fragment,{children:[e.jsx(j,{onClick:()=>{N(!0),I.resetFields()},type:"primary",children:"添加项目"}),e.jsx(j,{onClick:()=>{L(!0)},type:"primary",children:"整体编辑服务"})]}),e.jsx(j,{onClick:()=>{T.confirm({title:"是否关闭控制台？",icon:e.jsx(le,{}),content:"关闭后台运行进程",onOk(){S("/api/npmProjects/shutdown","PUT")}})},type:"link",children:"关闭控制台"})]}),!f&&n.length>0&&e.jsx(F,{pagination:!1,dataSource:n.map(s=>({...s,key:s.id})),columns:_,expandable:{expandedRowRender:q,defaultExpandedRowKeys:n.map(s=>s.id)}}),f&&(t!=null&&t.length)?e.jsx(F,{pagination:!1,dataSource:t.map(s=>({...s,key:s.id})),expandable:{expandedRowRender:ne,defaultExpandedRowKeys:t==null?void 0:t.map(s=>s.id)},columns:[{dataIndex:"path",title:"路径"},{title:"操作",render:(s,r)=>e.jsxs(b,{children:[e.jsx(z,{title:"删除项目",description:"是否要删除项目",onConfirm:()=>{S(`/api/npmProjects/${r.id}`,"DELETE").then(()=>{E.success("删除成功"),a()})},children:e.jsx(j,{type:"link",children:"删除"})}),e.jsx(j,{type:"primary",onClick:()=>{G(r),N(!0),I.setFieldValue("path",r.path)},children:"编辑"}),e.jsx(j,{type:"primary",onClick:()=>{G(r),N(!0),I.setFieldValue("path",r.path)},children:"添加服务"})]})}]}):null,e.jsx(T,{open:oe,title:`${$?"编辑":"添加"}项目`,onCancel:()=>N(!1),onOk:()=>{I.validateFields().then(s=>{if(I.resetFields(),$){S("/api/npmProjects","PUT",{path:s.path,id:$.id}).then(()=>{a(),N(!1),E.success("修改项目成功")});return}S("/api/npmProjects","POST",s).then(()=>{a(),N(!1),E.success("创建项目成功")})})},children:e.jsx(R,{form:I,layout:"vertical",name:"path",children:e.jsx(R.Item,{name:"path",label:"path",rules:[{required:!0,message:"Please input the path of project"}],children:e.jsx(w,{})})})}),e.jsx(T,{title:"编辑或添加服务",open:ae,onCancel:()=>{L(!1)},okText:"保存",cancelText:"取消",onOk:()=>{const s=d=>d.map(u=>{var g;const h={...(g=u.form)==null?void 0:g.getFieldsValue(!0)};return h.postServers??(h.postServers=[]),h.portConfigFileRelativePath=encodeURIComponent(h.portConfigFileRelativePath),h.portReg=encodeURIComponent(h.portReg),h.postServers=s(u.postServers),h}),r=s(l);S("/api/nodeServers/batch","POST",r).then(()=>{E.success("保存服务成功"),a(),L(!1)})},width:"80vw",children:e.jsx(ee,{nodeServerStates:l,rootNodeServerStates:l,updateRootNodeServerStates:c})}),e.jsx(T,{open:o!==null&&v!==void 0,onCancel:()=>p(null),footer:null,title:e.jsxs(b,{className:"cckpddg",children:[V(o,o?(K=i[o])==null?void 0:K.name:""),e.jsx(j,{type:"link",onClick:()=>S(`/api/nodeServers/clearLog/${o}`,"GET").then(()=>se()),children:"清除日志"})]}),width:"80vw",classNames:{body:"bclyprh"},centered:!0,children:e.jsx(be,{rawLogs:y},y)})]})}const we=t=>fetch(t).then(a=>a.json().then(l=>l.data));function Te(t){switch(t){case"en-US":return U(()=>import("./en-US-WwZ3Ju4A.js"),__vite__mapDeps([])).then(a=>a.default);case"zh-CN":return U(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(a=>a.default);default:return U(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(a=>a.default)}}const D=ue()(t=>({setLocale:async a=>{const l=await Te(a);t({locale:a,messages:l})}})),Fe=()=>{const t=D(c=>c.locale),a=D(c=>c.messages),l=D(c=>c.setLocale);return m.useLayoutEffect(()=>{t||l("zh-CN")},[t,l]),!a||!t?null:e.jsx(fe,{locale:t,messages:a,children:e.jsx(ve,{value:{fetcher:we,revalidateOnFocus:!0,revalidateOnMount:!0,revalidateOnReconnect:!0,revalidateIfStale:!1},children:e.jsx(xe,{locale:{locale:t},theme:{token:{colorPrimary:"#7939cb",borderRadius:2,fontSize:16}},children:e.jsx(J,{style:{minHeight:"100vh"},children:e.jsx(J,{children:e.jsx(je,{children:e.jsxs(ge,{children:[e.jsx(Q,{path:"/nodeServerManagement",element:e.jsx(Oe,{})}),e.jsx(Q,{path:"*",element:e.jsx(Se,{to:"/nodeServerManagement"})})]})})})})})})})};pe(document.getElementById("root")).render(e.jsx(he.StrictMode,{children:e.jsx(me,{children:e.jsx(Fe,{})})}));
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}