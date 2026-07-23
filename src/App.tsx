import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ModelSelector from "./components/ModelSelector";
import SpecialPurposeCabins from "./components/SpecialPurposeCabins";
import CabinInteriorDetails from "./components/CabinInteriorDetails";
import SoundSimulator from "./components/SoundSimulator";
import ProductionBlock from "./components/ProductionBlock";
import Constructor from "./components/Constructor";
import ProjectShowcase from "./components/ProjectShowcase";
import ShowroomBooking from "./components/ShowroomBooking";
import FAQ from "./components/FAQ";
import CustomSolutionsBlock from "./components/CustomSolutionsBlock";
import WorkflowStepsBlock from "./components/WorkflowStepsBlock";
import ReviewsBlock from "./components/ReviewsBlock";
import GetQuoteBlock from "./components/GetQuoteBlock";
import CommercialProposalBlock from "./components/CommercialProposalBlock";
import NextStepBlock from "./components/NextStepBlock";
import PartnershipBlock from "./components/PartnershipBlock";
import Quiz from "./components/Quiz";
import CallbackPopup from "./components/CallbackPopup";
import { ArrowUp, ShieldCheck, HelpCircle, Phone, MapPin, Mail, MessageSquare } from "lucide-react";

export default function App() {
  const [selectedConfigModelId, setSelectedConfigModelId] = useState<"S" | "M" | "L" | "XL">("S");

  // Helper to scroll to a specific element by ID with custom offset
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: topOffset,
        behavior: "smooth"
      });
    }
  };

  const handleConfigureModel = (modelId: "S" | "M" | "L" | "XL") => {
    setSelectedConfigModelId(modelId);
    handleScrollToSection("constructor");
  };

  const handleQuickQuote = (modelId: "S" | "M" | "L" | "XL") => {
    setSelectedConfigModelId(modelId);
    handleScrollToSection("constructor");
    // Also focus on name input inside form if possible
    setTimeout(() => {
      const formInput = document.querySelector("#constructor form input");
      if (formInput) (formInput as HTMLElement).focus();
    }, 800);
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* 1. Header Navigation */}
      <Header 
        onCalculateClick={() => handleQuickQuote("S")} 
        onNavigate={handleScrollToSection} 
      />

      {/* 2. Main content sections */}
      <main>
        {/* Hero Banner Section */}
        <div id="hero">
          <Hero 
            onCalculateClick={() => handleQuickQuote("S")} 
            onExploreModelsClick={() => handleScrollToSection("models")} 
          />
        </div>

        {/* Catalog of Cabin Models */}
        <ModelSelector 
          onConfigureModel={handleConfigureModel} 
          onQuickQuote={handleQuickQuote} 
        />

        {/* Custom non-standard engineering solutions */}
        <CustomSolutionsBlock />

        {/* Cabins outside office */}
        <SpecialPurposeCabins />

        {/* What's inside interactive specs */}
        <CabinInteriorDetails />

        {/* Immersive Soundproof simulator */}
        <SoundSimulator />

        {/* St. Petersburg Production Factory block */}
        <ProductionBlock />

        {/* Interactive 3D Customization constructor */}
        <Constructor 
          initialModelId={selectedConfigModelId} 
        />

        {/* Show completed office cases */}
        <ProjectShowcase />

        {/* St. Petersburg Showroom Booking scheduler */}
        <ShowroomBooking />

        {/* Custom non-standard engineering solutions */}
        <CustomSolutionsBlock />

        {/* Step-by-step customer journey workflow */}
        <WorkflowStepsBlock />

        {/* Customer reviews and testimonials */}
        <ReviewsBlock />

        {/* Dynamic customized quote calculator form */}
        <GetQuoteBlock />

        {/* 4-step qualification quiz */}
        <Quiz />

        {/* Commercial Proposal KP section */}
        <CommercialProposalBlock />

        {/* FAQ Accordions */}
        <FAQ />

        {/* Next step visual cards action panel */}
        <NextStepBlock />

        {/* Partnership program block */}
        <PartnershipBlock />
      </main>

      {/* Floating callback popup */}
      <CallbackPopup />



      {/* 3. Footer */}
      <footer className="bg-[#0A0A0C] text-[#8E8E93] py-16 sm:py-20 border-t border-zinc-900" id="footer">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 pb-12 border-b border-white/[0.06]">
            
            {/* Column 1: Brand details and Address */}
            <div className="md:col-span-5 space-y-6">
              {/* Logo */}
              <div className="flex items-center space-x-2.5">
                <img 
                  src="webo-mark.png" 
                  alt="акукаб logo" 
                  className="h-6 w-auto object-contain brightness-0 invert"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
                <span className="font-sans font-extrabold text-white text-xl tracking-tight lowercase">
                  акукаб
                </span>
              </div>

              {/* Address details */}
              <div className="space-y-1.5 text-xs sm:text-sm text-[#8E8E93] leading-relaxed">
                <p>г. Санкт-Петербург,</p>
                <p>пр. Обуховской обороны, 86к</p>
                <p>Пн-Пт, 10:00–18:00</p>
              </div>

              {/* Legal Info */}
              <div className="text-[11px] text-[#55555A] space-y-0.5 pt-2">
                <p>ООО «АКУКАБ»</p>
                <p>ИНН 7801234567 • ОГРН 1127847012345</p>
              </div>
            </div>

            {/* Column 2: PRODUCT Links */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-white text-xs font-bold tracking-widest uppercase">продукт</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button onClick={() => handleScrollToSection("models")} className="hover:text-white transition-colors cursor-pointer text-left">
                    Модели
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection("simulator")} className="hover:text-white transition-colors cursor-pointer text-left">
                    Технологии
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection("custom-solutions-section")} className="hover:text-white transition-colors cursor-pointer text-left">
                    Кастом
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection("showroom")} className="hover:text-white transition-colors cursor-pointer text-left">
                    Шоурум
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: COMPANY Links */}
            <div className="md:col-span-2 space-y-4">
              <h4 className="text-white text-xs font-bold tracking-widest uppercase">компания</h4>
              <ul className="space-y-2 text-xs sm:text-sm">
                <li>
                  <button onClick={() => handleScrollToSection("projects")} className="hover:text-white transition-colors cursor-pointer text-left">
                    Проекты
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection("constructor")} className="hover:text-white transition-colors cursor-pointer text-left">
                    Производство
                  </button>
                </li>
                <li>
                  <button onClick={() => handleScrollToSection("faq")} className="hover:text-white transition-colors cursor-pointer text-left">
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 4: CONTACTS Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-white text-xs font-bold tracking-widest uppercase">связаться</h4>
              <ul className="space-y-3.5 text-xs sm:text-sm">
                <li>
                  <a href="tel:+79216437474" className="text-white font-bold hover:text-indigo-400 transition-colors block text-base sm:text-lg">
                    +7 (921) 643-74-74
                  </a>
                </li>
                <li>
                  <a href="mailto:zakaz@acucab.ru" className="hover:text-white transition-colors block text-zinc-300">
                    zakaz@acucab.ru
                  </a>
                </li>
                <li className="pt-1.5">
                  <div className="flex items-center space-x-2 bg-[#161619] hover:bg-[#1C1C21] transition-colors border border-white/[0.06] rounded-xl px-3.5 py-2 w-fit">
                    <div className="w-5 h-5 rounded bg-[#4E54FF] flex items-center justify-center text-white text-[10px] font-black tracking-tighter">
                      O
                    </div>
                    <span className="text-xs font-bold text-white uppercase tracking-wider">МАКС</span>
                  </div>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Row of Footer */}
          <div className="pt-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 text-xs text-[#55555A]">
            
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 xl:gap-8">
              <p>© 2026 ACUCAB - Все права защищены</p>
              
              <div className="flex items-center gap-2 text-zinc-500">
                <img 
                  src="webo-mark.png" 
                  alt="Webolution Logo" 
                  className="w-4 h-4 object-contain opacity-50 hover:opacity-80 transition-opacity brightness-0 invert" 
                  referrerPolicy="no-referrer"
                />
                <span>Разработано в Webolution Digital Agency</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <a href="#privacy" className="hover:text-zinc-400 transition-colors">Политика конфиденциальности</a>
              <a href="#data-agreement" className="hover:text-zinc-400 transition-colors">Согласие на обработку данных</a>
              <a href="#cookies" className="hover:text-zinc-400 transition-colors">Политика обработки cookie</a>
            </div>

            <button 
              onClick={handleScrollToTop}
              className="py-2 px-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-850 hover:border-zinc-75 rounded-xl text-zinc-400 hover:text-white transition-all flex items-center space-x-1.5 cursor-pointer ml-auto xl:ml-0"
              id="back-to-top"
            >
              <span>Наверх</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>

          </div>
        </div>
      </footer>

    </div>
  );
}
