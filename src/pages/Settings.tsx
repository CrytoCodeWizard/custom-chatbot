import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';

const models = ["GPT 3.5 Turbo", "GPT 4.0"];

const Settings: React.FC = () => {
  const {
    serverAIs,
    addServerAI,
    deleteServerAI,
  } = useContext(AppContext);

  const [selectedServerAIId, setSelectedServerAIId] = useState<string>(serverAIs[0]?.id || '');
  const [selectedModel, setSelectedModel] = useState<string>('GPT 3.5 Turbo');
  const [memoryEnabled, setMemoryEnabled] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>('');
  const [knowledge, setKnowledge] = useState<string>('');
  const [comments, setComments] = useState<string>('');
  const [newPrompt, setNewPrompt] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  useEffect(() => {
    console.log("serverAI : ", serverAIs);
  }, []);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setFile(file);
  };

  const uploadFile = async () => {
    if (file) {
      setUploadStatus('Uploading...');
      try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setUploadStatus('File uploaded successfully.');
      } catch (error) {
        setUploadStatus('Failed to upload file.');
      }
    }
  };

  const handleServerAIChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedAI = serverAIs.find((ai) => ai.id === event.target.value);
    setSelectedServerAIId(event.target.value);
    if (selectedAI) {
      setPrompt(selectedAI.prompt);
      setKnowledge(selectedAI.knowledge);
      setComments(selectedAI.comments);
    }
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedModel(event.target.value);
  };

  const handleMemoryToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMemoryEnabled(event.target.checked);
  };

  const createServerAI = () => {
    const newAI = {
      id: Date.now().toString(),
      name: newPrompt,
      prompt,
      knowledge,
      comments,
    };
    addServerAI(newAI);
    setPrompt('');
    setNewPrompt('');
    setKnowledge('');
    setComments('');
    setFile(null);

  };

  return (
    <div className="container mx-auto p-4">
      <header className="py-4 shadow bg-[#353535] text-white text-center text-lg">
        TopDown AI - Server AI Bot Model Settings
      </header>
      <div className="bg-[#2a2a2a] shadow-md rounded-lg p-4 mt-6">
        <div className="flex flex-row items-center justify-between">
          <div className="w-full mx-3 my-2 px-3 py-2 border rounded-md">
            <label className="block text-white text-sm font-bold mb-2">
              Prompt Model List
            </label>
            {serverAIs.map((prompt) => (
              <div key={prompt.id} className="flex justify-between items-center px-2 py-1 bg-[#353535] mt-1 rounded">
                <span className='text-white'>{prompt.name}</span>
                <button
                  onClick={() => deleteServerAI(prompt.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
            <div className='flex flex-col items-start justify-between px-2 py-3'>
              <label className="block text-white text-sm font-bold mb-2">
                New Prompt
              </label>
              <input
                type="text"
                className="form-input block w-full rounded-md border-gray-300 shadow-sm px-3 py-2"
                placeholder="Enter new prompt..."
                value={newPrompt}
                onChange={e => setNewPrompt(e.target.value)}
              />
              <button
                onClick={createServerAI}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Create Prompt
              </button>
            </div>
          </div>
          <div className="w-full mx-3 my-2 px-3 py-2 border rounded-md">
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                Model
              </label>
              <select
                className="form-select block w-full rounded-md border-gray-300 shadow-sm px-2 py-1"
                value={selectedModel}
                onChange={handleModelChange}
              >
                {models.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  checked={memoryEnabled}
                  onChange={handleMemoryToggle}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="text-white text-sm font-bold">
                  Memory
                </span>
              </label>
            </div>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2">
                ServerAI
              </label>
              <select
                className="form-select block w-full rounded-md border-gray-300 shadow-sm px-2 py-1"
                value={selectedServerAIId}
                onChange={handleServerAIChange}
              >
                {serverAIs.map((ai) => (
                  <option key={ai.id} value={ai.id}>{ai.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="mx-2 my-3 px-3 py-2 border rounded-md">
          <label className="block text-white text-lg font-bold mb-2">
            Prompt<span className='text-red-600 mx-1'>*</span>
          </label>
          <span className='text-sm text-gray-400 px-2'>Tell your bot how to behave and how to respond to user messages. Try to be as specific as possible.</span>
          <textarea
            className="form-textarea my-2 block w-full rounded-md border shadow-sm px-3 py-2"
            rows={3}
            placeholder="e.g. You are the CatBot. You will try to respond to the user's questions, but you get easily distracted."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
          />
        </div>
        <div className="mx-2 my-3 px-3 py-2 border rounded-md">
          <label className="block text-white text-lg font-bold mb-2">
            Knowledge base
          </label>
          <span className='text-sm text-gray-400 px-2'>Provide custom knowledge that your bot will access to inform its responses. Your bot will retrieve relevant sections from the knowledge base based on the user message. The data in the knowledge base may be made viewable by other users through bot responses or citations.</span>
          <textarea
            className="form-textarea mt-1 block w-full rounded-md border shadow-sm px-3 py-2"
            rows={3}
            placeholder="Knowledge..."
            value={knowledge}
            onChange={e => setKnowledge(e.target.value)}
          />
          <div className="mx-2 my-3">
            <label className="block text-white text-sm font-bold mb-2">
              + Add Knowledge source
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
                onChange={handleFileChange}
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={uploadFile}
                disabled={!file}
              >
                Upload
              </button>
            </div>
            {uploadStatus && <p className="text-sm mt-2 text-gray-600">{uploadStatus}</p>}
          </div>
        </div>
        <div className="mx-2 my-3 px-3 py-2 border rounded-md">
          <label className="block text-white text-lg font-bold mb-2">
            Comments
          </label>
          <textarea
            className="form-textarea mt-1 block w-full rounded-md border shadow-sm px-3 py-2"
            rows={2}
            placeholder="Comments..."
            value={comments}
            onChange={e => setComments(e.target.value)}
          />
        </div>
        <div className="flex flex-row justify-end gap-4">
          <button
            onClick={createServerAI}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
          <button
            onClick={() => deleteServerAI(selectedServerAIId)}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
