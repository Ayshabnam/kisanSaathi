import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language, FarmerProfile, CropData, FarmerCrop, SaleRecord, NotificationItem } from '../types';
import { translations, TranslationDictionary } from '../translations';
import { CROPS_DATABASE, DEFAULT_FARMER_CROPS, DEFAULT_SALES_HISTORY, DEFAULT_NOTIFICATIONS } from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: TranslationDictionary;
  profile: FarmerProfile;
  updateProfile: (updates: Partial<FarmerProfile>) => void;
  activeTab: 'home' | 'crops' | 'sell' | 'earnings' | 'profile';
  setActiveTab: (tab: 'home' | 'crops' | 'sell' | 'earnings' | 'profile') => void;
  selectedCropId: string;
  setSelectedCropId: (id: string) => void;
  selectedCrop: CropData;
  quantity: number;
  setQuantity: (qty: number) => void;
  crops: CropData[];
  farmerCrops: FarmerCrop[];
  addFarmerCrop: (crop: Omit<FarmerCrop, 'id'>) => void;
  deleteFarmerCrop: (id: string) => void;
  sales: SaleRecord[];
  addSale: (sale: Omit<SaleRecord, 'id'>) => void;
  notifications: NotificationItem[];
  unreadCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  isVoiceModalOpen: boolean;
  setIsVoiceModalOpen: (open: boolean) => void;
  isNotificationModalOpen: boolean;
  setIsNotificationModalOpen: (open: boolean) => void;
  speakText: (text: string) => void;
  executeVoiceIntent: (transcript: string) => { actionDescription: string; spokenReply: string };
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LANG: 'sfa_lang',
  PROFILE: 'sfa_profile',
  CROPS: 'sfa_farmer_crops',
  SALES: 'sfa_sales',
  NOTIFS: 'sfa_notifs',
};

