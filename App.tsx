
import React, { useState } from 'react';
import GameContainer from './components/GameContainer';
import InfoView from './components/InfoView';
import { HOW_IT_WORKS, PRIVACY_POLICY } from './constants';

type AppView = 'game' | 'how-it-works' | 'privacy';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('game');

  const renderContent = () => {
    switch (view) {
      case 'how-it-works':
        return <InfoView title={HOW_IT_WORKS.title} sections={HOW_IT_WORKS.sections} onBack={() => setView('game')} />;
      case 'privacy':
        return <InfoView title={PRIVACY_POLICY.title} sections={PRIVACY_POLICY.sections} onBack={() => setView('game')} />;
      default:
        return <GameContainer />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col selection:bg-sky-500/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-slate-900 to-black"></div>
      
      {/* Header */}
      <header className="py-6 px-8 flex justify-between items-center glass-card border-none bg-transparent">
        <div 
          className="flex items-center gap-2 cursor-pointer group" 
          onClick={() => setView('game')}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-lg flex items-center justify-center font-display font-bold text-xl shadow-lg shadow-sky-500/20 group-hover:scale-110 transition-transform">
            360
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-white">IQ</span>
        </div>
        <nav className="flex items-center gap-4">
          <div className="flex gap-6 text-sm font-medium text-slate-400">
            <button 
              onClick={() => setView('how-it-works')}
              className={`hover:text-white transition-colors ${view === 'how-it-works' ? 'text-white' : ''}`}
            >
              How it works
            </button>
            <button 
              onClick={() => setView('privacy')}
              className={`hover:text-white transition-colors ${view === 'privacy' ? 'text-white' : ''}`}
            >
              Privacy
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 pb-20 pt-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800/50 text-center text-slate-500 text-xs">
        <div className="flex justify-center gap-4 mb-3">
          <div className="w-1 h-1 rounded-full bg-sky-500/50"></div>
          <div className="w-1 h-1 rounded-full bg-indigo-500/50"></div>
          <div className="w-1 h-1 rounded-full bg-purple-500/50"></div>
        </div>
        <p className="mb-1 text-slate-400 font-medium">Powered by WealthMind Psychology & Gemini Flash Thinking</p>
        <p>&copy; {new Date().getFullYear()} 360IQ – All Intellectual Property Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
