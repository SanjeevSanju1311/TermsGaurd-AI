<div align="center">
  <img src="./public/logo-square.png" alt="TermsGuard AI Logo" width="120" height="120" />
  <h1>TermsGuard AI 🛡️</h1>
  <p><strong>Stop accepting blindly. Protect your data, identity, and privacy in seconds.</strong></p>
</div>

<br/>

TermsGuard AI is an intelligent legal document analyzer powered by **Google Gemini 1.5 Flash**. It reads through thousands of lines of convoluted "Terms & Conditions" or "Privacy Policies" in seconds, translating legal jargon into plain English and highlighting the exact traps you shouldn't fall for.

## ✨ Elite Features

- **Real-time Safety Rating**: Get an immediate Trust Score out of 100 based on our proprietary risk-assessment algorithms.
- **Malicious Clause Alerts**: Instantly spot clauses about data selling, hidden fees, binding arbitration, or unwanted service commitments.
- **Visual Risk Dashboards**: Understand vulnerabilities categorized beautifully by Privacy, Legal, Data Usage, and more.
- **Smart Summarizer**: Skip the 50-page reading. Get a 30-second AI executive summary of the most vital impact points.
- **Document Q&A Assistant**: Chat directly with your uploaded document. Ask specific questions like *"Can they sell my data?"* and get instant answers with references to the text.
- **Privacy First**: No data storage, no tracking. Your document analysis happens entirely in-memory and stays private.

## 🛠️ Tech Stack

- **Frontend**: React (Standard JavaScript), Vite, TailwindCSS
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **AI Engine**: `@google/genai` (Google Gemini Pro/Flash Models)
- **Routing**: React Router DOM

## 🚀 Getting Started

Follow these steps to run TermsGuard AI locally on your machine.

### Prerequisites

- Node.js (v18 or higher recommended)
- A Google Gemini API Key. You can get one for free at [Google AI Studio](https://aistudio.google.com/app/apikey).

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/SanjeevSanju1311/TermsGaurd-AI.git
   cd TermsGaurd-AI
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env` file in the root of the project and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Open the App:**
   Visit `http://localhost:3000` in your browser to start analyzing!

## 💡 How It Works

1. **Paste Contract**: Grab the terms and conditions text from any website or legal PDF and paste it into the analyzer.
2. **Instant Audit**: The Gemini engine scans the text to spot custom parameters, hidden vulnerabilities, and data leaks.
3. **Interactive Safety**: Get a clear rating card, category charts, key takeaways, and chat directly with the AI about the specific document.

## ⚖️ Disclaimer

*TermsGuard AI provides information and analysis based on machine learning. It is **not** legal advice and should not be treated as a substitute for a qualified lawyer's opinion.*

---

<div align="center">
  <p>Built by Sanjeev</p>
</div>
