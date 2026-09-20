import React, { useState } from 'react';
import { 
  TrendingUp, TrendingDown, Minus, MapPin, Truck, AlertCircle, 
  ChevronRight, Sparkles, Check, Plus, Trash2, ArrowUpDown, 
  HelpCircle, CheckCircle2, DollarSign, BarChart2, ShieldAlert
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MarketOption, ExpenseItem, CropData } from '../types';

export const SellProduceView: React.FC = () => {
  const { 
    crops, 
    selectedCropId, 
    setSelectedCropId, 
    selectedCrop, 
    quantity, 
    setQuantity, 
    addSale, 
    setActiveTab, 
    t, 
    profile 
  } = useApp();

  const [activeMarketId, setActiveMarketId] = useState<string>('market_b');
  const [showCustomCalculator, setShowCustomCalculator] = useState<boolean>(false);
  const [recordedSuccess, setRecordedSuccess] = useState<boolean>(false);

  // Custom expenses state for the interactive calculator
  const [customExpenses, setCustomExpenses] = useState<ExpenseItem[]>([
    { id: 'exp_pack', name: 'Packaging Bags', amount: 350 },
    { id: 'exp_lab', name: 'Loading Labour', amount: 450 }
  ]);
  const [newExpName, setNewExpName] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');

  // Preset quick quantity buttons (Minimal typing accessibility rule)
  const quickQuantities = [100, 250, 500, 1000, 2000];

  // Calculate market financials for each market option
  const calculateOptionFinancials = (market: MarketOption) => {
    const totalSellingAmount = market.offeredPricePerKg * quantity;
    // Estimated transport: base distance * quantity transport factor
    // Realistic scale: ~₹1.5 - ₹3 per km per quintal
    const transportCost = Math.round(
      Math.max(400, market.distanceKm * 25 + quantity * market.transportRatePerKmKg * (market.distanceKm / 10))
    );
    // Market charges & handling
    const marketFee = Math.round((totalSellingAmount * market.fixedMarketFeePercent) / 100);
    const otherExpenses = market.typicalHandlingFee + marketFee;
    const totalExpenses = transportCost + otherExpenses;
    const estimatedNetReturn = totalSellingAmount - totalExpenses;

    return {
      totalSellingAmount,
      transportCost,
      otherExpenses,
      marketFee,
      totalExpenses,
      estimatedNetReturn
    };
  };

  // Sort markets by ESTIMATED NET RETURN (highest profit first!)
  const marketOptionsWithReturns = selectedCrop.availableMarkets.map((m) => {
    const financials = calculateOptionFinancials(m);
    return {
      ...m,
      ...financials
    };
  }).sort((a, b) => b.estimatedNetReturn - a.estimatedNetReturn);

  // Highest priced market to highlight prompt rule: "Highest price does not always mean highest profit"
  const highestPriceMarket = [...marketOptionsWithReturns].sort((a, b) => b.offeredPricePerKg - a.offeredPricePerKg)[0];
  const bestNetReturnMarket = marketOptionsWithReturns[0];
  const isHighestPriceDifferentFromBestProfit = 
    highestPriceMarket && bestNetReturnMarket && highestPriceMarket.id !== bestNetReturnMarket.id;

  // Selected market for detailed view/recording
  const currentSelectedMarket = marketOptionsWithReturns.find(m => m.id === activeMarketId) || marketOptionsWithReturns[0];

  // Custom calculator totals:
  const activeCustomExpensesTotal = customExpenses.reduce((sum, item) => sum + item.amount, 0);
  const activeRevenue = currentSelectedMarket.offeredPricePerKg * quantity;
  const activeTotalExpenses = currentSelectedMarket.transportCost + currentSelectedMarket.marketFee + activeCustomExpensesTotal;
  const activeNetReturn = activeRevenue - activeTotalExpenses;

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpName.trim() || !newExpAmount || isNaN(Number(newExpAmount))) return;
    setCustomExpenses([
      ...customExpenses,
      {
        id: `exp_${Date.now()}`,
        name: newExpName.trim(),
        amount: Math.round(Number(newExpAmount))
      }
    ]);
    setNewExpName('');
    setNewExpAmount('');
  };

  const handleRemoveExpense = (id: string) => {
    setCustomExpenses(customExpenses.filter(e => e.id !== id));
  };

  const handleRecordSale = (market: typeof marketOptionsWithReturns[0]) => {
    addSale({
      cropId: selectedCrop.id,
      cropName: t[selectedCrop.nameKey as keyof typeof t] || selectedCrop.id,
      emoji: selectedCrop.emoji,
      quantityKg: quantity,
      pricePerKg: market.offeredPricePerKg,
      grossRevenue: market.totalSellingAmount,
      transportCost: market.transportCost,
      otherExpenses: market.otherExpenses,
      netReturn: market.estimatedNetReturn,
      marketName: market.name,
      marketLocation: market.location,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      month: 'September 2026',
      notes: `Sold at ₹${market.offeredPricePerKg}/kg`
    });

    setRecordedSuccess(true);
    setTimeout(() => {
      setRecordedSuccess(false);
      setActiveTab('earnings');
    }, 1800);
  };

  return (
    <div className="space-y-4 pb-20 max-w-md mx-auto px-3.5 pt-3">
      {/* View Title */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{t.sellMyProduce}</span>
            <span className="text-xl">{selectedCrop.emoji}</span>
          </h2>
          <p className="text-xs text-emerald-800 font-medium">
            Compare nearby markets & maximize your net profit
          </p>
        </div>

        <button
          onClick={() => setShowCustomCalculator(!showCustomCalculator)}
          className={`text-xs font-bold py-1.5 px-3 rounded-xl border flex items-center gap-1 transition ${
            showCustomCalculator
              ? 'bg-amber-100 border-amber-300 text-amber-900'
              : 'bg-white border-emerald-200 text-emerald-800 hover:bg-emerald-50'
          }`}
        >
          <DollarSign className="w-3.5 h-3.5" />
          <span>Calculator</span>
        </button>
      </div>

      {/* Step 1: Crop Selection Carousel (Horizontal Pills) */}
      <div className="bg-white rounded-2xl p-3 shadow-xs border border-emerald-100">
        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2">
          {t.selectCrop}
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {crops.map((crop) => {
            const isSelected = crop.id === selectedCropId;
            return (
              <button
                key={crop.id}
                id={`crop-select-${crop.id}`}
                onClick={() => {
                  setSelectedCropId(crop.id);
                  setActiveMarketId(crop.availableMarkets[0]?.id || 'market_b');
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold shrink-0 transition ${
                  isSelected
                    ? 'bg-emerald-800 text-white shadow-md ring-2 ring-amber-300'
                    : 'bg-emerald-50/70 text-slate-700 hover:bg-emerald-100/70 border border-emerald-100'
                }`}
              >
                <span className="text-lg">{crop.emoji}</span>
                <span>{t[crop.nameKey as keyof typeof t] || crop.id}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isSelected ? 'bg-emerald-950/60 text-amber-300' : 'bg-white text-emerald-800'}`}>
                  ₹{crop.currentAvgPrice}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step 2: How much do you have? (Quantity Selector - Minimal Typing Rule) */}
      <div className="bg-white rounded-2xl p-4 shadow-xs border border-emerald-100">
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              {t.howMuchDoYouHave}
            </span>
            <div className="text-2xl font-black text-slate-900 flex items-baseline gap-1.5 mt-0.5">
              <span>{quantity.toLocaleString()}</span>
              <span className="text-sm font-bold text-emerald-700">{t.quantityUnitKg}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(50, quantity - 50))}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-slate-800 font-bold text-xl flex items-center justify-center transition active:scale-95"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <button
              onClick={() => setQuantity(quantity + 50)}
              className="w-10 h-10 rounded-xl bg-emerald-100 hover:bg-emerald-200 text-emerald-900 font-bold text-xl flex items-center justify-center transition active:scale-95"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
        </div>

        {/* Quick Amount Pills */}
        <div className="grid grid-cols-5 gap-1.5 pt-2">
          {quickQuantities.map((amt) => (
            <button
              key={amt}
              onClick={() => setQuantity(amt)}
              className={`py-1.5 rounded-xl text-xs font-bold transition text-center ${
                quantity === amt
                  ? 'bg-amber-400 text-slate-950 shadow-xs'
                  : 'bg-emerald-50/70 hover:bg-emerald-100 text-emerald-900'
              }`}
            >
              {amt} kg
            </button>
          ))}
        </div>
      </div>

      {/* PROMINENT RULE HIGHLIGHT: "Highest price does not always mean highest profit" */}
      {isHighestPriceDifferentFromBestProfit && (
        <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 p-3.5 rounded-2xl shadow-sm border border-amber-300 flex items-start gap-2.5">
          <ShieldAlert className="w-5 h-5 text-slate-950 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-extrabold text-[13px] leading-tight mb-0.5">
              Smart Advice: Highest price ≠ Highest profit!
            </p>
            <p className="leading-snug opacity-90">
              {highestPriceMarket.name} offers ₹{highestPriceMarket.offeredPricePerKg}/kg, but long distance ({highestPriceMarket.distanceKm} km) means ₹{highestPriceMarket.transportCost} transport!{' '}
              <strong className="underline font-bold">{bestNetReturnMarket.name} gives you ₹{(bestNetReturnMarket.estimatedNetReturn - highestPriceMarket.estimatedNetReturn).toLocaleString()} MORE in hand!</strong>
            </p>
          </div>
        </div>
      )}

      {/* Interactive Custom Net Return Calculator Card (Section 3 of Prompt) */}
      {showCustomCalculator && (
        <div className="bg-emerald-950 text-white rounded-3xl p-4 shadow-xl border-2 border-amber-400 animate-in slide-in-from-top-4">
          <div className="flex items-center justify-between border-b border-emerald-800 pb-2 mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🧮</span>
              <h3 className="font-bold text-sm text-white">
                Net Return Calculator: {currentSelectedMarket.name}
              </h3>
            </div>
            <button
              onClick={() => setShowCustomCalculator(false)}
              className="text-xs text-emerald-300 hover:text-white"
            >
              Done
            </button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center mb-3">
            <div className="bg-emerald-900/80 p-2.5 rounded-2xl border border-emerald-800">
              <span className="text-[10px] text-emerald-300 uppercase font-bold block">
                {t.revenue}
              </span>
              <span className="text-base font-extrabold text-white">
                ₹{activeRevenue.toLocaleString()}
              </span>
              <span className="text-[9px] text-emerald-400 block">
                ₹{currentSelectedMarket.offeredPricePerKg}/kg × {quantity}kg
              </span>
            </div>

            <div className="bg-rose-950/60 p-2.5 rounded-2xl border border-rose-900/60">
              <span className="text-[10px] text-rose-300 uppercase font-bold block">
                {t.expenses}
              </span>
              <span className="text-base font-extrabold text-rose-300">
                -₹{activeTotalExpenses.toLocaleString()}
              </span>
              <span className="text-[9px] text-rose-200/70 block">
                Transport + fees
              </span>
            </div>

            <div className="bg-amber-400 text-slate-950 p-2.5 rounded-2xl shadow-inner">
              <span className="text-[10px] uppercase font-black block">
                {t.netReturn}
              </span>
              <span className="text-lg font-black block">
                ₹{activeNetReturn.toLocaleString()}
              </span>
              <span className="text-[9px] font-bold opacity-80 block">
                Profit in hand
              </span>
            </div>
          </div>

          {/* Manually Add / View Expenses */}
          <div className="bg-emerald-900/60 rounded-2xl p-3 border border-emerald-800">
            <p className="text-xs font-bold text-amber-300 mb-2 flex items-center justify-between">
              <span>Expenses Breakdown:</span>
              <span className="text-[10px] text-emerald-300 font-normal">Add custom costs below</span>
            </p>

            <div className="space-y-1.5 text-xs text-emerald-100">
              <div className="flex justify-between py-1 border-b border-emerald-800/60">
                <span>🚚 Transport ({currentSelectedMarket.distanceKm} km)</span>
                <span className="font-bold">₹{currentSelectedMarket.transportCost}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-emerald-800/60">
                <span>🏛️ Mandi & Handling Fees</span>
                <span className="font-bold">₹{currentSelectedMarket.marketFee}</span>
              </div>
              {customExpenses.map((exp) => (
                <div key={exp.id} className="flex justify-between items-center py-1 border-b border-emerald-800/60">
                  <span>📦 {exp.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold">₹{exp.amount}</span>
                    <button
                      onClick={() => handleRemoveExpense(exp.id)}
                      className="text-rose-400 hover:text-rose-300"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Form to add custom expense */}
            <form onSubmit={handleAddExpense} className="mt-3 flex gap-1.5">
              <input
                type="text"
                placeholder="e.g. Labour, Sacks"
                value={newExpName}
                onChange={(e) => setNewExpName(e.target.value)}
                className="flex-1 bg-emerald-950 text-xs px-2.5 py-1.5 rounded-xl border border-emerald-700 text-white placeholder-emerald-400 focus:outline-none"
              />
              <input
                type="number"
                placeholder="₹ Amount"
                value={newExpAmount}
                onChange={(e) => setNewExpAmount(e.target.value)}
                className="w-20 bg-emerald-950 text-xs px-2.5 py-1.5 rounded-xl border border-emerald-700 text-white placeholder-emerald-400 focus:outline-none"
              />
              <button
                type="submit"
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Step 3: MARKET COMPARISON LIST (Sorted by ESTIMATED NET RETURN) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black uppercase tracking-wider text-slate-700">
              {t.comparingMarkets}
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Sorted by Net Return
            </span>
          </div>
          <span className="text-[11px] text-gray-400">
            {marketOptionsWithReturns.length} options
          </span>
        </div>

        <div className="space-y-3">
          {marketOptionsWithReturns.map((market, index) => {
            const isBestOption = index === 0;
            const isModerate = index === 1;
            const isLower = index > 1;

            return (
              <div
                key={market.id}
                className={`bg-white rounded-3xl p-4 shadow-sm transition border-2 ${
                  isBestOption
                    ? 'border-emerald-500 ring-2 ring-emerald-200/80'
                    : 'border-emerald-100 hover:border-emerald-300'
                }`}
              >
                {/* Badge line: Better / Moderate / Lower Return */}
                <div className="flex items-center justify-between mb-2 pb-2 border-b border-gray-100">
                  <div className="flex items-center gap-1.5">
                    {isBestOption && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-600 text-white shadow-xs">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-300"></span>
                        {t.betterReturn} ⭐ BEST PROFIT
                      </span>
                    )}
                    {isModerate && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        🟡 {t.moderateReturn}
                      </span>
                    )}
                    {isLower && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                        🔴 {t.lowerReturn}
                      </span>
                    )}
                    <span className="text-[11px] text-gray-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {market.distanceKm} km away
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-lg">
                    {market.buyerStatus}
                  </span>
                </div>

                {/* Market Name & Offered Price */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-base leading-tight">
                      {market.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {market.location}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-lg font-black text-emerald-800">
                      ₹{market.offeredPricePerKg}
                    </span>
                    <span className="text-xs font-bold text-gray-500"> / kg</span>
                    <div className="text-[10px] text-emerald-700 font-semibold flex items-center justify-end gap-0.5">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      <span>{market.priceTrend === 'up' ? t.increasing : t.stable}</span>
                    </div>
                  </div>
                </div>

                {/* Financial Breakdown Card (Formula requested in prompt) */}
                <div className="bg-emerald-50/60 rounded-2xl p-3 border border-emerald-100 mb-3 space-y-1 text-xs">
                  <div className="flex justify-between text-gray-700">
                    <span>
                      ₹{market.offeredPricePerKg}/kg × {quantity} kg:
                    </span>
                    <span className="font-bold text-slate-900">
                      ₹{market.totalSellingAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-rose-700">
                    <span className="flex items-center gap-1">
                      <Truck className="w-3.5 h-3.5" />
                      {t.transportCost} ({market.distanceKm} km):
                    </span>
                    <span className="font-bold">
                      -₹{market.transportCost.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>{t.otherExpenses} (Mandi & handling):</span>
                    <span className="font-bold">
                      -₹{market.otherExpenses.toLocaleString()}
                    </span>
                  </div>

                  {/* Main Highlight: ESTIMATED NET RETURN */}
                  <div className="pt-2 mt-1 border-t border-emerald-200/80 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] font-extrabold text-emerald-950 uppercase tracking-tight block">
                        💰 {t.estimatedNetReturn}:
                      </span>
                      <span className="text-[9px] text-emerald-700">
                        {t.basedOnSampleData}
                      </span>
                    </div>
                    <span className="text-xl font-black text-emerald-900">
                      ₹{market.estimatedNetReturn.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Actions: Record Sale or Call Buyer */}
                <div className="flex items-center gap-2">
                  <button
                    id={`record-sale-${market.id}`}
                    onClick={() => handleRecordSale(market)}
                    className="flex-1 bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-sm flex items-center justify-center gap-1.5 transition active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4 text-amber-300" />
                    <span>{t.recordThisSale}</span>
                  </button>

                  <a
                    href={`tel:${market.phoneContact}`}
                    className="py-2.5 px-3 bg-gray-100 hover:bg-gray-200 text-slate-800 text-xs font-bold rounded-xl transition flex items-center gap-1 shrink-0"
                  >
                    <span>📞 Call</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 5: PRICE TREND CARD */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-emerald-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">📈</span>
            <div>
              <h3 className="font-extrabold text-sm text-slate-900">
                {t[selectedCrop.nameKey as keyof typeof t] || selectedCrop.id} {t.priceTrend}
              </h3>
              <p className="text-[11px] text-gray-500">4-week price movement per kg</p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              {t.increasing}
            </span>
          </div>
        </div>

        {/* Visual Price Progression: ₹22 → ₹25 → ₹28 → ₹32 */}
        <div className="bg-emerald-50/70 rounded-2xl p-3 border border-emerald-100 mb-3 flex items-center justify-between text-center">
          {selectedCrop.historicalPrices.map((hp, idx) => (
            <React.Fragment key={hp.date}>
              <div className="flex-1">
                <span className="text-[10px] text-gray-500 font-semibold block">
                  {hp.date}
                </span>
                <span className={`text-sm font-black block mt-0.5 ${idx === selectedCrop.historicalPrices.length - 1 ? 'text-emerald-800 text-base' : 'text-slate-700'}`}>
                  ₹{hp.price}
                </span>
              </div>
              {idx < selectedCrop.historicalPrices.length - 1 && (
                <span className="text-emerald-400 font-bold text-xs">→</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Current & Previous Recorded Price comparison */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span className="text-gray-500 block text-[11px]">{t.currentPrice}:</span>
            <span className="text-base font-extrabold text-emerald-800">
              ₹{selectedCrop.currentAvgPrice} / kg
            </span>
          </div>
          <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-100">
            <span className="text-gray-500 block text-[11px]">{t.previousPrice}:</span>
            <span className="text-base font-bold text-gray-600">
              ₹{selectedCrop.previousAvgPrice} / kg
            </span>
          </div>
        </div>

        <p className="text-[10px] text-gray-400 mt-2 text-center italic">
          *Historical/sample data from regional APMC mandi records. Not guaranteed future prices.
        </p>
      </div>

      {/* Section 6: "SELL NOW OR MONITOR" FEATURE */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white rounded-3xl p-4 shadow-md border border-emerald-700">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">🌾</span>
          <div>
            <h3 className="font-extrabold text-sm tracking-tight text-white">
              {t.sellingInsight}
            </h3>
            <span className="text-[10px] text-emerald-200">
              {t.currentSituation}
            </span>
          </div>
        </div>

        <div className="bg-white/10 rounded-2xl p-3 backdrop-blur-xs mb-3 space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-emerald-200">Crop:</span>
            <span className="font-bold">{selectedCrop.emoji} {t[selectedCrop.nameKey as keyof typeof t] || selectedCrop.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-emerald-200">{t.currentPrice}:</span>
            <span className="font-bold">₹{selectedCrop.currentAvgPrice} / kg</span>
          </div>
          <div className="flex justify-between">
            <span className="text-emerald-200">Recent trend:</span>
            <span className="font-bold text-amber-300">
              📈 {t.increasing} (+₹4 this week)
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-emerald-200">Market Supply:</span>
            <span className="font-bold">{selectedCrop.supplyLevel}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-emerald-200">Season:</span>
            <span className="font-bold">{selectedCrop.seasonStatus}</span>
          </div>
        </div>

        <div className="bg-amber-400 text-slate-950 p-3 rounded-2xl">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider">
              {t.suggestedAction}:
            </span>
            <span className="text-xs font-black bg-slate-950 text-amber-300 px-2 py-0.5 rounded-full">
              {selectedCrop.sellingInsight.action}
            </span>
          </div>
          <p className="text-xs font-semibold leading-snug">
            "{selectedCrop.sellingInsight.explanation}"
          </p>
        </div>
      </div>

      {/* Success Modal / Toast after recording sale */}
      {recordedSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl p-6 text-center max-w-xs shadow-2xl border-2 border-emerald-500 animate-in zoom-in-95">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-3">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>
            <h3 className="text-lg font-extrabold text-slate-900 mb-1">
              {t.saleRecordedSuccess}
            </h3>
            <p className="text-xs text-gray-500 mb-3">
              Added to your monthly earnings and transaction records.
            </p>
            <div className="text-xs font-bold text-emerald-800 bg-emerald-50 py-2 px-3 rounded-xl">
              Opening Earnings Dashboard...
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
