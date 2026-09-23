import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MOCK_CROPS } from '../data/mockData';
import { TrendingUp, TrendingDown, Minus, Calendar, AlertCircle, Sparkles, CheckCircle2, ArrowRight, ShieldCheck, ChevronRight } from 'lucide-react';

export const ForecastView: React.FC = () => {
  const {
    t,
    selectedCropId,
    setSelectedCropId,
    selectedCrop,
    quantityKg,
    setQuantityKg,
    currentForecast,
    setActiveTab
  } = useApp();

  const [forecastHorizon, setForecastHorizon] = useState<7 | 14>(14);
  const [activeHoverIndex, setActiveHoverIndex] = useState<number | null>(null);
  const [selectedDecision, setSelectedDecision] = useState<'wait' | 'sell_now'>(
    currentForecast.recommendation === 'sell_now' ? 'sell_now' : 'wait'
  );

  // Filter forecast days by horizon (7 or 14 days)
  const displayedForecastDays = currentForecast.forecastDays.slice(0, forecastHorizon);
  
  // Historical data points (last 10 days for chart continuity)
  const recentHistory = (selectedCrop.historicalPrices || []).slice(-10);

  // Compute SVG chart coordinates
  const allChartPoints = [
    ...recentHistory.map((h, i) => ({
      label: h.date,
      price: h.price,
      isForecast: false,
      dayNum: i
    })),
    ...displayedForecastDays.map(f => ({
      label: f.date,
      price: f.predictedPrice,
      isForecast: true,
      dayNum: f.dayIndex
    }))
  ];

  const minPrice = Math.floor(Math.min(...allChartPoints.map(p => p.price)) * 0.92);
  const maxPrice = Math.ceil(Math.max(...allChartPoints.map(p => p.price)) * 1.08);
  const priceRange = Math.max(1, maxPrice - minPrice);

  const chartWidth = 720;
  const chartHeight = 260;
  const paddingX = 40;
  const paddingY = 30;
  const innerWidth = chartWidth - paddingX * 2;
  const innerHeight = chartHeight - paddingY * 2;

  const getX = (index: number) => paddingX + (index / (allChartPoints.length - 1)) * innerWidth;
  const getY = (price: number) => paddingY + innerHeight - ((price - minPrice) / priceRange) * innerHeight;

  // Split history and forecast SVG paths
  const historyCount = recentHistory.length;
  const historyCoords = allChartPoints.slice(0, historyCount).map((p, i) => ({ x: getX(i), y: getY(p.price) }));
  const forecastCoords = allChartPoints.slice(historyCount - 1).map((p, i) => ({ x: getX(historyCount - 1 + i), y: getY(p.price) }));

  const historyPath = historyCoords.length > 0 
    ? `M ${historyCoords.map(c => `${c.x},${c.y}`).join(' L ')}` 
    : '';

  const forecastPath = forecastCoords.length > 0 
    ? `M ${forecastCoords.map(c => `${c.x},${c.y}`).join(' L ')}` 
    : '';

  // Area path under forecast for vibrant sky blue-teal fill
  const forecastAreaPath = forecastCoords.length > 0 
    ? `M ${forecastCoords[0].x},${paddingY + innerHeight} L ${forecastCoords.map(c => `${c.x},${c.y}`).join(' L ')} L ${forecastCoords[forecastCoords.length - 1].x},${paddingY + innerHeight} Z`
    : '';

  // Financial impact calculation
  const currentTotal = Math.round(currentForecast.currentPrice * quantityKg);
  const waitPrice = forecastHorizon === 7 ? currentForecast.projectedDay7Price : currentForecast.projectedDay14Price;
  const waitTotal = Math.round(waitPrice * quantityKg);
  const financialDiff = waitTotal - currentTotal;
  const isNetPositive = financialDiff > 0;

  return (
    <div className="space-y-6 pb-12 max-w-6xl mx-auto">
      {/* 1. Header with Crop Selector */}
      <div className="glass-panel rounded-2xl p-5 shadow-warm-md border border-white/60">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#2E9CAB]/15 text-[#1F5C3F] mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#2E9CAB]" />
              {t.navForecast}
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-[#26201A] tracking-tight">
              {t.forecastTitle}
            </h1>
            <p className="text-sm text-[#26201A]/75 mt-0.5">
              {t.forecastSubtitle}
            </p>
          </div>

          {/* Quantity quick adjuster for personalized profit impact */}
          <div className="flex items-center gap-3 bg-[#FBF6EE] px-4 py-2.5 rounded-xl border border-[#D2691E]/20 shadow-inner">
            <span className="text-xs font-semibold text-[#26201A]/70 uppercase tracking-wide">
              {t.quantityInKg}:
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setQuantityKg(Math.max(50, quantityKg - 50))}
                className="w-8 h-8 rounded-lg bg-white border border-[#D2691E]/30 text-[#26201A] font-bold text-base flex items-center justify-center hover:bg-[#D2691E]/10 active:scale-95 transition-all shadow-sm"
              >
                -
              </button>
              <span className="font-extrabold text-[#1F5C3F] min-w-[65px] text-center text-base">
                {quantityKg} kg
              </span>
              <button
                type="button"
                onClick={() => setQuantityKg(quantityKg + 50)}
                className="w-8 h-8 rounded-lg bg-white border border-[#D2691E]/30 text-[#26201A] font-bold text-base flex items-center justify-center hover:bg-[#D2691E]/10 active:scale-95 transition-all shadow-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Visual Crop Selection Strip */}
        <div className="mt-5 pt-4 border-t border-[#D2691E]/15">
          <div className="text-xs font-bold text-[#26201A]/60 uppercase tracking-wider mb-2.5">
            {t.step1Title}:
          </div>
          <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
            {MOCK_CROPS.map(crop => {
              const isSelected = crop.id === selectedCropId;
              return (
                <button
                  key={crop.id}
                  type="button"
                  onClick={() => setSelectedCropId(crop.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap min-h-[44px] card-3d ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#1F5C3F] to-[#2E9CAB] text-white shadow-warm-md scale-[1.03]'
                      : 'bg-white/80 hover:bg-white text-[#26201A] border border-[#D2691E]/15 hover:border-[#D2691E]/40'
                  }`}
                >
                  <span className="text-xl">{crop.emoji}</span>
                  <span>{t[crop.nameKey as keyof typeof t] || crop.id}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-[#FBF6EE] text-[#1F5C3F]'
                  }`}>
                    ₹{crop.currentAvgPrice}/kg
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. Hero Verdict & Decision Matrix (3D Floating Container) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Main Verdict Card */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 shadow-warm-lg border border-white/70 relative overflow-hidden card-depth-3d">
          {/* Subtle background glow */}
          <div className={`absolute -right-16 -top-16 w-56 h-56 rounded-full blur-3xl pointer-events-none opacity-20 ${
            currentForecast.verdict === 'rise' ? 'bg-[#1F5C3F]' : currentForecast.verdict === 'fall' ? 'bg-[#D2691E]' : 'bg-[#2E9CAB]'
          }`} />

          <div className="flex items-start justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-[#26201A]/60 uppercase tracking-wider block mb-1">
                {t[selectedCrop.nameKey as keyof typeof t] || selectedCrop.id} • AI Market Analysis
              </span>
              
              {/* Verdict Badge */}
              <div className="inline-flex items-center gap-2.5 mt-1 px-4 py-2 rounded-xl shadow-warm-sm border font-black text-base md:text-lg tracking-tight transition-all"
                style={{
                  backgroundColor: currentForecast.verdict === 'rise' ? '#ECFDF5' : currentForecast.verdict === 'fall' ? '#FEF2F2' : '#F0F9FF',
                  borderColor: currentForecast.verdict === 'rise' ? '#10B981' : currentForecast.verdict === 'fall' ? '#EF4444' : '#0284C7',
                  color: currentForecast.verdict === 'rise' ? '#047857' : currentForecast.verdict === 'fall' ? '#B91C1C' : '#0369A1'
                }}
              >
                {currentForecast.verdict === 'rise' ? (
                  <TrendingUp className="w-5 h-5 text-emerald-600 stroke-[2.5]" />
                ) : currentForecast.verdict === 'fall' ? (
                  <TrendingDown className="w-5 h-5 text-rose-600 stroke-[2.5]" />
                ) : (
                  <Minus className="w-5 h-5 text-sky-600 stroke-[2.5]" />
                )}
                <span>
                  {currentForecast.verdict === 'rise'
                    ? t.verdictRise
                    : currentForecast.verdict === 'fall'
                    ? t.verdictFall
                    : t.verdictStable}
                </span>
              </div>
            </div>

            {/* Confidence Gauge */}
            <div className="text-right bg-white/90 px-3.5 py-2 rounded-xl border border-[#D2691E]/20 shadow-sm">
              <span className="text-[11px] font-semibold text-[#26201A]/60 block">
                {t.forecastConfidence}
              </span>
              <span className="text-lg font-black text-[#1F5C3F]">
                {currentForecast.verdictConfidence}%
              </span>
            </div>
          </div>

          {/* Market Driver / Reason */}
          <div className="mt-5 p-4 rounded-xl bg-[#FBF6EE]/90 border border-[#D2691E]/20 shadow-inner">
            <div className="flex items-start gap-2.5">
              <AlertCircle className="w-5 h-5 text-[#D2691E] shrink-0 mt-0.5" />
              <div>
                <span className="text-xs font-extrabold text-[#D2691E] uppercase tracking-wider block mb-0.5">
                  {t.marketDriver}
                </span>
                <p className="text-sm font-medium text-[#26201A] leading-relaxed">
                  {currentForecast.reason}
                </p>
              </div>
            </div>
          </div>

          {/* Recommendation Headline */}
          <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#1F5C3F] bg-[#1F5C3F]/10 px-3.5 py-2 rounded-lg">
            <CheckCircle2 className="w-4 h-4 text-[#1F5C3F] shrink-0" />
            <span>{currentForecast.recommendationHeadline}</span>
          </div>

          {/* Disclaimer */}
          <p className="text-[11px] text-[#26201A]/55 mt-4 italic">
            * {t.forecastDisclaimer}
          </p>
        </div>

        {/* Action Decision Helper: Sell Now vs Wait */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 shadow-warm-lg border border-white/70 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold text-[#26201A]/60 uppercase tracking-wider">
                Financial Decision Helper
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#F5A623]/20 text-[#D2691E]">
                For {quantityKg} kg
              </span>
            </div>

            {/* Side-by-side Decision Toggles */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                type="button"
                onClick={() => setSelectedDecision('sell_now')}
                className={`p-3.5 rounded-xl border text-left transition-all min-h-[44px] ${
                  selectedDecision === 'sell_now'
                    ? 'border-[#D2691E] bg-[#D2691E]/10 ring-2 ring-[#D2691E]/30 shadow-warm-sm'
                    : 'border-[#26201A]/15 bg-white/60 hover:bg-white'
                }`}
              >
                <div className="text-xs font-bold text-[#26201A]/70 uppercase">
                  {t.sellNow}
                </div>
                <div className="text-lg font-black text-[#26201A] mt-1">
                  ₹{currentTotal.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-[#26201A]/60">
                  @ ₹{currentForecast.currentPrice}/kg today
                </div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedDecision('wait')}
                className={`p-3.5 rounded-xl border text-left transition-all min-h-[44px] ${
                  selectedDecision === 'wait'
                    ? 'border-[#1F5C3F] bg-[#1F5C3F]/10 ring-2 ring-[#1F5C3F]/30 shadow-warm-sm'
                    : 'border-[#26201A]/15 bg-white/60 hover:bg-white'
                }`}
              >
                <div className="text-xs font-bold text-[#1F5C3F] uppercase flex items-center justify-between">
                  <span>{t.waitAndHold}</span>
                  <span className="text-[10px] bg-[#1F5C3F]/15 px-1.5 py-0.5 rounded">
                    ~{currentForecast.recommendedWaitDays || 7}d
                  </span>
                </div>
                <div className="text-lg font-black text-[#1F5C3F] mt-1">
                  ₹{waitTotal.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-[#1F5C3F]/80">
                  @ ~₹{waitPrice}/kg projected
                </div>
              </button>
            </div>

            {/* Estimated Difference Callout */}
            <div className={`p-4 rounded-xl border ${
              isNetPositive
                ? 'bg-emerald-50/90 border-emerald-200 text-emerald-900'
                : 'bg-amber-50/90 border-amber-200 text-amber-900'
            }`}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wide">
                  {isNetPositive ? t.gainProjected : t.lossRisk}
                </span>
                <span className={`text-base font-black px-2 py-0.5 rounded-lg ${
                  isNetPositive ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'
                }`}>
                  {isNetPositive ? '+' : '-'}₹{Math.abs(financialDiff).toLocaleString('en-IN')}
                </span>
              </div>
              <p className="text-xs mt-2 leading-relaxed opacity-90">
                {isNetPositive
                  ? `Holding your ${quantityKg} kg of ${selectedCrop.id} for ~${currentForecast.recommendedWaitDays || 7} days is estimated to yield +₹${(waitPrice - currentForecast.currentPrice).toFixed(1)}/kg more profit in hand.`
                  : `Waiting may risk a loss of ~₹${Math.abs(waitPrice - currentForecast.currentPrice).toFixed(1)}/kg due to rising wholesale market arrivals. Selling today is recommended.`}
              </p>
            </div>
          </div>

          {/* Action CTA */}
          <div className="mt-5 pt-4 border-t border-[#D2691E]/15">
            <button
              type="button"
              onClick={() => setActiveTab('compare')}
              className="w-full min-h-[48px] py-3 px-5 rounded-xl font-bold text-white bg-gradient-to-r from-[#D2691E] to-[#F5A623] hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-warm-md"
            >
              <span>{t.navCompare} ({quantityKg} kg)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Interactive 14-Day Visual Projection Chart (Sky Blue-Teal Accent) */}
      <div className="glass-panel rounded-2xl p-6 shadow-warm-lg border border-white/70">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-lg font-black text-[#26201A] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#2E9CAB]" />
              <span>{t.forecast14DayTitle}</span>
            </h2>
            <p className="text-xs text-[#26201A]/65 mt-0.5">
              Continuity from past 10 days history into the next {forecastHorizon} days projection
            </p>
          </div>

          {/* Horizon Toggle */}
          <div className="flex items-center gap-1 bg-[#FBF6EE] p-1 rounded-xl border border-[#2E9CAB]/20 shadow-inner">
            <button
              type="button"
              onClick={() => setForecastHorizon(7)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${
                forecastHorizon === 7
                  ? 'bg-gradient-to-r from-[#1F5C3F] to-[#2E9CAB] text-white shadow-sm'
                  : 'text-[#26201A]/70 hover:text-[#26201A]'
              }`}
            >
              7 Days Horizon
            </button>
            <button
              type="button"
              onClick={() => setForecastHorizon(14)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all min-h-[36px] ${
                forecastHorizon === 14
                  ? 'bg-gradient-to-r from-[#1F5C3F] to-[#2E9CAB] text-white shadow-sm'
                  : 'text-[#26201A]/70 hover:text-[#26201A]'
              }`}
            >
              14 Days Horizon
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-5 text-xs font-medium text-[#26201A]/70 mb-3 pt-2 border-t border-[#D2691E]/10">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1 bg-[#26201A]/40 rounded-full" />
            <span>Past Mandi History</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-1.5 bg-[#2E9CAB] rounded-full shadow-teal-glow" />
            <span className="font-bold text-[#2E9CAB]">Projected Trend</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]" />
            <span>Today (₹{currentForecast.currentPrice}/kg)</span>
          </div>
        </div>

        {/* SVG Chart Container */}
        <div className="relative w-full overflow-x-auto bg-[#FBF6EE]/60 rounded-xl p-2 border border-[#2E9CAB]/15">
          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="w-full h-auto min-w-[620px] select-none"
          >
            <defs>
              <linearGradient id="forecastAreaGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2E9CAB" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#2E9CAB" stopOpacity="0.02" />
              </linearGradient>
              <linearGradient id="forecastLineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#1F5C3F" />
                <stop offset="60%" stopColor="#2E9CAB" />
                <stop offset="100%" stopColor="#38BDF8" />
              </linearGradient>
            </defs>

            {/* Horizontal Grid lines */}
            {[0, 0.25, 0.5, 0.75, 1].map((ratio, idx) => {
              const yVal = paddingY + innerHeight * ratio;
              const priceLabel = Math.round(maxPrice - ratio * priceRange);
              return (
                <g key={idx}>
                  <line
                    x1={paddingX}
                    y1={yVal}
                    x2={chartWidth - paddingX}
                    y2={yVal}
                    stroke="#D2691E"
                    strokeOpacity="0.12"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={paddingX - 8}
                    y={yVal + 4}
                    fontSize="10"
                    fill="#26201A"
                    opacity="0.5"
                    textAnchor="end"
                    fontFamily="monospace"
                  >
                    ₹{priceLabel}
                  </text>
                </g>
              );
            })}

            {/* Forecast Shaded Area */}
            {forecastAreaPath && (
              <path d={forecastAreaPath} fill="url(#forecastAreaGrad)" />
            )}

            {/* History Solid Line */}
            {historyPath && (
              <path
                d={historyPath}
                fill="none"
                stroke="#26201A"
                strokeWidth="2.5"
                strokeOpacity="0.45"
              />
            )}

            {/* Forecast Glowing Line */}
            {forecastPath && (
              <path
                d={forecastPath}
                fill="none"
                stroke="url(#forecastLineGrad)"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ filter: 'drop-shadow(0 2px 6px rgba(46, 156, 171, 0.45))' }}
              />
            )}

            {/* Divider Line indicating "TODAY" */}
            {historyCoords.length > 0 && (
              <g>
                <line
                  x1={historyCoords[historyCoords.length - 1].x}
                  y1={paddingY}
                  x2={historyCoords[historyCoords.length - 1].x}
                  y2={paddingY + innerHeight}
                  stroke="#F5A623"
                  strokeWidth="2"
                  strokeDasharray="3 3"
                />
                <circle
                  cx={historyCoords[historyCoords.length - 1].x}
                  cy={historyCoords[historyCoords.length - 1].y}
                  r="6"
                  fill="#F5A623"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  className="animate-pulse"
                />
                <text
                  x={historyCoords[historyCoords.length - 1].x}
                  y={paddingY - 8}
                  fontSize="10"
                  fontWeight="bold"
                  fill="#D2691E"
                  textAnchor="middle"
                >
                  TODAY
                </text>
              </g>
            )}

            {/* Interactive Data Points */}
            {allChartPoints.map((point, index) => {
              const cx = getX(index);
              const cy = getY(point.price);
              const isHovered = activeHoverIndex === index;

              return (
                <g
                  key={index}
                  className="cursor-pointer"
                  onMouseEnter={() => setActiveHoverIndex(index)}
                  onMouseLeave={() => setActiveHoverIndex(null)}
                >
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 7 : point.isForecast ? 4 : 3}
                    fill={point.isForecast ? '#2E9CAB' : '#26201A'}
                    stroke="#FFFFFF"
                    strokeWidth={isHovered ? 2.5 : 1.5}
                    opacity={point.isForecast ? 1 : 0.6}
                  />

                  {/* Date labels along bottom */}
                  {(index % (forecastHorizon === 14 ? 3 : 2) === 0 || index === allChartPoints.length - 1) && (
                    <text
                      x={cx}
                      y={chartHeight - 8}
                      fontSize="9.5"
                      fill="#26201A"
                      opacity="0.65"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      {point.label}
                    </text>
                  )}

                  {/* Active Tooltip */}
                  {isHovered && (
                    <g>
                      <rect
                        x={Math.max(10, Math.min(chartWidth - 110, cx - 50))}
                        y={Math.max(8, cy - 42)}
                        width="100"
                        height="32"
                        rx="6"
                        fill="#26201A"
                        opacity="0.92"
                      />
                      <text
                        x={Math.max(10, Math.min(chartWidth - 110, cx - 50)) + 50}
                        y={Math.max(8, cy - 42) + 14}
                        fill="#FFFFFF"
                        fontSize="10"
                        fontWeight="bold"
                        textAnchor="middle"
                      >
                        {point.label}: ₹{point.price}/kg
                      </text>
                      <text
                        x={Math.max(10, Math.min(chartWidth - 110, cx - 50)) + 50}
                        y={Math.max(8, cy - 42) + 26}
                        fill="#38BDF8"
                        fontSize="9"
                        textAnchor="middle"
                      >
                        {point.isForecast ? 'Projected Rate' : 'Actual Mandi Price'}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* 4. Day-by-Day Forecast Breakdown Grid */}
      <div className="glass-panel rounded-2xl p-6 shadow-warm-lg border border-white/70">
        <h3 className="text-base font-black text-[#26201A] uppercase tracking-wide mb-4">
          Day-by-Day Price Projection Matrix
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {displayedForecastDays.map((day) => {
            const isUp = day.changeFromCurrent > 0;
            const isFlat = day.changeFromCurrent === 0;

            return (
              <div
                key={day.dayIndex}
                className="p-3 rounded-xl bg-white/75 border border-[#2E9CAB]/15 hover:border-[#2E9CAB]/40 shadow-warm-sm hover:shadow-warm-md transition-all text-center card-3d"
              >
                <div className="text-[11px] font-bold text-[#26201A]/60">
                  Day +{day.dayIndex}
                </div>
                <div className="text-xs font-semibold text-[#26201A] mt-0.5">
                  {day.date}
                </div>
                <div className="text-base font-extrabold text-[#1F5C3F] mt-1.5">
                  ₹{day.predictedPrice}
                </div>
                <div className="text-[10px] text-[#26201A]/55">
                  per kg
                </div>
                
                {/* Diff Badge */}
                <div className={`mt-2 text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-flex items-center gap-0.5 ${
                  isUp
                    ? 'bg-emerald-100 text-emerald-800'
                    : isFlat
                    ? 'bg-gray-100 text-gray-700'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {isUp ? '+' : ''}{day.changeFromCurrent}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
