import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  timestamp: number;
}

export type AIProvider = 'openrouter' | 'google' | 'groq';

const INITIAL_MESSAGE: ChatMessage = {
  id: 'initial',
  role: 'assistant',
  content: 'いらっしゃいませ！ Welcome to Sakura Brew Cafe. I am your AI Barista. How can I help you today? Would you like a menu recommendation?',
  timestamp: Date.now(),
};

interface AppState {
  // API Keys
  apiKeys: Record<AIProvider, string>;
  setApiKey: (provider: AIProvider, key: string) => void;
  deleteApiKey: (provider: AIProvider) => void;
  
  // Settings
  selectedProvider: AIProvider;
  setSelectedProvider: (provider: AIProvider) => void;
  selectedModel: string;
  setSelectedModel: (model: string) => void;
  
  // Chat Sessions
  sessions: ChatSession[];
  activeSessionId: string;
  
  createSession: () => void;
  switchSession: (id: string) => void;
  renameSession: (id: string, title: string) => void;
  deleteSession: (id: string) => void;
  clearAllSessions: () => void;
  
  // Current Chat actions
  addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  updateLastMessage: (content: string) => void;
  clearCurrentChat: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => {
      const initialSessionId = Math.random().toString(36).substring(7);
      
      return {
        apiKeys: {
          openrouter: '',
          google: '',
          groq: '',
        },
        setApiKey: (provider, key) =>
          set((state) => ({
            apiKeys: { ...state.apiKeys, [provider]: key },
          })),
        deleteApiKey: (provider) =>
          set((state) => ({
            apiKeys: { ...state.apiKeys, [provider]: '' },
          })),
          
        selectedProvider: 'openrouter',
        setSelectedProvider: (provider) => set({ selectedProvider: provider }),
        
        selectedModel: 'meta-llama/llama-3.3-70b-instruct:free',
        setSelectedModel: (model) => set({ selectedModel: model }),
        
        sessions: [
          {
            id: initialSessionId,
            title: 'New Conversation',
            messages: [{ ...INITIAL_MESSAGE, timestamp: Date.now() }],
            timestamp: Date.now(),
          }
        ],
        activeSessionId: initialSessionId,
        
        createSession: () => set((state) => {
          const newId = Math.random().toString(36).substring(7);
          return {
            sessions: [
              {
                id: newId,
                title: 'New Conversation',
                messages: [{ ...INITIAL_MESSAGE, timestamp: Date.now() }],
                timestamp: Date.now(),
              },
              ...state.sessions,
            ],
            activeSessionId: newId,
          };
        }),
        
        switchSession: (id) => set({ activeSessionId: id }),
        
        renameSession: (id, title) => set((state) => ({
          sessions: state.sessions.map(s => s.id === id ? { ...s, title } : s)
        })),
        
        deleteSession: (id) => set((state) => {
          const newSessions = state.sessions.filter(s => s.id !== id);
          if (newSessions.length === 0) {
            const newId = Math.random().toString(36).substring(7);
            return {
              sessions: [{
                id: newId,
                title: 'New Conversation',
                messages: [{ ...INITIAL_MESSAGE, timestamp: Date.now() }],
                timestamp: Date.now(),
              }],
              activeSessionId: newId,
            };
          }
          return {
            sessions: newSessions,
            activeSessionId: state.activeSessionId === id ? newSessions[0].id : state.activeSessionId,
          };
        }),
        
        clearAllSessions: () => set(() => {
          const newId = Math.random().toString(36).substring(7);
          return {
            sessions: [{
              id: newId,
              title: 'New Conversation',
              messages: [{ ...INITIAL_MESSAGE, timestamp: Date.now() }],
              timestamp: Date.now(),
            }],
            activeSessionId: newId,
          };
        }),
        
        addMessage: (message) => set((state) => {
          return {
            sessions: state.sessions.map(s => {
              if (s.id === state.activeSessionId) {
                const isFirstUserMessage = s.messages.length === 1 && message.role === 'user';
                return {
                  ...s,
                  title: isFirstUserMessage ? message.content.slice(0, 30) + '...' : s.title,
                  messages: [
                    ...s.messages,
                    { ...message, id: Math.random().toString(36).substring(7), timestamp: Date.now() }
                  ]
                };
              }
              return s;
            })
          };
        }),
        
        updateLastMessage: (content) => set((state) => ({
          sessions: state.sessions.map(s => {
            if (s.id === state.activeSessionId && s.messages.length > 0) {
              const newMessages = [...s.messages];
              newMessages[newMessages.length - 1].content = content;
              return { ...s, messages: newMessages };
            }
            return s;
          })
        })),
        
        clearCurrentChat: () => set((state) => ({
          sessions: state.sessions.map(s => {
            if (s.id === state.activeSessionId) {
              return {
                ...s,
                messages: [{ ...INITIAL_MESSAGE, timestamp: Date.now() }],
              };
            }
            return s;
          })
        })),
      };
    },
    {
      name: 'sakura-cafe-storage',
      partialize: (state) => ({
        apiKeys: state.apiKeys,
        selectedProvider: state.selectedProvider,
        selectedModel: state.selectedModel,
        sessions: state.sessions,
        activeSessionId: state.activeSessionId,
      }), // persist all sessions
    }
  )
);
