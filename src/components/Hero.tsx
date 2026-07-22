import React from "react";
import { motion } from "motion/react";

interface HeroProps {
  onCalculateClick: () => void;
  onExploreModelsClick: () => void;
}

const CITIES = [
  "Минск",
  "Ташкент",
  "Москва",
  "Санкт-Петербург",
  "Екатеринбург",
  "Новосибирск",
  "Казань",
  "Краснодар",
  "Нижний Новгород",
  "Самара",
  "Челябинск",
  "Уфа",
  "Ростов-на-Дону"
];

export default function Hero({ onCalculateClick, onExploreModelsClick }: HeroProps) {
  return (
    <section 
      className="relative h-screen lg:h-[100dvh] min-h-[640px] flex flex-col justify-between pt-20 sm:pt-24 bg-zinc-950 text-white overflow-hidden"
      id="hero-section"
    >
      {/* Background Image with elegant overlay to match screenshot */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/hero-office-pod-wide.png" 
          alt="Modern office with acoustic cabins" 
          className="w-full h-full object-cover object-center opacity-[0.92] scale-100 filter brightness-[0.78] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Precise linear overlay: dark at the top (for header contrast) and dark at the bottom (for section transition) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-zinc-950" />
      </div>

      {/* Decorative subtle ambient lights */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Content Area (Centered vertically in the remaining space) */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 flex-grow flex flex-col justify-center py-4 sm:py-6 lg:py-8">
        
        {/* Status Chips Row */}
        <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 sm:mb-8 lg:mb-10" id="hero-status-chips">
          {/* Left Chip: Showroom Status (Solid White) */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center space-x-2 bg-white text-zinc-900 border border-zinc-200 rounded-full py-2 px-4.5 text-xs font-semibold shadow-md shrink-0"
          >
            <span className="h-2 w-2 rounded-full bg-[#10B981]" />
            <span className="font-sans">Шоурум открыт</span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-500 font-normal">СПб, пр. Обуховской обороны 86к · Пн-Пт 10:00–18:00</span>
          </motion.div>

          {/* Right Chips Container (Dark Translucent) */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-wrap gap-3"
          >
            <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full py-2 px-4 text-xs font-semibold text-white shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <span>Звукопоглощение до 60 дБ</span>
            </div>
            
            <div className="flex items-center space-x-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-full py-2 px-4 text-xs font-semibold text-white shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#10B981]" />
              <span>Расчет проекта в день обращения</span>
            </div>
          </motion.div>
        </div>

        {/* Hero Content */}
        <div className="max-w-5xl" id="hero-core-content">
          <motion.h1 
            className="font-sans font-black text-[2.5rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[5.75rem] leading-[1.03] tracking-tight text-white select-none drop-shadow-sm"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            id="hero-main-title"
          >
            Важные решения <br />
            без лишнего шума
          </motion.h1>

          <motion.p 
            className="mt-4 sm:mt-5 text-sm sm:text-base md:text-lg lg:text-xl font-medium text-zinc-100/90 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            id="hero-subtitle"
          >
            Акустические кабины Российского производства.<br />
            От фокус-зоны до целой команды.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            id="hero-buttons-container"
          >
            {/* Primary Action */}
            <button 
              onClick={onCalculateClick}
              className="px-8 py-3.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold rounded-full flex items-center justify-center space-x-1.5 transition-all shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/35 cursor-pointer text-sm sm:text-base"
              id="hero-primary-cta"
            >
              <span>Получить расчет</span>
              <span className="text-base font-light">→</span>
            </button>

            {/* Secondary Action */}
            <button 
              onClick={onExploreModelsClick}
              className="px-8 py-3.5 bg-transparent hover:bg-white/10 border border-white/40 hover:border-white/60 text-white font-medium rounded-full flex items-center justify-center transition-all cursor-pointer text-sm sm:text-base"
              id="hero-secondary-cta"
            >
              <span>Посмотреть модели</span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Cities Ticker Bar (Pinned at the absolute bottom of the Hero screen) */}
      <div 
        className="relative z-20 w-full bg-white/95 border-t border-zinc-200 py-3 sm:py-4 px-6 shrink-0" 
        id="cities-ticker-bar"
      >
        <div className="max-w-7xl mx-auto flex items-center gap-6">
          {/* Left Label */}
          <div className="flex items-center space-x-4 shrink-0" id="ticker-label-container">
            <div className="text-[10px] sm:text-[11px] font-sans font-bold tracking-wider text-zinc-500 uppercase leading-snug">
              <div>ГОРОДА, ГДЕ ВАЖНА</div>
              <div>ТИШИНА</div>
            </div>
            <div className="h-8 w-px bg-zinc-200" />
          </div>

          {/* Marquee Container */}
          <div className="flex-grow overflow-hidden relative" id="ticker-cities-container">
            {/* Smooth mask to fade edges */}
            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/95 to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/95 to-transparent z-10 pointer-events-none" />
            
            <div className="flex overflow-hidden whitespace-nowrap select-none">
              {/* First Track */}
              <div className="flex shrink-0 gap-16 items-center min-w-full justify-around animate-infinite-scroll">
                {CITIES.map((city, idx) => (
                  <span 
                    key={`city-1-${idx}`} 
                    className="text-sm sm:text-base font-sans font-medium text-zinc-600 hover:text-indigo-600 transition-colors cursor-default"
                  >
                    {city}
                  </span>
                ))}
              </div>
              {/* Duplicate Track for seamless looping */}
              <div className="flex shrink-0 gap-16 items-center min-w-full justify-around animate-infinite-scroll" aria-hidden="true">
                {CITIES.map((city, idx) => (
                  <span 
                    key={`city-2-${idx}`} 
                    className="text-sm sm:text-base font-sans font-medium text-zinc-600 hover:text-indigo-600 transition-colors cursor-default"
                  >
                    {city}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
