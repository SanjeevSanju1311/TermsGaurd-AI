import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Loader2,
  RefreshCw,
  Zap,
  MessageSquare,
  Shield,
  ArrowLeft,
  Send,
  Brain,
  LineChart,
  ShieldAlert,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { analyzeTerms, askQuestionAboutTerms } from '../services/geminiService';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// Drifting Animated Gradient Orbs
const BackgroundOrbs = ({ result }) => {
  let orbColor1 = "bg-brand-400/10 dark:bg-brand-500/5";
  let orbColor2 = "bg-indigo-400/10 dark:bg-indigo-500/5";
  let orbColor3 = "bg-purple-400/10 dark:bg-purple-500/5";

  if (result) {
    if (result.safetyScore >= 80) {
      orbColor1 = "bg-emerald-400/15 dark:bg-emerald-500/10";
      orbColor2 = "bg-teal-400/15 dark:bg-teal-500/10";
      orbColor3 = "bg-green-400/15 dark:bg-green-500/10";
    } else if (result.safetyScore >= 50) {
      orbColor1 = "bg-amber-400/15 dark:bg-amber-500/10";
      orbColor2 = "bg-orange-400/15 dark:bg-orange-500/10";
      orbColor3 = "bg-yellow-400/15 dark:bg-yellow-500/10";
    } else {
      orbColor1 = "bg-rose-400/15 dark:bg-rose-500/10";
      orbColor2 = "bg-red-400/15 dark:bg-red-500/10";
      orbColor3 = "bg-rose-600/10 dark:bg-rose-900/5";
    }
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -40, 80, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
        }}
        className={cn("absolute top-1/4 left-1/4 w-[50vw] h-[50vw] rounded-full blur-[120px] transition-colors duration-1000", orbColor1)}
      />
      <motion.div
        animate={{
          x: [0, -80, 40, 0],
          y: [0, 60, -40, 0],
          scale: [1, 0.85, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 1,
        }}
        className={cn("absolute bottom-1/4 right-1/4 w-[45vw] h-[45vw] rounded-full blur-[100px] transition-colors duration-1000", orbColor2)}
      />
      <motion.div
        animate={{
          x: [0, 40, -60, 0],
          y: [0, 70, 30, 0],
          scale: [1, 1.05, 0.85, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          delay: 2,
        }}
        className={cn("absolute top-1/3 right-1/3 w-[40vw] h-[40vw] rounded-full blur-[90px] transition-colors duration-1000", orbColor3)}
      />
    </div>
  );
};

