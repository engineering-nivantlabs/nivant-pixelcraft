import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Upload,
  Sparkles,
  Download,
  Star,
  Check,
  Zap,
  Shield,
  Clock,
} from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const headshots = [
  { id: 1, src: '/images/sample-headshot-1.jpg', style: 'corporate' },
  { id: 2, src: '/images/sample-headshot-2.jpg', style: 'executive' },
  { id: 3, src: '/images/sample-headshot-3.jpg', style: 'creative' },
  { id: 4, src: '/images/sample-headshot-4.jpg', style: 'corporate' },
  { id: 5, src: '/images/sample-headshot-5.jpg', style: 'creative' },
  { id: 6, src: '/images/sample-headshot-6.jpg', style: 'executive' },
];

const steps = [
  {
    icon: Upload,
    title: 'Upload Your Photos',
    description: 'Upload 10-20 selfies with different angles and expressions. Our AI works best with variety.',
  },
  {
    icon: Sparkles,
    title: 'AI Magic Happens',
    description: 'Our advanced AI model trains on your photos and generates stunning professional headshots.',
  },
  {
    icon: Download,
    title: 'Download & Share',
    description: 'Browse your generated headshots, pick your favorites, and download in high resolution.',
  },
];

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Get your professional headshots in under 30 minutes. No appointment needed.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your photos are encrypted and securely processed. We never share your data.',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Generate headshots anytime, anywhere. No studio scheduling required.',
  },
];

const testimonials = [
  {
    name: 'Sarah Mitchell',
    role: 'Marketing Director',
    quote: 'I needed a professional headshot for LinkedIn urgently. AI Photo Studio delivered incredible results in 20 minutes. Highly recommend!',
    avatar: '/images/sample-headshot-1.jpg',
    stars: 5,
  },
  {
    name: 'James Chen',
    role: 'Software Engineer',
    quote: 'The quality blew me away. The AI captured my best angles and the lighting looks like a real studio setup. Worth every penny.',
    avatar: '/images/sample-headshot-6.jpg',
    stars: 5,
  },
  {
    name: 'Priya Sharma',
    role: 'Product Manager',
    quote: 'I was skeptical at first, but the results are indistinguishable from professional studio shots. My team couldn\'t believe it.',
    avatar: '/images/sample-headshot-8.jpg',
    stars: 5,
  },
];

const pricingPreview = [
  {
    name: 'Basic',
    price: '$9',
    description: 'Perfect for a quick refresh',
    features: ['20 AI Headshots', '3 Style Options', 'Standard Resolution', '24h Delivery'],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'Most popular choice',
    features: ['100 AI Headshots', '10 Style Options', '4K Resolution', 'Instant Delivery', 'Background Variations'],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Studio',
    price: '$79',
    description: 'For teams & professionals',
    features: ['500 AI Headshots', 'All Styles', '4K + RAW Export', 'Priority Queue', 'Custom Backgrounds', 'Team Sharing'],
    cta: 'Contact Us',
    popular: false,
  },
];

