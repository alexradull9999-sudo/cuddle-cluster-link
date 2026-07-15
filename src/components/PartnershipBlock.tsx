import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, UserCheck, FolderOpen, Send, X, CheckCircle2, ArrowRight } from "lucide-react";

export default function PartnershipBlock() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;
    setIsSuccess(true);
  };

  const handleClose = () => {
    setIsFormOpen(false);
    setIsSuccess(false);
    setFormData({
      name: "",
      company: "",
      phone: "",
      email: "",
    });
  };

  const benefits = [
    {
      icon: ShieldCheck,
      title: "Надежное партнерство",
      description: "Прозрачные условия и долгосрочные отношения",
    },
    {
      icon: UserCheck,
      title: "Персональный менеджер",
      description: "Сопровождаем сделку от заявки до монтажа",
    },
    {
      icon: FolderOpen,
      title: "Готовые материалы",
      description: "Презентации, фото и образцы для ваших клиентов",
    },
  ];

  return (
    <section 
      className="py-20 sm:py-28 bg-[#F4F3EE] text-zinc-900 relative border-t border-zinc-200/40" 
      id="partnership-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Block: Heading and description */}
          <div className="lg:col-span-6 space-y-6" id="partnership-header-pane">
            <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase font-mono block">
              ПАРТНЕРСКАЯ ПРОГРАММА
            </span>
            <h2 className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]" id="partnership-heading">
              Развивайтесь<br />вместе с ACUCAB
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-normal max-w-lg">
              Представляйте акустические кабины Российского производства и работайте с надежным партнером. Мы рядом на каждом этапе — от расчета проекта до монтажа у клиента.
            </p>
            
            <div className="pt-2">
              <button
                onClick={() => setIsFormOpen(true)}
                className="px-8 py-4 bg-[#0A0A0C] hover:bg-zinc-800 text-white text-xs font-bold rounded-full flex items-center gap-2 cursor-pointer shadow-md active:scale-98 transition-all uppercase tracking-wider"
                id="partnership-btn"
              >
                <span>Стать партнером</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Block: Vertical stacked benefit cards */}
          <div className="lg:col-span-6 space-y-4" id="partnership-benefits-pane">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-6 border border-zinc-200/40 flex items-start gap-4 shadow-sm hover:shadow-md transition-all duration-300"
                  id={`partnership-benefit-card-${idx}`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                    <Icon className="w-5.5 h-5.5" />
                  </div>
                  
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-zinc-900 tracking-tight">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 font-normal leading-normal">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>

      {/* Become a Partner Modal Form */}
      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="partnership-modal">
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl relative z-10 border border-zinc-100"
            >
              <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />

              <button
                onClick={handleClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8">
                
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.form
                      key="partnership-apply-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-5"
                    >
                      <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest font-mono">
                          ПАРТНЕРСКАЯ ПРОГРАММА
                        </span>
                        <h3 className="text-xl font-black text-zinc-900 tracking-tight leading-tight">
                          Заявка на партнерство
                        </h3>
                        <p className="text-xs text-zinc-500 leading-relaxed font-normal">
                          Заполните форму, и наш менеджер свяжется с вами для обсуждения специальных условий сотрудничества.
                        </p>
                      </div>

                      <div className="space-y-3.5">
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
                          <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Компания / Студия</label>
                          <input
                            type="text"
                            placeholder="Дизайн-бюро 'Пространство'"
                            value={formData.company}
                            onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
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
                          <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Email</label>
                          <input
                            type="email"
                            placeholder="partner@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                            className="w-full bg-zinc-50 border border-zinc-200 text-sm px-4 py-3 rounded-xl text-zinc-900 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md shadow-blue-600/10 active:scale-99"
                      >
                        <span>Отправить заявку</span>
                        <Send className="w-4 h-4" />
                      </button>

                      <div className="text-[9px] text-zinc-400 text-center leading-normal">
                        Нажимая кнопку, вы соглашаетесь с условиями обработки персональных данных.
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="partnership-apply-success"
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
                          Специалист по работе с партнерами свяжется с вами по номеру <span className="text-zinc-900 font-bold">{formData.phone}</span> в течение ближайших часов.
                        </p>
                      </div>

                      <p className="text-[10px] text-zinc-400 bg-zinc-50 p-4 rounded-xl border border-zinc-150 leading-normal text-left">
                        Мы подготовили для вас полный комплект партнерских материалов: каталоги в формате PDF, 3D-модели кабин для ваших дизайн-проектов, а также таблицу дилерских скидок.
                      </p>

                      <button
                        onClick={handleClose}
                        className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                      >
                        Отлично, спасибо
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
