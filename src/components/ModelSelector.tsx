import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface ModelSelectorProps {
  onConfigureModel: (modelId: "S" | "M" | "L" | "XL") => void;
  onQuickQuote: (modelId: "S" | "M" | "L" | "XL") => void;
}

interface CabinModel {
  id: string;
  namePrefix: string;
  nameSuffix: string;
  category: "focus" | "meeting" | "team";
  capacityText: string;
  dimensions: string;
  isolation: string;
  timeline: string;
  soldCount: number;
  priceFrom: number; // цена «от», ₽
  image: string;
  images: string[];
  colors: string[];
  configMapId: "S" | "M" | "L" | "XL"; // to map to constructor IDs
}

const CABIN_MODELS: CabinModel[] = [
  {
    id: "top-1",
    namePrefix: "Акукаб",
    nameSuffix: "ТОП 1",
    category: "focus",
    capacityText: "1 человек",
    dimensions: "1100×1100×2260",
    isolation: "35 дБ",
    timeline: "30 рабочих дней",
    soldCount: 67,
    priceFrom: 400000,
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-top-1.png",
    images: ["https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-top-1.png"],
    colors: ["#111111", "#EFECE1", "#D7B489", "#2563EB", "#15803D"],
    configMapId: "S"
  },
  {
    id: "top-1-5",
    namePrefix: "Акукаб",
    nameSuffix: "ТОП 1.5",
    category: "focus",
    capacityText: "1 человек",
    dimensions: "1100×1500×2260",
    isolation: "35 дБ",
    timeline: "30 рабочих дней",
    soldCount: 45,
    priceFrom: 445000,
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-top-1-5.png",
    images: ["https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-top-1-5.png"],
    colors: ["#111111", "#EFECE1", "#D7B489", "#2563EB", "#15803D"],
    configMapId: "S"
  },
  {
    id: "top-2",
    namePrefix: "Акукаб",
    nameSuffix: "ТОП 2",
    category: "meeting",
    capacityText: "2 человека",
    dimensions: "2200×1100×2160",
    isolation: "35 дБ",
    timeline: "30 рабочих дней",
    soldCount: 58,
    priceFrom: 490000,
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-top-2.png",
    images: ["https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-top-2.png"],
    colors: ["#111111", "#EFECE1", "#D7B489", "#2563EB", "#15803D"],
    configMapId: "M"
  },
  {
    id: "office-1",
    namePrefix: "Акукаб",
    nameSuffix: "ОФИС 1",
    category: "focus",
    capacityText: "1 человек",
    dimensions: "1100×1100×2164",
    isolation: "35 дБ",
    timeline: "30 рабочих дней",
    soldCount: 67,
    priceFrom: 480000,
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-ofis-1.png",
    images: ["https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-ofis-1.png"],
    colors: ["#111111", "#EFECE1", "#D7B489", "#2563EB", "#15803D"],
    configMapId: "S"
  },
  {
    id: "office-1-5",
    namePrefix: "Акукаб",
    nameSuffix: "ОФИС 1.5",
    category: "focus",
    capacityText: "1 человек",
    dimensions: "1300×1100×2164",
    isolation: "35 дБ",
    timeline: "30 рабочих дней",
    soldCount: 45,
    priceFrom: 525000,
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-ofis-1-5.png",
    images: ["https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-ofis-1-5.png"],
    colors: ["#111111", "#EFECE1", "#D7B489", "#2563EB", "#15803D"],
    configMapId: "M"
  },
  {
    id: "office-2",
    namePrefix: "Акукаб",
    nameSuffix: "ОФИС 2",
    category: "meeting",
    capacityText: "2 человека",
    dimensions: "2200×1100×2164",
    isolation: "35 дБ",
    timeline: "30 рабочих дней",
    soldCount: 58,
    priceFrom: 570000,
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-ofis-2.png",
    images: ["https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-ofis-2.png"],
    colors: ["#111111", "#EFECE1", "#D7B489", "#2563EB", "#15803D"],
    configMapId: "M"
  },
  {
    id: "acucab-1",
    namePrefix: "Акукаб",
    nameSuffix: "1",
    category: "focus",
    capacityText: "1 человек",
    dimensions: "1100×1100×2200",
    isolation: "35 дБ",
    timeline: "30 рабочих дней",
    soldCount: 67,
    priceFrom: 400000,
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-acucab-1.png",
    images: ["https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-acucab-1.png"],
    colors: ["#111111", "#EFECE1", "#D7B489", "#2563EB", "#15803D"],
    configMapId: "S"
  },
  {
    id: "acucab-1-5",
    namePrefix: "Акукаб",
    nameSuffix: "1.5",
    category: "focus",
    capacityText: "1 человек",
    dimensions: "1300×1100×2200",
    isolation: "35 дБ",
    timeline: "30 рабочих дней",
    soldCount: 45,
    priceFrom: 445000,
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-acucab-1-5.png",
    images: ["https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-acucab-1-5.png"],
    colors: ["#111111", "#EFECE1", "#D7B489", "#2563EB", "#15803D"],
    configMapId: "S"
  },
  {
    id: "acucab-2",
    namePrefix: "Акукаб",
    nameSuffix: "2",
    category: "meeting",
    capacityText: "2 человека",
    dimensions: "2200×1100×2200",
    isolation: "35 дБ",
    timeline: "30 рабочих дней",
    soldCount: 58,
    priceFrom: 490000,
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-acucab-2.png",
    images: ["https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/m-acucab-2.png"],
    colors: ["#111111", "#EFECE1", "#D7B489", "#2563EB", "#15803D"],
    configMapId: "M"
  }
];

