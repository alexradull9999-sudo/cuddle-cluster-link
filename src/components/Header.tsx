import React from "react";
import { Phone, ArrowRight } from "lucide-react";

interface HeaderProps {
  onCalculateClick: () => void;
  onNavigate: (sectionId: string) => void;
}

export default function Header({ onCalculateClick, onNavigate }: HeaderProps) {
  return (
    <header className="fixed top-5 left-4 right-4 z-50">
      <div 
        className="max-w-7xl mx-auto backdrop-blur-md bg-white/80 border border-white/30 rounded-full px-6 py-2.5 flex items-center justify-between shadow-md transition-all duration-300"
        id="navbar-container"
      >
        {/* Logo */}
        <div 
          className="flex items-center space-x-2.5 cursor-pointer group shrink-0"
          onClick={() => onNavigate("hero")}
          id="logo-brand"
        >
          <img 
            src="webo-mark.png" 
            alt="акукаб logo" 
            className="h-6 w-auto object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <span className="font-sans font-extrabold text-zinc-900 text-xl tracking-tight leading-none lowercase">
            акукаб
          </span>
        </div>

        {/* Navigation Menu */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs sm:text-sm font-medium text-zinc-600" id="nav-menu">
          <button 
            onClick={() => onNavigate("models")} 
            className="hover:text-zinc-950 transition-colors cursor-pointer py-1"
          >
            Модели
          </button>
          <button 
            onClick={() => onNavigate("simulator")} 
            className="hover:text-zinc-950 transition-colors cursor-pointer py-1"
          >
            Технологии
          </button>
          <button 
            onClick={() => onNavigate("constructor")} 
            className="hover:text-zinc-950 transition-colors cursor-pointer py-1"
          >
            Производство
          </button>
          <button 
            onClick={() => onNavigate("projects")} 
            className="hover:text-zinc-950 transition-colors cursor-pointer py-1"
          >
            Проекты
          </button>
          <button 
            onClick={() => onNavigate("showroom")} 
            className="hover:text-zinc-950 transition-colors cursor-pointer py-1"
          >
            Шоурум
          </button>
          <button 
            onClick={() => onNavigate("faq")} 
            className="hover:text-zinc-950 transition-colors cursor-pointer py-1"
          >
            FAQ
          </button>
          <button 
            onClick={() => onNavigate("showroom")} 
            className="hover:text-zinc-950 transition-colors cursor-pointer py-1"
          >
            Партнерам
          </button>
        </nav>

        {/* Contact and Quote CTA */}
        <div className="flex items-center space-x-5" id="header-cta-group">
          <a 
            href="tel:+79216437474" 
            className="hidden md:block text-zinc-800 text-sm font-semibold hover:text-zinc-950 transition-colors"
            id="phone-link"
          >
            +7 (921) 643-74-74
          </a>

          <button 
            onClick={onCalculateClick}
            className="bg-[#111111] hover:bg-black text-white text-xs sm:text-sm font-bold px-5 py-2.5 rounded-full flex items-center space-x-1 transition-all cursor-pointer shadow-sm"
            id="btn-header-quote"
          >
            <span>Получить расчет</span>
            <span className="text-base font-light leading-none ml-1">→</span>
          </button>
        </div>
      </div>
    </header>
  );
}
