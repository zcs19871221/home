import{u as B,j as e,C as W,B as v,S as k,r as j,F as R,I as b,a as z,s as E,b as ne,M as w,E as oe,T as F,P as H,c as ae,d as J,D as le,e as ie,f as ce,R as de,g as ue,h as pe,i as me,k as he,L as Q,l as fe,m as ve,n as X,N as xe}from"./vendor-bv2W42_R.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))i(c);new MutationObserver(c=>{for(const l of c)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function n(c){const l={};return c.integrity&&(l.integrity=c.integrity),c.referrerPolicy&&(l.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?l.credentials="include":c.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function i(c){if(c.ep)return;c.ep=!0;const l=n(c);fetch(c.href,l)}})();const je="modulepreload",ge=function(t){return"/"+t},Y={},U=function(r,n,i){let c=Promise.resolve();if(n&&n.length>0){const l=document.getElementsByTagName("link");c=Promise.all(n.map(o=>{if(o=ge(o),o in Y)return;Y[o]=!0;const p=o.endsWith(".css"),x=p?'[rel="stylesheet"]':"";if(!!i)for(let C=l.length-1;C>=0;C--){const P=l[C];if(P.href===o&&(!p||P.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${o}"]${x}`))return;const h=document.createElement("link");if(h.rel=p?"stylesheet":je,p||(h.as="script",h.crossOrigin=""),h.href=o,document.head.appendChild(h),p)return new Promise((C,P)=>{h.addEventListener("load",C),h.addEventListener("error",()=>P(new Error(`Unable to preload CSS for ${o}`)))})}))}return c.then(()=>r()).catch(l=>{const o=new Event("vite:preloadError",{cancelable:!0});if(o.payload=l,window.dispatchEvent(o),!o.defaultPrevented)throw l})},V="http://localhost:9981",Z=()=>B(`${V}/api/npmProjects`,{revalidateIfStale:!1,revalidateOnMount:!0,revalidateOnFocus:!1,revalidateOnReconnect:!1}),Se=[{name:"UiServer",value:{name:"UI-Server",portConfigFileRelativePath:".env",portReg:"RENDER_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BffServer",value:{name:"BFF-Server",portConfigFileRelativePath:".env",portReg:"BFF_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BuildServer",value:{portConfigFileRelativePath:"project.js",portReg:"port:\\s*(\\d+)",command:"npm run build",postServers:[]}}];function Re({rootNodeServerStates:t,updateRootNodeServerStates:r,nodeServerState:n}){const[i,c]=j.useState(),{data:l}=Z(),[o]=R.useForm();return j.useEffect(()=>{n.form=o},[n,o]),e.jsxs(R,{form:o,layout:"horizontal",initialValues:n,children:[e.jsx(R.Item,{name:"name",label:"名称",rules:[{required:!0,message:"输入服务名称"}],children:e.jsx(b,{})}),e.jsx(R.Item,{name:"command",label:"npm 命令",rules:[{required:!0,message:"输入npm启动命令"},{pattern:/^npm /,message:"以npm 开头"}],children:e.jsx(b,{})}),e.jsx(R.Item,{name:"npmProjectId",label:"所属项目",rules:[{required:!0,message:"输入npm启动命令"}],children:e.jsx(z,{value:i,onChange:c,children:l==null?void 0:l.map(p=>e.jsx(z.Option,{value:p.id,children:p.path},p.id))})}),e.jsx(R.Item,{name:"portConfigFileRelativePath",label:"port配置文件相对地址",rules:[{required:!0,message:"输入port配置文件相对地址"}],children:e.jsx(b,{})}),e.jsx(R.Item,{name:"portReg",label:"port配置文件正则",rules:[{required:!0,message:"输入正则"},{validator:(p,x)=>{try{return new RegExp(String(x)),Promise.resolve()}catch{return Promise.reject(new Error("not valid RegExp"))}}}],children:e.jsx(b,{placeholder:"输入正则，必须包含括号以获取端口"})}),e.jsx(R.Item,{label:"子服务",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",rowGap:16},children:e.jsx(ee,{nodeServerStates:n.postServers??[],prevNodeServerState:n,rootNodeServerStates:t,updateRootNodeServerStates:r})})})]})}let Ce=0;function ee({rootNodeServerStates:t,updateRootNodeServerStates:r,nodeServerStates:n,prevNodeServerState:i}){const c=()=>{let l=[...n],o=i;for(;o;){o.postServers=l;const p=o.prevServer,x=(p==null?void 0:p.postServers)??t;x[x.indexOf(o)]={...o},l=[...x],o=p}r(l)};return e.jsxs(W,{children:[n.map((l,o)=>e.jsxs(W,{className:"cm1s535",children:[e.jsx(Re,{nodeServerState:l,updateRootNodeServerStates:r,rootNodeServerStates:t},l.id??l.tmpId),e.jsx(v,{onClick:()=>{n.splice(o,1),c()},children:"删除服务"})]})),e.jsx(k,{className:"c1lck55g",children:Se.map(l=>e.jsxs(v,{type:"primary",onClick:()=>{n.push({...l.value,tmpId:`tmp${Ce++}`,prevServer:i}),c()},children:[l.name,"模板"]}))})]})}var y=(t=>(t.CLOSED="CLOSED",t.COMPILING="COMPILING",t.ERROR="ERROR",t.SUCCESS="SUCCESS",t.UNKNOWN="UNKNOWN",t))(y||{});function ye(t,r=500){const[n,i]=j.useState(t);return j.useLayoutEffect(()=>{const c=window.setTimeout(()=>i(t),r);return()=>window.clearTimeout(c)},[t,r]),n}function Ee({value:t,onChange:r,...n}){const[i,c]=j.useState(t),l=ye(i);return j.useEffect(()=>{r(l)},[r,l]),e.jsx(b,{...n,value:i,onChange:o=>{var p;c((p=o.target.value)==null?void 0:p.trim())}})}const Pe="http://localhost:9981",S=async(t,r,n)=>{try{const i=await window.fetch(`${Pe}${t}`,{method:r,...n&&{body:typeof n=="string"?n:JSON.stringify(n)},headers:{"Content-Type":"application/json"}}),c=await i.json();if(i.status!==200)throw new Error(c==null?void 0:c.data);return c.data}catch(i){throw E.error(i==null?void 0:i.message),i}};function Ie({rawLogs:t}){const r=[];let n=0;return t==null||t.replace(/ERROR in ([^(]+)\((\d+),(\d+)\)/g,(i,c,l,o,p)=>(r.push(t.slice(n,p)),n=p+i.length,r.push(e.jsx(v,{className:"c19i87wg",type:"link",onClick:()=>{S("/api/npmProjects/vscodeError","PUT",encodeURIComponent(`${c}:${l}:${o}`))},target:"_blank",children:i})),i)),t&&r.push(t.slice(n)),e.jsx("pre",{className:"c5s1knt",children:r})}const Ne=t=>fetch(t,{method:"GET"}).then(r=>{var n,i;return(i=(n=r.body)==null?void 0:n.getReader())==null?void 0:i.read()}).then(r=>new TextDecoder().decode(r==null?void 0:r.value).replace(/\[1m/g,"").replace(/\\x1B/g,"").replace(/\[22m/g,"").replace(/\[32m/g,"").replace(/\[33m/g,"").replace(/\[39m/g,"").replace(//g,""));function Oe(){var A;const{data:t,mutate:r}=Z(),[n,i]=j.useState([]),{nodeIdMapNodeServerResponse:c,rootNodeServerResponses:l}=j.useMemo(()=>{const a={},s={},d=[],u=[];return t==null||t.forEach(m=>{m.nodeServers.forEach(g=>{const f={...g};f.portConfigFileRelativePath=decodeURIComponent(f.portConfigFileRelativePath),f.portReg=decodeURIComponent(f.portReg);const O={...f,postServers:[]};a[f.id]=O,s[f.id]=f,f.prevServerId||(u.push(f),d.push(O))})}),Object.values(a).forEach(m=>{var f;const g=m;g.prevServer=g.prevServerId?a[g.prevServerId]:void 0,g.postServers=((f=g.postServerIds)==null?void 0:f.map(O=>a[O]))??[]}),i(d),{rootNodeServerResponses:u,nodeIdMapNodeServerResponse:s}},[t]),[o,p]=j.useState(null),[x,T]=j.useState(!1),{data:h,mutate:C}=B(`${V}/api/nodeServers/runningInfos`,{...!x&&{refreshInterval:2e3}});console.log(h);const{data:P}=B(o?`${V}/api/nodeServers/logs/${o}`:void 0,Ne,{...!o!==null&&{refreshInterval:2e3}});j.useEffect(()=>{C()},[C]);const M=(a,s)=>S(`/api/nodeServers/${a}/${s}`,"PUT").then(()=>{E.success(`${a}指令已发送`)}),q=(a,s)=>{var m,g;let d="",u="processing";if(console.log(h,a),!h||a===void 0||a===null||((m=h[a])==null?void 0:m.status)===void 0)d="未开启",u="grey";else{const f=(g=h[a])==null?void 0:g.status;switch(f){case y.CLOSED:d="已关闭",u="grey";break;case y.ERROR:d="错误",u="error";break;case y.COMPILING:d="编译中..",u="processing";break;case y.SUCCESS:d="成功",u="success";break;case y.UNKNOWN:d="未知",u="warning";break;default:{const O=f;throw new Error(O)}}}return e.jsxs(k,{className:"cg3n9dw",children:[e.jsx("div",{children:s??""}),e.jsx(ae,{bordered:!1,color:u,children:d})]})},_=[{title:"名称",dataIndex:"name",render:(a,s)=>q(s.id,s.name)},{title:"命令",dataIndex:"command"},{title:"地址",render:(a,s)=>{var u;const d=(u=t==null?void 0:t.find(m=>m.id===s.npmProjectId))==null?void 0:u.path;return s.errorField==="PROJECT_PATH"?e.jsx(J,{title:s.errorMsg,children:e.jsx("span",{className:"c1cph1bk",children:d})}):d}},{title:"端口",dataIndex:"port",render:(a,s)=>{if(s.errorMsg)return e.jsx(J,{title:s.errorMsg,children:e.jsx("span",{className:"c1oriuqi",children:s.errorMsg})});const d=Object.values(c).find(u=>u.id!==s.id&&u.port===a);return e.jsx(Ee,{value:a,style:d?{color:"red"}:{},onChange:u=>{String(u)!==String(a)&&S(`/api/nodeServers/changePort/${s.id}/${u}`,"PUT").then(r)}})}},{title:"操作",render:(a,s)=>{const d=h?h[s.id]:null;return e.jsxs(k,{children:[x&&e.jsx(H,{title:"删除服务",description:"是否要删除服务",onConfirm:()=>{S(`/api/nodeServers/${s.id}`,"DELETE").then(()=>{E.success("删除成功"),r()})},children:e.jsx(v,{type:"link",children:"删除"})}),!x&&e.jsxs(le,{disabled:!!s.errorMsg,children:[e.jsx(v,{type:"link",onClick:()=>S(`/api/npmProjects/vscode/${s.npmProjectId}`,"GET"),children:"vscode"}),(!d||d.status===y.CLOSED)&&e.jsx(v,{type:"link",onClick:()=>M("start",s.id),children:"启动"}),d&&e.jsxs(e.Fragment,{children:[e.jsx(v,{type:"link",onClick:()=>p(s.id??null),children:"日志"}),e.jsx(v,{type:"link",onClick:()=>M("restart",s.id),children:"重启"}),d.status!==y.CLOSED&&e.jsx(v,{type:"link",onClick:()=>M("stop",s.id),children:"关闭"})]})]})]})}}],te=a=>{var s;return e.jsx(F,{pagination:!1,dataSource:((s=a.nodeServers)==null?void 0:s.map(d=>({...d,key:d.id})))??[],rowKey:"id",columns:_})};function G(a){const{postServerIds:s}=a;if(!s||s.length===0)return null;const d=s.map(u=>({...c[u],key:u}));return e.jsx(F,{pagination:!1,dataSource:d,columns:_,...s.length>0&&{expandable:{expandedRowRender:G,defaultExpandedRowKeys:s}}})}const[re,I]=j.useState(!1),[L,K]=j.useState(),[N]=R.useForm(),[se,$]=j.useState(!1);return e.jsxs("div",{children:[e.jsxs(k,{className:"c4u9m77",children:[e.jsx(ne,{options:["项目分组","服务分组"],defaultValue:x?"项目分组":"服务分组",onChange:a=>{T(a==="项目分组")}}),x&&e.jsxs(e.Fragment,{children:[e.jsx(v,{onClick:()=>{I(!0),N.resetFields()},type:"primary",children:"添加项目"}),e.jsx(v,{onClick:()=>{$(!0)},type:"primary",children:"整体编辑服务"})]}),e.jsx(v,{onClick:()=>{w.confirm({title:"是否关闭控制台？",icon:e.jsx(oe,{}),content:"关闭后台运行进程",onOk(){S("/api/npmProjects/shutdown","PUT")}})},type:"link",children:"关闭控制台"})]}),!x&&l.length>0&&e.jsx(F,{pagination:!1,dataSource:l.map(a=>({...a,key:a.id})),columns:_,expandable:{expandedRowRender:G,defaultExpandedRowKeys:l.map(a=>a.id)}}),x&&(t!=null&&t.length)?e.jsx(F,{pagination:!1,dataSource:t.map(a=>({...a,key:a.id})),expandable:{expandedRowRender:te,defaultExpandedRowKeys:t==null?void 0:t.map(a=>a.id)},columns:[{dataIndex:"path",title:"路径"},{title:"操作",render:(a,s)=>e.jsxs(k,{children:[e.jsx(H,{title:"删除项目",description:"是否要删除项目",onConfirm:()=>{S(`/api/npmProjects/${s.id}`,"DELETE").then(()=>{E.success("删除成功"),r()})},children:e.jsx(v,{type:"link",children:"删除"})}),e.jsx(v,{type:"primary",onClick:()=>{K(s),I(!0),N.setFieldValue("path",s.path)},children:"编辑"}),e.jsx(v,{type:"primary",onClick:()=>{K(s),I(!0),N.setFieldValue("path",s.path)},children:"添加服务"})]})}]}):null,e.jsx(w,{open:re,title:`${L?"编辑":"添加"}项目`,onCancel:()=>I(!1),onOk:()=>{N.validateFields().then(a=>{if(N.resetFields(),L){S("/api/npmProjects","PUT",{path:a.path,id:L.id}).then(()=>{r(),I(!1),E.success("修改项目成功")});return}S("/api/npmProjects","POST",a).then(()=>{r(),I(!1),E.success("创建项目成功")})})},children:e.jsx(R,{form:N,layout:"vertical",name:"path",children:e.jsx(R.Item,{name:"path",label:"path",rules:[{required:!0,message:"Please input the path of project"}],children:e.jsx(b,{})})})}),e.jsx(w,{title:"编辑或添加服务",open:se,onCancel:()=>{$(!1)},okText:"保存",cancelText:"取消",onOk:()=>{const a=d=>d.map(u=>{var g;const m={...(g=u.form)==null?void 0:g.getFieldsValue(!0)};return m.postServers??(m.postServers=[]),m.portConfigFileRelativePath=encodeURIComponent(m.portConfigFileRelativePath),m.portReg=encodeURIComponent(m.portReg),m.postServers=a(u.postServers),m}),s=a(n);S("/api/nodeServers/batch","POST",s).then(()=>{E.success("保存服务成功"),r(),$(!1)})},width:"80vw",children:e.jsx(ee,{nodeServerStates:n,rootNodeServerStates:n,updateRootNodeServerStates:i})}),e.jsx(w,{open:o!==null&&h!==void 0,onCancel:()=>p(null),footer:null,title:e.jsxs(k,{className:"c1ru92bi",children:[q(o,o?(A=c[o])==null?void 0:A.name:""),e.jsx(v,{type:"link",onClick:()=>S(`/api/nodeServers/clearLog/${o}`,"GET"),children:"清除日志"})]}),width:"80vw",classNames:{body:"bckpddg"},centered:!0,children:e.jsx(Ie,{rawLogs:P})})]})}const ke=t=>fetch(t).then(r=>r.json().then(n=>n.data));function be(t){switch(t){case"en-US":return U(()=>import("./en-US-WwZ3Ju4A.js"),__vite__mapDeps([])).then(r=>r.default);case"zh-CN":return U(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(r=>r.default);default:return U(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(r=>r.default)}}const D=ie()(t=>({setLocale:async r=>{const n=await be(r);t({locale:r,messages:n})}})),we=()=>{const t=D(i=>i.locale),r=D(i=>i.messages),n=D(i=>i.setLocale);return j.useLayoutEffect(()=>{t||n("zh-CN")},[t,n]),!r||!t?null:e.jsx(pe,{locale:t,messages:r,children:e.jsx(me,{value:{fetcher:ke,revalidateOnFocus:!0,revalidateOnMount:!0,revalidateOnReconnect:!0,revalidateIfStale:!1},children:e.jsx(he,{locale:{locale:t},theme:{token:{colorPrimary:"#7939cb",borderRadius:2,fontSize:16}},children:e.jsx(Q,{style:{minHeight:"100vh"},children:e.jsx(Q,{children:e.jsx(fe,{children:e.jsxs(ve,{children:[e.jsx(X,{path:"/nodeServerManagement",element:e.jsx(Oe,{})}),e.jsx(X,{path:"*",element:e.jsx(xe,{to:"/nodeServerManagement"})})]})})})})})})})};ce(document.getElementById("root")).render(e.jsx(de.StrictMode,{children:e.jsx(ue,{children:e.jsx(we,{})})}));
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
