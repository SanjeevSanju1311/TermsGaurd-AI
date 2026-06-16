import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsOfUse() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <Link to="/" className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold mb-8 hover:opacity-80 transition-opacity">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      <h1 className="text-4xl font-display font-bold mb-8">Terms of Use</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
        <p>Last updated: June 2026</p>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">1. Acceptance of Terms</h2>
        <p>
          By accessing or using the TermsGuard AI service, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree with any part of these terms, you may not use our services.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">2. Description of Service</h2>
        <p>
          TermsGuard AI provides tools and an AI-driven platform to analyze, summarize, and highlight potential issues in terms and conditions or privacy policies provided by third parties. We do not provide legal advice. Our service is meant for informational purposes only.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">3. User Responsibilities</h2>
        <p>
          You are responsible for your use of the service and for any consequences thereof. You may use the service only in compliance with these Terms and all applicable local, state, national, and international laws, rules, and regulations.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>You must not use the service for any illegal or unauthorized purpose.</li>
          <li>You must not attempt to hack, destabilize, or adapt TermsGuard AI.</li>
          <li>You are responsible for keeping your account password secure.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">4. Limitation of Liability</h2>
        <p>
          TermsGuard AI is an automated AI tool. It might make mistakes, hallucinate, or overlook important legal clauses. In no event shall TermsGuard AI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">5. Contact Us</h2>
        <p>
          If you have any questions about these Terms, please contact us at:
        </p>
        <p>
          <a href="mailto:k.sanjeevsanju2005@gmail.com" className="text-brand-600 dark:text-brand-400 hover:underline">
            k.sanjeevsanju2005@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
