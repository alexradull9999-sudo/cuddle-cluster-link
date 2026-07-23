import React, { useState } from "react";
import { openLeadPopup } from "@/lib/leadPopup";
import { motion, AnimatePresence } from "motion/react";
import {
  FileText,
  PhoneCall,
  Compass,
  ClipboardCheck,
  Wrench,
  Sparkles,
  ChevronDown,
  Clock,
} from "lucide-react";

interface Step {
  id: string;
  number: string;
  title: string;
  duration: string;
  description: string;
  icon: React.ComponentType<any>;
  details: string[];
}

const WORKFLOW_STEPS: Step[] = [
  {
    id: "step-1",
    number: "01",
    title: "Заявка",
    duration: "2 часа",
    description: "Оставляете задачу. Перезваниваем в течение 2 часов.",
    icon: PhoneCall,
    details: [
      "Принимаем заявку через любую форму на сайте, мессенджеры или телефон",
      "Закрепляем за вами персонального технического консультанта",
      "Предварительно классифицируем потребность (одноместная кабина, переговорная, кастом)",
    ],
  },
  {
    id: "step-2",
    number: "02",
    title: "Консультация",
    duration: "1 день",
    description: "Обсуждаем сценарий, помещение, ограничения, бюджет.",
    icon: Compass,
    details: [
      "Помогаем составить ТЗ с учетом акустической специфики вашего офиса",
      "Анализируем планировку и места для оптимальной расстановки кабин",
      "Учитываем особенности вентиляции общего зала и пожарной безопасности",
    ],
  },
  {
    id: "step-3",
    number: "03",
    title: "Подбор и проектирование",
    duration: "2-5 дней",
    description: "Подбираем модель или проектируем под ваши размеры.",
    icon: FileText,
    details: [
      "Разрабатываем спецификацию, выбираем материалы внешней и внутренней отделки",
      "Создаем 3D-визуализацию кабин в вашем интерьере при необходимости",
      "Проектируем кастомные решения (вырезы под колонны, измененная геометрия)",
    ],
  },
  {
    id: "step-4",
    number: "04",
    title: "Согласование",
    duration: "1-3 дня",
    description: "Финальная конфигурация, отделка, КП, договор.",
    icon: ClipboardCheck,
    details: [
      "Фиксируем конечную смету и условия доставки без скрытых переплат",
      "Предоставляем официальное коммерческое предложение",
      "Согласовываем и подписываем договор (работаем с НДС)",
    ],
  },
  {
    id: "step-5",
    number: "05",
    title: "Производство",
    duration: "от 30 дней",
    description: "Изготовление с контролем качества на каждом этапе.",
    icon: Sparkles,
    details: [
      "Высокоточная резка и сборка каркаса на собственном заводе в Санкт-Петербурге",
      "Монтаж многослойного звукопоглощающего сэндвича и малошумной вентиляции",
      "Тестовая контрольная сборка каждой кабины и проверка датчиков перед отгрузкой",
    ],
  },
  {
    id: "step-6",
    number: "06",
    title: "Монтаж",
    duration: "от 3 часов",
    description: "Привозим, собираем на месте, сдаем готовую кабину.",
    icon: Wrench,
    details: ["Доставка кабин в разобранном виде (все элементы бережно упакованы)"],
  },
];

