import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Ruler, ClipboardCheck, CalendarDays, X, CheckCircle2, Loader2, ArrowRight } from "lucide-react";
import { sendLead } from "@/lib/webhook";

export default function CommercialProposalBlock() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.contact) return;

    setIsSubmitting(true);
    sendLead("commercial_proposal_block", {
      name: formData.name,
      contact: formData.contact,
      company: formData.company,
    }).finally(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({ name: "", contact: "", company: "" });
    }, 300);
  };

  return (
    <section className="bg-[#0f0f0e] py-20 border-y border-zinc-900/50" id="commercial-proposal-section">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header content */}
        <div className="text-center md:text-left max-w-2xl mb-14">
          <h2 className="font-display font-semibold text-[32px] sm:text-[40px] text-[#fafaf7] leading-tight mb-4">
            Нужно согласовать с руководством?
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#6b6b66] max-w-[560px] leading-relaxed mx-auto md:mx-0">
            Вышлем готовое коммерческое предложение — с планировкой, сметой и сроками. Удобно показать на встрече или отправить на почту.
          </p>
        </div>

        {/* 3 cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Card 1 */}
          <div className="bg-[#1a1a18] rounded-[16px] p-[28px] flex flex-col items-start space-y-4 border border-zinc-800/10 hover:border-[#2e5bff]/20 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#121211] flex items-center justify-center border border-zinc-800 group-hover:bg-[#2e5bff]/5 group-hover:border-[#2e5bff]/30 transition-all">
              <Ruler className="w-5 h-5 text-[#2e5bff]" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-[18px] text-[#fafaf7] mb-2 leading-tight">
                Планировка под ваш офис
              </h3>
              <p className="font-sans text-sm text-[#8a8a85] leading-relaxed">
                Учтём размеры помещения и расположение кабин
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#1a1a18] rounded-[16px] p-[28px] flex flex-col items-start space-y-4 border border-zinc-800/10 hover:border-[#2e5bff]/20 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#121211] flex items-center justify-center border border-zinc-800 group-hover:bg-[#2e5bff]/5 group-hover:border-[#2e5bff]/30 transition-all">
              <ClipboardCheck className="w-5 h-5 text-[#2e5bff]" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-[18px] text-[#fafaf7] mb-2 leading-tight">
                Смета по позициям
              </h3>
              <p className="font-sans text-sm text-[#8a8a85] leading-relaxed">
                Каждая строка с ценой — легко защитить бюджет
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#1a1a18] rounded-[16px] p-[28px] flex flex-col items-start space-y-4 border border-zinc-800/10 hover:border-[#2e5bff]/20 transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-[#121211] flex items-center justify-center border border-zinc-800 group-hover:bg-[#2e5bff]/5 group-hover:border-[#2e5bff]/30 transition-all">
              <CalendarDays className="w-5 h-5 text-[#2e5bff]" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-[18px] text-[#fafaf7] mb-2 leading-tight">
                Сроки и этапы
              </h3>
              <p className="font-sans text-sm text-[#8a8a85] leading-relaxed">
                Производство, доставка, монтаж — всё в одном документе
              </p>
            </div>
          </div>

        </div>

        {/* Center Button and text */}
        <div className="flex flex-col items-center justify-center text-center mt-12">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-[#2e5bff] hover:bg-[#1e4be6] text-white font-display font-semibold text-[18px] py-[16px] px-[40px] rounded-[12px] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#2e5bff]/10 cursor-pointer"
            id="get-kp-btn"
          >
            Получить КП за 2 часа →
          </button>
          <p className="text-[#6b6b66] text-[14px] mt-4 font-sans font-normal leading-relaxed">
            Отвечаем в рабочее время. Без звонков — только если сами попросите.
          </p>
        </div>

      </div>

      {/* Inquiry Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="kp-request-modal">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleClose}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-[#121211] border border-zinc-800/80 rounded-[28px] w-full max-w-lg overflow-hidden shadow-2xl relative z-10"
            >
              {/* Accent top bar */}
              <div className="h-1.5 bg-[#2e5bff]" />

              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Закрыть окно"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 sm:p-10">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <motion.div
                      key="form-view"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6"
                    >
                      <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 text-[#2e5bff] text-xs font-semibold font-sans tracking-wider uppercase bg-[#2e5bff]/10 px-3 py-1 rounded-full">
                          <span>КОММЕРЧЕСКОЕ ПРЕДЛОЖЕНИЕ</span>
                        </div>
                        <h3 className="text-2xl font-display font-semibold text-[#fafaf7] tracking-tight leading-tight">
                          Получить КП за 2 часа
                        </h3>
                        <p className="text-sm text-[#8a8a85] leading-relaxed font-sans">
                          Заполните форму, и мы вышлем подробный документ со сметой по позициям, планировкой под ваш офис и этапами реализации.
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name input */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                            Как к вам обращаться
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            placeholder="Константин"
                            className="w-full bg-zinc-900/80 border border-zinc-800/80 text-[#fafaf7] px-4 py-3.5 rounded-xl text-sm placeholder-zinc-600 focus:outline-none focus:border-[#2e5bff] transition-all"
                          />
                        </div>

                        {/* Contact input */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                            Телефон или Email для отправки КП
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.contact}
                            onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                            placeholder="+7 (___) ___-__-__ или mail@domain.ru"
                            className="w-full bg-zinc-900/80 border border-zinc-800/80 text-[#fafaf7] px-4 py-3.5 rounded-xl text-sm placeholder-zinc-600 focus:outline-none focus:border-[#2e5bff] transition-all"
                          />
                        </div>

                        {/* Company name input */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1">
                            Название компании (необязательно)
                          </label>
                          <input
                            type="text"
                            value={formData.company}
                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                            placeholder="ООО «Вектор»"
                            className="w-full bg-zinc-900/80 border border-zinc-800/80 text-[#fafaf7] px-4 py-3.5 rounded-xl text-sm placeholder-zinc-600 focus:outline-none focus:border-[#2e5bff] transition-all"
                          />
                        </div>

                        {/* Action Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-4 bg-[#2e5bff] hover:bg-[#1e4be6] text-white font-display font-semibold rounded-xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-[0.99] disabled:opacity-50"
                          >
                            {isSubmitting ? (
                              <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                              <>
                                <span>Получить расчет КП</span>
                                <ArrowRight className="w-4 h-4" />
                              </>
                            )}
                          </button>
                        </div>

                        {/* Disclaimer */}
                        <p className="text-[11px] text-zinc-500 text-center leading-relaxed font-sans">
                          Нажимая на кнопку, вы соглашаетесь с Политикой конфиденциальности и обработки персональных данных.
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="success-view"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-6 text-center space-y-5"
                    >
                      <div className="w-16 h-16 rounded-full bg-[#2e5bff]/10 flex items-center justify-center text-[#2e5bff] mx-auto border border-[#2e5bff]/20">
                        <CheckCircle2 className="w-8 h-8" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-display font-semibold text-[#fafaf7] tracking-tight">
                          Заявка отправлена!
                        </h3>
                        <p className="text-sm text-[#8a8a85] leading-relaxed font-sans max-w-sm mx-auto">
                          Спасибо, <span className="text-white font-medium">{formData.name}</span>. Наш инженер уже готовит коммерческое предложение с планировкой и сметой. Мы свяжемся с вами в течение 2 часов.
                        </p>
                      </div>
                      <div className="pt-2">
                        <button
                          onClick={handleClose}
                          className="px-6 py-2.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 text-[#fafaf7] rounded-xl text-sm font-medium transition-all cursor-pointer"
                        >
                          Закрыть
                        </button>
                      </div>
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
