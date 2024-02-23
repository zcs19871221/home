import { FormInstance } from "antd";

export enum NodeServerStatus {
  CLOSED = "CLOSED",
  COMPILING = "COMPILING",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  UNKNOWN = "UNKNOWN",
}

export interface LogInfo {
  log: string;
  status: NodeServerStatus;
  id: number;
}

export interface CommonNodeServer {
  command: string;
  name: string;
  portConfigFileRelativePath: string;
  portReg: string;
  npmProjectId: number;
}

export interface NodeServerResponse extends CommonNodeServer {
  id: number;
  port: string;
  postServerIds?: number[];
  prevServerId?: number;
}

export type NodeServerState = {
  [key in keyof NodeServerResponse]?: NodeServerResponse[key];
} & {
  form?: FormInstance;
  postServers: NodeServerState[];
  prevServer?: NodeServerState;
  tmpId?: string;
};

export interface NodeServerPayload extends CommonNodeServer {
  id?: number;
  postServers?: NodeServerPayload[];
}

export interface Project {
  path: string;
  id: number;
  nodeServers: NodeServerResponse[];
}
