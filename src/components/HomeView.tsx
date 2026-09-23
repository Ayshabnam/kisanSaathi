import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_CROPS } from '../data/mockData';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Mic,
  Sparkles,
  Calendar,
  Layers,
  CheckCircle2,
  LineChart,
  ArrowUpRight,
  Info
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const {
    t,
    profile,
    location,
    setActiveTab,
    setSelectedCropId,
    startVoiceInput,
    isListening,
    salesHistory,
    currentForecast,
    selectedCrop
  } = useApp();

  const [heroImageError, setHeroImageError] = useState(false);

  // Quick stats
  const totalNetEarned = salesHistory.reduce((acc, curr) => acc + curr.netReturn, 0);
  const totalProduceSold = salesHistory.reduce((acc, curr) => acc + curr.quantityKg, 0);

  const handleQuickCropCheck = (cropId: string) => {
    setSelectedCropId(cropId);
    setActiveTab('compare');
  };

  const handleQuickForecastCheck = (cropId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCropId(cropId);
    setActiveTab('forecast');
  };

  return (
    <div className="space-y-6 pb-24 md:pb-10">
      {/* 1. Hero Welcome Banner with Farmland Photo / SVG Fallback & 3D Layering */}
      <div className="perspective-container">
        <div className="card-3d relative rounded-3xl overflow-hidden shadow-warm-3d border border-[#D2691E]/20 min-h-[290px] flex items-center">
          {/* Background Farmland Photo or SVG Fallback */}
          {!heroImageError ? (
            <img
              src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1400&q=80"
              alt="Golden hour farmland"
              onError={() => setHeroImageError(true)}
              className="absolute inset-0 w-full h-full object-cover object-center transform scale-105 filter brightness-95"
            />
          ) : (
            /* Rich SVG Farm Scene Fallback */
            <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#1F5C3F] via-[#2A6B48] to-[#D2691E]">
              <svg
                viewBox="0 0 1000 400"
                className="w-full h-full object-cover opacity-25"
                preserveAspectRatio="none"
              >
                <circle cx="850" cy="120" r="80" fill="#F5A623" />
                <path d="M0 320 Q250 250 500 320 T1000 300 L1000 400 L0 400 Z" fill="#143D2A" />
                <path d="M0 350 Q300 290 600 360 T1000 340 L1000 400 L0 400 Z" fill="#0C291B" />
                <path d="M120 400 L160 280 L200 400 M320 400 L350 290 L380 400 M650 400 L680 300 L710 400" stroke="#F5A623" strokeWidth="2" strokeOpacity="0.3" />
              </svg>
            </div>
          )}

          {/* Dark-to-transparent terracotta-to-green gradient overlay for razor-sharp readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F5C3F]/92 via-[#1F5C3F]/82 to-[#D2691E]/75" />

          {/* Sunray & Grain Motif Watermark */}
          <div className="absolute right-4 -bottom-6 w-60 h-60 opacity-15 pointer-events-none">
            <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100" cy="100" r="70" stroke="#FFF" strokeWidth="2" strokeDasharray="6 6"/>
              <path d="M100 20 V60 M100 140 V180 M20 100 H60 M140 100 H180" stroke="#FFF" strokeWidth="3" strokeLinecap="round"/>
              <path d="M43 43 L71 71 M129 129 L157 157 M43 157 L71 129 M129 71 L157 43" stroke="#FFF" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 p-6 sm:p-8 md:p-10 max-w-2xl space-y-3.5 text-white">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-[#F5A623]/40 text-[#F5A623] text-xs font-black shadow-sm">
              <span>🌾 Namaste, {profile.name}</span>
              <span className="text-white/60">•</span>
              <span className="text-emerald-100 font-medium">{location.split(',')[0]}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              Compare Mandis by <span className="text-[#F5A623] drop-shadow-sm">Net Take-Home Cash</span> & Predict Future Rates
            </h1>

            <p className="text-emerald-50 text-sm sm:text-base leading-relaxed font-medium max-w-xl">
              Don't get tricked by high raw prices in distant cities. Calculate real transport & commission costs, and use 14-day forecasts to time your sale.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setActiveTab('compare')}
                className="min-h-[46px] px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F5A623] to-[#D2691E] text-white font-black text-sm flex items-center gap-2 shadow-amber-glow active:scale-95 transition-all"
              >
                <span>{t.comparePricesBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('forecast')}
                className="min-h-[46px] px-5 py-3 rounded-2xl bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/40 text-white font-bold text-sm flex items-center gap-2 active:scale-95 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#F5A623]" />
                <span>{t.navForecast}</span>
              </button>

              <button
                type="button"
                onClick={() => startVoiceInput('general')}
                className={`min-h-[46px] px-4 py-3 rounded-2xl border text-sm font-bold flex items-center gap-2 transition ${
                  isListening
                    ? 'bg-rose-600 text-white animate-pulse border-rose-400'
                    : 'bg-black/30 hover:bg-black/40 border-white/30 text-white active:scale-95'
                }`}
              >
                <Mic className="w-4 h-4 text-[#F5A623]" />
                <span>{isListening ? t.listening : t.tapToSpeak}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Brand New: Price Prediction & Forecast Spotlight (Sky Blue-Teal Accent) */}
      <div className="glass-teal-panel rounded-2xl p-5 shadow-warm-md relative overflow-hidden card-depth-3d">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1F5C3F] to-[#2E9CAB] text-white flex items-center justify-center shrink-0 shadow-teal-glow text-xl font-black">
              <Sparkles className="w-6 h-6 text-[#F5A623]" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <span className="text-xs font-black uppercase tracking-wider text-[#2E9CAB] bg-white/80 px-2 py-0.5 rounded-full border border-[#2E9CAB]/30">
                  AI Trend Forecast
                </span>
                <span className="text-xs font-bold text-[#26201A]/70">
                  {t[selectedCrop.nameKey as keyof typeof t] || selectedCrop.id}:
                </span>
                <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full inline-flex items-center gap-1 ${
                  currentForecast.verdict === 'rise'
                    ? 'bg-emerald-100 text-emerald-800'
                    : currentForecast.verdict === 'fall'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-sky-100 text-sky-800'
                }`}>
                  {currentForecast.verdict === 'rise' ? <TrendingUp className="w-3.5 h-3.5" /> : currentForecast.verdict === 'fall' ? <TrendingDown className="w-3.5 h-3.5" /> : null}
                  {currentForecast.verdictTitle}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-[#26201A]/85 leading-relaxed font-medium">
                {currentForecast.reason}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('forecast')}
            className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1F5C3F] to-[#2E9CAB] text-white font-extrabold text-xs shrink-0 flex items-center justify-center gap-2 shadow-sm hover:opacity-95 active:scale-95 transition-all"
          >
            <span>{t.viewForecast}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 3. Real Profit Golden Rule Card */}
      <div className="glass-panel border border-[#F5A623]/40 rounded-2xl p-5 shadow-warm-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-[#F5A623] text-[#26201A] flex items-center justify-center shrink-0 shadow-warm-sm text-2xl font-black">
              💡
            </div>
            <div>
              <h3 className="font-black text-base text-[#26201A] mb-1">
                The Golden Formula: Net Return in Hand
              </h3>
              <p className="text-xs sm:text-sm text-[#26201A]/85 leading-snug font-medium">
                <span className="font-extrabold text-[#D2691E]">(Offered Price × Quantity) − Transport Truck Hire − Mandi Broker Cess</span>
                <br />
                A ₹32/kg rate at 12 km often gives <span className="underline font-bold text-[#1F5C3F]">₹1,500 more cash</span> in hand than a ₹36/kg rate at 80 km!
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('compare')}
            className="min-h-[44px] px-4 py-2 rounded-xl bg-[#FBF6EE] hover:bg-[#F5ECD9] text-[#D2691E] border border-[#D2691E]/30 font-bold text-xs shrink-0 transition"
          >
            Try Calculator
          </button>
        </div>
      </div>

      {/* 4. Quick Price Check Across Popular Crops with 3D Depth */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-black text-lg text-[#26201A]">{t.popularCrops}</h3>
            <p className="text-xs text-[#26201A]/65 font-medium">{t.recentTrends}</p>
          </div>
          <button
            type="button"
            onClick={() => setActiveTab('compare')}
            className="min-h-[44px] px-2 text-xs font-bold text-[#D2691E] hover:text-[#B05524] flex items-center gap-1"
          >
            <span>All Crops</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {MOCK_CROPS.slice(0, 4).map((crop) => {
            const cropTranslated = crop.nameKey in t ? (t as any)[crop.nameKey] : crop.id;

            return (
              <div
                key={crop.id}
                onClick={() => handleQuickCropCheck(crop.id)}
                className="glass-panel rounded-2xl border border-[#D2691E]/15 p-4 shadow-warm-sm hover:shadow-warm-md hover:border-[#F5A623] cursor-pointer transition-all active:scale-[0.98] group card-3d"
              >
                <div className="flex items-center justify-between mb-2.5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FFF9EE] via-[#FDE8C7] to-[#F5A623]/30 flex items-center justify-center text-2xl shadow-warm-sm border border-[#F5A623]/40 group-hover:scale-110 transition-transform">
                    {crop.emoji}
                  </div>
                  <span className="inline-flex items-center gap-0.5 text-xs font-black text-[#1F5C3F] bg-[#EDF5EB] px-2.5 py-1 rounded-full border border-[#1F5C3F]/25">
                    <TrendingUp className="w-3 h-3 stroke-[2.5]" />
                    +{crop.trendPercentage}%
                  </span>
                </div>

                <h4 className="font-black text-base text-[#26201A] group-hover:text-[#D2691E] transition-colors">
                  {cropTranslated}
                </h4>

                <div className="flex items-baseline justify-between mt-2 pt-2 border-t border-[#D2691E]/15">
                  <div>
                    <span className="text-xl font-black text-[#26201A]">
                      ₹{crop.currentAvgPrice}
                    </span>
                    <span className="text-xs text-[#26201A]/60 font-medium">/kg avg</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleQuickForecastCheck(crop.id, e)}
                    className="text-[11px] font-bold text-[#2E9CAB] hover:underline flex items-center gap-0.5"
                    title="View Forecast"
                  >
                    <span>Forecast</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Sales Snapshot Card */}
      <div className="glass-panel rounded-2xl border border-[#D2691E]/15 p-5 shadow-warm-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#EDF5EB] text-[#1F5C3F] flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-base text-[#26201A]">{t.salesHistory}</h3>
              <p className="text-xs text-[#26201A]/65 font-medium">Recorded net earnings from smart comparisons</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className="min-h-[44px] px-3 py-2 text-xs font-black text-[#D2691E] hover:text-[#B05524]"
          >
            View All ({salesHistory.length})
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
          <div className="bg-white/80 p-3.5 rounded-2xl border border-[#F5A623]/30 shadow-sm">
            <span className="text-[10px] text-[#26201A]/60 font-bold uppercase">{t.totalEarnings}</span>
            <div className="text-xl font-black text-[#1F5C3F] mt-0.5">
              ₹{totalNetEarned.toLocaleString('en-IN')}
            </div>
          </div>
          <div className="bg-white/80 p-3.5 rounded-2xl border border-[#F5A623]/30 shadow-sm">
            <span className="text-[10px] text-[#26201A]/60 font-bold uppercase">{t.totalSoldProduce}</span>
            <div className="text-xl font-black text-[#26201A] mt-0.5">
              {totalProduceSold.toLocaleString('en-IN')} kg
            </div>
          </div>
          <div className="col-span-2 sm:col-span-1 bg-white/80 p-3.5 rounded-2xl border border-[#F5A623]/30 shadow-sm">
            <span className="text-[10px] text-[#26201A]/60 font-bold uppercase">{t.avgNetPerKg}</span>
            <div className="text-xl font-black text-[#D2691E] mt-0.5">
              ₹{totalProduceSold > 0 ? (totalNetEarned / totalProduceSold).toFixed(1) : '0'}/kg
            </div>
          </div>
        </div>

        {/* Recent Sale Item */}
        {salesHistory.length > 0 && (
          <div className="bg-[#EDF5EB]/70 border border-[#1F5C3F]/20 rounded-2xl p-3.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FFF9EE] to-[#FDE8C7] flex items-center justify-center text-xl shadow-xs border border-[#F5A623]/30 shrink-0">
                {salesHistory[0].emoji}
              </div>
              <div>
                <div className="font-black text-[#26201A] text-sm">
                  {salesHistory[0].cropName} ({salesHistory[0].quantityKg} kg)
                </div>
                <div className="text-[#26201A]/65 text-[11px] font-medium">
                  Sold to {salesHistory[0].marketName} • {salesHistory[0].date}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-black text-[#1F5C3F] text-base">
                +₹{salesHistory[0].netReturn.toLocaleString('en-IN')}
              </div>
              <span className="text-[10px] text-[#1F5C3F] font-extrabold bg-white border border-[#1F5C3F]/30 px-2 py-0.5 rounded-full inline-block mt-0.5 shadow-xs">
                Net in Hand
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
