import React, { useState } from 'react';
import { Check, ArrowRight, Sprout, MapPin, User, Globe, Ruler } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const OnboardingModal: React.FC = () => {
  const { profile, updateProfile, language, setLanguage, t, crops } = useApp();
  const [step, setStep] = useState(1);
  const [name, setName] = useState(profile.name || '');
  const [location, setLocation] = useState(profile.location || 'Kolar, Karnataka');
  const [selectedCrops, setSelectedCrops] = useState<string[]>(profile.cropsGrown || ['tomato', 'onion']);
  const [farmSize, setFarmSize] = useState(profile.farmSize || '3 Acres');

  if (profile.isOnboarded) return null;

  const languagesList: { code: Language; label: string; native: string; flag: string }[] = [
    { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  ];

  const popularLocations = [
    'Kolar, Karnataka',
    'Nashik, Maharashtra',
    'Erode, Tamil Nadu',
    'Guntur, Andhra Pradesh',
    'Shimla, Himachal Pradesh',
    'Wayanad, Kerala'
  ];

  const toggleCrop = (id: string) => {
    if (selectedCrops.includes(id)) {
      setSelectedCrops(selectedCrops.filter(c => c !== id));
    } else {
      setSelectedCrops([...selectedCrops, id]);
    }
  };

  const handleFinish = () => {
    updateProfile({
      name: name.trim() || 'Kisan Bhai',
      location: location.trim() || 'Kolar, Karnataka',
      farmSize: farmSize.trim() || '3 Acres',
      cropsGrown: selectedCrops.length > 0 ? selectedCrops : ['tomato', 'onion'],
      isOnboarded: true
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 flex flex-col">
        {/* Progress header */}
        <div className="bg-emerald-900 p-5 text-white">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Step {step} of 5
            </span>
            <span className="text-xs text-emerald-200">
              {t.onboardingTitle}
            </span>
          </div>
          <div className="w-full bg-emerald-950 h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6 flex-1">
          {/* Step 1: Language */}
          {step === 1 && (
            <div className="animate-in fade-in">
              <div className="text-center mb-5">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl">
                  🌐
                </div>
                <h3 className="text-lg font-bold text-slate-900">{t.selectLanguage}</h3>
                <p className="text-xs text-gray-500">Choose the language you are most comfortable with</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {languagesList.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => setLanguage(l.code)}
                    className={`p-3 rounded-2xl border-2 text-left transition flex items-center justify-between ${
                      language === l.code
                        ? 'border-emerald-600 bg-emerald-50/80 font-bold text-emerald-900 shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                    }`}
                  >
                    <div>
                      <div className="text-xl mb-0.5">{l.flag}</div>
                      <div className="text-sm font-bold">{l.native}</div>
                      <div className="text-[11px] text-gray-400">{l.label}</div>
                    </div>
                    {language === l.code && <Check className="w-5 h-5 text-emerald-600" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Name */}
          {step === 2 && (
            <div className="animate-in fade-in">
              <div className="text-center mb-5">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl">
                  👨‍🌾
                </div>
                <h3 className="text-lg font-bold text-slate-900">{t.yourName}</h3>
                <p className="text-xs text-gray-500">We will use this to personalize your assistant</p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Kumar, Sivakumar, Raju"
                    className="w-full pl-12 pr-4 py-3.5 text-base border-2 border-emerald-200 rounded-2xl focus:border-emerald-600 focus:outline-none bg-emerald-50/30 text-slate-800 font-semibold"
                    autoFocus
                  />
                </div>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  <span className="text-xs text-gray-400">Quick options:</span>
                  {['Ramesh Kumar', 'Sivakumar', 'Anil Patel', 'Venkatesh'].map((sample) => (
                    <button
                      key={sample}
                      onClick={() => setName(sample)}
                      className="text-xs bg-gray-100 hover:bg-emerald-100 text-gray-700 px-2.5 py-1 rounded-lg transition"
                    >
                      {sample}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Location */}
          {step === 3 && (
            <div className="animate-in fade-in">
              <div className="text-center mb-5">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl">
                  📍
                </div>
                <h3 className="text-lg font-bold text-slate-900">{t.yourLocation}</h3>
                <p className="text-xs text-gray-500">Helps calculate transport costs to nearby mandis</p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <MapPin className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kolar, Karnataka"
                    className="w-full pl-12 pr-4 py-3.5 text-base border-2 border-emerald-200 rounded-2xl focus:border-emerald-600 focus:outline-none bg-emerald-50/30 text-slate-800 font-semibold"
                  />
                </div>

                <div className="pt-2">
                  <p className="text-xs font-bold text-gray-500 mb-2">Select your district:</p>
                  <div className="grid grid-cols-2 gap-2">
                    {popularLocations.map((loc) => (
                      <button
                        key={loc}
                        onClick={() => setLocation(loc)}
                        className={`text-xs p-2.5 rounded-xl border text-left font-medium transition ${
                          location === loc
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold'
                            : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Crops Grown */}
          {step === 4 && (
            <div className="animate-in fade-in">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl">
                  🌾
                </div>
                <h3 className="text-lg font-bold text-slate-900">{t.cropsGrown}</h3>
                <p className="text-xs text-gray-500">Select one or more crops that you cultivate</p>
              </div>

              <div className="grid grid-cols-2 gap-2.5 max-h-56 overflow-y-auto pr-1">
                {crops.map((crop) => {
                  const isSelected = selectedCrops.includes(crop.id);
                  return (
                    <button
                      key={crop.id}
                      onClick={() => toggleCrop(crop.id)}
                      className={`p-3 rounded-2xl border-2 flex items-center gap-2.5 transition text-left ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-2xl">{crop.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold truncate">
                          {t[crop.nameKey as keyof typeof t] || crop.id}
                        </div>
                        <div className="text-[10px] text-gray-400">₹{crop.currentAvgPrice}/kg</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 5: Farm Size */}
          {step === 5 && (
            <div className="animate-in fade-in">
              <div className="text-center mb-5">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-2 text-2xl">
                  🚜
                </div>
                <h3 className="text-lg font-bold text-slate-900">{t.farmSize}</h3>
                <p className="text-xs text-gray-500">Helps estimate harvest output (optional)</p>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <Ruler className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={farmSize}
                    onChange={(e) => setFarmSize(e.target.value)}
                    placeholder="e.g. 3.5 Acres or 5 Bigha"
                    className="w-full pl-12 pr-4 py-3.5 text-base border-2 border-emerald-200 rounded-2xl focus:border-emerald-600 focus:outline-none bg-emerald-50/30 text-slate-800 font-semibold"
                  />
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  {['1 Acre', '2.5 Acres', '3.5 Acres', '5 Acres', '10 Acres', '2 Bigha'].map((size) => (
                    <button
                      key={size}
                      onClick={() => setFarmSize(size)}
                      className={`text-xs py-2 px-3 rounded-xl border text-center transition font-semibold ${
                        farmSize === size
                          ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                          : 'border-gray-200 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="text-xs font-bold text-gray-600 hover:text-gray-900 px-3 py-2 rounded-xl transition"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="bg-emerald-800 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 transition active:scale-95 ml-auto"
            >
              <span>{t.nextStep}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold text-sm px-6 py-3 rounded-2xl shadow-md flex items-center gap-2 transition active:scale-95 ml-auto"
            >
              <span>{t.getStarted} 🌾</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
