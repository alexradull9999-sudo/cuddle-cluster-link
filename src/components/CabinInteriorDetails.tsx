import React, { useState } from "react";
import { motion } from "motion/react";
import cabinImage from "@/assets/cabin-office.png.asset.json";


interface FeatureItem {
  id: string;
  category: string;
  title: string;
  description: string;
}

const LEFT_FEATURES: FeatureItem[] = [
  {
    id: "sandwich",
    category: "Сэндвич",
    title: "Четырехслойная звукоизоляция",
    description: "Слои с разной плотностью гасят резонанс и поглощают речь."
  },
  {
    id: "glass",
    category: "Стекло",
    title: "Триплекс с демпфером",
    description: "Прозрачность не ослабляет акустику."
  },
  {
    id: "door",
    category: "Дверь",
    title: "Герметизация периметра",
    description: "Слабое место типовых кабин закрыто."
  },
  {
    id: "ventilation",
    category: "Вентиляция",
    title: "Принудительный воздухообмен",
    description: "Можно работать 2-4 часа без духоты."
  }
];

const RIGHT_FEATURES: FeatureItem[] = [
  {
    id: "lighting",
    category: "Освещение",
    title: "Регулируемое LED",
    description: "2700-6500K, без ШИМ."
  },
  {
    id: "electric",
    category: "Электрика",
    title: "220B · USB · USB-C · Qi",
    description: "В стандартной комплектации."
  },
  {
    id: "finish",
    category: "Внешняя отделка",
    title: "Сменные панели",
    description: "Цвет, материал, фактура — под интерьер."
  },
  {
    id: "base",
    category: "Основание",
    title: "Регулируемые опоры",
    description: "Компенсация неровностей пола до 30 мм."
  }
];

