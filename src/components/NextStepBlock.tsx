import React from "react";
import { ArrowRight } from "lucide-react";

export default function NextStepBlock() {
  const steps = [
    {
      tag: "У МЕНЯ ЕСТЬ ЗАДАЧА",
      title: "Получить расчет",
      href: "#get-quote-section",
      isPrimary: true,
    },
    {
      tag: "ЕЩЕ ВЫБИРАЮ",
      title: "Подобрать модель",
      href: "#constructor",
      isPrimary: false,
    },
    {
      tag: "ХОЧУ ПРОВЕРИТЬ",
      title: "Записаться в шоурум",
      href: "#showroom",
      isPrimary: false,
    },
    {
      tag: "НЕСТАНДАРТНЫЙ ПРОЕКТ",
      title: "Обсудить кастом",
      href: "#custom-solutions-section",
      isPrimary: false,
    },
  ];

  return (
    <section 
      className="py-20 sm:py-28 bg-[#0A0A0C] text-white relative overflow-hidden border-t border-zinc-900" 
      id="next-step-section"
    >
      {/* Background Radial Glow mimicking the screenshot's purple/blue/indigo glow */}
      <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Block */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-white leading-[1.1]" id="next-step-heading">
            Следующий шаг — за <span className="text-[#5A63FF]">вами</span>
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-4 max-w-2xl leading-relaxed font-normal">
            Мы готовы помочь так, как удобнее: посчитать конкретный проект, подобрать модель, показать кабины вживую или обсудить кастом
          </p>
        </div>

        {/* Next Steps Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="next-step-grid">
          {steps.map((step, idx) => (
            <a
              key={idx}
              href={step.href}
              className={`group flex flex-col justify-between p-6 rounded-[20px] transition-all h-40 border ${
                step.isPrimary
                  ? "bg-[#4E54FF] border-transparent hover:bg-[#5C62FF] shadow-lg shadow-indigo-600/10 text-white"
                  : "bg-[#161619] border-white/[0.06] hover:border-white/15 hover:bg-white/[0.04] text-white"
              }`}
              id={`next-step-card-${idx}`}
            >
              {/* Tagline */}
              <div>
                <span className={`text-[10px] font-bold tracking-widest uppercase block mb-1 ${
                  step.isPrimary ? "text-white/80" : "text-zinc-500 group-hover:text-zinc-400"
                }`}>
                  {step.tag}
                </span>
              </div>

              {/* Action Title with Arrow */}
              <div className="flex items-center justify-between mt-auto">
                <span className="text-base sm:text-lg font-bold tracking-tight">
                  {step.title}
                </span>
                <ArrowRight className={`w-4.5 h-4.5 transition-transform duration-300 group-hover:translate-x-1 ${
                  step.isPrimary ? "text-white" : "text-zinc-400 group-hover:text-white"
                }`} />
              </div>
            </a>
          ))}
        </div>

      </div>
    </section>
  );
}
