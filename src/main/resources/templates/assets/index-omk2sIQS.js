import{u as ne,j as e,C as X,B as j,S as O,r as g,F as R,I as b,a as Y,s as I,b as he,M as k,E as me,T as L,P as Z,c as fe,d as ee,D as ve,e as xe,f as je,R as ge,g as Se,h as Re,i as Ce,k as ye,L as te,l as Ee,m as Pe,n as se,N as Ie}from"./vendor-bv2W42_R.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function l(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(i){if(i.ep)return;i.ep=!0;const a=l(i);fetch(i.href,a)}})();const we="modulepreload",Ne=function(t){return"/"+t},re={},B=function(o,l,c){let i=Promise.resolve();if(l&&l.length>0){const a=document.getElementsByTagName("link");i=Promise.all(l.map(n=>{if(n=Ne(n),n in re)return;re[n]=!0;const f=n.endsWith(".css"),v=f?'[rel="stylesheet"]':"";if(!!c)for(let P=a.length-1;P>=0;P--){const S=a[P];if(S.href===n&&(!f||S.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${v}`))return;const C=document.createElement("link");if(C.rel=f?"stylesheet":we,f||(C.as="script",C.crossOrigin=""),C.href=n,document.head.appendChild(C),f)return new Promise((P,S)=>{C.addEventListener("load",P),C.addEventListener("error",()=>S(new Error(`Unable to preload CSS for ${n}`)))})}))}return i.then(()=>o()).catch(a=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=a,window.dispatchEvent(n),!n.defaultPrevented)throw a})},q="http://localhost:9981",oe=()=>ne(`${q}/api/npmProjects`),Oe=[{name:"UiServer",value:{name:"UI-Server",portConfigFileRelativePath:".env",portReg:"RENDER_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BffServer",value:{name:"BFF-Server",portConfigFileRelativePath:".env",portReg:"BFF_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BuildServer",value:{portConfigFileRelativePath:"project.js",portReg:"port:\\s*(\\d+)",command:"npm run build",postServers:[]}}];function be({rootNodeServerStates:t,updateRootNodeServerStates:o,nodeServerState:l}){const[c,i]=g.useState(),{data:a}=oe(),[n]=R.useForm();return g.useEffect(()=>{l.form=n},[l,n]),e.jsxs(R,{form:n,layout:"horizontal",initialValues:l,children:[e.jsx(R.Item,{name:"name",label:"名称",rules:[{required:!0,message:"输入服务名称"}],children:e.jsx(b,{})}),e.jsx(R.Item,{name:"command",label:"npm 命令",rules:[{required:!0,message:"输入npm启动命令"},{pattern:/^npm /,message:"以npm 开头"}],children:e.jsx(b,{})}),e.jsx(R.Item,{name:"npmProjectId",label:"所属项目",rules:[{required:!0,message:"输入npm启动命令"}],children:e.jsx(Y,{value:c,onChange:i,children:a==null?void 0:a.map(f=>e.jsx(Y.Option,{value:f.id,children:f.path},f.id))})}),e.jsx(R.Item,{name:"portConfigFileRelativePath",label:"port配置文件相对地址",rules:[{required:!0,message:"输入port配置文件相对地址"}],children:e.jsx(b,{})}),e.jsx(R.Item,{name:"portReg",label:"port配置文件正则",rules:[{required:!0,message:"输入正则"},{validator:(f,v)=>{try{return new RegExp(String(v)),Promise.resolve()}catch{return Promise.reject(new Error("not valid RegExp"))}}}],children:e.jsx(b,{placeholder:"输入正则，必须包含括号以获取端口"})}),e.jsx(R.Item,{label:"子服务",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",rowGap:16},children:e.jsx(ae,{nodeServerStates:l.postServers??[],prevNodeServerState:l,rootNodeServerStates:t,updateRootNodeServerStates:o})})})]})}let ke=0;function ae({rootNodeServerStates:t,updateRootNodeServerStates:o,nodeServerStates:l,prevNodeServerState:c}){const i=()=>{let a=[...l],n=c;for(;n;){n.postServers=a;const f=n.prevServer,v=(f==null?void 0:f.postServers)??t;v[v.indexOf(n)]={...n},a=[...v],n=f}o(a)};return e.jsxs(X,{children:[l.map((a,n)=>e.jsxs(X,{className:"cm1s535",children:[e.jsx(be,{nodeServerState:a,updateRootNodeServerStates:o,rootNodeServerStates:t},a.id??a.tmpId),e.jsx(j,{onClick:()=>{l.splice(n,1),i()},children:"删除服务"})]})),e.jsx(O,{className:"c1lck55g",children:Oe.map(a=>e.jsxs(j,{type:"primary",onClick:()=>{l.push({...a.value,tmpId:`tmp${ke++}`,prevServer:c}),i()},children:[a.name,"模板"]}))})]})}var E=(t=>(t.CLOSED="CLOSED",t.COMPILING="COMPILING",t.ERROR="ERROR",t.SUCCESS="SUCCESS",t.UNKNOWN="UNKNOWN",t))(E||{});function Le(t,o=500){const[l,c]=g.useState(t);return g.useLayoutEffect(()=>{const i=window.setTimeout(()=>c(t),o);return()=>window.clearTimeout(i)},[t,o]),l}function Fe({value:t,onChange:o,...l}){const[c,i]=g.useState(t),a=Le(c);return g.useEffect(()=>{o(a)},[o,a]),e.jsx(b,{...l,value:c,onChange:n=>{var f;i((f=n.target.value)==null?void 0:f.trim())}})}const Te="http://localhost:9981",y=async(t,o,l)=>{try{const c=await window.fetch(`${Te}${t}`,{method:o,...l&&{body:JSON.stringify(l)},headers:{"Content-Type":"application/json"}}),i=await c.json();if(c.status!==200)throw new Error(i==null?void 0:i.data);return i.data}catch(c){throw I.error(c==null?void 0:c.message),c}};function Me({nodes:t}){return e.jsx("div",{className:"c19i87wg",children:t})}function _e(){var z,H,J;const{data:t,mutate:o}=oe(),[l,c]=g.useState([]),{nodeIdMapNodeServerResponse:i,rootNodeServerResponses:a}=g.useMemo(()=>{const r={},s={},d=[],u=[];return t==null||t.forEach(h=>{h.nodeServers.forEach(m=>{const p={...m};p.portConfigFileRelativePath=decodeURIComponent(p.portConfigFileRelativePath),p.portReg=decodeURIComponent(p.portReg);const x={...p,postServers:[]};r[p.id]=x,s[p.id]=p,p.prevServerId||(u.push(p),d.push(x))})}),Object.values(r).forEach(h=>{var p;const m=h;m.prevServer=m.prevServerId?r[m.prevServerId]:void 0,m.postServers=((p=m.postServerIds)==null?void 0:p.map(x=>r[x]))??[]}),c(d),{rootNodeServerResponses:u,nodeIdMapNodeServerResponse:s}},[t]),[n,f]=g.useState(null),[v,F]=g.useState(!1),[C,P]=g.useState({}),{data:S,mutate:G}=ne(`${q}/api/nodeServers/runningInfos`,{revalidateIfStale:!1,revalidateOnMount:!1,revalidateOnFocus:!1,revalidateOnReconnect:!1,onSuccess:async r=>{const s=Object.keys(r),d=await Promise.all(s.map(h=>fetch(`${q}/api/nodeServers/logs/${h}`,{method:"GET"}).then(m=>{var p,x;return(x=(p=m.body)==null?void 0:p.getReader())==null?void 0:x.read()}).then(m=>{const p=[];let x="";if(m!=null&&m.value){x=new TextDecoder().decode(m.value);let U=0;x.replace(/ERROR in ([^(]+)\((\d+),(\d+)\)/g,(D,de,ue,pe,Q)=>(p.push(x.slice(U,Q)),U=Q+D.length,p.push(e.jsxs("a",{className:"c5s1knt",href:`/api/vscodeError/${encodeURIComponent(`${de}:${ue}:${pe}`)}`,target:"_blank",children:["$",D]})),D)),p.push(x.slice(U))}return[p,x]}))),u={};d.forEach((h,m)=>{const p=s[m];u[p]={rawLogs:h[1],nodes:h[0]}}),P(u)},...!v&&{refreshInterval:1e3}}),T=(r,s)=>y(`/api/nodeServers/${r}/${s}`,"PUT").then(()=>{I.success(`${r}指令已发送`)}),K=(r,s)=>{var h,m;let d="",u="processing";if(!S||r===void 0||r===null||((h=S[r])==null?void 0:h.status)===void 0)d="未开启",u="grey";else{const p=(m=S[r])==null?void 0:m.status;switch(p){case E.CLOSED:d="已关闭",u="grey";break;case E.ERROR:d="错误",u="error";break;case E.COMPILING:d="编译中..",u="processing";break;case E.SUCCESS:d="成功",u="success";break;case E.UNKNOWN:d="未知",u="warning";break;default:{const x=p;throw new Error(x)}}}return e.jsxs(O,{className:"cg3n9dw",children:[e.jsx("div",{children:s??""}),e.jsx(fe,{bordered:!1,color:u,children:d})]})},M=[{title:"名称",dataIndex:"name",render:(r,s)=>K(s.id,s.name)},{title:"命令",dataIndex:"command"},{title:"地址",render:(r,s)=>{var u;const d=(u=t==null?void 0:t.find(h=>h.id===s.npmProjectId))==null?void 0:u.path;return s.errorField==="PROJECT_PATH"?e.jsx(ee,{title:s.errorMsg,children:e.jsx("span",{className:"c1cph1bk",children:d})}):d}},{title:"端口",dataIndex:"port",render:(r,s)=>{if(s.errorMsg)return e.jsx(ee,{title:s.errorMsg,children:e.jsx("span",{className:"c1oriuqi",children:s.errorMsg})});const d=Object.values(i).find(u=>u.id!==s.id&&u.port===r);return e.jsx(Fe,{value:r,style:d?{color:"red"}:{},onChange:u=>{String(u)!==String(r)&&y(`/api/nodeServers/changePort/${s.id}/${u}`,"PUT").then(o)}})}},{title:"操作",render:(r,s)=>{const d=S?S[s.id]:null;return e.jsxs(O,{children:[v&&e.jsx(Z,{title:"删除服务",description:"是否要删除服务",onConfirm:()=>{y(`/api/nodeServers/${s.id}`,"DELETE").then(()=>{I.success("删除成功"),o()})},children:e.jsx(j,{type:"link",children:"删除"})}),!v&&e.jsxs(ve,{disabled:!!s.errorMsg,children:[e.jsx(j,{type:"link",onClick:()=>y(`/api/npmProjects/vscode/${s.npmProjectId}`,"GET"),children:"vscode"}),(!d||d.status===E.CLOSED)&&e.jsx(j,{type:"link",onClick:()=>T("start",s.id).then(()=>{G()}),children:"启动"}),d&&e.jsxs(e.Fragment,{children:[e.jsx(j,{type:"link",onClick:()=>f(s.id??null),children:"日志"}),e.jsx(j,{type:"link",onClick:()=>T("restart",s.id).then(()=>{G()}),children:"重启"}),d.status!==E.CLOSED&&e.jsx(j,{type:"link",onClick:()=>T("stop",s.id),children:"关闭"})]})]})]})}}],ie=r=>{var s;return e.jsx(L,{pagination:!1,dataSource:((s=r.nodeServers)==null?void 0:s.map(d=>({...d,key:d.id})))??[],rowKey:"id",columns:M})};function A(r){const{postServerIds:s}=r;if(!s||s.length===0)return null;const d=s.map(u=>({...i[u],key:u}));return e.jsx(L,{pagination:!1,dataSource:d,columns:M,...s.length>0&&{expandable:{expandedRowRender:A,defaultExpandedRowKeys:s}}})}const[le,w]=g.useState(!1),[_,W]=g.useState(),[N]=R.useForm(),[ce,$]=g.useState(!1);return e.jsxs("div",{children:[e.jsxs(O,{className:"c4u9m77",children:[e.jsx(he,{options:["项目分组","服务分组"],defaultValue:v?"项目分组":"服务分组",onChange:r=>{F(r==="项目分组")}}),v&&e.jsxs(e.Fragment,{children:[e.jsx(j,{onClick:()=>{w(!0),N.resetFields()},type:"primary",children:"添加项目"}),e.jsx(j,{onClick:()=>{$(!0)},type:"primary",children:"整体编辑服务"})]}),e.jsx(j,{onClick:()=>{k.confirm({title:"是否关闭控制台？",icon:e.jsx(me,{}),content:"关闭后台运行进程",onOk(){y("/api/npmProjects/shutdown","PUT")}})},type:"link",children:"关闭控制台"})]}),!v&&a.length>0&&e.jsx(L,{pagination:!1,dataSource:a.map(r=>({...r,key:r.id})),columns:M,expandable:{expandedRowRender:A,defaultExpandedRowKeys:a.map(r=>r.id)}}),v&&(t!=null&&t.length)?e.jsx(L,{pagination:!1,dataSource:t.map(r=>({...r,key:r.id})),expandable:{expandedRowRender:ie,defaultExpandedRowKeys:t==null?void 0:t.map(r=>r.id)},columns:[{dataIndex:"path",title:"路径"},{title:"操作",render:(r,s)=>e.jsxs(O,{children:[e.jsx(Z,{title:"删除项目",description:"是否要删除项目",onConfirm:()=>{y(`/api/npmProjects/${s.id}`,"DELETE").then(()=>{I.success("删除成功"),o()})},children:e.jsx(j,{type:"link",children:"删除"})}),e.jsx(j,{type:"primary",onClick:()=>{W(s),w(!0),N.setFieldValue("path",s.path)},children:"编辑"}),e.jsx(j,{type:"primary",onClick:()=>{W(s),w(!0),N.setFieldValue("path",s.path)},children:"添加服务"})]})}]}):null,e.jsx(k,{open:le,title:`${_?"编辑":"添加"}项目`,onCancel:()=>w(!1),onOk:()=>{N.validateFields().then(r=>{if(N.resetFields(),_){y("/api/npmProjects","PUT",{path:r.path,id:_.id}).then(()=>{o(),w(!1),I.success("修改项目成功")});return}y("/api/npmProjects","POST",r).then(()=>{o(),w(!1),I.success("创建项目成功")})})},children:e.jsx(R,{form:N,layout:"vertical",name:"path",children:e.jsx(R.Item,{name:"path",label:"path",rules:[{required:!0,message:"Please input the path of project"}],children:e.jsx(b,{})})})}),e.jsx(k,{title:"编辑或添加服务",open:ce,onCancel:()=>{$(!1)},okText:"保存",cancelText:"取消",onOk:()=>{const r=d=>d.map(u=>{var m;const h={...(m=u.form)==null?void 0:m.getFieldsValue(!0)};return h.postServers??(h.postServers=[]),h.portConfigFileRelativePath=encodeURIComponent(h.portConfigFileRelativePath),h.portReg=encodeURIComponent(h.portReg),h.postServers=r(u.postServers),h}),s=r(l);y("/api/nodeServers/batch","POST",s).then(()=>{I.success("保存服务成功"),o(),$(!1)})},width:"80vw",children:e.jsx(ae,{nodeServerStates:l,rootNodeServerStates:l,updateRootNodeServerStates:c})}),e.jsx(k,{open:n!==null,onCancel:()=>f(null),footer:null,title:e.jsxs(O,{className:"c1ru92bi",children:[K(n,n?(z=i[n])==null?void 0:z.name:""),e.jsx(j,{type:"link",onClick:()=>y(`/api/nodeServers/clearLog/${n}`,"GET"),children:"清除日志"})]}),width:"80vw",classNames:{body:"bckpddg"},centered:!0,children:n&&S&&e.jsx(Me,{nodes:(H=C[n])==null?void 0:H.nodes},(J=C[n])==null?void 0:J.rawLogs)})]})}const $e=t=>fetch(t).then(o=>o.json().then(l=>l.data));function Ue(t){switch(t){case"en-US":return B(()=>import("./en-US-WwZ3Ju4A.js"),__vite__mapDeps([])).then(o=>o.default);case"zh-CN":return B(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(o=>o.default);default:return B(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(o=>o.default)}}const V=xe()(t=>({setLocale:async o=>{const l=await Ue(o);t({locale:o,messages:l})}})),De=()=>{const t=V(c=>c.locale),o=V(c=>c.messages),l=V(c=>c.setLocale);return g.useLayoutEffect(()=>{t||l("zh-CN")},[t,l]),!o||!t?null:e.jsx(Re,{locale:t,messages:o,children:e.jsx(Ce,{value:{fetcher:$e,revalidateOnFocus:!0,revalidateOnMount:!0,revalidateOnReconnect:!0,revalidateIfStale:!1},children:e.jsx(ye,{locale:{locale:t},theme:{token:{colorPrimary:"#7939cb",borderRadius:2,fontSize:16}},children:e.jsx(te,{style:{minHeight:"100vh"},children:e.jsx(te,{children:e.jsx(Ee,{children:e.jsxs(Pe,{children:[e.jsx(se,{path:"/nodeServerManagement",element:e.jsx(_e,{})}),e.jsx(se,{path:"*",element:e.jsx(Ie,{to:"/nodeServerManagement"})})]})})})})})})})};je(document.getElementById("root")).render(e.jsx(ge.StrictMode,{children:e.jsx(Se,{children:e.jsx(De,{})})}));
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
