import Head from 'next/head';
import FileUpload from '../components/FileUpload';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-slate-100 selection:bg-indigo-500/30 overflow-hidden relative flex flex-col items-center justify-center">
      <Head>
        <title>Sales Insight Automator</title>
        <meta name="description" content="Generate AI-powered executive summaries from your sales datasets seamlessly." />
      </Head>

      {/* Dynamic Animated Background Mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] rounded-full bg-indigo-600/20 blur-[120px] mix-blend-screen animate-[spin_20s_linear_infinite]" />
        <div className="absolute top-[20%] -right-[20%] w-[60vw] h-[60vw] rounded-full bg-fuchsia-600/20 blur-[120px] mix-blend-screen animate-[spin_25s_linear_infinite_reverse]" />
        <div className="absolute -bottom-[20%] left-[20%] w-[80vw] h-[80vw] rounded-full bg-blue-600/20 blur-[120px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <main className="relative z-10 w-full max-w-5xl mx-auto px-6 py-12 flex flex-col items-center min-h-screen justify-center">

        {/* Header Section */}
        <div className="text-center mb-16 max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-8 text-xs font-bold tracking-widest text-indigo-300 uppercase bg-indigo-500/10 rounded-full border border-indigo-500/20 shadow-[0_0_15px_rgba(99,102,241,0.2)] backdrop-blur-md">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Next-Gen AI Analysis
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-white via-indigo-100 to-indigo-400 drop-shadow-sm leading-tight pb-2">
            Sales Insight Automator
          </h1>
          <p className="text-lg md:text-2xl text-slate-300 leading-relaxed font-light max-w-2xl mx-auto">
            Upload your raw sales data and let AI instantly craft a <span className="font-medium text-white">comprehensive executive report</span> delivered to your inbox.
          </p>
        </div>

        {/* Central Component Area */}
        <div className="w-full animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300 fill-mode-both relative group">
          {/* Subtle glow behind the card */}
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <FileUpload />
        </div>

        {/* Footer */}
        <div className="mt-20 text-center flex items-center justify-center space-x-2 text-sm text-slate-400/80 font-medium animate-in fade-in duration-1000 delay-500 fill-mode-both">
          <span>Secure, Fast, & Automated</span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Powered by Google Gemini</span>
        </div>

      </main>
    </div>
  );
}
