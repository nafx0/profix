"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";

// ============================================
// CONFIGURATION & STYLES
// ============================================

interface CarScrollProps {
  onBookClick: () => void;
}

export default function CarScroll({ onBookClick }: CarScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse motion values (0 center, -1 left, 1 right)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for the parallax movement
  // Stiffer spring for more responsive 3D feel
  const mouseXSpring = useSpring(x, { stiffness: 60, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 60, damping: 20 });

  // Parallax transforms for "3D" depth
  // Background moves opposite to mouse (Distance: Far)
  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], ["4%", "-4%"]);
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], ["2%", "-2%"]);

  // Foreground (Car) moves with mouse (Distance: Close)
  const carX = useTransform(mouseXSpring, [-0.5, 0.5], ["-5%", "5%"]);
  const carY = useTransform(mouseYSpring, [-0.5, 0.5], ["-5%", "5%"]);

  // Slight rotation for the car to enhance 3D feel
  const carRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-3deg", "3deg"]);
  const carRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["3deg", "-3deg"]);

  // Grid moves to create depth backdrop
  const gridX = useTransform(mouseXSpring, [-0.5, 0.5], ["8%", "-8%"]);
  const gridY = useTransform(mouseYSpring, [-0.5, 0.5], ["8%", "-8%"]);

  // Content layers move slightly (Distance: Middle)
  const textX = useTransform(mouseXSpring, [-0.5, 0.5], ["-2%", "2%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const { width, height, left, top } =
      containerRef.current.getBoundingClientRect();

    // Calculate normalized mouse position (-0.5 to 0.5)
    const currentX = (e.clientX - left) / width - 0.5;
    const currentY = (e.clientY - top) / height - 0.5;

    x.set(currentX);
    y.set(currentY);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative h-[100dvh] w-full overflow-hidden bg-[#050505] flex items-center justify-center perspective-1000"
    >
      {/* 1. Background Layer (Cinematic Environment) */}
      <motion.div
        className="absolute inset-0 z-0 scale-110"
        style={{ x: bgX, y: bgY }}
      >
        <Image
          src="/assets/banner.jpeg"
          alt="Profix Garage Structure"
          fill
          priority
          className="object-cover opacity-50 blur-[2px] md:opacity-30 md:blur-[4px]"
        />
        {/* Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />
      </motion.div>

      {/* 2. Atmosphere / Grain */}
      <div className="absolute inset-0 z-10 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      {/* 2.5. 3D Architectural Grid (Background) */}
      <motion.div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{ x: gridX, y: gridY, scale: 1.25 }}
      >
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.09)_1px,transparent_1px)] bg-[size:100px_100px] border-white/10 [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_80%)]" />
      </motion.div>

      {/* 3. The 3D Cutout Overlay (The Car) - HIDDEN ON MOBILE */}
      <motion.div
        className="absolute z-20 w-full h-full hidden md:flex items-center justify-end pointer-events-none pr-[6vw]"
        style={{
          x: carX,
          y: carY,
          rotateX: carRotateX,
          rotateY: carRotateY,
          scale: 1.05,
        }}
        initial={{ opacity: 0, scale: 0.9, y: 50 }}
        animate={{ opacity: 1, scale: 1.05, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <div className="relative w-[55%] max-w-[640px] h-[70%] transform-style-3d">
          <Image
            src="/assets/banner-Photoroom.png"
            alt="German Engineering Overlay"
            fill
            priority
            className="object-contain drop-shadow-[0_45px_65px_rgba(0,0,0,0.6)]"
          />
        </div>
      </motion.div>

      {/* 4. Text Content Overlay (Above Car) */}
      <motion.div
        className="absolute z-30 inset-0 flex items-center justify-center px-6"
        style={{ x: textX }}
      >
        <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-center md:items-center justify-between gap-10">
          <div className="flex-1 max-w-xl text-center md:text-left">
            <motion.div
              className="mb-8 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="px-4 py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-default">
                <span className="text-[10px] md:text-xs font-bold text-white/90 tracking-[0.3em] uppercase">
                  Premium German Auto Care
                </span>
              </div>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-8 uppercase tracking-tighter leading-[0.9]">
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "backOut" }}
              >
                Precision
              </motion.span>
              <motion.span
                className="block text-white/20 relative" // Dimmer second line
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6, ease: "backOut" }}
              >
                Engineering
                {/* Decorative line */}
                <span className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.span>
            </h1>

            <motion.p
              className="hero-body-copy max-w-md md:max-w-xl text-base md:text-lg text-slate-100 mb-10 font-light leading-relaxed px-4 md:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              Dubai’s dedicated German car workshop. Book a call with a senior
              technician and get a clear plan for your vehicle in minutes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4">
                <button
                  onClick={onBookClick}
                  className="group relative px-10 py-5 bg-white text-black font-bold uppercase tracking-wider overflow-hidden rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Call
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-slate-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
                </button>

                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-sm font-medium uppercase tracking-wider text-white/80 hover:text-white hover:border-white/60 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md"
                >
                  WhatsApp Workshop
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    <path d="M12.051 2C6.51 2 2 6.084 2 11.199c0 2.868 1.212 5.452 3.196 7.233V22l2.923-.931c1.244.344 2.275.533 3.932.533 5.541 0 10.051-4.084 10.051-9.199C22.103 6.084 17.592 2 12.051 2z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </div>

          {/* Empty right-hand text column for balance on desktop; visual weight is the 3D car layer */}
          <div className="hidden md:block flex-1" aria-hidden="true" />
        </div>
      </motion.div>
    </section>
  );
}
