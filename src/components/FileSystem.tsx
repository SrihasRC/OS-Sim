import React, { useState } from 'react';
import { useStore } from '../store/store';
import { FileSystemItem } from '../types';
import { Folder, File, Plus, Trash2, ArrowLeft, Save } from 'lucide-react';

export const FileSystem = () => {
  const {
    fileSystem,
    currentFolder,
    createFile,
    deleteItem,
    updateFile,
    setCurrentFolder,
  } = useStore();

  const [newItemName, setNewItemName] = useState('');
  const [newItemType, setNewItemType] = useState<'file' | 'folder'>('file');
  const [selectedFile, setSelectedFile] = useState<FileSystemItem | null>(null);
  const [editContent, setEditContent] = useState('');

  const currentItems = fileSystem.filter((item) => item.parent === currentFolder);
  const currentPath = getCurrentPath(fileSystem, currentFolder);

  function getCurrentPath(
    items: FileSystemItem[],
    currentId: string | null
  ): string[] {
    const path: string[] = [];
    let current = currentId;

    while (current) {
      const folder = items.find((item) => item.id === current);
      if (folder) {
        path.unshift(folder.name);
        current = folder.parent;
      } else {
        break;
      }
    }

    return path;
  }

  const handleCreateItem = () => {
    if (newItemName.trim()) {
      createFile(newItemName.trim(), newItemType);
      setNewItemName('');
    }
  };

  const handleFileClick = (file: FileSystemItem) => {
    if (file.type === 'folder') {
      setCurrentFolder(file.id);
    } else {
      setSelectedFile(file);
      setEditContent(file.content || '');
    }
  };

  const handleSaveContent = () => {
    if (selectedFile) {
      updateFile(selectedFile.id, editContent);
      setSelectedFile(null);
      setEditContent('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">File System</h2>
          <div className="flex space-x-2">
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="New item name"
              className="px-3 py-2 border rounded-md"
            />
            <select
              value={newItemType}
              onChange={(e) => setNewItemType(e.target.value as 'file' | 'folder')}
              className="px-3 py-2 border rounded-md"
            >
              <option value="file">File</option>
              <option value="folder">Folder</option>
            </select>
            <button
              onClick={handleCreateItem}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4 text-sm text-gray-600">
          <button
            onClick={() => setCurrentFolder(null)}
            className="hover:text-indigo-600"
          >
            Root
          </button>
          {currentPath.map((folder, index) => (
            <React.Fragment key={index}>
              <span>/</span>
              <span>{folder}</span>
            </React.Fragment>
          ))}
        </div>

        {currentFolder && (
          <button
            onClick={() => {
              const parent = fileSystem.find((item) => item.id === currentFolder)
                ?.parent;
              setCurrentFolder(parent);
            }}
            className="mb-4 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        )}

        <div className="grid grid-cols-4 gap-4">
          {currentItems.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded-lg hover:border-indigo-500 cursor-pointer"
              onClick={() => handleFileClick(item)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {item.type === 'folder' ? (
                    <Folder className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <File className="w-5 h-5 text-gray-600" />
                  )}
                  <span className="text-sm font-medium">{item.name}</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteItem(item.id);
                  }}
                  className="text-red-600 hover:text-red-900"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFile && (
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Edit File: {selectedFile.name}</h3>
            <div className="flex space-x-2">
              <button
                onClick={handleSaveContent}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
              >
                <Save className="w-4 h-4 mr-2" />
                Save
              </button>
              <button
                onClick={() => setSelectedFile(null)}
                className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full h-64 p-4 border rounded-md font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
};