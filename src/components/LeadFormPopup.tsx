import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, Check } from "lucide-react";
import { sendLead } from "../lib/webhook";
import { LEAD_POPUP_EVENT, type OpenLeadPopupOptions } from "../lib/leadPopup";

export default function LeadFormPopup() {
  const [open, setOpen] = useState(false);
  const [cfg, setCfg] = useState<OpenLeadPopupOptions>({
    formName: "lead_popup",
    title: "Оставьте заявку",
    subtitle: "Менеджер перезвонит и ответит на вопросы.",
    buttonLabel: "Отправить заявку",
  });
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<OpenLeadPopupOptions>).detail;
      setCfg({
        formName: detail?.formName || "lead_popup",
        title: detail?.title || "Оставьте заявку",
        subtitle: detail?.subtitle || "Менеджер перезвонит и ответит на вопросы.",
        buttonLabel: detail?.buttonLabel || "Отправить заявку",
      });
      setDone(false);
      setOpen(true);
    };
    window.addEventListener(LEAD_POPUP_EVENT, handler);
    return () => window.removeEventListener(LEAD_POPUP_EVENT, handler);
  }, []);

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setDone(false);
      setName("");
      setPhone("");
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitting(true);
    await sendLead(cfg.formName, { name, phone });
    setSubmitting(false);
    setDone(true);
    setTimeout(() => handleClose(), 2200);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-4 pointer-events-none"
          >
            <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl pointer-events-auto overflow-hidden">
              <div className="flex items-center justify-between px-6 pt-6 pb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-500">
                    Заявка
                  </span>
                </div>
                <button
                  onClick={handleClose}
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
                      Менеджер свяжется с вами в ближайшее время.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="text-2xl font-black tracking-tight text-zinc-900 leading-tight">
                      {cfg.title}
                    </h3>
                    <p className="mt-2 text-sm text-zinc-500">{cfg.subtitle}</p>

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
                      {submitting ? "Отправляем…" : cfg.buttonLabel}
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
  );
}
