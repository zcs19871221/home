import{u as B,j as e,C as W,B as v,S as b,r as x,F as R,I as O,a as z,s as y,b as oe,M as w,E as ae,T as F,P as H,c as ie,d as J,D as le,e as ce,f as de,R as ue,g as pe,h as he,i as me,k as fe,L as Q,l as ve,m as xe,n as X,N as je}from"./vendor-bv2W42_R.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))l(c);new MutationObserver(c=>{for(const i of c)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&l(o)}).observe(document,{childList:!0,subtree:!0});function s(c){const i={};return c.integrity&&(i.integrity=c.integrity),c.referrerPolicy&&(i.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?i.credentials="include":c.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(c){if(c.ep)return;c.ep=!0;const i=s(c);fetch(c.href,i)}})();const ge="modulepreload",Se=function(t){return"/"+t},Y={},U=function(r,s,l){let c=Promise.resolve();if(s&&s.length>0){const i=document.getElementsByTagName("link");c=Promise.all(s.map(o=>{if(o=Se(o),o in Y)return;Y[o]=!0;const u=o.endsWith(".css"),h=u?'[rel="stylesheet"]':"";if(!!l)for(let C=i.length-1;C>=0;C--){const E=i[C];if(E.href===o&&(!u||E.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${h}`))return;const j=document.createElement("link");if(j.rel=u?"stylesheet":ge,u||(j.as="script",j.crossOrigin=""),j.href=o,document.head.appendChild(j),u)return new Promise((C,E)=>{j.addEventListener("load",C),j.addEventListener("error",()=>E(new Error(`Unable to preload CSS for ${o}`)))})}))}return c.then(()=>r()).catch(i=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=i,window.dispatchEvent(o),!o.defaultPrevented)throw i})},V="http://localhost:9981",Z=()=>B(`${V}/api/npmProjects`,{revalidateIfStale:!1,revalidateOnMount:!0,revalidateOnFocus:!1,revalidateOnReconnect:!1}),Re=[{name:"UiServer",value:{name:"UI-Server",portConfigFileRelativePath:".env",portReg:"RENDER_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BffServer",value:{name:"BFF-Server",portConfigFileRelativePath:".env",portReg:"BFF_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BuildServer",value:{portConfigFileRelativePath:"project.js",portReg:"port:\\s*(\\d+)",command:"npm run build",postServers:[]}}];function Ce({rootNodeServerStates:t,updateRootNodeServerStates:r,nodeServerState:s}){const[l,c]=x.useState(),{data:i}=Z(),[o]=R.useForm();return x.useEffect(()=>{s.form=o},[s,o]),e.jsxs(R,{form:o,layout:"horizontal",initialValues:s,children:[e.jsx(R.Item,{name:"name",label:"名称",rules:[{required:!0,message:"输入服务名称"}],children:e.jsx(O,{})}),e.jsx(R.Item,{name:"command",label:"npm 命令",rules:[{required:!0,message:"输入npm启动命令"},{pattern:/^npm /,message:"以npm 开头"}],children:e.jsx(O,{})}),e.jsx(R.Item,{name:"npmProjectId",label:"所属项目",rules:[{required:!0,message:"输入npm启动命令"}],children:e.jsx(z,{value:l,onChange:c,children:i==null?void 0:i.map(u=>e.jsx(z.Option,{value:u.id,children:u.path},u.id))})}),e.jsx(R.Item,{name:"portConfigFileRelativePath",label:"port配置文件相对地址",rules:[{required:!0,message:"输入port配置文件相对地址"}],children:e.jsx(O,{})}),e.jsx(R.Item,{name:"portReg",label:"port配置文件正则",rules:[{required:!0,message:"输入正则"},{validator:(u,h)=>{try{return new RegExp(String(h)),Promise.resolve()}catch{return Promise.reject(new Error("not valid RegExp"))}}}],children:e.jsx(O,{placeholder:"输入正则，必须包含括号以获取端口"})}),e.jsx(R.Item,{label:"子服务",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",rowGap:16},children:e.jsx(ee,{nodeServerStates:s.postServers??[],prevNodeServerState:s,rootNodeServerStates:t,updateRootNodeServerStates:r})})})]})}let ye=0;function ee({rootNodeServerStates:t,updateRootNodeServerStates:r,nodeServerStates:s,prevNodeServerState:l}){const c=()=>{let i=[...s],o=l;for(;o;){o.postServers=i;const u=o.prevServer,h=(u==null?void 0:u.postServers)??t;h[h.indexOf(o)]={...o},i=[...h],o=u}r(i)};return e.jsxs(W,{children:[s.map((i,o)=>e.jsxs(W,{className:"cm1s535",children:[e.jsx(Ce,{nodeServerState:i,updateRootNodeServerStates:r,rootNodeServerStates:t},i.id??i.tmpId),e.jsx(v,{onClick:()=>{s.splice(o,1),c()},children:"删除服务"})]})),e.jsx(b,{className:"c1lck55g",children:Re.map(i=>e.jsxs(v,{type:"primary",onClick:()=>{s.push({...i.value,tmpId:`tmp${ye++}`,prevServer:l}),c()},children:[i.name,"模板"]}))})]})}var k=(t=>(t.CLOSED="CLOSED",t.COMPILING="COMPILING",t.ERROR="ERROR",t.SUCCESS="SUCCESS",t.UNKNOWN="UNKNOWN",t))(k||{});function Ee(t,r=500){const[s,l]=x.useState(t);return x.useLayoutEffect(()=>{const c=window.setTimeout(()=>l(t),r);return()=>window.clearTimeout(c)},[t,r]),s}function Pe({value:t,onChange:r,...s}){const[l,c]=x.useState(t),i=Ee(l);return x.useEffect(()=>{r(i)},[r,i]),e.jsx(O,{...s,value:l,onChange:o=>{var u;c((u=o.target.value)==null?void 0:u.trim())}})}const Ie="http://localhost:9981",S=async(t,r,s)=>{try{const l=await window.fetch(`${Ie}${t}`,{method:r,...s&&{body:typeof s=="string"?s:JSON.stringify(s)},headers:{"Content-Type":"application/json"}}),c=await l.json();if(l.status!==200)throw new Error(c==null?void 0:c.data);return c.data}catch(l){throw y.error(l==null?void 0:l.message),l}};function Ne({rawLogs:t}){const r=[];let s=0;return t==null||t.replace(/(?:ERROR in ([^(]+)\((\d+),(\d+)\))|(\berror\b)|(?:SyntaxError (.*?): .*?\((\d+),(\d+)\))|/gi,(l,c,i,o,u,h)=>(r.push(t.slice(s,h)),s=h+l.length,u?(r.push(e.jsx("span",{className:"c19i87wg",children:u})),l):(r.push(e.jsx(v,{className:"c5s1knt",type:"link",onClick:()=>{S("/api/npmProjects/vscodeError","PUT",encodeURIComponent(`${c}:${i}:${o}`))},target:"_blank",children:l})),l))),t&&r.push(t.slice(s)),e.jsx("div",{className:"cg3n9dw",children:r})}const be=t=>fetch(t,{method:"GET"}).then(r=>{var s,l;return(l=(s=r.body)==null?void 0:s.getReader())==null?void 0:l.read()}).then(r=>new TextDecoder().decode(r==null?void 0:r.value).replace(/\[1m/g,"").replace(/\\x1B/g,"").replace(/\[22m/g,"").replace(/\[32m/g,"").replace(/\[33m/g,"").replace(/\[39m/g,"").replace(//g,"").replace(/(\x00)+/g,`
`));function ke(){var A;const{data:t,mutate:r}=Z(),[s,l]=x.useState([]),{nodeIdMapNodeServerResponse:c,rootNodeServerResponses:i}=x.useMemo(()=>{const a={},n={},p=[],d=[];return t==null||t.forEach(m=>{m.nodeServers.forEach(g=>{const f={...g};f.portConfigFileRelativePath=decodeURIComponent(f.portConfigFileRelativePath),f.portReg=decodeURIComponent(f.portReg);const N={...f,postServers:[]};a[f.id]=N,n[f.id]=f,f.prevServerId||(d.push(f),p.push(N))})}),Object.values(a).forEach(m=>{var f;const g=m;g.prevServer=g.prevServerId?a[g.prevServerId]:void 0,g.postServers=((f=g.postServerIds)==null?void 0:f.map(N=>a[N]))??[]}),l(p),{rootNodeServerResponses:d,nodeIdMapNodeServerResponse:n}},[t]),[o,u]=x.useState(null),[h,T]=x.useState(!1),{data:j,mutate:C}=B(`${V}/api/nodeServers/runningInfos`,{...!h&&{refreshInterval:2e3}}),{data:E,mutate:te}=B(o?`${V}/api/nodeServers/logs/${o}`:void 0,be,{...!o!==null&&{refreshInterval:2e3}});x.useEffect(()=>{C()},[C]);const M=(a,n)=>S(`/api/nodeServers/${a}/${n}`,"PUT").then(()=>{y.success(`${a}指令已发送`)}),q=(a,n)=>{var m,g;let p="",d="processing";if(!j||a===void 0||a===null||((m=j[a])==null?void 0:m.status)===void 0)p="未开启",d="grey";else{const f=(g=j[a])==null?void 0:g.status;switch(f){case k.CLOSED:p="已关闭",d="grey";break;case k.ERROR:p="错误",d="error";break;case k.COMPILING:p="编译中..",d="processing";break;case k.SUCCESS:p="成功",d="success";break;case k.UNKNOWN:p="未知",d="warning";break;default:{const N=f;throw new Error(N)}}}return e.jsxs(b,{className:"c1cph1bk",children:[e.jsx("div",{children:n??""}),e.jsx(ie,{bordered:!1,color:d,children:p})]})},_=[{title:"名称",dataIndex:"name",render:(a,n)=>q(n.id,n.name)},{title:"命令",dataIndex:"command"},{title:"地址",render:(a,n)=>{var d;const p=(d=t==null?void 0:t.find(m=>m.id===n.npmProjectId))==null?void 0:d.path;return n.errorField==="PROJECT_PATH"?e.jsx(J,{title:n.errorMsg,children:e.jsx("span",{className:"c1oriuqi",children:p})}):p}},{title:"端口",dataIndex:"port",render:(a,n)=>{if(n.errorMsg)return e.jsx(J,{title:n.errorMsg,children:e.jsx("span",{className:"c4u9m77",children:n.errorMsg})});const p=Object.values(c).find(d=>d.id!==n.id&&d.port===a);return e.jsx(Pe,{value:a,style:p?{color:"red"}:{},onChange:d=>{String(d)!==String(a)&&S(`/api/nodeServers/changePort/${n.id}/${d}`,"PUT").then(r)}})}},{title:"操作",render:(a,n)=>{const p=j?j[n.id]:null;return e.jsxs(b,{children:[h&&e.jsx(H,{title:"删除服务",description:"是否要删除服务",onConfirm:()=>{S(`/api/nodeServers/${n.id}`,"DELETE").then(()=>{y.success("删除成功"),r()})},children:e.jsx(v,{type:"link",children:"删除"})}),!h&&e.jsxs(le,{disabled:!!n.errorMsg,children:[e.jsx(v,{type:"link",onClick:()=>S(`/api/npmProjects/vscode/${n.npmProjectId}`,"GET"),children:"vscode"}),e.jsx(v,{type:"link",onClick:()=>M("start",n.id).then(()=>C()),children:"启动"}),e.jsx(v,{type:"link",onClick:()=>{u(n.id??null)},disabled:!p,children:"日志"}),e.jsx(v,{type:"link",onClick:()=>M("restart",n.id).then(()=>C()),children:"重启"}),e.jsx(v,{type:"link",onClick:()=>M("stop",n.id),children:"关闭"})]})]})}}],re=a=>{var n;return e.jsx(F,{pagination:!1,dataSource:((n=a.nodeServers)==null?void 0:n.map(p=>({...p,key:p.id})))??[],rowKey:"id",columns:_})};function G(a){const{postServerIds:n}=a;if(!n||n.length===0)return null;const p=n.map(d=>({...c[d],key:d}));return e.jsx(F,{pagination:!1,dataSource:p,columns:_,...n.length>0&&{expandable:{expandedRowRender:G,defaultExpandedRowKeys:n}}})}const[ne,P]=x.useState(!1),[$,K]=x.useState(),[I]=R.useForm(),[se,L]=x.useState(!1);return e.jsxs("div",{children:[e.jsxs(b,{className:"c1ru92bi",children:[e.jsx(oe,{options:["项目分组","服务分组"],defaultValue:h?"项目分组":"服务分组",onChange:a=>{T(a==="项目分组")}}),h&&e.jsxs(e.Fragment,{children:[e.jsx(v,{onClick:()=>{P(!0),I.resetFields()},type:"primary",children:"添加项目"}),e.jsx(v,{onClick:()=>{L(!0)},type:"primary",children:"整体编辑服务"})]}),e.jsx(v,{onClick:()=>{w.confirm({title:"是否关闭控制台？",icon:e.jsx(ae,{}),content:"关闭后台运行进程",onOk(){S("/api/npmProjects/shutdown","PUT")}})},type:"link",children:"关闭控制台"})]}),!h&&i.length>0&&e.jsx(F,{pagination:!1,dataSource:i.map(a=>({...a,key:a.id})),columns:_,expandable:{expandedRowRender:G,defaultExpandedRowKeys:i.map(a=>a.id)}}),h&&(t!=null&&t.length)?e.jsx(F,{pagination:!1,dataSource:t.map(a=>({...a,key:a.id})),expandable:{expandedRowRender:re,defaultExpandedRowKeys:t==null?void 0:t.map(a=>a.id)},columns:[{dataIndex:"path",title:"路径"},{title:"操作",render:(a,n)=>e.jsxs(b,{children:[e.jsx(H,{title:"删除项目",description:"是否要删除项目",onConfirm:()=>{S(`/api/npmProjects/${n.id}`,"DELETE").then(()=>{y.success("删除成功"),r()})},children:e.jsx(v,{type:"link",children:"删除"})}),e.jsx(v,{type:"primary",onClick:()=>{K(n),P(!0),I.setFieldValue("path",n.path)},children:"编辑"}),e.jsx(v,{type:"primary",onClick:()=>{K(n),P(!0),I.setFieldValue("path",n.path)},children:"添加服务"})]})}]}):null,e.jsx(w,{open:ne,title:`${$?"编辑":"添加"}项目`,onCancel:()=>P(!1),onOk:()=>{I.validateFields().then(a=>{if(I.resetFields(),$){S("/api/npmProjects","PUT",{path:a.path,id:$.id}).then(()=>{r(),P(!1),y.success("修改项目成功")});return}S("/api/npmProjects","POST",a).then(()=>{r(),P(!1),y.success("创建项目成功")})})},children:e.jsx(R,{form:I,layout:"vertical",name:"path",children:e.jsx(R.Item,{name:"path",label:"path",rules:[{required:!0,message:"Please input the path of project"}],children:e.jsx(O,{})})})}),e.jsx(w,{title:"编辑或添加服务",open:se,onCancel:()=>{L(!1)},okText:"保存",cancelText:"取消",onOk:()=>{const a=p=>p.map(d=>{var g;const m={...(g=d.form)==null?void 0:g.getFieldsValue(!0)};return m.postServers??(m.postServers=[]),m.portConfigFileRelativePath=encodeURIComponent(m.portConfigFileRelativePath),m.portReg=encodeURIComponent(m.portReg),m.postServers=a(d.postServers),m}),n=a(s);S("/api/nodeServers/batch","POST",n).then(()=>{y.success("保存服务成功"),r(),L(!1)})},width:"80vw",children:e.jsx(ee,{nodeServerStates:s,rootNodeServerStates:s,updateRootNodeServerStates:l})}),e.jsx(w,{open:o!==null&&j!==void 0,onCancel:()=>u(null),footer:null,title:e.jsxs(b,{className:"cckpddg",children:[q(o,o?(A=c[o])==null?void 0:A.name:""),e.jsx(v,{type:"link",onClick:()=>S(`/api/nodeServers/clearLog/${o}`,"GET").then(()=>te()),children:"清除日志"})]}),width:"80vw",classNames:{body:"bclyprh"},centered:!0,children:e.jsx(Ne,{rawLogs:E})})]})}const Oe=t=>fetch(t).then(r=>r.json().then(s=>s.data));function we(t){switch(t){case"en-US":return U(()=>import("./en-US-WwZ3Ju4A.js"),__vite__mapDeps([])).then(r=>r.default);case"zh-CN":return U(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(r=>r.default);default:return U(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(r=>r.default)}}const D=ce()(t=>({setLocale:async r=>{const s=await we(r);t({locale:r,messages:s})}})),Fe=()=>{const t=D(l=>l.locale),r=D(l=>l.messages),s=D(l=>l.setLocale);return x.useLayoutEffect(()=>{t||s("zh-CN")},[t,s]),!r||!t?null:e.jsx(he,{locale:t,messages:r,children:e.jsx(me,{value:{fetcher:Oe,revalidateOnFocus:!0,revalidateOnMount:!0,revalidateOnReconnect:!0,revalidateIfStale:!1},children:e.jsx(fe,{locale:{locale:t},theme:{token:{colorPrimary:"#7939cb",borderRadius:2,fontSize:16}},children:e.jsx(Q,{style:{minHeight:"100vh"},children:e.jsx(Q,{children:e.jsx(ve,{children:e.jsxs(xe,{children:[e.jsx(X,{path:"/nodeServerManagement",element:e.jsx(ke,{})}),e.jsx(X,{path:"*",element:e.jsx(je,{to:"/nodeServerManagement"})})]})})})})})})})};de(document.getElementById("root")).render(e.jsx(ue.StrictMode,{children:e.jsx(pe,{children:e.jsx(Fe,{})})}));
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
