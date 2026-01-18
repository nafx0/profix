"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import Image from "next/image";

// ============================================
// CONFIGURATION & STYLES
// ============================================

export default function CarScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Scroll Physics for "Audio-Class" Feel
  const { scrollY } = useScroll();
  
  // Apple-style easing curves
  const easeApple = [0.25, 0.1, 0.25, 1]; // Cubic bezier close to iOS default

  // Simple mobile detection for optimization
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mouse motion values (0 center, -1 left, 1 right)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Soft, weighted physics (High damping = "Expensive" feel)
  const springConfig = isMobile
    ? { stiffness: 40, damping: 25, mass: 1 }
    : { stiffness: 50, damping: 30, mass: 1.2 }; // Heavier feel on desktop
    
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Parallax transforms - Subtle & Intentional
  const bgMove = isMobile ? "1%" : "3%";
  const carMove = isMobile ? "1.5%" : "4%";
  
  const bgX = useTransform(mouseXSpring, [-0.5, 0.5], [bgMove, `-${bgMove}`]);
  const bgY = useTransform(mouseYSpring, [-0.5, 0.5], [(isMobile ? "0.5%" : "1.5%"), (isMobile ? "-0.5%" : "-1.5%")]);

  const carX = useTransform(mouseXSpring, [-0.5, 0.5], [`-${carMove}`, carMove]);
  const carY = useTransform(mouseYSpring, [-0.5, 0.5], [`-${carMove}`, carMove]);

  // Scroll Choreography - The rotation on scroll
  const scrollRotate = useTransform(scrollY, [0, 800], [0, 2]); // Rotate 2 degrees over 800px scroll
  const scrollYParallax = useTransform(scrollY, [0, 800], [0, 100]); // Parallax Y movement

  // Mouse Rotation (Output as numbers for math)
  const rotateRangeVal = isMobile ? 0.5 : 1.5; 
  const mouseRotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-rotateRangeVal, rotateRangeVal]);
  const mouseRotateX = useTransform(mouseYSpring, [-0.5, 0.5], [rotateRangeVal, -rotateRangeVal]);

  // Combine Scroll + Mouse Rotation (Result is degrees)
  const combinedRotateY = useTransform([scrollRotate, mouseRotateY], (values) => {
    return `${(values[0] as number) + (values[1] as number)}deg`;
  });
  const combinedRotateX = useTransform(mouseRotateX, (val) => `${val}deg`);

  const gridMove = isMobile ? "2%" : "6%";
  const gridX = useTransform(mouseXSpring, [-0.5, 0.5], [gridMove, `-${gridMove}`]);
  const gridY = useTransform(mouseYSpring, [-0.5, 0.5], [gridMove, `-${gridMove}`]);

  const textX = useTransform(mouseXSpring, [-0.5, 0.5], [isMobile ? "0%" : "-1%", isMobile ? "0%" : "1%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current || isMobile) return; 
    const { width, height, left, top } =
      containerRef.current.getBoundingClientRect();

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
        style={{ x: bgX, y: bgY, translateY: useTransform(scrollY, [0, 500], [0, 50]) }}
      >
        <Image
          src="/assets/banner.jpeg"
          alt="Profix Garage Structure"
          fill
          priority
          className="object-cover opacity-30 blur-[3px] md:opacity-25 md:blur-[5px]" // Increased blur for depth
        />
        {/* Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 via-transparent to-[#050505]/80" />
      </motion.div>

      {/* 2. Atmosphere / Grain */}
      <div className="absolute inset-0 z-10 opacity-[0.08] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />

      {/* 2.5. 3D Architectural Grid (Background) - Slow Scroll */}
      <motion.div
        className="absolute inset-0 z-[15] pointer-events-none"
        style={{ x: gridX, y: gridY, scale: 1.25, translateY: useTransform(scrollY, [0, 500], [0, 30]) }}
      >
        <div className="w-full h-full bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:60px_60px] md:bg-[size:100px_100px] border-white/5 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
      </motion.div>

      {/* 3. The 3D Cutout Overlay (The Car) - HERO MOTION */}
      <motion.div
        className="absolute z-20 w-full h-full hidden md:flex items-center justify-end pointer-events-none md:pr-[6vw]"
        style={{
          x: carX,
          y: carY,
          rotateX: combinedRotateX,
          rotateY: combinedRotateY, // Mouse + Scroll rotation
          scale: 1.05,
        }}
        initial={{ opacity: 0, scale: 0.96, z: 0 }}
        animate={{ 
            opacity: 1, 
            scale: 1.05,
            z: 0,
            y: [0, -6, 0] // Tiny Idle Float
        }}
        transition={{ 
            opacity: { duration: 1.5, ease: easeApple },
            scale: { duration: 1.5, ease: easeApple },
            y: { duration: 8, repeat: Infinity, ease: "easeInOut" } // Slow idle
        }}
      >
        <div className="relative w-[55%] max-w-[640px] h-[70%] transform-style-3d group">
          <Image
            src="/assets/banner-Photoroom.png"
            alt="German Engineering Overlay"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 60vw"
            className="object-contain drop-shadow-[0_45px_65px_rgba(0,0,0,0.6)]"
          />
          
          {/* Subtle "Blueprint" / Light Bloom Effect on Hover/Idle */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-linear rounded-full blur-3xl pointer-events-none" />
        </div>
      </motion.div>

      {/* 4. Text Content Overlay (Above Car) */}
      <motion.div
        className="absolute z-30 inset-0 flex items-center justify-center px-5 md:px-6"
        style={{ x: textX }}
      >
        <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-center md:items-center justify-between gap-8 md:gap-10">
          <div className="flex-1 max-w-xl text-center md:text-left">
            <motion.div
              className="mb-6 md:mb-8 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-block px-3 py-1 md:px-4 md:py-1.5 border border-white/10 rounded-full bg-white/5 backdrop-blur-xl hover:bg-white/10 transition-colors cursor-default text-center">
                <span className="text-[10px] md:text-xs font-bold text-white/90 tracking-[0.2em] md:tracking-[0.3em] uppercase">
                  Available 24/7 Services
                </span>
              </div>
            </motion.div>

            <h1 className="text-[clamp(2.5rem,11vw,4.5rem)] leading-[0.95] md:text-5xl md:leading-[0.9] lg:text-8xl font-black text-white mb-6 md:mb-8 uppercase tracking-tighter">
              <motion.span
                className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "backOut" }}
              >
                Precision
              </motion.span>
              <motion.span
                className="block text-white/20 relative" 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "backOut" }}
              >
                Engineering
                {/* Decorative line */}
                <span className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </motion.span>
            </h1>

            <motion.p
              className="hero-body-copy max-w-[85%] mx-auto md:mx-0 md:max-w-xl text-sm md:text-lg text-slate-200 mb-8 md:mb-10 font-light leading-relaxed md:px-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              Talk to a German car specialist in Dubai. Start a WhatsApp chat with a senior
              technician and get a clear plan for your vehicle in minutes.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <a
                href="https://web.whatsapp.com/send?phone=971509894674&text="
                target="_blank"
                rel="noreferrer"
                className="group relative px-8 py-3 md:px-10 md:py-5 bg-white text-black font-bold uppercase tracking-wider overflow-hidden rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_0_30px_rgba(255,255,255,0.2)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2 text-xs md:text-base">
                  Chat on WhatsApp
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                    <path d="M12.051 2C6.51 2 2 6.084 2 11.199c0 2.868 1.212 5.452 3.196 7.233V22l2.923-.931c1.244.344 2.275.533 3.932.533 5.541 0 10.051-4.084 10.051-9.199C22.103 6.084 17.592 2 12.051 2z" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-slate-200 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out" />
              </a>

              <a
                href="https://maps.google.com/?q=Profix+Auto+Care+Garage"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 md:px-8 md:py-4 rounded-full border border-white/20 text-xs md:text-sm font-medium uppercase tracking-wider text-white/80 hover:text-white hover:border-white/60 bg-white/5 hover:bg-white/10 transition-colors backdrop-blur-md"
              >
                Find Our Location
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Empty right-hand text column for balance on desktop; visual weight is the 3D car layer */}
          <div className="hidden md:block flex-1" aria-hidden="true" />
        </div>
      </motion.div>
    </section>
  );
}
