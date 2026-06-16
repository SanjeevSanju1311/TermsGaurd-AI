import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function ApiDocs() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 min-h-screen">
      <Link to="/" className="inline-flex items-center gap-2 text-brand-600 dark:text-brand-400 font-semibold mb-8 hover:opacity-80 transition-opacity">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>
      <h1 className="text-4xl font-display font-bold mb-8">API Documentation</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 space-y-6">
        <p>
          Welcome to the TermsGuard AI API documentation. This API allows developers to integrate our AI-powered terms and conditions analysis engine directly into their own applications.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Base URL</h2>
        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl font-mono text-sm">
          https://api.termsguard.ai/v1
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Authentication</h2>
        <p>
          Authenticate your API requests by including your API key in the Authorization header.
        </p>
        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl font-mono text-sm">
          Authorization: Bearer YOUR_API_KEY
        </div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Endpoints</h2>
        
        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-2">1. Analyze Text</h3>
        <p className="font-mono text-sm mb-2"><span className="text-green-600 dark:text-green-400 font-bold">POST</span> /analyze/text</p>
        <p>
          Submit plain text for analysis. The API will return a risk score, summary, and highlight critical clauses.
        </p>
        <div className="bg-slate-100 dark:bg-slate-900 p-4 rounded-xl overflow-x-auto">
          <pre className="text-sm">
{`// Request Body
{
  "text": "By using our service you agree to give up your firstborn...",
  "type": "terms_of_service"
}

// Response
{
  "riskScore": 85,
  "summary": "High risk detected regarding user rights.",
  "clauses": [
    {
      "type": "critical",
      "text": "agree to give up your firstborn",
      "explanation": "This is an extremely invasive clause."
    }
  ]
}`}
          </pre>
        </div>

        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mt-8 mb-2">2. Analyze URL</h3>
        <p className="font-mono text-sm mb-2"><span className="text-green-600 dark:text-green-400 font-bold">POST</span> /analyze/url</p>
        <p>
          Submit a URL. We will fetch the page, extract the terms, and run the analysis.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">Support</h2>
        <p>
          Need help integrating? Have questions about your API quota? Contact us:
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
