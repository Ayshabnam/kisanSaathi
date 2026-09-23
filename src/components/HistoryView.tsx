import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SaleRecord } from '../types';
import {
  Calendar,
  Trash2,
  Receipt,
  Download,
  Building2,
  MapPin,
  TrendingUp,
  X,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const HistoryView: React.FC = () => {
  const { t, salesHistory, deleteSaleRecord, setActiveTab } = useApp();
  const [selectedReceipt, setSelectedReceipt] = useState<SaleRecord | null>(null);

  const totalEarnings = salesHistory.reduce((acc, curr) => acc + curr.netReturn, 0);
  const totalVolume = salesHistory.reduce((acc, curr) => acc + curr.quantityKg, 0);
  const totalExpensesDeducted = salesHistory.reduce((acc, curr) => acc + curr.totalExpenses, 0);

  return (
    <div className="space-y-6 pb-20 md:pb-10">
      {/* Title */}
      <div className="glass-panel rounded-3xl border border-[#D2691E]/15 p-6 shadow-warm-sm card-3d">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-black text-[#26201A] tracking-tight">
              {t.salesHistory}
            </h2>
            <p className="text-xs text-[#26201A]/65 mt-1 font-medium">
              {t.historySubtitle}
            </p>
          </div>

          <button
            onClick={() => setActiveTab('compare')}
            className="min-h-[44px] px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#D2691E] to-[#F5A623] hover:opacity-95 text-white text-xs font-black flex items-center justify-center gap-2 transition active:scale-95 shadow-warm-sm"
          >
            <span>+ Record New Sale</span>
          </button>
        </div>

        {/* Aggregated Totals Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-6">
          <div className="bg-[#EDF5EB] border border-[#1F5C3F]/30 rounded-2xl p-4 shadow-warm-xs">
            <span className="text-[11px] font-black text-[#1F5C3F] uppercase tracking-wider">
              {t.totalEarnings}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#26201A] mt-1">
              ₹{totalEarnings.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-[#1F5C3F] font-bold mt-1">
              Pure profit after deducting all costs
            </div>
          </div>

          <div className="bg-white/80 border border-[#F5A623]/30 rounded-2xl p-4 shadow-warm-xs">
            <span className="text-[11px] font-black text-[#D2691E] uppercase tracking-wider">
              {t.totalSoldProduce}
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#26201A] mt-1">
              {totalVolume.toLocaleString('en-IN')} kg
            </div>
            <div className="text-[11px] text-[#26201A]/65 font-bold mt-1">
              {(totalVolume / 100).toFixed(1)} {t.quintalsHint} sold
            </div>
          </div>

          <div className="bg-[#FFF8EE] border border-[#F5A623]/40 rounded-2xl p-4 shadow-warm-xs">
            <span className="text-[11px] font-black text-[#D2691E] uppercase tracking-wider">
              Total Transport & Fees Accounted
            </span>
            <div className="text-2xl sm:text-3xl font-black text-[#D2691E] mt-1">
              ₹{totalExpensesDeducted.toLocaleString('en-IN')}
            </div>
            <div className="text-[11px] text-[#26201A]/65 font-semibold mt-1">
              Transport freight & mandi cess accounted
            </div>
          </div>
        </div>
      </div>

      {/* History Records List */}
      {salesHistory.length === 0 ? (
        <div className="bg-[#FFFDF9] rounded-[24px] border border-[#C1622D]/15 p-12 text-center space-y-3 shadow-warm-sm">
          <div className="text-4xl">🌾</div>
          <h3 className="font-black text-base text-[#2E2118]">{t.noSalesYet}</h3>
          <p className="text-xs text-stone-600 max-w-sm mx-auto font-medium">
            Compare prices across nearby mandis and tap "Record Sale" to keep a permanent digital record.
          </p>
          <button
            onClick={() => setActiveTab('compare')}
            className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-[#C1622D] text-white font-black text-xs shadow-warm-sm"
          >
            Go to Price Comparator
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {salesHistory.map((item) => (
            <div
              key={item.id}
              className="bg-[#FFFDF9] rounded-[20px] border border-[#C1622D]/15 p-4 shadow-warm-sm hover:border-[#E8A93D]/60 transition"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#FFF9EE] to-[#FDECCB] border border-[#E8A93D]/40 flex items-center justify-center text-2xl shrink-0 shadow-xs">
                    {item.emoji}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-base text-[#2E2118]">
                        {item.cropName} ({item.quantityKg} kg)
                      </h4>
                      <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#EDF5EB] text-[#2D4F26] border border-[#4A7C3F]/30">
                        ₹{item.pricePerKg}/kg
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-stone-600 mt-0.5 font-medium">
                      <span className="flex items-center gap-1 font-bold text-[#2E2118]">
                        <Building2 className="w-3.5 h-3.5 text-[#C1622D]" />
                        {item.marketName}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-stone-400" />
                        {item.date}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-auto">
                  <div className="text-right">
                    <div className="text-lg font-black text-[#4A7C3F]">
                      +₹{item.netReturn.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] text-stone-500 font-medium">
                      Gross ₹{item.grossRevenue.toLocaleString('en-IN')} − Costs ₹{item.totalExpenses.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedReceipt(item)}
                      className="w-10 h-10 rounded-xl bg-[#FBF3E7] hover:bg-[#F4E8D6] text-[#2E2118] flex items-center justify-center transition border border-amber-200/60"
                      title="View Receipt"
                    >
                      <Receipt className="w-4 h-4 text-[#C1622D]" />
                    </button>
                    <button
                      onClick={() => deleteSaleRecord(item.id)}
                      className="w-10 h-10 rounded-xl bg-[#FBF3E7] hover:bg-rose-50 text-stone-400 hover:text-rose-600 flex items-center justify-center transition border border-amber-200/60"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {item.notes && (
                <div className="mt-2.5 pt-2 border-t border-amber-100 text-xs text-stone-600 italic">
                  💡 {item.notes}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* RECEIPT MODAL */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 bg-[#2E2118]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFDF9] rounded-[24px] max-w-md w-full shadow-warm-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150 border border-[#C1622D]/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#2D4F26] to-[#C1622D] text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-2xl bg-[#E8A93D] text-[#2E2118] flex items-center justify-center font-black shadow-xs">
                  ₹
                </div>
                <div>
                  <h3 className="font-black text-base">VayalWay Sale Slip</h3>
                  <p className="text-xs text-[#EDF5EB] font-medium">Ref: {selectedReceipt.id}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedReceipt(null)}
                className="w-10 h-10 rounded-full hover:bg-white/10 text-white flex items-center justify-center transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Slip content */}
            <div className="p-6 space-y-4 text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-dashed border-amber-200">
                <div>
                  <div className="text-[10px] text-stone-500 uppercase font-black">Crop & Weight</div>
                  <div className="font-black text-[#2E2118] text-sm">
                    {selectedReceipt.emoji} {selectedReceipt.cropName} ({selectedReceipt.quantityKg} kg)
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-stone-500 uppercase font-black">Sale Date</div>
                  <div className="font-bold text-[#2E2118]">{selectedReceipt.date}</div>
                </div>
              </div>

              <div className="space-y-2 py-1">
                <div className="flex justify-between">
                  <span className="text-stone-600 font-medium">Buyer / Mandi</span>
                  <span className="font-black text-[#2E2118]">{selectedReceipt.marketName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 font-medium">Location</span>
                  <span className="font-bold text-stone-700">{selectedReceipt.marketLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 font-medium">Offered Rate</span>
                  <span className="font-black text-[#C1622D]">₹{selectedReceipt.pricePerKg} / kg</span>
                </div>
              </div>

              {/* Cost breakdown */}
              <div className="bg-[#FBF3E7] p-3.5 rounded-2xl border border-amber-200 space-y-2 font-medium">
                <div className="flex justify-between font-bold text-[#2E2118]">
                  <span>Gross Produce Value</span>
                  <span>+₹{selectedReceipt.grossRevenue.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-rose-600 font-bold">
                  <span>Less: Truck Transport</span>
                  <span>-₹{selectedReceipt.transportCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#C1622D] font-bold">
                  <span>Less: Mandi Cess & Commission</span>
                  <span>-₹{selectedReceipt.commissionFee.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[#C1622D] font-bold">
                  <span>Less: Handling / Hamali</span>
                  <span>-₹{selectedReceipt.handlingCost.toLocaleString('en-IN')}</span>
                </div>
                <div className="pt-2 border-t border-amber-200/80 flex justify-between font-black text-sm text-[#2E2118]">
                  <span className="text-[#2D4F26]">Final Net Take-Home Return</span>
                  <span className="text-base text-[#4A7C3F]">
                    = ₹{selectedReceipt.netReturn.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#FFFDF9] border-t border-amber-100 flex justify-end">
              <button
                onClick={() => setSelectedReceipt(null)}
                className="min-h-[44px] px-5 py-2 rounded-2xl bg-[#E8A93D] hover:bg-[#D9992E] text-[#2E2118] font-black text-xs shadow-warm-xs"
              >
                Close Slip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
