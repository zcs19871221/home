import{r as v,b as G,j as e,B as c,F as p,u as I,h as ee,T as o,i as se,k as U,M as N,l as te,m as R,D as ae,E as ie,P as K,n as ne,z as re,Q as W,U as de,V as le,W as ce,X as ue,Y as oe,Z as me}from"./vendor-AUb_t5Eg.js";import{u as b,j as C,b as xe,a as q,c as pe,i as h,s as he}from"./index-JtW-WkVt.js";const m="/processes";function je(s,i=500){const[u,j]=v.useState(s);return v.useLayoutEffect(()=>{const d=window.setTimeout(()=>j(s),i);return()=>window.clearTimeout(d)},[s,i]),u}function fe(s){try{return JSON.parse(s)}catch{return{}}}const P=(s,i)=>C(`${m}/${i}/${s}`,"PUT").then(()=>{R.success(h.intl.formatMessage({id:"vCommandHasBeenSent",defaultMessage:h.intl.formatMessage({id:"vCommandHasBeenSent",defaultMessage:"{v1}指令已发送"})},{v1:s}))}),z=({logInfo:s,process:i,processesId:u,processesName:j,setProcessesId:d,refetchServerInfo:f,onClick:r,refetchLog:g})=>{const n=G();return e.jsxs("div",{children:[e.jsxs("div",{className:"flex space-x-2 items-center",children:[e.jsx("div",{children:j??""}),e.jsx(W,{bordered:!1,color:s!=null&&s.running?"gold":"grey",className:"flex align-middle cursor-pointer",onClick:r,children:s!=null&&s.running?n.formatMessage({id:"Running",defaultMessage:"运行中"}):n.formatMessage({id:"NotRunning",defaultMessage:"未运行"})}),e.jsx(W,{bordered:!1,color:s==null?void 0:s.color,className:"flex align-middle cursor-pointer",onClick:r,children:s==null?void 0:s.label})]}),e.jsxs("div",{className:"text-grey mt-2",children:[e.jsx(o,{title:n.formatMessage({id:"StartService",defaultMessage:"启动服务"}),children:e.jsx(c,{type:"text",disabled:s==null?void 0:s.running,onClick:()=>{P("start",u).then(()=>f())},className:"text-green-600 cursor-pointer",children:e.jsx(de,{})})}),e.jsx(o,{title:n.formatMessage({id:"StopService",defaultMessage:"关闭服务"}),children:e.jsx(c,{type:"text",disabled:!(s!=null&&s.running),onClick:()=>{P("stop",u).then(()=>f())},className:"text-red-500 cursor-pointer",children:e.jsx(le,{})})}),e.jsx(o,{title:n.formatMessage({id:"RestartService",defaultMessage:"重启服务"}),children:e.jsx(c,{type:"text",disabled:!(s!=null&&s.running),onClick:()=>{P("restart",u).then(()=>f())},className:"text-green-600 cursor-pointer",children:e.jsx(ce,{})})}),e.jsx(o,{title:n.formatMessage({id:"ViewLog",defaultMessage:"查看日志"}),children:e.jsx(c,{type:"text",onClick:()=>{d(u)},children:e.jsx(ue,{})})}),e.jsx(o,{title:n.formatMessage({id:"ClearLog",defaultMessage:"清除日志"}),children:e.jsx(c,{type:"text",onClick:()=>{C(`${m}/${u}/logs`,"DELETE").then(()=>g())},children:e.jsx(oe,{})})}),e.jsx(o,{title:n.formatMessage({id:"OpenDirectory",defaultMessage:"打开目录"}),children:e.jsx(c,{type:"text",onClick:()=>{C(`/system/run?command=${encodeURIComponent(`code.cmd ${i==null?void 0:i.path}`)}`,"GET")},children:e.jsx(me,{})})})]})]})};function ve(){var A;const s=G(),{data:i,isLoading:u,mutate:j}=b(m),{data:d,mutate:f}=b(`${m}/runningInfos`,{refreshInterval:2e3}),[r,g]=v.useState(null),{data:n,mutate:w}=b(r!==null?`${m}/${r}/logs`:void 0,r!==null?{fetcher:q,refreshInterval:2e3,revalidateIfStale:!0,revalidateOnFocus:!0,revalidateOnMount:!0,revalidateOnReconnect:!0}:{}),[H,M]=v.useMemo(()=>{const t=[];let a=1;const l=[];let S=0;return n==null||n.replace(/(?:ERROR in ([^(]+)\((\d+),(\d+)\))|(\berror\b)/gi,(O,X,Y,Z,V,L)=>{l.push(n.slice(S,L)),S=L+O.length;const $=`error${a++}`;return t.push($),V?(l.push(e.jsx("span",{id:$,className:"text-red-500",children:V},$)),O):(l.push(e.jsx("h3",{id:$,className:"text-red-500",children:e.jsx(c,{type:"link",onClick:()=>{C(`/system/run?command=${encodeURIComponent(`code.cmd ${X}:${Y}:${Z}`)}`,"GET")},target:"_blank",children:O})})),O)}),n&&l.push(n.slice(S)),[l,t]},[n]),k=v.useRef(0),T=t=>{r==null&&g(t),!(!M||M.length===0)&&(window.location.href=`#${M==null?void 0:M[k.current]}`,k.current=(k.current+1)%M.length)},[J,y]=v.useState(!1),[x]=p.useForm(),D=je(p.useWatch("path",x)),{data:B}=I(D?`${xe}/system/read?path=${encodeURIComponent(`${D}/package.json`)}`:void 0,q),{data:F}=b(he),_=pe(),Q=t=>e.jsx(U,{rowKey:"id",columns:_,dataSource:t.appProcessStatuses,pagination:!1}),{data:E}=b(`${m}/paths`);return e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-center items-center h-8",children:[e.jsx("h2",{className:"mr-auto",children:e.jsx(ee,{id:"ServiceManagement",defaultMessage:"服务管理"})}),e.jsx(o,{title:s.formatMessage({id:"AddService",defaultMessage:"添加服务"}),placement:"leftBottom",children:e.jsx(c,{type:"text",onClick:()=>{x.resetFields(),y(!0)},children:e.jsx(se,{})})})]}),e.jsx(U,{rowKey:"id",pagination:!1,dataSource:i,loading:u,expandable:{expandedRowRender:Q,defaultExpandAllRows:!1},columns:[{title:s.formatMessage({id:"Description",defaultMessage:"描述"}),dataIndex:"description",render:(t,a)=>e.jsx("div",{children:e.jsx("div",{children:e.jsx(z,{logInfo:d==null?void 0:d[a.id],processesId:a.id,process:a,processesName:a.description,onClick:()=>T(a.id),setProcessesId:g,refetchServerInfo:f,refetchLog:w})})})},{title:s.formatMessage({id:"Command",defaultMessage:"命令"}),dataIndex:"command"},{dataIndex:"path",title:s.formatMessage({id:"Address",defaultMessage:"地址"})},{title:h.intl.formatMessage({id:"Operation",defaultMessage:"操作"}),render:(t,a)=>e.jsxs("div",{children:[e.jsx(o,{title:h.intl.formatMessage({id:"DeleteService",defaultMessage:"删除服务"}),children:e.jsx(c,{type:"text",onClick:()=>{N.confirm({title:h.intl.formatMessage({id:"DeleteService",defaultMessage:"是否删除服务?"}),icon:e.jsx(te,{}),onOk(){C(`${m}/${a.id}`,"DELETE").then(()=>{R.success(h.intl.formatMessage({id:"DeletedSuccessfully",defaultMessage:"删除成功"})),j()})}})},children:e.jsx(ae,{})})}),e.jsx(o,{title:h.intl.formatMessage({id:"EditService",defaultMessage:"编辑服务"}),children:e.jsx(c,{type:"text",onClick:()=>{var l;x.setFieldsValue({...a,appProcessStatusIds:(l=a.appProcessStatuses)==null?void 0:l.map(S=>S.id)}),y(!0)},children:e.jsx(ie,{})})})]})}]}),e.jsx(N,{open:r!==null&&d!==void 0,onCancel:()=>g(null),footer:null,title:e.jsx("div",{className:"space-x-5 flex align-middle",children:r!==null&&e.jsx(z,{logInfo:d==null?void 0:d[r],processesId:r,refetchLog:w,process:i==null?void 0:i.find(t=>t.id===r),processesName:(A=i==null?void 0:i.find(t=>t.id===r))==null?void 0:A.description,onClick:()=>T(r),setProcessesId:g,refetchServerInfo:f})}),width:"80vw",classNames:{body:"b1aves2k"},centered:!0,children:e.jsx("pre",{children:H})}),e.jsxs(N,{open:J,title:x.getFieldValue("id")===void 0?s.formatMessage({id:"CreateANewService",defaultMessage:"新建服务"}):s.formatMessage({id:"EditService",defaultMessage:"编辑服务"}),okButtonProps:{autoFocus:!0,htmlType:"submit"},onCancel:()=>y(!1),destroyOnClose:!0,modalRender:t=>e.jsx(p,{layout:"vertical",form:x,name:"form_in_modal",onFinish:a=>{const l=x.getFieldValue("id");C(m,l!==void 0?"PUT":"POST",{...a,id:l,projectId:x.getFieldValue("projectId")}).then(()=>{R.success(s.formatMessage({id:"OperationSuccessful",defaultMessage:"操作成功"})),j(),y(!1)})},children:t}),children:[e.jsx(p.Item,{name:"path",label:s.formatMessage({id:"Path",defaultMessage:"路径"}),normalize:t=>{var a;return(a=t==null?void 0:t.trim())==null?void 0:a.replace(/[\\/]+/g,"/")},rules:[{required:!0,message:s.formatMessage({id:"PathCannotBeEmpty",defaultMessage:"路径不能为空"})}],children:e.jsx(K,{options:(E==null?void 0:E.map(t=>({label:t,value:t})))??[]})}),e.jsx(p.Item,{name:"command",label:s.formatMessage({id:"Command",defaultMessage:"命令"}),rules:[{required:!0,message:s.formatMessage({id:"CommandCannotBeEmpty",defaultMessage:"命令不能为空"})}],children:e.jsx(K,{options:B?Object.keys(fe(B).scripts??{}).reduce((t,a)=>(t.push({label:a,value:`npm run ${a}`}),t),[]):[]})}),e.jsx(p.Item,{name:"description",label:s.formatMessage({id:"NameOrDescription",defaultMessage:"名称或描述"}),children:e.jsx(ne,{})}),e.jsx(p.Item,{name:"appProcessStatusIds",label:s.formatMessage({id:"LogStatusConfiguration",defaultMessage:"日志状态配置"}),children:e.jsx(re,{mode:"multiple",options:F==null?void 0:F.map(t=>({label:e.jsx("span",{style:{color:t.color},children:t.name}),value:t.id}))})})]})]})}export{ve as default};