import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  Language,
  NavTab,
  SortMode,
  FarmerProfile,
  CropData,
  MarketOption,
  SaleRecord,
  NotificationItem,
  CropForecast
} from '../types';
import { translations, TranslationStrings } from '../translations';
import { generateCropForecast } from '../utils/pricePrediction';
import {
  INITIAL_PROFILE,
  MOCK_CROPS,
  INITIAL_SALES_HISTORY,
  INITIAL_NOTIFICATIONS,
  COMMON_LOCATIONS
} from '../data/mockData';

export interface CalculatedMarketResult {
  market: MarketOption;
  quantityKg: number;
  grossRevenue: number;
  transportCost: number;
  commissionFee: number;
  handlingCost: number;
  totalDeductions: number;
  netReturn: number;
  effectiveNetPerKg: number;
  isBestValue: boolean;
  isHighestRawPrice: boolean;
  isNearest: boolean;
}

interface AppContextType {
  // Localization
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationStrings;
  languagesList: { code: Language; label: string; nativeName: string; flag: string }[];

  // Navigation
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;

  // Comparison Inputs
  selectedCropId: string;
  setSelectedCropId: (id: string) => void;
  selectedCrop: CropData;
  quantityKg: number;
  setQuantityKg: (qty: number) => void;
  location: string;
  setLocation: (loc: string) => void;
  isLocating: boolean;
  detectLocation: () => Promise<void>;
  commonLocations: string[];

  // Comparison Output & Sorting
  sortMode: SortMode;
  setSortMode: (mode: SortMode) => void;
  calculatedResults: CalculatedMarketResult[];
  selectedMarketDetail: CalculatedMarketResult | null;
  setSelectedMarketDetail: (res: CalculatedMarketResult | null) => void;
  
  // Price Prediction & Forecast
  currentForecast: CropForecast;
  getForecastForCrop: (crop: CropData, qty?: number) => CropForecast;

  // Quick Actions & Calculations
  calculateMarketResult: (mkt: MarketOption, qty: number) => CalculatedMarketResult;
  recordNewSale: (marketResult: CalculatedMarketResult, customNotes?: string) => void;

  // Voice Interaction
  isListening: boolean;
  voiceField: 'crop' | 'quantity' | 'location' | 'general' | null;
  voiceTranscript: string;
  voiceFeedbackMessage: string | null;
  startVoiceInput: (targetField?: 'crop' | 'quantity' | 'location' | 'general') => void;
  stopVoiceInput: () => void;
  speakText: (text: string) => void;

  // History & Profile
  salesHistory: SaleRecord[];
  deleteSaleRecord: (id: string) => void;
  profile: FarmerProfile;
  updateProfile: (updated: Partial<FarmerProfile>) => void;

  // Notifications & Onboarding
  notifications: NotificationItem[];
  markNotificationRead: (id: string) => void;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  finishOnboarding: () => void;
  showVoiceModal: boolean;
  setShowVoiceModal: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // 1. Language state with persistent memory
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('vayalway_language') || localStorage.getItem('kisanrate_language');
    if (saved && ['en', 'hi', 'ta', 'te', 'kn', 'mr', 'bn'].includes(saved)) {
      return saved as Language;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('vayalway_language', lang);
  };

  const t = useMemo(() => {
    return translations[language] || translations.en;
  }, [language]);

  const languagesList: { code: Language; label: string; nativeName: string; flag: string }[] = [
    { code: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
    { code: 'ta', label: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', label: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', label: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'mr', label: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
    { code: 'bn', label: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  ];

  // 2. Active Tab
  const [activeTab, setActiveTab] = useState<NavTab>('home');

  // 3. Comparison Inputs
  const [selectedCropId, setSelectedCropId] = useState<string>('tomato');
  const [quantityKg, setQuantityKg] = useState<number>(500);
  const [location, setLocation] = useState<string>('Shrirampur, Ahmednagar');
  const [isLocating, setIsLocating] = useState<boolean>(false);

  // 4. Sorting & Detail selection
  const [sortMode, setSortMode] = useState<SortMode>('net_return');
  const [selectedMarketDetail, setSelectedMarketDetail] = useState<CalculatedMarketResult | null>(null);

  // 5. Profile & Storage
  const [profile, setProfile] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem('vayalway_profile') || localStorage.getItem('kisanrate_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return INITIAL_PROFILE;
  });

  const updateProfile = (updated: Partial<FarmerProfile>) => {
    setProfile(prev => {
      const next = { ...prev, ...updated };
      localStorage.setItem('vayalway_profile', JSON.stringify(next));
      return next;
    });
  };

  // 6. Sales History
  const [salesHistory, setSalesHistory] = useState<SaleRecord[]>(() => {
    const saved = localStorage.getItem('vayalway_sales') || localStorage.getItem('kisanrate_sales');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore
      }
    }
    return INITIAL_SALES_HISTORY;
  });

