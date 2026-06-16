import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <Link to="/" className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold mb-8 hover:opacity-80 transition-opacity">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      <h1 className="text-4xl font-display font-bold mb-8">Privacy Policy</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
        <p>Last updated: June 2026</p>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">1. Information We Collect</h2>
        <p>
          At TermsGuard AI, we take your privacy seriously. We collect minimal information necessary to provide you with our terms analysis services. This may include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Account information (if you create an account) such as your email address.</li>
          <li>Usage data regarding how you interact with our extension and web application.</li>
          <li>The text of terms and conditions you submit for analysis. This data is processed transiently and not stored permanently unless you explicitly save it to your account.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">2. How We Use Your Information</h2>
        <p>
          The information we collect is used in the following ways:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>To provide, operate, and maintain our AI analysis services.</li>
          <li>To improve, personalize, and expand our platform.</li>
          <li>To understand and analyze how you use our services.</li>
          <li>To communicate with you, either directly or through one of our partners, including for customer service and support.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">3. Data Security</h2>
        <p>
          We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">4. Sharing Your Information</h2>
        <p>
          We do not sell, trade, or rent your personal identification information to others. We may share generic aggregated demographic information not linked to any personal identification information regarding visitors and users with our business partners, trusted affiliates, and advertisers for the purposes outlined above.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">5. Contact Us</h2>
        <p>
          If you have questions or comments about this Privacy Policy, please contact us at:
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
