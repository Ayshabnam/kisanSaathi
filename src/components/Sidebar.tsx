import React from 'react';
import { useApp } from '../context/AppContext';
import { NavTab } from '../types';
import { Home, ArrowLeftRight, TrendingUp, History, User, Mic, ShieldCheck, PhoneCall, Sparkles } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const { activeTab, setActiveTab, t, selectedCrop, startVoiceInput, isListening } = useApp();

  const tabs: { id: NavTab; label: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { id: 'home', label: t.navHome, icon: Home, desc: "Today's Mandi Pulse" },
    { id: 'compare', label: t.navCompare, icon: ArrowLeftRight, desc: 'Net Return Calculator' },
    { id: 'forecast', label: t.navForecast, icon: TrendingUp, desc: '14-Day Price Predictor' },
    { id: 'history', label: t.navHistory, icon: History, desc: 'Past sales & receipts' },
    { id: 'profile', label: t.navProfile, icon: User, desc: 'Settings & Helpline' }
  ];

  return (
    <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-white/90 backdrop-blur-md border-r border-[#D2691E]/15 min-h-[calc(100vh-64px)] p-4 shrink-0 shadow-warm-sm">
      {/* Quick Navigation Menu */}
      <div className="space-y-2 flex-1">
        <div className="px-3 py-1.5 text-[11px] font-extrabold text-[#D2691E] uppercase tracking-wider">
          Main Menu
        </div>
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full min-h-[48px] flex items-center gap-3 px-3.5 py-3 rounded-2xl text-left transition-all group card-3d ${
                isActive
                  ? 'bg-gradient-to-r from-[#1F5C3F] to-[#1F5C3F] text-white font-black shadow-warm-md'
                  : 'text-[#26201A] hover:bg-[#FBF6EE] hover:text-[#1F5C3F] font-bold'
              }`}
            >
              <div
                className={`p-2 rounded-xl transition-colors ${
                  isActive
                    ? 'bg-white/20 text-[#F5A623]'
                    : 'bg-[#FBF6EE] text-[#1F5C3F] group-hover:bg-[#F5A623]/20 group-hover:text-[#D2691E]'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm tracking-tight flex items-center gap-1.5">
                  <span>{tab.label}</span>
                  {tab.id === 'forecast' && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#2E9CAB]/20 text-[#2E9CAB] font-extrabold uppercase">
                      AI
                    </span>
                  )}
                </div>
                <div
                  className={`text-[11px] truncate font-medium ${
                    isActive ? 'text-white/80' : 'text-[#26201A]/60'
                  }`}
                >
                  {tab.desc}
                </div>
              </div>
            </button>
          );
        })}

        {/* Voice Assistant Shortcut Card */}
        <div className="pt-4">
          <div className="bg-gradient-to-br from-[#FFF8EE] to-[#FDF3E5] border border-[#F5A623]/40 rounded-2xl p-4 shadow-warm-sm">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#F5A623] to-[#D2691E] text-white flex items-center justify-center font-bold shadow-xs">
                <Mic className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-black text-[#26201A]">Voice Assistant</h4>
                <p className="text-[10px] text-[#D2691E] font-semibold">Speak in your language</p>
              </div>
            </div>
            <p className="text-[11px] text-[#26201A]/80 leading-snug mb-3 font-medium">
              Press the mic to check mandi prices, compare returns, or predict future trends.
            </p>
            <button
              onClick={() => startVoiceInput('general')}
              className={`w-full min-h-[44px] py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition ${
                isListening
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-gradient-to-r from-[#F5A623] to-[#D2691E] text-white hover:opacity-95 active:scale-95 shadow-warm-sm'
              }`}
            >
              <Mic className="w-4 h-4" />
              <span>{isListening ? t.listening : t.tapToSpeak}</span>
            </button>
          </div>
        </div>

        {/* Quick Crop Status Card */}
        <div className="pt-1">
          <div className="bg-[#EDF5EB] border border-[#1F5C3F]/20 rounded-2xl p-3 text-xs">
            <div className="flex items-center justify-between text-[#1F5C3F] text-[11px] mb-1.5 font-bold">
              <span>Active Market Crop</span>
              <span className="text-[#1F5C3F] font-extrabold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +{selectedCrop.trendPercentage}%
              </span>
            </div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-xl shadow-xs border border-[#1F5C3F]/20 shrink-0">
                {selectedCrop.emoji}
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-[#26201A] text-sm block truncate">
                  {selectedCrop.nameKey in t ? (t as any)[selectedCrop.nameKey] : selectedCrop.id}
                </span>
                <p className="text-[11px] text-[#26201A]/65 font-medium truncate">
                  Avg. ₹{selectedCrop.currentAvgPrice}/kg in your region
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Support Info */}
      <div className="pt-4 border-t border-[#D2691E]/15 text-xs text-[#26201A]/70 space-y-2">
        <a
          href="tel:18001801551"
          className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FBF6EE] hover:bg-[#F4ECE0] text-[#26201A] transition min-h-[44px]"
        >
          <PhoneCall className="w-4 h-4 text-[#1F5C3F] shrink-0" />
          <div className="truncate">
            <div className="text-[10px] text-[#26201A]/60 font-bold uppercase">Helpline (Toll-Free)</div>
            <div className="text-xs font-black text-[#1F5C3F]">1800-180-1551</div>
          </div>
        </a>

        <div className="flex items-center gap-1.5 text-[11px] text-[#26201A]/65 px-1 font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#1F5C3F] shrink-0" />
          <span>Verified Mandi & APMC Data</span>
        </div>
      </div>
    </aside>
  );
};
