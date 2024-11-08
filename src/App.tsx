import React from 'react';
import { Tabs } from './components/Tabs';
import { ProcessManager } from './components/ProcessManager';
import { MemoryManager } from './components/MemoryManager';
import { CPUScheduler } from './components/CPUScheduler';
import { FileSystem } from './components/FileSystem';
import { useStore } from './store/store';
import { Monitor } from 'lucide-react';

function App() {
  const { activeTab } = useStore();

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Monitor className="w-8 h-8 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">OS Simulator</h1>
          </div>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <Tabs />
            <div className="mt-6">
              {activeTab === 'processes' && <ProcessManager />}
              {activeTab === 'memory' && <MemoryManager />}
              {activeTab === 'scheduling' && <CPUScheduler />}
              {activeTab === 'filesystem' && <FileSystem />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;