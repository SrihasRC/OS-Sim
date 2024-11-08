import React from 'react';
import { useStore } from '../store/store';
import { rr } from '../algorithms/rr';
import { pp } from '../algorithms/pp';
import { sjf } from '../algorithms/sjf';
import { Play } from 'lucide-react';

export const CPUScheduler = () => {
  const {
    processes,
    selectedAlgorithm,
    setSelectedAlgorithm,
    timeQuantum,
    setTimeQuantum,
    schedulingResults,
    setSchedulingResults,
  } = useStore();

  const runSimulation = () => {
    const arrivalTimes = processes.map((p) => p.arrivalTime);
    const burstTimes = processes.map((p) => p.burstTime);
    const priorities = processes.map((p) => p.priority);

    let results;
    switch (selectedAlgorithm) {
      case 'rr':
        results = rr(arrivalTimes, burstTimes, timeQuantum);
        break;
      case 'pp':
        results = pp(arrivalTimes, burstTimes, priorities);
        break;
      case 'sjf':
        results = sjf(arrivalTimes, burstTimes);
        break;
    }

    setSchedulingResults(results);
  };

  const renderGanttChart = () => {
    if (!schedulingResults) return null;
  
    const { ganttChartInfo } = schedulingResults;
    const totalTime = ganttChartInfo[ganttChartInfo.length - 1].stop;
    const scale = 100 / totalTime; // Modify this scale based on desired chart width
  
    return (
      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Gantt Chart</h3>
        <div className="overflow-x-auto">
          <div className="min-w-max h-20 relative">
            <div
              className="relative h-12 bg-gray-100 rounded"
              style={{ width: `${totalTime * 40}px` }}
            >
              {ganttChartInfo.map((item, index) => (
                <div
                  key={index}
                  className="absolute h-full bg-indigo-500 flex items-center justify-center text-white text-sm border-r border-indigo-600"
                  style={{
                    left: `${item.start * 40}px`,
                    width: `${(item.stop - item.start) * 40}px`,
                  }}
                >
                  {item.job}
                </div>
              ))}
            </div>
            <div
              className="flex justify-between mt-2 text-sm text-gray-500"
              style={{ width: `${totalTime * 40}px` }}
            >
              {ganttChartInfo.map((item, index) => (
                <div
                  key={index}
                  style={{ position: 'absolute', left: `${item.start * 40}px` }}
                >
                  {item.start}
                </div>
              ))}
              <div
                style={{ position: 'absolute', left: `${totalTime * 40}px` }}
              >
                {totalTime}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-lg font-semibold mb-4">CPU Scheduling Simulation</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Algorithm
            </label>
            <select
              value={selectedAlgorithm}
              onChange={(e) => setSelectedAlgorithm(e.target.value as any)}
              className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="rr">Round Robin</option>
              <option value="pp">Priority (Preemptive)</option>
              <option value="sjf">Shortest Job First</option>
            </select>
          </div>
          {selectedAlgorithm === 'rr' && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Time Quantum
              </label>
              <input
                type="number"
                min="1"
                value={timeQuantum}
                onChange={(e) => setTimeQuantum(+e.target.value)}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          )}
        </div>
        <button
          onClick={runSimulation}
          disabled={processes.length === 0}
          className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
        >
          <Play className="w-4 h-4 mr-2" />
          Run Simulation
        </button>
      </div>

      {schedulingResults && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Simulation Results</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Process
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Completion Time
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Turnaround Time
                  </th>
                  <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Waiting Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {schedulingResults.solvedProcessesInfo.map((process) => (
                  <tr key={process.job}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {process.job}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {process.ft}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {process.tat}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {process.wat}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {renderGanttChart()}
        </div>
      )}
    </div>
  );
};