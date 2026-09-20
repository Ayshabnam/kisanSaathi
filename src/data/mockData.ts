import { CropData, FarmerCrop, SaleRecord, NotificationItem } from '../types';

export const CROPS_DATABASE: CropData[] = [
  {
    id: 'tomato',
    nameKey: 'tomato',
    emoji: '🍅',
    currentAvgPrice: 32,
    previousAvgPrice: 28,
    unit: 'kg',
    trend: 'up',
    supplyLevel: 'High',
    seasonStatus: 'Harvest Period',
    historicalPrices: [
      { date: 'Week 1', price: 22 },
      { date: 'Week 2', price: 25 },
      { date: 'Week 3', price: 28 },
      { date: 'Current', price: 32 }
    ],
    sellingInsight: {
      action: 'Monitor prices',
      actionKey: 'monitorPrices',
      explanation: 'Prices have recently increased, but market conditions can change quickly. Check nearby buyers before selling or lock in at Market B for highest net margin.',
      explanationKey: 'tomatoInsight'
    },
    seasonInfo: {
      plantingMonths: [6, 7, 10, 11],
      growingMonths: [7, 8, 11, 12],
      harvestMonths: [8, 9, 1, 2],
      highDemandMonths: [9, 10, 11],
      bestGrowingPeriod: 'August – November (Post-monsoon warm days, cool nights)',
      typicalHarvestPeriod: '60 – 75 days after planting',
      marketDemandDescription: 'High demand in urban wholesale markets and ketchup processing units'
    },
    availableMarkets: [
      {
        id: 'market_b',
        name: 'Mandi Yard Sector 4 (Market B)',
        type: 'mandi',
        location: 'Taluk APMC Mandi, South Gate',
        distanceKm: 18,
        offeredPricePerKg: 32,
        priceTrend: 'up',
        trendText: '₹32/kg (Up +₹4 this week)',
        buyerStatus: 'Open Today',
        rating: 4.8,
        transportRatePerKmKg: 0.16, // calculated transport approx ~₹1,500 for 500kg
        fixedMarketFeePercent: 1.5,
        typicalHandlingFee: 500,
        phoneContact: '+91 98450 12345'
      },
      {
        id: 'market_a',
        name: 'Local Kisan Bazaar (Market A)',
        type: 'direct_buyer',
        location: 'Nearby Village Center Hub',
        distanceKm: 6,
        offeredPricePerKg: 28,
        priceTrend: 'stable',
        trendText: '₹28/kg (Stable rate)',
        buyerStatus: 'Accepting Produce',
        rating: 4.5,
        transportRatePerKmKg: 0.15, // transport approx ~₹800 for 500kg
        fixedMarketFeePercent: 0.8,
        typicalHandlingFee: 500,
        phoneContact: '+91 94420 54321'
      },
      {
        id: 'market_c',
        name: 'Metro City Wholesalers (Market C)',
        type: 'wholesaler',
        location: 'Central Terminal Mega Mandi',
        distanceKm: 58,
        offeredPricePerKg: 35, // HIGHEST price per kg, BUT high transport!
        priceTrend: 'up',
        trendText: '₹35/kg (Premium rate)',
        buyerStatus: 'High Demand',
        rating: 4.2,
        transportRatePerKmKg: 0.22, // transport ~₹3,800 + handling ~₹1,000 -> net lower than Market B!
        fixedMarketFeePercent: 2.2,
        typicalHandlingFee: 1000,
        phoneContact: '+91 99011 88990'
      },
      {
        id: 'market_d',
        name: 'AgriFPO Processing Depot',
        type: 'fpo',
        location: 'Cooperative Cold Storage Gate 2',
        distanceKm: 12,
        offeredPricePerKg: 30,
        priceTrend: 'stable',
        trendText: '₹30/kg (Instant UPI payment)',
        buyerStatus: 'Open Today',
        rating: 4.7,
        transportRatePerKmKg: 0.15,
        fixedMarketFeePercent: 0.5,
        typicalHandlingFee: 400,
        phoneContact: '+91 97412 33445'
      }
    ]
  },
  {
    id: 'onion',
    nameKey: 'onion',
    emoji: '🧅',
    currentAvgPrice: 26,
    previousAvgPrice: 25,
    unit: 'kg',
    trend: 'stable',
    supplyLevel: 'Moderate',
    seasonStatus: 'Growing',
    historicalPrices: [
      { date: 'Week 1', price: 24 },
      { date: 'Week 2', price: 24 },
      { date: 'Week 3', price: 25 },
      { date: 'Current', price: 26 }
    ],
    sellingInsight: {
      action: 'Hold Stock',
      actionKey: 'holdStock',
      explanation: 'Onion arrivals from northern belts are slightly delayed. Holding well-cured onions for 1-2 weeks may fetch ₹3–5/kg higher return.',
      explanationKey: 'onionInsight'
    },
    seasonInfo: {
      plantingMonths: [5, 6, 9, 10],
      growingMonths: [6, 7, 8, 10, 11],
      harvestMonths: [9, 10, 12, 1],
      highDemandMonths: [10, 11, 12],
      bestGrowingPeriod: 'June – October (Kharif) and Nov – March (Rabi)',
      typicalHarvestPeriod: '90 – 120 days after transplanting',
      marketDemandDescription: 'Steady baseline demand nationwide; peak festival demand in autumn'
    },
    availableMarkets: [
      {
        id: 'market_onion_a',
        name: 'Sub-Mandi Onion Yard',
        type: 'mandi',
        location: 'East Bypass Road',
        distanceKm: 14,
        offeredPricePerKg: 26,
        priceTrend: 'up',
        trendText: '₹26/kg (Upward bias)',
        buyerStatus: 'Open Today',
        rating: 4.6,
        transportRatePerKmKg: 0.16,
        fixedMarketFeePercent: 1.0,
        typicalHandlingFee: 450,
        phoneContact: '+91 98800 11223'
      },
      {
        id: 'market_onion_b',
        name: 'Sri Krishna Agro Traders',
        type: 'wholesaler',
        location: 'Industrial Area Storage Hub',
        distanceKm: 8,
        offeredPricePerKg: 25,
        priceTrend: 'stable',
        trendText: '₹25/kg (Fixed daily contract)',
        buyerStatus: 'High Demand',
        rating: 4.7,
        transportRatePerKmKg: 0.14,
        fixedMarketFeePercent: 0.5,
        typicalHandlingFee: 400,
        phoneContact: '+91 94488 44332'
      }
    ]
  },
  {
    id: 'paddy',
    nameKey: 'paddy',
    emoji: '🌾',
    currentAvgPrice: 24,
    previousAvgPrice: 22,
    unit: 'kg',
    trend: 'up',
    supplyLevel: 'Moderate',
    seasonStatus: 'Peak Demand',
    historicalPrices: [
      { date: 'Week 1', price: 21 },
      { date: 'Week 2', price: 22 },
      { date: 'Week 3', price: 22 },
      { date: 'Current', price: 24 }
    ],
    sellingInsight: {
      action: 'Sell Now',
      actionKey: 'sellNow',
      explanation: 'Government MSP procurement centers and private millers are actively purchasing at peak competitive prices with zero moisture deduction.',
      explanationKey: 'paddyInsight'
    },
    seasonInfo: {
      plantingMonths: [6, 7],
      growingMonths: [7, 8, 9],
      harvestMonths: [10, 11],
      highDemandMonths: [10, 11, 12, 1],
      bestGrowingPeriod: 'June – November (Kharif monsoon crop)',
      typicalHarvestPeriod: '120 – 140 days',
      marketDemandDescription: 'Strong institutional and rice mill purchasing during harvest season'
    },
    availableMarkets: [
      {
        id: 'market_paddy_msp',
        name: 'Govt. Grain Procurement Yard',
        type: 'mandi',
        location: 'Civil Supplies Godown Sector 1',
        distanceKm: 9,
        offeredPricePerKg: 24,
        priceTrend: 'up',
        trendText: '₹24/kg (Govt MSP Grade-A)',
        buyerStatus: 'Open Today',
        rating: 4.9,
        transportRatePerKmKg: 0.12,
        fixedMarketFeePercent: 0,
        typicalHandlingFee: 300,
        phoneContact: '+91 94800 77665'
      },
      {
        id: 'market_paddy_miller',
        name: 'Venkateshwara Modern Rice Mill',
        type: 'wholesaler',
        location: 'Highway Road KM 14',
        distanceKm: 15,
        offeredPricePerKg: 24.5,
        priceTrend: 'stable',
        trendText: '₹24.50/kg (Direct weighbridge)',
        buyerStatus: 'Accepting Produce',
        rating: 4.6,
        transportRatePerKmKg: 0.14,
        fixedMarketFeePercent: 0.5,
        typicalHandlingFee: 400,
        phoneContact: '+91 98455 66778'
      }
    ]
  },
  {
    id: 'coconut',
    nameKey: 'coconut',
    emoji: '🥥',
    currentAvgPrice: 38,
    previousAvgPrice: 38,
    unit: 'piece',
    trend: 'stable',
    supplyLevel: 'Moderate',
    seasonStatus: 'Harvest Period',
    historicalPrices: [
      { date: 'Week 1', price: 36 },
      { date: 'Week 2', price: 37 },
      { date: 'Week 3', price: 38 },
      { date: 'Current', price: 38 }
    ],
    sellingInsight: {
      action: 'Sell Now',
      actionKey: 'sellNow',
      explanation: 'Copra oil millers are offering firm stable spot prices. Good time to clear harvested lot before monsoon storage humidifies.',
      explanationKey: 'coconutInsight'
    },
    seasonInfo: {
      plantingMonths: [5, 6, 9],
      growingMonths: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      harvestMonths: [1, 3, 5, 7, 9, 11],
      highDemandMonths: [8, 9, 10, 11],
      bestGrowingPeriod: 'Year-round tropical climate with adequate watering',
      typicalHarvestPeriod: 'Harvest every 45–60 days per mature palm',
      marketDemandDescription: 'Continuous demand for tender water nuts and mature milling copra'
    },
    availableMarkets: [
      {
        id: 'market_coconut_yard',
        name: 'Coastal Copra Merchants Union',
        type: 'wholesaler',
        location: 'Market Road Cross',
        distanceKm: 11,
        offeredPricePerKg: 38,
        priceTrend: 'stable',
        trendText: '₹38/pc (Graded size A)',
        buyerStatus: 'Open Today',
        rating: 4.7,
        transportRatePerKmKg: 0.12,
        fixedMarketFeePercent: 1.0,
        typicalHandlingFee: 350,
        phoneContact: '+91 97400 22331'
      }
    ]
  },
  {
    id: 'banana',
    nameKey: 'banana',
    emoji: '🍌',
    currentAvgPrice: 22,
    previousAvgPrice: 20,
    unit: 'kg',
    trend: 'up',
    supplyLevel: 'Moderate',
    seasonStatus: 'Harvest Period',
    historicalPrices: [
      { date: 'Week 1', price: 18 },
      { date: 'Week 2', price: 19 },
      { date: 'Week 3', price: 20 },
      { date: 'Current', price: 22 }
    ],
    sellingInsight: {
      action: 'Sell Now',
      actionKey: 'sellNow',
      explanation: 'Festival season has spiked demand for Yelakki and Robusta bunches. Transport immediately to avoid shelf-life weight loss.',
      explanationKey: 'bananaInsight'
    },
    seasonInfo: {
      plantingMonths: [2, 3, 7, 8],
      growingMonths: [3, 4, 5, 6, 8, 9, 10],
      harvestMonths: [1, 2, 9, 10, 11, 12],
      highDemandMonths: [8, 9, 10],
      bestGrowingPeriod: 'February – November with high moisture and sunlight',
      typicalHarvestPeriod: '10 – 12 months after sucker planting',
      marketDemandDescription: 'Spikes strongly during regional festival calendar'
    },
    availableMarkets: [
      {
        id: 'market_banana_mandi',
        name: 'Fruit Commission Yard #7',
        type: 'mandi',
        location: 'Fruit Market Complex',
        distanceKm: 16,
        offeredPricePerKg: 22,
        priceTrend: 'up',
        trendText: '₹22/kg (Bunch rate)',
        buyerStatus: 'High Demand',
        rating: 4.8,
        transportRatePerKmKg: 0.16,
        fixedMarketFeePercent: 1.5,
        typicalHandlingFee: 400,
        phoneContact: '+91 98860 44556'
      }
    ]
  },
  {
    id: 'carrot',
    nameKey: 'carrot',
    emoji: '🥕',
    currentAvgPrice: 35,
    previousAvgPrice: 38,
    unit: 'kg',
    trend: 'down',
    supplyLevel: 'High',
    seasonStatus: 'Harvest Period',
    historicalPrices: [
      { date: 'Week 1', price: 42 },
      { date: 'Week 2', price: 40 },
      { date: 'Week 3', price: 38 },
      { date: 'Current', price: 35 }
    ],
    sellingInsight: {
      action: 'Sell Now',
      actionKey: 'sellNow',
      explanation: 'Heavy harvests arriving from hill stations are softening prices. Selling existing inventory quickly protects current margins.',
      explanationKey: 'carrotInsight'
    },
    seasonInfo: {
      plantingMonths: [7, 8, 10, 11],
      growingMonths: [8, 9, 11, 12],
      harvestMonths: [10, 11, 1, 2],
      highDemandMonths: [11, 12, 1],
      bestGrowingPeriod: 'Cool months with friable loose soil',
      typicalHarvestPeriod: '75 – 90 days',
      marketDemandDescription: 'Peak winter vegetable salads and sweet dish season'
    },
    availableMarkets: [
      {
        id: 'market_carrot_hub',
        name: 'Fresh Veggies Cool Hub',
        type: 'direct_buyer',
        location: 'Highway Logistics Park',
        distanceKm: 12,
        offeredPricePerKg: 35,
        priceTrend: 'down',
        trendText: '₹35/kg (Washed & graded)',
        buyerStatus: 'Open Today',
        rating: 4.5,
        transportRatePerKmKg: 0.15,
        fixedMarketFeePercent: 1.0,
        typicalHandlingFee: 450,
        phoneContact: '+91 97410 99887'
      }
    ]
  },
  {
    id: 'potato',
    nameKey: 'potato',
    emoji: '🥔',
    currentAvgPrice: 20,
    previousAvgPrice: 19,
    unit: 'kg',
    trend: 'stable',
    supplyLevel: 'Moderate',
    seasonStatus: 'Growing',
    historicalPrices: [
      { date: 'Week 1', price: 18 },
      { date: 'Week 2', price: 19 },
      { date: 'Week 3', price: 19 },
      { date: 'Current', price: 20 }
    ],
    sellingInsight: {
      action: 'Monitor prices',
      actionKey: 'monitorPrices',
      explanation: 'Prices are holding steady with cold storage arrivals. Compare buyers for lowest sorting deductions.',
      explanationKey: 'potatoInsight'
    },
    seasonInfo: {
      plantingMonths: [10, 11],
      growingMonths: [11, 12, 1],
      harvestMonths: [1, 2, 3],
      highDemandMonths: [5, 6, 7],
      bestGrowingPeriod: 'October – January winter period',
      typicalHarvestPeriod: '90 – 110 days',
      marketDemandDescription: 'High year-round staple with processing demand for chips'
    },
    availableMarkets: [
      {
        id: 'market_potato_apmc',
        name: 'Tuber & Onion APMC Gate 1',
        type: 'mandi',
        location: 'Ring Road Mandi',
        distanceKm: 20,
        offeredPricePerKg: 20,
        priceTrend: 'stable',
        trendText: '₹20/kg (Clean bags)',
        buyerStatus: 'Open Today',
        rating: 4.6,
        transportRatePerKmKg: 0.15,
        fixedMarketFeePercent: 1.2,
        typicalHandlingFee: 400,
        phoneContact: '+91 98451 22334'
      }
    ]
  },
  {
    id: 'chilli',
    nameKey: 'chilli',
    emoji: '🌶️',
    currentAvgPrice: 55,
    previousAvgPrice: 48,
    unit: 'kg',
    trend: 'up',
    supplyLevel: 'Low',
    seasonStatus: 'Peak Demand',
    historicalPrices: [
      { date: 'Week 1', price: 42 },
      { date: 'Week 2', price: 45 },
      { date: 'Week 3', price: 48 },
      { date: 'Current', price: 55 }
    ],
    sellingInsight: {
      action: 'Sell Now',
      actionKey: 'sellNow',
      explanation: 'Recent regional rains curtailed spot market supplies. Spot prices are at a 6-week high of ₹55/kg. Excellent selling window!',
      explanationKey: 'chilliInsight'
    },
    seasonInfo: {
      plantingMonths: [6, 7, 9, 10],
      growingMonths: [7, 8, 10, 11],
      harvestMonths: [8, 9, 10, 12, 1],
      highDemandMonths: [9, 10, 11],
      bestGrowingPeriod: 'Warm sub-humid seasons with well-drained soil',
      typicalHarvestPeriod: 'Multiple pickings every 12–15 days',
      marketDemandDescription: 'Spicy culinary staple with intense weekly demand'
    },
    availableMarkets: [
      {
        id: 'market_chilli_special',
        name: 'Specialty Spice & Green Chilli Mandi',
        type: 'mandi',
        location: 'Spice Board Yard',
        distanceKm: 15,
        offeredPricePerKg: 55,
        priceTrend: 'up',
        trendText: '₹55/kg (High demand)',
        buyerStatus: 'High Demand',
        rating: 4.9,
        transportRatePerKmKg: 0.18,
        fixedMarketFeePercent: 1.5,
        typicalHandlingFee: 450,
        phoneContact: '+91 94455 11998'
      }
    ]
  }
];

