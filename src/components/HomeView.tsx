import React from 'react';
import { 
  Sun, TrendingUp, Sprout, Wallet, ArrowRight, Mic, 
  MapPin, Truck, Sparkles, ChevronRight, CheckCircle2 
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HomeView: React.FC = () => {
  const { 
    profile, 
    t, 
    setActiveTab, 
    setSelectedCropId, 
    setQuantity, 
    setIsVoiceModalOpen, 
    crops, 
    farmerCrops, 
    sales 
  } = useApp();

  // Current month summary metrics
  const currentMonthSales = sales.filter(s => s.month === 'September 2026');
  const monthTotalSales = currentMonthSales.reduce((sum, s) => sum + s.grossRevenue, 0);
  const monthTotalExpenses = currentMonthSales.reduce((sum, s) => sum + (s.transportCost + s.otherExpenses), 0);
  const monthNetReturn = monthTotalSales - monthTotalExpenses;

  // Featured crop for the prominent card (Tomato - 500 kg as requested)
  const featuredCrop = crops.find(c => c.id === 'tomato') || crops[0];
  const featuredBestMarket = featuredCrop.availableMarkets.find(m => m.id === 'market_b') || featuredCrop.availableMarkets[0];
  const featuredNetReturn = 14000; // ₹32/kg * 500kg = 16000 - 1500 transport - 500 handling = 14000

  const handleOpenFeaturedSell = () => {
    setSelectedCropId('tomato');
    setQuantity(500);
    setActiveTab('sell');
  };

  const handleCropQuickSell = (cropId: string, qty: number) => {
    setSelectedCropId(cropId);
    setQuantity(qty || 500);
    setActiveTab('sell');
  };

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-3.5 pt-3">
      {/* 1. Today's Overview Grid (Weather, My Crops, Market Rate, Net Return) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700">
            Today's Overview
          </span>
          <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Updates
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {/* Weather Card */}
          <div className="bg-white rounded-2xl p-3 shadow-xs border border-emerald-100 flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center text-xl shrink-0">
              🌤️
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Weather</span>
              <span className="text-xs font-extrabold text-slate-900 block truncate">28°C Sunny</span>
              <span className="text-[10px] text-emerald-700 font-semibold block truncate">Good for harvest</span>
            </div>
          </div>

          {/* My Crops Card */}
          <div 
            onClick={() => setActiveTab('crops')}
            className="bg-white rounded-2xl p-3 shadow-xs border border-emerald-100 flex items-center gap-2.5 cursor-pointer hover:border-emerald-300 transition"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-xl shrink-0">
              🌾
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">{t.myCrops}</span>
              <span className="text-xs font-extrabold text-slate-900 block truncate">
                {farmerCrops.length} Active Crops
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block truncate">1 Ready to sell</span>
            </div>
          </div>

          {/* Today's Market */}
          <div 
            onClick={() => setActiveTab('sell')}
            className="bg-white rounded-2xl p-3 shadow-xs border border-emerald-100 flex items-center gap-2.5 cursor-pointer hover:border-emerald-300 transition"
          >
            <div className="w-10 h-10 rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-xl shrink-0">
              💰
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">Today's Market</span>
              <span className="text-xs font-extrabold text-slate-900 block truncate">Tomato ₹32/kg</span>
              <span className="text-[10px] text-emerald-700 font-semibold block flex items-center gap-0.5">
                <TrendingUp className="w-2.5 h-2.5" /> Up +₹4 this week
              </span>
            </div>
          </div>

          {/* Monthly Earnings Card */}
          <div 
            onClick={() => setActiveTab('earnings')}
            className="bg-white rounded-2xl p-3 shadow-xs border border-emerald-100 flex items-center gap-2.5 cursor-pointer hover:border-emerald-300 transition"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl shrink-0">
              📊
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-bold text-gray-400 block">{t.thisMonth}</span>
              <span className="text-xs font-extrabold text-slate-900 block truncate">
                ₹{monthNetReturn.toLocaleString()}
              </span>
              <span className="text-[10px] text-emerald-700 font-semibold block truncate">
                Net Profit in hand
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. PROMINENT PROMPT CARD: Tomato — 500 kg / Best Estimated Return: ₹14,000 */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-5 shadow-lg border border-emerald-700 relative overflow-hidden">
        {/* Decorative corner glow */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍅</span>
              <div>
                <h3 className="font-extrabold text-base tracking-tight text-white">
                  Tomato — 500 kg
                </h3>
                <span className="text-[11px] text-emerald-200 font-medium">
                  Ready to harvest from your farm
                </span>
              </div>
            </div>

            <span className="text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 px-2.5 py-1 rounded-full shadow-sm">
              ⭐ Top Opportunity
            </span>
          </div>

          {/* Return Metric */}
          <div className="bg-white/10 rounded-2xl p-3.5 backdrop-blur-xs border border-white/15 mb-3.5">
            <span className="text-xs font-bold text-emerald-200 uppercase tracking-wider block mb-0.5">
              {t.bestEstimatedReturn}
            </span>
            <div className="text-3xl font-black text-amber-300 tracking-tight flex items-baseline gap-1">
              <span>₹{featuredNetReturn.toLocaleString()}</span>
              <span className="text-xs font-normal text-white/80">net profit</span>
            </div>

            {/* Quick Market details */}
            <div className="mt-2.5 pt-2 border-t border-white/10 grid grid-cols-3 gap-2 text-xs">
              <div>
                <span className="text-[10px] text-emerald-300 block">Market</span>
                <span className="font-bold flex items-center gap-1 text-white">
                  <MapPin className="w-3 h-3 text-amber-400 shrink-0" />
                  Market B
                </span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-300 block">Rate</span>
                <span className="font-bold text-white">₹32 / kg</span>
              </div>
              <div>
                <span className="text-[10px] text-emerald-300 block">Transport</span>
                <span className="font-bold text-white">₹1,500</span>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            id="home-view-selling-options"
            onClick={handleOpenFeaturedSell}
            className="w-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm py-3 px-4 rounded-2xl shadow-md transition flex items-center justify-center gap-2 active:scale-98"
          >
            <span>{t.viewSellingOptions}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 3. Voice Interaction Hero Card (Tap -> Speak -> Get Result) */}
      <div 
        onClick={() => setIsVoiceModalOpen(true)}
        className="bg-white rounded-3xl p-4 shadow-sm border-2 border-dashed border-emerald-300 hover:border-emerald-500 cursor-pointer transition flex items-center gap-3.5 bg-gradient-to-r from-emerald-50/60 to-white"
      >
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center shadow-md shrink-0 ring-4 ring-emerald-100">
          <Mic className="w-6 h-6 animate-pulse" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-0.5">
            <span className="text-xs font-black text-emerald-950">
              🎙️ Voice Assistant Ready
            </span>
            <span className="text-[9px] font-bold bg-amber-100 text-amber-900 px-1.5 py-0.2 rounded-full">
              Tap & Speak
            </span>
          </div>
          <p className="text-xs text-gray-600 truncate">
            "I have 500 kilograms of tomatoes"
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-emerald-700 shrink-0" />
      </div>

      {/* 4. Quick Actions Grid */}
      <div>
        <span className="text-xs font-black uppercase tracking-wider text-slate-700 block mb-2">
          Quick Actions
        </span>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            onClick={() => {
              setSelectedCropId('tomato');
              setActiveTab('sell');
            }}
            className="bg-white p-3 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 text-left transition"
          >
            <span className="text-xl mb-1 block">⚖️</span>
            <span className="text-xs font-bold text-slate-900 block">{t.sellMyProduce}</span>
            <span className="text-[10px] text-gray-500 block">Compare buyer rates</span>
          </button>

          <button
            onClick={() => {
              setSelectedCropId('tomato');
              setActiveTab('sell');
            }}
            className="bg-white p-3 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 text-left transition"
          >
            <span className="text-xl mb-1 block">🧮</span>
            <span className="text-xs font-bold text-slate-900 block">Net Calculator</span>
            <span className="text-[10px] text-gray-500 block">Revenue - Expenses</span>
          </button>

          <button
            onClick={() => setActiveTab('crops')}
            className="bg-white p-3 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 text-left transition"
          >
            <span className="text-xl mb-1 block">📅</span>
            <span className="text-xs font-bold text-slate-900 block">{t.cropCalendar}</span>
            <span className="text-[10px] text-gray-500 block">Seasonal demand guide</span>
          </button>

          <button
            onClick={() => setActiveTab('earnings')}
            className="bg-white p-3 rounded-2xl border border-emerald-100 shadow-xs hover:border-emerald-300 text-left transition"
          >
            <span className="text-xl mb-1 block">📊</span>
            <span className="text-xs font-bold text-slate-900 block">Monthly Report</span>
            <span className="text-[10px] text-gray-500 block">September net ₹38,000</span>
          </button>
        </div>
      </div>

      {/* 5. My Crops Quick List */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700">
            {t.myCrops} ({farmerCrops.length})
          </span>
          <button 
            onClick={() => setActiveTab('crops')}
            className="text-xs font-bold text-emerald-800 hover:underline"
          >
            View All →
          </button>
        </div>

        <div className="space-y-2">
          {farmerCrops.map((fc) => {
            const cropMaster = crops.find(c => c.id === fc.cropId) || crops[0];
            return (
              <div 
                key={fc.id}
                className="bg-white rounded-2xl p-3 shadow-xs border border-emerald-100 flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-2xl">{fc.emoji}</span>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-slate-900 truncate">
                      {fc.name}
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      {fc.quantityKg} kg • ₹{cropMaster.currentAvgPrice}/kg avg
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    fc.status === 'Ready to Harvest' 
                      ? 'bg-emerald-100 text-emerald-900' 
                      : 'bg-amber-100 text-amber-900'
                  }`}>
                    {fc.status}
                  </span>
                  <button
                    onClick={() => handleCropQuickSell(fc.cropId, fc.quantityKg)}
                    className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold px-2.5 py-1.5 rounded-xl transition"
                  >
                    Sell
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
