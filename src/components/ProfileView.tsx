import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';
import {
  User,
  MapPin,
  Trees,
  PhoneCall,
  Languages,
  Check,
  Edit2,
  Save,
  HelpCircle,
  ShieldCheck,
  Mic
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const {
    t,
    profile,
    updateProfile,
    language,
    setLanguage,
    languagesList
  } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(profile.name);
  const [location, setLocation] = useState(profile.location);
  const [farmSize, setFarmSize] = useState(profile.farmSize);
  const [phone, setPhone] = useState(profile.phone || '');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      location,
      farmSize,
      phone
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-20 md:pb-10 max-w-4xl mx-auto">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-[#1F5C3F] via-[#26724E] to-[#D2691E] text-white rounded-3xl p-6 sm:p-8 shadow-warm-lg relative overflow-hidden card-3d">
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F5A623] to-[#D2691E] p-0.5 shadow-warm-sm flex items-center justify-center shrink-0">
              <div className="w-full h-full bg-[#FBF6EE] rounded-[14px] flex items-center justify-center text-3xl font-black">
                👨‍🌾
              </div>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                {profile.name}
              </h2>
              <p className="text-emerald-100 text-xs sm:text-sm flex items-center gap-1.5 mt-0.5 font-medium">
                <MapPin className="w-4 h-4 text-[#F5A623]" />
                {profile.location} • {profile.farmSize}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsEditing(!isEditing)}
            className="min-h-[44px] px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/20 text-[#F5A623] border border-white/25 font-black text-xs flex items-center gap-2 transition active:scale-95 shadow-warm-xs"
          >
            <Edit2 className="w-4 h-4" />
            <span>{isEditing ? 'Cancel Edit' : t.editProfile}</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="bg-[#EDF5EB] border border-[#4A7C3F]/40 text-[#2D4F26] px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-warm-xs">
          <Check className="w-4 h-4 text-[#4A7C3F]" />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {/* Profile Edit Form */}
      {isEditing && (
        <form onSubmit={handleSave} className="bg-[#FFFDF9] rounded-[24px] border border-[#C1622D]/15 p-6 shadow-warm-sm space-y-4">
          <h3 className="font-black text-base text-[#2E2118] mb-2">Edit Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#2E2118] mb-1">{t.farmerName}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-2xl border border-amber-200/80 bg-white text-sm font-semibold text-[#2E2118] focus:outline-none focus:ring-2 focus:ring-[#C1622D]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2E2118] mb-1">{t.farmLocation}</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-2xl border border-amber-200/80 bg-white text-sm font-semibold text-[#2E2118] focus:outline-none focus:ring-2 focus:ring-[#C1622D]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2E2118] mb-1">{t.farmSize}</label>
              <input
                type="text"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-2xl border border-amber-200/80 bg-white text-sm font-semibold text-[#2E2118] focus:outline-none focus:ring-2 focus:ring-[#C1622D]"
                placeholder="e.g. 4.5 Acres"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#2E2118] mb-1">Phone Number</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full min-h-[44px] px-3.5 py-2.5 rounded-2xl border border-amber-200/80 bg-white text-sm font-semibold text-[#2E2118] focus:outline-none focus:ring-2 focus:ring-[#C1622D]"
                placeholder="+91 98765 43210"
              />
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-[#C1622D] hover:bg-[#B05524] text-white font-black text-xs flex items-center gap-2 shadow-warm-sm transition active:scale-95"
            >
              <Save className="w-4 h-4" />
              <span>{t.saveChanges}</span>
            </button>
          </div>
        </form>
      )}

      {/* Language Preference Section */}
      <div className="bg-[#FFFDF9] rounded-[24px] border border-[#C1622D]/15 p-6 shadow-warm-sm space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-2xl bg-[#FBF3E7] text-[#C1622D] flex items-center justify-center font-black border border-amber-200/60 shadow-xs">
            <Languages className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-black text-base text-[#2E2118]">{t.selectLanguage}</h3>
            <p className="text-xs text-stone-600 font-medium">All translations & voice recognition will use this language</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          {languagesList.map((item) => {
            const isSelected = item.code === language;
            return (
              <button
                key={item.code}
                onClick={() => setLanguage(item.code as Language)}
                className={`min-h-[48px] p-3 rounded-2xl border text-left flex items-center justify-between transition active:scale-95 ${
                  isSelected
                    ? 'bg-[#FFF8EE] border-[#C1622D] text-[#C1622D] font-black shadow-warm-xs ring-2 ring-[#C1622D]/20'
                    : 'bg-white hover:bg-[#FBF3E7] border-amber-200/60 text-[#2E2118] font-bold'
                }`}
              >
                <div>
                  <div className="text-sm font-extrabold">{item.nativeName}</div>
                  <div className="text-[10px] text-stone-500 font-medium">{item.label}</div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#C1622D] stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Voice Assistant Guide Card */}
      <div className="bg-gradient-to-r from-[#FFF8EE] to-[#FDECCB] border border-[#E8A93D]/50 rounded-[24px] p-5 shadow-warm-xs space-y-2">
        <div className="flex items-center gap-2 font-black text-sm text-[#2E2118]">
          <Mic className="w-4 h-4 text-[#C1622D]" />
          <span>Voice Input Tips for Easy Farming Use</span>
        </div>
        <p className="text-xs text-stone-700 leading-relaxed font-medium">
          You don't need to type on small phone keyboards. Tap the microphone icon anywhere in the app and speak naturally in your mother tongue:
        </p>
        <ul className="text-xs text-[#2E2118] list-disc list-inside space-y-1 font-bold pl-1">
          <li>"500 kilo tamatar" / "500 kg tomato"</li>
          <li>"10 quintal onion"</li>
          <li>"15 quintal sugarcane"</li>
        </ul>
      </div>

      {/* Government Kisan Call Center Helpline */}
      <div className="bg-[#2D4F26] text-white rounded-[24px] p-6 shadow-warm-md border border-[#4A7C3F]/40 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#E8A93D] text-[#2E2118] flex items-center justify-center font-black text-lg shadow-xs">
            📞
          </div>
          <div>
            <h4 className="font-black text-base text-white">{t.kisanHelpline}</h4>
            <p className="text-xs text-[#EDF5EB] font-medium">Free 24x7 expert agricultural advice in your local language</p>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-black/15 p-4 rounded-2xl border border-white/10">
          <div>
            <div className="text-xs text-[#E8A93D] font-bold">Toll-Free Government Hotline</div>
            <div className="text-xl font-black text-white tracking-wide">1800-180-1551</div>
          </div>

          <a
            href="tel:18001801551"
            className="min-h-[44px] px-5 py-2.5 rounded-2xl bg-[#E8A93D] hover:bg-[#D9992E] text-[#2E2118] font-black text-xs flex items-center gap-2 shadow-warm-sm transition active:scale-95"
          >
            <PhoneCall className="w-4 h-4" />
            <span>Call Helpline Now</span>
          </a>
        </div>
      </div>
    </div>
  );
};
