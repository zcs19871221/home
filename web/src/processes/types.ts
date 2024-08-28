export enum ProcessesStatus {
  CLOSED = 'CLOSED',
  COMPILING = 'COMPILING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  UNKNOWN = 'UNKNOWN',
}

export interface LogInfo {
  status: ProcessesStatus;
  id: number;
}
