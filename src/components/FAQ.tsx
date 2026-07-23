import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, X } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Какой реальный уровень приватности у кабин?",
    answer: "В шоуруме можно услышать разницу самостоятельно. Уровень акустической изоляции — 25-34 дБ. Это значит, что голос внутри кабины не разбирается за ее пределами при типичном шуме оупен-спейса 55-65 дБ."
  },
  {
    question: "Как понять, какой размер нужен под мой офис?",
    answer: "В заявке укажите количество людей, тип сценария и размеры помещения. Менеджер пришлет варианты с расчетом размещения. При желании — выезд на замер."
  },
  {
    question: "Насколько внутри комфортно проводить час, два, три?",
    answer: "В кабинах работает принудительная вентиляция с автоматическим режимом. Воздухообмен — 80-800 м³/час. CO₂ не накапливается, температура не растет."
  },
  {
    question: "Как происходит сборка на месте?",
    answer: "Привозим в разобранном виде. Сборку выполняет наша монтажная бригада. Время сборки одной кабины — менее часа. Капитальных работ не требуется."
  },
  {
    question: "Можно ли перевезти кабину при переезде офиса?",
    answer: "Да. Конструкция сборно-разборная. При переезде разбираем, перевозим, собираем на новом месте."
  },
  {
    question: "Можно ли изменить отделку, цвет или размер?",
    answer: "Да. У нас собственное производство, доработка — штатный процесс. Меняем внешние панели, цвета, материалы, остекление. По размерам — вплоть до полной кастомной геометрии."
  },
  {
    question: "Сколько длится производство?",
    answer: "Срок изготовления — от 30 дней."
  },
  {
    question: "Есть ли сервис после установки?",
    answer: "Гарантия 5 лет. После окончания обслуживаем платно: замена расходников, диагностика, перенос."
  },
  {
    question: "Где можно посмотреть кабины вживую?",
    answer: "В шоуруме Санкт-Петербург, пр. Обуховской обороны, 86к. Запись по предварительной договоренности. Если далеко — проведем видео-демонстрацию."
  },
  {
    question: "Как получить коммерческое предложение?",
    answer: "Оставьте заявку. После короткого разговора с менеджером пришлем расчет под ваше помещение и сценарий: модель, конфигурацию, сроки, цену, условия монтажа."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open first by default like on the screenshot

  const handleToggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section 
      className="py-20 sm:py-28 bg-[#F4F3EE] text-zinc-900 relative" 
      id="faq"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Headline and Direct ask link */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24 h-fit" id="faq-header-column">
            <h2 className="text-[2.5rem] sm:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]" id="faq-main-heading">
              Вопросы,<br />которые<br />нам задают
            </h2>
            
            <p className="text-sm sm:text-base text-zinc-500 font-normal leading-relaxed">
              Если не нашли ответ —<br />
              <a 
                href="#get-quote-section" 
                className="text-blue-600 hover:text-blue-800 font-bold hover:underline transition-colors inline-block mt-1"
                id="faq-direct-ask-link"
              >
                спросите напрямую
              </a>
            </p>
          </div>

          {/* Right Column: Clean Minimalist Accordion */}
          <div className="lg:col-span-7 divide-y divide-zinc-300/60 border-t border-b border-zinc-300/60" id="faq-accordion-column">
            {FAQ_ITEMS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div 
                  key={idx}
                  className="py-5 sm:py-6 transition-all"
                  id={`faq-row-${idx}`}
                >
                  <button
                    type="button"
                    onClick={() => handleToggle(idx)}
                    className="w-full text-left flex justify-between items-center gap-6 cursor-pointer group focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-zinc-900 hover:text-zinc-700 leading-snug transition-colors">
                      {faq.question}
                    </span>

                    {/* Minimalist Switch: Circle with X when open, Simple Plus when closed */}
                    <span className="shrink-0 transition-transform duration-300">
                      {isOpen ? (
                        <div className="w-7 h-7 rounded-full bg-black flex items-center justify-center text-white shadow-sm">
                          <X className="w-3.5 h-3.5 stroke-[3]" />
                        </div>
                      ) : (
                        <div className="w-7 h-7 flex items-center justify-center text-zinc-500 group-hover:text-zinc-900">
                          <Plus className="w-5 h-5 stroke-[2]" />
                        </div>
                      )}
                    </span>
                  </button>

                  {/* Clean smooth content reveal */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="pt-4 pr-10 text-xs sm:text-sm text-zinc-600 leading-relaxed font-normal">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

