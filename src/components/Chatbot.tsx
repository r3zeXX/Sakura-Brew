import { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Trash2, MessageSquare, Plus, Edit2, Check, X, Search, Menu } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useAppStore } from '../store/useAppStore';
import { streamChat } from '../services/aiService';
import { AnimatePresence, motion } from 'framer-motion';

const Chatbot = () => {
  const { 
    sessions, activeSessionId, createSession, switchSession, renameSession, deleteSession, clearAllSessions, clearCurrentChat,
    addMessage, updateLastMessage, apiKeys, selectedProvider, selectedModel 
  } = useAppStore();
  
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showClearModal, setShowClearModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  
  const activeSession = sessions.find(s => s.id === activeSessionId);
  const messages = activeSession?.messages || [];
  const apiKey = apiKeys[selectedProvider];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "Recommend a matcha drink",
    "What dessert goes with hojicha?",
    "I want something not too sweet",
  ];

  const handleSend = async (text: string) => {
    if (!text.trim() || isTyping) return;
    
    setInput('');
    addMessage({ role: 'user', content: text });
    
    if (!apiKey) {
      setTimeout(() => {
        addMessage({ 
          role: 'assistant', 
          content: '⚠️ Please configure your API key in the settings above to chat.' 
        });
      }, 500);
      return;
    }

    setIsTyping(true);
    addMessage({ role: 'assistant', content: '' });

    abortControllerRef.current = new AbortController();

    try {
      const currentSession = useAppStore.getState().sessions.find(s => s.id === activeSessionId);
      const currentMessages = currentSession?.messages || [];
      const stream = streamChat(selectedProvider, selectedModel, apiKey, currentMessages.slice(0, -1), abortControllerRef.current.signal); 
      
      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk;
        updateLastMessage(fullResponse);
      }
    } catch (error: any) {
      if (error.name !== 'AbortError') {
         updateLastMessage(`Error: Could not complete the request. Please try again.`);
      }
    } finally {
      setIsTyping(false);
      abortControllerRef.current = null;
    }
  };

  const handleClearChat = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsTyping(false);
    clearCurrentChat();
    setShowClearModal(false);
  };

  const filteredSessions = sessions.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden">
      
      {/* Header controls inside chat area */}
      <div className="flex items-center justify-between p-2 border-b border-gray-100 bg-gray-50/50">
        <button 
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-matcha transition-colors p-1.5 rounded-md hover:bg-gray-100"
        >
          <Menu size={16} /> History
        </button>
        
        <div className="flex gap-2">
          <button 
            onClick={() => {
              createSession();
              setShowHistory(false);
            }}
            className="flex items-center gap-1 text-xs font-medium text-gray-600 hover:text-matcha transition-colors p-1.5 rounded-md hover:bg-gray-100"
          >
            <Plus size={16} /> New
          </button>
          
          <button 
            onClick={() => setShowClearModal(true)}
            className="flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-600 transition-colors p-1.5 rounded-md hover:bg-red-50"
            title="Clear Chat"
          >
            <Trash2 size={16} /> Clear
          </button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div 
            key={msg.id || idx} 
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div 
              className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                msg.role === 'user' 
                  ? 'bg-matcha text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                className="prose prose-sm prose-p:my-1 prose-ul:my-1 max-w-none break-words"
              >
                {msg.content || (isTyping && idx === messages.length - 1 ? '...' : '')}
              </ReactMarkdown>
            </div>
            <span className="text-[10px] text-gray-400 mt-1 mx-1">
              {msg.role === 'assistant' ? 'AI Barista' : 'You'}
            </span>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-center text-matcha gap-2 pl-2">
            <Loader2 size={16} className="animate-spin" />
            <span className="text-xs">Typing...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length < 3 && (
        <div className="px-4 pb-2 flex flex-wrap gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(q)}
              disabled={isTyping}
              className="text-xs bg-sakura/20 text-pink-800 px-3 py-1.5 rounded-full hover:bg-sakura/40 transition-colors border border-sakura/30 disabled:opacity-50"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div className="p-3 border-t border-gray-100 bg-white z-10 relative">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(input); }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our menu..."
            className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-matcha/50 focus:border-matcha"
            disabled={isTyping}
            autoFocus
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="p-2 bg-matcha text-white rounded-full hover:bg-[#5a7a1c] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* History Sidebar Drawer */}
      <AnimatePresence>
        {showHistory && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 bg-white z-20 flex flex-col"
          >
            <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50">
              <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <MessageSquare size={18} className="text-matcha" /> Chats
              </h3>
              <button onClick={() => setShowHistory(false)} className="p-1 hover:bg-gray-200 rounded-md">
                <X size={18} className="text-gray-500" />
              </button>
            </div>
            
            <div className="p-3">
              <div className="relative">
                <Search size={14} className="absolute left-2.5 top-2.5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search chats..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-sm bg-gray-100 border-transparent rounded-md focus:bg-white focus:ring-1 focus:ring-matcha outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-2 pb-2 space-y-1">
              {filteredSessions.map(session => (
                <div 
                  key={session.id}
                  className={`flex items-center justify-between group p-2 rounded-md transition-colors ${
                    session.id === activeSessionId ? 'bg-matcha/10' : 'hover:bg-gray-50'
                  }`}
                >
                  <button 
                    className="flex-1 text-left truncate mr-2 text-sm text-gray-700"
                    onClick={() => {
                      switchSession(session.id);
                      setShowHistory(false);
                    }}
                  >
                    {editingId === session.id ? (
                      <input 
                        autoFocus
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            renameSession(session.id, editTitle);
                            setEditingId(null);
                          }
                        }}
                        className="w-full bg-white border border-gray-300 rounded px-1 py-0.5 text-sm"
                      />
                    ) : (
                      <span className={session.id === activeSessionId ? 'font-medium text-matcha' : ''}>
                        {session.title}
                      </span>
                    )}
                  </button>
                  
                  <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                    {editingId === session.id ? (
                      <button onClick={(e) => {
                        e.stopPropagation();
                        renameSession(session.id, editTitle);
                        setEditingId(null);
                      }} className="p-1 text-green-600 hover:bg-green-50 rounded">
                        <Check size={14} />
                      </button>
                    ) : (
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setEditTitle(session.title);
                        setEditingId(session.id);
                      }} className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded">
                        <Edit2 size={14} />
                      </button>
                    )}
                    <button onClick={(e) => {
                      e.stopPropagation();
                      deleteSession(session.id);
                    }} className="p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded ml-1">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-3 border-t border-gray-100">
              <button 
                onClick={() => {
                  clearAllSessions();
                  setShowHistory(false);
                }}
                className="w-full py-2 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors"
              >
                Delete All Chats
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Clear Chat Confirmation Modal */}
      <AnimatePresence>
        {showClearModal && (
          <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-5 w-full max-w-sm"
            >
              <h3 className="font-bold text-gray-900 text-lg mb-2">Clear Chat</h3>
              <p className="text-gray-600 text-sm mb-6">Are you sure you want to clear this conversation? This action cannot be undone.</p>
              
              <div className="flex gap-3 justify-end">
                <button 
                  onClick={() => setShowClearModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleClearChat}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 size={16} /> Clear Chat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Chatbot;
