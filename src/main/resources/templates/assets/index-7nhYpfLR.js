import{u as V,j as e,C as z,B as v,S as b,r as x,F as R,I as k,a as H,s as E,b as oe,M as F,E as ae,T,P as J,c as ie,d as Q,D as le,e as ce,f as de,R as ue,g as pe,h as he,i as me,k as fe,L as X,l as ve,m as xe,n as Y,N as je}from"./vendor-bv2W42_R.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const i of c)if(i.type==="childList")for(const n of i.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&l(n)}).observe(document,{childList:!0,subtree:!0});function o(c){const i={};return c.integrity&&(i.integrity=c.integrity),c.referrerPolicy&&(i.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?i.credentials="include":c.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(c){if(c.ep)return;c.ep=!0;const i=o(c);fetch(c.href,i)}})();const ge="modulepreload",Se=function(t){return"/"+t},Z={},D=function(r,o,l){let c=Promise.resolve();if(o&&o.length>0){const i=document.getElementsByTagName("link");c=Promise.all(o.map(n=>{if(n=Se(n),n in Z)return;Z[n]=!0;const p=n.endsWith(".css"),h=p?'[rel="stylesheet"]':"";if(!!l)for(let C=i.length-1;C>=0;C--){const P=i[C];if(P.href===n&&(!p||P.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${h}`))return;const j=document.createElement("link");if(j.rel=p?"stylesheet":ge,p||(j.as="script",j.crossOrigin=""),j.href=n,document.head.appendChild(j),p)return new Promise((C,P)=>{j.addEventListener("load",C),j.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${n}`)))})}))}return c.then(()=>r()).catch(i=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=i,window.dispatchEvent(n),!n.defaultPrevented)throw i})},q="http://localhost:9981",ee=()=>V(`${q}/api/npmProjects`,{revalidateIfStale:!1,revalidateOnMount:!0,revalidateOnFocus:!1,revalidateOnReconnect:!1}),Re=[{name:"UiServer",value:{name:"UI-Server",portConfigFileRelativePath:".env",portReg:"RENDER_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BffServer",value:{name:"BFF-Server",portConfigFileRelativePath:".env",portReg:"BFF_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BuildServer",value:{portConfigFileRelativePath:"project.js",portReg:"port:\\s*(\\d+)",command:"npm run build",postServers:[]}}];function Ce({rootNodeServerStates:t,updateRootNodeServerStates:r,nodeServerState:o}){const[l,c]=x.useState(),{data:i}=ee(),[n]=R.useForm();return x.useEffect(()=>{o.form=n},[o,n]),e.jsxs(R,{form:n,layout:"horizontal",initialValues:o,children:[e.jsx(R.Item,{name:"name",label:"名称",rules:[{required:!0,message:"输入服务名称"}],children:e.jsx(k,{})}),e.jsx(R.Item,{name:"command",label:"npm 命令",rules:[{required:!0,message:"输入npm启动命令"},{pattern:/^npm /,message:"以npm 开头"}],children:e.jsx(k,{})}),e.jsx(R.Item,{name:"npmProjectId",label:"所属项目",rules:[{required:!0,message:"输入npm启动命令"}],children:e.jsx(H,{value:l,onChange:c,children:i==null?void 0:i.map(p=>e.jsx(H.Option,{value:p.id,children:p.path},p.id))})}),e.jsx(R.Item,{name:"portConfigFileRelativePath",label:"port配置文件相对地址",rules:[{required:!0,message:"输入port配置文件相对地址"}],children:e.jsx(k,{})}),e.jsx(R.Item,{name:"portReg",label:"port配置文件正则",rules:[{required:!0,message:"输入正则"},{validator:(p,h)=>{try{return new RegExp(String(h)),Promise.resolve()}catch{return Promise.reject(new Error("not valid RegExp"))}}}],children:e.jsx(k,{placeholder:"输入正则，必须包含括号以获取端口"})}),e.jsx(R.Item,{label:"子服务",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",rowGap:16},children:e.jsx(te,{nodeServerStates:o.postServers??[],prevNodeServerState:o,rootNodeServerStates:t,updateRootNodeServerStates:r})})})]})}let ye=0;function te({rootNodeServerStates:t,updateRootNodeServerStates:r,nodeServerStates:o,prevNodeServerState:l}){const c=()=>{let i=[...o],n=l;for(;n;){n.postServers=i;const p=n.prevServer,h=(p==null?void 0:p.postServers)??t;h[h.indexOf(n)]={...n},i=[...h],n=p}r(i)};return e.jsxs(z,{children:[o.map((i,n)=>e.jsxs(z,{className:"cm1s535",children:[e.jsx(Ce,{nodeServerState:i,updateRootNodeServerStates:r,rootNodeServerStates:t},i.id??i.tmpId),e.jsx(v,{onClick:()=>{o.splice(n,1),c()},children:"删除服务"})]})),e.jsx(b,{className:"c1lck55g",children:Re.map(i=>e.jsxs(v,{type:"primary",onClick:()=>{o.push({...i.value,tmpId:`tmp${ye++}`,prevServer:l}),c()},children:[i.name,"模板"]}))})]})}var y=(t=>(t.CLOSED="CLOSED",t.COMPILING="COMPILING",t.ERROR="ERROR",t.SUCCESS="SUCCESS",t.UNKNOWN="UNKNOWN",t))(y||{});function Ee(t,r=500){const[o,l]=x.useState(t);return x.useLayoutEffect(()=>{const c=window.setTimeout(()=>l(t),r);return()=>window.clearTimeout(c)},[t,r]),o}function Pe({value:t,onChange:r,...o}){const[l,c]=x.useState(t),i=Ee(l);return x.useEffect(()=>{r(i)},[r,i]),e.jsx(k,{...o,value:l,onChange:n=>{var p;c((p=n.target.value)==null?void 0:p.trim())}})}const Ie="http://localhost:9981",S=async(t,r,o)=>{try{const l=await window.fetch(`${Ie}${t}`,{method:r,...o&&{body:typeof o=="string"?o:JSON.stringify(o)},headers:{"Content-Type":"application/json"}}),c=await l.json();if(l.status!==200)throw new Error(c==null?void 0:c.data);return c.data}catch(l){throw E.error(l==null?void 0:l.message),l}};function Ne({rawLogs:t}){const r=[];let o=0;return t==null||t.replace(/(?:ERROR in ([^(]+)\((\d+),(\d+)\))|(\berror\b)|(?:SyntaxError (.*?): .*?\((\d+),(\d+)\))|/gi,(l,c,i,n,p,h)=>(r.push(t.slice(o,h)),o=h+l.length,p?(r.push(e.jsx("span",{className:"c19i87wg",children:p})),l):(r.push(e.jsx(v,{className:"c5s1knt",type:"link",onClick:()=>{S("/api/npmProjects/vscodeError","PUT",encodeURIComponent(`${c}:${i}:${n}`))},target:"_blank",children:l})),l))),t&&r.push(t.slice(o)),e.jsx("div",{className:"cg3n9dw",children:r})}const Oe=t=>fetch(t,{method:"GET"}).then(r=>{var o,l;return(l=(o=r.body)==null?void 0:o.getReader())==null?void 0:l.read()}).then(r=>new TextDecoder().decode(r==null?void 0:r.value).replace(/\[1m/g,"").replace(/\\x1B/g,"").replace(/\[22m/g,"").replace(/\[32m/g,"").replace(/\[33m/g,"").replace(/\[39m/g,"").replace(//g,"").replace(/(\x00)+/g,`
`));function be(){var W;const{data:t,mutate:r}=ee(),[o,l]=x.useState([]),{nodeIdMapNodeServerResponse:c,rootNodeServerResponses:i}=x.useMemo(()=>{const a={},s={},d=[],u=[];return t==null||t.forEach(m=>{m.nodeServers.forEach(g=>{const f={...g};f.portConfigFileRelativePath=decodeURIComponent(f.portConfigFileRelativePath),f.portReg=decodeURIComponent(f.portReg);const O={...f,postServers:[]};a[f.id]=O,s[f.id]=f,f.prevServerId||(u.push(f),d.push(O))})}),Object.values(a).forEach(m=>{var f;const g=m;g.prevServer=g.prevServerId?a[g.prevServerId]:void 0,g.postServers=((f=g.postServerIds)==null?void 0:f.map(O=>a[O]))??[]}),l(d),{rootNodeServerResponses:u,nodeIdMapNodeServerResponse:s}},[t]),[n,p]=x.useState(null),[h,M]=x.useState(!1),{data:j,mutate:C}=V(`${q}/api/nodeServers/runningInfos`,{...!h&&{refreshInterval:2e3}}),{data:P,mutate:w}=V(n?`${q}/api/nodeServers/logs/${n}`:void 0,Oe,{...!n!==null&&{refreshInterval:2e3}});x.useEffect(()=>{C()},[C]),x.useEffect(()=>{n&&w()},[n,w]);const L=(a,s)=>S(`/api/nodeServers/${a}/${s}`,"PUT").then(()=>{E.success(`${a}指令已发送`)}),G=(a,s)=>{var m,g;let d="",u="processing";if(!j||a===void 0||a===null||((m=j[a])==null?void 0:m.status)===void 0)d="未开启",u="grey";else{const f=(g=j[a])==null?void 0:g.status;switch(f){case y.CLOSED:d="已关闭",u="grey";break;case y.ERROR:d="错误",u="error";break;case y.COMPILING:d="编译中..",u="processing";break;case y.SUCCESS:d="成功",u="success";break;case y.UNKNOWN:d="未知",u="warning";break;default:{const O=f;throw new Error(O)}}}return e.jsxs(b,{className:"c1cph1bk",children:[e.jsx("div",{children:s??""}),e.jsx(ie,{bordered:!1,color:u,children:d})]})},_=[{title:"名称",dataIndex:"name",render:(a,s)=>G(s.id,s.name)},{title:"命令",dataIndex:"command"},{title:"地址",render:(a,s)=>{var u;const d=(u=t==null?void 0:t.find(m=>m.id===s.npmProjectId))==null?void 0:u.path;return s.errorField==="PROJECT_PATH"?e.jsx(Q,{title:s.errorMsg,children:e.jsx("span",{className:"c1oriuqi",children:d})}):d}},{title:"端口",dataIndex:"port",render:(a,s)=>{if(s.errorMsg)return e.jsx(Q,{title:s.errorMsg,children:e.jsx("span",{className:"c4u9m77",children:s.errorMsg})});const d=Object.values(c).find(u=>u.id!==s.id&&u.port===a);return e.jsx(Pe,{value:a,style:d?{color:"red"}:{},onChange:u=>{String(u)!==String(a)&&S(`/api/nodeServers/changePort/${s.id}/${u}`,"PUT").then(r)}})}},{title:"操作",render:(a,s)=>{const d=j?j[s.id]:null;return e.jsxs(b,{children:[h&&e.jsx(J,{title:"删除服务",description:"是否要删除服务",onConfirm:()=>{S(`/api/nodeServers/${s.id}`,"DELETE").then(()=>{E.success("删除成功"),r()})},children:e.jsx(v,{type:"link",children:"删除"})}),!h&&e.jsxs(le,{disabled:!!s.errorMsg,children:[e.jsx(v,{type:"link",onClick:()=>S(`/api/npmProjects/vscode/${s.npmProjectId}`,"GET"),children:"vscode"}),(!d||d.status===y.CLOSED)&&e.jsx(v,{type:"link",onClick:()=>L("start",s.id).then(()=>C()),children:"启动"}),d&&e.jsxs(e.Fragment,{children:[e.jsx(v,{type:"link",onClick:()=>{p(s.id??null),w()},children:"日志"}),e.jsx(v,{type:"link",onClick:()=>L("restart",s.id).then(()=>C()),children:"重启"}),d.status!==y.CLOSED&&e.jsx(v,{type:"link",onClick:()=>L("stop",s.id),children:"关闭"})]})]})]})}}],re=a=>{var s;return e.jsx(T,{pagination:!1,dataSource:((s=a.nodeServers)==null?void 0:s.map(d=>({...d,key:d.id})))??[],rowKey:"id",columns:_})};function K(a){const{postServerIds:s}=a;if(!s||s.length===0)return null;const d=s.map(u=>({...c[u],key:u}));return e.jsx(T,{pagination:!1,dataSource:d,columns:_,...s.length>0&&{expandable:{expandedRowRender:K,defaultExpandedRowKeys:s}}})}const[ne,I]=x.useState(!1),[$,A]=x.useState(),[N]=R.useForm(),[se,U]=x.useState(!1);return e.jsxs("div",{children:[e.jsxs(b,{className:"c1ru92bi",children:[e.jsx(oe,{options:["项目分组","服务分组"],defaultValue:h?"项目分组":"服务分组",onChange:a=>{M(a==="项目分组")}}),h&&e.jsxs(e.Fragment,{children:[e.jsx(v,{onClick:()=>{I(!0),N.resetFields()},type:"primary",children:"添加项目"}),e.jsx(v,{onClick:()=>{U(!0)},type:"primary",children:"整体编辑服务"})]}),e.jsx(v,{onClick:()=>{F.confirm({title:"是否关闭控制台？",icon:e.jsx(ae,{}),content:"关闭后台运行进程",onOk(){S("/api/npmProjects/shutdown","PUT")}})},type:"link",children:"关闭控制台"})]}),!h&&i.length>0&&e.jsx(T,{pagination:!1,dataSource:i.map(a=>({...a,key:a.id})),columns:_,expandable:{expandedRowRender:K,defaultExpandedRowKeys:i.map(a=>a.id)}}),h&&(t!=null&&t.length)?e.jsx(T,{pagination:!1,dataSource:t.map(a=>({...a,key:a.id})),expandable:{expandedRowRender:re,defaultExpandedRowKeys:t==null?void 0:t.map(a=>a.id)},columns:[{dataIndex:"path",title:"路径"},{title:"操作",render:(a,s)=>e.jsxs(b,{children:[e.jsx(J,{title:"删除项目",description:"是否要删除项目",onConfirm:()=>{S(`/api/npmProjects/${s.id}`,"DELETE").then(()=>{E.success("删除成功"),r()})},children:e.jsx(v,{type:"link",children:"删除"})}),e.jsx(v,{type:"primary",onClick:()=>{A(s),I(!0),N.setFieldValue("path",s.path)},children:"编辑"}),e.jsx(v,{type:"primary",onClick:()=>{A(s),I(!0),N.setFieldValue("path",s.path)},children:"添加服务"})]})}]}):null,e.jsx(F,{open:ne,title:`${$?"编辑":"添加"}项目`,onCancel:()=>I(!1),onOk:()=>{N.validateFields().then(a=>{if(N.resetFields(),$){S("/api/npmProjects","PUT",{path:a.path,id:$.id}).then(()=>{r(),I(!1),E.success("修改项目成功")});return}S("/api/npmProjects","POST",a).then(()=>{r(),I(!1),E.success("创建项目成功")})})},children:e.jsx(R,{form:N,layout:"vertical",name:"path",children:e.jsx(R.Item,{name:"path",label:"path",rules:[{required:!0,message:"Please input the path of project"}],children:e.jsx(k,{})})})}),e.jsx(F,{title:"编辑或添加服务",open:se,onCancel:()=>{U(!1)},okText:"保存",cancelText:"取消",onOk:()=>{const a=d=>d.map(u=>{var g;const m={...(g=u.form)==null?void 0:g.getFieldsValue(!0)};return m.postServers??(m.postServers=[]),m.portConfigFileRelativePath=encodeURIComponent(m.portConfigFileRelativePath),m.portReg=encodeURIComponent(m.portReg),m.postServers=a(u.postServers),m}),s=a(o);S("/api/nodeServers/batch","POST",s).then(()=>{E.success("保存服务成功"),r(),U(!1)})},width:"80vw",children:e.jsx(te,{nodeServerStates:o,rootNodeServerStates:o,updateRootNodeServerStates:l})}),e.jsx(F,{open:n!==null&&j!==void 0,onCancel:()=>p(null),footer:null,title:e.jsxs(b,{className:"cckpddg",children:[G(n,n?(W=c[n])==null?void 0:W.name:""),e.jsx(v,{type:"link",onClick:()=>S(`/api/nodeServers/clearLog/${n}`,"GET").then(()=>w()),children:"清除日志"})]}),width:"80vw",classNames:{body:"bclyprh"},centered:!0,children:e.jsx(Ne,{rawLogs:P})})]})}const ke=t=>fetch(t).then(r=>r.json().then(o=>o.data));function we(t){switch(t){case"en-US":return D(()=>import("./en-US-WwZ3Ju4A.js"),__vite__mapDeps([])).then(r=>r.default);case"zh-CN":return D(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(r=>r.default);default:return D(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(r=>r.default)}}const B=ce()(t=>({setLocale:async r=>{const o=await we(r);t({locale:r,messages:o})}})),Fe=()=>{const t=B(l=>l.locale),r=B(l=>l.messages),o=B(l=>l.setLocale);return x.useLayoutEffect(()=>{t||o("zh-CN")},[t,o]),!r||!t?null:e.jsx(he,{locale:t,messages:r,children:e.jsx(me,{value:{fetcher:ke,revalidateOnFocus:!0,revalidateOnMount:!0,revalidateOnReconnect:!0,revalidateIfStale:!1},children:e.jsx(fe,{locale:{locale:t},theme:{token:{colorPrimary:"#7939cb",borderRadius:2,fontSize:16}},children:e.jsx(X,{style:{minHeight:"100vh"},children:e.jsx(X,{children:e.jsx(ve,{children:e.jsxs(xe,{children:[e.jsx(Y,{path:"/nodeServerManagement",element:e.jsx(be,{})}),e.jsx(Y,{path:"*",element:e.jsx(je,{to:"/nodeServerManagement"})})]})})})})})})})};de(document.getElementById("root")).render(e.jsx(ue.StrictMode,{children:e.jsx(pe,{children:e.jsx(Fe,{})})}));
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}