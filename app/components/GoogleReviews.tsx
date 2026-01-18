"use client";

import { motion } from "framer-motion";

// ============================================
// CONFIGURATION
// ============================================

const REVIEWS = [
  {
    id: 1,
    author: "Alex M.",
    date: "10 months ago",
    rating: 5,
    text: "Exceptional service! The mechanic quickly identified the problem with my Porsche that others missed. The supervisor was very welcoming. I will definitely be recommending this garage.",
    avatar_color: "bg-blue-500",
  },
  {
    id: 2,
    author: "Crypt Icmat",
    date: "2 months ago",
    rating: 5,
    text: "Best auto care in Dubai. The manager Prince is very professional and easy to deal with. Highly recommended for anyone with a luxury vehicle!",
    avatar_color: "bg-purple-500",
  },
  {
    id: 3,
    author: "Humaiyun Arafat",
    date: "a year ago",
    rating: 5,
    text: "Amazing service found in Dubai. Very fast and reasonable price. They handled my vehicle with proper care. Highly recommended.",
    avatar_color: "bg-green-500",
  },
  {
    id: 4,
    author: "Sarah Jenkins",
    date: "3 months ago",
    rating: 5,
    text: "Finally a garage that treats my BMW right. Honest pricing and they don't try to upsell you on things you don't need. The workshop is spotless.",
    avatar_color: "bg-orange-500",
  },
    {
    id: 5,
    author: "Mohammed Al-Fayed",
    date: "1 month ago",
    rating: 5,
    text: "Professional team. I took my Mercedes S-Class for pending major service. They used genuine parts and the car feels brand new again.",
    avatar_color: "bg-indigo-500",
  },
];

const GOOGLE_STATS = {
  rating: 4.6,
  count: "628+",
};

// ============================================
// COMPONENTS
// ============================================

function ReviewCard({ review }: { review: (typeof REVIEWS)[0] }) {
  return (
    <div className="w-[300px] md:w-[350px] shrink-0 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm mr-6 hover:bg-white/10 transition-colors cursor-default group">
      {/* Header: Avatar + Info + Google Icon */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-3">
          <div className={`w-10 h-10 rounded-full ${review.avatar_color} flex items-center justify-center text-white font-bold text-sm`}>
            {review.author.charAt(0)}
          </div>
          <div>
            <h4 className="text-white/90 font-medium text-sm">{review.author}</h4>
            <p className="text-white/40 text-xs">{review.date}</p>
          </div>
        </div>
        
        {/* Google G Icon */}
        <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center shrink-0">
         <svg viewBox="0 0 24 24" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} className={`w-4 h-4 ${i < review.rating ? "text-[#fbbf24]" : "text-white/20"}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ))}
      </div>

      {/* Text */}
      <p className="text-white/70 text-sm leading-relaxed line-clamp-4 group-hover:text-white/90 transition-colors">
        {review.text}
      </p>
    </div>
  );
}

export default function GoogleReviews() {
  return (
    <section className="bg-background py-20 border-t border-white/6 overflow-hidden">
        <div className="section-container mb-12 flex flex-col items-center text-center">
            {/* Google Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-black mb-6">
                 <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="font-bold tracking-tight">Google Rating</span>
                <span className="font-bold text-gray-600">|</span>
                <span className="font-bold">{GOOGLE_STATS.rating}</span>
                <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < Math.floor(GOOGLE_STATS.rating) ? "text-[#fbbf24]" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                </div>
            </div>

            <h2 className="section-title text-white/90 mb-4">
                Trusted by Dubai's Drivers
            </h2>
            <p className="section-description text-white/60">
                Based on <span className="text-white font-medium">{GOOGLE_STATS.count} reviews</span>. Consistent excellence since 2012.
            </p>
        </div>

        {/* Infinite Scroll Wrapper */}
        <div className="relative w-full">
            {/* Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

            {/* Marquee */}
            <div className="flex w-max animate-infinite-scroll hover:pause py-4">
                {/* 1st Set */}
                <div className="flex">
                    {REVIEWS.map((review) => (
                        <ReviewCard key={`r1-${review.id}`} review={review} />
                    ))}
                </div>
                {/* 2nd Set */}
                <div className="flex">
                    {REVIEWS.map((review) => (
                        <ReviewCard key={`r2-${review.id}`} review={review} />
                    ))}
                </div>
            </div>
        </div>
        
        <div className="mt-12 text-center">
            <a 
                href="https://www.google.com/maps/place/Profix+Auto+Care+Garage/@25.1245563,55.211773,17z/data=!4m8!3m7!1s0x3e5f6bfa35ea0ab7:0xa7958b75e76f3004!8m2!3d25.1245563!4d55.211773!9m1!1b1!16s%2Fg%2F11gkx2ncq5?entry=ttu&g_ep=EgoyMDI2MDExMy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium text-white/60 hover:text-white transition-colors border-b border-white/20 hover:border-white pb-0.5"
            >
                Read all 628+ reviews on Google Maps
            </a>
        </div>
    </section>
  );
}