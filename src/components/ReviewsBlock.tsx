import React from "react";
import { Quote } from "lucide-react";

interface Review {
  id: string;
  quote: string;
  author: string;
  location: string;
  avatar: string;
}

const REVIEWS_DATA: Review[] = [
  {
    id: "review-1",
    quote: "«Сначала думала, что внутри будет тесно и душно. Но все нормально: воздух есть, сидеть удобно, для долгих созвонов подходит.»",
    author: "Марина Левина",
    location: "Санкт-Петербург",
    avatar: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/t-marina.png"
  },
  {
    id: "review-2",
    quote: "«Поставили кабину рядом с рабочей зоной. Шума стало заметно меньше, и разговоры с клиентами теперь не слышит весь офис.»",
    author: "Дмитрий Веденев",
    location: "Москва",
    avatar: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/t-dmitry.png"
  },
  {
    id: "review-3",
    quote: "«Нам важно было, чтобы кабина не выбивалась из интерьера. Цвет и отделку подобрали удачно, выглядит аккуратно.»",
    author: "Ольга Кравцова",
    location: "Минск",
    avatar: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/t-olga.png"
  },
  {
    id: "review-4",
    quote: "«Для коротких собеседований кабина очень выручает. Не нужно занимать большую переговорную ради разговора на полчаса.»",
    author: "Павел Гусев",
    location: "Новосибирск",
    avatar: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/t-pavel.png"
  },
  {
    id: "review-5",
    quote: "«В офисе стало проще проводить личные разговоры и обсуждать рабочие вопросы без лишнего шума вокруг.»",
    author: "Елена Морозова",
    location: "Казань",
    avatar: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/t-elena.png"
  },
  {
    id: "review-6",
    quote: "«Кабина не делает полную тишину, но разница с открытым офисом большая. Для звонков и фокусной работы хватает.»",
    author: "Илья Романов",
    location: "Екатеринбург",
    avatar: "https://raw.githubusercontent.com/alexradull9999-sudo/firumg/main/t-ilya.png"
  }
];

export default function ReviewsBlock() {
  return (
    <section 
      className="py-20 sm:py-28 bg-[#FAF9F5] text-zinc-900 relative border-t border-zinc-200/50" 
      id="reviews"
    >
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Title Block */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <h2 className="text-[2.5rem] md:text-[3.25rem] font-sans font-black tracking-tight text-zinc-900 leading-[1.1]" id="reviews-heading">
            Что говорят о наших кабинах
          </h2>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8" id="reviews-grid">
          {REVIEWS_DATA.map((review) => (
            <div 
              key={review.id}
              className="bg-white rounded-[24px] border border-zinc-200/50 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full"
              id={review.id}
            >
              {/* Quote Text */}
              <div className="relative">
                <Quote className="w-8 h-8 text-zinc-100 absolute -top-4 -left-2 -z-0 pointer-events-none" />
                <p className="text-sm sm:text-base text-zinc-700/90 leading-relaxed font-normal relative z-10 mb-8">
                  {review.quote}
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-5 border-t border-zinc-100">
                <img
                  src={review.avatar}
                  alt={review.author}
                  className="w-12 h-12 rounded-full object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="text-sm font-bold text-zinc-900 leading-snug">
                    {review.author}
                  </h4>
                  <p className="text-xs text-zinc-400 font-medium mt-0.5">
                    {review.location}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
