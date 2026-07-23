import React from "react";
import { Ruler, ClipboardCheck, CalendarDays } from "lucide-react";
import { openLeadPopup } from "@/lib/leadPopup";

export default function CommercialProposalBlock() {
  const handleOpen = () =>
    openLeadPopup("commercial_proposal_block", {
      title: "Получить КП за 2 часа",
      subtitle:
        "Оставьте контакт — вышлем подробное коммерческое предложение с планировкой и сметой.",
      buttonLabel: "Получить КП",
    });

  return (
    <section className="bg-[#0f0f0e] py-20 border-y border-zinc-900/50" id="commercial-proposal-section">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center md:text-left max-w-2xl mb-14">
          <h2 className="font-display font-semibold text-[32px] sm:text-[40px] text-[#fafaf7] leading-tight mb-4">
            Нужно согласовать с руководством?
          </h2>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#6b6b66] max-w-[560px] leading-relaxed mx-auto md:mx-0">
            Вышлем готовое коммерческое предложение — с планировкой, сметой и сроками. Удобно показать на встрече или отправить на почту.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

        <div className="flex flex-col items-center justify-center text-center mt-12">
          <button
            onClick={handleOpen}
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
    </section>
  );
}
