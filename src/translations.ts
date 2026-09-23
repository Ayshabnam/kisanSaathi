import { Language } from './types';

export interface TranslationStrings {
  appName: string;
  appTagline: string;
  onboardingTitle: string;
  onboardingDesc: string;
  getStarted: string;
  skip: string;
  selectLanguage: string;
  listening: string;
  speakPrompt: string;
  speechNotSupported: string;
  
  // Navigation
  navHome: string;
  navCompare: string;
  navForecast: string;
  navHistory: string;
  navProfile: string;

  // Price Prediction & Forecast
  forecastTitle: string;
  forecastSubtitle: string;
  verdictRise: string;
  verdictFall: string;
  verdictStable: string;
  sellNow: string;
  waitAndHold: string;
  forecastDisclaimer: string;
  forecastConfidence: string;
  gainProjected: string;
  lossRisk: string;
  marketDriver: string;
  viewForecast: string;
  forecast14DayTitle: string;

  // Step 1: Crop
  step1Title: string;
  step1Subtitle: string;
  allCrops: string;
  searchCrops: string;
  vegetables: string;
  grains: string;
  cashCrops: string;
  pulses: string;

  // Step 2: Quantity
  step2Title: string;
  step2Subtitle: string;
  quantityInKg: string;
  quintalsHint: string;

  // Step 3: Location
  step3Title: string;
  step3Subtitle: string;
  currentLocation: string;
  autoDetectLocation: string;
  detectingLocation: string;
  locationDetected: string;
  orSelectDistrict: string;
  comparePricesBtn: string;

  // Price Comparison Results
  resultsTitle: string;
  resultsSubtitle: string;
  bestValue: string;
  recommended: string;
  highestNetReturn: string;
  highestPrice: string;
  nearestLocation: string;
  sortBy: string;
  marketsFound: string;
  offeredPrice: string;
  distance: string;
  transportCost: string;
  commissionFee: string;
  netReturn: string;
  netReturnHelp: string;
  viewBreakdown: string;
  hideBreakdown: string;
  callBuyer: string;
  recordSale: string;
  saleRecorded: string;

  // Comparison Detail
  breakdownTitle: string;
  grossRevenue: string;
  totalDeductions: string;
  takeHomeProfit: string;
  whyThisOption: string;
  highestPriceWarning: string;

  // Home View
  todayOverview: string;
  quickCompare: string;
  popularCrops: string;
  recentTrends: string;
  smartAdvice: string;
  voiceActionPrompt: string;
  tapToSpeak: string;

  // History View
  salesHistory: string;
  historySubtitle: string;
  totalEarnings: string;
  totalSoldProduce: string;
  avgNetPerKg: string;
  noSalesYet: string;
  viewReceipt: string;
  date: string;
  market: string;

  // Profile View
  farmerProfile: string;
  editProfile: string;
  saveChanges: string;
  farmerName: string;
  farmLocation: string;
  farmSize: string;
  primaryCropsGrown: string;
  kisanHelpline: string;
  callTollFree: string;

  // Crops Names
  cropTomato: string;
  cropOnion: string;
  cropWheat: string;
  cropRice: string;
  cropCotton: string;
  cropSugarcane: string;
  cropPotato: string;
  cropSoybean: string;
  cropMango: string;
  cropChilli: string;
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    appName: "VayalWay",
    appTagline: "Know your real take-home profit before selling",
    onboardingTitle: "Welcome to VayalWay",
    onboardingDesc: "Compare nearby mandis and buyers to maximize your net return in hand — after deducting transport and commission fees.",
    getStarted: "Start Comparing Prices",
    skip: "Skip",
    selectLanguage: "Choose Language",
    listening: "Listening... speak now",
    speakPrompt: "Say crop name, quantity (e.g., '500 kg tomato'), or your village",
    speechNotSupported: "Voice input not supported in this browser.",

    navHome: "Home",
    navCompare: "Compare Prices",
    navForecast: "Price Forecast",
    navHistory: "History",
    navProfile: "Profile",

    forecastTitle: "Price Forecast & Trends",
    forecastSubtitle: "Projected mandi rates for next 14 days — decide whether to sell today or hold",
    verdictRise: "Price likely to RISE",
    verdictFall: "Price likely to FALL",
    verdictStable: "Price is STABLE",
    sellNow: "Sell Now",
    waitAndHold: "Wait & Hold",
    forecastDisclaimer: "Forecast based on historical patterns — for guidance only.",
    forecastConfidence: "Trend Confidence",
    gainProjected: "Estimated Gain by Waiting",
    lossRisk: "Estimated Loss Risk if Delayed",
    marketDriver: "Market Driver & Reasoning",
    viewForecast: "View 14-Day Price Forecast",
    forecast14DayTitle: "14-Day Rate Projection",

    step1Title: "Select Your Crop",
    step1Subtitle: "Choose the crop you want to sell today",
    allCrops: "All Crops",
    searchCrops: "Search crops...",
    vegetables: "Vegetables",
    grains: "Grains",
    cashCrops: "Cash Crops",
    pulses: "Pulses",

    step2Title: "Enter Quantity",
    step2Subtitle: "How much produce do you have ready?",
    quantityInKg: "Quantity in kg",
    quintalsHint: "quintals",

    step3Title: "Your Location",
    step3Subtitle: "To calculate accurate transport distance",
    currentLocation: "Your Village / Mandi Center",
    autoDetectLocation: "Auto-detect GPS Location",
    detectingLocation: "Finding your location...",
    locationDetected: "Location detected successfully!",
    orSelectDistrict: "Or choose nearby center",
    comparePricesBtn: "Find Best Market & Net Return",

    resultsTitle: "Market Price Comparison",
    resultsSubtitle: "Sorted by your actual Take-Home Net Return",
    bestValue: "Best Value",
    recommended: "Recommended",
    highestNetReturn: "Highest Net Return",
    highestPrice: "Highest Price",
    nearestLocation: "Nearest Distance",
    sortBy: "Sort By",
    marketsFound: "buyers & mandis found",
    offeredPrice: "Offered Price",
    distance: "Distance",
    transportCost: "Transport Cost",
    commissionFee: "Commission & Fee",
    netReturn: "Net Return in Hand",
    netReturnHelp: "Gross Sales − (Transport + Mandi Fees)",
    viewBreakdown: "View Breakdown",
    hideBreakdown: "Hide Breakdown",
    callBuyer: "Call Buyer",
    recordSale: "Record Sale",
    saleRecorded: "Sale recorded successfully!",

    breakdownTitle: "Financial Return Breakdown",
    grossRevenue: "Gross Selling Price",
    totalDeductions: "Total Deductions",
    takeHomeProfit: "Final Net Return in Hand",
    whyThisOption: "Why this is your best option",
    highestPriceWarning: "Notice: The highest price per kg does not always give the highest profit in hand due to longer transport distances!",

    todayOverview: "Today's Mandi Pulse",
    quickCompare: "Quick Price Check",
    popularCrops: "Popular Crops Today",
    recentTrends: "Price Trends",
    smartAdvice: "Kisan Smart Advice",
    voiceActionPrompt: "Tap mic to speak your crop & quantity",
    tapToSpeak: "Tap to Speak",

    salesHistory: "Your Sales History",
    historySubtitle: "Track past transactions and your net profit",
    totalEarnings: "Total Net Profit",
    totalSoldProduce: "Total Produce Sold",
    avgNetPerKg: "Avg Net Return",
    noSalesYet: "No sales recorded yet. Use 'Record Sale' after comparing prices!",
    viewReceipt: "View Receipt",
    date: "Date",
    market: "Market",

