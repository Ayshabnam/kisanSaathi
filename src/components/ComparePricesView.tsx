import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_CROPS } from '../data/mockData';
import { CalculatedMarketResult } from '../context/AppContext';
import {
  Mic,
  MapPin,
  TrendingUp,
  TrendingDown,
  Minus,
  Plus,
  Truck,
  Building2,
  PhoneCall,
  CheckCircle,
  HelpCircle,
  ArrowUpDown,
  ChevronDown,
  ChevronUp,
  Award,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  ShieldCheck,
  Scale
} from 'lucide-react';

export const ComparePricesView: React.FC = () => {
  const {
    t,
    selectedCropId,
    setSelectedCropId,
    selectedCrop,
    quantityKg,
    setQuantityKg,
    location,
    setLocation,
    isLocating,
    detectLocation,
    commonLocations,
    sortMode,
    setSortMode,
    calculatedResults,
    recordNewSale,
    startVoiceInput,
    isListening,
    voiceField,
    speakText,
    setActiveTab,
    currentForecast
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedMarketId, setExpandedMarketId] = useState<string | null>(null);
  const [saleRecordedFeedback, setSaleRecordedFeedback] = useState<string | null>(null);
  const [showExplanationModal, setShowExplanationModal] = useState<boolean>(false);

  // Filter crops by category
  const categories = ['All', 'Vegetables', 'Grains', 'Cash Crops'];
  const filteredCrops = MOCK_CROPS.filter(crop => {
    if (activeCategory === 'All') return true;
    return crop.category === activeCategory;
  });

  // Stepper handlers
  const handleIncreaseQty = (step: number = 50) => {
    setQuantityKg(quantityKg + step);
  };

  const handleDecreaseQty = (step: number = 50) => {
    setQuantityKg(Math.max(50, quantityKg - step));
  };

  const handlePresetQty = (val: number) => {
    setQuantityKg(val);
  };

  const toggleExpandMarket = (marketId: string) => {
    setExpandedMarketId(prev => (prev === marketId ? null : marketId));
  };

  const handleRecordSale = (result: CalculatedMarketResult) => {
    recordNewSale(result);
    setSaleRecordedFeedback(result.market.id);
    setTimeout(() => {
      setSaleRecordedFeedback(null);
    }, 3500);
  };

  const bestResult = calculatedResults.find(r => r.isBestValue) || calculatedResults[0];

  return (
    <div className="space-y-6 pb-24 md:pb-10">
      {/* Page Title & Intro */}
      <div className="bg-gradient-to-r from-[#1F5C3F] via-[#246A49] to-[#D2691E] text-white rounded-3xl p-5 sm:p-7 shadow-warm-lg relative overflow-hidden border border-[#1F5C3F]/30 card-3d">
        <div className="absolute -right-8 -bottom-8 w-52 h-52 bg-[#F5A623]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/35 backdrop-blur-md border border-[#F5A623]/40 text-[#F5A623] text-xs font-bold mb-3 shadow-xs">
            <Scale className="w-3.5 h-3.5" />
            <span>VayalWay Net Profit Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            {t.resultsTitle}
          </h2>
          <p className="text-emerald-50 text-sm sm:text-base leading-relaxed font-medium">
            {t.onboardingDesc}
          </p>
        </div>
      </div>

      {/* 14-Day Price Forecast Teaser Banner (Sky Blue-Teal) */}
      <div className="glass-teal-panel rounded-2xl p-4 shadow-warm-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-[#2E9CAB]/30 card-3d">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1F5C3F] to-[#2E9CAB] text-white flex items-center justify-center shrink-0 shadow-teal-glow">
            <Sparkles className="w-5 h-5 text-[#F5A623]" />
          </div>
          <div>
            <div className="text-xs font-black text-[#2E9CAB] uppercase tracking-wider flex items-center gap-1.5">
              <span>{t.forecastTitle}</span>
              <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-[#2E9CAB]/20 text-[#1F5C3F]">
                {currentForecast.verdictTitle}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#26201A] mt-0.5">
              {currentForecast.recommendationHeadline}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setActiveTab('forecast')}
          className="min-h-[40px] px-4 py-2 rounded-xl bg-gradient-to-r from-[#1F5C3F] to-[#2E9CAB] text-white font-extrabold text-xs shrink-0 flex items-center gap-1.5 shadow-sm hover:opacity-95 active:scale-95 transition-all"
        >
          <span>{t.viewForecast}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 3-STEP INPUT CARD */}
      <div className="bg-white rounded-[24px] border border-[#C1622D]/15 shadow-warm-md p-4 sm:p-6 space-y-6">
        {/* STEP 1: Select Crop */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#C1622D] text-white text-xs font-black flex items-center justify-center shadow-xs">
                1
              </span>
              <div>
                <h3 className="font-black text-base text-[#2E2118]">{t.step1Title}</h3>
                <p className="text-xs text-stone-600 font-medium">{t.step1Subtitle}</p>
              </div>
            </div>

            {/* Voice button for crop - 44px min target */}
            <button
              onClick={() => startVoiceInput('crop')}
              className={`min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition shadow-warm-sm ${
                isListening && voiceField === 'crop'
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-[#FBF3E7] text-[#C1622D] hover:bg-[#F4E8D6] border border-[#C1622D]/30'
              }`}
              title="Speak crop name"
            >
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">Speak Crop</span>
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-3.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  activeCategory === cat
                    ? 'bg-[#C1622D] text-white shadow-warm-sm'
                    : 'bg-[#FBF3E7] text-[#2E2118] hover:bg-[#F4E8D6] border border-amber-200/50'
                }`}
              >
                {cat === 'All' ? t.allCrops : cat === 'Vegetables' ? t.vegetables : cat === 'Grains' ? t.grains : t.cashCrops}
              </button>
            ))}
          </div>

          {/* Crop Grid (Circular badges with cream-to-amber light gradient background) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-2.5">
            {filteredCrops.map((crop) => {
              const isSelected = crop.id === selectedCropId;
              const cropTranslated = crop.nameKey in t ? (t as any)[crop.nameKey] : crop.id;

              return (
                <button
                  key={crop.id}
                  onClick={() => setSelectedCropId(crop.id)}
                  className={`min-h-[96px] p-2.5 rounded-[18px] flex flex-col items-center justify-center gap-1.5 text-center transition-all active:scale-95 ${
                    isSelected
                      ? 'bg-[#FFF8EE] border-2 border-[#C1622D] text-[#2E2118] shadow-warm-md ring-2 ring-[#C1622D]/20'
                      : 'bg-[#FFFDF9] hover:bg-[#FBF3E7] border border-[#C1622D]/15 text-[#2E2118]'
                  }`}
                >
                  {/* Soft circular badge with light gradient background cream-to-amber */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl transition-transform ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#FFE8B3] via-[#FDCB72] to-[#E8A93D] shadow-xs scale-105 border border-[#E8A93D]'
                      : 'bg-gradient-to-br from-[#FFF9EE] via-[#FDF1DE] to-[#FDE8C7] border border-amber-200/70'
                  }`}>
                    <span className="select-none leading-none">{crop.emoji}</span>
                  </div>
                  <span className={`text-xs font-black leading-tight ${isSelected ? 'text-[#C1622D]' : 'text-[#2E2118]'}`}>
                    {cropTranslated}
                  </span>
                  <span className="text-[10px] text-stone-500 font-bold">
                    ₹{crop.currentAvgPrice}/kg
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-[#C1622D]/10" />

        {/* STEP 2: Enter Quantity */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#C1622D] text-white text-xs font-black flex items-center justify-center shadow-xs">
                2
              </span>
              <div>
                <h3 className="font-black text-base text-[#2E2118]">{t.step2Title}</h3>
                <p className="text-xs text-stone-600 font-medium">{t.step2Subtitle}</p>
              </div>
            </div>

            {/* Voice button for quantity - 44px min target */}
            <button
              onClick={() => startVoiceInput('quantity')}
              className={`min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition shadow-warm-sm ${
                isListening && voiceField === 'quantity'
                  ? 'bg-rose-600 text-white animate-pulse'
                  : 'bg-[#FBF3E7] text-[#C1622D] hover:bg-[#F4E8D6] border border-[#C1622D]/30'
              }`}
              title="Speak quantity"
            >
              <Mic className="w-4 h-4" />
              <span className="hidden sm:inline">Speak Quantity</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            {/* Stepper with large touch targets */}
            <div className="flex items-center justify-between bg-[#FFFDF9] border border-[#E8A93D]/30 rounded-2xl p-2.5 shadow-warm-sm">
              <button
                onClick={() => handleDecreaseQty(50)}
                className="w-12 h-12 rounded-2xl bg-white border border-[#C1622D]/20 text-[#2E2118] hover:bg-[#FBF3E7] flex items-center justify-center text-lg font-black shadow-xs active:scale-95 transition"
                aria-label="Decrease quantity"
              >
                <Minus className="w-5 h-5 stroke-[2.5]" />
              </button>

              <div className="text-center px-4">
                <div className="flex items-baseline justify-center gap-1">
                  <input
                    type="number"
                    value={quantityKg}
                    onChange={(e) => setQuantityKg(Math.max(10, parseInt(e.target.value) || 0))}
                    className="w-28 text-center font-black text-3xl text-[#2E2118] bg-transparent focus:outline-none"
                  />
                  <span className="font-bold text-sm text-stone-500">kg</span>
                </div>
                <div className="text-xs text-[#4A7C3F] font-bold">
                  = {(quantityKg / 100).toFixed(1)} {t.quintalsHint}
                </div>
              </div>

              <button
                onClick={() => handleIncreaseQty(50)}
                className="w-12 h-12 rounded-2xl bg-[#C1622D] text-white hover:bg-[#B05524] flex items-center justify-center text-lg font-black shadow-warm-sm active:scale-95 transition"
                aria-label="Increase quantity"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>

            {/* Quick preset buttons */}
            <div className="flex flex-wrap gap-2">
              {[100, 250, 500, 1000, 2000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => handlePresetQty(preset)}
                  className={`min-h-[44px] px-3.5 py-2 rounded-2xl text-xs font-black transition active:scale-95 ${
                    quantityKg === preset
                      ? 'bg-[#E8A93D] text-[#2E2118] shadow-warm-sm border border-[#E8A93D]'
                      : 'bg-[#FBF3E7] hover:bg-[#F4E8D6] text-[#2E2118] border border-amber-200/50'
                  }`}
                >
                  {preset} kg
                  <span className="block text-[9px] font-semibold opacity-75">
                    ({(preset / 100).toFixed(1)} Qtl)
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-[#C1622D]/10" />

        {/* STEP 3: Location */}
        <div>
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-full bg-[#C1622D] text-white text-xs font-black flex items-center justify-center shadow-xs">
                3
              </span>
              <div>
                <h3 className="font-black text-base text-[#2E2118]">{t.step3Title}</h3>
                <p className="text-xs text-stone-600 font-medium">{t.step3Subtitle}</p>
              </div>
            </div>

            {/* GPS Auto-detect button - 44px min touch target */}
            <button
              onClick={detectLocation}
              disabled={isLocating}
              className="min-h-[44px] flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold bg-[#EDF5EB] text-[#2D4F26] hover:bg-[#DFEDE0] border border-[#4A7C3F]/30 transition active:scale-95 disabled:opacity-50 shadow-xs"
            >
              <MapPin className={`w-4 h-4 text-[#4A7C3F] ${isLocating ? 'animate-bounce' : ''}`} />
              <span>{isLocating ? t.detectingLocation : t.autoDetectLocation}</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400">
                <MapPin className="w-4 h-4 text-[#C1622D]" />
              </div>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder={t.currentLocation}
                className="w-full min-h-[44px] pl-10 pr-4 py-2.5 rounded-2xl border border-amber-200/80 bg-[#FFFDF9] text-sm font-semibold text-[#2E2118] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C1622D]"
              />
            </div>

            {/* Common Locations Dropdown */}
            <div className="sm:w-64">
              <select
                value={commonLocations.includes(location) ? location : ''}
                onChange={(e) => {
                  if (e.target.value) setLocation(e.target.value);
                }}
                className="w-full min-h-[44px] py-2.5 px-3 rounded-2xl border border-amber-200/80 bg-[#FFFDF9] text-xs font-bold text-[#2E2118] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#C1622D]"
              >
                <option value="">{t.orSelectDistrict}</option>
                {commonLocations.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* SUMMARY BANNER & SORTING CONTROLS */}
      <div className="bg-[#FFFDF9] border border-[#E8A93D]/40 rounded-[20px] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 shadow-warm-sm">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#FFF9EE] via-[#FDECCB] to-[#FCDFA0] flex items-center justify-center text-2xl shrink-0 font-bold shadow-warm-xs border border-[#E8A93D]/40">
            {selectedCrop.emoji}
          </div>
          <div>
            <div className="text-xs font-black text-[#C1622D] uppercase tracking-wider">
              {calculatedResults.length} {t.marketsFound}
            </div>
            <p className="text-sm font-black text-[#2E2118]">
              {quantityKg} kg ({(quantityKg / 100).toFixed(1)} {t.quintalsHint}) of{' '}
              {selectedCrop.nameKey in t ? (t as any)[selectedCrop.nameKey] : selectedCrop.id} from {location.split(',')[0]}
            </p>
          </div>
        </div>

        {/* Sorting Buttons - min 44px */}
        <div className="flex items-center gap-1.5 bg-[#FBF3E7] p-1.5 rounded-2xl border border-amber-200/60 self-stretch sm:self-auto justify-between">
          <span className="text-[11px] font-bold text-stone-500 px-2 flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#C1622D]" />
            <span className="hidden sm:inline">{t.sortBy}:</span>
          </span>
          <button
            onClick={() => setSortMode('net_return')}
            className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-black transition ${
              sortMode === 'net_return'
                ? 'bg-[#C1622D] text-white shadow-warm-sm'
                : 'text-[#2E2118] hover:text-[#C1622D]'
            }`}
          >
            ⭐ {t.highestNetReturn}
          </button>
          <button
            onClick={() => setSortMode('price')}
            className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-black transition ${
              sortMode === 'price'
                ? 'bg-[#C1622D] text-white shadow-warm-sm'
                : 'text-[#2E2118] hover:text-[#C1622D]'
            }`}
          >
            {t.highestPrice}
          </button>
          <button
            onClick={() => setSortMode('distance')}
            className={`min-h-[40px] px-3 py-1.5 rounded-xl text-xs font-black transition ${
              sortMode === 'distance'
                ? 'bg-[#C1622D] text-white shadow-warm-sm'
                : 'text-[#2E2118] hover:text-[#C1622D]'
            }`}
          >
            {t.nearestLocation}
          </button>
        </div>
      </div>

      {/* EDUCATIONAL WARNING: WHY RAW PRICE != NET PROFIT */}
      <div className="bg-[#2D4F26] text-[#EDF5EB] rounded-[20px] p-4 border border-[#4A7C3F]/40 shadow-warm-md flex items-start gap-3">
        <Info className="w-5 h-5 text-[#E8A93D] shrink-0 mt-0.5" />
        <div className="text-xs leading-relaxed font-medium">
          <span className="font-black text-[#E8A93D] block mb-0.5 text-sm">
            Farmer Profit Rule: Net Return &gt; Raw Mandi Rate
          </span>
          {t.highestPriceWarning} Notice how a distant mega-market might quote ₹3-₹5 higher per kg, but heavy truck freight and broker cess can leave you with <strong className="text-white underline font-bold">less cash in hand</strong> than a closer local FPO or mill!
        </div>
      </div>

      {/* COMPARISON RESULTS LIST */}
      <div className="space-y-4">
        {calculatedResults.map((result, index) => {
          const isExpanded = expandedMarketId === result.market.id;
          const isRecorded = saleRecordedFeedback === result.market.id;

          return (
            <div
              key={result.market.id}
              className={`bg-white rounded-[22px] border transition-all duration-200 overflow-hidden ${
                result.isBestValue
                  ? 'border-2 border-[#E8A93D] shadow-warm-lg ring-2 ring-[#E8A93D]/30'
                  : 'border-[#C1622D]/15 shadow-warm-sm hover:border-[#E8A93D]/50'
              }`}
            >
              {/* Card Header Top Badges */}
              <div className="px-5 pt-4 pb-2.5 flex flex-wrap items-center justify-between gap-2 border-b border-amber-100/50 bg-[#FFFDF9]">
                <div className="flex items-center gap-2">
                  {/* Rank badge */}
                  <span
                    className={`w-7 h-7 rounded-full text-xs font-black flex items-center justify-center shadow-xs ${
                      result.isBestValue
                        ? 'bg-[#C1622D] text-white'
                        : 'bg-[#FBF3E7] text-[#2E2118]'
                    }`}
                  >
                    #{index + 1}
                  </span>

                  {/* Market Type Badge */}
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#FBF3E7] text-[#2E2118] flex items-center gap-1.5 border border-amber-200/50">
                    <Building2 className="w-3.5 h-3.5 text-[#C1622D]" />
                    {result.market.typeLabel}
                  </span>

                  {result.market.verifiedBuyer && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#EDF5EB] text-[#2D4F26] border border-[#4A7C3F]/30 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#4A7C3F]" />
                      Verified
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5">
                  {/* Golden amber "Best Value" badge with subtle glow/shadow effect */}
                  {result.isBestValue && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8A93D] text-[#2E2118] font-black text-xs shadow-[0_0_15px_rgba(232,169,61,0.55)] border border-[#E8A93D] animate-pulse">
                      <Award className="w-4 h-4 text-[#2E2118]" />
                      {t.bestValue} ⭐
                    </span>
                  )}

                  {result.isHighestRawPrice && !result.isBestValue && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#FFF8EE] text-[#C1622D] border border-[#C1622D]/30 font-bold text-[11px]">
                      Highest Price, Higher Freight
                    </span>
                  )}

                  {result.isNearest && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#EDF5EB] text-[#2D4F26] border border-[#4A7C3F]/30 font-bold text-[11px]">
                      Nearest ({result.market.distanceKm} km)
                    </span>
                  )}
                </div>
              </div>

              {/* Main Card Body */}
              <div className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                  {/* Left Column: Market Name & Distance */}
                  <div className="lg:col-span-4 space-y-1.5">
                    <h3 className="font-black text-base sm:text-lg text-[#2E2118] leading-snug">
                      {result.market.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-stone-600 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-[#C1622D]" />
                        {result.market.location}
                      </span>
                      <span className="flex items-center gap-1 font-bold text-[#4A7C3F]">
                        <Truck className="w-3.5 h-3.5" />
                        {result.market.distanceKm} km
                      </span>
                    </div>

                    <div className="text-[11px] text-stone-600 flex items-center gap-2 pt-1 font-medium">
                      <span className="font-bold text-[#2E2118]">{result.market.buyerStatus}</span>
                      <span>•</span>
                      <span className="text-[#4A7C3F] font-bold">{result.market.paymentTerms}</span>
                    </div>
                  </div>

                  {/* Middle Column: Offered Price & Costs */}
                  <div className="lg:col-span-4 grid grid-cols-3 gap-2 bg-[#FFFDF9] p-3 rounded-2xl border border-amber-200/70 text-center shadow-warm-xs">
                    <div>
                      <div className="text-[10px] text-stone-500 font-bold uppercase">{t.offeredPrice}</div>
                      <div className="font-black text-base text-[#2E2118] mt-0.5">
                        ₹{result.market.offeredPricePerKg}
                        <span className="text-[10px] text-stone-500 font-medium">/kg</span>
                      </div>
                      <div className="text-[10px] text-stone-500 font-medium">
                        ₹{result.grossRevenue.toLocaleString('en-IN')} gross
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-stone-500 font-bold uppercase">{t.transportCost}</div>
                      <div className="font-black text-base text-rose-600 mt-0.5">
                        -₹{result.transportCost.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-stone-500 font-medium">
                        ₹{result.market.baseTransportFixed} + km
                      </div>
                    </div>

                    <div>
                      <div className="text-[10px] text-stone-500 font-bold uppercase">{t.commissionFee}</div>
                      <div className="font-black text-base text-[#C1622D] mt-0.5">
                        -₹{(result.commissionFee + result.handlingCost).toLocaleString('en-IN')}
                      </div>
                      <div className="text-[10px] text-stone-500 font-medium">
                        {result.market.fixedMarketFeePercent}% fee
                      </div>
                    </div>
                  </div>

                  {/* Right Column: NET RETURN Take-Home Highlight */}
                  <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-3">
                    <div className="text-left lg:text-right">
                      <div className="text-[11px] font-black text-[#4A7C3F] uppercase tracking-wider flex items-center lg:justify-end gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-[#E8A93D]" />
                        {t.takeHomeProfit}
                      </div>
                      <div className="text-2xl sm:text-3xl font-black text-[#2E2118] tracking-tight">
                        ₹{result.netReturn.toLocaleString('en-IN')}
                      </div>
                      <div className="text-[11px] text-[#4A7C3F] font-bold">
                        Effective ₹{result.effectiveNetPerKg}/kg in your pocket
                      </div>
                    </div>

                    {/* Action buttons (min-h-[44px] touch target) */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => toggleExpandMarket(result.market.id)}
                        className="min-h-[44px] flex-1 sm:flex-none px-3.5 py-2.5 rounded-2xl text-xs font-black bg-[#FBF3E7] hover:bg-[#F4E8D6] text-[#2E2118] flex items-center justify-center gap-1.5 transition border border-amber-200/50"
                      >
                        <span>{isExpanded ? t.hideBreakdown : t.viewBreakdown}</span>
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleRecordSale(result)}
                        className={`min-h-[44px] flex-1 sm:flex-none px-4 py-2.5 rounded-2xl text-xs font-black transition flex items-center justify-center gap-1.5 shadow-warm-sm ${
                          isRecorded
                            ? 'bg-[#4A7C3F] text-white'
                            : 'bg-[#C1622D] hover:bg-[#B05524] text-white active:scale-95'
                        }`}
                      >
                        {isRecorded ? (
                          <>
                            <CheckCircle className="w-4 h-4 text-[#E8A93D]" />
                            <span>Saved!</span>
                          </>
                        ) : (
                          <span>{t.recordSale}</span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* COMPARISON DETAIL VIEW (EXPANDABLE) */}
                {isExpanded && (
                  <div className="mt-5 pt-5 border-t border-[#C1622D]/15 space-y-4 animate-in fade-in duration-200">
                    <div className="bg-[#FFFDF9] rounded-2xl p-4 sm:p-5 border border-amber-200/80 shadow-warm-xs">
                      <h4 className="text-xs font-black text-[#2E2118] uppercase tracking-wider mb-3 flex items-center justify-between">
                        <span>{t.breakdownTitle} ({result.quantityKg} kg {selectedCrop.id})</span>
                        <span className="text-[11px] text-[#C1622D] lowercase font-bold">
                          {result.market.phoneContact}
                        </span>
                      </h4>

                      {/* Visual Bar Distribution */}
                      <div className="mb-4">
                        <div className="text-[11px] font-bold text-[#2E2118] mb-1.5 flex justify-between">
                          <span>Revenue vs. Deductions</span>
                          <span className="text-[#4A7C3F]">
                            Keep {Math.round((result.netReturn / Math.max(1, result.grossRevenue)) * 100)}% of sales
                          </span>
                        </div>
                        <div className="h-4 w-full bg-stone-200 rounded-full overflow-hidden flex shadow-inner">
                          <div
                            style={{
                              width: `${Math.round((result.netReturn / Math.max(1, result.grossRevenue)) * 100)}%`
                            }}
                            className="bg-[#4A7C3F] h-full"
                            title="Net Profit"
                          />
                          <div
                            style={{
                              width: `${Math.round((result.transportCost / Math.max(1, result.grossRevenue)) * 100)}%`
                            }}
                            className="bg-rose-500 h-full"
                            title="Transport Freight"
                          />
                          <div
                            style={{
                              width: `${Math.round(((result.commissionFee + result.handlingCost) / Math.max(1, result.grossRevenue)) * 100)}%`
                            }}
                            className="bg-[#E8A93D] h-full"
                            title="Commission & Fee"
                          />
                        </div>

                        <div className="flex items-center gap-4 text-[10px] font-bold text-stone-600 mt-2">
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#4A7C3F]" />
                            <span>Net Profit ({Math.round((result.netReturn / Math.max(1, result.grossRevenue)) * 100)}%)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                            <span>Transport ({Math.round((result.transportCost / Math.max(1, result.grossRevenue)) * 100)}%)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#E8A93D]" />
                            <span>Commission ({Math.round(((result.commissionFee + result.handlingCost) / Math.max(1, result.grossRevenue)) * 100)}%)</span>
                          </div>
                        </div>
                      </div>

                      {/* Financial Calculation Table */}
                      <div className="divide-y divide-amber-100/80 text-xs">
                        <div className="py-2.5 flex justify-between items-center font-bold text-[#2E2118]">
                          <span>1. {t.grossRevenue} ({result.quantityKg} kg × ₹{result.market.offeredPricePerKg}/kg)</span>
                          <span className="font-black text-[#2E2118] text-sm">+₹{result.grossRevenue.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="py-2.5 flex justify-between items-center font-bold text-rose-700">
                          <span>2. Estimated Transport ({result.market.distanceKm} km roundtrip & weight)</span>
                          <span className="font-black text-sm">-₹{result.transportCost.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="py-2.5 flex justify-between items-center font-bold text-[#C1622D]">
                          <span>3. Market Cess / Commission ({result.market.fixedMarketFeePercent}%)</span>
                          <span className="font-black text-sm">-₹{result.commissionFee.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="py-2.5 flex justify-between items-center font-bold text-[#C1622D]">
                          <span>4. Handling & Hamali Fee</span>
                          <span className="font-black text-sm">-₹{result.handlingCost.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="py-3 flex justify-between items-center font-black text-[#2E2118] text-sm bg-[#EDF5EB] px-3.5 rounded-2xl mt-1.5 border border-[#4A7C3F]/30">
                          <span className="flex items-center gap-1.5 text-[#2D4F26]">
                            <Sparkles className="w-4 h-4 text-[#4A7C3F]" />
                            {t.takeHomeProfit}
                          </span>
                          <span className="text-base text-[#4A7C3F] font-black">
                            = ₹{result.netReturn.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Explanatory notes & Call Buyer action */}
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FFFDF9] p-3.5 rounded-2xl border border-amber-200/70">
                      <div className="text-xs text-stone-600 font-medium">
                        <span className="font-black text-[#2E2118] block">
                          Buyer Note: {result.market.trendText}
                        </span>
                        <span>Payment Terms: {result.market.paymentTerms}</span>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <a
                          href={`tel:${result.market.phoneContact}`}
                          className="min-h-[44px] flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-black bg-[#E8A93D] hover:bg-[#D9992E] text-[#2E2118] flex items-center justify-center gap-2 transition active:scale-95 shadow-warm-sm"
                        >
                          <PhoneCall className="w-4 h-4" />
                          <span>{t.callBuyer}</span>
                        </a>

                        <button
                          onClick={() => {
                            speakText(
                              `${result.market.name} offers ${result.market.offeredPricePerKg} rupees per kg. After deducting transport and mandi charges, your net profit is ${result.netReturn} rupees.`
                            );
                          }}
                          className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-bold bg-[#EDF5EB] hover:bg-[#DFEDE0] text-[#2D4F26] flex items-center justify-center gap-1.5 border border-[#4A7C3F]/30"
                          title="Listen to recommendation"
                        >
                          🔊 Read Out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
