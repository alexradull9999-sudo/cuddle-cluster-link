import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, RefreshCw, ChevronRight, CornerDownLeft } from "lucide-react";
import { ChatMessage } from "../types";
import { motion, AnimatePresence } from "motion/react";

const SUGGESTED_QUESTIONS = [
  "Какую кабину выбрать для 2 человек?",
  "Насколько тихо внутри кабины?",
  "Каковы сроки доставки и монтажа?",
  "Нужно ли согласовывать перепланировку?"
];

export default function AcousticAdvisor() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      text: "Здравствуйте! Меня зовут Александр, я ведущий специалист по акустике компании Акукаб. Я помогу вам подобрать идеальную звукоизоляционную кабину для вашего офиса, отвечу на технические вопросы о звукопоглощении, вентиляции, сертификатах и пожарной безопасности. О чем бы вы хотели узнать?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState<string>("");
  const [isTyping, setIsTyping] = useState<boolean>(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      text: textToSend,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // Map history to server compatible format
      const historyPayload = messages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      const data = await response.json();
      
      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        text: data.text || "Извините, возникли временные неполадки. Попробуйте еще раз.",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: `err-${Date.now()}`,
        role: "assistant",
        text: "Произошла ошибка соединения с сервером ИИ. Проверьте подключение к Интернету или попробуйте задать вопрос позже.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <section 
      className="py-24 bg-zinc-900 text-white relative overflow-hidden border-t border-b border-zinc-800"
      id="advisor"
    >
      {/* Decorative radial lighting in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/25 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 w-fit mx-auto">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            ИИ-ИНЖЕНЕР ПО АКУСТИКЕ
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tight mt-4">
            Консультация с экспертом
          </h2>
          <p className="mt-4 text-zinc-400 font-light text-lg">
            Наш виртуальный инженер Александр, обученный на технологических стандартах звукоизоляции Акукаб, 
            готов мгновенно ответить на любой технический или организационный вопрос.
          </p>
        </div>

        {/* Chat Widget Container */}
        <div className="max-w-4xl mx-auto bg-zinc-950 border border-zinc-800/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-[600px]">
          
          {/* Left Panel: Expert Profile Card */}
          <div className="md:w-80 bg-zinc-900 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-800 shrink-0">
            <div className="space-y-6">
              {/* Profile Avatar */}
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center border border-white/10 shadow-lg text-white font-bold text-xl">
                    А
                  </div>
                  {/* Active green dot status indicator */}
                  <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-zinc-900 rounded-full animate-pulse" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-base leading-snug">Александр</h4>
                  <p className="text-xs text-indigo-400 font-semibold font-mono uppercase tracking-wider">ИИ-Консультант</p>
                </div>
              </div>

              {/* Specs bullet points */}
              <div className="space-y-3.5 text-xs text-zinc-400 border-t border-zinc-800 pt-5">
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>Знает всё о стандартах СП 51.13330</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>Поможет выбрать модель под площадь</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>Рассчитает воздухообмен по людям</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>Предоставит параметры пожаробезопасности</span>
                </p>
              </div>
            </div>

            {/* Subtext warning info */}
            <div className="text-[10px] text-zinc-500 leading-normal border-t border-zinc-800 pt-4 hidden md:block">
              Модель работает в реальном времени. Вся техническая информация соответствует официальным спецификациям продукции Акукаб.
            </div>
          </div>

          {/* Right Panel: Active Chat Space */}
          <div className="flex-grow flex flex-col justify-between h-full bg-zinc-950">
            
            {/* Messages scrolling list */}
            <div className="flex-grow overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-zinc-800">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className={`flex gap-3 max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      {/* Avatar icon badge */}
                      <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-xs font-bold ${
                        msg.role === "user" ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/20" : "bg-zinc-800 text-zinc-300 border border-zinc-700/60"
                      }`}>
                        {msg.role === "user" ? <User className="w-4 h-4" /> : "А"}
                      </div>

                      {/* Bubble box */}
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === "user" 
                          ? "bg-indigo-600 text-white rounded-tr-none shadow-md" 
                          : "bg-zinc-900 text-zinc-200 border border-zinc-800 rounded-tl-none"
                      }`}>
                        {/* Display message string formatted cleanly with line breaks */}
                        {msg.text.split("\n").map((line, idx) => (
                          <React.Fragment key={idx}>
                            {line}
                            {idx < msg.text.split("\n").length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing placeholder animation */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-lg bg-zinc-800 shrink-0 flex items-center justify-center text-xs text-zinc-400 border border-zinc-700/60">
                      А
                    </div>
                    <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-2xl rounded-tl-none flex items-center space-x-1.5 h-11">
                      <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>

            {/* Suggested quick questions row */}
            <div className="px-6 py-2 border-t border-zinc-900 flex gap-2 overflow-x-auto scrollbar-none whitespace-nowrap bg-zinc-950/30">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(q)}
                  className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 hover:border-zinc-700 rounded-full text-xs text-zinc-300 hover:text-white transition-all cursor-pointer inline-flex items-center gap-1 shrink-0"
                >
                  <span>{q}</span>
                  <ChevronRight className="w-3 h-3 text-indigo-400" />
                </button>
              ))}
            </div>

            {/* Input area */}
            <div className="p-4 border-t border-zinc-900 bg-zinc-900/40">
              <form onSubmit={handleFormSubmit} className="flex items-center gap-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Задайте вопрос Александру (например: какая толщина триплекса?)..."
                  className="flex-grow bg-zinc-950 border border-zinc-800 text-sm p-4 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
                
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="w-12 h-12 rounded-2xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-white flex items-center justify-center shadow-lg cursor-pointer shrink-0 transition-colors"
                >
                  <Send className="w-4.5 h-4.5" />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