export default function WorkflowStepsBlock() {
  const [activeStepId, setActiveStepId] = useState<string>("step-1");

  const handleStepClick = (id: string) => {
    setActiveStepId(id === activeStepId ? "" : id);
  };

  const handleOpenForm = () =>
    openLeadPopup("workflow_steps_start", {
      title: "Оставить заявку",
      subtitle:
        "Перезвоним в течение 2 часов и проведем первый этап «Консультация».",
      buttonLabel: "Оставить заявку",
    });

  return (
    <section
      className="py-24 sm:py-32 bg-[#FAF9F5] text-zinc-900 relative overflow-hidden border-t border-zinc-200/50"
      id="workflow-steps-section"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-5 flex flex-col justify-between" id="workflow-header-panel">
            <div className="space-y-6">
              <span className="text-xs font-bold text-blue-600 tracking-widest uppercase font-mono block">
                ПРОЦЕСС РАБОТЫ
              </span>
              <h2
                className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]"
                id="workflow-heading"
              >
                Путь от заявки <br />
                до готовой кабины
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base leading-relaxed font-normal max-w-sm">
                Шесть этапов. На каждом — понятный результат и срок.
              </p>
            </div>

            <div className="hidden lg:block bg-white border border-zinc-200/60 p-6 rounded-3xl shadow-sm space-y-4 max-w-sm mt-12">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                  ПОДСКАЗКА
                </span>
              </div>
              <h4 className="text-xs font-bold text-zinc-850">
                Нажмите на любой этап на схеме
              </h4>
              <p className="text-xs text-zinc-400 font-normal leading-normal">
                Чтобы раскрыть пошаговый чек-лист контроля качества и узнать, какие промежуточные результаты вы получаете.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center" id="workflow-timeline-panel">
            <div className="relative border-l border-zinc-200 ml-4 pl-6 sm:pl-8 space-y-2">
              {WORKFLOW_STEPS.map((step) => {
                const isActive = activeStepId === step.id;
                const IconComponent = step.icon;

                return (
                  <div
                    key={step.id}
                    className={`relative py-4 transition-all duration-300 ${isActive ? "z-10" : ""}`}
                  >
                    <div
                      className={`absolute -left-[31px] sm:-left-[39px] top-7 w-4 h-4 rounded-full border-2 transition-all duration-350 ${
                        isActive
                          ? "bg-blue-600 border-blue-600 scale-125 shadow-[0_0_8px_rgba(37,99,235,0.6)]"
                          : "bg-[#FAF9F5] border-zinc-300 scale-100 group-hover:border-blue-400"
                      }`}
                    />

                    <div
                      onClick={() => handleStepClick(step.id)}
                      className={`group flex items-start justify-between gap-4 p-5 rounded-3xl border transition-all duration-300 cursor-pointer ${
                        isActive
                          ? "bg-white border-blue-500/30 shadow-md shadow-blue-500/5"
                          : "bg-transparent border-transparent hover:bg-white/50"
                      }`}
                      id={`workflow-${step.id}`}
                    >
                      <div className="flex gap-4 sm:gap-6 items-start">
                        <span
                          className={`text-xs sm:text-sm font-mono font-bold transition-colors duration-300 ${
                            isActive ? "text-blue-600 font-extrabold" : "text-zinc-400"
                          }`}
                        >
                          {step.number}
                        </span>

                        <div className="space-y-1">
                          <h3
                            className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                              isActive ? "text-zinc-900" : "text-zinc-800"
                            }`}
                          >
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
                            {step.description}
                          </p>

                          <AnimatePresence initial={false}>
                            {isActive && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.25, ease: "easeInOut" }}
                                className="overflow-hidden pt-4 mt-2 border-t border-zinc-100 space-y-2.5"
                              >
                                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                  <IconComponent className="w-3.5 h-3.5 text-blue-500" />
                                  <span>План действий на этапе:</span>
                                </div>
                                <ul className="space-y-2 pl-1">
                                  {step.details.map((detail, idx) => (
                                    <li
                                      key={idx}
                                      className="flex items-start gap-2 text-xs text-zinc-600 leading-normal font-normal"
                                    >
                                      <span className="text-blue-500 font-bold shrink-0 mt-0.5">•</span>
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="shrink-0 flex items-center gap-1">
                        <span
                          className={`px-2.5 py-1 text-[10px] font-bold rounded-full font-mono tracking-wide transition-all ${
                            isActive
                              ? "bg-blue-100/70 text-blue-700 font-extrabold"
                              : "bg-zinc-200/50 text-zinc-500"
                          }`}
                        >
                          {step.duration}
                        </span>

                        <ChevronDown
                          className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                            isActive ? "rotate-180 text-blue-500" : "rotate-0"
                          }`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-end" id="workflow-action-wrap">
              <button
                onClick={handleOpenForm}
                className="px-6 py-3.5 bg-[#2563EB] hover:bg-blue-600 text-white text-xs font-bold rounded-2xl flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/10 active:scale-98 transition-all"
                id="workflow-get-consultation-btn"
              >
                <span>Начать с первого шага</span>
                <Clock className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
