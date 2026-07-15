import React, { useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ProductionStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

interface SlideItem {
  image: string;
  label: string;
}

const STATS_ITEMS = [
  {
    value: "2012",
    label: "год основания конструкторского бюро"
  },
  {
    value: "5 лет",
    label: "гарантия на все серийные кабины"
  },
  {
    value: "до 60 дБ",
    label: "шумоподавление в топовых моделях"
  },
  {
    value: "320 +",
    label: "кабин на объектах по России и СНГ"
  }
];

const SLIDES: SlideItem[] = [
  {
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/prod-1.png",
    label: "Остекление корпуса на сборочном участке"
  },
  {
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/prod-2.png",
    label: "Сборка алюминиевого профиля каркаса"
  },
  {
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/prod-3.png",
    label: "Тестирование вентиляции и энергоэффективности"
  }
];

const STEPS: ProductionStep[] = [
  {
    id: "step-1",
    number: "01",
    title: "Акустический расчет под объект",
    description: "Инженеры подбирают состав звукоизоляционного сэндвича под конкретный шум и сценарий, а не по каталогу."
  },
  {
    id: "step-2",
    number: "02",
    title: "Полный цикл в одних руках",
    description: "Каркас, остекление, вентиляция, электрика и отделка собираются и тестируются на нашем производстве."
  },
  {
    id: "step-3",
    number: "03",
    title: "Кастом — штатный процесс",
    description: "Геометрия, цвет, материалы, smart-стекло. Меняем конструктив под колонны, потолки и фирменный стиль."
  },
  {
    id: "step-4",
    number: "04",
    title: "Доставка и монтаж по стране",
    description: "Упаковываем, отгружаем, собираем на месте менее чем за час. Сопровождаем до подписания акта."
  }
];

export default function ProductionBlock() {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? SLIDES.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === SLIDES.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      className="py-20 sm:py-28 bg-[#FCFCFC] text-zinc-900 relative border-t border-zinc-200/60"
      id="production"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]" id="production-heading">
            Собственное производство <br /> в Санкт-Петербурге
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-500 max-w-xl font-normal leading-relaxed">
            Над проектами работают опытные инженеры и дизайнеры в собственном конструкторском бюро
          </p>
        </div>

        {/* Stats Grid - Divider bordered sections */}
        <div className="grid grid-cols-2 lg:grid-cols-4 border-t border-b border-zinc-200/70 mb-16 py-8 md:py-10 gap-y-8 gap-x-6" id="production-stats-grid">
          {STATS_ITEMS.map((stat, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col justify-start px-2 lg:px-6 ${
                idx > 0 ? "lg:border-l border-zinc-200/70" : ""
              } ${
                idx === 2 ? "border-l-0 sm:border-l-0 lg:border-l" : ""
              }`}
            >
              <span className="text-4xl sm:text-[44px] md:text-[50px] font-black font-sans text-zinc-900 tracking-tight leading-none mb-4">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm text-zinc-400 font-medium leading-relaxed max-w-[200px]">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Interactive Columns: Gallery on Left, Process Steps on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          {/* Left Column: Carousel Image */}
          <div className="lg:col-span-6 order-1">
            <div className="relative aspect-[4/3] w-full rounded-[28px] overflow-hidden bg-zinc-100 shadow-md group" id="production-carousel">
              
              {/* Carousel Image */}
              <img
                src={SLIDES[activeSlide].image}
                alt={SLIDES[activeSlide].label}
                className="w-full h-full object-cover object-center transition-all duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Overlay Label on Bottom Left */}
              <div className="absolute bottom-6 left-6 z-10 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 max-w-[85%]">
                <span className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                  {SLIDES[activeSlide].label}
                </span>
              </div>

              {/* Status Badge top left */}
              <div className="absolute top-6 left-6 z-10 bg-black/80 px-4 py-2 rounded-full border border-white/10 flex items-center space-x-1.5 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                <span className="text-[10px] font-bold text-white tracking-widest uppercase font-sans">
                  ЦЕХ · СПБ
                </span>
              </div>

              {/* Manual Nav arrows on hover */}
              <button
                onClick={handlePrevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/45 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dot Indicators on Bottom Right */}
              <div className="absolute bottom-6 right-6 flex space-x-1.5 bg-black/25 backdrop-blur-sm px-2.5 py-1.5 rounded-full z-10">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      idx === activeSlide ? "w-4 bg-white" : "w-1.5 bg-white/50 hover:bg-white/80"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Numbered Process list */}
          <div className="lg:col-span-6 flex flex-col divide-y divide-zinc-200/70 order-2" id="production-steps">
            {STEPS.map((step) => (
              <div key={step.id} className="py-6 first:pt-0 last:pb-0" id={step.id}>
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Number Indicator */}
                  <span className="text-xs sm:text-sm font-bold text-indigo-600 tracking-wider font-mono shrink-0 pt-1">
                    {step.number}
                  </span>
                  
                  {/* Text details */}
                  <div className="flex-grow">
                    <h3 className="text-base sm:text-lg font-bold text-zinc-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
