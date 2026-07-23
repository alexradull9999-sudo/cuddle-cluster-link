import React from "react";
import { openLeadPopup } from "@/lib/leadPopup";
import {
  DoorClosed,
  Layers,
  Sliders,
  Activity,
  MapPin,
  Phone,
  ArrowRight,
  Clock,
} from "lucide-react";

const BENEFITS = [
  {
    id: "benefit-1",
    icon: DoorClosed,
    title: "Закрыть за собой дверь",
    description: "и услышать, как офис замолкает",
  },
  {
    id: "benefit-2",
    icon: Layers,
    title: "Сравнить отделки вживую",
    description: "цвета, материалы и стекло при одном свете",
  },
  {
    id: "benefit-3",
    icon: Sliders,
    title: "Проверить вентиляцию и свет",
    description: "посидеть подольше, а не на первый взгляд",
  },
  {
    id: "benefit-4",
    icon: Activity,
    title: "Замерить шум шумомером",
    description: "снаружи и внутри — в цифрах",
  },
];

export default function ShowroomBooking() {
  const handleOpen = () =>
    openLeadPopup("showroom_booking", {
      title: "Запись в шоурум СПб",
      subtitle: "Оставьте контакт — согласуем удобное время визита.",
      buttonLabel: "Записаться",
    });

  return (
    <section
      className="py-20 sm:py-28 bg-[#FAF9F5] text-zinc-900 relative border-t border-zinc-200/50"
      id="showroom"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 flex flex-col justify-between h-full" id="showroom-info-pane">
            <div className="space-y-4 mb-8">
              <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase font-mono">
                ШОУРУМ · САНКТ-ПЕТЕРБУРГ
              </span>
              <h2
                className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]"
                id="showroom-heading"
              >
                Послушайте тишину <br /> до покупки
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed max-w-xl font-normal">
                Акустику не оценить по фото и цифрам в дБ. Приезжайте — зайдите в кабину, почувствуйте разницу своими ушами.
              </p>
            </div>

            <div className="space-y-4 mb-10" id="showroom-benefits-list">
              {BENEFITS.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={benefit.id}
                    className="flex items-center gap-4 py-3.5 border-b border-zinc-200/50 last:border-0"
                    id={benefit.id}
                  >
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm border border-indigo-100/50">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-zinc-900 leading-snug">
                        {benefit.title}
                      </h4>
                      <p className="text-xs text-zinc-400 font-normal mt-0.5">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mb-10">
              <button
                onClick={handleOpen}
                className="px-8 py-4 bg-[#2563EB] hover:bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md shadow-blue-500/10 hover:shadow-lg active:scale-98"
                id="open-booking-modal-btn"
              >
                <span>Записаться в шоурум</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>

            <div
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-200/70"
              id="showroom-contacts-footer"
            >
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100/40">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">АДРЕС</span>
                  <span className="text-xs font-bold text-zinc-850 leading-tight">ул. Бехтерева, 3к2</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100/40">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">ГРАФИК</span>
                  <span className="text-xs font-bold text-zinc-850 leading-tight">Пн-Пт, 10:00–18:00</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100/40">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">ТЕЛЕФОН</span>
                  <a
                    href="tel:+79216437474"
                    className="text-xs font-bold text-zinc-850 leading-tight hover:text-indigo-600 transition-colors"
                  >
                    +7 (921) 643-74-74
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div
            className="lg:col-span-6 relative aspect-[1/1] sm:aspect-[4/3] lg:aspect-[1/1] w-full rounded-[36px] overflow-hidden shadow-xl border border-zinc-200/10 group"
            id="showroom-image-card"
          >
            <img
              src="https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/showroom-dark.png"
              alt="Шоурум Акукаб в Санкт-Петербурге"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />

            <div className="absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 flex items-center gap-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[10px] font-bold text-white tracking-wider font-sans">
                Шоурум открыт · Пн-Пт
              </span>
            </div>

            <div
              className="absolute top-6 right-6 z-10 bg-black/65 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-col gap-1.5 shadow-sm max-w-[210px]"
              id="realtime-noise-badge"
            >
              <div className="flex items-center gap-1.5 text-[9px] font-bold text-zinc-400 tracking-wider uppercase">
                <span className="h-1.5 w-1.5 rounded-full bg-[#10B981]" />
                <span>ЗАМЕР В ШОУРУМЕ СЕЙЧАС</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black text-white leading-none">58</span>
                  <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">дБ снаружи</span>
                </div>
                <span className="text-zinc-500 text-xs font-bold font-mono">→</span>
                <div className="flex flex-col">
                  <span className="text-lg sm:text-xl font-black text-[#3B82F6] leading-none">30</span>
                  <span className="text-[8px] text-zinc-500 font-bold uppercase tracking-wider">дБ внутри</span>
                </div>
              </div>
            </div>

            <div className="absolute bottom-8 left-8 z-10 max-w-[85%] space-y-1.5">
              <span className="text-[10px] font-extrabold text-[#3b82f6] tracking-widest uppercase font-sans">
                ВНУТРИ ACUCAB
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                Закройте дверь — и услышьте, как офис замолкает
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
