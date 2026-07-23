import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, ChevronRight, ChevronLeft } from "lucide-react";
import { sendLead } from "../lib/webhook";

interface QuizOption {
  id: string;
  label: string;
  hint?: string;
}

interface QuizStep {
  id: "timeline" | "size" | "purpose" | "channel";
  title: string;
  subtitle: string;
  options: QuizOption[];
}

const STEPS: QuizStep[] = [
  {
    id: "timeline",
    title: "Когда нужна кабина?",
    subtitle: "От срока зависит, что предложим — со склада или под заказ.",
    options: [
      { id: "asap", label: "Уже вчера", hint: "Подберём готовое со склада" },
      { id: "1m", label: "В течение месяца" },
      { id: "3m", label: "1–3 месяца" },
      { id: "plan", label: "Просто планирую" },
    ],
  },
  {
    id: "size",
    title: "Сколько человек будут работать?",
    subtitle: "Подскажем оптимальный размер под ваш сценарий.",
    options: [
      { id: "1", label: "Один — фокус-зона" },
      { id: "2", label: "Двое — созвоны и переговоры" },
      { id: "team", label: "Команда 4+" },
      { id: "unknown", label: "Ещё не решил" },
    ],
  },
  {
    id: "purpose",
    title: "Основной сценарий?",
    subtitle: "Под каждый сценарий — своя акустика и вентиляция.",
    options: [
      { id: "calls", label: "Онлайн-встречи и звонки" },
      { id: "focus", label: "Фокус-работа в тишине" },
      { id: "meet", label: "Переговоры небольшой группы" },
      { id: "other", label: "Другое" },
    ],
  },
  {
    id: "channel",
    title: "Куда прислать расчёт?",
    subtitle: "Ответим в удобном канале в течение рабочего дня.",
    options: [
      { id: "phone", label: "Позвонить" },
      { id: "whatsapp", label: "WhatsApp" },
      { id: "telegram", label: "Telegram" },
      { id: "email", label: "На email" },
    ],
  },
];

export default function Quiz() {
  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;
  const selected = answers[step.id];

  const handlePick = (optionId: string) => {
    setAnswers((prev) => ({ ...prev, [step.id]: optionId }));
    if (!isLast) {
      setTimeout(() => setStepIndex((i) => i + 1), 180);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setSubmitting(true);
    const labelFor = (stepId: QuizStep["id"]) => {
      const s = STEPS.find((x) => x.id === stepId);
      const opt = s?.options.find((o) => o.id === answers[stepId]);
      return opt?.label ?? "";
    };
    await sendLead("quiz", {
      name,
      contact,
      timeline: labelFor("timeline"),
      size: labelFor("size"),
      purpose: labelFor("purpose"),
      channel: labelFor("channel"),
      raw: answers,
    });
    setSubmitting(false);
    setDone(true);
  };

  const progress = ((stepIndex + (selected ? 1 : 0)) / STEPS.length) * 100;

  return (
    <section
      id="quiz"
      className="py-20 sm:py-28 bg-[#0A0A0C] text-white border-t border-zinc-900"
    >
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest uppercase text-indigo-400 mb-4">
            <span className="w-8 h-px bg-indigo-400/60" />
            Подбор за 30 секунд
            <span className="w-8 h-px bg-indigo-400/60" />
          </div>
          <h2 className="text-[2.25rem] md:text-[3rem] font-sans font-black tracking-tight leading-[1.05]">
            4 вопроса — <span className="text-indigo-400">и точный расчёт</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto">
            Ответьте на несколько вопросов — менеджер пришлёт подходящие модели и цену.
          </p>
        </div>

        <div className="bg-[#111114] border border-white/[0.06] rounded-3xl p-6 sm:p-10 shadow-2xl">
          {/* Progress */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-500">
              {done ? "Готово" : `Шаг ${stepIndex + 1} из ${STEPS.length}`}
            </span>
            <div className="flex-1 mx-4 h-1 bg-white/[0.06] rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-indigo-500"
                animate={{ width: `${done ? 100 : progress}%` }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest uppercase text-zinc-500">
              {done ? "100%" : `${Math.round(progress)}%`}
            </span>
          </div>

          <AnimatePresence mode="wait">
            {done ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <div className="inline-flex w-14 h-14 rounded-full bg-indigo-500/15 items-center justify-center mb-4">
                  <Check className="w-7 h-7 text-indigo-400" />
                </div>
                <h3 className="text-2xl font-black tracking-tight">Заявка принята</h3>
                <p className="mt-3 text-sm text-zinc-400 max-w-md mx-auto">
                  Менеджер свяжется с вами в течение рабочего дня и пришлёт подходящие модели с ценой.
                </p>
              </motion.div>
            ) : !isLast || !selected ? (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500">{step.subtitle}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
                  {step.options.map((opt) => {
                    const active = selected === opt.id;
                    return (
                      <button
                        key={opt.id}
                        onClick={() => handlePick(opt.id)}
                        className={`text-left p-4 rounded-2xl border transition-all cursor-pointer group ${
                          active
                            ? "bg-indigo-500/10 border-indigo-400"
                            : "bg-white/[0.02] border-white/[0.06] hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                              active
                                ? "border-indigo-400 bg-indigo-400"
                                : "border-zinc-600 group-hover:border-zinc-400"
                            }`}
                          >
                            {active && <Check className="w-3 h-3 text-[#0A0A0C]" />}
                          </span>
                          <div>
                            <div className="text-sm font-bold text-white">
                              {opt.label}
                            </div>
                            {opt.hint && (
                              <div className="text-xs text-zinc-500 mt-1">
                                {opt.hint}
                              </div>
                            )}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between mt-8">
                  <button
                    onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                    disabled={stepIndex === 0}
                    className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Назад
                  </button>
                  {selected && (
                    <button
                      onClick={() => setStepIndex((i) => Math.min(STEPS.length - 1, i + 1))}
                      className="flex items-center gap-1.5 text-xs font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer"
                    >
                      Далее
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="contact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onSubmit={handleSubmit}
              >
                <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                  Куда прислать расчёт?
                </h3>
                <p className="mt-2 text-sm text-zinc-500">
                  Оставьте контакт — менеджер свяжется в выбранном канале.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6 mb-6">
                  {step.options.map((opt) => {
                    const active = selected === opt.id;
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => setAnswers((p) => ({ ...p, channel: opt.id }))}
                        className={`text-left p-3 rounded-xl border text-sm font-semibold transition-all cursor-pointer ${
                          active
                            ? "bg-indigo-500/10 border-indigo-400 text-white"
                            : "bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:border-white/20"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ваше имя"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                  <input
                    type="text"
                    required
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Телефон или email"
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-indigo-400 transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setStepIndex((i) => Math.max(0, i - 1))}
                    className="flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-white transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Назад
                  </button>
                  <button
                    type="submit"
                    disabled={submitting || !contact.trim()}
                    className="px-6 py-3 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl transition-all cursor-pointer uppercase tracking-wider"
                  >
                    {submitting ? "Отправляем…" : "Получить расчёт"}
                  </button>
                </div>

                <p className="mt-4 text-[10px] text-zinc-600 leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
