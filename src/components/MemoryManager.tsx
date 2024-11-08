import React from 'react';
import { useStore } from '../store/store';

export const MemoryManager = () => {
  const { memoryBlocks, processes } = useStore();

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Memory Blocks (FIFO)</h2>
        <div className="grid grid-cols-5 gap-4">
          {memoryBlocks.map((block) => (
            <div
              key={block.id}
              className={`p-4 rounded-lg border-2 ${
                block.allocated
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200'
              }`}
            >
              <div className="text-sm font-medium">Block {block.id}</div>
              <div className="text-xs text-gray-500">{block.size} MB</div>
              {block.allocated && (
                <div className="mt-2 text-xs font-medium text-indigo-600">
                  {block.processId}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">Memory Allocation Table</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Block ID
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Process
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {memoryBlocks.map((block) => (
                <tr key={block.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {block.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {block.size} MB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        block.allocated
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {block.allocated ? 'Allocated' : 'Free'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {block.processId || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};