const formatPrice = (value: number) =>
  `от ${value.toLocaleString("ru-RU")} ₽`;

type FilterType = "all" | "focus" | "meeting" | "team";

export default function ModelSelector({ onConfigureModel, onQuickQuote }: ModelSelectorProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [showAll, setShowAll] = useState(false);
  const [activeImageIndexes, setActiveImageIndexes] = useState<Record<string, number>>({});

  const handlePrevImage = (id: string, maxImages: number) => {
    setActiveImageIndexes((prev) => {
      const current = prev[id] || 0;
      const nextIndex = current === 0 ? maxImages - 1 : current - 1;
      return { ...prev, [id]: nextIndex };
    });
  };

  const handleNextImage = (id: string, maxImages: number) => {
    setActiveImageIndexes((prev) => {
      const current = prev[id] || 0;
      const nextIndex = current === maxImages - 1 ? 0 : current + 1;
      return { ...prev, [id]: nextIndex };
    });
  };

  const handleDotClick = (id: string, index: number) => {
    setActiveImageIndexes((prev) => ({ ...prev, [id]: index }));
  };

  // Filter models according to category tabs
  const filteredModels = CABIN_MODELS.filter((model) => {
    if (activeFilter === "all") return true;
    return model.category === activeFilter;
  });

  // Limit displayed models initially to 6 unless showAll is toggled or when a specific filter is selected
  const displayedModels = activeFilter === "all" && !showAll 
    ? filteredModels.slice(0, 6) 
    : filteredModels;

  return (
    <section 
      className="py-16 sm:py-24 bg-[#FCFCFC] text-zinc-900 relative border-t border-zinc-100"
      id="models"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header with filter buttons on the right */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <h2 className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]">
              Решения под ваши задачи <br /> в офисе
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-500 leading-relaxed font-normal">
              Акустические кабины для опенспейса: фокус-работа, звонки <br className="hidden md:inline" />
              и переговоры. От места на одного до целой команды.
            </p>
          </div>

          {/* Filter Tabs Container */}
          <div className="flex flex-wrap gap-2.5 shrink-0 self-start lg:self-end">
            <button
              onClick={() => {
                setActiveFilter("all");
                setShowAll(false);
              }}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                activeFilter === "all"
                  ? "bg-[#111111] text-white border-[#111111] shadow-sm"
                  : "bg-transparent text-zinc-500 hover:text-zinc-900 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              Все модели
            </button>
            <button
              onClick={() => setActiveFilter("focus")}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                activeFilter === "focus"
                  ? "bg-[#111111] text-white border-[#111111] shadow-sm"
                  : "bg-transparent text-zinc-500 hover:text-zinc-900 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              На одного
            </button>
            <button
              onClick={() => setActiveFilter("meeting")}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                activeFilter === "meeting"
                  ? "bg-[#111111] text-white border-[#111111] shadow-sm"
                  : "bg-transparent text-zinc-500 hover:text-zinc-900 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              На двоих
            </button>
            <button
              onClick={() => setActiveFilter("team")}
              className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer border ${
                activeFilter === "team"
                  ? "bg-[#111111] text-white border-[#111111] shadow-sm"
                  : "bg-transparent text-zinc-500 hover:text-zinc-900 border-zinc-200 hover:border-zinc-300"
              }`}
            >
              На целую команду
            </button>
          </div>
        </div>

        {/* Catalog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {displayedModels.map((model) => (
              <motion.div
                layout
                key={model.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-[24px] border border-zinc-200/70 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100">
                  {/* Sliding image container */}
                  <img
                    src={model.images[activeImageIndexes[model.id] || 0]}
                    alt={`${model.namePrefix} ${model.nameSuffix}`}
                    className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const currentIdx = activeImageIndexes[model.id] || 0;
                      if (currentIdx < model.images.length - 1) {
                        const nextIdx = currentIdx + 1;
                        setActiveImageIndexes((prev) => ({ ...prev, [model.id]: nextIdx }));
                      } else {
                        // Fallback to beautiful Unsplash pod illustration in case local asset is missing
                        e.currentTarget.src = "https://images.unsplash.com/photo-1568992687947-868a62a9f521?auto=format&fit=crop&q=80&w=800";
                      }
                    }}
                  />

                  {/* Left & Right arrow selectors visible on hover */}
                  {model.images.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrevImage(model.id, model.images.length);
                        }}
                        className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                        aria-label="Previous slide"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNextImage(model.id, model.images.length);
                        }}
                        className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                        aria-label="Next slide"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </>
                  )}

                  {/* Carousel Page Indicators (Pills & Dots) Pinned at Bottom Center */}
                  {model.images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-1.5 bg-black/25 backdrop-blur-sm px-2.5 py-1.2 rounded-full z-10">
                      {model.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDotClick(model.id, idx);
                          }}
                          className={`transition-all duration-300 rounded-full cursor-pointer ${
                            idx === (activeImageIndexes[model.id] || 0)
                              ? "w-4 h-1.5 bg-white"
                              : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                          }`}
                          aria-label={`Go to slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Glass sold badge pinned at top-left */}
                  <div className="absolute top-4 left-4 z-10 bg-black/75 backdrop-blur-md px-3.5 py-1.5 rounded-md border border-white/10">
                    <span className="font-mono text-[9px] font-bold text-white tracking-widest uppercase">
                      ПРОДАНО {model.soldCount} ШТ. ЗА 2025 ГОД
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Title + price */}
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-sans text-xl font-bold tracking-tight text-zinc-500">
                        {model.namePrefix} <span className="text-[#3b82f6] font-black">{model.nameSuffix}</span>
                      </h3>
                      <div className="text-right shrink-0">
                        <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          Цена
                        </div>
                        <div className="text-sm sm:text-base font-black text-zinc-900 mt-0.5 whitespace-nowrap">
                          {formatPrice(model.priceFrom)}
                        </div>
                      </div>
                    </div>

                    {/* Parameter Specification Grid */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 py-4 my-4 border-t border-b border-zinc-100">
                      <div>
                        <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          Вместимость
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-zinc-700 mt-1">
                          {model.capacityText}
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          Размер
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-zinc-700 mt-1">
                          {model.dimensions}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-zinc-50">
                        <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          Изоляция
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-zinc-700 mt-1">
                          {model.isolation}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-zinc-50">
                        <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          Срок
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-zinc-700 mt-1">
                          {model.timeline}
                        </div>
                      </div>
                    </div>

                    {/* Color Swatches Grid */}
                    <div className="flex items-center gap-1.5 mt-4">
                      <div className="flex items-center -space-x-1 mr-1">
                        {model.colors.map((color, idx) => (
                          <span
                            key={idx}
                            style={{ backgroundColor: color }}
                            className="w-4 h-4 rounded-full border border-white shadow-sm shrink-0"
                            title={`Цвет ${idx + 1}`}
                          />
                        ))}
                        <span className="w-4 h-4 rounded-full bg-zinc-100 border border-white flex items-center justify-center shrink-0 shadow-sm cursor-pointer hover:bg-zinc-200 transition-colors">
                          <Plus className="w-2.5 h-2.5 text-zinc-500" />
                        </span>
                      </div>
                      <span className="text-[10px] sm:text-xs text-zinc-400 font-medium">
                        Любой цвет или брендирование
                      </span>
                    </div>
                  </div>

                  {/* Interactivity Buttons on Hover / Action Block */}
                  <div className="mt-6 pt-4 border-t border-zinc-100 flex gap-3.5">
                    <button
                      onClick={() => onConfigureModel(model.configMapId)}
                      className="flex-1 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white text-xs font-bold rounded-xl transition-all cursor-pointer shadow-sm text-center"
                    >
                      Рассчитать
                    </button>
                    <button
                      onClick={() => onQuickQuote(model.configMapId)}
                      className="px-4 py-2.5 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-semibold rounded-xl border border-zinc-200 transition-all cursor-pointer"
                    >
                      Быстрый расчет
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Bottom Expand Button */}
        {activeFilter === "all" && !showAll && (
          <div className="flex justify-center mt-12 sm:mt-16" id="models-expand-container">
            <button
              onClick={() => setShowAll(true)}
              className="px-6 py-3 bg-[#FAF9F6] hover:bg-zinc-100/90 text-zinc-700 text-xs sm:text-sm font-semibold rounded-full border border-zinc-200 flex items-center space-x-1.5 transition-all cursor-pointer shadow-sm"
            >
              <span>Показать все модели</span>
              <ChevronDown className="w-4 h-4 text-zinc-500" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
