export enum NodeServerStatus {
  CLOSED = 'CLOSED',
  COMPILING = 'COMPILING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  UNKNOWN = 'UNKNOWN',
}

export interface LogInfo {
  status: NodeServerStatus;
  id: number;
}
