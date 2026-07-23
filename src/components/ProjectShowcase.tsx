import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Send, CheckCircle2, ChevronRight, FolderLock } from "lucide-react";
import { sendLead } from "@/lib/webhook";

interface StatItem {
  value: string;
  label: string;
}

interface ProjectCase {
  id: string;
  badge: string;
  title: string;
  description: string;
  image: string;
  stats: StatItem[];
}

const CASES_DATA: ProjectCase[] = [
  {
    id: "case-1",
    badge: "ЕКАТЕРИНБУРГ",
    title: "14 кабин в опенспейсе на 600 человек",
    description: "Фокус-зоны и переговорные для продуктовых команд. Сняли фоновый гул и вернули людям возможность созваниваться, не выходя в коридор.",
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/case-openspace.jpg",
    stats: [
      { value: "-27 дБ", label: "в зоне фокус-работы" },
      { value: "14", label: "кабин Фокус и Переговоры" },
      { value: "3 дня", label: "на весь монтаж" }
    ]
  },
  {
    id: "case-2",
    badge: "МОСКВА",
    title: "ACUCAB ОФИС 2 на каждом этаже",
    description: "Переговорные для быстрых созвонов рядом с рабочими местами.",
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/case-meet.jpg",
    stats: [
      { value: "9", label: "кабин" },
      { value: "-24 дБ", label: "шумоизоляция" },
      { value: "4 чел.", label: "в переговорной" }
    ]
  },
  {
    id: "case-3",
    badge: "САНКТ-ПЕТЕРБУРГ",
    title: "ACUCAB 6 для дейли и ретро",
    description: "Командная кабина на шесть человек вместо вечно занятой переговорной.",
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/case-team.jpg",
    stats: [
      { value: "6 чел.", label: "за закрытой дверью" },
      { value: "-26 дБ", label: "от шума опенспейса" },
      { value: "1 день", label: "монтаж под ключ" }
    ]
  },
  {
    id: "case-4",
    badge: "КАЗАНЬ",
    title: "Кабина в кабинете врача",
    description: "Тихая среда для приема и слуховых тестов в потоке клиники.",
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/case-med.jpg",
    stats: [
      { value: "32 дБ", label: "изоляция" },
      { value: "1 чел.", label: "комфортный прием" },
      { value: "от 30 дней", label: "срок изготовления" }
    ]
  },
  {
    id: "case-5",
    badge: "МОСКВА",
    title: "ACUCAB ЭЛЛИПС под фирменный стиль",
    description: "Брендированная отделка и умное стекло в цвет интерьера штаб-квартиры.",
    image: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/case-brand.jpg",
    stats: [
      { value: "4", label: "кабины в брендинге" },
      { value: "RAL", label: "брендовые цвета корпуса" },
      { value: "Умное", label: "тонируемое стекло" }
    ]
  }
];

