import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Volume2, X, Sparkles, ArrowRight, CornerDownLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const VoiceAssistantModal: React.FC = () => {
  const { isVoiceModalOpen, setIsVoiceModalOpen, t, language, executeVoiceIntent, speakText } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [lastResponse, setLastResponse] = useState<{ action: string; reply: string } | null>(null);
  const [micSupported, setMicSupported] = useState(true);
  const recognitionRef = useRef<any>(null);

  // Sample prompt chips tailored to current language
  const samplePromptsByLang: Record<Language, string[]> = {
    en: [
      "I have 500 kilograms of tomatoes",
      "What is today's tomato price?",
      "Where can I sell my tomatoes?",
      "Which market gives me more return?",
      "How much did I earn this month?",
      "What crops are in season?"
    ],
    hi: [
      "मेरे पास 500 किलो टमाटर हैं",
      "आज टमाटर का क्या भाव है?",
      "टमाटर कहाँ बेचने पर ज़्यादा बचत होगी?",
      "इस महीने मेरी कितनी कमाई हुई?",
      "अभी कौन सी फसल का मौसम है?"
    ],
    ta: [
      "என்னிடம் 500 கிலோ தக்காளி உள்ளது",
      "இன்றைய தக்காளி விலை என்ன?",
      "எந்த சந்தையில் அதிக லாபம் கிடைக்கும்?",
      "இந்த மாதம் என் வருமானம் எவ்வளவு?",
      "தற்போது எந்த பயிர் பருவம்?"
    ],
    te: [
      "నా దగ్గర 500 కేజీల టమోటాలు ఉన్నాయి",
      "ఈరోజు టమోటా ధర ఎంత?",
      "ఏ మార్కెట్లో ఎక్కువ లాభం వస్తుంది?",
      "ఈ నెల నా ఆదాయం ఎంత?",
      "ఇప్పుడు ఏ పంటల సీజన్?"
    ],
    kn: [
      "ನನ್ನ ಬಳಿ 500 ಕೆಜಿ ಟೊಮೆಟೊ ಇದೆ",
      "ಇಂದು ಟೊಮೆಟೊ ಬೆಲೆ ಎಷ್ಟು?",
      "ಯಾವ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ಹೆಚ್ಚು ಲಾಭವಿದೆ?",
      "ಈ ತಿಂಗಳು ನನ್ನ ಗಳಿಕೆ ಎಷ್ಟು?",
      "ಈಗ ಯಾವ ಬೆಳೆಯ ಕಾಲ?"
    ],
    ml: [
      "എന്റെ പക്കൽ 500 കിലോഗ്രാം തക്കാളി ഉണ്ട്",
      "ഇന്നത്തെ തക്കാളി വില എത്രയാണ്?",
      "ഏത് ചന്തയിലാണ് കൂടുതൽ ലാഭം കിട്ടുക?",
      "ഈ മാസം എന്റെ വരുമാനം എത്രയായി?",
      "ഇപ്പോൾ ഏത് വിളയുടെ സീസൺ ആണ്?"
    ]
  };

  const samplePrompts = samplePromptsByLang[language] || samplePromptsByLang.en;

  // Initialize Web Speech API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        
        const langMap: Record<Language, string> = {
          en: 'en-IN',
          hi: 'hi-IN',
          ta: 'ta-IN',
          te: 'te-IN',
          kn: 'kn-IN',
          ml: 'ml-IN'
        };
        recognition.lang = langMap[language] || 'en-IN';

        recognition.onstart = () => {
          setIsListening(true);
        };

        recognition.onresult = (event: any) => {
          const current = event.resultIndex;
          const text = event.results[current][0].transcript;
          setTranscript(text);
        };

        recognition.onerror = (event: any) => {
          console.warn('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        setMicSupported(false);
      }
    }
  }, [language]);

  // Auto-start listening when modal opens
  useEffect(() => {
    if (isVoiceModalOpen) {
      setTranscript('');
      setLastResponse(null);
      startListening();
    } else {
      stopListening();
    }
  }, [isVoiceModalOpen]);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (err) {
        // already started
      }
    }
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // ignore
      }
    }
    setIsListening(false);
  };

  const handleProcessSpeech = (textToProcess: string) => {
    if (!textToProcess.trim()) return;
    stopListening();
    setTranscript(textToProcess);
    const result = executeVoiceIntent(textToProcess);
    setLastResponse({
      action: result.actionDescription,
      reply: result.spokenReply
    });

    // Automatically close modal after 3 seconds so user can see the resulting screen, or user can close manually
    setTimeout(() => {
      setIsVoiceModalOpen(false);
    }, 2800);
  };

  if (!isVoiceModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-100 animate-in slide-in-from-bottom duration-300">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-800 p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-400 text-slate-900 flex items-center justify-center font-bold">
              <Mic className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">{t.voiceHelperTitle}</h3>
              <p className="text-[11px] text-emerald-200">{t.voiceHelperSubtitle}</p>
            </div>
          </div>
          <button
            onClick={() => setIsVoiceModalOpen(false)}
            className="p-1.5 rounded-full hover:bg-white/20 transition text-emerald-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Central Listening / Speaking Wave */}
        <div className="p-6 text-center bg-gradient-to-b from-emerald-50/50 to-white flex flex-col items-center">
          <div className="relative mb-4">
            {isListening && (
              <>
                <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-30"></div>
                <div className="absolute -inset-3 rounded-full bg-amber-300 animate-pulse opacity-40"></div>
              </>
            )}
            <button
              id="voice-mic-main-button"
              onClick={() => {
                if (isListening) {
                  stopListening();
                  if (transcript) handleProcessSpeech(transcript);
                } else {
                  startListening();
                }
              }}
              className={`relative z-10 w-20 h-20 rounded-full flex items-center justify-center shadow-xl transition transform active:scale-95 ${
                isListening
                  ? 'bg-gradient-to-br from-emerald-600 to-teal-600 text-white ring-4 ring-amber-300'
                  : 'bg-emerald-800 text-white hover:bg-emerald-700'
              }`}
            >
              <Mic className="w-9 h-9" />
            </button>
          </div>

          <p className="text-sm font-semibold text-emerald-900 mb-1">
            {isListening ? t.listening : t.tapToSpeak}
          </p>
          <p className="text-xs text-gray-500 max-w-xs">
            {t.appName} understands your crop & returns the best market options instantly.
          </p>

          {/* Transcript / Spoken Result Box */}
          <div className="mt-4 w-full bg-white border border-emerald-100 rounded-2xl p-3.5 shadow-sm text-left min-h-[70px] flex flex-col justify-center">
            {transcript ? (
              <div>
                <p className="text-[11px] uppercase tracking-wider font-bold text-emerald-700 mb-0.5">
                  You said:
                </p>
                <p className="text-sm font-bold text-slate-800">
                  "{transcript}"
                </p>
              </div>
            ) : (
              <p className="text-xs text-gray-400 italic text-center">
                "{samplePrompts[0]}"
              </p>
            )}

            {lastResponse && (
              <div className="mt-2.5 pt-2 border-t border-emerald-50 flex items-start gap-2 bg-emerald-50/60 p-2 rounded-xl">
                <Volume2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-emerald-900">{lastResponse.action}</p>
                  <p className="text-xs text-emerald-800 mt-0.5">{lastResponse.reply}</p>
                </div>
              </div>
            )}
          </div>

          {transcript && !lastResponse && (
            <button
              onClick={() => handleProcessSpeech(transcript)}
              className="mt-3 w-full py-2.5 px-4 bg-emerald-800 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow transition"
            >
              <span>Process: "{transcript}"</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Quick Tap Suggested Commands (Accessibility: 1-Tap Execution) */}
        <div className="p-4 bg-gray-50 border-t border-gray-100">
          <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            {t.tryAsking}
          </p>
          <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
            {samplePrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleProcessSpeech(prompt)}
                className="text-left text-xs bg-white hover:bg-emerald-50 text-slate-800 hover:text-emerald-900 py-2 px-3 rounded-xl border border-gray-200 hover:border-emerald-300 font-medium transition flex items-center justify-between group active:scale-[0.99]"
              >
                <span className="truncate pr-2">"{prompt}"</span>
                <span className="text-emerald-600 font-bold opacity-0 group-hover:opacity-100 transition text-[11px] shrink-0">
                  Tap to ask →
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
