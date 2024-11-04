import{u as X,j as e,C as K,B as x,S as b,r as g,F as R,I as O,a as A,s as P,b as ne,M as k,E as oe,T as F,P as W,c as ae,d as z,D as ie,e as le,f as ce,R as de,g as ue,h as pe,i as me,k as he,L as H,l as fe,m as ve,n as J,N as xe}from"./vendor-bv2W42_R.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))c(l);new MutationObserver(l=>{for(const a of l)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&c(i)}).observe(document,{childList:!0,subtree:!0});function o(l){const a={};return l.integrity&&(a.integrity=l.integrity),l.referrerPolicy&&(a.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?a.credentials="include":l.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(l){if(l.ep)return;l.ep=!0;const a=o(l);fetch(l.href,a)}})();const ge="modulepreload",je=function(t){return"/"+t},Q={},D=function(s,o,c){let l=Promise.resolve();if(o&&o.length>0){const a=document.getElementsByTagName("link");l=Promise.all(o.map(i=>{if(i=je(i),i in Q)return;Q[i]=!0;const p=i.endsWith(".css"),v=p?'[rel="stylesheet"]':"";if(!!c)for(let S=a.length-1;S>=0;S--){const y=a[S];if(y.href===i&&(!p||y.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${i}"]${v}`))return;const j=document.createElement("link");if(j.rel=p?"stylesheet":ge,p||(j.as="script",j.crossOrigin=""),j.href=i,document.head.appendChild(j),p)return new Promise((S,y)=>{j.addEventListener("load",S),j.addEventListener("error",()=>y(new Error(`Unable to preload CSS for ${i}`)))})}))}return l.then(()=>s()).catch(a=>{const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=a,window.dispatchEvent(i),!i.defaultPrevented)throw a})},Y="http://localhost:9981",Z=()=>X(`${Y}/api/npmProjects`),Se=[{name:"UiServer",value:{name:"UI-Server",portConfigFileRelativePath:".env",portReg:"RENDER_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BffServer",value:{name:"BFF-Server",portConfigFileRelativePath:".env",portReg:"BFF_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BuildServer",value:{portConfigFileRelativePath:"project.js",portReg:"port:\\s*(\\d+)",command:"npm run build",postServers:[]}}];function Re({rootNodeServerStates:t,updateRootNodeServerStates:s,nodeServerState:o}){const[c,l]=g.useState(),{data:a}=Z(),[i]=R.useForm();return g.useEffect(()=>{o.form=i},[o,i]),e.jsxs(R,{form:i,layout:"horizontal",initialValues:o,children:[e.jsx(R.Item,{name:"name",label:"名称",rules:[{required:!0,message:"输入服务名称"}],children:e.jsx(O,{})}),e.jsx(R.Item,{name:"command",label:"npm 命令",rules:[{required:!0,message:"输入npm启动命令"},{pattern:/^npm /,message:"以npm 开头"}],children:e.jsx(O,{})}),e.jsx(R.Item,{name:"npmProjectId",label:"所属项目",rules:[{required:!0,message:"输入npm启动命令"}],children:e.jsx(A,{value:c,onChange:l,children:a==null?void 0:a.map(p=>e.jsx(A.Option,{value:p.id,children:p.path},p.id))})}),e.jsx(R.Item,{name:"portConfigFileRelativePath",label:"port配置文件相对地址",rules:[{required:!0,message:"输入port配置文件相对地址"}],children:e.jsx(O,{})}),e.jsx(R.Item,{name:"portReg",label:"port配置文件正则",rules:[{required:!0,message:"输入正则"},{validator:(p,v)=>{try{return new RegExp(String(v)),Promise.resolve()}catch{return Promise.reject(new Error("not valid RegExp"))}}}],children:e.jsx(O,{placeholder:"输入正则，必须包含括号以获取端口"})}),e.jsx(R.Item,{label:"子服务",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",rowGap:16},children:e.jsx(ee,{nodeServerStates:o.postServers??[],prevNodeServerState:o,rootNodeServerStates:t,updateRootNodeServerStates:s})})})]})}let Ce=0;function ee({rootNodeServerStates:t,updateRootNodeServerStates:s,nodeServerStates:o,prevNodeServerState:c}){const l=()=>{let a=[...o],i=c;for(;i;){i.postServers=a;const p=i.prevServer,v=(p==null?void 0:p.postServers)??t;v[v.indexOf(i)]={...i},a=[...v],i=p}s(a)};return e.jsxs(K,{children:[o.map((a,i)=>e.jsxs(K,{className:"cm1s535",children:[e.jsx(Re,{nodeServerState:a,updateRootNodeServerStates:s,rootNodeServerStates:t},a.id??a.tmpId),e.jsx(x,{onClick:()=>{o.splice(i,1),l()},children:"删除服务"})]})),e.jsx(b,{className:"c1lck55g",children:Se.map(a=>e.jsxs(x,{type:"primary",onClick:()=>{o.push({...a.value,tmpId:`tmp${Ce++}`,prevServer:c}),l()},children:[a.name,"模板"]}))})]})}var E=(t=>(t.CLOSED="CLOSED",t.COMPILING="COMPILING",t.ERROR="ERROR",t.SUCCESS="SUCCESS",t.UNKNOWN="UNKNOWN",t))(E||{});function ye(t,s=500){const[o,c]=g.useState(t);return g.useLayoutEffect(()=>{const l=window.setTimeout(()=>c(t),s);return()=>window.clearTimeout(l)},[t,s]),o}function Ee({value:t,onChange:s,...o}){const[c,l]=g.useState(t),a=ye(c);return g.useEffect(()=>{s(a)},[s,a]),e.jsx(O,{...o,value:c,onChange:i=>{var p;l((p=i.target.value)==null?void 0:p.trim())}})}const Pe="http://localhost:9981",C=async(t,s,o)=>{try{const c=await window.fetch(`${Pe}${t}`,{method:s,...o&&{body:typeof o=="string"?o:JSON.stringify(o)},headers:{"Content-Type":"application/json"}}),l=await c.json();if(c.status!==200)throw new Error(l==null?void 0:l.data);return l.data}catch(c){throw P.error(c==null?void 0:c.message),c}};function Ne({rawLogs:t}){return e.jsx("pre",{className:"c19i87wg",children:t})}const Ie=t=>fetch(t,{method:"GET"}).then(s=>{var o,c;return(c=(o=s.body)==null?void 0:o.getReader())==null?void 0:c.read()}).then(s=>new TextDecoder().decode(s==null?void 0:s.value).replace(/\[1m/g,"").replace(/\\x1B/g,"").replace(/\[22m/g,"").replace(/\[32m/g,"").replace(/\[33m/g,"").replace(/\[39m/g,"").replace(//g,""));function we(){var q,G;const{data:t,mutate:s}=Z(),[o,c]=g.useState([]),{nodeIdMapNodeServerResponse:l,rootNodeServerResponses:a}=g.useMemo(()=>{const n={},r={},d=[],u=[];return t==null||t.forEach(m=>{m.nodeServers.forEach(h=>{const f={...h};f.portConfigFileRelativePath=decodeURIComponent(f.portConfigFileRelativePath),f.portReg=decodeURIComponent(f.portReg);const w={...f,postServers:[]};n[f.id]=w,r[f.id]=f,f.prevServerId||(u.push(f),d.push(w))})}),Object.values(n).forEach(m=>{var f;const h=m;h.prevServer=h.prevServerId?n[h.prevServerId]:void 0,h.postServers=((f=h.postServerIds)==null?void 0:f.map(w=>n[w]))??[]}),c(d),{rootNodeServerResponses:u,nodeIdMapNodeServerResponse:r}},[t]),[i,p]=g.useState(null),[v,T]=g.useState(!1),{data:j}=X(`${Y}/api/nodeServers/runningInfos`,Ie,{...!v&&{refreshInterval:2e3}}),S=g.useMemo(()=>{const n={};let r=0;return j==null||j.replace(/__\|id:(\d+)\|status:([^|]+)\|__/g,(d,u,m,h)=>(n[Number(u)]={log:j.slice(r,h),status:m,id:Number(u)},r=h+d.length,"")),n},[j]),y=(n,r)=>C(`/api/nodeServers/${n}/${r}`,"PUT").then(()=>{P.success(`${n}指令已发送`)}),$=(n,r)=>{var m,h;let d="",u="processing";if(!S||n===void 0||n===null||((m=S[n])==null?void 0:m.status)===void 0)d="未开启",u="grey";else{const f=(h=S[n])==null?void 0:h.status;switch(f){case E.CLOSED:d="已关闭",u="grey";break;case E.ERROR:d="错误",u="error";break;case E.COMPILING:d="编译中..",u="processing";break;case E.SUCCESS:d="成功",u="success";break;case E.UNKNOWN:d="未知",u="warning";break;default:{const w=f;throw new Error(w)}}}return e.jsxs(b,{className:"c5s1knt",children:[e.jsx("div",{children:r??""}),e.jsx(ae,{bordered:!1,color:u,children:d})]})},L=[{title:"名称",dataIndex:"name",render:(n,r)=>$(r.id,r.name)},{title:"命令",dataIndex:"command"},{title:"地址",render:(n,r)=>{var u;const d=(u=t==null?void 0:t.find(m=>m.id===r.npmProjectId))==null?void 0:u.path;return r.errorField==="PROJECT_PATH"?e.jsx(z,{title:r.errorMsg,children:e.jsx("span",{className:"cg3n9dw",children:d})}):d}},{title:"端口",dataIndex:"port",render:(n,r)=>{if(r.errorMsg)return e.jsx(z,{title:r.errorMsg,children:e.jsx("span",{className:"c1cph1bk",children:r.errorMsg})});const d=Object.values(l).find(u=>u.id!==r.id&&u.port===n);return e.jsx(Ee,{value:n,style:d?{color:"red"}:{},onChange:u=>{String(u)!==String(n)&&C(`/api/nodeServers/changePort/${r.id}/${u}`,"PUT").then(s)}})}},{title:"操作",render:(n,r)=>{const d=S?S[r.id]:null;return e.jsxs(b,{children:[v&&e.jsx(W,{title:"删除服务",description:"是否要删除服务",onConfirm:()=>{C(`/api/nodeServers/${r.id}`,"DELETE").then(()=>{P.success("删除成功"),s()})},children:e.jsx(x,{type:"link",children:"删除"})}),!v&&e.jsxs(ie,{disabled:!!r.errorMsg,children:[e.jsx(x,{type:"link",onClick:()=>C(`/api/npmProjects/vscode/${r.npmProjectId}`,"GET"),children:"vscode"}),(!d||d.status===E.CLOSED)&&e.jsx(x,{type:"link",onClick:()=>y("start",r.id),children:"启动"}),d&&e.jsxs(e.Fragment,{children:[e.jsx(x,{type:"link",onClick:()=>p(r.id??null),children:"日志"}),e.jsx(x,{type:"link",onClick:()=>y("restart",r.id),children:"重启"}),d.status!==E.CLOSED&&e.jsx(x,{type:"link",onClick:()=>y("stop",r.id),children:"关闭"})]})]})]})}}],te=n=>{var r;return e.jsx(F,{pagination:!1,dataSource:((r=n.nodeServers)==null?void 0:r.map(d=>({...d,key:d.id})))??[],rowKey:"id",columns:L})};function B(n){const{postServerIds:r}=n;if(!r||r.length===0)return null;const d=r.map(u=>({...l[u],key:u}));return e.jsx(F,{pagination:!1,dataSource:d,columns:L,...r.length>0&&{expandable:{expandedRowRender:B,defaultExpandedRowKeys:r}}})}const[re,N]=g.useState(!1),[_,V]=g.useState(),[I]=R.useForm(),[se,M]=g.useState(!1);return e.jsxs("div",{children:[e.jsxs(b,{className:"c1oriuqi",children:[e.jsx(ne,{options:["项目分组","服务分组"],defaultValue:v?"项目分组":"服务分组",onChange:n=>{T(n==="项目分组")}}),v&&e.jsxs(e.Fragment,{children:[e.jsx(x,{onClick:()=>{N(!0),I.resetFields()},type:"primary",children:"添加项目"}),e.jsx(x,{onClick:()=>{M(!0)},type:"primary",children:"整体编辑服务"})]}),e.jsx(x,{onClick:()=>{k.confirm({title:"是否关闭控制台？",icon:e.jsx(oe,{}),content:"关闭后台运行进程",onOk(){C("/api/npmProjects/shutdown","PUT")}})},type:"link",children:"关闭控制台"})]}),!v&&a.length>0&&e.jsx(F,{pagination:!1,dataSource:a.map(n=>({...n,key:n.id})),columns:L,expandable:{expandedRowRender:B,defaultExpandedRowKeys:a.map(n=>n.id)}}),v&&(t!=null&&t.length)?e.jsx(F,{pagination:!1,dataSource:t.map(n=>({...n,key:n.id})),expandable:{expandedRowRender:te,defaultExpandedRowKeys:t==null?void 0:t.map(n=>n.id)},columns:[{dataIndex:"path",title:"路径"},{title:"操作",render:(n,r)=>e.jsxs(b,{children:[e.jsx(W,{title:"删除项目",description:"是否要删除项目",onConfirm:()=>{C(`/api/npmProjects/${r.id}`,"DELETE").then(()=>{P.success("删除成功"),s()})},children:e.jsx(x,{type:"link",children:"删除"})}),e.jsx(x,{type:"primary",onClick:()=>{V(r),N(!0),I.setFieldValue("path",r.path)},children:"编辑"}),e.jsx(x,{type:"primary",onClick:()=>{V(r),N(!0),I.setFieldValue("path",r.path)},children:"添加服务"})]})}]}):null,e.jsx(k,{open:re,title:`${_?"编辑":"添加"}项目`,onCancel:()=>N(!1),onOk:()=>{I.validateFields().then(n=>{if(I.resetFields(),_){C("/api/npmProjects","PUT",{path:n.path,id:_.id}).then(()=>{s(),N(!1),P.success("修改项目成功")});return}C("/api/npmProjects","POST",n).then(()=>{s(),N(!1),P.success("创建项目成功")})})},children:e.jsx(R,{form:I,layout:"vertical",name:"path",children:e.jsx(R.Item,{name:"path",label:"path",rules:[{required:!0,message:"Please input the path of project"}],children:e.jsx(O,{})})})}),e.jsx(k,{title:"编辑或添加服务",open:se,onCancel:()=>{M(!1)},okText:"保存",cancelText:"取消",onOk:()=>{const n=d=>d.map(u=>{var h;const m={...(h=u.form)==null?void 0:h.getFieldsValue(!0)};return m.postServers??(m.postServers=[]),m.portConfigFileRelativePath=encodeURIComponent(m.portConfigFileRelativePath),m.portReg=encodeURIComponent(m.portReg),m.postServers=n(u.postServers),m}),r=n(o);C("/api/nodeServers/batch","POST",r).then(()=>{P.success("保存服务成功"),s(),M(!1)})},width:"80vw",children:e.jsx(ee,{nodeServerStates:o,rootNodeServerStates:o,updateRootNodeServerStates:c})}),e.jsx(k,{open:i!==null&&S!==void 0,onCancel:()=>p(null),footer:null,title:e.jsxs(b,{className:"c4u9m77",children:[$(i,i?(q=l[i])==null?void 0:q.name:""),e.jsx(x,{type:"link",onClick:()=>C(`/api/nodeServers/clearLog/${i}`,"GET"),children:"清除日志"})]}),width:"80vw",classNames:{body:"b1ru92bi"},centered:!0,children:e.jsx(Ne,{rawLogs:(G=S[i??-1])==null?void 0:G.log})})]})}const be=t=>fetch(t).then(s=>s.json().then(o=>o.data));function Oe(t){switch(t){case"en-US":return D(()=>import("./en-US-WwZ3Ju4A.js"),__vite__mapDeps([])).then(s=>s.default);case"zh-CN":return D(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(s=>s.default);default:return D(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(s=>s.default)}}const U=le()(t=>({setLocale:async s=>{const o=await Oe(s);t({locale:s,messages:o})}})),ke=()=>{const t=U(c=>c.locale),s=U(c=>c.messages),o=U(c=>c.setLocale);return g.useLayoutEffect(()=>{t||o("zh-CN")},[t,o]),!s||!t?null:e.jsx(pe,{locale:t,messages:s,children:e.jsx(me,{value:{fetcher:be,revalidateOnFocus:!0,revalidateOnMount:!0,revalidateOnReconnect:!0,revalidateIfStale:!1},children:e.jsx(he,{locale:{locale:t},theme:{token:{colorPrimary:"#7939cb",borderRadius:2,fontSize:16}},children:e.jsx(H,{style:{minHeight:"100vh"},children:e.jsx(H,{children:e.jsx(fe,{children:e.jsxs(ve,{children:[e.jsx(J,{path:"/nodeServerManagement",element:e.jsx(we,{})}),e.jsx(J,{path:"*",element:e.jsx(xe,{to:"/nodeServerManagement"})})]})})})})})})})};ce(document.getElementById("root")).render(e.jsx(de.StrictMode,{children:e.jsx(ue,{children:e.jsx(ke,{})})}));
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
