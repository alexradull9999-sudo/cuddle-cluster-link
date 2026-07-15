import React, { useState, useEffect } from "react";
import { BOOTH_MODELS, WOOD_FINISHES, FELT_COLORS } from "../data";
import { CustomizationConfig } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { Zap, ShieldCheck, CheckCircle, RefreshCw, Send, Sparkles, Sun, Info } from "lucide-react";

interface ConstructorProps {
  initialModelId: "S" | "M" | "L" | "XL";
}

export default function Constructor({ initialModelId }: ConstructorProps) {
  const [modelId, setModelId] = useState<"S" | "M" | "L" | "XL">(initialModelId);
  const [config, setConfig] = useState<CustomizationConfig>({
    wood: "oak",
    felt: "graphite",
    hasSmartScreen: false,
    hasPremiumAir: false,
    hasWireless: false
  });

  const [lightingLevel, setLightingLevel] = useState<number>(80);
  const [isFanOn, setIsFanOn] = useState<boolean>(true);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    company: ""
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitResult, setSubmitResult] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Auto update model ID if initialModelId changes
  useEffect(() => {
    setModelId(initialModelId);
  }, [initialModelId]);

  const selectedModel = BOOTH_MODELS.find(m => m.id === modelId) || BOOTH_MODELS[0];
  const selectedWood = WOOD_FINISHES.find(w => w.id === config.wood) || WOOD_FINISHES[0];
  const selectedFelt = FELT_COLORS.find(f => f.id === config.felt) || FELT_COLORS[0];

  // Dynamic cost calculation
  const basePrice = selectedModel.basePrice;
  const woodPremium = selectedWood.price;
  const optionsPrice = 
    (config.hasSmartScreen ? 45000 : 0) +
    (config.hasPremiumAir ? 30000 : 0) +
    (config.hasWireless ? 8000 : 0);

  const totalPrice = basePrice + woodPremium + optionsPrice;
  const onlineDiscount = Math.round(totalPrice * 0.05); // 5% discount
  const finalPrice = totalPrice - onlineDiscount;
  const leasingPrice = Math.round(finalPrice / 24);

  const handleToggleOption = (key: keyof CustomizationConfig) => {
    if (key === "wood" || key === "felt") return;
    setConfig(prev => ({
      ...prev,
      [key]: !prev[key]
    }) as any);
  };

  const handleSelectWood = (id: any) => {
    setConfig(prev => ({ ...prev, wood: id }));
  };

  const handleSelectFelt = (id: any) => {
    setConfig(prev => ({ ...prev, felt: id }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setErrorMsg("Пожалуйста, заполните обязательные поля: Имя и Телефон.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          company: formData.company,
          model: modelId,
          customizedConfig: config
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitResult(data);
      } else {
        setErrorMsg(data.error || "Произошла ошибка при отправке заявки.");
      }
    } catch (err) {
      setErrorMsg("Ошибка сети. Попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      className="py-24 bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative"
      id="constructor"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest uppercase text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 px-3.5 py-1.5 rounded-full">
            3D-КОНСТРУКТОР
          </span>
          <h2 className="text-4xl md:text-5xl font-sans font-black tracking-tight mt-4 text-zinc-900 dark:text-white">
            Сконфигурируйте свой Акукаб
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 font-light text-lg">
            Выберите размеры, породу дерева, цвет внутреннего акустического войлока и 
            умные опции. Стоимость рассчитывается автоматически с учетом скидки 5%.
          </p>
        </div>

        {/* Builder Workstation layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* COLUMN 1: Dynamic Visual Preview Canvas (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 lg:sticky lg:top-28 h-fit">
            <div className="bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[460px] shadow-lg">
              
              {/* Background visual helpers */}
              <div className="absolute top-4 left-4 flex space-x-1">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
              </div>
              <span className="absolute top-4 right-4 text-[10px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
                Спецификация: {selectedModel.dimensions}
              </span>

              {/* DYNAMIC STYLIZED BOOTH VECTOR SCHEMATIC */}
              <div className="relative w-60 h-80 flex items-center justify-center mt-6">
                
                {/* 1. Sizing Box/Silhouette representing the booth frame */}
                <div 
                  className="w-48 h-72 rounded-[28px] border-[14px] flex flex-col justify-between p-4 relative shadow-2xl transition-all duration-500"
                  style={{
                    borderColor: selectedWood.color, // Exterior Wood color
                    backgroundColor: selectedFelt.color, // Interior Felt color
                    boxShadow: `0 25px 50px -12px rgba(0,0,0,0.4), 0 0 ${lightingLevel / 2}px rgba(253, 224, 71, ${lightingLevel / 150})` // Glowing LED
                  }}
                  id="booth-schematic-interior"
                >
                  {/* Ceiling items */}
                  <div className="flex justify-between items-center w-full">
                    
                    {/* Dimmable LED Indicator */}
                    <div 
                      className="w-8 h-2 rounded-full transition-all duration-300 mx-auto"
                      style={{ 
                        backgroundColor: `rgba(253, 224, 71, ${lightingLevel / 100})`,
                        boxShadow: `0 4px 12px rgba(253, 224, 71, ${lightingLevel / 100})`
                      }}
                    />

                    {/* Active Ventilation Spinner */}
                    <div className="absolute right-6 top-3 flex items-center space-x-1 text-white/50">
                      <RefreshCw 
                        className={`w-3.5 h-3.5 ${isFanOn ? "animate-spin" : ""}`} 
                        style={{ animationDuration: isFanOn ? "1s" : "0s" }} 
                      />
                    </div>
                  </div>

                  {/* Inside furniture & features representations */}
                  <div className="flex flex-col items-center justify-center flex-grow mt-4 relative">
                    {/* Glass door highlight sheen overlay */}
                    <div className="absolute inset-y-0 -left-2 w-8 bg-gradient-to-r from-white/0 via-white/10 to-white/0 skew-x-12 pointer-events-none" />

                    {/* Desk (differs by model) */}
                    <div className="w-36 h-2 bg-white/30 rounded-full border border-white/25 mt-4" />

                    {/* Smart Media Screen option indicator */}
                    {config.hasSmartScreen && (
                      <div className="absolute top-2 w-16 h-12 rounded-lg bg-zinc-950/80 border border-white/20 flex flex-col items-center justify-center shadow-inner animate-pulse">
                        <span className="text-[7px] font-mono text-indigo-400">АКУКАБ MEDIA</span>
                        <div className="w-10 h-0.5 bg-indigo-500 rounded-full mt-1" />
                      </div>
                    )}

                    {/* Ergonomic chair/stool representation for smaller, sofas for larger */}
                    <div className="flex justify-between w-full mt-8 px-2">
                      <div className="w-8 h-10 bg-white/10 rounded-lg border border-white/15" />
                      {(modelId === "M" || modelId === "L" || modelId === "XL") && (
                        <div className="w-8 h-10 bg-white/10 rounded-lg border border-white/15" />
                      )}
                    </div>
                  </div>

                  {/* Base Floor with carpet texture */}
                  <div className="w-full h-3 bg-zinc-900 rounded-full border border-zinc-700 flex items-center justify-center text-[7px] font-mono text-zinc-500">
                    ковролин
                  </div>

                </div>

                {/* Glass Door Handle */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 w-2 h-14 bg-zinc-400 rounded-full border border-zinc-300 shadow-md pointer-events-none" />
              </div>

              {/* Dynamic Interactive Features Adjustment inside visualization */}
              <div className="w-full mt-6 bg-white/40 dark:bg-zinc-950/40 border border-zinc-200/50 dark:border-zinc-800 rounded-2xl p-4 space-y-4 text-xs">
                
                {/* 1. Dimmable light slider */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-semibold uppercase font-mono tracking-wider">
                    <Sun className="w-3.5 h-3.5 text-amber-500" />
                    <span>Яркость LED ({lightingLevel}%)</span>
                  </div>
                  <input 
                    type="range" 
                    min="10" 
                    max="100" 
                    value={lightingLevel}
                    onChange={(e) => setLightingLevel(parseInt(e.target.value))}
                    className="w-1/2 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                  />
                </div>

                {/* 2. Ventilation Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 font-semibold uppercase font-mono tracking-wider">
                    <RefreshCw className={`w-3.5 h-3.5 text-indigo-400 ${isFanOn ? "animate-spin" : ""}`} />
                    <span>Вентиляторы ({isFanOn ? "активны" : "выкл."})</span>
                  </div>
                  <button
                    onClick={() => setIsFanOn(!isFanOn)}
                    className={`px-3 py-1 rounded-full font-bold text-[10px] uppercase transition-colors cursor-pointer ${
                      isFanOn ? "bg-green-500/10 text-green-400 border border-green-500/20" : "bg-zinc-200 dark:bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    {isFanOn ? "вкл" : "выкл"}
                  </button>
                </div>
              </div>

            </div>

            {/* Price breakdown and summary card */}
            <div className="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-950/70 p-6 rounded-3xl">
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-wider font-bold">ИТОГОВАЯ СПЕЦИФИКАЦИЯ И РАСЧЕТ:</span>
              
              <div className="space-y-2 mt-4 text-sm text-zinc-600 dark:text-zinc-300">
                <div className="flex justify-between">
                  <span>Модель ({selectedModel.name}):</span>
                  <span className="font-semibold text-zinc-950 dark:text-white">{basePrice.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Шпон ({selectedWood.name}):</span>
                  <span className="font-semibold text-zinc-950 dark:text-white">{woodPremium === 0 ? "0" : `+${woodPremium.toLocaleString()}`} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Опции и электроника:</span>
                  <span className="font-semibold text-zinc-950 dark:text-white">{optionsPrice === 0 ? "0" : `+${optionsPrice.toLocaleString()}`} ₽</span>
                </div>
                
                <div className="border-t border-indigo-100/80 dark:border-indigo-950/80 pt-3 flex justify-between text-indigo-600 dark:text-indigo-400 text-xs font-bold">
                  <span>Онлайн-скидка 5%:</span>
                  <span>- {onlineDiscount.toLocaleString()} ₽</span>
                </div>
              </div>

              <div className="border-t border-indigo-200/50 dark:border-indigo-950/50 mt-4 pt-4 flex items-baseline justify-between">
                <span className="text-base font-extrabold text-zinc-900 dark:text-white">Итоговая стоимость:</span>
                <div className="text-right">
                  <span className="text-2xl sm:text-3xl font-black text-indigo-600 dark:text-indigo-400">{finalPrice.toLocaleString()} ₽</span>
                  <span className="text-[10px] text-zinc-400 block">с НДС</span>
                </div>
              </div>

              <div className="bg-indigo-600 text-white p-3 rounded-xl mt-4 text-center text-xs font-semibold">
                Лизинг на 24 мес.: ~{leasingPrice.toLocaleString()} ₽ / месяц
              </div>
            </div>
          </div>

          {/* COLUMN 2: Configuration & Leads Form Panels (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1: Select Booth Model */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-150 dark:border-zinc-800 p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
                1. Выберите модель кабины
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {BOOTH_MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setModelId(m.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      modelId === m.id
                        ? "bg-indigo-600/10 border-indigo-500 text-indigo-600 dark:text-indigo-400"
                        : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="font-extrabold text-base text-zinc-900 dark:text-white">{m.name}</span>
                    <span className="text-xs text-zinc-500 mt-1">{m.dimensions}</span>
                    <span className="text-xs font-bold text-indigo-500 mt-3 block">от {m.basePrice.toLocaleString()} ₽</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Choose Exterior Wood Finish */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-150 dark:border-zinc-800 p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
                2. Отделка внешних панелей (Шпон)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {WOOD_FINISHES.map((w) => (
                  <button
                    key={w.id}
                    onClick={() => handleSelectWood(w.id)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                      config.wood === w.id
                        ? "bg-indigo-600/10 border-indigo-500"
                        : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      {/* Color Circle preview */}
                      <span className="w-8 h-8 rounded-full border border-zinc-300 shadow-inner" style={{ backgroundColor: w.color }} />
                      <div>
                        <p className="font-bold text-sm text-zinc-900 dark:text-white">{w.name}</p>
                        <p className="text-xs text-zinc-500 leading-none mt-1">{w.description}</p>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-indigo-500">
                      {w.price === 0 ? "В комплекте" : `+${w.price.toLocaleString()} ₽`}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Choose Interior Felt acoustic lining */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-150 dark:border-zinc-800 p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
                3. Цвет внутренней обивки (Акустический войлок)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {FELT_COLORS.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleSelectFelt(f.id)}
                    className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      config.felt === f.id
                        ? "bg-indigo-600/10 border-indigo-500 text-indigo-500 font-bold"
                        : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50"
                    }`}
                  >
                    <span className="w-10 h-10 rounded-xl border border-zinc-300 shadow-md mb-2.5" style={{ backgroundColor: f.color }} />
                    <span className="text-xs font-medium text-zinc-900 dark:text-white">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Toggle Premium Upgrades */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-150 dark:border-zinc-800 p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
                4. Дополнительное оборудование и умные системы
              </h3>
              <div className="space-y-3">
                {/* Upgrade 1: Smart screen */}
                <button
                  type="button"
                  onClick={() => handleToggleOption("hasSmartScreen")}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    config.hasSmartScreen 
                      ? "bg-indigo-600/10 border-indigo-500" 
                      : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <div className="flex items-start space-x-3.5 max-w-[80%]">
                    <input 
                      type="checkbox" 
                      checked={config.hasSmartScreen} 
                      onChange={() => {}} // Handle on click button instead
                      className="mt-1 accent-indigo-600 h-4 w-4 shrink-0 rounded" 
                    />
                    <div>
                      <p className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white">Интеллектуальный мультимедиа-экран</p>
                      <p className="text-xs text-zinc-500 mt-1 leading-snug">Встроенная сенсорная панель для управления светом, бронирования кабинки и отображения статуса занятости в реальном времени.</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-500 shrink-0 ml-4">+45 000 ₽</span>
                </button>

                {/* Upgrade 2: Climate premium */}
                <button
                  type="button"
                  onClick={() => handleToggleOption("hasPremiumAir")}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    config.hasPremiumAir 
                      ? "bg-indigo-600/10 border-indigo-500" 
                      : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <div className="flex items-start space-x-3.5 max-w-[80%]">
                    <input 
                      type="checkbox" 
                      checked={config.hasPremiumAir} 
                      onChange={() => {}} 
                      className="mt-1 accent-indigo-600 h-4 w-4 shrink-0" 
                    />
                    <div>
                      <p className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white">Премиум-система климат-контроля</p>
                      <p className="text-xs text-zinc-500 mt-1 leading-snug">Турбо-вентиляция с автоматическими датчиками уровня углекислого газа CO2 и системой ультратонкой угольной фильтрации.</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-500 shrink-0 ml-4">+30 000 ₽</span>
                </button>

                {/* Upgrade 3: QI module */}
                <button
                  type="button"
                  onClick={() => handleToggleOption("hasWireless")}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start justify-between transition-all cursor-pointer ${
                    config.hasWireless 
                      ? "bg-indigo-600/10 border-indigo-500" 
                      : "bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  <div className="flex items-start space-x-3.5 max-w-[80%]">
                    <input 
                      type="checkbox" 
                      checked={config.hasWireless} 
                      onChange={() => {}} 
                      className="mt-1 accent-indigo-600 h-4 w-4 shrink-0" 
                    />
                    <div>
                      <p className="font-extrabold text-sm sm:text-base text-zinc-900 dark:text-white">Усиленный модуль беспроводных зарядок Qi</p>
                      <p className="text-xs text-zinc-500 mt-1 leading-snug">Две мощные беспроводные панели быстрой зарядки, интегрированные прямо в столешницу, мощностью 15W каждая.</p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-indigo-500 shrink-0 ml-4">+8 000 ₽</span>
                </button>
              </div>
            </div>

            {/* Step 5: Send lead quote form & show dynamic server invoice */}
            <div className="bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-150 dark:border-zinc-800 p-6 rounded-3xl">
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-4">
                5. Получить детальное коммерческое предложение
              </h3>

              <AnimatePresence mode="wait">
                {!submitResult ? (
                  <motion.form 
                    key="form"
                    onSubmit={handleFormSubmit} 
                    className="space-y-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono font-bold text-zinc-500 uppercase block mb-1">Ваше имя *</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Александр"
                          className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm p-3.5 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono font-bold text-zinc-500 uppercase block mb-1">Номер телефона *</label>
                        <input 
                          type="tel" 
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+7 (999) 000-00-00"
                          className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm p-3.5 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono font-bold text-zinc-500 uppercase block mb-1">Email адрес</label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="example@company.ru"
                          className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm p-3.5 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono font-bold text-zinc-500 uppercase block mb-1">Название компании</label>
                        <input 
                          type="text" 
                          value={formData.company}
                          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
                          placeholder="ООО Яндекс"
                          className="w-full bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-sm p-3.5 rounded-xl text-zinc-900 dark:text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-xs rounded-xl font-medium">
                        {errorMsg}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-zinc-400 text-white font-semibold rounded-2xl flex items-center justify-center space-x-2.5 transition-colors cursor-pointer shadow-md hover:shadow-lg active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <RefreshCw className="w-5 h-5 animate-spin" />
                          <span>Расчет предложения...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Отправить заявку на расчет</span>
                        </>
                      )}
                    </button>
                    <p className="text-[11px] text-zinc-400 text-center leading-normal">
                      Нажимая на кнопку, вы соглашаетесь с политикой конфиденциальности и обработкой персональных данных.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div 
                    key="result"
                    className="bg-green-500/5 border border-green-500/20 p-6 rounded-2xl space-y-4"
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="flex items-center space-x-3 text-green-500">
                      <CheckCircle className="w-7 h-7" />
                      <div>
                        <h4 className="font-bold text-base">Заявка принята! Расчет готов</h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-none mt-1">
                          Коммерческое предложение #{submitResult.quoteId}
                        </p>
                      </div>
                    </div>

                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                      Уважаемый {formData.name}, мы отправили предварительную смету на вашу почту и готовим официальное коммерческое предложение для компании {formData.company || "вашей компании"}. 
                      Наш специалист свяжется с вами по телефону <strong>{formData.phone}</strong> в течение 15 минут для согласования деталей логистики и монтажа.
                    </p>

                    <div className="bg-white dark:bg-zinc-950 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2 text-xs font-mono text-zinc-500">
                      <div className="flex justify-between text-zinc-950 dark:text-white font-bold pb-2 border-b border-zinc-150">
                        <span>Параметр расчета</span>
                        <span>Значение</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Базовая стоимость:</span>
                        <span>{submitResult.estimation.basePrice.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Дополнительные опции:</span>
                        <span>+{submitResult.estimation.addedOptionsCost.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between text-indigo-500">
                        <span>Скидка за онлайн-заказ (5%):</span>
                        <span>- {submitResult.estimation.discount.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between text-zinc-950 dark:text-white font-extrabold text-sm pt-2 border-t border-zinc-150">
                        <span>ИТОГО К ОПЛАТЕ:</span>
                        <span>{submitResult.estimation.total.toLocaleString()} ₽</span>
                      </div>
                      <div className="flex justify-between text-green-600 font-bold">
                        <span>Лизинг (на 24 мес.):</span>
                        <span>{submitResult.estimation.monthlyLeasing.toLocaleString()} ₽ / мес</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setSubmitResult(null);
                        setFormData({ name: "", phone: "", email: "", company: "" });
                      }}
                      className="w-full py-3 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-800 dark:text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                    >
                      Сконфигурировать еще одну кабину
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
