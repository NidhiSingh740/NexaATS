import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-900/60 pt-16 pb-8 overflow-hidden text-left text-slate-400">
      
      {/* Premium Tech Grid Mesh + Glowing Cyber-Ambient Underlays */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-purple-600/5 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* PREMIUM PLUGINS & METRICS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-900">
          
          {/* COLUMN 1: PLATFORM BRANDING & MISSION STATEMENT */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <svg className="w-5 h-5 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
              <span className="text-xs font-black tracking-widest text-white uppercase font-mono">
                NEXA<span className="text-purple-400">ATS</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs">
              Next-generation AI resume parsing engine. Optimizing recruitment channels via sub-second semantic evaluation loops.
            </p>
          </div>

          {/* COLUMN 2: SAFE PUBLIC INFRASTRUCTURE MARKS */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Platform</h4>
            <ul className="space-y-2 text-xs font-medium">
              <li><Link to="/" className="hover:text-purple-400 transition-colors">Overview</Link></li>
              <li><Link to="/" className="hover:text-purple-400 transition-colors">Core Features</Link></li>
              <li><Link to="/" className="hover:text-purple-400 transition-colors">AI Benchmarks</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: DEPLOYED BACKEND STACK INFRASTRUCTURE */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Core Engine</h4>
            <ul className="space-y-2 text-xs font-mono text-slate-500">
              <li className="flex items-center gap-2">⚡ Groq LPU Inference</li>
              <li className="flex items-center gap-2">🧠 Llama 3.3 Architecture</li>
              <li className="flex items-center gap-2">🍃 Secure Distributed Database</li>
            </ul>
          </div>

          {/* COLUMN 4: SYSTEM RUNTIME PERFORMANCE STATUS */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 font-mono">Network Status</h4>
            <div className="p-4 bg-slate-900/30 border border-slate-800/50 rounded-2xl backdrop-blur-sm space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-wider">All Nodes Secure</span>
              </div>
              <p className="text-[10px] text-slate-600 font-mono leading-normal">
                Cloud cluster integration active and isolated.
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM METADATA LEGAL SECTION */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono font-bold text-slate-600">
          <div>
            &copy; {new Date().getFullYear()} NEXAATS ENGINE CORP. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6 uppercase tracking-wider">
            <Link to="/" className="hover:text-slate-400 transition-all">Privacy Policy</Link>
            <Link to="/" className="hover:text-slate-400 transition-all">Terms of Service</Link>
            <Link to="/" className="hover:text-slate-400 transition-all">Security Protocol</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}