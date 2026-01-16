import Link from 'next/link';
import { notFound } from 'next/navigation';

const WHATSAPP_URL = 'https://wa.me/971501234567';
const PHONE = '+971 4 123 4567';

interface ServiceConfig {
  slug: string;
  name: string;
  short: string;
  heroIntro: string;
  heroBenefit: string;
  primaryUseCases: string[];
  dubaiSpecifics: string[];
  leadMagnetTitle: string;
  leadMagnetBody: string;
}

const services: Record<string, ServiceConfig> = {
  oil: {
    slug: 'oil',
    name: 'Premium Oil Services',
    short: 'Factory-grade synthetic oils and OEM filters for German engines in Dubai heat.',
    heroIntro:
      'Your German engine lives or dies by oil quality, especially in Dubai temperatures.',
    heroBenefit:
      'We use OEM-approved synthetic oils and diagnostic-backed service intervals to protect your BMW, Mercedes, Audi, Porsche, or Volkswagen from heat-related wear.',
    primaryUseCases: [
      'Minor and major services for German vehicles at 30–50% below dealer pricing.',
      'Oil, filter, and gasket replacement based on actual driving profile, not just generic mileage.',
      'Electronic service reset and digital service history for modern German dashboards.',
    ],
    dubaiSpecifics: [
      'High ambient temperatures and stop–start traffic in Dubai accelerate oil breakdown in turbocharged engines.',
      'Short urban trips in areas like Marina and Downtown create cold-start stress on BMW and Mercedes powertrains.',
      'Proactive oil changes reduce the risk of sludge, turbo failure, and oil consumption warnings on German marques.',
    ],
    leadMagnetTitle: 'Transparent German oil service quote before you visit',
    leadMagnetBody:
      'Share your VIN, current mileage, and last service date via WhatsApp. Within minutes, we will send you an itemized quote showing labour, OEM oil grade, filters, and recommended add-ons—before you commit to a booking.',
  },
  repair: {
    slug: 'repair',
    name: 'Vehicle Repair & Maintenance',
    short: 'Dealer-level diagnostics and repair for out-of-warranty German vehicles.',
    heroIntro:
      'When a warning light appears on a German dashboard, owners want technical validation—not guesswork.',
    heroBenefit:
      'Our technicians pair OEM diagnostic equipment with German-brand experience so you understand exactly what needs repair, what can wait, and what it will cost.',
    primaryUseCases: [
      'Complete mechanical and electrical diagnostics for complex German fault codes.',
      'Engine, drivetrain, and chassis repairs that match dealer standards at independent pricing.',
      'Structured maintenance plans to extend vehicle life while controlling total cost of ownership.',
    ],
    dubaiSpecifics: [
      'Sand, heat, and high-speed Sheikh Zayed driving expose hidden weaknesses in steering, cooling, and suspension systems.',
      'Many Dubai German vehicles are tuned or modified; we diagnose with that complexity in mind.',
      'We frequently take over cases from agencies when owners seek a second opinion on expensive repair estimates.',
    ],
    leadMagnetTitle: 'Second-opinion repair review for German vehicles',
    leadMagnetBody:
      'Upload your dealer quotation and a short video of the issue via WhatsApp. We will review line-by-line and reply with a clear comparison and recommendations before you decide where to repair.',
  },
  brakes: {
    slug: 'brakes',
    name: 'Brake Systems',
    short: 'High-performance brake pads, rotors, and fluid service for heavy German platforms.',
    heroIntro:
      'Brakes on German cars are engineered for autobahn speeds; Dubai traffic still tests them daily.',
    heroBenefit:
      'We restore your stopping power using OEM-spec components or high-performance upgrades matched to your driving style.',
    primaryUseCases: [
      'Front and rear pad and rotor replacement with OEM or performance options.',
      'Brake fluid flushing and ABS diagnostics for stability at speed.',
      'Brake noise, vibration, and pedal feel diagnosis specific to German chassis.',
    ],
    dubaiSpecifics: [
      'Sand and dust in Dubai accelerate disc and pad wear on heavy German SUVs and sedans.',
      'Repeated short trips between areas like Marina, Downtown, and Business Bay glaze pads and reduce bite.',
      'Track days and spirited desert drives require brake setups beyond standard commuter specs.',
    ],
    leadMagnetTitle: 'Brake safety check before your next trip',
    leadMagnetBody:
      'Send us your current brake warning lights or a short wheel video via WhatsApp. We will advise whether you are safe to drive and propose a clear upgrade or replacement plan.',
  },
  suspension: {
    slug: 'suspension',
    name: 'Suspension & Steering',
    short: 'Precision alignment and suspension work for German comfort and handling.',
    heroIntro:
      'German suspension systems are complex, especially on S-Class, 7 Series, and Porsche platforms.',
    heroBenefit:
      'We calibrate and repair adaptive, air, and sport suspensions so your car feels planted yet comfortable on Dubai roads.',
    primaryUseCases: [
      'Shock absorber, control arm, and bushing replacement for German sedans and SUVs.',
      'Four-wheel alignment tailored to Dubai highway speeds and tyre life.',
      'Diagnosis and repair of air suspension leaks, compressor issues, and level sensor faults.',
    ],
    dubaiSpecifics: [
      'Road humps and speed breakers in residential areas quickly expose weak suspension components.',
      'Extreme heat can accelerate air suspension leaks and rubber bushing degradation.',
      'Uneven wear on premium tyres is a major cost driver that proper alignment can control.',
    ],
    leadMagnetTitle: 'Ride quality and tyre wear assessment',
    leadMagnetBody:
      'Share photos of your tyre wear pattern and a short cabin video over bumps. We will respond with a suspension health opinion and alignment recommendation.',
  },
  ac: {
    slug: 'ac',
    name: 'AC Services',
    short: 'Deep AC diagnostics and cooling restoration for Dubai summer conditions.',
    heroIntro:
      'A German car with weak AC is simply unusable in peak Dubai summer.',
    heroBenefit:
      'We combine leak detection, compressor diagnostics, and air-quality treatment to restore strong, clean cooling.',
    primaryUseCases: [
      'AC gas leak testing, refilling, and compressor repair.',
      'Evaporator and condenser cleaning to improve cooling efficiency.',
      'Cabin filter replacement and odour treatment for a fresh interior.',
    ],
    dubaiSpecifics: [
      'Extended idling in traffic and high ambient temperatures put maximum strain on AC components.',
      'Sand and dust choke condensers and cabin filters, reducing cooling efficiency.',
      'Humidity spikes in coastal areas can reveal underlying AC drainage and mould issues.',
    ],
    leadMagnetTitle: 'AC performance check before summer peaks',
    leadMagnetBody:
      'Message us your current AC symptoms and we will estimate the likely cause and cost range before you visit.',
  },
  diagnostics: {
    slug: 'diagnostics',
    name: 'Computer Diagnostics',
    short: 'Factory-level diagnostics for German control units and complex fault codes.',
    heroIntro:
      'Modern German cars are software-defined machines with hundreds of control units.',
    heroBenefit:
      'We use brand-specific tools (such as PIWIS, ISTA, ODIS, and Star Diagnosis) to pinpoint issues instead of replacing parts by trial and error.',
    primaryUseCases: [
      'Full vehicle health scans for pre-purchase, pre-warranty-expiry, or annual check-ups.',
      'Targeted diagnostics for engine, transmission, ABS, and infotainment faults.',
      'Report generation you can share with insurers, dealers, or potential buyers.',
    ],
    dubaiSpecifics: [
      'Heat, sand, and modified wiring from aftermarket accessories trigger complex electrical faults.',
      'Imported and GCC-spec cars behave differently; we understand both profiles.',
      'Dubai buyers increasingly demand electronic health reports before purchasing used German vehicles.',
    ],
    leadMagnetTitle: 'Digital health report for your German car',
    leadMagnetBody:
      'Share your VIN and warning lights via WhatsApp. We will advise the ideal diagnostic package and expected outcomes before you book.',
  },
  transmission: {
    slug: 'transmission',
    name: 'Transmission Services',
    short: 'Precision servicing for German automatic, DCT, and performance transmissions.',
    heroIntro:
      'Smooth shifting is a non-negotiable part of the German driving experience.',
    heroBenefit:
      'We service and repair complex German transmissions using the correct fluids, tooling, and calibration procedures.',
    primaryUseCases: [
      'Transmission oil and filter changes for ZF, DSG, PDK, and Mercedes gearboxes.',
      'Diagnosis of harsh shifts, slipping, and delayed engagement.',
      'Preventive maintenance plans based on your mileage, power output, and driving style.',
    ],
    dubaiSpecifics: [
      'High-speed highway pulls combined with hot stop–start traffic punish transmission fluid and clutches.',
      'Many Dubai cars run software tunes increasing torque beyond stock limits.',
      'Transmission neglect is one of the costliest long-term mistakes German owners make; early care is much cheaper than overhaul.',
    ],
    leadMagnetTitle: 'Shift quality assessment and service roadmap',
    leadMagnetBody:
      'Record a short video of your revs and gear changes and send it over WhatsApp. We will indicate whether a service, adaptation, or deeper repair is likely.',
  },
  battery: {
    slug: 'battery',
    name: 'Battery & Electrical',
    short: 'German-grade battery testing, coding, and electrical diagnostics.',
    heroIntro:
      'Random warnings, non-starts, and comfort features failing often begin with electrical issues.',
    heroBenefit:
      'We combine proper battery testing, coding, and electrical tracing to stabilise your car&apos;s electronics.',
    primaryUseCases: [
      'Battery load testing, replacement, and coding for modern German systems.',
      'Alternator, starter, and grounding diagnostics.',
      'Electrical draw tracking for parasitic drain and overnight battery losses.',
    ],
    dubaiSpecifics: [
      'Short city trips, high heat, and accessory loads shorten battery life in Dubai.',
      'German cars rely heavily on stable voltage for safety and comfort modules.',
      'Incorrect battery type or uncoded replacements can trigger cascading warning lights.',
    ],
    leadMagnetTitle: 'No-start and warning light triage',
    leadMagnetBody:
      'If your car is slow to start or shows electrical errors, message us your symptoms. We will suggest whether to jump, tow, or book a targeted electrical test.',
  },
  inspection: {
    slug: 'inspection',
    name: 'Pre‑Purchase Inspection',
    short: '70+ point German vehicle inspection before you commit to a used purchase.',
    heroIntro:
      'In Dubai&apos;s active used-car market, the right inspection saves you from five-figure mistakes.',
    heroBenefit:
      'We inspect German vehicles before you buy, highlighting upcoming costs so you negotiate with confidence—or walk away.',
    primaryUseCases: [
      'Comprehensive mechanical, electrical, and body inspection for German cars before purchase.',
      'Full diagnostic scan with printed or digital report for buyer and seller.',
      'Post-inspection consultation call to plan first-year maintenance and budgeting.',
    ],
    dubaiSpecifics: [
      'Many German cars are imported or ex-rental; a structured inspection reveals hidden accident or flood damage.',
      'Seasonal promotions and end-of-year clearances can hide deferred maintenance.',
      'Motorsport and track use in Dubai can seriously impact brakes, suspension, and cooling systems.',
    ],
    leadMagnetTitle: 'Share the listing before you drive across town',
    leadMagnetBody:
      'Send us the Dubizzle or dealer listing via WhatsApp. We&apos;ll give an early opinion on the model, engine, and common Dubai issues before you book a full inspection.',
  },
};

