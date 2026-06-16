import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  ArrowRight, 
  Zap, 
  Globe, 
  Users, 
  Scale,
  MoreHorizontal,
  ChevronDown,
  Lock,
  Layout as LayoutIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const SectionHeading = ({ children, subtitle, centered = false }) => (
  <div className={cn("mb-12", centered && "text-center")}>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-3xl md:text-5xl font-display font-extrabold text-black dark:text-white mb-4"
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30, scale: 0.9 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ 
      duration: 0.5,
      delay,
      type: "spring",
      stiffness: 100,
      damping: 15
    }}
    whileHover={{ 
      y: -12, 
      scale: 1.02,
      transition: { duration: 0.2, ease: "easeOut" } 
    }}
    className="p-8 rounded-[2.5rem] bg-white dark:bg-black border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-2xl hover:border-brand-500/20 transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-brand-500/10 transition-colors" />
    <div className="w-16 h-16 rounded-2xl bg-brand-50 dark:bg-brand-900/30 flex items-center justify-center text-brand-600 dark:text-brand-400 mb-8 group-hover:bg-brand-600 group-hover:text-white group-hover:rotate-12 transition-all duration-300">
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-2xl font-black text-black dark:text-white mb-4 tracking-tight">{title}</h3>
    <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
      {description}
    </p>
  </motion.div>
);

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-100 dark:border-slate-800">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-8 flex items-center justify-between text-left group"
      >
        <span className="text-lg md:text-xl font-bold text-black dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
          {question}
        </span>
        <div className={cn("w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 flex items-center justify-center transition-all", isOpen && "bg-brand-600 border-brand-600 text-white")}>
          <ChevronDown className={cn("w-5 h-5 transition-transform", isOpen && "rotate-180")} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-8 text-slate-500 dark:text-slate-400 leading-relaxed text-lg">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function Landing() {
  return (
    <div className="overflow-hidden bg-white dark:bg-black">
      {/* Hero Section */}
      <section className="relative pt-24 pb-40 px-6">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-brand-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-brand-50 dark:bg-brand-950 border border-brand-200 dark:border-brand-800 text-brand-600 dark:text-brand-400 text-sm font-black mb-10 shadow-sm"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span className="tracking-widest uppercase">Powered by Gemini Pro</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-display font-black tracking-tighter text-black dark:text-white mb-10 leading-[0.95]"
            >
              Stop Accepting <br />
              <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 dark:from-brand-400 dark:to-indigo-300">Blindly.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-3xl mx-auto mb-14 leading-relaxed font-medium"
            >
              Protect your data, identity, and privacy in seconds. Our AI scans thousands of lines of code to find the traps you shouldn't fall for.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link 
                to="/analyzer"
                className="w-full sm:w-auto px-12 py-6 bg-brand-600 hover:bg-brand-700 text-white rounded-3xl font-black text-xl flex items-center justify-center gap-3 shadow-2xl shadow-brand-500/40 transition-all hover:scale-105 active:scale-95 group"
              >
                Analyze Now
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <a 
                href="#features"
                className="w-full sm:w-auto px-12 py-6 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-2 border-slate-200 dark:border-slate-800 rounded-3xl font-black text-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-xl"
              >
                Features
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why to Use */}
      <section id="about" className="py-32 bg-white dark:bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-square rounded-[3rem] bg-white dark:bg-black p-12 shadow-2xl relative overflow-hidden group border border-slate-100 dark:border-slate-800">
                 <div className="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent pointer-events-none" />
                 <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="space-y-6">
                      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-full" />
                      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-5/6" />
                      <div className="h-6 bg-rose-200 dark:bg-rose-900/30 rounded-full w-full border border-rose-100 dark:border-rose-900/50" />
                      <div className="h-6 bg-slate-200 dark:bg-slate-800 rounded-full w-4/6" />
                    </div>
                    <motion.div 
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="bg-white dark:bg-black p-8 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-700 transform hover:scale-105 transition-transform"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-2xl bg-rose-500 flex items-center justify-center text-white">
                          <AlertTriangle className="w-6 h-6" />
                        </div>
                        <span className="font-black text-xl text-slate-900 dark:text-white">Relinquishment Detected</span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
                        "User grants the company a worldwide, perpetual, irrevocable license to use all uploaded content for marketing..."
                      </p>
                    </motion.div>
                 </div>
              </div>
            </motion.div>

            <div>
              <SectionHeading subtitle="Legal teams build terms to protect companies, not you. TermsGuard flips the script.">
                Why use TermsGuard?
              </SectionHeading>
              <div className="space-y-10">
                {[
                  { icon: LayoutIcon, color: "brand", title: "Transparency First", desc: "We translate complex legalese into high-impact, easy-to-read points that matter most to you." },
                  { icon: Globe, color: "indigo", title: "Global Protection", desc: "Works across any website, app, or service globally. From social media to banking." },
                  { icon: Shield, color: "emerald", title: "Safe & Verified", desc: "No data storage, no tracking. Your analysis stays private, just like your data should." }
                ].map((item, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-6 group"
                  >
                    <div className={cn(
                      "shrink-0 w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all group-hover:scale-110",
                      item.color === "brand" && "bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 shadow-lg shadow-brand-500/10",
                      item.color === "indigo" && "bg-indigo-50 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 shadow-lg shadow-indigo-500/10",
                      item.color === "emerald" && "bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10"
                    )}>
                      <item.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">{item.title}</h4>
                      <p className="text-slate-500 dark:text-slate-400 leading-relaxed text-lg font-medium">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-white dark:bg-black">
        <div className="max-w-7xl mx-auto">
          <SectionHeading centered subtitle="Cutting-edge AI capabilities to tackle even the most convoluted legal documents.">
            Elite Features
          </SectionHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard 
              icon={Zap} 
              title="Real-time Safety Rating" 
              description="Get an immediate score out of 100 based on our proprietary risk-assessment algorithms." 
              delay={0}
            />
            <FeatureCard 
              icon={AlertTriangle} 
              title="Malicious Clause Alerts" 
              description="Instantly spot clauses about data selling, hidden fees, or unwanted service commitments." 
              delay={0.1}
            />
            <FeatureCard 
              icon={Lock} 
              title="PII Tracker" 
              description="See exactly how your Personally Identifiable Information is being handled and shared." 
              delay={0.2}
            />
            <FeatureCard 
              icon={FileText} 
              title="Smart Summarizer" 
              description="Skip the 50-page reading. Get a 30-second summary of the most vital impact points." 
              delay={0.3}
            />
            <FeatureCard 
              icon={Scale} 
              title="Legal Rights Audit" 
              description="Know your rights about arbitration, class-action lawsuits, and governing jurisdictions." 
              delay={0.4}
            />
            <FeatureCard 
              icon={MoreHorizontal} 
              title="Multi-Domain Support" 
              description="Optimized for SaaS, E-commerce, Fintech, and Social Media platform agreements." 
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* How it works Visual */}
      <section id="how-it-works" className="py-32 bg-slate-50/50 dark:bg-zinc-950/20 relative overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/3 w-[30%] h-[30%] bg-brand-500/5 rounded-full blur-[100px]" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-brand-500/20"
            >
              <LayoutIcon className="text-white w-8 h-8" />
            </motion.div>
            <h2 className="text-4xl md:text-6xl font-display font-black text-black dark:text-white mb-4 tracking-tight">How to Use TermsGuard</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-xl font-medium leading-relaxed">Three simple stages to unlock full readability and secure your rights in seconds.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { 
                icon: FileText, 
                title: "1. Paste Contract", 
                desc: "Simply grab the terms and conditions text from any website, app, or legal PDF contract. No registration is ever needed.",
                preview: (
                  <div className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-2 relative overflow-hidden group-hover:scale-[1.03] transition-transform duration-300">
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-rose-400" />
                      <div className="w-2 h-2 rounded-full bg-amber-400" />
                      <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    </div>
                    <p className="text-[10px] font-mono text-slate-400 dark:text-slate-500 truncate mt-1">{"https://example-service.com/legal"}</p>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded mt-1" />
                    <div className="h-2 w-11/12 bg-slate-100 dark:bg-slate-800 rounded animate-pulse" />
                    <div className="h-2 w-4/6 bg-rose-100 dark:bg-rose-950 rounded" />
                    <span className="absolute top-2.5 right-2.5 text-[9px] font-mono px-1.5 py-0.5 bg-brand-500/10 text-brand-600 dark:text-brand-400 rounded font-bold">pasted_terms.doc</span>
                  </div>
                )
              },
              { 
                icon: Zap, 
                title: "2. Instant Audit", 
                desc: "Our high-precision Gemini engine scans the terms to spot custom parameters, hidden vulnerabilities, and data leaks.",
                preview: (
                  <div className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-3 relative overflow-hidden justify-center items-center h-[116px] group-hover:scale-[1.03] transition-transform duration-300">
                    <div className="relative flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full border-2 border-brand-500/20 border-t-brand-500 animate-spin" />
                      <Zap className="w-5 h-5 text-brand-500 absolute animate-pulse" />
                    </div>
                    <span className="text-[9px] font-mono tracking-widest text-brand-600 dark:text-brand-400 uppercase font-black">evaluating 500+ clauses...</span>
                  </div>
                )
              },
              { 
                icon: Shield, 
                title: "3. Interactive Safety", 
                desc: "Get a clear rating card, charts, summaries, and ask any custom questions directly to the document chat assistant.",
                preview: (
                  <div className="mt-6 p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex flex-col gap-3 relative overflow-hidden justify-center items-center h-[116px] group-hover:scale-[1.03] transition-transform duration-300">
                    <div className="flex items-center gap-2 bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">92% TRUST RATING</span>
                    </div>
                    <span className="text-[9px] font-mono tracking-wider text-slate-400 dark:text-slate-500 uppercase font-bold">report ready + qa loaded</span>
                  </div>
                )
              }
            ].map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group p-8 rounded-[2.5rem] bg-white dark:bg-black border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-900/40 flex items-center justify-center text-brand-600 dark:text-brand-400 group-hover:scale-110 transition-transform">
                      <step.icon className="w-6 h-6" />
                    </div>
                    <span className="text-3xl font-mono font-black text-slate-200 dark:text-slate-800 group-hover:text-brand-550 transition-colors">0{idx + 1}</span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed mb-6">{step.desc}</p>
                </div>
                {step.preview}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <SectionHeading centered>Common Questions</SectionHeading>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            <FaqItem 
              question="Is this service legally binding?" 
              answer="No. TermsGuard AI provides information and analysis based on machine learning. It is not legal advice and should not be treated as a substitute for a qualified lawyer's opinion."
            />
            <FaqItem 
              question="Does it work on any website?" 
              answer="Yes! As long as you can copy the text, our AI can analyze it. This includes mobile app terms, websites, and even PDF contracts copied into the text field."
            />
            <FaqItem 
              question="Is my data safe while analyzing?" 
              answer="Absolutely. We do not store your pasted text, your results, or your session data. The entire analysis happens on-demand and is wiped as soon as you close the page."
            />
            <FaqItem 
              question="Which AI model is being used?" 
              answer="We leverage the latest Gemini 1.5 Flash models from Google DeepMind, optimized for high-speed processing of large context documents."
            />
          </div>

          <div className="mt-20 p-12 bg-brand-50 dark:bg-black rounded-[3rem] border border-brand-100 dark:border-slate-800 text-center">
            <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-6">Still have questions?</h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium mb-10">We're here to help you navigate the fine print.</p>
            <button className="px-10 py-5 bg-white dark:bg-black text-brand-600 font-black rounded-2xl border-2 border-brand-500 shadow-xl hover:bg-brand-600 hover:text-white transition-all">
              Contact Support
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