const DEFAULT_PROFILE: FarmerProfile = {
  name: 'Ramesh Kumar',
  location: 'Kolar District, Karnataka',
  farmSize: '3.5 Acres',
  cropsGrown: ['tomato', 'onion', 'paddy'],
  isOnboarded: true,
  phone: '+91 98765 43210',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANG);
    return (saved as Language) || 'en';
  });

  const [profile, setProfileState] = useState<FarmerProfile>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_PROFILE;
  });

  const [activeTab, setActiveTab] = useState<'home' | 'crops' | 'sell' | 'earnings' | 'profile'>('home');
  const [selectedCropId, setSelectedCropId] = useState<string>('tomato');
  const [quantity, setQuantity] = useState<number>(500);

  const [farmerCrops, setFarmerCrops] = useState<FarmerCrop[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CROPS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_FARMER_CROPS;
  });

  const [sales, setSales] = useState<SaleRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SALES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_SALES_HISTORY;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { console.error(e); }
    }
    return DEFAULT_NOTIFICATIONS;
  });

  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const [isNotificationModalOpen, setIsNotificationModalOpen] = useState(false);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANG, language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CROPS, JSON.stringify(farmerCrops));
  }, [farmerCrops]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SALES, JSON.stringify(sales));
  }, [sales]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFS, JSON.stringify(notifications));
  }, [notifications]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const updateProfile = (updates: Partial<FarmerProfile>) => {
    setProfileState(prev => ({ ...prev, ...updates }));
  };

  const addFarmerCrop = (newCrop: Omit<FarmerCrop, 'id'>) => {
    const cropItem: FarmerCrop = {
      ...newCrop,
      id: `crop_${Date.now()}`
    };
    setFarmerCrops(prev => [cropItem, ...prev]);
  };

  const deleteFarmerCrop = (id: string) => {
    setFarmerCrops(prev => prev.filter(c => c.id !== id));
  };

  const addSale = (saleData: Omit<SaleRecord, 'id'>) => {
    const newSale: SaleRecord = {
      ...saleData,
      id: `sale_${Date.now()}`
    };
    setSales(prev => [newSale, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const t = translations[language] || translations.en;

  const selectedCrop = CROPS_DATABASE.find(c => c.id === selectedCropId) || CROPS_DATABASE[0];

  // Speech synthesis in appropriate locale
  const speakText = (text: string) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const langCodes: Record<Language, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        kn: 'kn-IN',
        ml: 'ml-IN'
      };
      utterance.lang = langCodes[language] || 'en-IN';
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  // Natural language voice intent processor
  const executeVoiceIntent = (transcript: string): { actionDescription: string; spokenReply: string } => {
    const lower = transcript.toLowerCase();

    // 1. Check for quantity like "500 kg" or "500 kilograms" or "1000"
    const numberMatch = lower.match(/\b(\d+)\s*(kg|kilos|kilograms|quintal|ton)?\b/);
    if (numberMatch) {
      let qty = parseInt(numberMatch[1], 10);
      if (numberMatch[2] === 'quintal') qty = qty * 100;
      if (numberMatch[2] === 'ton') qty = qty * 1000;
      if (qty > 0 && qty < 100000) {
        setQuantity(qty);
      }
    }

    // 2. Crop detection (English and Indian names)
    let detectedCrop: CropData | null = null;
    if (lower.includes('tomato') || lower.includes('tamatar') || lower.includes('thakkali') || lower.includes('tamata')) {
      detectedCrop = CROPS_DATABASE.find(c => c.id === 'tomato') || null;
    } else if (lower.includes('onion') || lower.includes('pyaz') || lower.includes('vengayam') || lower.includes('ullipaya') || lower.includes('eerulli') || lower.includes('savala')) {
      detectedCrop = CROPS_DATABASE.find(c => c.id === 'onion') || null;
    } else if (lower.includes('paddy') || lower.includes('rice') || lower.includes('dhan') || lower.includes('nel') || lower.includes('vari') || lower.includes('bhatta')) {
      detectedCrop = CROPS_DATABASE.find(c => c.id === 'paddy') || null;
    } else if (lower.includes('coconut') || lower.includes('nariyal') || lower.includes('thengai') || lower.includes('kobbari') || lower.includes('thenga')) {
      detectedCrop = CROPS_DATABASE.find(c => c.id === 'coconut') || null;
    } else if (lower.includes('banana') || lower.includes('kela') || lower.includes('vazhai') || lower.includes('arati') || lower.includes('bale')) {
      detectedCrop = CROPS_DATABASE.find(c => c.id === 'banana') || null;
    } else if (lower.includes('chilli') || lower.includes('mirchi') || lower.includes('milagai') || lower.includes('menasinakayi')) {
      detectedCrop = CROPS_DATABASE.find(c => c.id === 'chilli') || null;
    } else if (lower.includes('carrot') || lower.includes('gajar')) {
      detectedCrop = CROPS_DATABASE.find(c => c.id === 'carrot') || null;
    } else if (lower.includes('potato') || lower.includes('aloo') || lower.includes('urulaikilangu') || lower.includes('alugadde')) {
      detectedCrop = CROPS_DATABASE.find(c => c.id === 'potato') || null;
    }

    if (detectedCrop) {
      setSelectedCropId(detectedCrop.id);
    }

    const currentCropObj = detectedCrop || selectedCrop;

    // 3. Price inquiry: "What is today's tomato price?"
    if (lower.includes('price') || lower.includes('rate') || lower.includes('bhav') || lower.includes('vilai') || lower.includes('dhara')) {
      const bestMkt = [...currentCropObj.availableMarkets].sort((a, b) => b.offeredPricePerKg - a.offeredPricePerKg)[0];
      const reply = `${t[currentCropObj.nameKey as keyof TranslationDictionary] || currentCropObj.id} ${t.currentPrice} is ₹${currentCropObj.currentAvgPrice} per kg. In ${bestMkt?.name || 'Mandi B'}, offered price is ₹${bestMkt?.offeredPricePerKg || currentCropObj.currentAvgPrice}.`;
      setActiveTab('sell');
      speakText(reply);
      return {
        actionDescription: `Checking today's price for ${currentCropObj.emoji} ${t[currentCropObj.nameKey as keyof TranslationDictionary] || currentCropObj.id}`,
        spokenReply: reply
      };
    }

    // 4. "Where can I sell my tomatoes?" / "Which market gives me more return?" / "Sell produce"
    if (lower.includes('where') || lower.includes('sell') || lower.includes('market') || lower.includes('return') || lower.includes('profit') || lower.includes('bech') || lower.includes('virka') || lower.includes('ammu')) {
      setActiveTab('sell');
      const reply = `Showing market net returns for ${currentCropObj.emoji} ${t[currentCropObj.nameKey as keyof TranslationDictionary] || currentCropObj.id} for ${quantity} kg. Market B gives the best estimated net return!`;
      speakText(reply);
      return {
        actionDescription: `Comparing selling markets for ${currentCropObj.emoji} ${t[currentCropObj.nameKey as keyof TranslationDictionary] || currentCropObj.id} (${quantity} kg)`,
        spokenReply: reply
      };
    }

    // 5. "How much did I earn this month?" / "Show my sales" / "Earnings"
    if (lower.includes('earn') || lower.includes('month') || lower.includes('sales') || lower.includes('history') || lower.includes('kamai') || lower.includes('varumaanam') || lower.includes('aadhayam')) {
      setActiveTab('earnings');
      const reply = `This month your total sales are ₹48,500 with expenses of ₹10,500. Your net return is ₹38,000!`;
      speakText(reply);
      return {
        actionDescription: "Opening your Monthly Earnings Dashboard",
        spokenReply: reply
      };
    }

    // 6. "What crops are in season?" / "Calendar"
    if (lower.includes('season') || lower.includes('calendar') || lower.includes('crop') || lower.includes('grow') || lower.includes('fasal') || lower.includes('payir')) {
      setActiveTab('crops');
      const reply = `Here is your crop calendar. Tomato and Green Chilli are in active harvest and high demand this season.`;
      speakText(reply);
      return {
        actionDescription: "Viewing Crop Calendar & My Crops",
        spokenReply: reply
      };
    }

    // 7. General produce mention e.g. "I have 500 kilograms of tomatoes"
    if (detectedCrop) {
      setActiveTab('sell');
      const reply = `Got it! Comparing markets for ${quantity} kg of ${t[detectedCrop.nameKey as keyof TranslationDictionary] || detectedCrop.id}.`;
      speakText(reply);
      return {
        actionDescription: `Calculated selling options for ${quantity} kg of ${detectedCrop.emoji} ${t[detectedCrop.nameKey as keyof TranslationDictionary] || detectedCrop.id}`,
        spokenReply: reply
      };
    }

    // Fallback:
    setActiveTab('sell');
    const defaultReply = `I am comparing nearby markets for your produce. Take a look at the estimated net return.`;
    speakText(defaultReply);
    return {
      actionDescription: "Opening Market Selling Comparison",
      spokenReply: defaultReply
    };
  };

  const resetAllData = () => {
    localStorage.removeItem(STORAGE_KEYS.PROFILE);
    localStorage.removeItem(STORAGE_KEYS.CROPS);
    localStorage.removeItem(STORAGE_KEYS.SALES);
    localStorage.removeItem(STORAGE_KEYS.NOTIFS);
    setProfileState(DEFAULT_PROFILE);
    setFarmerCrops(DEFAULT_FARMER_CROPS);
    setSales(DEFAULT_SALES_HISTORY);
    setNotifications(DEFAULT_NOTIFICATIONS);
    setActiveTab('home');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        profile,
        updateProfile,
        activeTab,
        setActiveTab,
        selectedCropId,
        setSelectedCropId,
        selectedCrop,
        quantity,
        setQuantity,
        crops: CROPS_DATABASE,
        farmerCrops,
        addFarmerCrop,
        deleteFarmerCrop,
        sales,
        addSale,
        notifications,
        unreadCount,
        markNotificationRead,
        markAllNotificationsRead,
        isVoiceModalOpen,
        setIsVoiceModalOpen,
        isNotificationModalOpen,
        setIsNotificationModalOpen,
        speakText,
        executeVoiceIntent,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