export default function ProjectShowcase() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    company: "",
    email: ""
  });

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setFormSubmitted(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    sendLead("project_showcase_catalog", {
      name: formData.name,
      phone: formData.phone,
      company: formData.company,
      email: formData.email,
    });
    setFormSubmitted(true);
  };

  return (
    <section className="py-20 sm:py-28 bg-[#FCFCFC] text-zinc-900 relative border-t border-zinc-200/50" id="projects">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block with Title & Call-to-Action */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16" id="projects-header">
          <div className="max-w-xl">
            <h2 className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]" id="projects-heading">
              Установлено и работает
            </h2>
            <p className="mt-4 text-sm sm:text-base text-zinc-500 leading-relaxed font-normal">
              Каждая кабина в портфолио — реальный офис, реальная задача, реальный результат.
            </p>
          </div>
          
          <div className="shrink-0">
            <button
              onClick={handleOpenModal}
              className="px-6 py-3.5 bg-[#0F0F11] hover:bg-zinc-800 text-white text-xs sm:text-sm font-bold rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-95"
              id="request-projects-btn"
            >
              Запросить подборку проектов
            </button>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-12 gap-6 sm:gap-8" id="projects-bento-grid">
          
          {/* 1. Large Top Spanning Card (case-1) */}
          <div className="col-span-12 group relative rounded-[32px] overflow-hidden aspect-[16/10] sm:aspect-[16/8] md:aspect-[21/9] bg-zinc-900 border border-zinc-200/10 shadow-sm" id="bento-card-large">
            {/* Background Image with Zoom */}
            <img
              src={CASES_DATA[0].image}
              alt={CASES_DATA[0].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            
            {/* Deep Dark Linear Gradient Mask for Readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

            {/* Content Container */}
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-between z-10">
              
              {/* Badge */}
              <div>
                <span className="inline-block bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-lg border border-white/15 text-[10px] font-extrabold text-white tracking-widest uppercase font-sans">
                  {CASES_DATA[0].badge}
                </span>
              </div>

              {/* Bottom text block with stats */}
              <div className="space-y-6 max-w-4xl">
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                    {CASES_DATA[0].title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300/90 leading-relaxed font-normal max-w-2xl">
                    {CASES_DATA[0].description}
                  </p>
                </div>

                {/* Horizontal Stat Rows */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10 max-w-3xl">
                  {CASES_DATA[0].stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-lg sm:text-2xl font-black text-white tracking-tight leading-none mb-1.5">
                        {stat.value}
                      </span>
                      <span className="text-[10px] sm:text-xs text-zinc-400 font-medium leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* 2. Middle Row Left Card (case-2) */}
          <div className="col-span-12 md:col-span-6 group relative rounded-[32px] overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-zinc-900 border border-zinc-200/10 shadow-sm" id="bento-card-moscow-1">
            <img
              src={CASES_DATA[1].image}
              alt={CASES_DATA[1].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
              <div>
                <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15 text-[10px] font-extrabold text-white tracking-widest uppercase font-sans">
                  {CASES_DATA[1].badge}
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {CASES_DATA[1].title}
                  </h3>
                  <p className="text-xs text-zinc-400/90 leading-relaxed font-normal">
                    {CASES_DATA[1].description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                  {CASES_DATA[1].stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-base sm:text-lg font-black text-white tracking-tight leading-none mb-1">
                        {stat.value}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 font-medium leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 3. Middle Row Right Card (case-3) */}
          <div className="col-span-12 md:col-span-6 group relative rounded-[32px] overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-zinc-900 border border-zinc-200/10 shadow-sm" id="bento-card-spb">
            <img
              src={CASES_DATA[2].image}
              alt={CASES_DATA[2].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
              <div>
                <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15 text-[10px] font-extrabold text-white tracking-widest uppercase font-sans">
                  {CASES_DATA[2].badge}
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {CASES_DATA[2].title}
                  </h3>
                  <p className="text-xs text-zinc-400/90 leading-relaxed font-normal">
                    {CASES_DATA[2].description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                  {CASES_DATA[2].stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-base sm:text-lg font-black text-white tracking-tight leading-none mb-1">
                        {stat.value}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 font-medium leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 4. Bottom Row Left Card (case-4) */}
          <div className="col-span-12 md:col-span-6 group relative rounded-[32px] overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-zinc-900 border border-zinc-200/10 shadow-sm" id="bento-card-kazan">
            <img
              src={CASES_DATA[3].image}
              alt={CASES_DATA[3].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
              <div>
                <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15 text-[10px] font-extrabold text-white tracking-widest uppercase font-sans">
                  {CASES_DATA[3].badge}
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {CASES_DATA[3].title}
                  </h3>
                  <p className="text-xs text-zinc-400/90 leading-relaxed font-normal">
                    {CASES_DATA[3].description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                  {CASES_DATA[3].stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-base sm:text-lg font-black text-white tracking-tight leading-none mb-1">
                        {stat.value}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 font-medium leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 5. Bottom Row Right Card (case-5) */}
          <div className="col-span-12 md:col-span-6 group relative rounded-[32px] overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-zinc-900 border border-zinc-200/10 shadow-sm" id="bento-card-moscow-branding">
            <img
              src={CASES_DATA[4].image}
              alt={CASES_DATA[4].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />

            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
              <div>
                <span className="inline-block bg-white/10 backdrop-blur-md px-3 py-1 rounded-lg border border-white/15 text-[10px] font-extrabold text-white tracking-widest uppercase font-sans">
                  {CASES_DATA[4].badge}
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {CASES_DATA[4].title}
                  </h3>
                  <p className="text-xs text-zinc-400/90 leading-relaxed font-normal">
                    {CASES_DATA[4].description}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                  {CASES_DATA[4].stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col">
                      <span className="text-base sm:text-lg font-black text-white tracking-tight leading-none mb-1">
                        {stat.value}
                      </span>
                      <span className="text-[9px] sm:text-[10px] text-zinc-400 font-medium leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Inquiry Modal Popup for downloading project booklets */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="project-download-modal">
            
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/70 backdrop-blur-md"
            />

            {/* Modal Body Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-[32px] w-full max-w-lg overflow-hidden shadow-2xl relative z-10 border border-zinc-100"
            >
              
              {/* Top cover stripe */}
              <div className="h-2 bg-gradient-to-r from-indigo-500 via-[#3b82f6] to-cyan-500" />

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Закрыть окно"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 sm:p-10">
                
                <AnimatePresence mode="wait">
                  {!formSubmitted ? (
                    <motion.div
                      key="modal-form-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      {/* Title block */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-indigo-600 text-xs font-bold font-mono tracking-wider uppercase">
                          <FolderLock className="w-4 h-4" />
                          <span>ПОРТФОЛИО КЕЙСОВ</span>
                        </div>
                        <h3 className="text-2xl font-black text-zinc-900 tracking-tight leading-tight">
                          Получить полную подборку проектов
                        </h3>
                        <p className="text-sm text-zinc-500 leading-relaxed font-normal">
                          Заполните короткую форму. Мы вышлем подробный PDF-каталог с фотографиями, чертежами и сметами реализованных офисов.
                        </p>
                      </div>

                      {/* Interactive Form */}
                      <form onSubmit={handleSubmit} className="space-y-4">
                        
                        {/* Name */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Имя</label>
                          <input
                            type="text"
                            required
                            placeholder="Константин"
                            value={formData.name}
                            onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                            className="w-full bg-zinc-50 border border-zinc-200 text-sm px-4 py-3.5 rounded-2xl text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        {/* Phone */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Телефон</label>
                          <input
                            type="tel"
                            required
                            placeholder="+7 (999) 000-00-00"
                            value={formData.phone}
                            onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                            className="w-full bg-zinc-50 border border-zinc-200 text-sm px-4 py-3.5 rounded-2xl text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        {/* Company */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Название компании</label>
                          <input
                            type="text"
                            placeholder="ТехноРейл"
                            value={formData.company}
                            onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
                            className="w-full bg-zinc-50 border border-zinc-200 text-sm px-4 py-3.5 rounded-2xl text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        {/* Email */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Почта (для отправки PDF)</label>
                          <input
                            type="email"
                            placeholder="konstantin@company.ru"
                            value={formData.email}
                            onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                            className="w-full bg-zinc-50 border border-zinc-200 text-sm px-4 py-3.5 rounded-2xl text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full mt-6 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-2xl flex items-center justify-center space-x-2.5 transition-all cursor-pointer shadow-md active:scale-99"
                        >
                          <span>Отправить запрос</span>
                          <Send className="w-4 h-4" />
                        </button>

                      </form>

                      <div className="text-[10px] text-zinc-400 leading-normal text-center">
                        Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных.
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="modal-success-view"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-center flex flex-col items-center py-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Запрос отправлен!</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed font-normal max-w-sm mx-auto">
                          Спасибо, {formData.name}. Мы уже формируем подборку проектов {formData.company ? `для компании ${formData.company}` : ""}. 
                        </p>
                      </div>

                      <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 text-xs text-zinc-500 text-left max-w-sm leading-normal">
                        PDF-каталог со спецификациями, результатами замеров тишины и прайс-листом отправлен на почту <span className="font-bold text-zinc-900">{formData.email || "указанный email"}</span>. Также наш специалист свяжется с вами по номеру <span className="font-bold text-zinc-900">{formData.phone}</span> в течение 15 минут.
                      </div>

                      <button
                        onClick={handleCloseModal}
                        className="mt-4 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
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
