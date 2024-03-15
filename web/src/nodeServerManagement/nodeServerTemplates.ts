import { NodeServerState } from './types.ts';

const nodeServerTemplates: { name: string; value: NodeServerState }[] = [
  {
    name: '微前端UI主服务',
    value: {
      name: '微前端UI主服务',
      portConfigFileRelativePath: '.env',
      portReg: 'RENDER_SERVER_PORT\\s*=\\s*(\\d+)',
      command: 'npm run devserver',
      postServers: [],
    },
  },
  {
    name: '微前端BFF主服务',
    value: {
      name: '微前端BFF主服务',
      portConfigFileRelativePath: '.env',
      portReg: 'BFF_SERVER_PORT\\s*=\\s*(\\d+)',
      command: 'npm run devserver',
      postServers: [],
    },
  },
  {
    name: '微前端Build服务',
    value: {
      portConfigFileRelativePath: 'project.js',
      portReg: 'port:[\'"]*\\s*(\\d+)',
      command: 'npm run build',
      postServers: [],
    },
  },
];

export default nodeServerTemplates;
