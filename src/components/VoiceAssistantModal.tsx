import React from 'react';
import { useApp } from '../context/AppContext';
import { Mic, X, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

export const VoiceAssistantModal: React.FC = () => {
  const {
    showVoiceModal,
    setShowVoiceModal,
    isListening,
    voiceTranscript,
    voiceFeedbackMessage,
    startVoiceInput,
    stopVoiceInput,
    t,
    voiceField,
    setSelectedCropId,
    setQuantityKg,
    setLocation,
    setActiveTab
  } = useApp();

  if (!showVoiceModal) return null;

  const sampleVoiceChips = [
    { label: '500 kg Tomato', cropId: 'tomato', qty: 500 },
    { label: '1000 kg Onion', cropId: 'onion', qty: 1000 },
    { label: '15 Quintal Wheat', cropId: 'wheat', qty: 1500 },
    { label: '800 kg Potato', cropId: 'potato', qty: 800 },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#2E2118]/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FFFDF9] rounded-[24px] max-w-md w-full shadow-warm-lg overflow-hidden border border-[#C1622D]/20 animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#2D4F26] via-[#3A6331] to-[#C1622D] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-[#E8A93D] text-[#2E2118] flex items-center justify-center font-black shadow-xs">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm text-white">Voice Assistant</h3>
              <p className="text-[11px] text-[#EDF5EB] font-medium">
                {voiceField ? `Listening for ${voiceField}...` : 'Speak crop, quantity, or location'}
              </p>
            </div>
          </div>

          <button
            onClick={stopVoiceInput}
            className="w-10 h-10 rounded-full hover:bg-white/10 text-white flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Listening Animation & Visualizer */}
        <div className="p-6 text-center space-y-5">
          <div className="relative inline-flex items-center justify-center">
            {/* Pulsing glow rings */}
            {isListening && (
              <>
                <div className="absolute w-28 h-28 rounded-full bg-[#E8A93D]/30 animate-ping" />
                <div className="absolute w-20 h-20 rounded-full bg-[#C1622D]/30 animate-pulse" />
              </>
            )}

            <button
              onClick={() => (isListening ? stopVoiceInput() : startVoiceInput())}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center text-white shadow-warm-md transition-transform active:scale-95 ${
                isListening ? 'bg-rose-600 ring-4 ring-rose-200' : 'bg-[#C1622D] hover:bg-[#B05524]'
              }`}
            >
              <Mic className={`w-8 h-8 ${isListening ? 'animate-bounce' : ''}`} />
            </button>
          </div>

          <div>
            <h4 className="font-black text-[#2E2118] text-base">
              {isListening ? t.listening : 'Tap microphone to speak'}
            </h4>
            <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto font-medium">
              {voiceFeedbackMessage || t.speakPrompt}
            </p>
          </div>

          {/* Transcript preview box */}
          {voiceTranscript && (
            <div className="bg-[#FFF8EE] border border-[#E8A93D] rounded-2xl p-3.5 text-xs text-[#2E2118] font-black flex items-center justify-center gap-2 shadow-warm-xs">
              <Sparkles className="w-4 h-4 text-[#C1622D] shrink-0" />
              <span>"{voiceTranscript}"</span>
            </div>
          )}

          {/* Quick Voice Chips (Low literacy convenience) */}
          <div className="pt-2 border-t border-amber-100">
            <span className="text-[11px] font-bold text-stone-500 block mb-2.5">
              Or tap a quick harvest preset:
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              {sampleVoiceChips.map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedCropId(chip.cropId);
                    setQuantityKg(chip.qty);
                    stopVoiceInput();
                    setActiveTab('compare');
                  }}
                  className="min-h-[40px] px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#FBF3E7] hover:bg-[#F4E8D6] hover:text-[#C1622D] border border-amber-200/80 text-[#2E2118] transition active:scale-95"
                >
                  🌾 {chip.label}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={stopVoiceInput}
            className="w-full min-h-[44px] py-2.5 rounded-2xl bg-[#E8A93D] hover:bg-[#D9992E] text-[#2E2118] text-xs font-black shadow-warm-sm transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
