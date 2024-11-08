import { create } from 'zustand';
import { Process, MemoryBlock, SchedulingResults, FileSystemItem } from '../types';

interface StoreState {
  processes: Process[];
  memoryBlocks: MemoryBlock[];
  schedulingResults: SchedulingResults | null;
  activeTab: 'processes' | 'memory' | 'scheduling' | 'filesystem';
  selectedAlgorithm: 'rr' | 'pp' | 'sjf';
  timeQuantum: number;
  fileSystem: FileSystemItem[];
  currentFolder: string | null;
  addProcess: (process: Process) => void;
  removeProcess: (id: string) => void;
  updateProcess: (process: Process) => void;
  allocateMemory: (processId: string, memoryRequired: number) => boolean;
  deallocateMemory: (processId: string) => void;
  setSchedulingResults: (results: SchedulingResults) => void;
  setActiveTab: (tab: 'processes' | 'memory' | 'scheduling' | 'filesystem') => void;
  setSelectedAlgorithm: (algorithm: 'rr' | 'pp' | 'sjf') => void;
  setTimeQuantum: (quantum: number) => void;
  createFile: (name: string, type: 'file' | 'folder', content?: string) => void;
  deleteItem: (id: string) => void;
  updateFile: (id: string, content: string) => void;
  setCurrentFolder: (id: string | null) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  processes: [],
  memoryBlocks: Array.from({ length: 10 }, (_, i) => ({
    id: i,
    size: 128,
    allocated: false,
  })),
  schedulingResults: null,
  activeTab: 'processes',
  selectedAlgorithm: 'rr',
  timeQuantum: 2,
  fileSystem: [],
  currentFolder: null,

  addProcess: (process) => {
    const { allocateMemory } = get();
    const success = allocateMemory(process.id, process.memoryRequired);
    if (success) {
      set((state) => ({
        processes: [...state.processes, process],
      }));
    }
  },

  removeProcess: (id) => {
    const { deallocateMemory } = get();
    deallocateMemory(id);
    set((state) => ({
      processes: state.processes.filter((p) => p.id !== id),
    }));
  },

  updateProcess: (process) => {
    set((state) => ({
      processes: state.processes.map((p) => 
        p.id === process.id ? process : p
      ),
    }));
  },

  allocateMemory: (processId, memoryRequired) => {
    let allocated = false;
    set((state) => {
      const blocks = [...state.memoryBlocks];
      for (let i = 0; i < blocks.length; i++) {
        if (!blocks[i].allocated && blocks[i].size >= memoryRequired) {
          blocks[i].allocated = true;
          blocks[i].processId = processId;
          allocated = true;
          break;
        }
      }
      return { memoryBlocks: blocks };
    });
    return allocated;
  },

  deallocateMemory: (processId) => {
    set((state) => ({
      memoryBlocks: state.memoryBlocks.map((block) =>
        block.processId === processId
          ? { ...block, allocated: false, processId: undefined }
          : block
      ),
    }));
  },

  setSchedulingResults: (results) => {
    set({ schedulingResults: results });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  setSelectedAlgorithm: (algorithm) => {
    set({ selectedAlgorithm: algorithm });
  },

  setTimeQuantum: (quantum) => {
    set({ timeQuantum: quantum });
  },

  createFile: (name, type, content = '') => {
    set((state) => ({
      fileSystem: [
        ...state.fileSystem,
        {
          id: Math.random().toString(36).substr(2, 9),
          name,
          type,
          content,
          parent: state.currentFolder,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
    }));
  },

  deleteItem: (id) => {
    set((state) => ({
      fileSystem: state.fileSystem.filter((item) => item.id !== id),
    }));
  },

  updateFile: (id, content) => {
    set((state) => ({
      fileSystem: state.fileSystem.map((item) =>
        item.id === id
          ? { ...item, content, updatedAt: new Date() }
          : item
      ),
    }));
  },

  setCurrentFolder: (id) => {
    set({ currentFolder: id });
  },
}));