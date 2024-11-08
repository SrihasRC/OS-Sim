export interface Process {
  id: string;
  priority: number;
  state: 'ready' | 'running' | 'terminated';
  arrivalTime: number;
  burstTime: number;
  memoryRequired: number;
  memoryBlock?: number;
}

export interface MemoryBlock {
  id: number;
  size: number;
  allocated: boolean;
  processId?: string;
}

export interface SchedulingResult {
  completionTime: number;
  turnaroundTime: number;
  waitingTime: number;
  responseTime: number;
}

export interface GanttChartItem {
  job: string;
  start: number;
  stop: number;
}

export interface SchedulingResults {
  solvedProcessesInfo: any[];
  ganttChartInfo: GanttChartItem[];
}

export interface FileSystemItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  parent: string | null;
  createdAt: Date;
  updatedAt: Date;
}