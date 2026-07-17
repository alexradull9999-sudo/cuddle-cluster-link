import React, { useState } from "react";
import { sendLead } from "@/lib/webhook";
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
  CheckCircle2,
  Calendar,
  Send,
  X
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
    duration: "15 минут",
    description: "Оставляете задачу. Перезваниваем в течение 2 часов.",
    icon: PhoneCall,
    details: [
      "Принимаем заявку через любую форму на сайте, мессенджеры или телефон",
      "Закрепляем за вами персонального технического консультанта",
      "Предварительно классифицируем потребность (одноместная кабина, переговорная, кастом)"
    ]
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
      "Учитываем особенности вентиляции общего зала и пожарной безопасности"
    ]
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
      "Проектируем кастомные решения (вырезы под колонны, измененная геометрия)"
    ]
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
      "Предоставляем официальное коммерческое предложение со всеми чертежами",
      "Согласовываем и подписываем договор (работаем с НДС)"
    ]
  },
  {
    id: "step-5",
    number: "05",
    title: "Производство",
    duration: "от 14 дней",
    description: "Изготовление с контролем качества на каждом этапе.",
    icon: Sparkles,
    details: [
      "Высокоточная резка и сборка каркаса на собственном заводе в Санкт-Петербурге",
      "Монтаж многослойного звукопоглощающего сэндвича и малошумной вентиляции",
      "Тестовая контрольная сборка каждой кабины и проверка датчиков перед отгрузкой"
    ]
  },
  {
    id: "step-6",
    number: "06",
    title: "Монтаж",
    duration: "менее часа",
    description: "Привозим, собираем на месте, сдаем готовую кабину.",
    icon: Wrench,
    details: [
      "Доставка кабин в разобранном виде (все элементы бережно упакованы)",
      "Бесшумная сборка нашими сертифицированными мастерами (45-60 минут на кабину)",
      "Финальный замер шумоизоляции шумомером и передача ключей"
    ]
  }
];