export const DEFAULT_FARMER_CROPS: FarmerCrop[] = [
  {
    id: 'fc_tomato',
    cropId: 'tomato',
    name: 'Tomato (Hybrid Shivam)',
    emoji: '🍅',
    quantityKg: 500,
    plantingDate: '15 July 2026',
    expectedHarvest: 'Ready Now (Harvest Season)',
    status: 'Ready to Harvest'
  },
  {
    id: 'fc_onion',
    cropId: 'onion',
    name: 'Onion (Nashik Red)',
    emoji: '🧅',
    quantityKg: 300,
    plantingDate: '01 August 2026',
    expectedHarvest: 'Mid October 2026',
    status: 'Growing'
  },
  {
    id: 'fc_paddy',
    cropId: 'paddy',
    name: 'Paddy (Sona Masoori)',
    emoji: '🌾',
    quantityKg: 1200,
    plantingDate: '10 June 2026',
    expectedHarvest: 'Late September 2026',
    status: 'Growing'
  }
];

export const DEFAULT_SALES_HISTORY: SaleRecord[] = [
  {
    id: 'sale_sep_1',
    cropId: 'tomato',
    cropName: 'Tomato',
    emoji: '🍅',
    quantityKg: 500,
    pricePerKg: 32,
    grossRevenue: 16000,
    transportCost: 1500,
    otherExpenses: 500,
    netReturn: 14000,
    marketName: 'Mandi Yard Sector 4 (Market B)',
    marketLocation: 'Taluk APMC Mandi',
    date: '12 Sep 2026',
    month: 'September 2026',
    notes: 'Sold at peak morning auction'
  },
  {
    id: 'sale_sep_2',
    cropId: 'onion',
    cropName: 'Onion',
    emoji: '🧅',
    quantityKg: 300,
    pricePerKg: 25,
    grossRevenue: 7500,
    transportCost: 800,
    otherExpenses: 400,
    netReturn: 6300,
    marketName: 'Local Kisan Bazaar (Market A)',
    marketLocation: 'Village Center Hub',
    date: '18 Sep 2026',
    month: 'September 2026',
    notes: 'Quick direct sale to local retailer'
  },
  {
    id: 'sale_sep_3',
    cropId: 'tomato',
    cropName: 'Tomato',
    emoji: '🍅',
    quantityKg: 450,
    pricePerKg: 30,
    grossRevenue: 13500,
    transportCost: 1200,
    otherExpenses: 500,
    netReturn: 11800,
    marketName: 'AgriFPO Processing Depot',
    marketLocation: 'Cooperative Cold Storage',
    date: '05 Sep 2026',
    month: 'September 2026',
    notes: 'Direct FPO purchase with instant UPI'
  },
  {
    id: 'sale_sep_4',
    cropId: 'chilli',
    cropName: 'Green Chilli',
    emoji: '🌶️',
    quantityKg: 200,
    pricePerKg: 57.5,
    grossRevenue: 11500,
    transportCost: 900,
    otherExpenses: 300,
    netReturn: 10300,
    marketName: 'Specialty Spice Mandi',
    marketLocation: 'Spice Board Yard',
    date: '15 Sep 2026',
    month: 'September 2026',
    notes: 'Premium graded first harvest'
  },
  // August sales for month-to-month comparison
  {
    id: 'sale_aug_1',
    cropId: 'tomato',
    cropName: 'Tomato',
    emoji: '🍅',
    quantityKg: 600,
    pricePerKg: 25,
    grossRevenue: 15000,
    transportCost: 1400,
    otherExpenses: 600,
    netReturn: 13000,
    marketName: 'Mandi Yard Sector 4',
    marketLocation: 'Taluk APMC Mandi',
    date: '14 Aug 2026',
    month: 'August 2026'
  },
  {
    id: 'sale_aug_2',
    cropId: 'coconut',
    cropName: 'Coconut',
    emoji: '🥥',
    quantityKg: 400,
    pricePerKg: 35,
    grossRevenue: 14000,
    transportCost: 1100,
    otherExpenses: 400,
    netReturn: 12500,
    marketName: 'Coastal Copra Merchants Union',
    marketLocation: 'Market Road Cross',
    date: '22 Aug 2026',
    month: 'August 2026'
  },
  {
    id: 'sale_aug_3',
    cropId: 'banana',
    cropName: 'Banana',
    emoji: '🍌',
    quantityKg: 600,
    pricePerKg: 20,
    grossRevenue: 12000,
    transportCost: 900,
    otherExpenses: 400,
    netReturn: 10700,
    marketName: 'Fruit Commission Yard #7',
    marketLocation: 'Fruit Market Complex',
    date: '28 Aug 2026',
    month: 'August 2026'
  }
];

