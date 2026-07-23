import React from "react";
import { ChevronRight, Settings, Paintbrush, Maximize, Puzzle } from "lucide-react";
import { openLeadPopup } from "@/lib/leadPopup";

interface CustomCard {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  illustration: React.ReactNode;
}

export default function CustomSolutionsBlock() {
  const handleOpen = (idea?: string) =>
    openLeadPopup("custom_solutions_block", {
      title: idea ? `Заявка: ${idea}` : "Кастомный проект",
      subtitle:
        "Оставьте контакт — менеджер обсудит задачу и подготовит эскиз решения.",
      buttonLabel: "Обсудить проект",
    });

  const CARDS: CustomCard[] = [
    {
      number: "01",
      title: "Нестандартная геометрия",
      description: "Адаптируем под ваши размеры.",
      icon: Maximize,
      illustration: (
        <div className="w-full h-48 relative flex items-center justify-center overflow-hidden">
          <div className="w-36 h-44 relative bg-[#18181B] rounded-2xl border border-zinc-800 flex items-end p-4 shadow-2xl overflow-hidden group-hover:border-zinc-700 transition-all">
            <div className="absolute top-0 right-0 w-20 h-20 bg-black rotate-45 translate-x-10 -translate-y-10 border-b border-zinc-800" />
            <div className="w-full h-5/6 border border-zinc-850 bg-zinc-950/40 rounded-xl relative flex items-center justify-center">
              <div className="absolute inset-y-0 right-4 w-12 border-l border-zinc-850 bg-zinc-900/10 flex items-center justify-start pl-1">
                <span className="w-1 h-8 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "02",
      title: "Любой цвет или брендирование",
      description:
        "окрасим кабину в любой цвет и оттенок по вашему желанию или подберем отделку в корп стиле",
      icon: Paintbrush,
      illustration: (
        <div className="w-full h-48 relative flex items-center justify-center overflow-hidden">
          <div className="w-36 h-44 relative bg-[#18181B] rounded-2xl border border-zinc-850 flex items-center justify-center p-4 shadow-2xl transition-all">
            <div className="absolute left-0 inset-y-0 w-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-l-2xl opacity-80 group-hover:opacity-100 transition-all shadow-[0_0_12px_rgba(37,99,235,0.4)]" />
            <div className="absolute right-0 inset-y-0 w-4 bg-gradient-to-l from-blue-600 to-indigo-600 rounded-r-2xl opacity-80 group-hover:opacity-100 transition-all shadow-[0_0_12px_rgba(37,99,235,0.4)]" />
            <div className="w-full h-full border border-zinc-800 bg-zinc-950/60 rounded-lg relative flex items-center justify-end pr-2">
              <span className="w-1.5 h-10 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      title: "Интеграция в интерьер",
      description:
        "Установим кабину заподлицо со стеной, добавим декоративные реечные фасады или деревянные накладки.",
      icon: Puzzle,
      illustration: (
        <div className="w-full h-48 relative flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-[200px] h-44 relative flex items-center justify-between px-2">
            <div className="w-8 h-40 bg-zinc-800/40 border border-zinc-800/80 rounded-lg shrink-0" />
            <div className="w-28 h-44 bg-[#18181B] border-t border-b border-x border-zinc-800 rounded-xl relative flex items-center justify-center shadow-inner">
              <div className="w-[85%] h-[90%] border border-zinc-850 bg-zinc-950/40 rounded-lg relative flex items-center justify-end pr-2">
                <span className="w-1 h-8 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </div>
            </div>
            <div className="w-8 h-40 bg-zinc-800/40 border border-zinc-800/80 rounded-lg shrink-0" />
          </div>
        </div>
      ),
    },
    {
      number: "04",
      title: "Особые задачи",
      description:
        "Предлагаем стекла на любой вкус: классические матовые, стильные тонированные или брендированные с вашим логотипом.",
      icon: Settings,
      illustration: (
        <div className="w-full h-48 relative flex items-center justify-center overflow-hidden">
          <div className="w-36 h-44 relative bg-[#18181B] rounded-2xl border border-zinc-850 flex items-center justify-center p-4 shadow-2xl transition-all">
            <div className="w-full h-full border border-zinc-800 bg-zinc-950/50 rounded-xl relative flex flex-col justify-center items-center p-2">
              <div className="w-11/12 h-10 bg-blue-600/20 border border-blue-500/50 rounded-lg flex items-center justify-center mb-3 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                <div className="w-4 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              </div>
              <div className="w-10/12 h-1 bg-zinc-800 rounded mb-1" />
              <div className="w-10/12 h-1 bg-zinc-800 rounded mb-1" />
              <div className="absolute right-2 inset-y-0 w-4 flex items-center justify-center">
                <span className="w-1 h-8 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section
      className="py-24 sm:py-32 bg-[#0A0A0C] text-white relative border-t border-zinc-900"
      id="custom-solutions-section"
    >
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2
            className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-white leading-[1.1]"
            id="custom-heading"
          >
            Когда стандартного <br />
            <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              решения не существует
            </span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed font-normal max-w-xl">
            Меняем геометрию, конфигурацию, отделку, остекление. Адаптируем под несущие колонны, низкие потолки, фирменные цвета.
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16"
          id="custom-cards-grid"
        >
          {CARDS.map((card) => (
            <div
              key={card.number}
              onClick={() => handleOpen(card.title)}
              className="bg-[#121215]/80 hover:bg-[#141418] border border-zinc-850/65 hover:border-zinc-700/80 rounded-[28px] p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-1"
              id={`custom-card-${card.number}`}
            >
              <div>
                <div className="mb-6 rounded-2xl bg-black/40 p-4 border border-zinc-900 flex items-center justify-center relative overflow-hidden">
                  {card.illustration}
                </div>

                <div className="flex items-start gap-3">
                  <span className="text-[11px] font-mono font-bold text-blue-500 tracking-wider pt-1 shrink-0">
                    {card.number}
                  </span>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug group-hover:text-blue-400 transition-colors">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-xs sm:text-sm text-zinc-400 font-normal leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center" id="custom-solutions-action-wrap">
          <button
            onClick={() => handleOpen()}
            className="px-8 py-4 bg-[#2563EB] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-full flex items-center justify-center space-x-2.5 transition-all duration-300 shadow-lg shadow-blue-500/10 cursor-pointer active:scale-95"
            id="discuss-custom-project-btn"
          >
            <span>Обсудить кастомный проект</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