export default function CabinInteriorDetails() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Dynamic values or descriptions based on active highlighted hotspot
  const getInsideDbValue = () => {
    switch (hoveredId) {
      case "sandwich": return "28 дБ";
      case "glass": return "32 дБ";
      case "door": return "29 дБ";
      case "ventilation": return "30 дБ (Тихо)";
      default: return "30 дБ";
    }
  };

  return (
    <section 
      className="py-20 sm:py-28 bg-[#EFEFEA] text-zinc-900 relative border-t border-zinc-200/60 overflow-hidden"
      id="cabin-inside-details"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.08]" id="inside-heading">
            Что внутри
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 max-w-2xl font-normal leading-relaxed">
            Кабина — это продуманные компоненты, где каждый решает свою задачу. <br className="hidden md:inline" />
            Шум офиса проходит 6 слоев и теряет до 30 дБ.
          </p>
        </div>

        {/* Interactive Layout: Left Cards | Center Visualizer | Right Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column Features */}
          <div className="lg:col-span-4 flex flex-col gap-8 md:gap-10 order-2 lg:order-1">
            {LEFT_FEATURES.map((feat) => (
              <div
                key={feat.id}
                onMouseEnter={() => setHoveredId(feat.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`transition-all duration-300 border-l-2 pl-5 cursor-pointer py-1 ${
                  hoveredId === feat.id 
                    ? "border-indigo-600 translate-x-1.5" 
                    : "border-zinc-300 hover:border-zinc-400"
                }`}
                id={`feat-left-${feat.id}`}
              >
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-1">
                  {feat.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
                  {feat.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center Column: Interactive Cabin Cross Section */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center py-6 order-1 lg:order-2">
            <div className="relative w-full max-w-[340px] aspect-[4/5] flex items-center justify-center">
              
              {/* Left Wave Arc (Office Noise 60 dB) */}
              <div className="absolute left-[-50px] top-1/2 -translate-y-1/2 flex flex-col items-center select-none" id="soundwave-left-indicator">
                {/* 3 stacked curved arcs to simulate wave motion */}
                <div className="relative w-12 h-24 flex items-center justify-center">
                  <motion.div 
                    animate={{ scale: [1, 1.12, 1], opacity: [0.35, 0.7, 0.35] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute right-0 w-8 h-20 border-r-2 border-zinc-400/40 rounded-full" 
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.4, ease: "easeInOut" }}
                    className="absolute right-3 w-6 h-14 border-r-2 border-zinc-500/50 rounded-full" 
                  />
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ repeat: Infinity, duration: 2, delay: 0.8, ease: "easeInOut" }}
                    className="absolute right-5 w-4 h-8 border-r-2 border-zinc-600/70 rounded-full" 
                  />
                </div>
                <span className="text-[9px] font-bold tracking-widest uppercase text-zinc-400 mt-2">Шум офиса</span>
                <span className="text-xl font-black text-zinc-800 leading-none mt-1">60 дБ</span>
              </div>

              {/* Cabin Shell Container */}
              <div 
                className={`relative w-[210px] h-[340px] rounded-[28px] bg-zinc-950 shadow-2xl border-[10px] border-zinc-800/95 transition-all duration-500 flex flex-col overflow-hidden ${
                  hoveredId === "finish" ? "ring-4 ring-indigo-500/30 border-zinc-700" : ""
                }`}
                id="cabin-interactive-shell"
              >
                {/* Left cross-section cut showing layers (Pirog) */}
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-8 bg-zinc-900 border-r border-zinc-850 flex transition-all duration-300 z-10 ${
                    hoveredId === "sandwich" ? "bg-indigo-950/40 border-r-indigo-500" : ""
                  }`}
                  id="cabin-sandwich-layer"
                >
                  {/* Visualizing 4 distinct thin dense layers inside the cut */}
                  <div className="w-full h-full flex px-1 py-4 gap-[2px]">
                    <div className={`h-full w-1 rounded-full transition-all duration-300 ${hoveredId === "sandwich" ? "bg-indigo-400" : "bg-zinc-700"}`} />
                    <div className={`h-full w-1 rounded-full transition-all duration-300 ${hoveredId === "sandwich" ? "bg-indigo-500" : "bg-zinc-600"}`} />
                    <div className={`h-full w-1 rounded-full transition-all duration-300 ${hoveredId === "sandwich" ? "bg-indigo-300" : "bg-zinc-500"}`} />
                    <div className={`h-full w-1 rounded-full transition-all duration-300 ${hoveredId === "sandwich" ? "bg-indigo-600 animate-pulse" : "bg-zinc-800"}`} />
                  </div>
                </div>

                {/* Right glass wall / Door */}
                <div 
                  className={`absolute right-0 top-0 bottom-0 w-4 bg-white/5 border-l border-white/10 transition-all duration-500 z-10 ${
                    hoveredId === "glass" ? "bg-blue-400/20 border-l-blue-400" : ""
                  } ${
                    hoveredId === "door" ? "bg-indigo-400/10 border-l-indigo-400" : ""
                  }`}
                  id="cabin-door-element"
                >
                  {/* Subtle glass reflection gloss */}
                  <div className="w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
                </div>

                {/* Cabin Interior Chamber */}
                <div className="flex-grow flex flex-col justify-between p-4 pl-10 pr-6 relative bg-[#EFECE1]">
                  
                  {/* Top LED Light Strip */}
                  <div className="absolute top-0 left-10 right-6 h-3 flex justify-center z-10">
                    <div 
                      className={`w-4/5 h-2 rounded-b-md transition-all duration-500 shadow-md ${
                        hoveredId === "lighting" 
                          ? "bg-amber-100 shadow-amber-300/60 scale-x-105 h-2.5" 
                          : "bg-emerald-100/90 shadow-emerald-200/30"
                      }`}
                      style={{
                        boxShadow: hoveredId === "lighting" 
                          ? "0 4px 14px 2px rgba(251, 191, 36, 0.5)" 
                          : "0 2px 8px rgba(16, 185, 129, 0.2)"
                      }}
                    />
                  </div>

                  {/* Top Ventilation Fan Grid */}
                  <div className="absolute top-0.5 left-12 w-6 h-1 flex justify-between z-10">
                    <span className={`w-1 h-0.5 rounded-full ${hoveredId === "ventilation" ? "bg-indigo-500 animate-bounce" : "bg-zinc-400"}`} />
                    <span className={`w-1 h-0.5 rounded-full ${hoveredId === "ventilation" ? "bg-indigo-500 animate-bounce" : "bg-zinc-400"}`} />
                    <span className={`w-1 h-0.5 rounded-full ${hoveredId === "ventilation" ? "bg-indigo-500 animate-bounce" : "bg-zinc-400"}`} />
                  </div>

                  {/* Interior Acoustic Waves / State text overlay */}
                  <div className="flex-grow flex flex-col justify-center items-center py-6 text-center select-none">
                    {/* Sine wave decoration */}
                    <div className="mb-2">
                      <svg className={`w-10 h-3 transition-colors duration-300 ${hoveredId ? "text-indigo-600" : "text-emerald-500"}`} viewBox="0 0 40 12" fill="none">
                        <path 
                          d="M0 6 C 10 0, 10 12, 20 6 C 30 0, 30 12, 40 6" 
                          stroke="currentColor" 
                          strokeWidth="2" 
                          strokeLinecap="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[10px] font-sans font-semibold text-zinc-500 tracking-wider">Внутри</span>
                    <span className={`text-xl font-black transition-colors duration-300 ${hoveredId ? "text-indigo-600" : "text-emerald-600"}`}>
                      {getInsideDbValue()}
                    </span>
                  </div>

                  {/* Built-in Office Desk & Sockets */}
                  <div className="relative mt-auto w-full flex flex-col items-center">
                    {/* Compact Outlet Plate */}
                    <div 
                      className={`absolute bottom-5 left-1.5 p-1 rounded-sm bg-zinc-800 border transition-all duration-300 flex items-center gap-[2px] ${
                        hoveredId === "electric" ? "border-indigo-400 shadow-md scale-110" : "border-zinc-700"
                      }`}
                      title="Блок розеток 220V + USB"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 border border-zinc-600 shrink-0" />
                      <div className="w-1 h-1 rounded-full bg-zinc-500 shrink-0" />
                    </div>

                    {/* Desk Shelf (Wood Veneer Accent) */}
                    <div className="w-full h-3.5 bg-[#C59B6D] rounded-md shadow-sm border border-[#B38758] flex items-center justify-end px-3" />
                  </div>

                  {/* Minimalist Bar Stool sitting inside */}
                  <div className="w-full flex justify-center pb-2 relative z-10 mt-1">
                    <div className="flex flex-col items-center">
                      {/* Seat Cushion */}
                      <div className="w-8 h-2 rounded-full bg-zinc-700 shadow-sm" />
                      {/* Metal foot leg */}
                      <div className="w-1 h-12 bg-zinc-600" />
                      {/* Chrome Footrest Ring */}
                      <div className="w-6 h-1 rounded-full border border-zinc-500 bg-transparent -mt-5" />
                      {/* Floor Base Stand */}
                      <div className="w-10 h-1 rounded-full bg-zinc-800" />
                    </div>
                  </div>

                </div>

                {/* Bottom Base (Feet/Supports) */}
                <div className="h-2 w-full bg-zinc-900 border-t border-zinc-800 flex justify-around px-4 relative">
                  <div 
                    className={`w-3.5 h-3 rounded-b-sm bg-zinc-700 transition-all duration-300 ${
                      hoveredId === "base" ? "bg-indigo-500 h-4 shadow-md" : ""
                    }`} 
                  />
                  <div 
                    className={`w-3.5 h-3 rounded-b-sm bg-zinc-700 transition-all duration-300 ${
                      hoveredId === "base" ? "bg-indigo-500 h-4 shadow-md" : ""
                    }`} 
                  />
                </div>
              </div>

              {/* Interactive Dot Hotspots overlaid on the diagram */}
              {/* Hotspot 1: Sandwich Left Layer */}
              <button 
                onMouseEnter={() => setHoveredId("sandwich")}
                onMouseLeave={() => setHoveredId(null)}
                className="absolute left-[72px] top-[140px] z-20 w-4 h-4 bg-white/90 border-2 border-indigo-600 rounded-full cursor-pointer flex items-center justify-center shadow-md hover:scale-125 transition-transform"
                title="Звукоизоляционный пирог"
              >
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping" />
              </button>

              {/* Hotspot 2: Glass / Door right */}
              <button 
                onMouseEnter={() => setHoveredId("glass")}
                onMouseLeave={() => setHoveredId(null)}
                className="absolute right-[70px] top-[100px] z-20 w-4 h-4 bg-white/90 border-2 border-indigo-600 rounded-full cursor-pointer flex items-center justify-center shadow-md hover:scale-125 transition-transform"
                title="Дверной триплекс с демпфером"
              >
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping" />
              </button>

              {/* Hotspot 3: Ventilation Top */}
              <button 
                onMouseEnter={() => setHoveredId("ventilation")}
                onMouseLeave={() => setHoveredId(null)}
                className="absolute left-[130px] top-[40px] z-20 w-4 h-4 bg-white/90 border-2 border-indigo-600 rounded-full cursor-pointer flex items-center justify-center shadow-md hover:scale-125 transition-transform"
                title="Принудительный вентилятор"
              >
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping" />
              </button>

              {/* Hotspot 4: Sockets / Electrical */}
              <button 
                onMouseEnter={() => setHoveredId("electric")}
                onMouseLeave={() => setHoveredId(null)}
                className="absolute left-[105px] top-[242px] z-20 w-4 h-4 bg-white/90 border-2 border-indigo-600 rounded-full cursor-pointer flex items-center justify-center shadow-md hover:scale-125 transition-transform"
                title="Блок коммуникаций"
              >
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full animate-ping" />
              </button>

              {/* Hint bottom overlay */}
              <div className="absolute bottom-[-24px] left-1/2 -translate-x-1/2 flex items-center space-x-1.5 select-none" id="interactivity-caption">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase">НАВЕДИТЕ НА КОМПОНЕНТ</span>
              </div>

            </div>
          </div>

          {/* Right Column Features */}
          <div className="lg:col-span-4 flex flex-col gap-8 md:gap-10 order-3">
            {RIGHT_FEATURES.map((feat) => (
              <div
                key={feat.id}
                onMouseEnter={() => setHoveredId(feat.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`transition-all duration-300 border-l-2 pl-5 cursor-pointer py-1 ${
                  hoveredId === feat.id 
                    ? "border-indigo-600 translate-x-1.5" 
                    : "border-zinc-300 hover:border-zinc-400"
                }`}
                id={`feat-right-${feat.id}`}
              >
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-1">
                  {feat.category}
                </span>
                <h4 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
                  {feat.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