interface ServicePageProps {
  params: { slug: string };
}

export default function ServicePage({ params }: ServicePageProps) {
  const service = services[params.slug];

  if (!service) {
    return notFound();
  }

  const otherServices = Object.values(services).filter((s) => s.slug !== service.slug);

  return (
    <main className="section bg-background">
      <div className="section-container space-y-12">
        {/* Breadcrumb */}
        <nav className="text-xs text-white/40 mb-2" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-white/70 transition-colors">
                Home
              </Link>
            </li>
            <li className="opacity-60">/</li>
            <li>
              <Link href="/#services" className="hover:text-white/70 transition-colors">
                Our Services
              </Link>
            </li>
            <li className="opacity-60">/</li>
            <li className="text-white/80">{service.name}</li>
          </ol>
        </nav>

        {/* Hero */}
        <header className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)] gap-10 items-start">
          <div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white/90 mb-4">
              {service.name} for German vehicles in Dubai
            </h1>
            <p className="text-sm md:text-base text-white/70 mb-4 max-w-2xl">
              {service.heroIntro}
            </p>
            <p className="text-sm md:text-base text-white/60 mb-8 max-w-2xl">
              {service.heroBenefit}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <a
                href={`tel:${PHONE.replace(/\s/g, '')}`}
                className="btn btn-primary w-full sm:w-auto"
              >
                Call the Workshop
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="btn btn-glass w-full sm:w-auto"
              >
                WhatsApp Photos / Videos
              </a>
            </div>

            <p className="mt-3 text-xs text-white/40">
              Typical response time during working hours: under 10 minutes.
            </p>
          </div>

          <aside className="glass-card p-6 space-y-4">
            <h2 className="text-sm font-semibold text-white/80 tracking-[0.2em] uppercase">
              Service Snapshot
            </h2>
            <p className="text-sm text-white/70">{service.short}</p>
            <div className="border-t border-white/10 pt-4 mt-2 space-y-2 text-xs text-white/60">
              <p>
                <strong className="text-white/80">Location:</strong> Al Quoz Industrial Area 3, Dubai
              </p>
              <p>
                <strong className="text-white/80">Brands:</strong> Mercedes-Benz, BMW, Audi, Porsche, Volkswagen & more
              </p>
              <p>
                <strong className="text-white/80">Pricing:</strong> Typically 30–50% below agency rates using OEM-grade parts.
              </p>
            </div>
          </aside>
        </header>

        {/* What we actually do */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white/90 mb-4">
              What this service covers
            </h2>
            <ul className="space-y-3 text-sm text-white/70">
              {service.primaryUseCases.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-white/90 mb-4">
              Why this matters in Dubai
            </h2>
            <ul className="space-y-3 text-sm text-white/70">
              {service.dubaiSpecifics.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white/60" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Lead magnet */}
        <section className="glass-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="text-lg md:text-xl font-semibold text-white/90 mb-2">
              {service.leadMagnetTitle}
            </h2>
            <p className="text-sm md:text-base text-white/70">
              {service.leadMagnetBody}
            </p>
          </div>
          <div className="flex flex-col gap-3 w-full md:w-auto">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary w-full md:w-auto"
            >
              Start WhatsApp Conversation
            </a>
            <a
              href={`tel:${PHONE.replace(/\s/g, '')}`}
              className="btn btn-glass w-full md:w-auto text-xs md:text-sm"
            >
              Or call {PHONE}
            </a>
          </div>
        </section>

        {/* Other services */}
        <section className="border-t border-white/10 pt-8 mt-4">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-[0.2em] mb-4">
            Other German services we offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="glass-card p-4 hover:bg-white/10 transition-colors flex flex-col justify-between"
              >
                <div>
                  <p className="text-white/85 font-medium mb-1">{s.name}</p>
                  <p className="text-white/50 text-xs line-clamp-3">{s.short}</p>
                </div>
                <span className="mt-3 text-[11px] text-white/60 uppercase tracking-[0.16em]">
                  View details →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
