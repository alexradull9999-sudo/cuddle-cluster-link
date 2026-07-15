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
    description: "Свежий воздух без духоты и запаха."
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

          {/* Center Column: Cabin Photo */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center py-6 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-[420px] aspect-[4/5] rounded-[28px] overflow-hidden shadow-2xl border border-zinc-200/60 bg-zinc-100"
              id="cabin-interactive-shell"
            >
              <img
                src={cabinImage.url}
                alt="Акустическая кабина ACUCAB в открытом офисе"
                className="w-full h-full object-cover object-center"
              />

              {/* Inside dB overlay */}
              <div className="absolute top-4 left-4 z-10 bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 flex flex-col">
                <span className="text-[9px] font-bold text-white/60 tracking-widest uppercase">Внутри</span>
                <span className={`text-lg font-black leading-none mt-0.5 transition-colors duration-300 ${hoveredId ? "text-indigo-300" : "text-emerald-300"}`}>
                  {getInsideDbValue()}
                </span>
              </div>

              {/* Office noise overlay */}
              <div className="absolute top-4 right-4 z-10 bg-black/70 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/10 flex flex-col items-end">
                <span className="text-[9px] font-bold text-white/60 tracking-widest uppercase">Шум офиса</span>
                <span className="text-lg font-black text-white leading-none mt-0.5">60 дБ</span>
              </div>

              {/* Hint bottom overlay */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-1.5 select-none bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full" id="interactivity-caption">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-[10px] font-bold text-white/80 tracking-widest uppercase">НАВЕДИТЕ НА КОМПОНЕНТ</span>
              </div>
            </motion.div>
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
