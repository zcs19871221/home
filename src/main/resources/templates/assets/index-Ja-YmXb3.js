import{u as ee,j as e,C as z,B as g,S as O,r as x,F as R,I as b,a as H,s as P,b as le,T as L,P as J,M as D,c as ce,d as Q,D as de,e as ue,f as pe,R as me,g as he,h as fe,i as ve,k as xe,L as X,l as ge,m as je,n as Y,N as Se}from"./vendor-l1n_WLk-.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))c(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const n of a.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&c(n)}).observe(document,{childList:!0,subtree:!0});function l(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function c(i){if(i.ep)return;i.ep=!0;const a=l(i);fetch(i.href,a)}})();const Re="modulepreload",Ce=function(t){return"/"+t},Z={},U=function(o,l,c){let i=Promise.resolve();if(l&&l.length>0){const a=document.getElementsByTagName("link");i=Promise.all(l.map(n=>{if(n=Ce(n),n in Z)return;Z[n]=!0;const m=n.endsWith(".css"),v=m?'[rel="stylesheet"]':"";if(!!c)for(let I=a.length-1;I>=0;I--){const j=a[I];if(j.href===n&&(!m||j.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${n}"]${v}`))return;const C=document.createElement("link");if(C.rel=m?"stylesheet":Re,m||(C.as="script",C.crossOrigin=""),C.href=n,document.head.appendChild(C),m)return new Promise((I,j)=>{C.addEventListener("load",I),C.addEventListener("error",()=>j(new Error(`Unable to preload CSS for ${n}`)))})}))}return i.then(()=>o()).catch(a=>{const n=new Event("vite:preloadError",{cancelable:!0});if(n.payload=a,window.dispatchEvent(n),!n.defaultPrevented)throw a})},V="http://localhost:9981",te=()=>ee(`${V}/api/npmProjects`),ye=[{name:"UiServer",value:{name:"UI-Server",portConfigFileRelativePath:".env",portReg:"RENDER_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BffServer",value:{name:"BFF-Server",portConfigFileRelativePath:".env",portReg:"BFF_SERVER_PORT\\s*=\\s*(\\d+)",command:"npm run devserver",postServers:[]}},{name:"BuildServer",value:{portConfigFileRelativePath:"project.js",portReg:"port:\\s*(\\d+)",command:"npm run build",postServers:[]}}];function Ee({rootNodeServerStates:t,updateRootNodeServerStates:o,nodeServerState:l}){const[c,i]=x.useState(),{data:a}=te(),[n]=R.useForm();return x.useEffect(()=>{l.form=n},[l,n]),e.jsxs(R,{form:n,layout:"horizontal",initialValues:l,children:[e.jsx(R.Item,{name:"name",label:"名称",rules:[{required:!0,message:"输入服务名称"}],children:e.jsx(b,{})}),e.jsx(R.Item,{name:"command",label:"npm 命令",rules:[{required:!0,message:"输入npm启动命令"},{pattern:/^npm /,message:"以npm 开头"}],children:e.jsx(b,{})}),e.jsx(R.Item,{name:"npmProjectId",label:"所属项目",rules:[{required:!0,message:"输入npm启动命令"}],children:e.jsx(H,{value:c,onChange:i,children:a==null?void 0:a.map(m=>e.jsx(H.Option,{value:m.id,children:m.path},m.id))})}),e.jsx(R.Item,{name:"portConfigFileRelativePath",label:"port配置文件相对地址",rules:[{required:!0,message:"输入port配置文件相对地址"}],children:e.jsx(b,{})}),e.jsx(R.Item,{name:"portReg",label:"port配置文件正则",rules:[{required:!0,message:"输入正则"},{validator:(m,v)=>{try{return new RegExp(String(v)),Promise.resolve()}catch{return Promise.reject(new Error("not valid RegExp"))}}}],children:e.jsx(b,{placeholder:"输入正则，必须包含括号以获取端口"})}),e.jsx(R.Item,{label:"子服务",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",rowGap:16},children:e.jsx(re,{nodeServerStates:l.postServers??[],prevNodeServerState:l,rootNodeServerStates:t,updateRootNodeServerStates:o})})})]})}let Ie=0;function re({rootNodeServerStates:t,updateRootNodeServerStates:o,nodeServerStates:l,prevNodeServerState:c}){const i=()=>{let a=[...l],n=c;for(;n;){n.postServers=a;const m=n.prevServer,v=(m==null?void 0:m.postServers)??t;v[v.indexOf(n)]={...n},a=[...v],n=m}o(a)};return e.jsxs(z,{children:[l.map((a,n)=>e.jsxs(z,{className:"cm1s535",children:[e.jsx(Ee,{nodeServerState:a,updateRootNodeServerStates:o,rootNodeServerStates:t},a.id??a.tmpId),e.jsx(g,{onClick:()=>{l.splice(n,1),i()},children:"删除服务"})]})),e.jsx(O,{className:"c1lck55g",children:ye.map(a=>e.jsxs(g,{type:"primary",onClick:()=>{l.push({...a.value,tmpId:`tmp${Ie++}`,prevServer:c}),i()},children:[a.name,"模板"]}))})]})}var E=(t=>(t.CLOSED="CLOSED",t.COMPILING="COMPILING",t.ERROR="ERROR",t.SUCCESS="SUCCESS",t.UNKNOWN="UNKNOWN",t))(E||{});function Pe(t,o=500){const[l,c]=x.useState(t);return x.useLayoutEffect(()=>{const i=window.setTimeout(()=>c(t),o);return()=>window.clearTimeout(i)},[t,o]),l}function Ne({value:t,onChange:o,...l}){const[c,i]=x.useState(t),a=Pe(c);return x.useEffect(()=>{o(a)},[o,a]),e.jsx(b,{...l,value:c,onChange:n=>{var m;i((m=n.target.value)==null?void 0:m.trim())}})}const we="http://localhost:9981",y=async(t,o,l)=>{try{const c=await window.fetch(`${we}${t}`,{method:o,...l&&{body:JSON.stringify(l)},headers:{"Content-Type":"application/json"}}),i=await c.json();if(c.status!==200)throw new Error(i==null?void 0:i.data);return i.data}catch(c){throw P.error(c==null?void 0:c.message),c}};function Oe(){var W;const{data:t,mutate:o}=te(),[l,c]=x.useState([]),{nodeIdMapNodeServerResponse:i,rootNodeServerResponses:a}=x.useMemo(()=>{const s={},r={},u=[],d=[];return t==null||t.forEach(h=>{h.nodeServers.forEach(f=>{const p={...f};p.portConfigFileRelativePath=decodeURIComponent(p.portConfigFileRelativePath),p.portReg=decodeURIComponent(p.portReg);const S={...p,postServers:[]};s[p.id]=S,r[p.id]=p,p.prevServerId||(d.push(p),u.push(S))})}),Object.values(s).forEach(h=>{var p;const f=h;f.prevServer=f.prevServerId?s[f.prevServerId]:void 0,f.postServers=((p=f.postServerIds)==null?void 0:p.map(S=>s[S]))??[]}),c(u),{rootNodeServerResponses:d,nodeIdMapNodeServerResponse:r}},[t]),[n,m]=x.useState(null),[v,F]=x.useState(!1),[C,I]=x.useState({}),{data:j,mutate:q}=ee(`${V}/api/nodeServers/runningInfos`,{revalidateIfStale:!1,revalidateOnMount:!1,revalidateOnFocus:!1,revalidateOnReconnect:!1,onSuccess:async s=>{const r=Object.keys(s),u=await Promise.all(r.map(f=>fetch(`${V}/api/nodeServers/logs/${f}`,{method:"GET"}).then(p=>{var S,k;return(k=(S=p.body)==null?void 0:S.getReader())==null?void 0:k.read()}).then(p=>p!=null&&p.value?new TextDecoder().decode(p.value).replace(/\[1m/g,"").replace(/\\x1B/g,"").replace(/\[22m/g,"").replace(/\[32m/g,"").replace(/\[33m/g,"").replace(/\[39m/g,"").replace(/ERROR in ([^(]+)\((\d+),(\d+)\)/g,(S,k,ae,ie)=>`<span class="jump" data-href="/api/vscodeError/${encodeURIComponent(`${k}:${ae}:${ie}`)}">${S}</span>`):""))),d={...C};let h=!1;u.forEach((f,p)=>{d[r[p]]!==f&&(d[r[p]]=f,h=!0)}),h&&I(d)},...!v&&{refreshInterval:1e3}}),T=(s,r)=>y(`/api/nodeServers/${s}/${r}`,"PUT").then(()=>{P.success(`${s}指令已发送`)}),G=(s,r)=>{var h,f;let u="",d="processing";if(!j||s===void 0||s===null||((h=j[s])==null?void 0:h.status)===void 0)u="未开启",d="grey";else{const p=(f=j[s])==null?void 0:f.status;switch(p){case E.CLOSED:u="已关闭",d="grey";break;case E.ERROR:u="错误",d="error";break;case E.COMPILING:u="编译中..",d="processing";break;case E.SUCCESS:u="成功",d="success";break;case E.UNKNOWN:u="未知",d="warning";break;default:{const S=p;throw new Error(S)}}}return e.jsxs(O,{className:"c19i87wg",children:[e.jsx("div",{children:r??""}),e.jsx(ce,{bordered:!1,color:d,children:u})]})},_=[{title:"名称",dataIndex:"name",render:(s,r)=>G(r.id,r.name)},{title:"命令",dataIndex:"command"},{title:"地址",render:(s,r)=>{var d;const u=(d=t==null?void 0:t.find(h=>h.id===r.npmProjectId))==null?void 0:d.path;return r.errorField==="PROJECT_PATH"?e.jsx(Q,{title:r.errorMsg,children:e.jsx("span",{className:"c5s1knt",children:u})}):u}},{title:"端口",dataIndex:"port",render:(s,r)=>{if(r.errorMsg)return e.jsx(Q,{title:r.errorMsg,children:e.jsx("span",{className:"cg3n9dw",children:r.errorMsg})});const u=Object.values(i).find(d=>d.id!==r.id&&d.port===s);return e.jsx(Ne,{value:s,style:u?{color:"red"}:{},onChange:d=>{String(d)!==String(s)&&y(`/api/nodeServers/changePort/${r.id}/${d}`,"PUT").then(o)}})}},{title:"操作",render:(s,r)=>{const u=j?j[r.id]:null;return e.jsxs(O,{children:[v&&e.jsx(J,{title:"删除服务",description:"是否要删除服务",onConfirm:()=>{y(`/api/nodeServers/${r.id}`,"DELETE").then(()=>{P.success("删除成功"),o()})},children:e.jsx(g,{type:"link",children:"删除"})}),!v&&e.jsxs(de,{disabled:!!r.errorMsg,children:[e.jsx(g,{type:"link",onClick:()=>y(`/api/npmProjects/vscode/${r.npmProjectId}`,"GET"),children:"vscode"}),(!u||u.status===E.CLOSED)&&e.jsx(g,{type:"link",onClick:()=>T("start",r.id).then(()=>{q()}),children:"启动"}),u&&e.jsxs(e.Fragment,{children:[e.jsx(g,{type:"link",onClick:()=>m(r.id??null),children:"日志"}),e.jsx(g,{type:"link",onClick:()=>T("restart",r.id).then(()=>{q()}),children:"重启"}),u.status!==E.CLOSED&&e.jsx(g,{type:"link",onClick:()=>T("stop",r.id),children:"关闭"})]})]})]})}}],se=s=>{var r;return e.jsx(L,{pagination:!1,dataSource:((r=s.nodeServers)==null?void 0:r.map(u=>({...u,key:u.id})))??[],rowKey:"id",columns:_})};function K(s){const{postServerIds:r}=s;if(!r||r.length===0)return null;const u=r.map(d=>({...i[d],key:d}));return e.jsx(L,{pagination:!1,dataSource:u,columns:_,...r.length>0&&{expandable:{expandedRowRender:K,defaultExpandedRowKeys:r}}})}const[ne,N]=x.useState(!1),[M,A]=x.useState(),[w]=R.useForm(),[oe,$]=x.useState(!1);return e.jsxs("div",{children:[e.jsxs(O,{className:"c1cph1bk",children:[e.jsx(le,{options:["项目分组","服务分组"],defaultValue:v?"项目分组":"服务分组",onChange:s=>{F(s==="项目分组")}}),v&&e.jsxs(e.Fragment,{children:[e.jsx(g,{onClick:()=>{N(!0),w.resetFields()},type:"primary",children:"添加项目"}),e.jsx(g,{onClick:()=>{$(!0)},type:"primary",children:"整体编辑服务"})]})]}),!v&&a.length>0&&e.jsx(L,{pagination:!1,dataSource:a.map(s=>({...s,key:s.id})),columns:_,expandable:{expandedRowRender:K,defaultExpandedRowKeys:a.map(s=>s.id)}}),v&&(t!=null&&t.length)?e.jsx(L,{pagination:!1,dataSource:t.map(s=>({...s,key:s.id})),expandable:{expandedRowRender:se,defaultExpandedRowKeys:t==null?void 0:t.map(s=>s.id)},columns:[{dataIndex:"path",title:"路径"},{title:"操作",render:(s,r)=>e.jsxs(O,{children:[e.jsx(J,{title:"删除项目",description:"是否要删除项目",onConfirm:()=>{y(`/api/npmProjects/${r.id}`,"DELETE").then(()=>{P.success("删除成功"),o()})},children:e.jsx(g,{type:"link",children:"删除"})}),e.jsx(g,{type:"primary",onClick:()=>{A(r),N(!0),w.setFieldValue("path",r.path)},children:"编辑"}),e.jsx(g,{type:"primary",onClick:()=>{A(r),N(!0),w.setFieldValue("path",r.path)},children:"添加服务"})]})}]}):null,e.jsx(D,{open:ne,title:`${M?"编辑":"添加"}项目`,onCancel:()=>N(!1),onOk:()=>{w.validateFields().then(s=>{if(w.resetFields(),M){y("/api/npmProjects","PUT",{path:s.path,id:M.id}).then(()=>{o(),N(!1),P.success("修改项目成功")});return}y("/api/npmProjects","POST",s).then(()=>{o(),N(!1),P.success("创建项目成功")})})},children:e.jsx(R,{form:w,layout:"vertical",name:"path",children:e.jsx(R.Item,{name:"path",label:"path",rules:[{required:!0,message:"Please input the path of project"}],children:e.jsx(b,{})})})}),e.jsx(D,{title:"编辑或添加服务",open:oe,onCancel:()=>{$(!1)},okText:"保存",cancelText:"取消",onOk:()=>{const s=u=>u.map(d=>{var f;const h={...(f=d.form)==null?void 0:f.getFieldsValue(!0)};return h.postServers??(h.postServers=[]),h.portConfigFileRelativePath=encodeURIComponent(h.portConfigFileRelativePath),h.portReg=encodeURIComponent(h.portReg),h.postServers=s(d.postServers),h}),r=s(l);y("/api/nodeServers/batch","POST",r).then(()=>{P.success("保存服务成功"),o(),$(!1)})},width:"80vw",children:e.jsx(re,{nodeServerStates:l,rootNodeServerStates:l,updateRootNodeServerStates:c})}),e.jsx(D,{open:n!==null,onCancel:()=>m(null),footer:null,title:e.jsxs(O,{className:"c1oriuqi",children:[G(n,n?(W=i[n])==null?void 0:W.name:""),e.jsx(g,{type:"link",onClick:()=>y(`/api/nodeServers/clearLog/${n}`,"GET"),children:"清除日志"})]}),width:"80vw",classNames:{body:"b4u9m77"},centered:!0,children:n&&j&&e.jsx("div",{className:"c1ru92bi",children:C[n]})})]})}const be=t=>fetch(t).then(o=>o.json().then(l=>l.data));function ke(t){switch(t){case"en-US":return U(()=>import("./en-US-WwZ3Ju4A.js"),__vite__mapDeps([])).then(o=>o.default);case"zh-CN":return U(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(o=>o.default);default:return U(()=>import("./zh-CN-XVEU3kbj.js"),__vite__mapDeps([])).then(o=>o.default)}}const B=ue()(t=>({setLocale:async o=>{const l=await ke(o);t({locale:o,messages:l})}})),Le=()=>{const t=B(c=>c.locale),o=B(c=>c.messages),l=B(c=>c.setLocale);return x.useLayoutEffect(()=>{t||l("zh-CN")},[t,l]),!o||!t?null:e.jsx(fe,{locale:t,messages:o,children:e.jsx(ve,{value:{fetcher:be,revalidateOnFocus:!0,revalidateOnMount:!0,revalidateOnReconnect:!0,revalidateIfStale:!1},children:e.jsx(xe,{locale:{locale:t},theme:{token:{colorPrimary:"#7939cb",borderRadius:2,fontSize:16}},children:e.jsx(X,{style:{minHeight:"100vh"},children:e.jsx(X,{children:e.jsx(ge,{children:e.jsxs(je,{children:[e.jsx(Y,{path:"/nodeServerManagement",element:e.jsx(Oe,{})}),e.jsx(Y,{path:"*",element:e.jsx(Se,{to:"/nodeServerManagement"})})]})})})})})})})};pe(document.getElementById("root")).render(e.jsx(me.StrictMode,{children:e.jsx(he,{children:e.jsx(Le,{})})}));
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = []
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}