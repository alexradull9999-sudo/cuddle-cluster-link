export interface BoothModel {
  id: "S" | "M" | "L" | "XL";
  name: string;
  tagline: string;
  capacity: number;
  dimensions: string;
  soundproofing: number; // in dB
  ventilation: number; // in m3/h
  basePrice: number; // in rubles
  description: string;
  features: string[];
}

export interface CustomizationConfig {
  wood: "oak" | "walnut" | "carbon" | "white";
  felt: "graphite" | "sand" | "emerald" | "sapphire";
  hasSmartScreen: boolean;
  hasPremiumAir: boolean;
  hasWireless: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: Date;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  clientName: string;
  location: string;
  image: string;
  description: string;
}

export interface ShowroomAppointment {
  name: string;
  phone: string;
  date: string;
  time: string;
  visitorCount: number;
}