export const DEFAULT_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    titleKey: 'notifPriceIncreaseTitle',
    descKey: 'notifPriceIncreaseDesc',
    defaultTitle: 'Tomato price increased in Market B to ₹32/kg',
    defaultDesc: 'Buyers are active today with high demand for red ripe tomatoes.',
    timeAgo: '15 mins ago',
    isRead: false,
    type: 'price_alert',
    targetTab: 'sell',
    cropId: 'tomato'
  },
  {
    id: 'notif_2',
    titleKey: 'notifHarvestReminderTitle',
    descKey: 'notifHarvestReminderDesc',
    defaultTitle: 'Your tomato crop is approaching its expected harvest period',
    defaultDesc: '500 kg estimated yield is ready for picking before weekend rains.',
    timeAgo: '2 hours ago',
    isRead: false,
    type: 'harvest_reminder',
    targetTab: 'crops',
    cropId: 'tomato'
  },
  {
    id: 'notif_3',
    titleKey: 'notifMonthlyReportTitle',
    descKey: 'notifMonthlyReportDesc',
    defaultTitle: 'Your September monthly earnings report is ready',
    defaultDesc: 'Net Return: ₹38,000 on ₹48,500 total sales. Tap to view breakdown.',
    timeAgo: 'Yesterday',
    isRead: false,
    type: 'monthly_report',
    targetTab: 'earnings'
  },
  {
    id: 'notif_4',
    titleKey: 'notifBuyerOfferTitle',
    descKey: 'notifBuyerOfferDesc',
    defaultTitle: 'A nearby buyer has offered a higher price for Onion',
    defaultDesc: 'Sri Krishna Agro Traders offering ₹25/kg with spot cash pickup.',
    timeAgo: '2 days ago',
    isRead: true,
    type: 'price_alert',
    targetTab: 'sell',
    cropId: 'onion'
  },
  {
    id: 'notif_5',
    titleKey: 'notifTransportWarningTitle',
    descKey: 'notifTransportWarningDesc',
    defaultTitle: 'Transport cost may reduce your estimated return',
    defaultDesc: 'Metro City Wholesalers has higher price (₹35) but ₹3,800 transport lowers profit!',
    timeAgo: '3 days ago',
    isRead: true,
    type: 'cost_warning',
    targetTab: 'sell',
    cropId: 'tomato'
  }
];

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];
