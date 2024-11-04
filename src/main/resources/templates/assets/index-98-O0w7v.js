import{F as i,r as b,u as $,j as e,T as l,h as k,i as C,E as P,D as E,k as m,l as v,s as p,I as h,A as w,m as A}from"./vendor-2GdBmQ0K.js";import{u as R,b as N,a as _,j}from"./index-UlzfgvD0.js";import{p as x,a as B}from"./types-dHySS9wj.js";function U(){var I;const{data:r,mutate:c,isLoading:y}=R(x),[n]=i.useForm(),[o]=i.useForm(),[O,d]=b.useState(!1),[S,u]=b.useState(!1),T=s=>e.jsx(C,{rowKey:"id",columns:[{title:"命令",dataIndex:"command"},{title:"描述",dataIndex:"description"},{title:"端口",dataIndex:"port"},{title:"操作",render:(t,a)=>e.jsxs("div",{className:"space-x-10",children:[e.jsx(l,{title:"删除服务",children:e.jsx(E,{onClick:()=>{m.confirm({title:"是否删除服务?",icon:e.jsx(v,{}),onOk(){j(`${x}/${a.id}`,"DELETE").then(()=>{p.success("删除成功"),c(),d(!1)})}})}})}),e.jsx(l,{title:"编辑服务",children:e.jsx(P,{onClick:()=>{o.setFieldsValue({...a,projectId:s.id}),u(!0)}})})]})}],dataSource:s.appProcesses,pagination:!1}),V=o.getFieldValue("projectId"),F=(I=r==null?void 0:r.find(s=>s.id===V))==null?void 0:I.path,{data:f}=$(F?`${N}/system/read?path=${encodeURIComponent(`${F}/package.json`)}`:void 0,_);return e.jsxs("div",{children:[e.jsxs("div",{className:"flex justify-center items-center h-8 ",children:[e.jsx("h2",{className:"mr-auto",children:"项目管理"}),e.jsx(l,{title:"增加project",placement:"leftBottom",children:e.jsx(k,{onClick:()=>{n.setFieldsValue({path:"",description:""}),d(!0)}})})]}),r!==void 0&&e.jsx(C,{rowKey:"id",dataSource:r,loading:y,pagination:!1,expandable:{expandedRowRender:T,defaultExpandAllRows:!0},columns:[{dataIndex:"path",title:"地址"},{dataIndex:"description",title:"描述"},{title:"操作",render:(s,t)=>e.jsxs("div",{className:"space-x-5",children:[e.jsx(l,{title:"添加processes到所属项目",children:e.jsx(k,{onClick:()=>{o.resetFields(),o.setFieldsValue({projectId:t.id}),u(!0)}})}),e.jsx(l,{title:"编辑项目",children:e.jsx(P,{onClick:()=>{n.setFieldsValue(t),d(!0)}})}),e.jsx(l,{title:"删除项目",children:e.jsx(E,{onClick:()=>{m.confirm({title:"是否删除项目?",icon:e.jsx(v,{}),content:"同时删除拥有的服务",onOk(){j(`${x}/${t.id}`,"DELETE").then(()=>{p.success("删除成功"),c()})}})}})})]})}]}),e.jsxs(m,{open:O,title:n.getFieldValue("id")===void 0?"新建项目":"编辑项目",okButtonProps:{autoFocus:!0,htmlType:"submit"},onCancel:()=>d(!1),destroyOnClose:!0,modalRender:s=>e.jsx(i,{layout:"vertical",form:n,name:"form_in_modal",onFinish:t=>{let a=t.path.trim();a=a.replace(/\\+/g,"/").replace(/\/+/g,"/");const g=n.getFieldValue("id");j(x,g?"PUT":"POST",{...t,id:g,path:a}).then(()=>{p.success("操作成功"),d(!1),c()})},children:s}),children:[e.jsx(i.Item,{name:"path",label:"文件夹地址",rules:[{required:!0,message:"文件夹地址不能为空"}],children:e.jsx(h,{})}),e.jsx(i.Item,{name:"description",label:"名称或描述",children:e.jsx(h,{})})]}),e.jsxs(m,{open:S,title:o.getFieldValue("id")===void 0?"新建服务":"编辑服务",okButtonProps:{autoFocus:!0,htmlType:"submit"},onCancel:()=>u(!1),destroyOnClose:!0,modalRender:s=>e.jsx(i,{layout:"vertical",form:o,name:"form_in_modal",onFinish:t=>{const a=o.getFieldValue("id");j(B,a!==void 0?"PUT":"POST",{...t,id:a,projectId:o.getFieldValue("projectId")}).then(()=>{p.success("操作成功"),c(),u(!1)})},children:s}),children:[e.jsx(i.Item,{name:"command",label:"命令",rules:[{required:!0,message:"命令不能为空"}],children:e.jsx(w,{options:f?Object.keys(JSON.parse(f).scripts).reduce((s,t)=>(s.push({label:t,value:`npm run ${t}`}),s),[]):[]})}),e.jsx(i.Item,{name:"port",label:"端口",rules:[{required:!0,message:"端口不能为空"}],children:e.jsx(A,{min:1024,max:49151})}),e.jsx(i.Item,{name:"description",label:"名称或描述",children:e.jsx(h,{})})]})]})}export{U as default};
