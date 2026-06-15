import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Check,
  X,
  Sparkles,
  ChevronDown,
  HelpCircle,
  Zap,
  Shield,
  Crown,
  ArrowRight,
  Star,
} from 'lucide-react';
import ScrollReveal, { StaggerContainer, StaggerItem } from '@/components/ScrollReveal';

const plans = [
  {
    id: 'basic',
    name: 'Basic',
    price: '$9',
    period: 'one-time',
    description: 'Perfect for a quick refresh',
    icon: Zap,
    gradient: 'from-blue-400 to-blue-600',
    features: [
      '20 AI-generated headshots',
      '3 style options',
      'Standard resolution (1024x1024)',
      '24-hour delivery',
      'Basic background options',
      'Email support',
    ],
    notIncluded: [
      '4K resolution',
      'Background variations',
      'Priority processing',
      'Commercial license',
      'Team sharing',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: 'one-time',
    description: 'Most popular choice',
    icon: Crown,
    gradient: 'from-violet-500 to-purple-700',
    features: [
      '100 AI-generated headshots',
      '10 style options',
      '4K Ultra HD resolution',
      'Instant delivery',
      '20+ background variations',
      'Priority processing queue',
      'Full commercial license',
      '24/7 priority support',
    ],
    notIncluded: [
      'Custom backgrounds',
      'Team sharing',
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    id: 'studio',
    name: 'Studio',
    price: '$79',
    period: 'one-time',
    description: 'For teams & power users',
    icon: Shield,
    gradient: 'from-teal-400 to-emerald-600',
    features: [
      '500 AI-generated headshots',
      'All style options (25+)',
      '4K + RAW export',
      'Instant delivery',
      'Unlimited background variations',
      'Custom background upload',
      'Highest priority queue',
      'Enterprise commercial license',
      'Team sharing (up to 10)',
      'Dedicated account manager',
    ],
    notIncluded: [],
    cta: 'Contact Sales',
    popular: false,
  },
];

const comparisonFeatures = [
  { name: 'AI Headshots', basic: '20', pro: '100', studio: '500' },
  { name: 'Style Options', basic: '3', pro: '10', studio: '25+' },
  { name: 'Resolution', basic: 'Standard', pro: '4K', studio: '4K + RAW' },
  { name: 'Delivery Time', basic: '24 hours', pro: 'Instant', studio: 'Instant' },
  { name: 'Background Options', basic: '5', pro: '20+', studio: 'Unlimited' },
  { name: 'Custom Backgrounds', basic: false, pro: false, studio: true },
  { name: 'Priority Queue', basic: false, pro: true, studio: true },
  { name: 'Commercial License', basic: false, pro: true, studio: true },
  { name: 'Team Sharing', basic: false, pro: false, studio: '10 users' },
  { name: 'Support', basic: 'Email', pro: '24/7 Priority', studio: 'Dedicated' },
];

const faqs = [
  {
    question: 'How does the AI headshot generation work?',
    answer: 'Our advanced AI analyzes your uploaded selfies to understand your facial features, expressions, and angles. It then trains a custom model specifically for you and generates professional-quality headshots in your chosen style. The entire process takes about 20-30 minutes.',
  },
  {
    question: 'What photos should I upload for best results?',
    answer: 'For optimal results, upload 10-20 clear selfies with good lighting. Include a variety of angles (front, slight side profile), different expressions (smile, neutral), and ensure your face is clearly visible. Avoid sunglasses, hats, or heavy filters.',
  },
  {
    question: 'Can I use the headshots commercially?',
    answer: 'Pro and Studio plans include a full commercial license, allowing you to use the generated headshots for business purposes, marketing, social media, and more. The Basic plan is for personal use only.',
  },
  {
    question: 'How long does it take to get my headshots?',
    answer: 'Pro and Studio plans offer instant delivery, typically within 5-10 minutes. Basic plans are delivered within 24 hours. The actual AI training and generation process takes about 20-30 minutes.',
  },
  {
    question: 'What is your refund policy?',
    answer: 'We offer a 100% satisfaction guarantee. If you are not happy with your headshots, contact us within 7 days of generation and we will either regenerate them for free or provide a full refund.',
  },
  {
    question: 'Is my data safe and private?',
    answer: 'Absolutely. We take privacy very seriously. Your uploaded photos are encrypted, stored securely, and only used for generating your headshots. We never share, sell, or use your photos for any other purpose. Photos are automatically deleted from our servers after 30 days.',
  },
  {
    question: 'Can I regenerate if I do not like the results?',
    answer: 'Yes! With Pro and Studio plans, you can regenerate your headshots with different style settings at no additional cost. Basic plan users can purchase additional generations for a small fee.',
  },
  {
    question: 'What file formats do you support?',
    answer: 'We support JPG, PNG, and WebP formats for uploads (up to 10MB per file). Generated headshots are delivered in high-quality PNG format. Studio plan users also get access to RAW format exports.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-100 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-heading font-semibold text-[#0F172A] group-hover:text-blue-600 transition-colors pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
        className="overflow-hidden"
      >
        <p className="text-[#64748B] leading-relaxed pb-5 text-sm">{answer}</p>
      </motion.div>
    </div>
  );
}

export default function Pricing() {
  return (
    <div className="min-h-[100dvh] pt-[72px]">
      {/* Hero */}
      <section className="py-16 bg-gradient-to-br from-[#0A1628] via-[#1E3A5F] to-blue-900">
        <div className="max-w-[1280px] mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 mb-6">
              <Star className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-medium text-blue-100">Simple Pricing, No Subscriptions</span>
            </span>
            <h1 className="font-heading font-bold text-3xl sm:text-5xl text-white mb-4">
              Choose Your Plan
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto mb-8">
              One-time payment. No hidden fees. No recurring charges. Get professional headshots that last.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-[1280px] mx-auto px-6">
          <StaggerContainer className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto" staggerDelay={0.1}>
            {plans.map((plan) => (
              <StaggerItem key={plan.id}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.3 }}
                  className={`relative rounded-2xl p-7 h-full flex flex-col ${
                    plan.popular
                      ? 'bg-gradient-to-b from-[#0A1628] to-[#1E3A5F] text-white shadow-xl md:scale-[1.03]'
                      : 'bg-white shadow-card'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 text-white text-xs font-bold shadow-md">
                      Most Popular
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center mb-5`}>
                    <plan.icon className="w-6 h-6 text-white" />
                  </div>

                  <div className="mb-5">
                    <h3 className={`font-heading font-semibold text-xl mb-1 ${plan.popular ? 'text-white' : 'text-[#0F172A]'}`}>
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
                    <span className={`text-sm ml-1 ${plan.popular ? 'text-slate-400' : 'text-[#64748B]'}`}>
                      / {plan.period}
                    </span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5">
                        <Check className={`w-4.5 h-4.5 shrink-0 mt-0.5 ${plan.popular ? 'text-blue-400' : 'text-blue-500'}`} />
                        <span className={`text-sm ${plan.popular ? 'text-slate-200' : 'text-[#64748B]'}`}>
                          {feature}
                        </span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 opacity-40">
                        <X className="w-4.5 h-4.5 shrink-0 mt-0.5 text-slate-400" />
                        <span className="text-sm text-[#64748B]">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/upload"
                    className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold transition-all ${
                      plan.popular
                        ? 'bg-white text-[#0A1628] hover:bg-blue-50'
                        : 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:brightness-110 shadow-lg'
                    }`}
                  >
                    <Sparkles className="w-4 h-4" />
                    {plan.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A] mb-3">
              Feature Comparison
            </h2>
            <p className="text-[#64748B]">See exactly what is included in each plan</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl border border-slate-200 overflow-hidden">
              {/* Table Header */}
              <div className="grid grid-cols-[1fr_120px_120px_120px] bg-[#F8FAFC] border-b border-slate-200">
                <div className="px-6 py-4 text-sm font-semibold text-[#0F172A]">Feature</div>
                <div className="px-4 py-4 text-sm font-semibold text-center text-[#0F172A]">Basic</div>
                <div className="px-4 py-4 text-sm font-semibold text-center text-blue-600 bg-blue-50/50">Pro</div>
                <div className="px-4 py-4 text-sm font-semibold text-center text-[#0F172A]">Studio</div>
              </div>

              {/* Table Rows */}
              {comparisonFeatures.map((feature, i) => (
                <motion.div
                  key={feature.name}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-[1fr_120px_120px_120px] border-b border-slate-100 last:border-0 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="px-6 py-4 text-sm text-[#0F172A]">{feature.name}</div>
                  <div className="px-4 py-4 text-center">
                    {typeof feature.basic === 'boolean' ? (
                      feature.basic ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-[#64748B]">{feature.basic}</span>
                    )}
                  </div>
                  <div className="px-4 py-4 text-center bg-blue-50/30">
                    {typeof feature.pro === 'boolean' ? (
                      feature.pro ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-[#64748B]">{feature.pro}</span>
                    )}
                  </div>
                  <div className="px-4 py-4 text-center">
                    {typeof feature.studio === 'boolean' ? (
                      feature.studio ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-slate-300 mx-auto" />
                      )
                    ) : (
                      <span className="text-sm text-[#64748B]">{feature.studio}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[#F8FAFC]">
        <div className="max-w-[800px] mx-auto px-6">
          <ScrollReveal className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 mb-4">
              <HelpCircle className="w-6 h-6 text-blue-600" />
            </div>
            <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-[#64748B]">Everything you need to know about our service</p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl bg-white shadow-card p-6 sm:p-8">
              {faqs.map((faq) => (
                <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="font-heading font-bold text-2xl sm:text-3xl text-[#0F172A] mb-4">
                Still Have Questions?
              </h2>
              <p className="text-[#64748B] mb-8 max-w-md mx-auto">
                Our team is here to help. Reach out and we will get back to you within 24 hours.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  to="/upload"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-violet-600 hover:brightness-110 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  Get Started Free
                </Link>
                <button
                  onClick={() => alert('Coming soon!')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[#0F172A] border border-slate-200 hover:bg-slate-50 transition-all"
                >
                  Contact Support
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
