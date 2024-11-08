import React from 'react';
import { useStore } from '../store/store';

export const Tabs = () => {
  const { activeTab, setActiveTab } = useStore();

  const tabs = [
    { id: 'processes', label: 'Process Management' },
    { id: 'memory', label: 'Memory Management' },
    { id: 'scheduling', label: 'CPU Scheduling' },
    { id: 'filesystem', label: 'File System' },
  ];

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`
              whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
              ${
                activeTab === tab.id
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};