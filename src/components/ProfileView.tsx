import React, { useState } from 'react';
import { 
  User, Globe, MapPin, Ruler, Sprout, Phone, RotateCcw, 
  Volume2, ShieldCheck, Check, Sparkles, HelpCircle 
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const ProfileView: React.FC = () => {
  const { profile, updateProfile, language, setLanguage, t, resetAllData, crops } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [location, setLocation] = useState(profile.location);
  const [farmSize, setFarmSize] = useState(profile.farmSize);
  const [resetConfirm, setResetConfirm] = useState(false);

  const languagesList: { code: Language; label: string; native: string; flag: string }[] = [
    { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', label: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'te', label: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'kn', label: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'ml', label: 'Malayalam', native: 'മലയാളം', flag: '🇮🇳' },
  ];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: name.trim() || profile.name,
      location: location.trim() || profile.location,
      farmSize: farmSize.trim() || profile.farmSize
    });
    setIsEditing(false);
  };

  return (
    <div className="space-y-4 pb-24 max-w-md mx-auto px-3.5 pt-3">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-900 text-white rounded-3xl p-5 shadow-lg border border-emerald-700">
        <div className="flex items-center gap-3.5 mb-3">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center text-3xl font-bold shadow-md ring-4 ring-emerald-800">
            👨‍🌾
          </div>
          <div>
            <h2 className="text-lg font-black text-white leading-tight">
              {profile.name}
            </h2>
            <p className="text-xs text-emerald-200 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-amber-300" />
              <span>{profile.location}</span>
            </p>
            <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-800 text-amber-300 border border-emerald-700">
              🚜 {profile.farmSize} Farm
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-full py-2 bg-emerald-800/80 hover:bg-emerald-700/80 text-white font-bold text-xs rounded-xl border border-emerald-600 transition"
        >
          {isEditing ? 'Cancel Editing' : t.editProfile}
        </button>
      </div>

      {/* Edit Profile Form Modal / Inline */}
      {isEditing && (
        <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-4 shadow-sm border border-emerald-100 space-y-3">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
            Update Profile Information
          </h3>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Farmer Name:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Village / District:</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 block mb-1">Farm Size:</label>
            <input
              type="text"
              value={farmSize}
              onChange={(e) => setFarmSize(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-xl text-xs font-bold text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow transition"
          >
            Save Changes
          </button>
        </form>
      )}

      {/* Language Switcher Section (Mandate 9: Local Language Support) */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-emerald-100">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-4 h-4 text-emerald-700" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
            {t.selectLanguage}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {languagesList.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`p-2.5 rounded-2xl border text-left transition flex items-center justify-between ${
                language === lang.code
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold shadow-xs ring-1 ring-emerald-300'
                  : 'border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{lang.flag}</span>
                <div>
                  <div className="text-xs font-bold">{lang.native}</div>
                  <div className="text-[10px] text-gray-400">{lang.label}</div>
                </div>
              </div>
              {language === lang.code && <Check className="w-4 h-4 text-emerald-600" />}
            </button>
          ))}
        </div>
      </div>

      {/* Free Government Kisan Helpline */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-emerald-100">
        <div className="flex items-center gap-2 mb-2">
          <Phone className="w-4 h-4 text-emerald-700" />
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
            Kisan Help & Advisory
          </h3>
        </div>

        <p className="text-xs text-gray-600 mb-2.5">
          Need direct agricultural advisory from government agronomists?
        </p>

        <a
          href="tel:18001801551"
          className="bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 p-3 rounded-2xl flex items-center justify-between transition"
        >
          <div>
            <span className="text-[10px] font-bold text-emerald-700 block uppercase">
              Toll-Free Kisan Call Center
            </span>
            <span className="text-sm font-black block">1800-180-1551</span>
          </div>
          <span className="text-xs font-bold bg-emerald-800 text-white px-2.5 py-1 rounded-xl">
            Call Free
          </span>
        </a>
      </div>

      {/* Reset Prototype / Demo Data */}
      <div className="bg-white rounded-3xl p-4 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-slate-900">
              Reset Demo Data
            </h4>
            <p className="text-[11px] text-gray-500">
              Restore default crops, prices & sales history
            </p>
          </div>

          <button
            onClick={() => {
              if (resetConfirm) {
                resetAllData();
                setResetConfirm(false);
              } else {
                setResetConfirm(true);
                setTimeout(() => setResetConfirm(false), 3000);
              }
            }}
            className={`text-xs font-bold py-2 px-3 rounded-xl transition flex items-center gap-1 ${
              resetConfirm
                ? 'bg-rose-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{resetConfirm ? 'Confirm Reset?' : 'Reset'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
