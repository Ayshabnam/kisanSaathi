import React from 'react';
import { Home, Sprout, TrendingUp, Wallet, User, Mic } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, setIsVoiceModalOpen, t } = useApp();

  const navItems = [
    { id: 'home' as const, label: t.navHome, icon: Home },
    { id: 'crops' as const, label: t.navCrops, icon: Sprout },
    { id: 'sell' as const, label: t.navSell, icon: TrendingUp, highlight: true },
    { id: 'earnings' as const, label: t.navEarnings, icon: Wallet },
    { id: 'profile' as const, label: t.navProfile, icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-md border-t border-emerald-100 shadow-lg">
      <div className="max-w-md mx-auto px-2 py-1.5 flex items-center justify-around relative">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-200 min-h-[50px] ${
                isActive
                  ? 'text-emerald-800 font-bold bg-emerald-50/90'
                  : 'text-slate-500 hover:text-emerald-700 font-medium'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'}`} />
                {item.id === 'sell' && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-white"></span>
                )}
              </div>
              <span className="text-[11px] mt-0.5 tracking-tight truncate max-w-[64px] text-center">
                {item.label}
              </span>
            </button>
          );
        })}

        {/* Large Floating Voice Assistant Button (Positioned comfortably above or within reach) */}
        <div className="absolute -top-6 right-4 sm:right-6">
          <button
            id="floating-voice-button"
            onClick={() => setIsVoiceModalOpen(true)}
            className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold py-2 px-3.5 rounded-full shadow-xl shadow-emerald-900/30 border-2 border-amber-300 transition transform active:scale-95"
            aria-label="Voice Assistant"
          >
            <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center shadow-inner">
              <Mic className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs tracking-wide pr-0.5">{t.speakButton}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};
