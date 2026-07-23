import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageCircle, X, Check } from "lucide-react";
import { sendLead } from "../lib/webhook";

export default function CallbackPopup() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitting(true);
    await sendLead("callback_popup", { name, phone });
    setSubmitting(false);
    setDone(true);
    setTimeout(() => {
      setOpen(false);
      setTimeout(() => {
        setDone(false);
        setName("");
        setPhone("");
      }, 300);
    }, 2200);
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Заказать обратный звонок"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-indigo-500 hover:bg-indigo-400 text-white shadow-2xl shadow-indigo-500/30 flex items-center justify-center transition-all hover:scale-105 active:scale-95 cursor-pointer group"
      >
        <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center p-4 pointer-events-none"
            >
              <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl pointer-events-auto overflow-hidden">
                <div className="flex items-center justify-between px-6 pt-6 pb-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-500">
                      Обратный звонок
                    </span>
                  </div>
                  <button
                    onClick={() => setOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-zinc-100 flex items-center justify-center text-zinc-500 transition-colors cursor-pointer"
                    aria-label="Закрыть"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="px-6 pb-6">
                  {done ? (
                    <div className="text-center py-8">
                      <div className="inline-flex w-12 h-12 rounded-full bg-emerald-500/10 items-center justify-center mb-3">
                        <Check className="w-6 h-6 text-emerald-500" />
                      </div>
                      <h3 className="text-lg font-black tracking-tight text-zinc-900">
                        Спасибо!
                      </h3>
                      <p className="mt-1.5 text-sm text-zinc-500">
                        Менеджер перезвонит в течение 15 минут.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <h3 className="text-2xl font-black tracking-tight text-zinc-900 leading-tight">
                        Перезвоним <br />
                        <span className="text-indigo-500">за 15 минут</span>
                      </h3>
                      <p className="mt-2 text-sm text-zinc-500">
                        Ответим на вопросы, подберём модель, посчитаем стоимость.
                      </p>

                      <div className="space-y-3 mt-5">
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Имя"
                          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
                        />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+7 (___) ___-__-__"
                          className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-indigo-400 focus:bg-white transition-colors"
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={submitting || !phone.trim()}
                        className="mt-4 w-full py-3.5 bg-[#0A0A0C] hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                      >
                        {submitting ? "Отправляем…" : "Перезвоните мне"}
                      </button>

                      <p className="mt-3 text-[10px] text-zinc-400 leading-relaxed text-center">
                        Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
                      </p>
                    </form>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
