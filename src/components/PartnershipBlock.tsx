import React from "react";
import { ShieldCheck, UserCheck, FolderOpen, ArrowRight } from "lucide-react";
import { openLeadPopup } from "@/lib/leadPopup";

export default function PartnershipBlock() {
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

  const handleOpen = () =>
    openLeadPopup("partnership_block", {
      title: "Заявка на партнерство",
      subtitle:
        "Оставьте контакт — менеджер расскажет об условиях партнерской программы.",
      buttonLabel: "Стать партнером",
    });

  return (
    <section
      className="py-20 sm:py-28 bg-[#F4F3EE] text-zinc-900 relative border-t border-zinc-200/40"
      id="partnership-section"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6" id="partnership-header-pane">
            <span className="text-[10px] font-bold text-blue-600 tracking-widest uppercase font-mono block">
              ПАРТНЕРСКАЯ ПРОГРАММА
            </span>
            <h2
              className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]"
              id="partnership-heading"
            >
              Развивайтесь<br />вместе с ACUCAB
            </h2>
            <p className="text-sm sm:text-base text-zinc-500 leading-relaxed font-normal max-w-lg">
              Представляйте акустические кабины Российского производства и работайте с надежным партнером. Мы рядом на каждом этапе — от расчета проекта до монтажа у клиента.
            </p>

            <div className="pt-2">
              <button
                onClick={handleOpen}
                className="px-8 py-4 bg-[#0A0A0C] hover:bg-zinc-800 text-white text-xs font-bold rounded-full flex items-center gap-2 cursor-pointer shadow-md active:scale-98 transition-all uppercase tracking-wider"
                id="partnership-btn"
              >
                <span>Стать партнером</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

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
    </section>
  );
}
