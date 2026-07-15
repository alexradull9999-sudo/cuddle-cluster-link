import React, { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";

interface SliderStep {
  name: string;
  dbReduction: number;
  intelligibilityOutside: number;
  intelligibilityInside: number;
  subtextOutside: string;
  subtextInside: string;
}

const SLIDER_STEPS: SliderStep[] = [
  {
    name: "ОФИС 1",
    dbReduction: 32,
    intelligibilityOutside: 92,
    intelligibilityInside: 16,
    subtextOutside: "Соседям слышно почти каждое слово",
    subtextInside: "За дверью остается неразборчивый фон"
  },
  {
    name: "ТОП 1.5",
    dbReduction: 35,
    intelligibilityOutside: 92,
    intelligibilityInside: 12,
    subtextOutside: "Слышен каждый звонок и разговор",
    subtextInside: "Идеально для конфиденциальных звонков"
  },
  {
    name: "ОФИС 2",
    dbReduction: 38,
    intelligibilityOutside: 94,
    intelligibilityInside: 8,
    subtextOutside: "Шумная переговорка мешает работать",
    subtextInside: "Полная изоляция от общего зала"
  },
  {
    name: "ТОП 2",
    dbReduction: 45,
    intelligibilityOutside: 95,
    intelligibilityInside: 4,
    subtextOutside: "Громкие споры отвлекают всю команду",
    subtextInside: "Абсолютная акустическая автономия"
  }
];

export default function SoundSimulator() {
  const [sliderIndex, setSliderIndex] = useState<number>(1); // Default to ТОП 1.5
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  
  // Web Audio API refs for interactive synthesizer sound simulation
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  const activeStep = SLIDER_STEPS[sliderIndex];

  // Synth noise helper
  const startNoise = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Generate pink/white noise buffer
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      const source = ctx.createBufferSource();
      source.buffer = noiseBuffer;
      source.loop = true;

      // Lowpass filter to simulate muffled cabin sound
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      // Muffle based on isolation
      const cutoffFreq = 180 + (45 - activeStep.dbReduction) * 10;
      filter.frequency.setValueAtTime(cutoffFreq, ctx.currentTime);

      const gain = ctx.createGain();
      // Muffle volume based on dB reduction
      const vol = Math.pow(10, (-activeStep.dbReduction) / 20) * 0.45;
      gain.gain.setValueAtTime(vol, ctx.currentTime);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      source.start();

      sourceNodeRef.current = source;
      filterNodeRef.current = filter;
      gainNodeRef.current = gain;
      setIsAudioPlaying(true);
    } catch (e) {
      console.error("Audio synthesis blocked or not supported:", e);
      setIsAudioPlaying(true);
    }
  };

  const stopNoise = () => {
    try {
      if (sourceNodeRef.current) {
        sourceNodeRef.current.stop();
        sourceNodeRef.current = null;
      }
      setIsAudioPlaying(false);
    } catch (e) {
      setIsAudioPlaying(false);
    }
  };

  // Dynamically update audio parameters when slider moves
  useEffect(() => {
    if (isAudioPlaying && audioCtxRef.current && filterNodeRef.current && gainNodeRef.current) {
      const ctx = audioCtxRef.current;
      const cutoffFreq = 180 + (45 - activeStep.dbReduction) * 10;
      const vol = Math.pow(10, (-activeStep.dbReduction) / 20) * 0.45;

      filterNodeRef.current.frequency.exponentialRampToValueAtTime(cutoffFreq, ctx.currentTime + 0.3);
      gainNodeRef.current.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.3);
    }
  }, [sliderIndex, isAudioPlaying]);

  useEffect(() => {
    return () => {
      if (sourceNodeRef.current) {
        try {
          sourceNodeRef.current.stop();
        } catch (e) {}
      }
    };
  }, []);

  return (
    <section 
      className="py-20 sm:py-28 bg-[#FAF9F5] text-zinc-900 relative border-t border-zinc-200/50"
      id="soundproof-test-block"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Title Block */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]" id="silence-heading">
            Посмотрите, как <br className="hidden sm:inline" /> работает тишина
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 leading-relaxed font-normal">
            Перетащите ползунок - увидите, как изменяется громкость снаружи и внутри <br className="hidden md:inline" />
            кабины. Убедиться можно в нашем шоуруме в СПб.
          </p>
        </div>

        {/* Immersive Main Card */}
        <div 
          className="bg-white rounded-[32px] border border-zinc-200/70 p-6 sm:p-10 md:p-12 shadow-sm relative overflow-hidden"
          id="silence-card-container"
        >
          {/* Top Half: Comparison Waveforms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start pb-10 border-b border-zinc-100">
            
            {/* Left Column: Outside */}
            <div className="flex flex-col h-full justify-between" id="outside-pane">
              <div>
                <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">
                  OPEN SPACE ОФИС
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mt-1.5 mb-2">
                  Снаружи кабины
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  Разговоры, клавиатуры, телефоны, вентиляция. Типовой шум open-space 55-65 дБ.
                </p>
              </div>

              {/* Outside Tall Black Waveform */}
              <div className="mt-8 h-24 flex items-center justify-between gap-[3px] bg-zinc-50/50 rounded-2xl p-4 border border-zinc-100 overflow-hidden relative">
                {[...Array(48)].map((_, idx) => {
                  // Generate an organic sine shape for the outer open space noise
                  const angle = idx * 0.35;
                  const heightFactor = Math.abs(Math.sin(angle) * 0.7) + 0.15;
                  const baseHeight = 24 + heightFactor * 52;

                  return (
                    <motion.div
                      key={`out-${idx}`}
                      className="w-[3px] bg-zinc-950 rounded-full"
                      animate={{
                        height: [baseHeight * 0.85, baseHeight * 1.15, baseHeight * 0.85],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 1.2 + Math.sin(idx) * 0.4,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}
              </div>
            </div>

            {/* Right Column: Inside Cabin */}
            <div className="flex flex-col h-full justify-between" id="inside-pane">
              <div>
                <span className="text-[10px] font-bold text-[#3b82f6] tracking-widest uppercase">
                  ВНУТРИ ACUCAB
                </span>
                <h3 className="text-xl font-bold text-zinc-950 mt-1.5 mb-2">
                  То же место, но в кабине
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                  Голоса снаружи теряют разборчивость. Можно сосредоточиться, говорить, слышать собеседника.
                </p>
              </div>

              {/* Inside Low Blue Muffled Waveform (Heights scale based on sliderIndex/dbReduction) */}
              <div className="mt-8 h-24 flex items-center justify-between gap-[3px] bg-zinc-50/50 rounded-2xl p-4 border border-zinc-100 overflow-hidden relative">
                {[...Array(48)].map((_, idx) => {
                  const angle = idx * 0.35;
                  // Inner noise is damped. Height decreases as dbReduction goes up
                  const dampingMultiplier = Math.max(0.08, (50 - activeStep.dbReduction) / 45);
                  const heightFactor = Math.abs(Math.cos(angle) * 0.35) + 0.1;
                  const baseHeight = (10 + heightFactor * 32) * dampingMultiplier;

                  return (
                    <motion.div
                      key={`in-${idx}`}
                      className="w-[3px] bg-[#3b82f6] rounded-full"
                      animate={{
                        height: [baseHeight * 0.8, baseHeight * 1.2, baseHeight * 0.8],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.2 + Math.cos(idx) * 0.6,
                        ease: "easeInOut"
                      }}
                    />
                  );
                })}
              </div>
            </div>

          </div>

          {/* Middle Row: Slider Track & Decibel display */}
          <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center border-b border-zinc-100">
            
            {/* Slider Track Control */}
            <div className="lg:col-span-8 flex flex-col relative" id="slider-track-wrap">
              <input
                type="range"
                min="0"
                max={SLIDER_STEPS.length - 1}
                value={sliderIndex}
                onChange={(e) => setSliderIndex(parseInt(e.target.value))}
                className="w-full h-1 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-[#3b82f6] focus:outline-none focus:ring-1 focus:ring-[#3b82f6]"
                id="silence-slider"
                aria-label="Выбор модели кабины для теста тишины"
              />

              {/* Tick Labels under the slider */}
              <div className="flex justify-between mt-4 px-1 text-[11px] font-bold text-zinc-400 uppercase tracking-wider">
                {SLIDER_STEPS.map((step, idx) => (
                  <button
                    key={step.name}
                    onClick={() => setSliderIndex(idx)}
                    className={`transition-colors duration-200 cursor-pointer ${
                      idx === sliderIndex ? "text-[#3b82f6] font-black" : "hover:text-zinc-600"
                    }`}
                  >
                    {step.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Big Decibel Badge */}
            <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-2 shrink-0">
              <span className="text-4xl sm:text-5xl font-black font-sans text-[#3b82f6] tracking-tight transition-all duration-300">
                {activeStep.dbReduction} дБ
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 font-medium leading-tight">
                снижения <br /> громкости
              </span>
            </div>

          </div>

          {/* Bottom Half: Speech Intelligibility meters */}
          <div className="pt-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
            
            {/* Left Intelligibility progress */}
            <div className="flex flex-col justify-between" id="outside-intelligibility">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-bold text-zinc-800">
                  Разборчивость речи снаружи
                </span>
                <span className="text-base sm:text-lg font-black text-zinc-950 font-mono">
                  {activeStep.intelligibilityOutside}%
                </span>
              </div>
              
              {/* Black bar */}
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden mb-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${activeStep.intelligibilityOutside}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-zinc-950 rounded-full" 
                />
              </div>

              <span className="text-xs text-zinc-400 font-normal">
                {activeStep.subtextOutside}
              </span>
            </div>

            {/* Right Intelligibility progress */}
            <div className="flex flex-col justify-between" id="inside-intelligibility">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs sm:text-sm font-bold text-zinc-800">
                  ...после установки кабины
                </span>
                <span className="text-base sm:text-lg font-black text-[#3b82f6] font-mono transition-colors">
                  {activeStep.intelligibilityInside}%
                </span>
              </div>
              
              {/* Blue bar */}
              <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden mb-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${activeStep.intelligibilityInside}%` }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full bg-[#3b82f6] rounded-full" 
                />
              </div>

              <span className="text-xs text-zinc-400 font-normal">
                {activeStep.subtextInside}
              </span>
            </div>

          </div>

          {/* Optional Ambient Synth Audio Player Widget positioned subtlely */}
          <div className="absolute right-6 top-6 sm:right-10 sm:top-10 flex items-center gap-2">
            <button
              onClick={isAudioPlaying ? stopNoise : startNoise}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer border ${
                isAudioPlaying 
                  ? "bg-red-500 hover:bg-red-600 text-white border-red-500 shadow-md" 
                  : "bg-white hover:bg-zinc-50 text-zinc-500 hover:text-zinc-900 border-zinc-200"
              }`}
              title="Прослушать симуляцию шума"
            >
              {isAudioPlaying ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
