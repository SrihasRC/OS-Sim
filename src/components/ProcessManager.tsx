import React, { useState } from 'react';
import { useStore } from '../store/store';
import { Process } from '../types';
import { PlusCircle, Trash2 } from 'lucide-react';

export const ProcessManager = () => {
  const { processes, addProcess, removeProcess } = useStore();
  const [newProcess, setNewProcess] = useState({
    priority: 1,
    arrivalTime: 0,
    burstTime: 1,
    memoryRequired: 128,
  });

  const handleAddProcess = () => {
    const process: Process = {
      id: `P${processes.length + 1}`,
      state: 'ready',
      ...newProcess,
    };
    addProcess(process);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Add New Process</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Priority
            </label>
            <input
              type="number"
              min="1"
              value={newProcess.priority}
              onChange={(e) =>
                setNewProcess({ ...newProcess, priority: +e.target.value })
              }
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Arrival Time
            </label>
            <input
              type="number"
              min="0"
              value={newProcess.arrivalTime}
              onChange={(e) =>
                setNewProcess({ ...newProcess, arrivalTime: +e.target.value })
              }
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Burst Time
            </label>
            <input
              type="number"
              min="1"
              value={newProcess.burstTime}
              onChange={(e) =>
                setNewProcess({ ...newProcess, burstTime: +e.target.value })
              }
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Memory Required (MB)
            </label>
            <input
              type="number"
              min="1"
              max="128"
              value={newProcess.memoryRequired}
              onChange={(e) =>
                setNewProcess({ ...newProcess, memoryRequired: +e.target.value })
              }
              className="mt-1 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <button
          onClick={handleAddProcess}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <PlusCircle className="w-4 h-4 mr-2" />
          Add Process
        </button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
            Process List
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    State
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Arrival Time
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Burst Time
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Memory (MB)
                  </th>
                  <th className="px-6 py-3 bg-gray-50"></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {processes.map((process) => (
                  <tr key={process.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {process.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {process.priority}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          process.state === 'running'
                            ? 'bg-green-100 text-green-800'
                            : process.state === 'terminated'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {process.state}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {process.arrivalTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {process.burstTime}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {process.memoryRequired}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => removeProcess(process.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};