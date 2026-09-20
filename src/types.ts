export type Language = 'en' | 'hi' | 'ta' | 'te' | 'kn' | 'ml';

export interface FarmerProfile {
  name: string;
  location: string;
  farmSize: string; // e.g. "3.5 Acres"
  cropsGrown: string[];
  isOnboarded: boolean;
  phone?: string;
}

export type TrendDirection = 'up' | 'down' | 'stable';

export interface PricePoint {
  date: string;
  price: number;
}

export interface MarketOption {
  id: string;
  name: string;
  type: 'mandi' | 'wholesaler' | 'fpo' | 'direct_buyer' | 'retail_hub';
  location: string;
  distanceKm: number;
  offeredPricePerKg: number;
  priceTrend: TrendDirection;
  trendText: string;
  buyerStatus: 'Open Today' | 'High Demand' | 'Accepting Produce' | 'Limited Quota';
  rating: number;
  transportRatePerKmKg: number; // e.g., ₹0.15 per kg-km base
  fixedMarketFeePercent: number; // e.g. 1.5%
  typicalHandlingFee: number; // ₹400
  phoneContact: string;
}

export interface CropSeasonInfo {
  plantingMonths: number[]; // 1-12
  growingMonths: number[];
  harvestMonths: number[];
  highDemandMonths: number[];
  bestGrowingPeriod: string;
  typicalHarvestPeriod: string;
  marketDemandDescription: string;
}

export interface CropData {
  id: string;
  nameKey: string;
  emoji: string;
  currentAvgPrice: number;
  previousAvgPrice: number;
  unit: string;
  trend: TrendDirection;
  supplyLevel: 'Low' | 'Moderate' | 'High';
  seasonStatus: 'Harvest Period' | 'Growing' | 'Peak Demand' | 'Off-Season';
  historicalPrices: PricePoint[];
  sellingInsight: {
    action: 'Sell Now' | 'Monitor prices' | 'Hold Stock';
    explanation: string;
    actionKey: string;
    explanationKey: string;
  };
  seasonInfo: CropSeasonInfo;
  availableMarkets: MarketOption[];
}

export interface FarmerCrop {
  id: string;
  cropId: string;
  name: string;
  emoji: string;
  quantityKg: number;
  plantingDate: string;
  expectedHarvest: string;
  status: 'Ready to Harvest' | 'Growing' | 'Harvested' | 'Stored';
}

export interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
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
  otherExpenses: number;
  netReturn: number;
  marketName: string;
  marketLocation: string;
  date: string;
  month: string; // "September 2026"
  notes?: string;
}

export interface MonthlySummary {
  month: string;
  year: number;
  totalProduceSoldKg: number;
  totalSales: number;
  totalExpenses: number;
  netReturn: number;
  mostSoldCrop: string;
  highestEarningCrop: string;
  totalSellingLocations: number;
}

export interface NotificationItem {
  id: string;
  titleKey: string;
  descKey: string;
  defaultTitle: string;
  defaultDesc: string;
  timeAgo: string;
  isRead: boolean;
  type: 'price_alert' | 'harvest_reminder' | 'monthly_report' | 'cost_warning';
  targetTab?: 'home' | 'sell' | 'crops' | 'earnings';
  cropId?: string;
}
