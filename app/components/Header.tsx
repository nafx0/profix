"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#services", label: "Our Services" },
  { href: "/#brands", label: "Vehicle Brands" },
  { href: "/#contact", label: "Contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={`nav-header transition-all duration-300 ${
          isScrolled ? "nav-header--scrolled" : "nav-header--top"
        }`}
      >
        <nav className="nav-inner" aria-label="Main navigation">
          {/* Logo */}
          <Link
            href="/"
            className="nav-logo"
            aria-label="Profix Auto Care Home"
          >
            Profix Auto Care
          </Link>

          {/* Desktop Navigation */}
          <ul className="nav-links" role="menubar">
            {navLinks.map((link) => (
              <li key={link.href} role="none" className="relative group">
                <Link
                  href={link.href}
                  className="nav-link relative block px-2 py-1"
                  role="menuitem"
                >
                  <motion.span
                    className="block text-sm"
                    initial={{ y: 0 }}
                    whileHover={{ y: -1 }}
                    transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.3 }}
                  >
                    {link.label}
                  </motion.span>
                  {/* Underline Interaction */}
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-white origin-center scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-6">
            <motion.a
              href="tel:+971509894674"
              className="text-sm text-white/60 hover:text-white/90 transition-colors hidden lg:inline-flex"
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              +971 50 989 4674
            </motion.a>
            <motion.a
              href="https://web.whatsapp.com/send?phone=971509894674&text="
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary relative overflow-hidden"
              aria-label="Chat with us on WhatsApp"
              whileHover={{
                scale: 1.04,
                boxShadow: "0 0 20px rgba(255,255,255,0.15)",
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              WhatsApp Us
              {/* Light Flash on Hover */}
              <motion.div
                className="absolute inset-0 bg-white/20 -skew-x-12"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white/90"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            </svg>
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl md:hidden"
          >
            <div className="flex flex-col h-full px-6 items-center justify-center">
              {/* Close Button */}
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/90"
                aria-label="Close menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              {/* Mobile Nav Links */}
              <nav aria-label="Mobile navigation" className="w-full max-w-xs">
                <ul className="space-y-6 text-center">
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={link.href}
                        className="block text-2xl font-medium text-white/90 hover:text-white transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navLinks.length * 0.1 + 0.2 }}
                  >
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                      }}
                      className="btn btn-primary btn-lg w-full mt-4"
                      aria-label="Book a call with a technician"
                    >
                      Book a Call
                    </button>
                  </motion.li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
