import React, { useState } from 'react';
import { 
  Sprout, Calendar, Plus, Trash2, TrendingUp, AlertCircle, 
  ArrowRight, Check, CheckCircle2, ChevronRight, X 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MONTH_NAMES } from '../data/mockData';

export const MyCropsView: React.FC = () => {
  const { 
    farmerCrops, 
    addFarmerCrop, 
    deleteFarmerCrop, 
    crops, 
    setSelectedCropId, 
    setQuantity, 
    setActiveTab, 
    t 
  } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'my_crops' | 'calendar'>('my_crops');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCropForCalendar, setSelectedCropForCalendar] = useState(crops[0].id);

  // New crop form state
  const [newCropType, setNewCropType] = useState('tomato');
  const [newCropQty, setNewCropQty] = useState(500);
  const [newCropPlantDate, setNewCropPlantDate] = useState('Today');
  const [newCropHarvestDate, setNewCropHarvestDate] = useState('60 days');

  const activeCalendarCrop = crops.find(c => c.id === selectedCropForCalendar) || crops[0];

  const handleCreateCrop = (e: React.FormEvent) => {
    e.preventDefault();
    const master = crops.find(c => c.id === newCropType) || crops[0];
    addFarmerCrop({
      cropId: master.id,
      name: `${t[master.nameKey as keyof typeof t] || master.id} (Field Plot)`,
      emoji: master.emoji,
      quantityKg: newCropQty,
      plantingDate: newCropPlantDate,
      expectedHarvest: newCropHarvestDate,
      status: 'Growing'
    });
    setIsAddModalOpen(false);
  };

  const handleSellFarmerCrop = (cropId: string, qty: number) => {
    setSelectedCropId(cropId);
    setQuantity(qty);
    setActiveTab('sell');
  };

  // 1-12 Month suitability helper
  const getMonthSuitability = (monthIndex: number, crop: typeof activeCalendarCrop) => {
    const monthNum = monthIndex + 1;
    if (crop.seasonInfo.harvestMonths.includes(monthNum)) {
      return { label: 'Harvesting', color: 'bg-emerald-500 text-white', icon: '🌾' };
    }
    if (crop.seasonInfo.plantingMonths.includes(monthNum)) {
      return { label: 'Planting', color: 'bg-emerald-600 text-white', icon: '🌱' };
    }
    if (crop.seasonInfo.growingMonths.includes(monthNum)) {
      return { label: 'Growing', color: 'bg-emerald-100 text-emerald-900 border border-emerald-300', icon: '🌿' };
    }
    if (crop.seasonInfo.highDemandMonths.includes(monthNum)) {
      return { label: 'High Demand', color: 'bg-amber-400 text-slate-950 font-bold', icon: '📈' };
    }
    return { label: 'Off-Season', color: 'bg-gray-100 text-gray-400', icon: '⚠️' };
  };

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-3.5 pt-3">
      {/* View Header & Tabs */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{t.myCrops}</span>
            <span className="text-xl">🌱</span>
          </h2>
          <p className="text-xs text-emerald-800 font-medium">
            Manage your crops & check seasonal harvest calendar
          </p>
        </div>

        {activeSubTab === 'my_crops' && (
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center gap-1 shadow-sm transition active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.addCrop}</span>
          </button>
        )}
      </div>

      {/* Segmented Control: My Crops vs Crop Calendar */}
      <div className="bg-emerald-100/70 p-1 rounded-2xl flex">
        <button
          onClick={() => setActiveSubTab('my_crops')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'my_crops'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-emerald-800 hover:text-emerald-950'
          }`}
        >
          <Sprout className="w-3.5 h-3.5" />
          <span>{t.myCrops} ({farmerCrops.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('calendar')}
          className={`flex-1 py-2 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
            activeSubTab === 'calendar'
              ? 'bg-white text-emerald-900 shadow-xs'
              : 'text-emerald-800 hover:text-emerald-950'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>{t.cropCalendar}</span>
        </button>
      </div>

      {/* TAB 1: MY CROPS LIST */}
      {activeSubTab === 'my_crops' && (
        <div className="space-y-3">
          {farmerCrops.map((fc) => {
            const master = crops.find(c => c.id === fc.cropId) || crops[0];
            const isReady = fc.status === 'Ready to Harvest';

            return (
              <div
                key={fc.id}
                className={`bg-white rounded-3xl p-4 shadow-sm border-2 transition ${
                  isReady ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-emerald-100'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{fc.emoji}</span>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-sm leading-tight">
                        {fc.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Quantity: <strong className="text-slate-800">{fc.quantityKg} kg</strong>
                      </p>
                    </div>
                  </div>

                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                    isReady ? 'bg-emerald-600 text-white' : 'bg-amber-100 text-amber-900'
                  }`}>
                    {fc.status}
                  </span>
                </div>

                {/* Information Grid */}
                <div className="bg-emerald-50/60 rounded-2xl p-3 border border-emerald-100 my-2.5 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 block">{t.plantingDate}</span>
                    <span className="font-bold text-slate-800">{fc.plantingDate}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">{t.expectedHarvest}</span>
                    <span className="font-bold text-slate-800">{fc.expectedHarvest}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">{t.currentPrice}</span>
                    <span className="font-extrabold text-emerald-800">
                      ₹{master.currentAvgPrice} / kg
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 block">Season Status</span>
                    <span className="font-bold text-emerald-700">{master.seasonStatus}</span>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-1">
                  <button
                    onClick={() => deleteFarmerCrop(fc.id)}
                    className="text-xs text-gray-400 hover:text-rose-500 font-semibold flex items-center gap-1 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>

                  <button
                    id={`sell-my-crop-${fc.id}`}
                    onClick={() => handleSellFarmerCrop(fc.cropId, fc.quantityKg)}
                    className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-sm flex items-center gap-1.5 transition active:scale-95"
                  >
                    <span>{t.viewSellingOptions}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* TAB 2: DEDICATED CROP CALENDAR (Section 7 of Prompt) */}
      {activeSubTab === 'calendar' && (
        <div className="space-y-3">
          {/* Crop Selector Chips for Calendar */}
          <div className="bg-white rounded-2xl p-3 border border-emerald-100 shadow-xs">
            <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
              Select Crop to View Calendar:
            </span>
            <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
              {crops.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCropForCalendar(c.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 transition flex items-center gap-1.5 ${
                    selectedCropForCalendar === c.id
                      ? 'bg-emerald-800 text-white shadow-xs'
                      : 'bg-emerald-50 text-slate-700 hover:bg-emerald-100'
                  }`}
                >
                  <span>{c.emoji}</span>
                  <span>{t[c.nameKey as keyof typeof t] || c.id}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Crop Calendar Card */}
          <div className="bg-white rounded-3xl p-4 shadow-sm border border-emerald-100">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{activeCalendarCrop.emoji}</span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-base">
                    {t[activeCalendarCrop.nameKey as keyof typeof t] || activeCalendarCrop.id} Calendar
                  </h3>
                  <span className="text-[11px] text-emerald-700 font-semibold">
                    12-Month Suitability & Sowing Guide
                  </span>
                </div>
              </div>

              <span className="text-xs font-bold bg-emerald-100 text-emerald-900 px-2 py-1 rounded-xl">
                Avg: ₹{activeCalendarCrop.currentAvgPrice}/kg
              </span>
            </div>

            {/* 12 Months Visual Grid (Clean colors: 🟢 Suitable / 🟡 Moderate / 🔴 Off-season) */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {MONTH_NAMES.map((mName, idx) => {
                const suit = getMonthSuitability(idx, activeCalendarCrop);
                const isCurrentMonth = idx === 8; // September is month index 8

                return (
                  <div
                    key={mName}
                    className={`p-2 rounded-2xl text-center flex flex-col items-center justify-center transition border ${
                      isCurrentMonth ? 'ring-2 ring-amber-400 shadow-xs' : ''
                    } ${suit.color}`}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider block">
                      {mName.slice(0, 3)}
                    </span>
                    <span className="text-base my-0.5">{suit.icon}</span>
                    <span className="text-[9px] font-bold truncate max-w-[65px]">
                      {suit.label}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Simple Information Cards (avoiding complicated agricultural jargon) */}
            <div className="space-y-2 text-xs">
              <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
                <span className="text-[11px] font-bold text-emerald-900 block mb-0.5">
                  🌱 Best Growing Period:
                </span>
                <p className="text-gray-700 leading-snug">
                  {activeCalendarCrop.seasonInfo.bestGrowingPeriod}
                </p>
              </div>

              <div className="bg-emerald-50/70 p-3 rounded-2xl border border-emerald-100">
                <span className="text-[11px] font-bold text-emerald-900 block mb-0.5">
                  🌾 Typical Harvest Period:
                </span>
                <p className="text-gray-700 leading-snug">
                  {activeCalendarCrop.seasonInfo.typicalHarvestPeriod}
                </p>
              </div>

              <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200">
                <span className="text-[11px] font-bold text-amber-900 block mb-0.5">
                  📈 Market Demand:
                </span>
                <p className="text-amber-900 leading-snug">
                  {activeCalendarCrop.seasonInfo.marketDemandDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Crop Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-5 border border-emerald-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-4">
              <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-1.5">
                <span>🌱</span>
                <span>{t.addCrop}</span>
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCrop} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Select Crop:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {crops.map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={() => setNewCropType(c.id)}
                      className={`p-2.5 rounded-2xl border text-center transition flex flex-col items-center ${
                        newCropType === c.id
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold ring-2 ring-emerald-200'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-2xl mb-1">{c.emoji}</span>
                      <span className="text-xs font-bold truncate max-w-[70px]">
                        {t[c.nameKey as keyof typeof t] || c.id}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 block mb-1">
                  Quantity Expected / In Stock (kg):
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={newCropQty}
                    onChange={(e) => setNewCropQty(Number(e.target.value))}
                    className="flex-1 p-3 border-2 border-emerald-200 rounded-2xl font-bold text-base text-slate-900 focus:outline-none focus:border-emerald-600"
                  />
                  <span className="text-sm font-bold text-emerald-800">kg</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Planting Date:
                  </label>
                  <input
                    type="text"
                    value={newCropPlantDate}
                    onChange={(e) => setNewCropPlantDate(e.target.value)}
                    placeholder="e.g. 01 Aug 2026"
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-medium"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-700 block mb-1">
                    Expected Harvest:
                  </label>
                  <input
                    type="text"
                    value={newCropHarvestDate}
                    onChange={(e) => setNewCropHarvestDate(e.target.value)}
                    placeholder="e.g. 45 days"
                    className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-medium"
                  />
                </div>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs rounded-2xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl shadow-md transition"
                >
                  Save Crop
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
