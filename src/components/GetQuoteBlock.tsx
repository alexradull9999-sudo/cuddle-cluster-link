import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { sendLead } from "@/lib/webhook";

export default function GetQuoteBlock() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    agreeData: true,
    agreePromo: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    setIsSubmitting(true);
    sendLead("get_quote_block", {
      name: formData.name,
      phone: formData.phone,
      agreeData: formData.agreeData,
      agreePromo: formData.agreePromo,
    }).finally(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
    });
  };

  const handleReset = () => {
    setFormData({
      name: "",
      phone: "",
      agreeData: true,
      agreePromo: false,
    });
    setIsSuccess(false);
  };

  return (
    <section 
      className="py-20 sm:py-28 bg-[#FAF9F5] text-zinc-900 relative" 
      id="get-quote-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Quote Card wrapper matching screenshot details */}
        <div className="bg-white rounded-[32px] sm:rounded-[40px] border border-zinc-200/50 shadow-xl shadow-zinc-100/40 overflow-hidden" id="quote-card-container">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left side: Photo with absolute white badge on bottom left */}
            <div className="lg:col-span-5 relative min-h-[380px] lg:min-h-[500px] bg-[#E2EFFC]" id="engineer-photo-pane">
              <img
                src="https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/director-alexey.png"
                alt="Алексей Корнев - Главный инженер ACUCAB"
                className="absolute inset-0 w-full h-full object-cover object-top grayscale-0 brightness-[100%] hover:scale-[1.01] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              
              {/* Gradient tint over photo */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/10 via-transparent to-transparent pointer-events-none" />

              {/* Your Engineer Overlaid badge on bottom-left */}
              <div 
                className="absolute bottom-6 left-6 bg-white px-6 py-4.5 rounded-[20px] shadow-lg border border-zinc-100 max-w-[280px]"
                id="engineer-info-overlay"
              >
                <span className="text-[10px] font-bold text-zinc-400 tracking-widest uppercase block mb-1">
                  ВАШ ИНЖЕНЕР
                </span>
                <h4 className="text-base font-black text-zinc-900 tracking-tight leading-tight">
                  Алексей Корнев
                </h4>
                <p className="text-[11px] text-zinc-500 font-medium leading-normal mt-1">
                  Главный инженер ACUCAB
                </p>
              </div>
            </div>

            {/* Right side: Form, checkboxes, lists */}
            <div className="lg:col-span-7 p-8 sm:p-12 lg:p-16 flex flex-col justify-center" id="quote-form-pane">
              
              <AnimatePresence mode="wait">
                {!isSuccess ? (
                  <motion.div
                    key="quote-form-state"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-8"
                  >
                    {/* Header */}
                    <div className="space-y-3">
                      <h2 className="text-3xl sm:text-4xl font-sans font-black tracking-tight text-zinc-900 leading-[1.15]" id="quote-heading">
                        Получите расчет сегодня
                      </h2>
                      <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-normal max-w-lg">
                        С вами свяжется наш инженер, который понимает кабину изнутри.
                      </p>
                    </div>

                    {/* Bullet checklist with blue checkmarks */}
                    <div className="space-y-3" id="quote-features-list">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-xs sm:text-sm text-zinc-600 font-medium leading-normal">
                          Отвечаю в течение 2 часов в рабочее время
                        </span>
                      </div>
                      
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="text-xs sm:text-sm text-zinc-600 font-medium leading-normal">
                          Расчет под ваше помещение, а не типовой прайс
                        </span>
                      </div>
                    </div>

                    {/* Interactive Form */}
                    <form onSubmit={handleSubmit} className="space-y-6" id="quote-inputs-form">
                      
                      {/* Name & Phone side by side */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        
                        {/* Name Input */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                            ИМЯ
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Как к вам обращаться"
                            value={formData.name}
                            onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                            className="w-full bg-[#F7F7F9] border border-transparent hover:border-zinc-200 focus:border-zinc-400 text-sm px-4.5 py-4 rounded-2xl text-zinc-900 placeholder-zinc-400/90 focus:outline-none transition-all font-medium"
                          />
                        </div>

                        {/* Phone Input */}
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block">
                            ТЕЛЕФОН
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="+7 ___ ___ __ __"
                            value={formData.phone}
                            onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                            className="w-full bg-[#F7F7F9] border border-transparent hover:border-zinc-200 focus:border-zinc-400 text-sm px-4.5 py-4 rounded-2xl text-zinc-900 placeholder-zinc-400/90 focus:outline-none transition-all font-medium"
                          />
                        </div>

                      </div>

                      {/* Checkboxes for Agreements */}
                      <div className="space-y-3.5 pt-2">
                        
                        {/* Personal Data Consent */}
                        <label className="flex items-start gap-3 cursor-pointer group" id="agree-data-label">
                          <div className="relative shrink-0 mt-0.5">
                            <input
                              type="checkbox"
                              checked={formData.agreeData}
                              onChange={(e) => setFormData(p => ({ ...p, agreeData: e.target.checked }))}
                              className="sr-only"
                              required
                            />
                            <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                              formData.agreeData 
                                ? "bg-black border-black text-white" 
                                : "bg-white border-zinc-300 group-hover:border-zinc-400"
                            }`}>
                              {formData.agreeData && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                          <span className="text-[11px] text-zinc-500 leading-normal font-medium select-none">
                            Согласен на <a href="#privacy" className="text-blue-600 hover:underline">обработку персональных данных</a>. Не передаем контакты третьим лицам.
                          </span>
                        </label>

                        {/* Promo / Newsletter Consent */}
                        <label className="flex items-start gap-3 cursor-pointer group" id="agree-promo-label">
                          <div className="relative shrink-0 mt-0.5">
                            <input
                              type="checkbox"
                              checked={formData.agreePromo}
                              onChange={(e) => setFormData(p => ({ ...p, agreePromo: e.target.checked }))}
                              className="sr-only"
                            />
                            <div className={`w-4 h-4 rounded border transition-all flex items-center justify-center ${
                              formData.agreePromo 
                                ? "bg-black border-black text-white" 
                                : "bg-white border-zinc-300 group-hover:border-zinc-400"
                            }`}>
                              {formData.agreePromo && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                          </div>
                          <span className="text-[11px] text-zinc-500 leading-normal font-medium select-none">
                            Согласен <a href="#promo" className="text-blue-600 hover:underline">получать новости и маркетинговые материалы</a> ACUCAB. Можно отписаться в любой момент.
                          </span>
                        </label>

                      </div>

                      {/* Submit Button */}
                      <div className="pt-4">
                        <button
                          type="submit"
                          disabled={isSubmitting || !formData.agreeData}
                          className="w-full py-4.5 bg-black hover:bg-zinc-900 disabled:bg-zinc-300 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg active:scale-[0.99]"
                        >
                          {isSubmitting ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                          ) : (
                            <span className="text-sm">Получить расчет →</span>
                          )}
                        </button>
                      </div>

                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="quote-success-state"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", duration: 0.5 }}
                    className="space-y-6 text-center py-6 flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">Запрос отправлен!</h3>
                      <p className="text-sm sm:text-base text-zinc-500 leading-relaxed max-w-md font-normal">
                        Алексей уже получил ваше ТЗ и начал предварительный расчет для вашего помещения.
                      </p>
                    </div>

                    <div className="bg-[#F7F7F9] p-5 rounded-2xl border border-zinc-150 text-xs text-zinc-600 text-left max-w-md leading-normal">
                      Мы свяжемся с вами по номеру <span className="text-zinc-900 font-bold">{formData.phone}</span> в течение ближайших 2 часов для обсуждения параметров и размеров. Спасибо за доверие компании ACUCAB!
                    </div>

                    <button
                      onClick={handleReset}
                      className="px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                    >
                      Отправить еще один запрос
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
