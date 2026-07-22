import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2, ChevronRight, Sparkles, Settings, Palette, Maximize, Puzzle } from "lucide-react";
import { sendLead } from "@/lib/webhook";

interface CustomCard {
  number: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  illustration: React.ReactNode;
}

export default function CustomSolutionsBlock() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    idea: "Нестандартная геометрия",
    details: ""
  });

  const handleOpenModal = (defaultIdea?: string) => {
    if (defaultIdea) {
      setFormData(prev => ({ ...prev, idea: defaultIdea }));
    }
    setIsModalOpen(true);
    setFormSubmitted(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    sendLead("custom_solutions_block", {
      name: formData.name,
      phone: formData.phone,
      idea: formData.idea,
      details: formData.details,
    });
    setFormSubmitted(true);
  };

  const CARDS: CustomCard[] = [
    {
      number: "01",
      title: "Нестандартная геометрия",
      description: "Адаптируем кабину под наклонные мансардные потолки, колонны в офисе или узкие ниши.",
      icon: Maximize,
      illustration: (
        <div className="w-full h-48 relative flex items-center justify-center overflow-hidden">
          {/* Schematic representation of a cabin with cut-off corner */}
          <div className="w-36 h-44 relative bg-[#18181B] rounded-2xl border border-zinc-800 flex items-end p-4 shadow-2xl overflow-hidden group-hover:border-zinc-700 transition-all">
            {/* Cutoff overlay representing sloped ceiling/corner */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-black rotate-45 translate-x-10 -translate-y-10 border-b border-zinc-800" />
            
            {/* Cabin internal glass frame */}
            <div className="w-full h-5/6 border border-zinc-850 bg-zinc-950/40 rounded-xl relative flex items-center justify-center">
              {/* Glass door highlight */}
              <div className="absolute inset-y-0 right-4 w-12 border-l border-zinc-850 bg-zinc-900/10 flex items-center justify-start pl-1">
                {/* Door handle with electric blue glow */}
                <span className="w-1 h-8 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      number: "02",
      title: "Фирменные цвета",
      description: "Окрасим металлические профили в любой оттенок по палитре RAL или подберем обивку в корпоративном стиле.",
      icon: Palette,
      illustration: (
        <div className="w-full h-48 relative flex items-center justify-center overflow-hidden">
          {/* Custom brand colors with glowing blue side panels */}
          <div className="w-36 h-44 relative bg-[#18181B] rounded-2xl border border-zinc-850 flex items-center justify-center p-4 shadow-2xl transition-all">
            {/* Left side brand color highlight panel */}
            <div className="absolute left-0 inset-y-0 w-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-l-2xl opacity-80 group-hover:opacity-100 transition-all shadow-[0_0_12px_rgba(37,99,235,0.4)]" />
            
            {/* Right side brand color highlight panel */}
            <div className="absolute right-0 inset-y-0 w-4 bg-gradient-to-l from-blue-600 to-indigo-600 rounded-r-2xl opacity-80 group-hover:opacity-100 transition-all shadow-[0_0_12px_rgba(37,99,235,0.4)]" />
            
            {/* Center cabin door glass */}
            <div className="w-full h-full border border-zinc-800 bg-zinc-950/60 rounded-lg relative flex items-center justify-end pr-2">
              <span className="w-1.5 h-10 bg-white rounded-full shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
            </div>
          </div>
        </div>
      )
    },
    {
      number: "03",
      title: "Интеграция в интерьер",
      description: "Установим кабину заподлицо со стеной, добавим декоративные реечные фасады или деревянные накладки.",
      icon: Puzzle,
      illustration: (
        <div className="w-full h-48 relative flex items-center justify-center overflow-hidden">
          {/* In-wall niche flush integration schematic */}
          <div className="w-full max-w-[200px] h-44 relative flex items-center justify-between px-2">
            {/* Left office dry-wall panel */}
            <div className="w-8 h-40 bg-zinc-800/40 border border-zinc-800/80 rounded-lg shrink-0" />
            
            {/* Central integrated flush cabin */}
            <div className="w-28 h-44 bg-[#18181B] border-t border-b border-x border-zinc-800 rounded-xl relative flex items-center justify-center shadow-inner">
              <div className="w-[85%] h-[90%] border border-zinc-850 bg-zinc-950/40 rounded-lg relative flex items-center justify-end pr-2">
                <span className="w-1 h-8 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </div>
            </div>

            {/* Right office dry-wall panel */}
            <div className="w-8 h-40 bg-zinc-800/40 border border-zinc-800/80 rounded-lg shrink-0" />
          </div>
        </div>
      )
    },
    {
      number: "04",
      title: "Особые задачи",
      description: "Остекление со смарт-стеклом (переключаемый матовость), экраны бронирования, датчики CO2 или кастомные порты.",
      icon: Settings,
      illustration: (
        <div className="w-full h-48 relative flex items-center justify-center overflow-hidden">
          {/* Specialized task cabin with interactive screens / smart glass indicators */}
          <div className="w-36 h-44 relative bg-[#18181B] rounded-2xl border border-zinc-850 flex items-center justify-center p-4 shadow-2xl transition-all">
            {/* Internal setup with smart glass screen overlay */}
            <div className="w-full h-full border border-zinc-800 bg-zinc-950/50 rounded-xl relative flex flex-col justify-center items-center p-2">
              
              {/* Mock interactive screen panel */}
              <div className="w-11/12 h-10 bg-blue-600/20 border border-blue-500/50 rounded-lg flex items-center justify-center mb-3 shadow-[0_0_10px_rgba(59,130,246,0.3)]">
                <div className="w-4 h-1.5 bg-blue-400 rounded-full animate-pulse" />
              </div>

              {/* Horizontal decorative metal slots */}
              <div className="w-10/12 h-1 bg-zinc-800 rounded mb-1" />
              <div className="w-10/12 h-1 bg-zinc-800 rounded mb-1" />
              
              {/* Door handle indicator */}
              <div className="absolute right-2 inset-y-0 w-4 flex items-center justify-center">
                <span className="w-1 h-8 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
              </div>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <section 
      className="py-24 sm:py-32 bg-[#0A0A0C] text-white relative border-t border-zinc-900"
      id="custom-solutions-section"
    >
      {/* Background radial accent flare */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Title and Subtitle Block */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <h2 className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-white leading-[1.1]" id="custom-heading">
            Когда стандартного <br />
            <span className="bg-gradient-to-r from-blue-500 via-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              решения не существует
            </span>
          </h2>
          <p className="mt-6 text-sm sm:text-base text-zinc-400 leading-relaxed font-normal max-w-xl">
            Меняем геометрию, конфигурацию, отделку, остекление. Адаптируем под несущие колонны, низкие потолки, фирменные цвета.
          </p>
        </div>

        {/* 4 Cards Grid - Sleek Minimalist Dark cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16" id="custom-cards-grid">
          {CARDS.map((card) => (
            <div
              key={card.number}
              onClick={() => handleOpenModal(card.title)}
              className="bg-[#121215]/80 hover:bg-[#141418] border border-zinc-850/65 hover:border-zinc-700/80 rounded-[28px] p-6 flex flex-col justify-between transition-all duration-300 group shadow-lg cursor-pointer hover:shadow-2xl hover:-translate-y-1"
              id={`custom-card-${card.number}`}
            >
              <div>
                {/* Illustration Panel */}
                <div className="mb-6 rounded-2xl bg-black/40 p-4 border border-zinc-900 flex items-center justify-center relative overflow-hidden">
                  {card.illustration}
                </div>

                {/* Card Number and Title */}
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

        {/* Bottom Call to Action Button */}
        <div className="flex justify-center" id="custom-solutions-action-wrap">
          <button
            onClick={() => handleOpenModal()}
            className="px-8 py-4 bg-[#2563EB] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold rounded-full flex items-center justify-center space-x-2.5 transition-all duration-300 shadow-lg shadow-blue-500/10 cursor-pointer active:scale-95"
            id="discuss-custom-project-btn"
          >
            <span>Обсудить кастомный проект</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Inquiry Form Modal for Custom Cabin Projects */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="custom-project-modal">
            
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Body Card container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#121215] text-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl relative z-10 border border-zinc-800"
            >
              
              {/* Electric blue glowing accent top strip */}
              <div className="h-1.5 bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500" />

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors flex items-center justify-center cursor-pointer border border-zinc-800"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 sm:p-10">
                
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.form
                      key="modal-custom-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Title block */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-1.5 text-blue-500 text-xs font-mono font-bold tracking-wider uppercase">
                          <Sparkles className="w-4 h-4" />
                          <span>ИНДИВИДУАЛЬНОЕ ТЗ</span>
                        </div>
                        <h3 className="text-2xl font-black text-white tracking-tight leading-tight">
                          Заявка на кастомный проект
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                          Расскажите о вашей задаче. Наши менеджеры разработают эскиз решения и сделают предварительный расчет стоимости за 1 день.
                        </p>
                      </div>

                      {/* Interactive Fields */}
                      <div className="space-y-4">
                        
                        {/* Name Input */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Имя</label>
                          <input
                            type="text"
                            required
                            placeholder="Константин"
                            value={formData.name}
                            onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                            className="w-full bg-[#18181C] border border-zinc-800 text-sm px-4 py-3.5 rounded-2xl text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        {/* Phone Input */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Телефон</label>
                          <input
                            type="tel"
                            required
                            placeholder="+7 (999) 000-00-00"
                            value={formData.phone}
                            onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                            className="w-full bg-[#18181C] border border-zinc-800 text-sm px-4 py-3.5 rounded-2xl text-white focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        {/* Choice of custom direction */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Направление кастомизации</label>
                          <select
                            value={formData.idea}
                            onChange={(e) => setFormData(p => ({ ...p, idea: e.target.value }))}
                            className="w-full bg-[#18181C] border border-zinc-800 text-sm px-4 py-3.5 rounded-2xl text-white focus:outline-none focus:border-blue-500"
                          >
                            <option value="Нестандартная геометрия">Нестандартная геометрия</option>
                            <option value="Фирменные цвета">Фирменные цвета (RAL / Обивка)</option>
                            <option value="Интеграция в интерьер">Интеграция в интерьер (Встраивание)</option>
                            <option value="Особые задачи">Особые задачи (Smart-стекло, датчики)</option>
                          </select>
                        </div>

                        {/* Custom Task description details */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Детали задачи (необязательно)</label>
                          <textarea
                            rows={3}
                            placeholder="Например: нужно встроить двухместную кабину в готовую гипсокартонную нишу глубиной 1250 мм..."
                            value={formData.details}
                            onChange={(e) => setFormData(p => ({ ...p, details: e.target.value }))}
                            className="w-full bg-[#18181C] border border-zinc-800 text-sm px-4 py-3 rounded-2xl text-white focus:outline-none focus:border-blue-500 resize-none"
                          />
                        </div>

                      </div>

                      {/* Submit button */}
                      <button
                        type="submit"
                        className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-2xl flex items-center justify-center space-x-2.5 transition-all cursor-pointer shadow-md shadow-blue-600/10 active:scale-99"
                      >
                        <span>Отправить на расчет</span>
                        <Send className="w-4 h-4" />
                      </button>

                      <div className="text-[10px] text-zinc-500 text-center">
                        Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности.
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="modal-custom-success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-center flex flex-col items-center py-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-2xl font-black text-white tracking-tight">Расчет запущен!</h3>
                        <p className="text-sm text-zinc-400 leading-relaxed font-normal">
                          Спасибо, {formData.name}. Мы уже распределили вашу задачу в конструкторский отдел.
                        </p>
                      </div>

                      <div className="p-4 bg-[#18181C] rounded-2xl border border-zinc-800 text-xs text-zinc-400 text-left max-w-sm leading-normal">
                        Направление: <span className="text-white font-bold">{formData.idea}</span>. Специфика нашего КБ позволяет решать сложные архитектурные вызовы. Мы свяжемся с вами по номеру <span className="text-white font-bold">{formData.phone}</span> для уточнения замеров и подготовим 3D-модель со сметой.
                      </div>

                      <button
                        onClick={handleCloseModal}
                        className="mt-4 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 text-xs font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Отлично, закрыть
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
