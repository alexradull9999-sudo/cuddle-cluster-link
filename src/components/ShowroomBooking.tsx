import React, { useState } from "react";
import { sendLead } from "@/lib/webhook";
import { 
  DoorClosed, 
  Layers, 
  Sliders, 
  Activity, 
  MapPin, 
  Calendar, 
  Phone, 
  ArrowRight, 
  X, 
  Send, 
  CheckCircle2, 
  Ticket,
  Clock,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ShowroomAppointment } from "../types";

const BENEFITS = [
  {
    id: "benefit-1",
    icon: DoorClosed,
    title: "Закрыть за собой дверь",
    description: "и услышать, как офис замолкает"
  },
  {
    id: "benefit-2",
    icon: Layers,
    title: "Сравнить отделки вживую",
    description: "цвета, материалы и стекло при одном свете"
  },
  {
    id: "benefit-3",
    icon: Sliders,
    title: "Проверить вентиляцию и свет",
    description: "посидеть подольше, а не на первый взгляд"
  },
  {
    id: "benefit-4",
    icon: Activity,
    title: "Замерить шум шумомером",
    description: "снаружи и внутри — в цифрах"
  }
];

export default function ShowroomBooking() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState<ShowroomAppointment>({
    name: "",
    phone: "",
    date: "",
    time: "",
    visitorCount: 1
  });

  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [ticketId, setTicketId] = useState<string>("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setBookingConfirmed(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.date || !formData.time) return;

    const generatedCode = `AC-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedCode);
    sendLead("showroom_booking", {
      name: formData.name,
      phone: formData.phone,
      date: formData.date,
      time: formData.time,
      visitorCount: formData.visitorCount,
      ticketId: generatedCode,
    });
    setBookingConfirmed(true);
  };

  return (
    <section 
      className="py-20 sm:py-28 bg-[#FAF9F5] text-zinc-900 relative border-t border-zinc-200/50" 
      id="showroom"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Main Grid Layout matching the screenshot */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headings, Benefits list, CTA button, Address details (7 cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between h-full" id="showroom-info-pane">
            
            {/* Header Title block */}
            <div className="space-y-4 mb-8">
              <span className="text-xs font-bold text-indigo-600 tracking-wider uppercase font-mono">
                ШОУРУМ · САНКТ-ПЕТЕРБУРГ
              </span>
              <h2 className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]" id="showroom-heading">
                Послушайте тишину <br /> до покупки
              </h2>
              <p className="text-sm sm:text-base text-zinc-500 leading-relaxed max-w-xl font-normal">
                Акустику не оценить по фото и цифрам в дБ. Приезжайте — зайдите в кабину, почувствуйте разницу своими ушами.
              </p>
            </div>

            {/* List of 4 Benefits */}
            <div className="space-y-4 mb-10" id="showroom-benefits-list">
              {BENEFITS.map((benefit) => {
                const IconComponent = benefit.icon;
                return (
                  <div 
                    key={benefit.id} 
                    className="flex items-center gap-4 py-3.5 border-b border-zinc-200/50 last:border-0"
                    id={benefit.id}
                  >
                    {/* Icon container */}
                    <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm border border-indigo-100/50">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    {/* Texts */}
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

            {/* Booking CTA Button */}
            <div className="mb-10">
              <button
                onClick={handleOpenModal}
                className="px-8 py-4 bg-[#2563EB] hover:bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md shadow-blue-500/10 hover:shadow-lg active:scale-98"
                id="open-booking-modal-btn"
              >
                <span>Записаться в шоурум</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Bottom Horizontal Contacts Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-zinc-200/70" id="showroom-contacts-footer">
              
              {/* Address */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100/40">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">АДРЕС</span>
                  <span className="text-xs font-bold text-zinc-850 leading-tight">ул. Бехтерева, 3к2</span>
                </div>
              </div>

              {/* Schedule */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100/40">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">ГРАФИК</span>
                  <span className="text-xs font-bold text-zinc-850 leading-tight">Пн-Пт, 10:00-19:00</span>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0 border border-indigo-100/40">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest block">ТЕЛЕФОН</span>
                  <a href="tel:+79216437474" className="text-xs font-bold text-zinc-850 leading-tight hover:text-indigo-600 transition-colors">
                    +7 (921) 643-74-74
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Interactive high-fidelity visual with overlays (5 cols) */}
          <div className="lg:col-span-6 relative aspect-[1/1] sm:aspect-[4/3] lg:aspect-[1/1] w-full rounded-[36px] overflow-hidden shadow-xl border border-zinc-200/10 group" id="showroom-image-card">
            
            {/* Main high quality interior/showroom image */}
            <img
              src="https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/showroom-dark.png"
              alt="Шоурум Акукаб в Санкт-Петербурге"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
              referrerPolicy="no-referrer"
            />

            {/* Gradient Mask for bottom heading readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/30" />

            {/* Overlays */}

            {/* Top Left Badge: Showroom status */}
            <div className="absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-md px-3.5 py-2 rounded-full border border-white/10 flex items-center gap-1.5 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              <span className="text-[10px] font-bold text-white tracking-wider font-sans">
                Шоурум открыт · Пн-Пт
              </span>
            </div>

            {/* Top Right Badge: Realtime Noise Decibel levels */}
            <div className="absolute top-6 right-6 z-10 bg-black/65 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex flex-col gap-1.5 shadow-sm max-w-[210px]" id="realtime-noise-badge">
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

            {/* Bottom Left Title text block */}
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

      {/* Appointment Booking Scheduler Modal Dialogue */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4" id="showroom-booking-modal">
            
            {/* Modal Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="fixed inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Body Card container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-[32px] w-full max-w-xl overflow-hidden shadow-2xl relative z-10 border border-zinc-100 flex flex-col"
            >
              
              {/* Gradient border effect bar on top */}
              <div className="h-2 bg-gradient-to-r from-[#2563EB] via-indigo-500 to-[#10B981]" />

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-500 hover:text-zinc-900 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Закрыть"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-8 sm:p-10 overflow-y-auto max-h-[85vh]">
                
                <AnimatePresence mode="wait">
                  {!bookingConfirmed ? (
                    <motion.form
                      key="modal-booking-form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      {/* Title block */}
                      <div className="space-y-1.5">
                        <span className="text-xs font-mono font-bold text-indigo-600 uppercase tracking-widest block">
                          ИНДИВИДУАЛЬНЫЙ ТЕСТ-ДРАЙВ
                        </span>
                        <h3 className="text-2xl font-black text-zinc-900 tracking-tight leading-tight">
                          Запись в шоурум СПб
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-500 leading-relaxed">
                          Выберите комфортное время. Мы заварим свежий кофе, подготовим демонстрационные стенды кабин и образцы материалов под ваш проект.
                        </p>
                      </div>

                      {/* Interactive Fields */}
                      <div className="space-y-4">
                        
                        {/* Name Input */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Ваше имя</label>
                          <input
                            type="text"
                            required
                            placeholder="Константин"
                            value={formData.name}
                            onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                            className="w-full bg-zinc-50 border border-zinc-200 text-sm px-4 py-3.5 rounded-2xl text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        {/* Phone Input */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1">Телефон для связи</label>
                          <input
                            type="tel"
                            required
                            placeholder="+7 (999) 000-00-00"
                            value={formData.phone}
                            onChange={(e) => setFormData(p => ({ ...p, phone: e.target.value }))}
                            className="w-full bg-zinc-50 border border-zinc-200 text-sm px-4 py-3.5 rounded-2xl text-zinc-900 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                          />
                        </div>

                        {/* Date & Time grids */}
                        <div className="grid grid-cols-2 gap-4">
                          
                          <div>
                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                              <span>Дата визита</span>
                            </label>
                            <input
                              type="date"
                              required
                              value={formData.date}
                              onChange={(e) => setFormData(p => ({ ...p, date: e.target.value }))}
                              className="w-full bg-zinc-50 border border-zinc-200 text-sm px-4 py-3.5 rounded-2xl text-zinc-900 focus:outline-none focus:border-indigo-500"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-indigo-500" />
                              <span>Время визита</span>
                            </label>
                            <select
                              required
                              value={formData.time}
                              onChange={(e) => setFormData(p => ({ ...p, time: e.target.value }))}
                              className="w-full bg-zinc-50 border border-zinc-200 text-sm px-4 py-3.5 rounded-2xl text-zinc-900 focus:outline-none focus:border-indigo-500"
                            >
                              <option value="">Выберите время</option>
                              <option value="10:00">10:00</option>
                              <option value="11:30">11:30</option>
                              <option value="13:00">13:00</option>
                              <option value="14:30">14:30</option>
                              <option value="16:00">16:00</option>
                              <option value="17:30">17:30</option>
                              <option value="19:00">19:00</option>
                            </select>
                          </div>

                        </div>

                        {/* Visitor counts buttons */}
                        <div>
                          <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest block mb-1.5 flex items-center gap-1">
                            <Users className="w-3.5 h-3.5 text-indigo-500" />
                            <span>Количество человек</span>
                          </label>
                          <div className="grid grid-cols-4 gap-3">
                            {[1, 2, 3, 4].map((num) => (
                              <button
                                key={num}
                                type="button"
                                onClick={() => setFormData(p => ({ ...p, visitorCount: num }))}
                                className={`py-3.5 rounded-xl border text-sm font-bold cursor-pointer transition-all ${
                                  formData.visitorCount === num
                                    ? "bg-indigo-600 text-white border-indigo-500 shadow-md"
                                    : "bg-zinc-50 text-zinc-700 border-zinc-200 hover:bg-zinc-100"
                                }`}
                              >
                                {num}
                              </button>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Submit button */}
                      <button
                        type="submit"
                        className="w-full py-4 bg-[#2563EB] hover:bg-blue-600 text-white font-semibold rounded-2xl flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md active:scale-99"
                      >
                        <span>Забронировать визит</span>
                        <Send className="w-4 h-4" />
                      </button>

                      <div className="text-[10px] text-zinc-400 text-center">
                        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных для согласования времени визита.
                      </div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="modal-booking-success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-6 text-center flex flex-col items-center py-4"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500">
                        <CheckCircle2 className="w-9 h-9" />
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="text-2xl font-black text-zinc-900 tracking-tight">Вы успешно записаны!</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed font-normal">
                          Ждем вас в гости в нашем петербургском шоуруме.
                        </p>
                      </div>

                      {/* Printable visual ticket */}
                      <div className="w-full max-w-sm bg-zinc-50 border-2 border-dashed border-zinc-200 rounded-3xl p-6 relative overflow-hidden flex flex-col text-left">
                        {/* Visual notches like ticket */}
                        <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-dashed border-zinc-200" />
                        <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-6 h-6 rounded-full bg-white border border-dashed border-zinc-200" />

                        <div className="flex items-center justify-between border-b border-zinc-200/60 pb-3.5">
                          <div className="flex items-center gap-1.5 text-indigo-600">
                            <Ticket className="w-4 h-4" />
                            <span className="text-[10px] font-mono font-bold uppercase tracking-wider">ПРИГЛАСИТЕЛЬНЫЙ</span>
                          </div>
                          <span className="text-xs font-mono font-bold text-zinc-500">{ticketId}</span>
                        </div>

                        <div className="space-y-3 my-4 text-xs text-zinc-600 font-mono">
                          <div className="flex justify-between">
                            <span>Гость:</span>
                            <span className="font-extrabold text-zinc-900">{formData.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Дата:</span>
                            <span className="font-extrabold text-zinc-900">{formData.date}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Время:</span>
                            <span className="font-extrabold text-zinc-900">{formData.time}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Кол-во человек:</span>
                            <span className="font-extrabold text-zinc-900">{formData.visitorCount} чел.</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Локация:</span>
                            <span className="font-extrabold text-zinc-900">СПб, пр. Обуховской обороны 86к</span>
                          </div>
                        </div>

                        <p className="text-[10px] text-zinc-400 text-center border-t border-zinc-200/60 pt-3.5 leading-normal">
                          Подтверждение со схемой проезда отправлено на {formData.phone}. Бесплатный парковочный слот зарезервирован.
                        </p>
                      </div>

                      <button
                        onClick={handleCloseModal}
                        className="mt-2 px-6 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
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
