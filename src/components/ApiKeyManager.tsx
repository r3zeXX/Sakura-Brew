import { useState } from 'react';
import { useAppStore, AIProvider } from '../store/useAppStore';
import { KeyRound, Eye, EyeOff, Save, Trash2, Settings, ChevronDown, ChevronUp } from 'lucide-react';

const ApiKeyManager = () => {
  const { apiKeys, setApiKey, deleteApiKey, selectedProvider, setSelectedProvider, selectedModel, setSelectedModel } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showKey, setShowKey] = useState(false);
  const [inputKey, setInputKey] = useState('');

  const providers: { id: AIProvider; name: string }[] = [
    { id: 'openrouter', name: 'OpenRouter' },
    { id: 'google', name: 'Google Gemini' },
    { id: 'groq', name: 'Groq' },
  ];

  const models: Record<AIProvider, string[]> = {
    openrouter: [
      'meta-llama/llama-3.3-70b-instruct:free',
      'deepseek/deepseek-r1:free',
      'google/gemma-2-9b-it:free',
      'qwen/qwen-2.5-72b-instruct:free'
    ],
    google: [
      'gemini-flash-latest',
      'gemini-3.5-flash'
    ],
    groq: [
      'llama-3.3-70b-versatile',
      'mixtral-8x7b-32768'
    ]
  };

  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const provider = e.target.value as AIProvider;
    setSelectedProvider(provider);
    setSelectedModel(models[provider][0]);
    setInputKey('');
  };

  const handleSave = () => {
    if (inputKey.trim()) {
      setApiKey(selectedProvider, inputKey.trim());
      setInputKey('');
    }
  };

  const maskKey = (key: string) => {
    if (!key) return '';
    if (key.length <= 4) return '*'.repeat(key.length);
    return '*'.repeat(key.length - 4) + key.slice(-4);
  };

  const currentKey = apiKeys[selectedProvider];

  return (
    <div className="bg-gray-50 border-b border-gray-200 text-sm">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 flex items-center justify-between text-gray-600 hover:bg-gray-100 transition-colors"
      >
        <span className="flex items-center gap-2 font-medium">
          <Settings size={14} /> Model & API Settings
        </span>
        {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>

      {isOpen && (
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Provider</label>
            <select
              value={selectedProvider}
              onChange={handleProviderChange}
              className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-matcha focus:border-matcha"
            >
              {providers.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">Model</label>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-matcha focus:border-matcha"
            >
              {models[selectedProvider].map(m => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider">API Key (BYOK)</label>
            {currentKey ? (
              <div className="flex items-center gap-2 bg-green-50 text-green-800 p-2 border border-green-200 rounded-md">
                <KeyRound size={16} className="text-green-600 shrink-0" />
                <span className="truncate flex-1 font-mono text-xs">{maskKey(currentKey)}</span>
                <button 
                  onClick={() => deleteApiKey(selectedProvider)}
                  className="text-red-500 hover:text-red-700 p-1"
                  title="Delete Key"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <input
                    type={showKey ? 'text' : 'password'}
                    value={inputKey}
                    onChange={(e) => setInputKey(e.target.value)}
                    placeholder={`Enter ${providers.find(p => p.id === selectedProvider)?.name} Key`}
                    className="w-full p-2 pr-8 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-matcha focus:border-matcha text-xs font-mono"
                  />
                  <button
                    onClick={() => setShowKey(!showKey)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showKey ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
                <button
                  onClick={handleSave}
                  disabled={!inputKey.trim()}
                  className="bg-gray-800 text-white p-2 rounded-md hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Save size={14} />
                </button>
              </div>
            )}
            <p className="text-[10px] text-gray-400 mt-1">
              Keys are stored securely in your browser's local storage and never sent to our servers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiKeyManager;