  const recordNewSale = (marketResult: CalculatedMarketResult, customNotes?: string) => {
    const now = new Date();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const formattedDate = `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    const formattedMonth = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    const newRecord: SaleRecord = {
      id: `sale_${Date.now()}`,
      cropId: selectedCrop.id,
      cropName: selectedCrop.nameKey in t ? (t as any)[selectedCrop.nameKey] : selectedCrop.id,
      emoji: selectedCrop.emoji,
      quantityKg: marketResult.quantityKg,
      pricePerKg: marketResult.market.offeredPricePerKg,
      grossRevenue: marketResult.grossRevenue,
      transportCost: marketResult.transportCost,
      commissionFee: marketResult.commissionFee,
      handlingCost: marketResult.handlingCost,
      totalExpenses: marketResult.totalDeductions,
      netReturn: marketResult.netReturn,
      marketName: marketResult.market.name,
      marketLocation: marketResult.market.location,
      marketType: marketResult.market.type,
      date: formattedDate,
      month: formattedMonth,
      soldVia: 'VayalWay Recommendation',
      notes: customNotes || `Sold ${marketResult.quantityKg} kg at ₹${marketResult.market.offeredPricePerKg}/kg with ₹${marketResult.netReturn.toLocaleString('en-IN')} net return in hand.`
    };

    setSalesHistory(prev => {
      const next = [newRecord, ...prev];
      localStorage.setItem('vayalway_sales', JSON.stringify(next));
      return next;
    });
  };

  const deleteSaleRecord = (id: string) => {
    setSalesHistory(prev => {
      const next = prev.filter(s => s.id !== id);
      localStorage.setItem('vayalway_sales', JSON.stringify(next));
      return next;
    });
  };

  // 7. Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  // 8. Onboarding modal
  const [showOnboarding, setShowOnboarding] = useState<boolean>(() => {
    return !localStorage.getItem('vayalway_onboarded_done') && !localStorage.getItem('kisanrate_onboarded_done');
  });

  const finishOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('vayalway_onboarded_done', 'true');
    updateProfile({ isOnboarded: true });
  };

  // 9. Voice Interaction
  const [isListening, setIsListening] = useState<boolean>(false);
  const [voiceField, setVoiceField] = useState<'crop' | 'quantity' | 'location' | 'general' | null>(null);
  const [voiceTranscript, setVoiceTranscript] = useState<string>('');
  const [voiceFeedbackMessage, setVoiceFeedbackMessage] = useState<string | null>(null);
  const [showVoiceModal, setShowVoiceModal] = useState<boolean>(false);

  // Selected crop lookup
  const selectedCrop = useMemo(() => {
    return MOCK_CROPS.find(c => c.id === selectedCropId) || MOCK_CROPS[0];
  }, [selectedCropId]);

  // Price Prediction logic
  const currentForecast = useMemo(() => {
    return generateCropForecast(selectedCrop, quantityKg);
  }, [selectedCrop, quantityKg]);

  const getForecastForCrop = (crop: CropData, qty: number = quantityKg) => {
    return generateCropForecast(crop, qty);
  };

  // 10. Net Return Calculation Engine
  const calculateMarketResult = (mkt: MarketOption, qty: number): CalculatedMarketResult => {
    const grossRevenue = Math.round(mkt.offeredPricePerKg * qty);
    
    // Transport calculation: Base hire fee + fuel/distance factor proportional to weight (quintals)
    // Formula: baseTransportFixed + (distanceKm * (qty / 100) * 12)
    const quintals = qty / 100;
    const distanceTransport = Math.round(mkt.distanceKm * Math.max(1, quintals * 0.85) * 14);
    const transportCost = Math.round(mkt.baseTransportFixed + distanceTransport);

    // Mandi fee / Commission: % of gross revenue
    const commissionFee = Math.round((grossRevenue * mkt.fixedMarketFeePercent) / 100);
    const handlingCost = mkt.handlingFee;

    const totalDeductions = transportCost + commissionFee + handlingCost;
    const netReturn = Math.max(0, grossRevenue - totalDeductions);
    const effectiveNetPerKg = Number((netReturn / Math.max(1, qty)).toFixed(2));

    return {
      market: mkt,
      quantityKg: qty,
      grossRevenue,
      transportCost,
      commissionFee,
      handlingCost,
      totalDeductions,
      netReturn,
      effectiveNetPerKg,
      isBestValue: false,
      isHighestRawPrice: false,
      isNearest: false
    };
  };

  // All calculated results for current crop and quantity, with badges and sorting
  const calculatedResults = useMemo(() => {
    if (!selectedCrop || !selectedCrop.availableMarkets) return [];

    const rawList = selectedCrop.availableMarkets.map(mkt => calculateMarketResult(mkt, quantityKg));

    // Determine metrics
    let maxNetReturn = -Infinity;
    let maxPrice = -Infinity;
    let minDistance = Infinity;

    rawList.forEach(item => {
      if (item.netReturn > maxNetReturn) maxNetReturn = item.netReturn;
      if (item.market.offeredPricePerKg > maxPrice) maxPrice = item.market.offeredPricePerKg;
      if (item.market.distanceKm < minDistance) minDistance = item.market.distanceKm;
    });

    const withBadges = rawList.map(item => ({
      ...item,
      isBestValue: item.netReturn === maxNetReturn,
      isHighestRawPrice: item.market.offeredPricePerKg === maxPrice,
      isNearest: item.market.distanceKm === minDistance
    }));

    // Sort according to user preference
    return withBadges.sort((a, b) => {
      if (sortMode === 'net_return') {
        return b.netReturn - a.netReturn;
      }
      if (sortMode === 'price') {
        return b.market.offeredPricePerKg - a.market.offeredPricePerKg;
      }
      if (sortMode === 'distance') {
        return a.market.distanceKm - b.market.distanceKm;
      }
      return 0;
    });
  }, [selectedCrop, quantityKg, sortMode]);

  // 11. GPS Location auto-detect simulation & real geolocation
  const detectLocation = async () => {
    setIsLocating(true);
    setVoiceFeedbackMessage(t.detectingLocation);

    if (typeof navigator !== 'undefined' && 'geolocation' in navigator) {
      try {
        await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              // Real coordinate obtained! For familiar display in agricultural context:
              const lat = pos.coords.latitude.toFixed(2);
              const lon = pos.coords.longitude.toFixed(2);
              setLocation(`Near ${profile.location.split(',')[0]} (${lat}°N, ${lon}°E)`);
              setIsLocating(false);
              setVoiceFeedbackMessage(t.locationDetected);
              setTimeout(() => setVoiceFeedbackMessage(null), 3000);
              resolve(pos);
            },
            () => {
              // If permission denied or fallback:
              setTimeout(() => {
                setLocation(COMMON_LOCATIONS[0]);
                setIsLocating(false);
                setVoiceFeedbackMessage(t.locationDetected);
                setTimeout(() => setVoiceFeedbackMessage(null), 3000);
                resolve(null);
              }, 600);
            },
            { timeout: 5000 }
          );
        });
        return;
      } catch {
        // fallback
      }
    }

    // Default fast fallback
    setTimeout(() => {
      setLocation(COMMON_LOCATIONS[0]);
      setIsLocating(false);
      setVoiceFeedbackMessage(t.locationDetected);
      setTimeout(() => setVoiceFeedbackMessage(null), 2500);
    }, 700);
  };

  // 12. Text to speech output
  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        
        // Match language code
        const langMap: Record<Language, string> = {
          en: 'en-IN',
          hi: 'hi-IN',
          ta: 'ta-IN',
          te: 'te-IN',
          kn: 'kn-IN',
          mr: 'mr-IN',
          bn: 'bn-IN'
        };
        utterance.lang = langMap[language] || 'en-IN';
        utterance.rate = 0.95;
        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
      }
    }
  };

  // 13. Voice Recognition Handler
  const startVoiceInput = (targetField: 'crop' | 'quantity' | 'location' | 'general' = 'general') => {
    setVoiceField(targetField);
    setIsListening(true);
    setVoiceTranscript('');
    setVoiceFeedbackMessage(t.listening);
    setShowVoiceModal(true);

    const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRec) {
      setVoiceFeedbackMessage(t.speechNotSupported);
      // provide quick simulated speech fallback for desktop testing
      setTimeout(() => {
        setIsListening(false);
      }, 2000);
      return;
    }

    try {
      const recognition = new SpeechRec();
      const langMap: Record<Language, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        kn: 'kn-IN',
        mr: 'mr-IN',
        bn: 'bn-IN'
      };
      recognition.lang = langMap[language] || 'en-IN';
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setVoiceTranscript(transcript);

        // Smart parse transcript for quantities, crops, and locations
        parseVoiceCommand(transcript, targetField);
      };

      recognition.onerror = (e: any) => {
        console.warn('Speech error:', e);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch (e) {
      console.warn('Speech start error:', e);
      setIsListening(false);
    }
  };

  const stopVoiceInput = () => {
    setIsListening(false);
    setShowVoiceModal(false);
    setVoiceField(null);
  };

  // Parse voice text into app state
  const parseVoiceCommand = (rawText: string, targetField: string) => {
    const text = rawText.toLowerCase();

    // 1. Look for numbers (quantities)
    const numberMatch = text.match(/(\d+[\d,]*)/);
    if (numberMatch) {
      const num = parseInt(numberMatch[1].replace(/,/g, ''), 10);
      if (!isNaN(num) && num > 0) {
        // if user said "quintal" multiply by 100
        if (text.includes('quintal') || text.includes('क्विंटल') || text.includes('क्विंटाल') || text.includes('குவிண்டால்')) {
          setQuantityKg(num * 100);
        } else {
          setQuantityKg(num);
        }
      }
    }

    // 2. Look for crops
    if (text.includes('tomato') || text.includes('tamatar') || text.includes('टमाटर') || text.includes('தக்காளி') || text.includes('టమోటా') || text.includes('ಟೊಮೆಟೊ') || text.includes('टोमॅटो') || text.includes('টমেটো')) {
      setSelectedCropId('tomato');
    } else if (text.includes('onion') || text.includes('pyaz') || text.includes('kanda') || text.includes('प्याज') || text.includes('कांदा') || text.includes('வெங்காயம்') || text.includes('ఉల్లి') || text.includes('ಈರುಳ್ಳಿ') || text.includes('পেঁয়াজ')) {
      setSelectedCropId('onion');
    } else if (text.includes('wheat') || text.includes('gehun') || text.includes('gehu') || text.includes('गेहूं') || text.includes('गहू') || text.includes('கோதுமை') || text.includes('గోధుమ') || text.includes('ಗೋಧಿ') || text.includes('গম')) {
      setSelectedCropId('wheat');
    } else if (text.includes('rice') || text.includes('paddy') || text.includes('chawal') || text.includes('dhan') || text.includes('चावल') || text.includes('धान') || text.includes('भात') || text.includes('நெல்') || text.includes('వరి') || text.includes('ಭತ್ತ') || text.includes('ধান')) {
      setSelectedCropId('rice');
    } else if (text.includes('cotton') || text.includes('kapas') || text.includes('रूई') || text.includes('कपास') || text.includes('कापूस') || text.includes('பருத்தி') || text.includes('పత్తి') || text.includes('ಹತ್ತಿ') || text.includes('তুলা')) {
      setSelectedCropId('cotton');
    } else if (text.includes('sugarcane') || text.includes('cane') || text.includes('ganna') || text.includes('गन्ना') || text.includes('ऊस') || text.includes('கரும்பு') || text.includes('చెరకు') || text.includes('ಕಬ್ಬು') || text.includes('আখ')) {
      setSelectedCropId('sugarcane');
    } else if (text.includes('potato') || text.includes('aloo') || text.includes('आलू') || text.includes('बटाटा') || text.includes('உருளை') || text.includes('బంగాళాదుంప') || text.includes('ಆಲೂಗಡ್ಡೆ') || text.includes('আলু')) {
      setSelectedCropId('potato');
    } else if (text.includes('soybean') || text.includes('soya') || text.includes('सोयाबीन')) {
      setSelectedCropId('soybean');
    } else if (text.includes('chilli') || text.includes('mirchi') || text.includes('मिर्च') || text.includes('मिरची') || text.includes('மிளகாய்') || text.includes('మిర్చి') || text.includes('ಮೆಣಸಿನಕಾಯಿ') || text.includes('লঙ্কা')) {
      setSelectedCropId('chilli');
    }

    // 3. Location phrases
    if (text.includes('shrirampur') || text.includes('ahmednagar') || text.includes('nashik') || text.includes('lasalgaon') || text.includes('pune') || text.includes('mumbai') || text.includes('kolar') || text.includes('guntur')) {
      const match = COMMON_LOCATIONS.find(loc => loc.toLowerCase().includes(text.trim()));
      if (match) {
        setLocation(match);
      }
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languagesList,

        activeTab,
        setActiveTab,

        selectedCropId,
        setSelectedCropId,
        selectedCrop,
        quantityKg,
        setQuantityKg,
        location,
        setLocation,
        isLocating,
        detectLocation,
        commonLocations: COMMON_LOCATIONS,

        sortMode,
        setSortMode,
        calculatedResults,
        selectedMarketDetail,
        setSelectedMarketDetail,

        // Price Prediction
        currentForecast,
        getForecastForCrop,

        calculateMarketResult,
        recordNewSale,

        isListening,
        voiceField,
        voiceTranscript,
        voiceFeedbackMessage,
        startVoiceInput,
        stopVoiceInput,
        speakText,

        salesHistory,
        deleteSaleRecord,
        profile,
        updateProfile,

        notifications,
        markNotificationRead,
        showOnboarding,
        setShowOnboarding,
        finishOnboarding,
        showVoiceModal,
        setShowVoiceModal
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
