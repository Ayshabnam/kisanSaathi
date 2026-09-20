import React, { useState } from 'react';
import { 
  Wallet, TrendingUp, TrendingDown, DollarSign, Calendar, 
  MapPin, Truck, ChevronRight, X, Sparkles, Award, BarChart3, CheckCircle2 
} from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useApp } from '../context/AppContext';
import { SaleRecord } from '../types';

export const EarningsView: React.FC = () => {
  const { sales, t } = useApp();
  const [selectedMonth, setSelectedMonth] = useState<string>('September 2026');
  const [selectedSaleDetail, setSelectedSaleDetail] = useState<SaleRecord | null>(null);

  // Available months in sales data
  const monthsAvailable = Array.from(new Set(sales.map(s => s.month)));
  if (!monthsAvailable.includes('September 2026')) monthsAvailable.unshift('September 2026');

  // Filter sales by selected month
  const monthSales = sales.filter(s => s.month === selectedMonth);

  // Financial aggregates
  const totalSalesRevenue = monthSales.reduce((acc, s) => acc + s.grossRevenue, 0);
  const totalTransportCost = monthSales.reduce((acc, s) => acc + s.transportCost, 0);
  const totalOtherExpenses = monthSales.reduce((acc, s) => acc + s.otherExpenses, 0);
  const totalExpenses = totalTransportCost + totalOtherExpenses;
  const netReturn = totalSalesRevenue - totalExpenses;
  const totalProduceSoldKg = monthSales.reduce((acc, s) => acc + s.quantityKg, 0);

  // Identify most sold crop and highest earning crop
  const cropSalesMap: Record<string, { qty: number; net: number; emoji: string }> = {};
  monthSales.forEach(s => {
    if (!cropSalesMap[s.cropName]) {
      cropSalesMap[s.cropName] = { qty: 0, net: 0, emoji: s.emoji };
    }
    cropSalesMap[s.cropName].qty += s.quantityKg;
    cropSalesMap[s.cropName].net += s.netReturn;
  });

  let mostSoldCrop = 'Tomato 🍅';
  let highestEarningCrop = 'Tomato 🍅';
  let maxQty = 0;
  let maxNet = 0;

  Object.entries(cropSalesMap).forEach(([cropName, data]) => {
    if (data.qty > maxQty) {
      maxQty = data.qty;
      mostSoldCrop = `${cropName} ${data.emoji}`;
    }
    if (data.net > maxNet) {
      maxNet = data.net;
      highestEarningCrop = `${cropName} ${data.emoji}`;
    }
  });

  const totalLocations = new Set(monthSales.map(s => s.marketName)).size;

  // Chart data comparing September vs August
  const chartComparisonData = [
    {
      name: 'August',
      Sales: 41000,
      Expenses: 9000,
      NetReturn: 32000,
    },
    {
      name: 'September',
      Sales: totalSalesRevenue || 48500,
      Expenses: totalExpenses || 10500,
      NetReturn: netReturn || 38000,
    }
  ];

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-3.5 pt-3">
      {/* View Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
            <span>{t.navEarnings}</span>
            <span className="text-xl">💰</span>
          </h2>
          <p className="text-xs text-emerald-800 font-medium">
            Financial performance, sales records & monthly net profit
          </p>
        </div>

        {/* Month Selector Dropdown */}
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="bg-white border border-emerald-200 text-xs font-bold text-emerald-900 rounded-xl px-2.5 py-1.5 focus:outline-none focus:border-emerald-600 shadow-xs"
        >
          {monthsAvailable.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* SECTION 11: MONTHLY EARNINGS HERO CARDS (This Month: ₹48,500 Sales, ₹10,500 Expenses, ₹38,000 Net) */}
      <div className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 text-white rounded-3xl p-5 shadow-lg border border-emerald-700">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
            {selectedMonth} {t.navEarnings}
          </span>
          <span className="text-[11px] font-black bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
            Verified Records
          </span>
        </div>

        {/* Net Return Big Callout */}
        <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-xs border border-white/15 mb-3.5">
          <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-1">
            💰 {t.netReturn} (Profit in Hand)
          </span>
          <div className="text-3xl font-black text-white tracking-tight flex items-baseline gap-2">
            <span>₹{netReturn.toLocaleString()}</span>
            <span className="text-xs font-semibold text-emerald-200">+18.7% vs last month</span>
          </div>
        </div>

        {/* Sales vs Expenses 2-Column Split */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-emerald-950/70 p-3 rounded-2xl border border-emerald-800">
            <span className="text-[10px] text-emerald-300 uppercase font-bold block mb-0.5">
              📈 {t.totalSales}
            </span>
            <span className="text-lg font-black text-white">
              ₹{totalSalesRevenue.toLocaleString()}
            </span>
            <span className="text-[10px] text-emerald-400 block mt-0.5">
              Gross revenue received
            </span>
          </div>

          <div className="bg-rose-950/60 p-3 rounded-2xl border border-rose-900/60">
            <span className="text-[10px] text-rose-300 uppercase font-bold block mb-0.5">
              📉 {t.totalExpenses}
            </span>
            <span className="text-lg font-black text-rose-200">
              ₹{totalExpenses.toLocaleString()}
            </span>
            <span className="text-[10px] text-rose-300/80 block mt-0.5">
              Transport + Mandi fee
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 11: RECHARTS BAR CHART (Sales vs Expenses vs Net Return) */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-emerald-100">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-slate-800">
              Monthly Financial Comparison
            </h3>
            <p className="text-[11px] text-gray-500">Sales, Expenses & Net Return</p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-lg">
            August vs September
          </span>
        </div>

        <div className="h-44 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartComparisonData} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748B' }} />
              <YAxis tick={{ fontSize: 10, fill: '#64748B' }} tickFormatter={(val) => `₹${val / 1000}k`} />
              <Tooltip 
                formatter={(value: any) => [`₹${Number(value).toLocaleString()}`, '']}
                contentStyle={{ borderRadius: '12px', fontSize: '11px', border: '1px solid #E2E8F0' }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
              <Bar dataKey="Sales" fill="#059669" radius={[4, 4, 0, 0]} name="Sales" />
              <Bar dataKey="Expenses" fill="#E11D48" radius={[4, 4, 0, 0]} name="Expenses" />
              <Bar dataKey="NetReturn" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Net Return" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* SECTION 13: MONTH-END SUMMARY (Your September Farming Summary) */}
      <div className="bg-gradient-to-br from-amber-500/15 via-amber-400/10 to-emerald-500/10 rounded-3xl p-4 border-2 border-amber-300 shadow-xs">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-black text-sm text-slate-900">
              🌾 Your {selectedMonth.split(' ')[0]} Farming Summary
            </h3>
            <span className="text-[11px] text-gray-600">
              Key milestones & harvest performance
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="bg-white p-2.5 rounded-2xl border border-amber-200">
            <span className="text-[10px] text-gray-500 block uppercase font-bold">
              {t.produceSold}:
            </span>
            <span className="text-base font-black text-slate-900">
              {totalProduceSoldKg.toLocaleString()} kg
            </span>
          </div>

          <div className="bg-white p-2.5 rounded-2xl border border-amber-200">
            <span className="text-[10px] text-gray-500 block uppercase font-bold">
              💰 {t.netReturn}:
            </span>
            <span className="text-base font-black text-emerald-800">
              ₹{netReturn.toLocaleString()}
            </span>
          </div>

          <div className="bg-white p-2.5 rounded-2xl border border-amber-200">
            <span className="text-[10px] text-gray-500 block uppercase font-bold">
              {t.mostSoldCrop}:
            </span>
            <span className="text-xs font-extrabold text-slate-900 truncate block">
              {mostSoldCrop}
            </span>
          </div>

          <div className="bg-white p-2.5 rounded-2xl border border-amber-200">
            <span className="text-[10px] text-gray-500 block uppercase font-bold">
              {t.sellingLocations}:
            </span>
            <span className="text-xs font-extrabold text-slate-900">
              {totalLocations} Active Markets
            </span>
          </div>
        </div>
      </div>

      {/* SECTION 12: SALES HISTORY LIST */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700">
            {t.salesHistory} ({monthSales.length} records)
          </span>
          <span className="text-[11px] text-emerald-800 font-semibold">
            Tap for full receipt
          </span>
        </div>

        <div className="space-y-2.5">
          {monthSales.map((sale) => (
            <div
              key={sale.id}
              onClick={() => setSelectedSaleDetail(sale)}
              className="bg-white rounded-2xl p-3.5 shadow-xs border border-emerald-100 hover:border-emerald-300 transition cursor-pointer flex items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="text-2xl shrink-0">{sale.emoji}</span>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {sale.cropName} — {sale.quantityKg} kg
                  </h4>
                  <p className="text-[11px] text-gray-500 truncate">
                    📍 {sale.marketName} • {sale.date}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-sm font-black text-emerald-800 block">
                  ₹{sale.netReturn.toLocaleString()}
                </span>
                <span className="text-[10px] text-gray-400 block">
                  Rate: ₹{sale.pricePerKg}/kg
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedSaleDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-5 border border-emerald-100 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{selectedSaleDetail.emoji}</span>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    {selectedSaleDetail.cropName} Sale Receipt
                  </h3>
                  <p className="text-[11px] text-gray-400">{selectedSaleDetail.date}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedSaleDetail(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs py-1">
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Market / Buyer:</span>
                <span className="font-bold text-slate-900">{selectedSaleDetail.marketName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Quantity Sold:</span>
                <span className="font-bold text-slate-900">{selectedSaleDetail.quantityKg} kg</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Offered Rate:</span>
                <span className="font-bold text-slate-900">₹{selectedSaleDetail.pricePerKg} / kg</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100">
                <span className="text-gray-500">Gross Sales:</span>
                <span className="font-bold text-slate-900">₹{selectedSaleDetail.grossRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 text-rose-600">
                <span>Transportation Cost:</span>
                <span className="font-bold">-₹{selectedSaleDetail.transportCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-100 text-gray-600">
                <span>Mandi & Other Fees:</span>
                <span className="font-bold">-₹{selectedSaleDetail.otherExpenses.toLocaleString()}</span>
              </div>

              <div className="bg-amber-100 p-3 rounded-2xl flex items-center justify-between mt-3">
                <span className="text-xs font-black text-amber-950 uppercase">
                  Net Return Received:
                </span>
                <span className="text-lg font-black text-amber-950">
                  ₹{selectedSaleDetail.netReturn.toLocaleString()}
                </span>
              </div>
            </div>

            <button
              onClick={() => setSelectedSaleDetail(null)}
              className="w-full mt-4 py-2.5 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow transition"
            >
              {t.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