    farmerProfile: "Farmer Profile",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    farmerName: "Farmer Name",
    farmLocation: "Farm Location",
    farmSize: "Farm Size",
    primaryCropsGrown: "Primary Crops",
    kisanHelpline: "Kisan Call Center (Government Helpline)",
    callTollFree: "Toll-Free 1800-180-1551",

    cropTomato: "Tomato",
    cropOnion: "Onion",
    cropWheat: "Wheat",
    cropRice: "Rice (Paddy)",
    cropCotton: "Cotton",
    cropSugarcane: "Sugarcane",
    cropPotato: "Potato",
    cropSoybean: "Soybean",
    cropMango: "Mango",
    cropChilli: "Green Chilli"
  },

  hi: {
    appName: "वायलवे (VayalWay)",
    appTagline: "बेचने से पहले जानें हाथ में आने वाला असली मुनाफा",
    onboardingTitle: "वायलवे (VayalWay) में आपका स्वागत है",
    onboardingDesc: "किराया और मंडी कमीशन काटकर हाथ में मिलने वाले शुद्ध मुनाफे (Net Return) के आधार पर मंडियों की तुलना करें।",
    getStarted: "भाव तुलना शुरू करें",
    skip: "छोड़ें",
    selectLanguage: "भाषा चुनें",
    listening: "सुन रहे हैं... अब बोलें",
    speakPrompt: "फसल का नाम और मात्रा बोलें (जैसे: '500 किलो टमाटर')",
    speechNotSupported: "इस ब्राउज़र में आवाज़ इनपुट समर्थित नहीं है।",

    navHome: "होम",
    navCompare: "भाव तुलना",
    navForecast: "भाव अंदाज (पूर्वानुमान)",
    navHistory: "इतिहास",
    navProfile: "प्रोफ़ाइल",

    forecastTitle: "भाव अंदाज व भविष्यवाणियां",
    forecastSubtitle: "आगामी 14 दिनों का संभावित मंडी भाव — जानें आज बेचें या रुकें",
    verdictRise: "भाव बढ़ने की संभावना है",
    verdictFall: "भाव गिरने की संभावना है",
    verdictStable: "भाव स्थिर रहेगा",
    sellNow: "आज ही बेचें",
    waitAndHold: "कुछ दिन रुकें (होल्ड करें)",
    forecastDisclaimer: "यह पूर्वानुमान ऐतिहासिक पैटर्न पर आधारित है — केवल मार्गदर्शन के लिए।",
    forecastConfidence: "अनुमान सटीकता",
    gainProjected: "रुकने पर संभावित अतिरिक्त मुनाफा",
    lossRisk: "देरी करने पर संभावित नुकसान",
    marketDriver: "मंडी की स्थिति व कारण",
    viewForecast: "14 दिनों का भाव अंदाज देखें",
    forecast14DayTitle: "14 दिनों का अनुमानित चार्ट",

    step1Title: "अपनी फसल चुनें",
    step1Subtitle: "आज आप कौन सी फसल बेचना चाहते हैं?",
    allCrops: "सभी फसलें",
    searchCrops: "फसल खोजें...",
    vegetables: "सब्जियां",
    grains: "अनाज",
    cashCrops: "नकदी फसलें",
    pulses: "दालें",

    step2Title: "मात्रा दर्ज करें",
    step2Subtitle: "आपके पास कितना माल तैयार है?",
    quantityInKg: "किलोग्राम में मात्रा",
    quintalsHint: "क्विंटल",

    step3Title: "आपका स्थान / गांव",
    step3Subtitle: "सटीक परिवहन किराया मापने के लिए",
    currentLocation: "आपका गांव या नजदीकी मंडी",
    autoDetectLocation: "जीपीएस से स्थान पता करें",
    detectingLocation: "स्थान खोजा जा रहा है...",
    locationDetected: "स्थान सफलतापूर्वक मिल गया!",
    orSelectDistrict: "या नजदीकी केंद्र चुनें",
    comparePricesBtn: "सर्वोत्तम मंडी और शुद्ध मुनाफा देखें",

    resultsTitle: "मंडी भाव तुलना",
    resultsSubtitle: "हाथ में मिलने वाले शुद्ध मुनाफे के आधार पर क्रमबद्ध",
    bestValue: "सर्वोत्तम लाभ",
    recommended: "अनुशंसित",
    highestNetReturn: "अधिकतम शुद्ध मुनाफा",
    highestPrice: "उच्चतम कच्चा भाव",
    nearestLocation: "सबसे नजदीकी दूरी",
    sortBy: "क्रमबद्ध करें",
    marketsFound: "खरीदार व मंडियां उपलब्ध",
    offeredPrice: "प्रस्तावित भाव",
    distance: "दूरी",
    transportCost: "परिवहन खर्च (किराया)",
    commissionFee: "कमीशन व पल्लेदारी",
    netReturn: "हाथ में शुद्ध मुनाफा",
    netReturnHelp: "कुल बिक्री − (किराया + कमीशन)",
    viewBreakdown: "खर्चों का पूरा विवरण देखें",
    hideBreakdown: "विवरण छिपाएं",
    callBuyer: "खरीदार को फोन करें",
    recordSale: "बिक्री दर्ज करें",
    saleRecorded: "बिक्री सफलतापूर्वक दर्ज हो गई!",

    breakdownTitle: "कमाई और खर्च का ब्योरा",
    grossRevenue: "कुल बिक्री राशि",
    totalDeductions: "कुल कटौतियां (किराया+कमीशन)",
    takeHomeProfit: "घर ले जाने वाला शुद्ध लाभ",
    whyThisOption: "यह विकल्प आपके लिए सबसे बेहतर क्यों है",
    highestPriceWarning: "ध्यान दें: सबसे ज्यादा भाव वाली दूर की मंडी में किराया अधिक कटने से हाथ में कम पैसा बचता है!",

    todayOverview: "आज का मंडी समाचार",
    quickCompare: "त्वरित भाव जांच",
    popularCrops: "आज की प्रमुख फसलें",
    recentTrends: "भाव के रुझान",
    smartAdvice: "किसान स्मार्ट सलाह",
    voiceActionPrompt: "माइक दबाकर फसल और मात्रा बोलें",
    tapToSpeak: "बोलने के लिए दबाएं",

    salesHistory: "आपकी बिक्री का इतिहास",
    historySubtitle: "पुरानी बिक्रियों और मुनाफे का रिकॉर्ड",
    totalEarnings: "कुल शुद्ध मुनाफा",
    totalSoldProduce: "कुल बेची गई फसल",
    avgNetPerKg: "औसत प्रति किलो मुनाफा",
    noSalesYet: "अभी तक कोई बिक्री दर्ज नहीं हुई है। तुलना के बाद 'बिक्री दर्ज करें' दबाएं!",
    viewReceipt: "रसीद देखें",
    date: "दिनांक",
    market: "मंडी",

    farmerProfile: "किसान प्रोफ़ाइल",
    editProfile: "प्रोफ़ाइल बदलें",
    saveChanges: "बदलाव सहेजें",
    farmerName: "किसान का नाम",
    farmLocation: "खेत का स्थान",
    farmSize: "खेत का आकार",
    primaryCropsGrown: "मुख्य फसलें",
    kisanHelpline: "किसान कॉल सेंटर (सरकारी हेल्पलाइन)",
    callTollFree: "टोल-फ्री 1800-180-1551",

    cropTomato: "टमाटर",
    cropOnion: "प्याज",
    cropWheat: "गेहूं",
    cropRice: "धान (चावल)",
    cropCotton: "कपास",
    cropSugarcane: "गन्ना",
    cropPotato: "आलू",
    cropSoybean: "सोयाबीन",
    cropMango: "आम",
    cropChilli: "हरी मिर्च"
  },

  ta: {
    appName: "வயல்வே (VayalWay)",
    appTagline: "விற்பனைக்கு முன் கைக்கு வரும் நிகர லாபத்தை அறியுங்கள்",
    onboardingTitle: "வயல்வே (VayalWay)-க்கு நல்வரவு",
    onboardingDesc: "போக்குவரத்து மற்றும் கமிஷன் செலவுகளை கழித்து கைக்கு வரும் நிகர லாபத்தின் அடிப்படையில் சந்தைகளை ஒப்பிடுங்கள்.",
    getStarted: "விலை ஒப்பிடத் தொடங்குங்கள்",
    skip: "தவிர்",
    selectLanguage: "மொழியைத் தேர்ந்தெடுக்கவும்",
    listening: "கேட்கிறது... இப்போது பேசுங்கள்",
    speakPrompt: "பயிரின் பெயர் மற்றும் அளவைக் கூறவும் (எ.கா: '500 கிலோ தக்காளி')",
    speechNotSupported: "இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை.",

    navHome: "முகப்பு",
    navCompare: "விலை ஒப்பீடு",
    navForecast: "விலை கணிப்பு",
    navHistory: "வரலாறு",
    navProfile: "சுயவிவரம்",

    forecastTitle: "விலை கணிப்பு & போக்குகள்",
    forecastSubtitle: "அடுத்த 14 நாட்களுக்கான சந்தை விலை முன்னறிவிப்பு — இன்றே விற்கலாமா அல்லது காத்திருக்கலாமா?",
    verdictRise: "விலை உயர வாய்ப்புள்ளது",
    verdictFall: "விலை குறைய வாய்ப்புள்ளது",
    verdictStable: "விலை நிலையாக இருக்கும்",
    sellNow: "இன்றே விற்கவும்",
    waitAndHold: "காத்திருந்து விற்கவும்",
    forecastDisclaimer: "முந்தைய விலை போக்குகளின் அடிப்படையில் கணிக்கப்பட்டது — வழிகாட்டுதலுக்கு மட்டுமே.",
    forecastConfidence: "கணிப்பு துல்லியம்",
    gainProjected: "காத்திருந்தால் கூடுதல் லாபம்",
    lossRisk: "தாமதித்தால் ஏற்படும் இழப்பு அபாயம்",
    marketDriver: "சந்தை நிலவரக் காரணம்",
    viewForecast: "14 நாள் விலை கணிப்பைப் பார்க்கவும்",
    forecast14DayTitle: "14 நாள் விலை எதிர்பார்ப்பு",

    step1Title: "உங்கள் பயிரைத் தேர்ந்தெடுக்கவும்",
    step1Subtitle: "இன்று நீங்கள் விற்க விரும்பும் பயிரைத் தேர்ந்தெடுக்கவும்",
    allCrops: "அனைத்து பயிர்கள்",
    searchCrops: "பயிர்களைத் தேடுங்கள்...",
    vegetables: "காய்கறிகள்",
    grains: "தானியங்கள்",
    cashCrops: "பணப்பயிர்கள்",
    pulses: "பருப்பு வகைகள்",

    step2Title: "அளவை உள்ளிடவும்",
    step2Subtitle: "விற்பனைக்கு உங்களிடம் எவ்வளவு விளைச்சல் உள்ளது?",
    quantityInKg: "கிலோவில் அளவு",
    quintalsHint: "குவிண்டால்",

    step3Title: "உங்கள் இருப்பிடம்",
    step3Subtitle: "துல்லியமான போக்குவரத்து செலவைக் கணக்கிட",
    currentLocation: "உங்கள் கிராமம் / சந்தை மையம்",
    autoDetectLocation: "ஜிபிஎஸ் மூலம் இருப்பிடத்தை அறியவும்",
    detectingLocation: "இருப்பிடம் கண்டறியப்படுகிறது...",
    locationDetected: "இருப்பிடம் வெற்றிகரமாக கண்டறியப்பட்டது!",
    orSelectDistrict: "அல்லது அருகிலுள்ள மையத்தைத் தேர்ந்தெடுக்கவும்",
    comparePricesBtn: "சிறந்த சந்தை மற்றும் நிகர லாபத்தைக் காண்க",

    resultsTitle: "சந்தை விலை ஒப்பீடு",
    resultsSubtitle: "கைக்கு வரும் நிகர லாபத்தின் அடிப்படையில் வரிசைப்படுத்தப்பட்டது",
    bestValue: "சிறந்த மதிப்பு",
    recommended: "பரிந்துரைக்கப்பட்டது",
    highestNetReturn: "அதிகபட்ச நிகர லாபம்",
    highestPrice: "அதிகபட்ச விலை",
    nearestLocation: "அருகிலுள்ள சந்தை",
    sortBy: "வரிசைப்படுத்து",
    marketsFound: "சந்தைகள் மற்றும் வாங்குபவர்கள்",
    offeredPrice: "வழங்கப்பட்ட விலை",
    distance: "தூரம்",
    transportCost: "போக்குவரத்து செலவு",
    commissionFee: "கமிஷன் மற்றும் கூலி",
    netReturn: "கைக்கு வரும் நிகர லாபம்",
    netReturnHelp: "மொத்த விற்பனை − (போக்குவரத்து + கமிஷன்)",
    viewBreakdown: "முழு விவரத்தைக் காண்க",
    hideBreakdown: "விவரத்தை மறை",
    callBuyer: "வியாபாரிக்கு அழைக்கவும்",
    recordSale: "விற்பனையை பதிவு செய்",
    saleRecorded: "விற்பனை வெற்றிகரமாகப் பதிவு செய்யப்பட்டது!",

    breakdownTitle: "வருவாய் மற்றும் செலவு விவரம்",
    grossRevenue: "மொத்த விற்பனை தொகை",
    totalDeductions: "மொத்த கழிவுகள் (போக்குவரத்து+கமிஷன்)",
    takeHomeProfit: "கைக்கு வரும் இறுதி நிகர லாபம்",
    whyThisOption: "இது ஏன் உங்கள் சிறந்த தேர்வு?",
    highestPriceWarning: "கவனிக்க: அதிக விலை தரும் தொலைதூர சந்தையில் போக்குவரத்து செலவு அதிகமாகி கைக்கு வரும் லாபம் குறையலாம்!",

    todayOverview: "இன்றைய சந்தை நிலவரம்",
    quickCompare: "விரைவு விலை சரிபார்ப்பு",
    popularCrops: "இன்றைய முக்கிய பயிர்கள்",
    recentTrends: "விலை போக்குகள்",
    smartAdvice: "விவசாயிக்கு ஸ்மார்ட் ஆலோசனை",
    voiceActionPrompt: "பயிர் மற்றும் அளவை பேச மைக்கை அழுத்தவும்",
    tapToSpeak: "பேச அழுத்தவும்",

    salesHistory: "உங்கள் விற்பனை வரலாறு",
    historySubtitle: "முந்தைய விற்பனைகள் மற்றும் நிகர லாபப் பதிவு",
    totalEarnings: "மொத்த நிகர லாபம்",
    totalSoldProduce: "விற்கப்பட்ட மொத்த விளைச்சல்",
    avgNetPerKg: "சராசரி கிலோ லாபம்",
    noSalesYet: "இன்னும் விற்பனை எதுவும் பதிவு செய்யப்படவில்லை.",
    viewReceipt: "ரசீதை காண்க",
    date: "தேதி",
    market: "சந்தை",

    farmerProfile: "விவசாயி சுயவிவரம்",
    editProfile: "விவரங்களை மாற்ற",
    saveChanges: "சேமிக்கவும்",
    farmerName: "விவசாயி பெயர்",
    farmLocation: "பண்ணை இடம்",
    farmSize: "நிலப்பரப்பு",
    primaryCropsGrown: "முக்கிய பயிர்கள்",
    kisanHelpline: "விவசாயிகள் உதவி மையம் (அரசு இலவச எண்)",
    callTollFree: "இலவச எண் 1800-180-1551",

    cropTomato: "தக்காளி",
    cropOnion: "வெங்காயம்",
    cropWheat: "கோதுமை",
    cropRice: "நெல்",
    cropCotton: "பருத்தி",
    cropSugarcane: "கரும்பு",
    cropPotato: "உருளைக்கிழங்கு",
    cropSoybean: "சோயாபீன்",
    cropMango: "மாம்பழம்",
    cropChilli: "பச்சை மிளகாய்"
  },

  te: {
    appName: "వయల్ వే (VayalWay)",
    appTagline: "అమ్మేముందు చేతికి వచ్చే నికర లాభాన్ని తెలుసుకోండి",
    onboardingTitle: "వయల్ వే (VayalWay) కు స్వాగతం",
    onboardingDesc: "రవాణా మరియు కమీషన్ ఖర్చులు పోను చేతికి వచ్చే నికర లాభం (Net Return) ఆధారంగా మార్కెట్లను పోల్చండి.",
    getStarted: "ధరల పోలిక ప్రారంభించండి",
    skip: "దాటవేయి",
    selectLanguage: "భాషను ఎంచుకోండి",
    listening: "వింటున్నాము... ఇప్పుడు మాట్లాడండి",
    speakPrompt: "పంట పేరు మరియు పరిమాణం చెప్పండి (ఉదా: '500 కిలోల టమోటా')",
    speechNotSupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ సపోర్ట్ చేయదు.",

    navHome: "హోమ్",
    navCompare: "ధరల పోలిక",
    navForecast: "ధర అంచనా",
    navHistory: "చరిత్ర",
    navProfile: "ప్రొఫైల్",

    forecastTitle: "ధర అంచనా & ధోరణులు",
    forecastSubtitle: "రాబోయే 14 రోజుల మార్కెట్ ధరల అంచనా — ఈరోజే అమ్మాలా లేదా వేచి ఉండాలా?",
    verdictRise: "ధర పెరిగే అవకాశం ఉంది",
    verdictFall: "ధర తగ్గే అవకాశం ఉంది",
    verdictStable: "ధర స్థిరంగా ఉంటుంది",
    sellNow: "ఇప్పుడే అమ్మండి",
    waitAndHold: "కొన్ని రోజులు ఆగండి",
    forecastDisclaimer: "గత మార్కెట్ డేటా ఆధారంగా రూపొందించిన అంచనా — సూచన కొరకు మాత్రమే.",
    forecastConfidence: "అంచనా ఖచ్చితత్వం",
    gainProjected: "ఆగితే వచ్చే అదనపు లాభం",
    lossRisk: "ఆలస్యం చేస్తే నష్టపోయే ప్రమాదం",
    marketDriver: "మార్కెట్ కారణాలు & విశ్లేషణ",
    viewForecast: "14 రోజుల ధర అంచనా చూడండి",
    forecast14DayTitle: "14 రోజుల ధరల ప్రొజెక్షన్",

    step1Title: "మీ పంటను ఎంచుకోండి",
    step1Subtitle: "ఈరోజు మీరు ఏ పంటను అమ్మాలనుకుంటున్నారు?",
    allCrops: "అన్ని పంటలు",
    searchCrops: "పంటలను వెతకండి...",
    vegetables: "కూరగాయలు",
    grains: "ధాన్యాలు",
    cashCrops: "వాణిజ్య పంటలు",
    pulses: "పప్పుదినుసులు",

    step2Title: "పరిమాణాన్ని నమోదు చేయండి",
    step2Subtitle: "మీ వద్ద ఎంత సరుకు సిద్ధంగా ఉంది?",
    quantityInKg: "కిలోలలో పరిమాణం",
    quintalsHint: "క్వింటాళ్ళు",

    step3Title: "మీ ప్రాంతం / గ్రామం",
    step3Subtitle: "ఖచ్చితమైన రవాణా ఖర్చును లెక్కించడానికి",
    currentLocation: "మీ గ్రామం లేదా మార్కెట్ కేంద్రం",
    autoDetectLocation: "జీపీఎస్ ద్వారా స్థానాన్ని గుర్తించండి",
    detectingLocation: "స్థానాన్ని వెతుకుతున్నాం...",
    locationDetected: "స్థానం విజయవంతంగా లభించింది!",
    orSelectDistrict: "లేదా సమీప కేంద్రాన్ని ఎంచుకోండి",
    comparePricesBtn: "ఉత్తమ మార్కెట్ & నికర లాభాన్ని చూడండి",

    resultsTitle: "మార్కెట్ ధరల పోలిక",
    resultsSubtitle: "చేతికి వచ్చే నికర లాభం ఆధారంగా క్రమబద్ధీకరించబడింది",
    bestValue: "ఉత్తమ విలువ",
    recommended: "సిఫార్సు చేయబడింది",
    highestNetReturn: "అత్యధిక నికర లాభం",
    highestPrice: "అత్యధిక ధర",
    nearestLocation: "సమీప మార్కెట్",
    sortBy: "క్రమబద్ధీకరించు",
    marketsFound: "కొనుగోలుదారులు మరియు మార్కెట్లు",
    offeredPrice: "ఇచ్చిన ధర",
    distance: "దూరం",
    transportCost: "రవాణా ఖర్చు",
    commissionFee: "కమీషన్ & ఇతర రుసుములు",
    netReturn: "చేతికి వచ్చే నికర లాభం",
    netReturnHelp: "మొత్తం అమ్మకం − (రవాణా + కమీషన్ ఖర్చులు)",
    viewBreakdown: "పూర్తి వివరాలు చూడండి",
    hideBreakdown: "వివరాలు దాచు",
    callBuyer: "వ్యాపారికి కాల్ చేయండి",
    recordSale: "అమ్మకాన్ని నమోదు చేయండి",
    saleRecorded: "అమ్మకం విజయవంతంగా నమోదైంది!",

    breakdownTitle: "ఆదాయం మరియు ఖర్చుల వివరాలు",
    grossRevenue: "మొత్తం అమ్మకం మొత్తం",
    totalDeductions: "మొత్తం కోతలు (రవాణా+కమీషన్)",
    takeHomeProfit: "చేతికి వచ్చే తుది నికర లాభం",
    whyThisOption: "ఇది మీకు ఎందుకు ఉత్తమ ఎంపిక?",
    highestPriceWarning: "గమనిక: ఎక్కువ ధర ఇచ్చే సుదూర మార్కెట్‌లో రవాణా ఖర్చులు పెరిగి చేతికి తక్కువ లాభం రావచ్చు!",

    todayOverview: "నేటి మార్కెట్ విశేషాలు",
    quickCompare: "త్వరిత ధర పరిశీలన",
    popularCrops: "నేటి ప్రముఖ పంటలు",
    recentTrends: "ధరల సరళి",
    smartAdvice: "రైతుకు స్మార్ట్ సలహా",
    voiceActionPrompt: "పంట మరియు పరిమాణం చెప్పడానికి మైక్ నొక్కండి",
    tapToSpeak: "మాట్లాడటానికి నొక్కండి",

    salesHistory: "మీ అమ్మకాల చరిత్ర",
    historySubtitle: "గత అమ్మకాలు మరియు నికర లాభాల రికార్డు",
    totalEarnings: "మొత్తం నికర లాభం",
    totalSoldProduce: "అమ్మిన మొత్తం దిగుబడి",
    avgNetPerKg: "సగటు కిలో నికర లాభం",
    noSalesYet: "ఇంకా ఎటువంటి అమ్మకాలు నమోదు కాలేదు.",
    viewReceipt: "రసీదు చూడండి",
    date: "తేదీ",
    market: "మార్కెట్",

    farmerProfile: "రైతు ప్రొఫైల్",
    editProfile: "సవరించు",
    saveChanges: "మార్పులను భద్రపరుచు",
    farmerName: "రైతు పేరు",
    farmLocation: "పొలం ఉన్న ప్రదేశం",
    farmSize: "పొలం విస్తీర్ణం",
    primaryCropsGrown: "ప్రధాన పంటలు",
    kisanHelpline: "కిసాన్ కాల్ సెంటర్ (ప్రభుత్వ ఉచిత హెల్ప్‌లైన్)",
    callTollFree: "టోల్-ఫ్రీ 1800-180-1551",

    cropTomato: "టమోటా",
    cropOnion: "ఉల్లిపాయ",
    cropWheat: "గోధుమలు",
    cropRice: "వరి (ధాన్యం)",
    cropCotton: "పత్తి",
    cropSugarcane: "చెరకు",
    cropPotato: "బంగాళాదుంప",
    cropSoybean: "సోయాబీన్",
    cropMango: "మామిడి",
    cropChilli: "పచ్చిమిర్చి"
  },

  kn: {
    appName: "ವಯಲ್ ವೇ (VayalWay)",
    appTagline: "ಮಾರಾಟ ಮಾಡುವ ಮೊದಲು ಕೈಗೆ ಸಿಗುವ ನಿವ್ವಳ ಲಾಭ ತಿಳಿಯಿರಿ",
    onboardingTitle: "ವಯಲ್ ವೇ (VayalWay) ಗೆ ಸ್ವಾಗತ",
    onboardingDesc: "ಸಾರಿಗೆ ಮತ್ತು ಕಮಿಷನ್ ವೆಚ್ಚ ಕಳೆದು ಕೈಗೆ ಸಿಗುವ ನಿವ್ವಳ ಲಾಭದ (Net Return) ಆಧಾರದ ಮೇಲೆ ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಹೋಲಿಕೆ ಮಾಡಿ.",
    getStarted: "ಬೆಲೆ ಹೋಲಿಕೆ ಪ್ರಾರಂಭಿಸಿ",
    skip: "ಬಿಟ್ಟುಬಿಡಿ",
    selectLanguage: "ಭಾಷೆ ಆಯ್ಕೆಮಾಡಿ",
    listening: "ಆಲಿಸುತ್ತಿದೆ... ಈಗ ಮಾತನಾಡಿ",
    speakPrompt: "ಬೆಳೆಯ ಹೆಸರು ಮತ್ತು ಪ್ರಮಾಣವನ್ನು ಹೇಳಿ (ಉದಾ: '500 ಕೆಜಿ ಟೊಮೆಟೊ')",
    speechNotSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿಸುವುದಿಲ್ಲ.",

    navHome: "ಮುಖಪುಟ",
    navCompare: "ಬೆಲೆ ಹೋಲಿಕೆ",
    navForecast: "ಬೆಲೆ ಮುನ್ಸೂಚನೆ",
    navHistory: "ಇತಿಹಾಸ",
    navProfile: "ಪ್ರೊಫೈಲ್",

    forecastTitle: "ಬೆಲೆ ಮುನ್ಸೂಚನೆ & ಪ್ರವೃತ್ತಿ",
    forecastSubtitle: "ಮುಂದಿನ 14 ದಿನಗಳ ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ನಿರೀಕ್ಷೆ — ಇಂದೇ ಮಾರಾಟ ಮಾಡಬೇಕೇ ಅಥವಾ ಕಾಯಬೇಕೇ?",
    verdictRise: "ಬೆಲೆ ಏರಿಕೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ",
    verdictFall: "ಬೆಲೆ ಇಳಿಕೆಯಾಗುವ ಸಾಧ್ಯತೆಯಿದೆ",
    verdictStable: "ಬೆಲೆ ಸ್ಥಿರವಾಗಿರುತ್ತದೆ",
    sellNow: "ಇಂದೇ ಮಾರಿ",
    waitAndHold: "ಸ್ವಲ್ಪ ದಿನ ಕಾಯಿರಿ",
    forecastDisclaimer: "ಹಿಂದಿನ ಮಾರುಕಟ್ಟೆ ಮಾದರಿಗಳ ಆಧಾರದ ಮೇಲೆ ಅಂದಾಜಿಸಲಾಗಿದೆ — ಮಾರ್ಗದರ್ಶನಕ್ಕಾಗಿ ಮಾತ್ರ.",
    forecastConfidence: "ಮುನ್ಸೂಚನೆ ವಿಶ್ವಾಸಾರ್ಹತೆ",
    gainProjected: "ಕಾಯುವುದರಿಂದ ಸಿಗುವ ಹೆಚ್ಚುವರಿ ಲಾಭ",
    lossRisk: "ತಡಮಾಡಿದರೆ ಆಗುವ ನಷ್ಟದ ಅಪಾಯ",
    marketDriver: "ಮಾರುಕಟ್ಟೆ ಕಾರಣ ಮತ್ತು ವಿವರಣೆ",
    viewForecast: "14 ದಿನಗಳ ಬೆಲೆ ಮುನ್ಸೂಚನೆ ನೋಡಿ",
    forecast14DayTitle: "14 ದಿನಗಳ ನಿರೀಕ್ಷಿತ ದರ ಪಟ್ಟಿ",

    step1Title: "ನಿಮ್ಮ ಬೆಳೆ ಆಯ್ಕೆಮಾಡಿ",
    step1Subtitle: "ಇಂದು ನೀವು ಯಾವ ಬೆಳೆಯನ್ನು ಮಾರಾಟ ಮಾಡಲು ಬಯಸುತ್ತೀರಿ?",
    allCrops: "ಎಲ್ಲಾ ಬೆಳೆಗಳು",
    searchCrops: "ಬೆಳೆಗಳನ್ನು ಹುಡುಕಿ...",
    vegetables: "ತರಕಾರಿಗಳು",
    grains: "ಧಾನ್ಯಗಳು",
    cashCrops: "ವಾಣಿಜ್ಯ ಬೆಳೆಗಳು",
    pulses: "ದ್ವಿದಳ ಧಾನ್ಯಗಳು",

    step2Title: "ಪ್ರಮಾಣವನ್ನು ನಮೂದಿಸಿ",
    step2Subtitle: "ನಿಮ್ಮ ಬಳಿ ಎಷ್ಟು ಇಳುವರಿ ಸಿದ್ಧವಾಗಿದೆ?",
    quantityInKg: "ಕೆಜಿಯಲ್ಲಿ ಪ್ರಮಾಣ",
    quintalsHint: "ಕ್ವಿಂಟಾಲ್",

    step3Title: "ನಿಮ್ಮ ಸ್ಥಳ / ಗ್ರಾಮ",
    step3Subtitle: "ನಿಖರವಾದ ಸಾರಿಗೆ ವೆಚ್ಚ ಲೆಕ್ಕಹಾಕಲು",
    currentLocation: "ನಿಮ್ಮ ಗ್ರಾಮ ಅಥವಾ ಮಾರುಕಟ್ಟೆ ಕೇಂದ್ರ",
    autoDetectLocation: "ಜಿಪಿಎಸ್ ಮೂಲಕ ಸ್ಥಳ ಪತ್ತೆ ಮಾಡಿ",
    detectingLocation: "ಸ್ಥಳವನ್ನು ಹುಡುಕಲಾಗುತ್ತಿದೆ...",
    locationDetected: "ಸ್ಥಳ ಯಶಸ್ವಿಯಾಗಿ ಪತ್ತೆಯಾಗಿದೆ!",
    orSelectDistrict: "ಅಥವಾ ಸಮೀಪದ ಕೇಂದ್ರ ಆಯ್ಕೆಮಾಡಿ",
    comparePricesBtn: "ಉತ್ತಮ ಮಾರುಕಟ್ಟೆ ಮತ್ತು ನಿವ್ವಳ ಲಾಭ ನೋಡಿ",

    resultsTitle: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆ ಹೋಲಿಕೆ",
    resultsSubtitle: "ಕೈಗೆ ಸಿಗುವ ನಿವ್ವಳ ಲಾಭದ ಆಧಾರದ ಮೇಲೆ ಜೋಡಿಸಲಾಗಿದೆ",
    bestValue: "ಅತ್ಯುತ್ತಮ ಮೌಲ್ಯ",
    recommended: "ಶಿಫಾರಸು ಮಾಡಲಾಗಿದೆ",
    highestNetReturn: "ಗರಿಷ್ಠ ನಿವ್ವಳ ಲಾಭ",
    highestPrice: "ಗರಿಷ್ಠ ಬೆಲೆ",
    nearestLocation: "ಹತ್ತಿರದ ಮಾರುಕಟ್ಟೆ",
    sortBy: "ವಿಂಗಡಿಸಿ",
    marketsFound: "ಖರೀದಿದಾರರು ಮತ್ತು ಮಾರುಕಟ್ಟೆಗಳು",
    offeredPrice: "ನೀಡಲಾದ ಬೆಲೆ",
    distance: "ದೂರ",
    transportCost: "ಸಾರಿಗೆ ವೆಚ್ಚ",
    commissionFee: "ಕಮಿಷನ್ ಮತ್ತು ಹಮಾಲಿ",
    netReturn: "ಕೈಗೆ ಸಿಗುವ ನಿವ್ವಳ ಲಾಭ",
    netReturnHelp: "ಒಟ್ಟು ಮಾರಾಟ − (ಸಾರಿಗೆ + ಕಮಿಷನ್)",
    viewBreakdown: "ಸಂಪೂರ್ಣ ವಿವರ ನೋಡಿ",
    hideBreakdown: "ವಿವರ ಮರೆಮಾಡಿ",
    callBuyer: "ಖರೀದಿದಾರರಿಗೆ ಕರೆ ಮಾಡಿ",
    recordSale: "ಮಾರಾಟ ದಾಖಲಿಸಿ",
    saleRecorded: "ಮಾರಾಟವನ್ನು ಯಶಸ್ವಿಯಾಗಿ ದಾಖಲಿಸಲಾಗಿದೆ!",

    breakdownTitle: "ಆದಾಯ ಮತ್ತು ವೆಚ್ಚದ ವಿವರ",
    grossRevenue: "ಒಟ್ಟು ಮಾರಾಟ ಮೊತ್ತ",
    totalDeductions: "ಒಟ್ಟು ಕಡಿತಗಳು (ಸಾರಿಗೆ+ಕಮಿಷನ್)",
    takeHomeProfit: "ಕೈಗೆ ಸಿಗುವ ಅಂತಿಮ ನಿವ್ವಳ ಲಾಭ",
    whyThisOption: "ಇದು ನಿಮಗೆ ಏಕೆ ಉತ್ತಮ ಆಯ್ಕೆ?",
    highestPriceWarning: "ಗಮನಿಸಿ: ಹೆಚ್ಚು ಬೆಲೆ ನೀಡುವ ದೂರದ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಸಾರಿಗೆ ವೆಚ್ಚ ಹೆಚ್ಚಾಗಿ ಕೈಗೆ ಕಡಿಮೆ ಲಾಭ ಸಿಗಬಹುದು!",

    todayOverview: "ಇಂದಿನ ಮಾರುಕಟ್ಟೆ ಸಮಾಚಾರ",
    quickCompare: "ತ್ವರಿತ ಬೆಲೆ ಪರಿಶೀಲನೆ",
    popularCrops: "ಇಂದಿನ ಪ್ರಮುಖ ಬೆಳೆಗಳು",
    recentTrends: "ಬೆಲೆ ಪ್ರವೃತ್ತಿಗಳು",
    smartAdvice: "ರೈತರಿಗೆ ಸ್ಮಾರ್ಟ್ ಸಲಹೆ",
    voiceActionPrompt: "ಬೆಳೆ ಮತ್ತು ಪ್ರಮಾಣ ಹೇಳಲು ಮೈಕ್ ಒತ್ತಿ",
    tapToSpeak: "ಮಾತನಾಡಲು ಒತ್ತಿ",

    salesHistory: "ನಿಮ್ಮ ಮಾರಾಟ ಇತಿಹಾಸ",
    historySubtitle: "ಹಿಂದಿನ ಮಾರಾಟ ಮತ್ತು ನಿವ್ವಳ ಲಾಭದ ದಾಖಲೆ",
    totalEarnings: "ಒಟ್ಟು ನಿವ್ವಳ ಲಾಭ",
    totalSoldProduce: "ಮಾರಾಟವಾದ ಒಟ್ಟು ಇಳುವರಿ",
    avgNetPerKg: "ಸರಾಸರಿ ಪ್ರತಿ ಕೆಜಿ ಲಾಭ",
    noSalesYet: "ಇನ್ನೂ ಯಾವುದೇ ಮಾರಾಟ ದಾಖಲಾಗಿಲ್ಲ.",
    viewReceipt: "ರಶೀದಿ ನೋಡಿ",
    date: "ದಿನಾಂಕ",
    market: "ಮಾರುಕಟ್ಟೆ",

    farmerProfile: "ರೈತರ ಪ್ರೊಫೈಲ್",
    editProfile: "ತಿದ್ದುಪಡಿ ಮಾಡಿ",
    saveChanges: "ಬದಲಾವಣೆಗಳನ್ನು ಉಳಿಸಿ",
    farmerName: "ರೈತರ ಹೆಸರು",
    farmLocation: "ಜಮೀನಿನ ಸ್ಥಳ",
    farmSize: "ಜಮೀನಿನ ವಿಸ್ತೀರ್ಣ",
    primaryCropsGrown: "ಮುಖ್ಯ ಬೆಳೆಗಳು",
    kisanHelpline: "ಕಿಸಾನ್ ಕಾಲ್ ಸೆಂಟರ್ (ಸರ್ಕಾರಿ ಉಚಿತ ಸಹಾಯವಾಣಿ)",
    callTollFree: "ಟೋಲ್-ಫ್ರೀ 1800-180-1551",

    cropTomato: "ಟೊಮೆಟೊ",
    cropOnion: "ಈರುಳ್ಳಿ",
    cropWheat: "ಗೋಧಿ",
    cropRice: "ಭತ್ತ (ಅಕ್ಕಿ)",
    cropCotton: "ಹತ್ತಿ",
    cropSugarcane: "ಕಬ್ಬು",
    cropPotato: "ಆಲೂಗಡ್ಡೆ",
    cropSoybean: "ಸೋಯಾಬೀನ್",
    cropMango: "ಮಾವಿನ ಹಣ್ಣು",
    cropChilli: "ಹಸಿರು ಮೆಣಸಿನಕಾಯಿ"
  },

  mr: {
    appName: "वायलवे (VayalWay)",
    appTagline: "विकण्यापूर्वी हातात मिळणारा खरा नफा जाणून घ्या",
    onboardingTitle: "वायलवे (VayalWay) मध्ये आपले स्वागत आहे",
    onboardingDesc: "वाहतूक खर्च आणि अडत/कमिशन वजा करून हातात मिळणाऱ्या निव्वळ नफ्यावरून (Net Return) बाजारपेठांची तुलना करा.",
    getStarted: "भाव तुलना सुरू करा",
    skip: "सोडून द्या",
    selectLanguage: "भाषा निवडा",
    listening: "ऐकत आहे... आता बोला",
    speakPrompt: "पिकाचे नाव व प्रमाण सांगा (उदा. '५०० किलो कांदा')",
    speechNotSupported: "या ब्राउझरमध्ये व्हॉइस इनपुट उपलब्ध नाही.",

    navHome: "मुख्यपृष्ठ",
    navCompare: "भाव तुलना",
    navForecast: "भाव अंदाज (अंदाजपत्रक)",
    navHistory: "इतिहास",
    navProfile: "प्रोफाइल",

    forecastTitle: "भाव अंदाज व कल",
    forecastSubtitle: "पुढील १४ दिवसांचा संभाव्य बाजारभाव — आज विकावे की थांबावे याचा निर्णय घ्या",
    verdictRise: "भाव वाढण्याची शक्यता आहे",
    verdictFall: "भाव घसरण्याची शक्यता आहे",
    verdictStable: "भाव स्थिर राहील",
    sellNow: "आजच विका",
    waitAndHold: "काही दिवस थांबा (होल्ड करा)",
    forecastDisclaimer: "हा अंदाज मागील आकडेवारीवर आधारित आहे — केवळ मार्गदर्शनासाठी.",
    forecastConfidence: "अंदाज अचूकता",
    gainProjected: "थांबल्यास होणारा संभाव्य नफा",
    lossRisk: "उशीर झाल्यास होणारे संभाव्य नुकसान",
    marketDriver: "बाजारपेठेची स्थिती व कारण",
    viewForecast: "१४ दिवसांचा भाव अंदाज पहा",
    forecast14DayTitle: "१४ दिवसांचा संभाव्य दर चार्ट",

    step1Title: "आपले पीक निवडा",
    step1Subtitle: "आज तुम्हाला कोणते पीक विकायचे आहे?",
    allCrops: "सर्व पिके",
    searchCrops: "पीक शोधा...",
    vegetables: "भाज्या",
    grains: "धान्य",
    cashCrops: "नगदी पिके",
    pulses: "कडधान्ये",

    step2Title: "प्रमाण टाका",
    step2Subtitle: "तुमच्याकडे किती माल तयार आहे?",
    quantityInKg: "किलोमध्ये प्रमाण",
    quintalsHint: "क्विंटल",

    step3Title: "आपले ठिकाण / गाव",
    step3Subtitle: "अचूक वाहतूक खर्च मोजण्यासाठी",
    currentLocation: "आपले गाव किंवा नजीकची बाजारपेठ",
    autoDetectLocation: "जीपीएसने स्थान शोधा",
    detectingLocation: "स्थान शोधले जात आहे...",
    locationDetected: "स्थान यशस्वीरीत्या मिळाले!",
    orSelectDistrict: "किंवा जवळचे केंद्र निवडा",
    comparePricesBtn: "सर्वोत्तम बाजारपेठ आणि निव्वळ नफा पहा",

    resultsTitle: "बाजार भाव तुलना",
    resultsSubtitle: "हातात मिळणाऱ्या प्रत्यक्ष निव्वळ नफ्यानुसार क्रमवारी",
    bestValue: "सर्वोत्तम नफा",
    recommended: "शिफारस केलेले",
    highestNetReturn: "जास्तीत जास्त निव्वळ नफा",
    highestPrice: "सर्वोच्च कच्चा भाव",
    nearestLocation: "सर्वात जवळची बाजारपेठ",
    sortBy: "क्रमवारी",
    marketsFound: "खरेदीदार व बाजारपेठा उपलब्ध",
    offeredPrice: "दिलेला भाव",
    distance: "अंतर",
    transportCost: "वाहतूक खर्च (भाडे)",
    commissionFee: "कमिशन व हमाली",
    netReturn: "हातात मिळणारा निव्वळ नफा",
    netReturnHelp: "एकूण विक्री − (भाडे + कमिशन व इतर खर्च)",
    viewBreakdown: "खर्चाचा सविस्तर तपशील पहा",
    hideBreakdown: "तपशील लपवा",
    callBuyer: "खरेदीदाराला फोन करा",
    recordSale: "विक्री नोंदवा",
    saleRecorded: "विक्री यशस्वीरीत्या नोंदवली गेली!",

    breakdownTitle: "उत्पन्न आणि खर्चाचा ताळेबंद",
    grossRevenue: "एकूण विक्री रक्कम",
    totalDeductions: "एकूण कपाती (भाडे+कमिशन)",
    takeHomeProfit: "घरी नेण्याचा प्रत्यक्ष निव्वळ नफा",
    whyThisOption: "हा पर्याय तुमच्यासाठी सर्वोत्तम का आहे?",
    highestPriceWarning: "लक्षात ठेवा: जास्त भाव देणाऱ्या दूरच्या बाजारात वाहतूक खर्च वाढल्याने हातात कमी पैसे उरतात!",

    todayOverview: "आजचे बाजार अपडेट",
    quickCompare: "झटपट भाव तपासणी",
    popularCrops: "आजची लोकप्रिय पिके",
    recentTrends: "भावाचे कल",
    smartAdvice: "शेतकऱ्यांसाठी स्मार्ट सल्ला",
    voiceActionPrompt: "माइक दाबून पीक आणि प्रमाण बोला",
    tapToSpeak: "बोलण्यासाठी दाबा",

    salesHistory: "तुमच्या विक्रीचा इतिहास",
    historySubtitle: "मागील विक्री आणि निव्वळ नफ्याची नोंद",
    totalEarnings: "एकूण निव्वळ नफा",
    totalSoldProduce: "एकूण विकलेले उत्पादन",
    avgNetPerKg: "सरासरी प्रति किलो नफा",
    noSalesYet: "अद्याप कोणतीही विक्री नोंदवलेली नाही.",
    viewReceipt: "पावती पहा",
    date: "तारीख",
    market: "बाजारपेठ",

    farmerProfile: "शेतकरी प्रोफाइल",
    editProfile: "माहिती बदला",
    saveChanges: "बदल जतन करा",
    farmerName: "शेतकऱ्याचे नाव",
    farmLocation: "शेताचे ठिकाण",
    farmSize: "शेतीचे क्षेत्र",
    primaryCropsGrown: "प्रमुख पिके",
    kisanHelpline: "किसान कॉल सेंटर (शासकीय मोफत हेल्पलाइन)",
    callTollFree: "टोल-फ्री १८००-१८०-१५५१",

    cropTomato: "टोमॅटो",
    cropOnion: "कांदा",
    cropWheat: "गहू",
    cropRice: "भात (तांदूळ)",
    cropCotton: "कापूस",
    cropSugarcane: "ऊस",
    cropPotato: "बटाटा",
    cropSoybean: "सोयाबीन",
    cropMango: "आंबा",
    cropChilli: "हिरवी मिरची"
  },

  bn: {
    appName: "ভায়ালওয়ে (VayalWay)",
    appTagline: "ফসল বিক্রির আগে হাতে পাওয়া আসল লাভ জানুন",
    onboardingTitle: "ভায়ালওয়ে (VayalWay)-তে স্বাগতম",
    onboardingDesc: "পরিবহন খরচ এবং কমিশন বাদ দিয়ে হাতে থাকা আসল নিট লাভের (Net Return) ভিত্তিতে বিভিন্ন বাজারের তুলনা করুন।",
    getStarted: "দাম তুলনা শুরু করুন",
    skip: "এড়িয়ে যান",
    selectLanguage: "ভাষা নির্বাচন করুন",
    listening: "শুনছি... এখন কথা বলুন",
    speakPrompt: "ফসলের নাম এবং পরিমাণ বলুন (যেমন: '৫০০ কেজি টমেটো')",
    speechNotSupported: "এই ব্রাউজারে ভয়েস ইনপুট সমর্থিত নয়।",

    navHome: "হোম",
    navCompare: "দাম তুলনা",
    navForecast: "দামের পূর্বাভাস",
    navHistory: "ইতিহাস",
    navProfile: "প্রোফাইল",

    forecastTitle: "দামের পূর্বাভাস ও গতিপ্রকৃতি",
    forecastSubtitle: "আগামী ১৪ দিনের সম্ভাব্য বাজার দর — আজই বিক্রি করবেন নাকি অপেক্ষা করবেন?",
    verdictRise: "দাম বাড়ার সম্ভাবনা রয়েছে",
    verdictFall: "দাম কমার সম্ভাবনা রয়েছে",
    verdictStable: "দাম স্থিতিশীল থাকবে",
    sellNow: "আজই বিক্রি করুন",
    waitAndHold: "কয়েকদিন অপেক্ষা করুন",
    forecastDisclaimer: "পূর্ববর্তী তথ্যের ভিত্তিতে তৈরি পূর্বাভাস — শুধুমাত্র নির্দেশনার জন্য।",
    forecastConfidence: "পূর্বাভাসের নির্ভরযোগ্যতা",
    gainProjected: "অপেক্ষা করলে সম্ভাব্য বাড়তি লাভ",
    lossRisk: "দেরি করলে সম্ভাব্য ক্ষতির ঝুঁকি",
    marketDriver: "বাজারের কারণ ও বিশ্লেষণ",
    viewForecast: "১৪ দিনের দামের পূর্বাভাস দেখুন",
    forecast14DayTitle: "১৪ দিনের অনুমিত মূল্য চার্ট",

    step1Title: "আপনার ফসল বেছে নিন",
    step1Subtitle: "আজ আপনি কোন ফসল বিক্রি করতে চান?",
    allCrops: "সব ফসল",
    searchCrops: "ফসল খুঁজুন...",
    vegetables: "শাকসবজি",
    grains: "খাদ্যশস্য",
    cashCrops: "অর্থকরী ফসল",
    pulses: "ডাল",

    step2Title: "পরিমাণ লিখুন",
    step2Subtitle: "আপনার কাছে বিক্রির জন্য কতটা ফসল তৈরি আছে?",
    quantityInKg: "কিলোগ্রামে পরিমাণ",
    quintalsHint: "কুইন্টাল",

    step3Title: "আপনার অবস্থান / গ্রাম",
    step3Subtitle: "সঠিক পরিবহন খরচ হিসাব করতে",
    currentLocation: "আপনার গ্রাম বা নিকটস্থ আড়ৎ",
    autoDetectLocation: "জিপিএস দিয়ে অবস্থান খুঁজুন",
    detectingLocation: "অবস্থান খোঁজা হচ্ছে...",
    locationDetected: "অবস্থান সফলভাবে শনাক্ত হয়েছে!",
    orSelectDistrict: "অথবা নিকটস্থ কেন্দ্র বেছে নিন",
    comparePricesBtn: "সেরা বাজার এবং নিট লাভ দেখুন",

    resultsTitle: "বাজার দর তুলনা",
    resultsSubtitle: "হাতে আসা নিট মুনাফার ভিত্তিতে সাজানো হয়েছে",
    bestValue: "সেরা লাভ",
    recommended: "সুপারিশকৃত",
    highestNetReturn: "সর্বোচ্চ নিট লাভ",
    highestPrice: "সর্বোচ্চ দর",
    nearestLocation: "নিকটতম দূরত্ব",
    sortBy: "সাজান",
    marketsFound: "ক্রেতা ও আড়ৎ পাওয়া গেছে",
    offeredPrice: "প্রস্তাবিত দর",
    distance: "দূরত্ব",
    transportCost: "পরিবহন খরচ",
    commissionFee: "কমিশন ও অন্যান্য খরচ",
    netReturn: "হাতে আসা নিট লাভ",
    netReturnHelp: "মোট বিক্রি − (পরিবহন + কমিশন ফি)",
    viewBreakdown: "খরচের সম্পূর্ণ বিবরণ দেখুন",
    hideBreakdown: "বিবরণ লুকান",
    callBuyer: "ক্রেতাকে কল করুন",
    recordSale: "বিক্রি নথিভুক্ত করুন",
    saleRecorded: "বিক্রি সফলভাবে নথিভুক্ত হয়েছে!",

    breakdownTitle: "আয় ও ব্যয়ের পূর্ণ হিসাব",
    grossRevenue: "মোট বিক্রি মূল্য",
    totalDeductions: "মোট কর্তন (পরিবহন+কমিশন)",
    takeHomeProfit: "হাতে থাকা চূড়ান্ত নিট লাভ",
    whyThisOption: "এটি কেন আপনার জন্য সেরা পছন্দ?",
    highestPriceWarning: "মনে রাখবেন: বেশি দর দেওয়া দূরবর্তী বাজারে পরিবহন খরচ বেড়ে যাওয়ার কারণে হাতে কম টাকা আসতে পারে!",

    todayOverview: "আজকের বাজার বার্তা",
    quickCompare: "দ্রুত দর যাচাই",
    popularCrops: "আজকের জনপ্রিয় ফসল",
    recentTrends: "দরের গতিবিধি",
    smartAdvice: "কৃষক স্মার্ট পরামর্শ",
    voiceActionPrompt: "ফসল এবং পরিমাণ বলতে মাইক টিপুন",
    tapToSpeak: "কথা বলতে টিপুন",

    salesHistory: "আপনার বিক্রির ইতিহাস",
    historySubtitle: "পূর্বের লেনদেন ও নিট লাভের হিসাব",
    totalEarnings: "মোট নিট লাভ",
    totalSoldProduce: "মোট বিক্রিত ফসল",
    avgNetPerKg: "গড় প্রতি কেজি লাভ",
    noSalesYet: "এখনও কোনও বিক্রি নথিভুক্ত হয়নি।",
    viewReceipt: "রসিদ দেখুন",
    date: "তারিখ",
    market: "বাজার",

    farmerProfile: "কৃষক প্রোফাইল",
    editProfile: "তথ্য পরিবর্তন করুন",
    saveChanges: "সংরক্ষণ করুন",
    farmerName: "কৃষকের নাম",
    farmLocation: "খামারের অবস্থান",
    farmSize: "জমির পরিমাণ",
    primaryCropsGrown: "প্রধান ফসল",
    kisanHelpline: "কিসান কল সেন্টার (সরকারি টোল-ফ্রি হেল্পলাইন)",
    callTollFree: "টোল-ফ্রি ১৮০০-১৮০-১৫৫১",

    cropTomato: "টমেটো",
    cropOnion: "পেঁয়াজ",
    cropWheat: "গম",
    cropRice: "ধান (চাল)",
    cropCotton: "তুলা",
    cropSugarcane: "আখ",
    cropPotato: "আলু",
    cropSoybean: "সয়াবিন",
    cropMango: "আম",
    cropChilli: "কাঁচা লঙ্কা"
  }
};