// Category Risk Bar Chart (SVG-less responsive layout)
const CategoryChart = ({ result }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const categories = ["Privacy", "Data Usage", "Legal", "Other"];
  const colorMap = {
    Privacy: "bg-blue-500",
    "Data Usage": "bg-indigo-505 bg-indigo-500",
    Legal: "bg-amber-500",
    Other: "bg-purple-500"
  };

  const data = categories.map(cat => ({
    name: cat,
    count: result.redFlags.filter(f => f.category === cat).length,
    issues: result.redFlags.filter(f => f.category === cat),
  }));

  const maxCount = Math.max(...data.map(d => d.count), 1);

  return (
    <div className="bg-white dark:bg-black p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl">
            <LineChart className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">Vulnerable Spots by Category</h4>
        </div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-8">
          Visualization of clause exposure density inside legal categories. <span className="text-indigo-600 dark:text-indigo-400 font-bold">Click a category to reveal specific issues.</span>
        </p>
      </div>
      <div className="space-y-4">
        {data.map((item, idx) => {
          const percentage = (item.count / maxCount) * 100;
          const isSelected = selectedCategory === item.name;
          return (
            <div 
              key={idx} 
              onClick={() => setSelectedCategory(isSelected ? null : item.name)}
              className={cn(
                "group cursor-pointer p-4 rounded-3xl border border-transparent transition-all text-left",
                isSelected 
                  ? "bg-slate-50 dark:bg-zinc-900/50 border-slate-100 dark:border-slate-800" 
                  : "hover:bg-slate-50/60 dark:hover:bg-zinc-950/40"
              )}
            >
              <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                <span className="flex items-center gap-2">
                  <span className="font-black text-slate-850 dark:text-slate-200">{item.name}</span>
                  {item.count > 0 && (
                    <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-450 lowercase">
                      (click to view)
                    </span>
                  )}
                </span>
                <span className="font-extrabold text-slate-800 dark:text-slate-205 flex items-center gap-1.5">
                  <span>{item.count} {item.count === 1 ? 'issue' : 'issues'}</span>
                  {item.count > 0 && (
                    <ChevronDown className={cn("w-3.5 h-3.5 text-slate-400 transition-transform duration-300", isSelected && "transform rotate-180")} />
                  )}
                </span>
              </div>
              <div className="h-4 w-full bg-slate-100/80 dark:bg-slate-900 rounded-full overflow-hidden relative">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: "easeOut", delay: idx * 0.1 }}
                  className={cn("h-full rounded-full", colorMap[item.name] || "bg-indigo-500")}
                />
              </div>

              <AnimatePresence initial={false}>
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 mt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-3">
                      {item.issues.length === 0 ? (
                        <p className="text-xs text-slate-400 dark:text-slate-500 italic py-1 text-left">No issues flagged in this category.</p>
                      ) : (
                        item.issues.map((flag, flagIdx) => (
                          <div key={flagIdx} className="text-xs space-y-1 py-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className={cn(
                                "px-2 py-0.5 rounded-md font-black text-[9px] uppercase tracking-wider",
                                flag.severity === "High" ? "bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400" :
                                flag.severity === "Medium" ? "bg-amber-50 text-amber-600 dark:bg-amber-950/40 dark:text-amber-400" :
                                "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400"
                              )}>
                                {flag.severity} Risk
                              </span>
                            </div>
                            <p className="text-slate-700 dark:text-slate-350 font-semibold leading-relaxed">{flag.point}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Severity Metrics Chart (Radial Progress Charts)
const SeverityMetrics = ({ result }) => {
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  const highCount = result.redFlags.filter(f => f.severity === "High").length;
  const medCount = result.redFlags.filter(f => f.severity === "Medium").length;
  const lowCount = result.redFlags.filter(f => f.severity === "Low").length;
  const total = highCount + medCount + lowCount || 1;

  const severities = [
    { key: "High", label: "High Risk", count: highCount, pct: (highCount / total) * 100, ringColor: "#ef4444" },
    { key: "Medium", label: "Medium Risk", count: medCount, pct: (medCount / total) * 100, ringColor: "#f59e0b" },
    { key: "Low", label: "Low Risk", count: lowCount, pct: (lowCount / total) * 100, ringColor: "#10b981" },
  ];

  return (
    <div className="bg-white dark:bg-black p-8 md:p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 rounded-xl">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h4 className="font-extrabold text-xl text-slate-900 dark:text-white tracking-tight">Risk Severity Index</h4>
        </div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-8">
          Severity ratio split of vulnerabilities. <span className="text-indigo-600 dark:text-indigo-400 font-bold">Click a rating to see matched clauses.</span>
        </p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {severities.map((sev, idx) => {
          const radius = 32;
          const stroke = 6;
          const normalizedRadius = radius - stroke;
          const circumference = normalizedRadius * 2 * Math.PI;
          const strokeDashoffset = circumference - (sev.pct / 100) * circumference;
          const isSelected = selectedSeverity === sev.key;

          return (
            <button
              key={idx}
              onClick={() => setSelectedSeverity(isSelected ? null : sev.key)}
              className={cn(
                "flex flex-col items-center bg-slate-50/50 dark:bg-zinc-950/45 p-5 rounded-3xl border transition-all cursor-pointer",
                isSelected 
                  ? "bg-slate-100 dark:bg-zinc-90 w-full border-indigo-500/30 shadow-md ring-2 ring-indigo-500/10 scale-102"
                  : "border-slate-100/50 dark:border-slate-800/60 shadow-sm hover:scale-102 hover:bg-slate-100/30 dark:hover:bg-zinc-900/20"
              )}
            >
              <div className="relative w-16 h-16 mb-2">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    stroke="currentColor"
                    strokeWidth={stroke}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius + stroke - 8}
                    cy={radius + stroke - 8}
                    className="text-slate-200/55 dark:text-slate-800"
                  />
                  <motion.circle
                    stroke={sev.ringColor}
                    strokeWidth={stroke}
                    strokeDasharray={circumference + " " + circumference}
                    initial={{ strokeDashoffset: circumference }}
                    whileInView={{ strokeDashoffset }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.15 }}
                    fill="transparent"
                    r={normalizedRadius}
                    cx={radius + stroke - 8}
                    cy={radius + stroke - 8}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center font-black text-[10px] text-slate-850 dark:text-slate-100">
                  {Math.round(sev.pct)}%
                </div>
              </div>
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-0.5">{sev.label}</span>
              <span className="font-black text-lg text-slate-900 dark:text-white">{sev.count}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence initial={false}>
        {selectedSeverity && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-2 space-y-3 text-left"
          >
            <div className="flex items-center justify-between">
              <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <span>{selectedSeverity} Risk Issues</span>
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
              </h5>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedSeverity(null); }}
                className="text-[9px] uppercase tracking-wider font-extrabold text-slate-400 hover:text-rose-500 transition-colors"
              >
                close
              </button>
            </div>
            <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
              {result.redFlags.filter(f => f.severity === selectedSeverity).length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500 italic py-1">No {selectedSeverity.toLowerCase()} risk issues flagged.</p>
              ) : (
                result.redFlags
                  .filter(f => f.severity === selectedSeverity)
                  .map((flag, idx) => (
                    <div key={idx} className="p-3 bg-slate-50/80 dark:bg-zinc-950/80 rounded-2xl border border-slate-100/50 dark:border-slate-800/40 text-[11px] font-medium leading-relaxed text-slate-700 dark:text-slate-300">
                      <div className="flex items-center justify-between mb-1">
                        <span className="px-1.5 py-0.5 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 rounded font-black text-[8px] uppercase tracking-wider">
                          {flag.category}
                        </span>
                      </div>
                      <p>{flag.point}</p>
                    </div>
                  ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Terms Doc Q&A chat assistant
const ChatAssistant = ({ termsText }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  const [error, setError] = useState(null);
  const chatEndRef = useRef(null);

  const predefinedQuestions = [
    "Can they sell my personal data?",
    "How do I delete my account & data?",
    "Are there hidden costs or subscriptions?",
    "Does this require binding arbitration?"
  ];

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAsking]);

  const handleAsk = async (questionText) => {
    const q = questionText.trim();
    if (!q) return;

    setInput('');
    setError(null);

    const newMessages = [...messages, { role: 'user', content: q }];
    setMessages(newMessages);
    setIsAsking(true);

    try {
      const response = await askQuestionAboutTerms(termsText, q, messages);
      setMessages([...newMessages, { role: 'assistant', content: response }]);
    } catch (err) {
      console.error(err);
      setError("Unable to retrieve answer. Please make sure you have internet access and try again.");
    } finally {
      setIsAsking(false);
    }
  };

  return (
    <div className="bg-white dark:bg-black rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-8 md:p-12 space-y-8 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-brand-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-900 pb-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
            <Brain className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">T&C Document Expert</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Ask anything about this scanned agreement</p>
          </div>
        </div>
        <div className="px-4 py-2 bg-indigo-50 dark:bg-indigo-950/40 rounded-full border border-indigo-100/60 dark:border-indigo-900/40 font-black text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-widest text-center self-start md:self-auto">
          AI Session Live
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="space-y-3">
        <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">Suggested Questions</h4>
        <div className="flex flex-wrap gap-2">
          {predefinedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleAsk(q)}
              disabled={isAsking}
              className="px-5 py-3 text-sm bg-slate-50 hover:bg-indigo-50 active:bg-indigo-100 text-slate-700 hover:text-indigo-600 dark:bg-slate-900 dark:text-slate-350 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-400 rounded-2xl border border-slate-100 dark:border-slate-800/80 font-bold transition-all hover:scale-102 active:scale-98 disabled:opacity-50 text-left"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages */}
      <div className="min-h-[180px] max-h-[460px] overflow-y-auto space-y-6 pr-2 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        {messages.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center text-center text-slate-400 dark:text-slate-600 space-y-3">
            <MessageSquare className="w-10 h-10 stroke-[1.5]" />
            <p className="font-bold text-lg">No questions asked yet.</p>
            <p className="text-sm max-w-sm">Enter your custom question below or click one of the suggested pills above to instantly query the AI about specific clause traps.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex font-medium max-w-[85%] flex-col rounded-3xl p-6",
                  msg.role === 'user'
                    ? "bg-slate-50 dark:bg-zinc-950 self-end ml-auto border border-slate-100 dark:border-slate-800/80 text-slate-800 dark:text-slate-100 rounded-br-none"
                    : "bg-indigo-50/50 dark:bg-indigo-950/20 self-start mr-auto border border-indigo-50 dark:border-indigo-900/20 text-slate-800 dark:text-slate-200 rounded-bl-none text-left"
                )}
              >
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 block">
                  {msg.role === 'user' ? 'Your Question' : 'TermsGuard Expert'}
                </span>
                <div className="prose prose-slate dark:prose-invert max-w-none text-base leading-relaxed text-slate-700 dark:text-slate-300 break-words">
                  {msg.role === 'user' ? (
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  ) : (
                    <div className="markdown-body">
                      <Markdown>{msg.content}</Markdown>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {isAsking && (
          <div className="flex bg-indigo-50/20 dark:bg-indigo-950/10 max-w-[85%] flex-col rounded-3xl p-6 border border-indigo-50/30 dark:border-indigo-900/10 mr-auto text-left">
            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-505 text-indigo-500 animate-pulse mb-3 block">
              Consulting document text...
            </span>
            <div className="flex items-center gap-3 text-slate-400">
              <Loader2 className="w-5 h-5 animate-spin text-indigo-600" />
              <p className="text-sm italic font-bold">Querying AI context, parsing agreement legal clauses...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 rounded-2xl text-rose-600 dark:text-rose-400 text-sm font-bold">
            {error}
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input row */}
      <div className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk(input)}
          placeholder="Ask a custom question (e.g. 'Is there binding arbitration?')"
          disabled={isAsking}
          className="w-full pl-6 pr-16 py-5 bg-slate-50 focus:bg-white dark:bg-zinc-900 dark:focus:bg-black rounded-2xl border border-transparent focus:border-indigo-500/20 outline-none text-slate-800 dark:text-slate-100 placeholder:text-slate-405 transition-all font-semibold shadow-inner"
        />
        <button
          onClick={() => handleAsk(input)}
          disabled={isAsking || !input.trim()}
          className={cn(
            "absolute right-2 top-2 bottom-2 px-5 rounded-xl text-white font-black flex items-center justify-center transition-all active:scale-95",
            isAsking || !input.trim()
              ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700 shadow-md shadow-indigo-500/20"
          )}
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default function Analyzer() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const resultsRef = useRef(null);

  const handleAnalyze = async () => {
    if (!text.trim()) return;
    setIsAnalyzing(true);
    setError(null);
    try {
      const analysis = await analyzeTerms(text);
      setResult(analysis);
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to analyze. Please ensure your text is valid Terms & Conditions or wait a moment before trying again.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-emerald-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getBgClass = () => {
    if (!result) return "bg-white dark:bg-black";
    if (result.safetyScore >= 80) return "bg-emerald-50/30 dark:bg-emerald-950/5";
    if (result.safetyScore >= 50) return "bg-amber-50/30 dark:bg-amber-950/5";
    return "bg-rose-50/30 dark:bg-rose-950/5";
  };

  return (
    <div className={cn("min-h-screen py-20 px-6 relative overflow-hidden transition-colors duration-1000", getBgClass())}>
      <BackgroundOrbs result={result} />
      <div className="max-w-7xl mx-auto relative z-10">
        <Link to="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-brand-600 transition-colors mb-12 font-bold group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Header content for Analyzer */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-brand-600 rounded-2xl flex items-center justify-center shadow-xl shadow-brand-500/20">
               <Shield className="text-white w-7 h-7" />
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white">AI Analyzer</h1>
          </div>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl font-medium leading-relaxed">
            Paste the legal agreement below and let Gemini Pro find the hidden risks. No data is stored or logged.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-black rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden"
          >
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-905 bg-slate-50/50 dark:bg-slate-900 flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300 font-bold">
                <FileText className="w-6 h-6 text-brand-600" />
                <span className="text-lg">Terms & Conditions Input</span>
              </div>
              <button 
                onClick={() => { setText(''); setResult(null); }}
                className="p-3 bg-white dark:bg-black text-slate-400 dark:text-slate-600 hover:text-rose-500 transition-colors rounded-2xl border border-slate-100 dark:border-slate-800"
                title="Clear All"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 md:p-12">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the Terms and Conditions text here... (Ctrl+V)"
                className="w-full h-80 p-8 bg-slate-50 dark:bg-black rounded-3xl border-none focus:ring-4 focus:ring-brand-500/10 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 resize-none transition-all outline-none text-lg font-medium shadow-inner"
              />
              <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="text-sm font-black tracking-widest text-slate-400 uppercase">
                  {text.length > 0 ? (
                    <span className="px-4 py-2 bg-slate-100 dark:bg-slate-800/80 rounded-full flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                      {text.split(/\s+/).filter(Boolean).length} Words Detected
                    </span>
                  ) : "Waiting for text..."}
                </div>
                <button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !text.trim()}
                  className={cn(
                    "w-full md:w-auto px-12 py-6 rounded-3xl font-black text-lg flex items-center justify-center gap-4 transition-all active:scale-95 shadow-2xl disabled:opacity-50",
                    isAnalyzing || !text.trim() 
                      ? "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed" 
                      : "bg-brand-600 text-white hover:bg-brand-700 shadow-brand-500/40"
                  )}
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-6 h-6 animate-spin" />
                      Scanning Terms Line-by-Line...
                    </>
                  ) : (
                    <>
                      Start Analysis
                      <Zap className="w-6 h-6 fill-current" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mt-8 p-8 bg-rose-50 dark:bg-rose-950 border border-rose-100 dark:border-rose-900 rounded-[2rem] text-rose-600 dark:text-rose-400 flex items-center gap-6 shadow-xl"
            >
              <div className="p-4 bg-white dark:bg-rose-900/50 rounded-2xl">
                <AlertTriangle className="w-8 h-8" />
              </div>
              <div>
                <p className="text-xl font-black mb-1">Analysis Blocked</p>
                <p className="text-sm font-medium">{error}</p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Analysis Results Display */}
        <AnimatePresence>
          {result && (
            <motion.div 
              ref={resultsRef}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-32 space-y-16"
            >
              <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-6xl font-display font-black text-slate-900 dark:text-white mb-4 tracking-tighter">Analysis Complete</h2>
                 <p className="text-xl text-slate-500 dark:text-slate-400 font-medium tracking-tight">Scroll down to explore the findings.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Score Card */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="bg-white dark:bg-black p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl flex flex-col items-center justify-center text-center relative overflow-hidden"
                >
                  <div className="relative w-44 h-44 mb-10">
                    <svg className="w-full h-full transform -rotate-90 filter drop-shadow-lg">
                      <circle
                        cx="88" cy="88" r="80"
                        stroke="currentColor" strokeWidth="16" fill="transparent"
                        className="text-slate-50 dark:text-slate-800"
                      />
                      <motion.circle
                        cx="88" cy="88" r="80"
                        stroke="currentColor" strokeWidth="16" fill="transparent"
                        strokeDasharray={502.6}
                        initial={{ strokeDashoffset: 502.6 }}
                        whileInView={{ strokeDashoffset: 502.6 - (502.6 * result.safetyScore) / 100 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "circOut" }}
                        className={getScoreColor(result.safetyScore)}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className={cn("text-5xl font-black tracking-tighter", getScoreColor(result.safetyScore))}>
                        {result.safetyScore}%
                      </span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 uppercase tracking-widest text-xs">Trust Rating</h3>
                  <p className="text-sm font-bold text-slate-400 uppercase">Calculated Risk Index</p>
                </motion.div>

                {/* AI Executive Summary */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="md:col-span-2 bg-white dark:bg-black p-12 rounded-[3.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-brand-50 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 rounded-2xl">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Gemini Summary</h3>
                  </div>
                  <p className="text-slate-700 dark:text-slate-200 leading-relaxed text-2xl font-medium tracking-tight italic">
                    "{result.summary}"
                  </p>
                  <div className="mt-12 grid grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-50 dark:bg-black rounded-[2.5rem] border border-slate-100 dark:border-slate-800 group hover:border-rose-500 transition-colors">
                      <div className="text-xs font-black text-slate-400 uppercase mb-3 tracking-widest">Risks Found</div>
                      <div className="text-5xl font-black text-rose-500 flex items-center gap-3">
                         {result.redFlags.length}
                         <AlertTriangle className="w-8 h-8 opacity-50" />
                      </div>
                    </div>
                    <div className="p-8 bg-slate-50 dark:bg-black rounded-[2.5rem] border border-slate-100 dark:border-slate-800 group hover:border-brand-500 transition-colors">
                      <div className="text-xs font-black text-slate-400 uppercase mb-3 tracking-widest">Key Insights</div>
                      <div className="text-5xl font-black text-brand-600 dark:text-brand-400 flex items-center gap-3">
                        {result.highlights.length}
                        <CheckCircle2 className="w-8 h-8 opacity-50" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Graphical Charts Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <CategoryChart result={result} />
                <SeverityMetrics result={result} />
              </div>

              {/* T&C Chat Assistant Section */}
              <ChatAssistant termsText={text} />

              {/* Red Flags - Full Width */}
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-rose-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-500/20">
                    <AlertTriangle className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Critical Vulnerabilities</h3>
                </div>
                <motion.div 
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  variants={{
                    hidden: { opacity: 0 },
                    show: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.15
                      }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {result.redFlags.map((flag, idx) => (
                    <motion.div 
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, scale: 0.9, y: 20 },
                        show: { opacity: 1, scale: 1, y: 0 }
                      }}
                      whileHover={{ scale: 1.02, x: 10, transition: { duration: 0.2 } }}
                      className="bg-white dark:bg-black p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl border-l-[1rem] border-l-rose-500 transition-colors text-left"
                    >
                       <div className="flex justify-between items-center mb-6">
                          <span className="px-4 py-2 bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 font-black uppercase text-xs rounded-xl tracking-widest">{flag.category}</span>
                          <span className="text-[10px] font-black px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-400 uppercase rounded-full tracking-widest">{flag.severity} RISK</span>
                       </div>
                       <p className="text-slate-800 dark:text-slate-200 font-bold text-xl leading-snug tracking-tight">{flag.point}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Highlights - Full Width */}
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">Essential Takeaways</h3>
                </div>
                <motion.div 
                   initial="hidden"
                   whileInView="show"
                   viewport={{ once: true }}
                   variants={{
                     hidden: { opacity: 0 },
                     show: {
                       opacity: 1,
                       transition: {
                         staggerChildren: 0.15
                       }
                     }
                   }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
                >
                  {result.highlights.map((h, idx) => (
                    <motion.div 
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, scale: 0.9, y: 20 },
                        show: { opacity: 1, scale: 1, y: 0 }
                      }}
                      whileHover={{ scale: 1.02, x: -10, transition: { duration: 0.2 } }}
                      className="bg-white dark:bg-black p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl border-l-[1rem] border-l-emerald-500 transition-colors text-left"
                    >
                       <span className="px-4 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 font-black uppercase text-xs rounded-xl tracking-widest inline-block mb-6">{h.category}</span>
                       <p className="text-slate-700 dark:text-slate-300 font-bold text-lg leading-relaxed">{h.content}</p>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
