import React from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types';
import { Home, ArrowLeftRight, TrendingUp, History, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, t } = useApp();

  const tabs: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'home', label: t.navHome, icon: Home },
    { id: 'compare', label: t.navCompare, icon: ArrowLeftRight },
    { id: 'forecast', label: t.navForecast, icon: TrendingUp },
    { id: 'history', label: t.navHistory, icon: History },
    { id: 'profile', label: t.navProfile, icon: User }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#FFFDF9]/95 backdrop-blur-md border-t border-[#D2691E]/20 shadow-[0_-4px_20px_rgba(38,32,26,0.08)] md:hidden">
      <div className="max-w-md mx-auto grid grid-cols-5 px-1 py-1.5">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`min-h-[48px] flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all active:scale-95 ${
                isActive
                  ? 'text-[#1F5C3F] font-black'
                  : 'text-[#26201A]/65 hover:text-[#1F5C3F] font-bold'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-gradient-to-br from-[#1F5C3F]/15 to-[#2E9CAB]/20 text-[#1F5C3F]'
                    : 'text-[#D2691E]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
              </div>
              <span className="text-[10px] tracking-tight truncate max-w-[62px] text-center">{tab.label}</span>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-[#1F5C3F] mt-0.5"></div>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
