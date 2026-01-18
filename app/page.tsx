'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { motion } from 'framer-motion'; // Added for section animations
import Header from './components/Header';
import ServicesBento from './components/ServicesBento';

// Dynamic import for CarScroll to reduce initial bundle size
const CarScroll = dynamic(() => import('./components/CarScroll'), {
  ssr: false,
  loading: () => (
    <div className="loader-container">
      <div className="loader-spinner" />
      <p className="loader-text">Loading experience...</p>
    </div>
  ),
});

// Animation Component
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }} // Trigger earlier
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

// ============================================
// FOOTER COMPONENT
// ============================================

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="section bg-background border-t border-white/6">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-semibold text-white/90 mb-4">
              Profix Auto Care
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Precision German car service in the heart of Dubai. OEM parts,
              certified technicians, transparent pricing.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/profixautocare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/90 transition-colors"
                aria-label="Follow us on Instagram"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com/profixautocare"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/90 transition-colors"
                aria-label="Follow us on Facebook"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://wa.me/97141234567"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/40 hover:text-white/90 transition-colors"
                aria-label="Contact us on WhatsApp"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {[
                'Oil Change',
                'Brake Service',
                'Diagnostics',
                'Suspension',
                'AC Service',
                'Transmission',
              ].map((service) => (
                <li key={service}>
                  <a
                    href={`/services/${service.toLowerCase().replace(' ', '-')}`}
                    className="text-sm text-white/60 hover:text-white/90 transition-colors"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands Column */}
          <div>
            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">
              Brands We Service
            </h4>
            <ul className="space-y-2">
              {['BMW', 'Mercedes-Benz', 'Audi', 'Porsche', 'Volkswagen', 'MINI'].map(
                (brand) => (
                  <li key={brand}>
                    <a
                      href={`/brands/${brand.toLowerCase().replace('-', '')}`}
                      className="text-sm text-white/60 hover:text-white/90 transition-colors"
                    >
                      {brand}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm font-semibold text-white/90 uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <p className="text-sm text-white/60">
                  Al Quoz 3
                  <br />
                  Dubai, UAE
                </p>
              </li>
              <li>
                <a
                  href="tel:+971509894674"
                  className="text-sm text-white/60 hover:text-white/90 transition-colors"
                >
                  +971 50 989 4674
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@profixautocare.com"
                  className="text-sm text-white/60 hover:text-white/90 transition-colors"
                >
                  info@profixautocare.com
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs text-white/40">
                  Mon–Sat: 8:00 AM – 6:00 PM
                  <br />
                  Friday: 2:00 PM – 6:00 PM
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">
            © {currentYear} Profix Auto Care. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
            <a
              href="/privacy"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/terms"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================
// BRANDS SECTION
// ============================================

const brands = [
  { name: 'Mercedes-Benz', logo: '/assets/logos/10bec0d422a840be364603ac31429d9d.mercedes.webp' },
  { name: 'BMW', logo: '/assets/logos/10bec0d422a840be364603ac31429d9d.bmw.webp' },
  { name: 'Porsche', logo: '/assets/logos/10bec0d422a840be364603ac31429d9d.porshe.webp' },
  { name: 'Audi', logo: '/assets/logos/10bec0d422a840be364603ac31429d9d.audi.png' },
  { name: 'Volkswagen', logo: '/assets/logos/10bec0d422a840be364603ac31429d9d.wagon.webp' },
  { name: 'Toyota', logo: '/assets/logos/10bec0d422a840be364603ac31429d9d.toyota.png' },
];

function BrandsSection() {
  return (
	<section id="brands" className="bg-background border-t border-white/6 py-16 overflow-hidden relative">
      <div className="text-center mb-12">
        <h2 className="text-lg font-medium text-white/60">
          Specialized in Excellence
        </h2>
      </div>

      <div className="relative flex w-full">
        {/* Linear Gradient for fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-10" />
        
        {/* Infinite Scrolling Track */}
        <div className="flex animate-infinite-scroll hover:pause w-max">
          {/* Three sets to ensure coverage on ultra-wide screens */}
          {[1, 2, 3, 4].map((setIndex) => (
            <div key={`set-${setIndex}`} className="flex gap-20 px-10 items-center">
              {brands.map((brand, i) => (
                <div
                  key={`${brand.name}-${setIndex}-${i}`}
                  className="w-24 h-24 flex items-center justify-center shrink-0 opacity-70 hover:opacity-100 transition-all duration-500"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={brand.logo}
                    alt={brand.name}
                    className="w-16 h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================
// MOBILE CTA
// ============================================

interface MobileCTAProps {
  onBookClick: () => void;
}

function MobileCTA({ onBookClick }: MobileCTAProps) {
  return (
    <div className="mobile-cta">
      <button
        onClick={onBookClick}
        className="btn btn-primary w-full"
        aria-label="Book a call with a technician"
      >
        Book a Call
      </button>
    </div>
  );
}

// ============================================
// CALL-FOCUSED CTA STRIP
// ============================================

function CallToActionStrip() {
  return (
    <section className="section bg-[#050505] border-t border-white/10" aria-labelledby="cta-strip-title">
      <div className="section-container flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left max-w-xl">
          <h2
            id="cta-strip-title"
            className="text-2xl md:text-3xl font-semibold text-white/90 mb-2"
          >
            Ready to talk about your car?
          </h2>
          <p className="text-sm md:text-base text-white/60">
            Chat with a German car specialist in Dubai. We&apos;ll review your vehicle, explain your options, and give you a clear estimate before you visit the workshop.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <a
            href="https://web.whatsapp.com/send?phone=971509894674&text="
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary w-full sm:w-auto"
          >
            Chat with Specialist
          </a>
          <a
            href="tel:+971509894674"
            className="text-sm text-white/70 hover:text-white/90 transition-colors whitespace-nowrap"
          >
            Or call now: +971 50 989 4674
          </a>
        </div>
      </div>
    </section>
  );
}

// ============================================
// LOCATION SECTION
// ============================================

function LocationSection() {
  return (
    <section className="section bg-background border-t border-white/6" aria-labelledby="location-title">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/3 space-y-8">
            <div>
              <h2 id="location-title" className="section-title text-white/90 mb-4">
                Find Our Workshop
              </h2>
              <p className="text-white/60">
                Located in the heart of Al Quoz, our premium facility is easily accessible from Sheikh Zayed Road.
              </p>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-white/80">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white/90 font-medium mb-1">Profix Auto Care Garage</h3>
                  <p className="text-white/60 text-sm">
                    Al Quoz 3<br />
                    Dubai, UAE
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-white/80">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-white/90 font-medium mb-1">Opening Hours</h3>
                  <p className="text-white/60 text-sm">
                    Mon–Sat: 8:00 AM – 6:00 PM<br />
                    Friday: 2:00 PM – 6:00 PM
                  </p>
                </div>
              </div>

              <a
                href="https://maps.google.com/?q=Profix+Auto+Care+Garage"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full justify-center mt-2 group"
              >
                Get Directions
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Map */}
          <div className="w-full lg:w-2/3 min-h-[400px] rounded-2xl overflow-hidden glass-card border border-white/10 relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d451.5411605795638!2d55.21145135164262!3d25.12455601785229!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6bfa35ea0ab7%3A0xa7958b75e76f3004!2sProfix%20Auto%20Care%20Garage!5e0!3m2!1sen!2sbd!4v1768760445499!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================
// CONTACT SECTION
// ============================================

function ContactSection() {
  return (
    <section
      id="contact"
      className="section bg-background border-t border-white/6"
      aria-labelledby="contact-title"
    >
      <div className="section-container grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <div>
          <h2 id="contact-title" className="section-title text-white/90 mb-3">
            Talk to a German car specialist in Dubai
          </h2>
          <p className="text-white/60 text-sm md:text-base mb-6 max-w-xl">
            Share your vehicle issue, service history, or upcoming purchase and we&apos;ll recommend the right service planwhether you prefer a call or WhatsApp.
          </p>
          <div className="space-y-2 text-sm text-white/70">
            <p>
              <strong className="text-white/90">Workshop:</strong> Al Quoz 3, Dubai, UAE
            </p>
            <p>
              <strong className="text-white/90">Phone:</strong>{' '}
              <a href="tel:+971509894674" className="hover:text-white transition-colors">
                +971 50 989 4674
              </a>
            </p>
            <p>
              <strong className="text-white/90">WhatsApp:</strong>{' '}
              <a
                href="https://web.whatsapp.com/send?phone=971509894674&text="
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                Chat now
              </a>
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 md:items-end">
          <a
            href="https://web.whatsapp.com/send?phone=971509894674&text="
            target="_blank"
            rel="noreferrer"
            className="btn btn-primary w-full md:w-auto"
          >
           Chat on WhatsApp
          </a>
          <p className="text-xs text-white/40 max-w-xs text-center md:text-right">
            Average response time during working hours is under 10 minutes.
          </p>
        </div>
      </div>
    </section>
  );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function Home() {
  return (
    <>
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main id="main-content">
        {/* Hero Scrollytelling Section */}
        <CarScroll />

        {/* Services Bento Grid */}
        <FadeIn>
          <ServicesBento />
        </FadeIn>



        {/* Call-Focused CTA Strip */}
        <FadeIn delay={0.15}>
          <CallToActionStrip />
        </FadeIn>

        {/* Brands */}
        <FadeIn delay={0.2}>
          <BrandsSection />
        </FadeIn>

		{/* Contact */}
        <FadeIn delay={0.25}>
    		<ContactSection />
        </FadeIn>

        {/* Location */}
        <FadeIn delay={0.3}>
          <LocationSection />
        </FadeIn>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
