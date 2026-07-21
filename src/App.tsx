import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Menu from './pages/Menu';
import About from './pages/About';
import Privacy from './pages/Privacy';
import Chatbot from './components/Chatbot';
import ApiKeyManager from './components/ApiKeyManager';
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-300">
        <Navbar />
        
        <main className="flex-grow w-full pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
        
        <Footer />

        {/* Floating Chat Button */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="fixed bottom-6 right-6 p-4 rounded-full bg-matcha text-white shadow-lg hover:shadow-xl transition-all duration-300 z-50 flex items-center justify-center transform hover:scale-105"
          aria-label="Toggle AI Chat"
        >
          {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>

        {/* Floating Chat Window */}
        <div 
          className={`fixed bottom-24 right-6 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white rounded-2xl shadow-2xl z-40 flex flex-col overflow-hidden transition-all duration-300 origin-bottom-right ${
            isChatOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="h-full flex flex-col bg-[#FAFAFA]">
            {/* Header */}
            <div className="bg-matcha text-white p-4 shrink-0 shadow-md z-10 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">AI Barista (AIバリスタ)</h3>
                <p className="text-xs text-white/80">Powered by BYOK</p>
              </div>
            </div>
            
            {/* API Manager Area - minimal toggle */}
            <ApiKeyManager />

            {/* Chatbot Area */}
            <div className="flex-grow overflow-hidden relative">
              <Chatbot />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
