interface BaseProject {
  id: number;
  path: string;
  description?: string;
}

export interface BaseProcess {
  id: number;
  command: string;
  description?: string;
  port: number;
}

export interface Process extends BaseProcess {
  project: BaseProject;
}

export interface Project extends BaseProject {
  appProcesses: BaseProcess[];
}

export type ProjectCreatedOrUpdated = Omit<BaseProject, 'id'> & {
  id?: number;
};

export type ProcessesCreatedOrUpdated = Omit<BaseProcess, 'id'> & {
  id?: number;
  projectId: number;
};

export const projectApiBase = '/projects';
export const processesApiBase = '/processes';
