import React from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  Scale,
  Sparkles,
  ArrowRight,
  Mic,
  Languages,
  CheckCircle2,
  Check
} from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const {
    showOnboarding,
    finishOnboarding,
    t,
    language,
    setLanguage,
    languagesList,
    setActiveTab
  } = useApp();

  if (!showOnboarding) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#2E2118]/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] rounded-[24px] max-w-lg w-full shadow-warm-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 border border-[#C1622D]/20">
        {/* Banner with Farmland Hills / Sun Golden-Hour SVG and Terracotta Gradient */}
        <div className="bg-gradient-to-br from-[#2D4F26] via-[#4A7C3F] to-[#C1622D] text-white p-6 sm:p-7 relative overflow-hidden text-center">
          {/* SVG Farmland Rice Paddy & Golden Hour Sun Motif */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <svg viewBox="0 0 500 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full object-cover">
              {/* Golden Sun */}
              <circle cx="250" cy="60" r="45" fill="#E8A93D" opacity="0.6"/>
              <path d="M250 5 V15 M250 105 V115 M195 60 H205 M295 60 H305" stroke="#E8A93D" strokeWidth="3" strokeLinecap="round"/>
              {/* Rolling Farmland / Terraced Paddy Hills */}
              <path d="M0 160 Q120 120 250 160 T500 150 L500 250 L0 250 Z" fill="#243F1E" opacity="0.8"/>
              <path d="M0 190 Q150 160 300 200 T500 180 L500 250 L0 250 Z" fill="#1B3217" opacity="0.9"/>
              <path d="M0 220 Q200 190 350 220 T500 210 L500 250 L0 250 Z" fill="#142611"/>
              {/* Rice crop stalks / Grain motifs */}
              <path d="M50 210 Q60 180 70 170 M70 170 Q75 160 85 165 M65 175 Q60 165 50 170" stroke="#E8A93D" strokeWidth="2" strokeLinecap="round"/>
              <path d="M430 210 Q440 180 450 170 M450 170 Q455 160 465 165 M445 175 Q440 165 430 170" stroke="#E8A93D" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Terracotta-to-transparent subtle gradient overlay for maximum readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2E2118]/80 via-[#C1622D]/40 to-transparent pointer-events-none" />

          <div className="relative z-10">
            <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-[#E8A93D] to-[#C1622D] p-1 shadow-warm-md mb-3 flex items-center justify-center">
              <div className="w-full h-full bg-[#FFFDF9] rounded-[20px] flex items-center justify-center text-3xl">
                🌾
              </div>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1">
              {t.appName}
            </h2>

            <p className="text-[#E8A93D] font-extrabold text-xs uppercase tracking-wider mb-2">
              Smart Mandi Price & Net Return Comparator
            </p>

            <p className="text-[#EDF5EB] text-xs sm:text-sm max-w-md mx-auto leading-relaxed font-medium">
              {t.onboardingDesc}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Language Selection: Dropdown & Visual Buttons */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-black text-[#2E2118] flex items-center gap-1.5">
                <Languages className="w-4 h-4 text-[#C1622D]" />
                <span>{t.selectLanguage}</span>
              </span>
              <span className="text-[11px] text-[#4A7C3F] font-bold">
                7 Indian Languages
              </span>
            </div>

            {/* Language Dropdown (as requested in prompt) */}
            <div className="mb-3">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-2xl border border-[#C1622D]/30 bg-[#FBF3E7] text-sm font-bold text-[#2E2118] focus:outline-none focus:ring-2 focus:ring-[#C1622D]"
              >
                {languagesList.map((item) => (
                  <option key={item.code} value={item.code}>
                    {item.nativeName} ({item.label})
                  </option>
                ))}
              </select>
            </div>

            {/* Quick Language Visual Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {languagesList.map((item) => {
                const isSelected = item.code === language;
                return (
                  <button
                    key={item.code}
                    onClick={() => setLanguage(item.code as Language)}
                    className={`min-h-[44px] p-2.5 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-95 ${
                      isSelected
                        ? 'bg-[#FFF8EE] border-[#C1622D] text-[#C1622D] font-black shadow-warm-xs ring-2 ring-[#C1622D]/20'
                        : 'bg-[#FFFDF9] hover:bg-[#FBF3E7] border-amber-200/60 text-[#2E2118] font-bold'
                    }`}
                  >
                    <div className="truncate">
                      <div className="text-xs truncate font-extrabold">{item.nativeName}</div>
                      <div className="text-[10px] text-stone-500 font-medium">{item.label}</div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#C1622D] shrink-0 stroke-[3]" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Core Benefits */}
          <div className="space-y-2 bg-[#EDF5EB]/70 p-3.5 rounded-2xl border border-[#4A7C3F]/25 text-xs text-[#2E2118]">
            <div className="flex items-start gap-2.5">
              <span className="text-[#4A7C3F] font-black text-sm">✓</span>
              <span className="font-medium">
                <strong className="text-[#2D4F26]">Net Take-Home Cash:</strong> Accounts for truck freight, diesel, and APMC fees.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#4A7C3F] font-black text-sm">✓</span>
              <span className="font-medium">
                <strong className="text-[#2D4F26]">Voice-Enabled:</strong> Speak crop & quantity naturally in your mother tongue.
              </span>
            </div>
            <div className="flex items-start gap-2.5">
              <span className="text-[#4A7C3F] font-black text-sm">✓</span>
              <span className="font-medium">
                <strong className="text-[#2D4F26]">Zero Complex Math:</strong> Automatically highlights the true highest-profit buyer.
              </span>
            </div>
          </div>

          {/* Action button (min-h-[48px]) */}
          <button
            onClick={() => {
              finishOnboarding();
              setActiveTab('compare');
            }}
            className="w-full min-h-[48px] py-3.5 px-4 rounded-2xl bg-[#E8A93D] hover:bg-[#D9992E] text-[#2E2118] font-black text-base flex items-center justify-center gap-2 shadow-warm-md active:scale-95 transition"
          >
            <span>{t.getStarted}</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </div>
  );
};
