'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  vehicleBrand: string;
  serviceType: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
  consent: boolean;
}

const vehicleBrands = [
  { value: '', label: 'Select Vehicle Brand' },
  { value: 'bmw', label: 'BMW' },
  { value: 'mercedes', label: 'Mercedes-Benz' },
  { value: 'audi', label: 'Audi' },
  { value: 'porsche', label: 'Porsche' },
  { value: 'volkswagen', label: 'Volkswagen' },
  { value: 'mini', label: 'MINI' },
  { value: 'other', label: 'Other German Brand' },
];

const serviceTypes = [
  { value: '', label: 'Select Service Type' },
  { value: 'oil-change', label: 'Oil Change' },
  { value: 'brake-service', label: 'Brake Service' },
  { value: 'diagnostics', label: 'Computer Diagnostics' },
  { value: 'suspension', label: 'Suspension & Steering' },
  { value: 'ac-service', label: 'AC Service' },
  { value: 'transmission', label: 'Transmission Service' },
  { value: 'general-repair', label: 'General Repair' },
  { value: 'inspection', label: 'Pre-Purchase Inspection' },
  { value: 'other', label: 'Other Service' },
];

const timeSlots = [
  { value: '', label: 'Select Preferred Time' },
  { value: '08:00', label: '8:00 AM' },
  { value: '09:00', label: '9:00 AM' },
  { value: '10:00', label: '10:00 AM' },
  { value: '11:00', label: '11:00 AM' },
  { value: '12:00', label: '12:00 PM' },
  { value: '13:00', label: '1:00 PM' },
  { value: '14:00', label: '2:00 PM' },
  { value: '15:00', label: '3:00 PM' },
  { value: '16:00', label: '4:00 PM' },
  { value: '17:00', label: '5:00 PM' },
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    vehicleBrand: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    message: '',
    consent: false,
  });

  // Focus trap and accessibility
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => firstInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Track form submission
    if (typeof window !== 'undefined' && (window as unknown as { dataLayer?: unknown[] }).dataLayer) {
      (window as unknown as { dataLayer: { push: (obj: unknown) => void } }).dataLayer.push({
        event: 'booking_submit',
        service_type: formData.serviceType,
        vehicle_brand: formData.vehicleBrand,
      });
    }

    try {
      // Simulate API call - replace with actual endpoint
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // In production, this would be:
      // await fetch('/api/booking', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      setIsSuccess(true);

      // Reset form after delay
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          vehicleBrand: '',
          serviceType: '',
          preferredDate: '',
          preferredTime: '',
          message: '',
          consent: false,
        });
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Booking submission failed:', error);
      // Handle error state
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="modal-backdrop"
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            if (e.target === e.currentTarget) onClose();
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="modal-content relative"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="modal-close"
              aria-label="Close booking form"
            >
              <svg
                width="20"
                height="20"
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

            {/* Success State */}
            <AnimatePresence mode="wait">
              {isSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center">
                    <svg
                      width="32"
                      height="32"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white/90 mb-2">
                    Booking Confirmed!
                  </h3>
                  <p className="text-white/60">
                    We&apos;ll contact you shortly to confirm your appointment.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                >
                  {/* Header */}
                  <div className="modal-header">
                    <h2 id="modal-title" className="text-2xl font-semibold text-white/90">
                      Book a Call
                    </h2>
                    <p className="text-white/60 mt-2">
                      Share a few details and we&apos;ll call you back to confirm the best service slot for your vehicle.
                    </p>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    {/* Name */}
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        Full Name <span className="text-red-400">*</span>
                      </label>
                      <input
                        ref={firstInputRef}
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="form-input"
                        placeholder="John Doe"
                        required
                        autoComplete="name"
                      />
                    </div>

                    {/* Email & Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="email" className="form-label">
                          Email <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="john@example.com"
                          required
                          autoComplete="email"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="phone" className="form-label">
                          Phone <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="form-input"
                          placeholder="+971 50 123 4567"
                          required
                          autoComplete="tel"
                        />
                      </div>
                    </div>

                    {/* Vehicle Brand & Service Type Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="vehicleBrand" className="form-label">
                          Vehicle Brand <span className="text-red-400">*</span>
                        </label>
                        <select
                          id="vehicleBrand"
                          name="vehicleBrand"
                          value={formData.vehicleBrand}
                          onChange={handleInputChange}
                          className="form-select"
                          required
                        >
                          {vehicleBrands.map((brand) => (
                            <option key={brand.value} value={brand.value}>
                              {brand.label}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label htmlFor="serviceType" className="form-label">
                          Service Type <span className="text-red-400">*</span>
                        </label>
                        <select
                          id="serviceType"
                          name="serviceType"
                          value={formData.serviceType}
                          onChange={handleInputChange}
                          className="form-select"
                          required
                        >
                          {serviceTypes.map((service) => (
                            <option key={service.value} value={service.value}>
                              {service.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Date & Time Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="preferredDate" className="form-label">
                          Preferred Date <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="date"
                          id="preferredDate"
                          name="preferredDate"
                          value={formData.preferredDate}
                          onChange={handleInputChange}
                          className="form-input"
                          min={getMinDate()}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="preferredTime" className="form-label">
                          Preferred Time <span className="text-red-400">*</span>
                        </label>
                        <select
                          id="preferredTime"
                          name="preferredTime"
                          value={formData.preferredTime}
                          onChange={handleInputChange}
                          className="form-select"
                          required
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot.value} value={slot.value}>
                              {slot.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="form-group">
                      <label htmlFor="message" className="form-label">
                        Additional Details (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="form-textarea"
                        placeholder="Please describe any issues or specific requests..."
                        rows={3}
                      />
                    </div>

                    {/* Consent */}
                    <div className="form-checkbox-group">
                      <input
                        type="checkbox"
                        id="consent"
                        name="consent"
                        checked={formData.consent}
                        onChange={handleInputChange}
                        className="form-checkbox"
                        required
                      />
                      <label htmlFor="consent" className="form-checkbox-label">
                        I agree to be contacted by Profix Auto Care via phone, email, or
                        WhatsApp regarding my call request, booking, and relevant service updates.
                      </label>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn btn-primary w-full"
                      aria-label="Submit call request"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="animate-spin h-5 w-5"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Request Call Back'
                      )}
                    </button>
                  </div>

                  {/* Secondary CTA */}
                  <p className="text-center text-sm text-white/40 mt-4">
                    Or call us directly:{' '}
                    <a
                      href="tel:+97141234567"
                      className="text-white/60 hover:text-white/90 transition-colors"
                    >
                      +971 4 123 4567
                    </a>
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
