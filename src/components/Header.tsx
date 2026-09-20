import React, { useState } from 'react';
import { Bell, Globe, Sun, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const Header: React.FC = () => {
  const { t, language, setLanguage, profile, unreadCount, setIsNotificationModalOpen } = useApp();
  const [showLangMenu, setShowLangMenu] = useState(false);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return t.greetingMorning;
    if (hour < 17) return t.greetingAfternoon;
    return t.greetingEvening;
  };

  const languagesList: { code: Language; label: string; native: string; flag: string }[] = [
    { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  ];

  const currentLangObj = languagesList.find(l => l.code === language) || languagesList[0];

  return (
    <header className="sticky top-0 z-30 bg-emerald-900 text-white shadow-md">
      {/* App's Name Header Bar */}
      <div className="bg-emerald-950 px-4 py-2 text-xs flex justify-between items-center text-emerald-100 border-b border-emerald-800/60 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-emerald-500 to-amber-400 p-0.5 shadow-sm flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-emerald-950 rounded-[10px] flex items-center justify-center text-sm">
              🌾
            </div>
          </div>
          <span className="font-bold text-xs text-white tracking-tight flex items-center gap-1.5">
            <span className="font-black text-amber-300">kisanSaathi</span>
            <span className="text-emerald-400 font-bold">-</span>
            <span className="text-emerald-100 font-medium text-[11px]">farmers companion</span>
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-300 bg-emerald-900/80 px-2.5 py-1 rounded-full border border-emerald-800/80 shadow-xs">
          <Sun className="w-3 h-3 text-amber-400 shrink-0" />
          <span className="font-medium">{t.weatherSunny}</span>
        </div>
      </div>

      {/* Main Header Bar */}
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-amber-500 p-0.5 shadow flex items-center justify-center">
            <div className="w-full h-full bg-emerald-900 rounded-[14px] flex items-center justify-center text-xl">
              👨‍🌾
            </div>
          </div>
          <div>
            <p className="text-xs text-emerald-200 font-medium leading-none mb-1">
              {getGreeting()},
            </p>
            <h1 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
              {profile.name ? profile.name : t.farmer}
              <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-emerald-800/80 text-amber-300 border border-emerald-700/60">
                {profile.location.split(',')[0] || 'Kolar'}
              </span>
            </h1>
          </div>
        </div>

        {/* Right Actions: Language Selector & Notifications */}
        <div className="flex items-center gap-2">
          {/* Language Selector Dropdown */}
          <div className="relative">
            <button
              id="header-language-toggle"
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1.5 bg-emerald-800/80 hover:bg-emerald-700/80 text-white text-xs font-semibold px-2.5 py-1.5 rounded-xl border border-emerald-700 transition active:scale-95"
              aria-label="Change Language"
            >
              <span>{currentLangObj.flag}</span>
              <span>{currentLangObj.native}</span>
            </button>

            {showLangMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl py-2 z-50 text-slate-800 border border-emerald-100 animate-in fade-in zoom-in-95">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-emerald-800 border-b border-gray-100">
                  {t.selectLanguage}
                </div>
                {languagesList.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm flex items-center justify-between hover:bg-emerald-50 transition ${
                      language === lang.code ? 'font-bold text-emerald-800 bg-emerald-50/70' : 'text-gray-700'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.native}</span>
                    </span>
                    <span className="text-xs text-gray-400">{lang.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notification Bell */}
          <button
            id="header-notification-button"
            onClick={() => setIsNotificationModalOpen(true)}
            className="relative p-2 bg-emerald-800/80 hover:bg-emerald-700/80 text-white rounded-xl border border-emerald-700 transition active:scale-95"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4 text-emerald-100" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-950 font-bold text-[11px] rounded-full flex items-center justify-center shadow-sm border-2 border-emerald-900">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