export default function Home() {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <div>
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/hero-bg.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0A1628]/90 via-[#1E3A5F]/80 to-[#0A1628]/70" />
        </div>

        {/* Floating particles effect */}
        <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-400/10 blur-2xl"
              style={{
                width: 120 + i * 60,
                height: 120 + i * 60,
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -30, 0],
                x: [0, 15, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6 + i,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.8,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-[1280px] mx-auto px-6 py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-100">AI-Powered Headshots</span>
              </div>

              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-[56px] text-white leading-[1.1] tracking-[-0.02em] mb-6">
                Professional
                <span className="block bg-gradient-to-r from-blue-400 via-violet-400 to-teal-400 bg-clip-text text-transparent">
                  Headshots in Minutes
                </span>
              </h1>

              <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-lg">
                Transform your selfies into stunning, studio-quality professional portraits using cutting-edge AI technology.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  to="/upload"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white bg-gradient-to-r from-blue-500 to-violet-600 hover:brightness-110 hover:scale-[1.02] transition-all shadow-[0_4px_16px_rgba(59,130,246,0.4)]"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/gallery"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold text-white border border-white/20 hover:bg-white/10 transition-all"
                >
                  View Examples
                </Link>
              </div>

              <div className="flex items-center gap-6 mt-10">
                <div className="flex -space-x-2">
                  {headshots.slice(0, 4).map((h) => (
                    <img
                      key={h.id}
                      src={h.src}
                      alt=""
                      className="w-9 h-9 rounded-full border-2 border-[#0A1628] object-cover"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5">Trusted by 10,000+ professionals</p>
                </div>
              </div>
            </motion.div>

            {/* Before/After Toggle */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <div className="relative aspect-[3/4] max-w-[400px] mx-auto">
                  <img
                    src="/images/hero-before.jpg"
                    alt="Before"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${showAfter ? 'opacity-0' : 'opacity-100'}`}
                  />
                  <img
                    src="/images/hero-after.jpg"
                    alt="After"
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${showAfter ? 'opacity-100' : 'opacity-0'}`}
                  />

                  {/* Toggle Button */}
                  <button
                    onClick={() => setShowAfter(!showAfter)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur text-sm font-semibold text-[#0A1628] shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-blue-500" />
                    {showAfter ? 'See Original' : 'See AI Result'}
                  </button>

                  {/* Labels */}
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur text-xs font-semibold text-white">
                    {showAfter ? 'AI Result' : 'Original'}
                  </div>
                </div>
              </div>

              {/* Decorative glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-violet-500/20 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES STRIP ===== */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-[1280px] mx-auto px-6">
          <StaggerContainer className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <StaggerItem key={feature.title}>
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <feature.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-[#0F172A] mb-1">{feature.title}</h3>
                    <p className="text-sm text-[#64748B] leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== GALLERY SHOWCASE ===== */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
              Portfolio
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-[42px] text-[#0F172A] leading-tight mb-4">
              Stunning Results, Every Time
            </h2>
            <p className="text-lg text-[#64748B] max-w-xl mx-auto">
              See the quality of headshots our AI can generate from simple selfies.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-5" staggerDelay={0.1}>
            {headshots.map((shot) => (
              <StaggerItem key={shot.id}>
                <div className="group relative rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 bg-white">
                  <img
                    src={shot.src}
                    alt={`Headshot ${shot.id}`}
                    className="w-full aspect-[3/4] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-xs font-semibold text-[#0A1628] capitalize">
                      {shot.style}
                    </span>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal className="text-center mt-10" delay={0.3}>
            <Link
              to="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              View Full Gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
              How It Works
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-[42px] text-[#0F172A] leading-tight mb-4">
              Three Simple Steps
            </h2>
            <p className="text-lg text-[#64748B] max-w-xl mx-auto">
              From selfie to professional headshot in under 30 minutes.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-blue-200 via-violet-200 to-teal-200" />

            {steps.map((step, i) => (
              <StaggerItem key={step.title}>
                <div className="relative text-center">
                  <div className="relative inline-flex items-center justify-center w-[120px] h-[120px] rounded-full bg-gradient-to-br from-blue-50 to-violet-50 mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-lg">
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold shadow-md">
                      {i + 1}
                    </div>
                  </div>
                  <h3 className="font-heading font-semibold text-xl text-[#0F172A] mb-3">{step.title}</h3>
                  <p className="text-[#64748B] leading-relaxed max-w-xs mx-auto">{step.description}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== PRICING PREVIEW ===== */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
              Pricing
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-[42px] text-[#0F172A] leading-tight mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-[#64748B] max-w-xl mx-auto">
              Choose the plan that works best for you. No hidden fees.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.1}>
            {pricingPreview.map((plan) => (
              <StaggerItem key={plan.name}>
                <div
                  className={`relative rounded-2xl p-7 h-full flex flex-col ${
                    plan.popular
                      ? 'bg-gradient-to-b from-[#0A1628] to-[#1E3A5F] text-white shadow-xl scale-[1.02]'
                      : 'bg-white shadow-card'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white text-xs font-bold shadow-md">
                      Most Popular
                    </div>
                  )}

                  <div className="mb-5">
                    <h3 className={`font-heading font-semibold text-lg mb-1 ${plan.popular ? 'text-white' : 'text-[#0F172A]'}`}>
                      {plan.name}
                    </h3>
                    <p className={`text-sm ${plan.popular ? 'text-slate-300' : 'text-[#64748B]'}`}>
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6">
                    <span className={`font-heading font-bold text-4xl ${plan.popular ? 'text-white' : 'text-[#0F172A]'}`}>
                      {plan.price}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2.5">
                        <Check className={`w-4.5 h-4.5 shrink-0 ${plan.popular ? 'text-blue-400' : 'text-blue-500'}`} />
                        <span className={`text-sm ${plan.popular ? 'text-slate-200' : 'text-[#64748B]'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/upload"
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all ${
                      plan.popular
                        ? 'bg-white text-[#0A1628] hover:bg-blue-50'
                        : 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:brightness-110'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal className="text-center mt-10" delay={0.3}>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Compare all features
              <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="py-24 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal className="text-center mb-14">
            <span className="inline-block text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
              Testimonials
            </span>
            <h2 className="font-heading font-bold text-3xl sm:text-[42px] text-[#0F172A] leading-tight mb-4">
              Loved by Professionals
            </h2>
            <p className="text-lg text-[#64748B] max-w-xl mx-auto">
              See what our users have to say about their experience.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-6" staggerDelay={0.1}>
            {testimonials.map((t) => (
              <StaggerItem key={t.name}>
                <div className="rounded-2xl bg-[#F8FAFC] p-7 h-full flex flex-col">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(t.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-[#0F172A] leading-relaxed mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-semibold text-sm text-[#0F172A]">{t.name}</p>
                      <p className="text-xs text-[#64748B]">{t.role}</p>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ===== CTA SECTION ===== */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-blue-900 p-12 sm:p-16 text-center">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-violet-500/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                <h2 className="font-heading font-bold text-3xl sm:text-4xl text-white mb-4">
                  Ready for Your New Headshot?
                </h2>
                <p className="text-lg text-slate-300 mb-8 max-w-lg mx-auto">
                  Join thousands of professionals who trust AI Photo Studio for their portrait needs.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    to="/upload"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-[15px] font-semibold text-[#0A1628] bg-white hover:bg-blue-50 transition-all shadow-lg"
                  >
                    <Sparkles className="w-5 h-5" />
                    Generate My Headshots
                  </Link>
                </div>
                <p className="text-sm text-slate-400 mt-4">No credit card required. Results in 30 minutes.</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
