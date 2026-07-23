import React, { useState } from "react";
import { motion } from "motion/react";
import { Plus, ChevronLeft, ChevronRight } from "lucide-react";

interface SpecialCabinData {
  id: string;
  title: string;
  purposeLabel: string;
  purposeValue: string;
  formatLabel: string;
  formatValue: string;
  isolationLabel: string;
  isolationValue: string;
  timelineLabel: string;
  timelineValue: string;
  images: string[];
  colors: string[];
}

const SPECIAL_CABINS: SpecialCabinData[] = [
  {
    id: "sound",
    title: "Кабины для звукозаписи",
    purposeLabel: "Назначение",
    purposeValue: "Вокал и речь",
    formatLabel: "Формат",
    formatValue: "Студийный",
    isolationLabel: "Изоляция",
    isolationValue: "до 35 дБ",
    timelineLabel: "Срок",
    timelineValue: "от 21 дня",
    colors: ["#111111", "#EFECE1", "#D7B489", "#2563EB", "#15803D"],
    images: [
      "https://acucab.ru/wp-content/uploads/diktor-800x800.webp",
      "https://acucab.ru/wp-content/uploads/solo-800x800.webp",
      "https://acucab.ru/wp-content/uploads/strim-800x800.webp",
      "https://acucab.ru/wp-content/uploads/komfort-800x800.webp",
      "https://acucab.ru/wp-content/uploads/lajt-1-800x800.webp",
      "https://acucab.ru/wp-content/uploads/ugol-1-800x800.webp"
    ]
  },
  {
    id: "medical",
    title: "Кабины для медучреждений",
    purposeLabel: "Назначение",
    purposeValue: "Прием и тесты",
    formatLabel: "Формат",
    formatValue: "Медицинский",
    isolationLabel: "Изоляция",
    isolationValue: "до 32 дБ",
    timelineLabel: "Срок",
    timelineValue: "от 21 дня",
    colors: ["#111111", "#EFECE1", "#D7B489", "#2563EB", "#15803D"],
    images: [
      "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/med-1.jpg",
      "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/med-2.jpg",
      "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/med-3.jpg"
    ]
  },
  {
    id: "security",
    title: "Спецкабины для гостайны",
    purposeLabel: "Назначение",
    purposeValue: "Закрытые переговоры",
    formatLabel: "Формат",
    formatValue: "Защищенный",
    isolationLabel: "Изоляция",
    isolationValue: "по ТЗ",
    timelineLabel: "Срок",
    timelineValue: "от 30 дней",
    colors: ["#111111", "#EFECE1", "#D7B489", "#2563EB", "#15803D"],
    images: [
      "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/spec-rso1.webp",
      "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/spec-rso2.webp",
      "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/spec-rso3.webp",
      "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/spec-prez1.webp",
      "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/spec-prez2.webp"
    ]
  }
];

export default function SpecialPurposeCabins() {
  // Store the active image index for each card
  const [activeIndexes, setActiveIndexes] = useState<Record<string, number>>({
    sound: 0,
    medical: 0,
    security: 0
  });

  const handlePrev = (id: string, maxImages: number) => {
    setActiveIndexes((prev) => {
      const current = prev[id] || 0;
      const nextIndex = current === 0 ? maxImages - 1 : current - 1;
      return { ...prev, [id]: nextIndex };
    });
  };

  const handleNext = (id: string, maxImages: number) => {
    setActiveIndexes((prev) => {
      const current = prev[id] || 0;
      const nextIndex = current === maxImages - 1 ? 0 : current + 1;
      return { ...prev, [id]: nextIndex };
    });
  };

  const handleDotClick = (id: string, index: number) => {
    setActiveIndexes((prev) => ({ ...prev, [id]: index }));
  };

  return (
    <section 
      className="py-16 sm:py-24 bg-white text-zinc-900 relative border-t border-zinc-100"
      id="special-cabins-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Title */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <h2 className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]" id="special-cabins-heading">
            Кабины для задач вне офиса
          </h2>
        </div>

        {/* Horizontal Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="special-cabins-grid">
          {SPECIAL_CABINS.map((cabin) => {
            const activeIndex = activeIndexes[cabin.id] || 0;
            const currentImg = cabin.images[activeIndex];

            return (
              <div
                key={cabin.id}
                className="bg-white rounded-[24px] border border-zinc-200/70 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col h-full group"
                id={`special-cabin-card-${cabin.id}`}
              >
                {/* Carousel Image Header */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100" id={`carousel-${cabin.id}`}>
                  {/* Sliding image container */}
                  <img
                    src={currentImg}
                    alt={cabin.title}
                    className="w-full h-full object-cover object-center transition-all duration-500 ease-in-out group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />

                  {/* Left & Right arrow selectors visible on hover */}
                  <button
                    onClick={() => handlePrev(cabin.id, cabin.images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleNext(cabin.id, cabin.images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/70 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {/* Carousel Page Indicators (Pills & Dots) Pinned at Bottom Center */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center space-x-1.5 bg-black/25 backdrop-blur-sm px-2.5 py-1.2 rounded-full z-10">
                    {cabin.images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDotClick(cabin.id, idx)}
                        className={`transition-all duration-300 rounded-full cursor-pointer ${
                          idx === activeIndex
                            ? "w-4 h-1.5 bg-white"
                            : "w-1.5 h-1.5 bg-white/50 hover:bg-white/80"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Card Content body */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    {/* Title */}
                    <h3 className="font-sans text-xl font-bold tracking-tight text-zinc-800" id={`title-${cabin.id}`}>
                      {cabin.title}
                    </h3>

                    {/* Parameters Spec Table */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 py-4 my-4 border-t border-b border-zinc-100" id={`specs-${cabin.id}`}>
                      <div>
                        <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          {cabin.purposeLabel}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-zinc-700 mt-1">
                          {cabin.purposeValue}
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          {cabin.formatLabel}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-zinc-700 mt-1">
                          {cabin.formatValue}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-zinc-50">
                        <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          {cabin.isolationLabel}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-zinc-700 mt-1">
                          {cabin.isolationValue}
                        </div>
                      </div>

                      <div className="pt-2 border-t border-zinc-50">
                        <div className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">
                          {cabin.timelineLabel}
                        </div>
                        <div className="text-xs sm:text-sm font-semibold text-zinc-700 mt-1">
                          {cabin.timelineValue}
                        </div>
                      </div>
                    </div>

                    {/* Colors swatches row matches layout and spacing of original catalog cards */}
                    <div className="flex items-center gap-1.5 mt-4" id={`colors-${cabin.id}`}>
                      <div className="flex items-center -space-x-1 mr-1">
                        {cabin.colors.map((color, idx) => (
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
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
