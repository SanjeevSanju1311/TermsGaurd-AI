import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Sun, 
  Moon,
  Globe,
  ExternalLink,
  Menu,
  X
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Layout({ children }) {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 font-sans selection:bg-brand-100 dark:selection:bg-brand-900 selection:text-brand-900 dark:selection:text-brand-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 transition-all shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-110 transition-transform">
              <Shield className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-display font-bold tracking-tight text-slate-900 dark:text-white">
              TermsGuard <span className="text-brand-600 dark:text-brand-400">AI</span>
            </span>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-600 dark:text-slate-400">
            <Link to="/#about" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">About</Link>
            <Link to="/#features" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">Features</Link>
            <Link to="/#how-it-works" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">How it Works</Link>
            <Link to="/#faq" className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors">FAQ</Link>
          </div>

          {/* Desktop Controls (hidden on mobile) */}
          <div className="hidden lg:flex items-center gap-4">
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link 
              to="/analyzer"
              className={cn(
                "px-6 py-2.5 rounded-full text-sm font-bold hover:scale-105 active:scale-95 transition-all shadow-md",
                location.pathname === '/analyzer' 
                  ? "bg-brand-600 text-white" 
                  : "bg-slate-900 dark:bg-white text-white dark:text-slate-950"
              )}
            >
              Analyzer
            </Link>
          </div>

          {/* Mobile Menu Trigger (hidden on desktop) */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="flex lg:hidden p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all border border-slate-200 dark:border-slate-800"
            aria-label="Open Mobile Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Side Menu Drawer for Mobile View */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Slide-in Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-[80vw] max-w-sm bg-white dark:bg-black border-l border-slate-200 dark:border-slate-800 shadow-2xl p-6 flex flex-col justify-between lg:hidden"
            >
              <div className="space-y-8">
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-900">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center">
                      <Shield className="text-white w-5 h-5" />
                    </div>
                    <span className="text-lg font-display font-bold text-slate-900 dark:text-white">
                      TermsGuard <span className="text-brand-600">AI</span>
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-900 text-slate-550 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-rose-500 transition-colors"
                    aria-label="Close Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Navigation Stack */}
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2 px-3 text-left">
                    Navigation
                  </span>
                  {[
                    { label: "About", href: "/#about" },
                    { label: "Features", href: "/#features" },
                    { label: "How it Works", href: "/#how-it-works" },
                    { label: "FAQ", href: "/#faq" }
                  ].map((link, idx) => (
                    <Link
                      key={idx}
                      to={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="px-3 py-3 rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-900 text-base font-bold text-slate-700 dark:text-slate-300 hover:text-brand-600 dark:hover:text-brand-400 transition-all text-left"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Bottom Drawer Actions (Theme & Analyzer) */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-900 space-y-4">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-zinc-950 rounded-2xl border border-slate-100 dark:border-slate-900">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white dark:bg-zinc-900 border border-slate-100 dark:border-slate-800 rounded-lg text-slate-600 dark:text-slate-400">
                      {isDarkMode ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {isDarkMode ? "Dark Theme" : "Light Theme"}
                    </span>
                  </div>
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className="p-2.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:scale-105 active:scale-95 transition-all border border-slate-300 dark:border-slate-700"
                    aria-label="Toggle Theme"
                  >
                    {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                  </button>
                </div>

                {/* Mobile Analyzer Button */}
                <Link
                  to="/analyzer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "w-full py-4 rounded-2xl font-black text-sm text-center flex items-center justify-center transition-all shadow-md active:scale-98",
                    location.pathname === '/analyzer'
                      ? "bg-brand-600 text-white shadow-brand-500/15"
                      : "bg-slate-950 hover:bg-slate-900 dark:bg-white text-white dark:text-slate-950"
                  )}
                >
                  Go to Analyzer
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="theme-transition">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-slate-50 dark:bg-black border-t border-slate-200 dark:border-slate-800 py-20 px-6 transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="col-span-1 md:col-span-12 lg:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-500 to-brand-700 rounded-2xl flex items-center justify-center shadow-lg shadow-brand-500/20">
                  <Shield className="text-white w-6 h-6" />
                </div>
                <span className="text-2xl font-display font-bold tracking-tight text-slate-900 dark:text-white">TermsGuard AI</span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm leading-relaxed text-base">
                Empowering users to navigate the digital world with confidence. No more hidden trapdoors in the fine print.
              </p>
            </div>
            
            <div className="col-span-1 md:col-span-6 lg:col-span-3 lg:col-start-7">
              <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Resources</h4>
              <ul className="space-y-4 text-slate-500 dark:text-slate-400 text-sm font-medium">
                <li><Link to="/privacy" className="group hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors group-hover:bg-brand-500"></span>Privacy Policy</Link></li>
                <li><Link to="/terms" className="group hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors group-hover:bg-brand-500"></span>Terms of Use</Link></li>
                <li><Link to="/api-docs" className="group hover:text-brand-600 dark:hover:text-brand-400 transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 transition-colors group-hover:bg-brand-500"></span>API Docs</Link></li>
              </ul>
            </div>
            
            <div className="col-span-1 md:col-span-6 lg:col-span-3">
              <h4 className="font-bold text-slate-900 dark:text-white mb-6 uppercase tracking-widest text-xs">Contact & Support</h4>
              <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 leading-relaxed">Have questions or need assistance? We're here to help.</p>
                <a 
                  href="mailto:k.sanjeevsanju2005@gmail.com" 
                  className="inline-flex items-center gap-2 text-sm font-bold text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors"
                >
                  k.sanjeevsanju2005@gmail.com
                </a>
              </div>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-slate-400 dark:text-slate-500 text-xs">
              © 2026 TermsGuard AI. All rights reserved. Built with Gemini AI.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
