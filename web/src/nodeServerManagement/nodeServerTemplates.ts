import { NodeServerState } from './types.ts';

const nodeServerTemplates: { name: string; value: NodeServerState }[] = [
  {
    name: 'UiServer',
    value: {
      name: 'UI-Server',
      portConfigFileRelativePath: '.env',
      portReg: 'RENDER_SERVER_PORT\\s*=\\s*(\\d+)',
      command: 'npm run devserver',
      postServers: [],
    },
  },
  {
    name: 'BffServer',
    value: {
      name: 'BFF-Server',
      portConfigFileRelativePath: '.env',
      portReg: 'BFF_SERVER_PORT\\s*=\\s*(\\d+)',
      command: 'npm run devserver',
      postServers: [],
    },
  },
  {
    name: 'BuildServer',
    value: {
      portConfigFileRelativePath: 'project.js',
      portReg: 'port:\\s*(\\d+)',
      command: 'npm run build',
      postServers: [],
    },
  },
];

export default nodeServerTemplates;