export default function WorkflowStepsBlock() {
  const [activeStepId, setActiveStepId] = useState<string>("step-1");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    preferredTime: "Как можно скорее"
  });

  const handleStepClick = (id: string) => {
    setActiveStepId(id === activeStepId ? "" : id);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSuccess(true);
  };

  const handleCloseModal = () => {
    setIsFormOpen(false);
    setIsSuccess(false);
  };

  return (
    <section 
      className="py-24 sm:py-32 bg-[#FAF9F5] text-zinc-900 relative overflow-hidden border-t border-zinc-200/50"
      id="workflow-steps-section"
    >
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Block: Bold Heading & Description */}
          <div className="lg:col-span-5 flex flex-col justify-between" id="workflow-header-panel">
            <div className="space-y-6">
              <span className="text-xs font-bold text-blue-600 tracking-widest uppercase font-mono block">
                ПРОЦЕСС РАБОТЫ
              </span>
              <h2 className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]" id="workflow-heading">
                Путь от заявки <br />
                до готовой кабины
              </h2>
              <p className="text-zinc-500 text-sm sm:text-base leading-relaxed font-normal max-w-sm">
                Шесть этапов. На каждом — понятный результат и срок.
              </p>
            </div>

            {/* Micro-interactive workflow graphic / tip for a polished feel */}
            <div className="hidden lg:block bg-white border border-zinc-200/60 p-6 rounded-3xl shadow-sm space-y-4 max-w-sm mt-12">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping" />
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">ПОДСКАЗКА</span>
              </div>
              <h4 className="text-xs font-bold text-zinc-850">
                Нажмите на любой этап на схеме
              </h4>
              <p className="text-xs text-zinc-400 font-normal leading-normal">
                Чтобы раскрыть пошаговый чек-лист контроля качества и узнать, какие промежуточные результаты вы получаете.
              </p>
            </div>
          </div>

          {/* Right Block: Elegant Vertical Interactive Timeline */}
          <div className="lg:col-span-7 flex flex-col justify-center" id="workflow-timeline-panel">
            
            <div className="relative border-l border-zinc-200 ml-4 pl-6 sm:pl-8 space-y-2">
              
              {WORKFLOW_STEPS.map((step) => {
                const isActive = activeStepId === step.id;
                const IconComponent = step.icon;

                return (
                  <div 
                    key={step.id}
                    className={`relative py-4 transition-all duration-300 ${
                      isActive ? "z-10" : ""
                    }`}
                  >
                    
                    {/* Glowing circular active indicator on the left-hand timeline rail */}
                    <div 
                      className={`absolute -left-[31px] sm:-left-[39px] top-7 w-4 h-4 rounded-full border-2 transition-all duration-350 ${
                        isActive 
                          ? "bg-blue-600 border-blue-600 scale-125 shadow-[0_0_8px_rgba(37,99,235,0.6)]" 
                          : "bg-[#FAF9F5] border-zinc-300 scale-100 group-hover:border-blue-400"
                      }`}
                    />

                    {/* Content wrapper */}
                    <div 
                      onClick={() => handleStepClick(step.id)}
                      className={`group flex items-start justify-between gap-4 p-5 rounded-3xl border transition-all duration-300 cursor-pointer ${
                        isActive 
                          ? "bg-white border-blue-500/30 shadow-md shadow-blue-500/5" 
                          : "bg-transparent border-transparent hover:bg-white/50"
                      }`}
                      id={`workflow-${step.id}`}
                    >
                      {/* Left contents */}
                      <div className="flex gap-4 sm:gap-6 items-start">
                        
                        {/* Number code */}
                        <span className={`text-xs sm:text-sm font-mono font-bold transition-colors duration-300 ${
                          isActive ? "text-blue-600 font-extrabold" : "text-zinc-400"
                        }`}>
                          {step.number}
                        </span>

                        {/* Title and core description */}
                        <div className="space-y-1">
                          <h3 className={`text-base sm:text-lg font-bold tracking-tight transition-colors ${
                            isActive ? "text-zinc-900" : "text-zinc-800"
                          }`}>
                            {step.title}
                          </h3>
                          <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed font-normal">
                            {step.description}
                          </p>

                          {/* Expanded Step Checklists with Motion */}
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
                                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-600 leading-normal font-normal">
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

                      {/* Right-hand side pill with timeframe indicator */}
                      <div className="shrink-0 flex items-center gap-1">
                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full font-mono tracking-wide transition-all ${
                          isActive 
                            ? "bg-blue-100/70 text-blue-700 font-extrabold" 
                            : "bg-zinc-200/50 text-zinc-500"
                        }`}>
                          {step.duration}
                        </span>
                        
                        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                          isActive ? "rotate-180 text-blue-500" : "rotate-0"
                        }`} />
                      </div>

                    </div>

                  </div>
                );
              })}

            </div>

            {/* Quick Action Block */}
            <div className="mt-8 flex justify-end" id="workflow-action-wrap">
              <button
                onClick={() => setIsFormOpen(true)}
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

      {/* Start project flow dialogue Modal */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="workflow-start-modal">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl relative z-10 border border-zinc-100"
            >
              <div className="h-2 bg-gradient-to-r from-[#2563EB] to-[#10B981]" />

              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8">
                
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="workflow-booking-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-mono">
                          СТАРТ ПРОЕКТА ЗА 15 МИНУТ
                        </span>
                        <h3 className="text-xl font-black text-zinc-900 tracking-tight leading-tight">
                          Оставить заявку
                        </h3>
                        <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                          Заполните форму, и мы перезвоним вам в течение 2 часов, чтобы провести первый этап «Консультация».
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Имя</label>
                          <input
                            type="text"
                            required
                            placeholder="Константин"
                            value={formData.name}
                            onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                            className="w-full bg-zinc-50 border border-zinc-200 text-sm px-4 py-3 rounded-xl text-zinc-900 focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Телефон</label>
                          <input
                            type="tel"
                            required
                            placeholder="+7 (999) 000-00-00"
                            value={formData.phone}
                            onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                            className="w-full bg-zinc-50 border border-zinc-200 text-sm px-4 py-3 rounded-xl text-zinc-900 focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Удобное время звонка</label>
                          <select
                            value={formData.preferredTime}
                            onChange={(e) => setFormData(p => ({ ...p, preferredTime: e.target.value }))}
                            className="w-full bg-zinc-50 border border-zinc-200 text-sm px-4 py-3 rounded-xl text-zinc-900 focus:outline-none focus:border-blue-500"
                          >
                            <option value="Как можно скорее">Как можно скорее (в течение 2 часов)</option>
                            <option value="Сегодня, 14:00 - 18:00">Сегодня, 14:00 - 18:00</option>
                            <option value="Завтра, 10:00 - 14:00">Завтра, 10:00 - 14:00</option>
                            <option value="Завтра, 14:00 - 18:00">Завтра, 14:00 - 18:00</option>
                          </select>
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md shadow-blue-600/10 active:scale-99"
                      >
                        <span>Начать проект</span>
                        <Send className="w-4 h-4" />
                      </button>

                      <div className="text-[9px] text-zinc-400 text-center leading-normal">
                        Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных.
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="workflow-booking-success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5 text-center flex flex-col items-center py-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-xl font-black text-zinc-900 tracking-tight">Заявка принята!</h3>
                        <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                          Специалист свяжется с вами по номеру <span className="text-zinc-900 font-bold">{formData.phone}</span> в указанное время.
                        </p>
                      </div>

                      <p className="text-[10px] text-zinc-400 bg-zinc-50 p-4 rounded-xl border border-zinc-150 leading-normal text-left">
                        Мы зарезервировали время консультации. За это время подготовим обзор базовых модификаций, подходящих для вашего пространства.
                      </p>

                      <button
                        onClick={handleCloseModal}
                        className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Отлично, жду звонка
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
