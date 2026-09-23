export type Language = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'mr' | 'bn';

export type NavTab = 'home' | 'compare' | 'forecast' | 'history' | 'profile';

export type SortMode = 'net_return' | 'price' | 'distance';

export interface FarmerProfile {
  name: string;
  location: string;
  state: string;
  farmSize: string; // e.g. "4.5 Acres"
  primaryCrops?: string[];
  primaryCropsGrown?: string[];
  isOnboarded: boolean;
  phone?: string;
}

export type TrendDirection = 'up' | 'down' | 'stable';

export type VerdictType = 'rise' | 'fall' | 'stable';

export interface PricePoint {
  date: string;
  price: number;
  dayNum?: number;
}

export interface ForecastDay {
  dayIndex: number; // 1 to 14
  date: string; // "24 Sep", "25 Sep", etc.
  predictedPrice: number;
  lowPrice: number;
  highPrice: number;
  isProjected: boolean;
  changeFromCurrent: number;
}

export interface CropForecast {
  cropId: string;
  cropName: string;
  emoji: string;
  verdict: VerdictType;
  verdictTitle: string; // e.g., "Price likely to RISE"
  verdictConfidence: number; // e.g. 86%
  reason: string; // Plausible seasonal / festival / weather / arrival driver
  currentPrice: number;
  projectedDay7Price: number;
  projectedDay14Price: number;
  expectedDiffPerKg: number;
  recommendation: 'wait' | 'sell_now' | 'stable_window';
  recommendationHeadline: string;
  recommendedWaitDays: number;
  historicalDays: PricePoint[]; // 14-30 days
  forecastDays: ForecastDay[]; // Next 7-14 days
  gainLossAnalysis: {
    daysToWait: number;
    differencePerKg: number;
    totalAmountImpact: number; // diff * user's quantity
    isGain: boolean;
    percentageChange: number;
  };
}

export interface MarketOption {
  id: string;
  name: string;
  type: 'mandi' | 'wholesaler' | 'fpo' | 'direct_buyer' | 'retail_hub' | 'processing_unit';
  typeLabel: string;
  location: string;
  distanceKm: number;
  offeredPricePerKg: number;
  priceTrend: TrendDirection;
  trendText: string;
  buyerStatus: string;
  rating: number;
  transportRatePerKmKg: number; // e.g., ₹0.15 per kg-km
  baseTransportFixed: number; // minimum vehicle hire charge
  fixedMarketFeePercent: number; // APMC or broker commission % (e.g. 2% or 0% for direct)
  handlingFee: number; // loading/unloading
  phoneContact: string;
  verifiedBuyer: boolean;
  paymentTerms: string; // e.g. "Immediate Cash", "Same-day NEFT"
}

export interface CropData {
  id: string;
  nameKey: string;
  emoji: string;
  category: 'Vegetables' | 'Grains' | 'Cash Crops' | 'Fruits' | 'Pulses';
  currentAvgPrice: number;
  previousAvgPrice: number;
  unit: string;
  trend: TrendDirection;
  trendPercentage: number;
  standardPackaging: string; // e.g., "50 kg gunny bag", "25 kg crate"
  historicalPrices: PricePoint[];
  marketSupply: 'High' | 'Moderate' | 'Low';
  availableMarkets: MarketOption[];
}

export interface SaleRecord {
  id: string;
  cropId: string;
  cropName: string;
  emoji: string;
  quantityKg: number;
  pricePerKg: number;
  grossRevenue: number;
  transportCost: number;
  commissionFee: number;
  handlingCost: number;
  totalExpenses: number;
  netReturn: number;
  marketName: string;
  marketLocation: string;
  marketType: string;
  date: string;
  month: string;
  notes?: string;
  soldVia: 'VayalWay Recommendation' | 'Direct Negotiation';
}

export interface NotificationItem {
  id: string;
  titleKey: string;
  descKey: string;
  defaultTitle: string;
  defaultDesc: string;
  timeAgo: string;
  isRead: boolean;
  type: 'price_alert' | 'high_demand' | 'savings_tip' | 'harvest';
}
