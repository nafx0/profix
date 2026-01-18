'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  size?: 'normal' | 'large';
}

const services: Service[] = [
  {
    id: 'oil-services',
    title: 'Premium Oil Services',
    description: 'Factory-grade synthetic oils and OEM filters for optimal engine performance and longevity.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
      </svg>
    ),
    href: '/services/oil',
    size: 'large',
  },
  {
    id: 'vehicle-repair',
    title: 'Vehicle Repair & Maintenance',
    description: 'Comprehensive diagnostics and repair services by certified German car technicians.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    href: '/services/repair',
  },
  {
    id: 'brake-systems',
    title: 'Brake Systems',
    description: 'High-performance brake pads, rotors, and fluid replacement for maximum stopping power.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    ),
    href: '/services/brakes',
  },
  {
    id: 'suspension',
    title: 'Suspension & Steering',
    description: 'Precision alignment, shock absorber replacement, and steering system calibration.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M2 12h20M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20" />
      </svg>
    ),
    href: '/services/suspension',
    size: 'large',
  },
  {
    id: 'ac-services',
    title: 'AC Services',
    description: 'Climate control diagnostics, refrigerant recharge, and compressor repair for Dubai heat.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v10M12 22v-6M4.93 4.93l4.24 4.24M14.83 14.83l4.24 4.24M2 12h6M16 12h6M4.93 19.07l4.24-4.24M14.83 9.17l4.24-4.24" />
      </svg>
    ),
    href: '/services/ac',
  },
  {
    id: 'diagnostics',
    title: 'Computer Diagnostics',
    description: 'Advanced OBD-II scanning and factory-level diagnostic software for all German brands.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    href: '/services/diagnostics',
  },
  {
    id: 'transmission',
    title: 'Transmission Services',
    description: 'Automatic and manual transmission fluid changes, repairs, and performance upgrades.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    ),
    href: '/services/transmission',
  },
  {
    id: 'battery',
    title: 'Battery & Electrical',
    description: 'Battery testing, replacement, and complete electrical system diagnostics.',
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="6" width="18" height="12" rx="2" />
        <path d="M23 13v-2" />
        <path d="M11 6v12M7 12h8" />
      </svg>
    ),
    href: '/services/battery',
  },
  {
    id: 'inspection',
    title: 'Pre‑Purchase Inspection',
    description:
      'Full German vehicle health check before you buy: diagnostics, underbody, service history, and a clear recommendation on a short call.',
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="M16 16l4 4" />
        <path d="M9 11h4" />
        <path d="M11 9v4" />
      </svg>
    ),
    href: '/services/inspection',
    size: 'large',
  },
];

interface ServiceCardProps {
  service: Service;
  index: number;
}

const MotionLink = motion(Link);

function ServiceCard({ service, index }: ServiceCardProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <MotionLink
      ref={ref}
      href={service.href}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className={`glass-card bento-item group cursor-pointer block h-full ${
        service.size === 'large' ? 'bento-item-large' : ''
      }`}
      aria-label={`Learn more about ${service.title}`}
    >
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className="mb-4 text-white/60 group-hover:text-white/90 transition-colors duration-300">
          {service.icon}
        </div>

        {/* Title */}
        <h3
          id={`service-title-${service.id}`}
          className="text-lg font-semibold text-white/90 mb-2"
        >
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/60 text-sm mb-4 leading-relaxed flex-grow">
          {service.description}
        </p>

        {/* Visual Read More Link */}
        <span
          className="inline-flex items-center gap-1 text-sm text-white/60 hover:text-white/90 transition-colors group/link"
        >
          Read More
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transform group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </MotionLink>
  );
}

export default function ServicesBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section bg-background"
      aria-labelledby="services-title"
    >
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="section-header"
        >
          <h2 id="services-title" className="section-title text-white/90">
            Our Services
          </h2>
          <p className="section-description text-white/60">
            Comprehensive care for your German vehicle, delivered by certified
            technicians using only OEM parts and factory-grade equipment.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.id} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
