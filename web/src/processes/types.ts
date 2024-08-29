export enum ProcessesStatus {
  CLOSED = 'CLOSED',
  RUNNING = 'COMPILING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  UNKNOWN = 'UNKNOWN',
}

export interface LogInfo {
  status: ProcessesStatus;
  id: number;
}
