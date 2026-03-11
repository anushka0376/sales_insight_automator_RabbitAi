import Head from 'next/head';
import FileUpload from '../components/FileUpload';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-neutral-950 font-sans text-slate-900 dark:text-slate-100 selection:bg-blue-500/30 overflow-hidden relative">
      <Head>
        <title>Sales Insight Automator</title>
        <meta name="description" content="Generate AI-powered executive summaries from your sales datasets seamlessly." />
      </Head>

      {/* Background Ornaments / Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/20 dark:bg-blue-500/10 blur-[120px] rounded-full point-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 dark:bg-purple-500/10 blur-[120px] rounded-full point-events-none" />

      <main className="relative z-10 container mx-auto px-4 py-24 flex flex-col items-center min-h-screen justify-center">

        {/* Header Section */}
        <div className="text-center mb-12 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-blue-600 uppercase bg-blue-100 rounded-full dark:bg-blue-900/30 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
            AI-Powered Analysis
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Sales Insight Automator
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-light">
            Upload your sales dataset and receive an AI-generated executive summary delivered straight to your inbox.
          </p>
        </div>

        {/* Central Component Area */}
        <div className="w-full animate-in fade-in zoom-in-95 duration-1000 delay-150 fill-mode-both">
          <FileUpload />
        </div>

        {/* Footer */}
        <div className="mt-16 text-center text-sm text-slate-400 dark:text-slate-500 font-medium">
          Secure, Fast, & Automated • Powered by Google Gemini
        </div>

      </main>
    </div>
  );
}
