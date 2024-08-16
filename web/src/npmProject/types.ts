interface BaseNpmProject {
  id: number;
  path: string;
  description?: string;
}

export interface BaseNodeServer {
  id: number;
  command: string;
  description?: string;
  port: number;
}

export interface NodeServer extends BaseNodeServer {
  npmProject: BaseNpmProject;
}

export interface NpmProject extends BaseNpmProject {
  nodeServers: BaseNodeServer[];
}

export type NpmProjectCreatedOrUpdated = Omit<BaseNpmProject, 'id'> & {
  id?: number;
};

export type NodeServerCreatedOrUpdated = Omit<BaseNodeServer, 'id'> & {
  id?: number;
  npmProjectId: number;
};

export const npmApiBase = '/npmProjects';
export const nodeServerApiBase = '/nodeServers';
