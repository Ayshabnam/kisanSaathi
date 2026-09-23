import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Languages,
  Mic,
  Bell,
  Sparkles,
  MapPin,
  Check,
  ChevronDown
} from 'lucide-react';
import { Language } from '../types';

interface HeaderProps {
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
  const {
    t,
    language,
    setLanguage,
    languagesList,
    location,
    notifications,
    startVoiceInput,
    isListening
  } = useApp();

  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.isRead).length;
  const currentLangObj = languagesList.find(l => l.code === language) || languagesList[0];

  return (
    <header className="sticky top-0 z-30 bg-[#1F5C3F] text-white shadow-warm-md border-b border-[#184831]">
      {/* Top micro announcement bar */}
      <div className="bg-[#143D2A] px-4 py-1.5 text-xs flex justify-between items-center text-[#FBF6EE]/90 border-b border-[#0F3021]">
        <div className="flex items-center gap-2 text-[11px] font-medium tracking-wide">
          <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse"></span>
          <span className="text-[#F5A623] font-bold">VayalWay</span>
          <span className="text-emerald-300">•</span>
          <span className="hidden sm:inline text-emerald-50">{t.appTagline}</span>
          <span className="sm:hidden text-emerald-50">Net Return & 14-Day Predictor</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Location indicator */}
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-50 truncate max-w-[160px] sm:max-w-[240px]">
            <MapPin className="w-3.5 h-3.5 text-[#F5A623] shrink-0" />
            <span className="truncate">{location.split(',')[0]}</span>
          </div>
        </div>
      </div>

      {/* Main navigation header */}
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* App Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#F5A623] via-[#D2691E] to-[#1F5C3F] p-0.5 shadow-warm-sm flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#1F5C3F] rounded-[14px] flex items-center justify-center text-xl shadow-inner">
              🌾
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-extrabold text-xl sm:text-2xl tracking-tight text-white flex items-center">
                Vayal<span className="text-[#F5A623]">Way</span>
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D2691E] text-white shadow-xs uppercase tracking-wider">
                Mandi Net
              </span>
            </div>
            <p className="text-[11px] text-emerald-100 hidden sm:block font-medium">
              {t.appTagline}
            </p>
          </div>
        </div>

        {/* Right utility controls: Voice mic, Language Dropdown, Notification Bell */}
        <div className="flex items-center gap-2.5">
          {/* Voice Input Quick Button - 44px min touch target */}
          <button
            onClick={() => startVoiceInput('general')}
            title={t.voiceActionPrompt}
            aria-label="Voice input"
            className={`min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shadow-warm-sm ${
              isListening
                ? 'bg-rose-600 text-white animate-pulse ring-2 ring-rose-300'
                : 'bg-gradient-to-r from-[#D2691E] to-[#F5A623] hover:opacity-95 text-white active:scale-95'
            }`}
          >
            <Mic className={`w-4 h-4 ${isListening ? 'animate-bounce' : ''}`} />
            <span className="hidden md:inline">{isListening ? t.listening : t.tapToSpeak}</span>
          </button>

          {/* Language Selector Dropdown - 44px min touch target */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="min-h-[44px] flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-[#276E4D] hover:bg-[#2F815B] border border-[#399368] text-xs font-bold text-white transition active:scale-95 shadow-warm-sm"
              aria-label="Change language"
            >
              <Languages className="w-4 h-4 text-[#F5A623]" />
              <span className="font-semibold">{currentLangObj.nativeName}</span>
              <ChevronDown className={`w-3.5 h-3.5 text-emerald-100 transition-transform ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {isLangDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsLangDropdownOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-52 bg-white text-[#26201A] rounded-2xl shadow-warm-lg border border-[#F5A623]/30 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3.5 py-1.5 border-b border-amber-100 text-[11px] font-bold text-[#D2691E] uppercase tracking-wider flex items-center justify-between">
                    <span>{t.selectLanguage}</span>
                    <Sparkles className="w-3.5 h-3.5 text-[#F5A623]" />
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-amber-50/60">
                    {languagesList.map((item) => {
                      const isSelected = item.code === language;
                      return (
                        <button
                          key={item.code}
                          onClick={() => {
                            setLanguage(item.code as Language);
                            setIsLangDropdownOpen(false);
                          }}
                          className={`w-full min-h-[44px] px-3.5 py-2.5 text-left text-xs flex items-center justify-between transition-colors ${
                            isSelected
                              ? 'bg-[#FBF6EE] text-[#D2691E] font-black'
                              : 'text-[#26201A] hover:bg-[#FBF6EE]/60 font-medium'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-base">{item.flag}</span>
                            <div>
                              <div className="text-[13px] leading-tight font-bold">{item.nativeName}</div>
                              <div className="text-[10px] text-stone-500">{item.label}</div>
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-[#D2691E] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Notification Bell - 44px min touch target */}
          <button
            onClick={onOpenNotifications}
            className="min-h-[44px] min-w-[44px] relative p-2.5 rounded-2xl bg-[#276E4D] hover:bg-[#2F815B] border border-[#399368] text-emerald-100 hover:text-white transition active:scale-95 flex items-center justify-center shadow-warm-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F5A623] text-[#26201A] font-black text-[10px] rounded-full flex items-center justify-center shadow-xs">
                {unreadCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
