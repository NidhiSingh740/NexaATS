import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-900/60 pt-16 pb-8 overflow-hidden text-left text-slate-400">
      
    
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />
      <div className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute -top-40 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-slate-900">
          
         
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
            
              <svg className="w-6 h-6 text-purple-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                <line x1="6" y1="6" x2="6.01" y2="6" />
                <line x1="6" y1="18" x2="6.01" y2="18" />
              </svg>
              <span className="text-sm font-black tracking-widest text-white uppercase font-mono">
                NEXA<span className="text-purple-400">ATS</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              High-speed multi-file talent matching analytics loop. Engineered for optimization rendering with zero package overhead footprints.
            </p>
          </div>

       
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">System Directory</h4>
            <ul className="space-y-2 text-xs font-semibold">
              <li><Link to="/dashboard" className="hover:text-purple-400 transition-colors">Analyzer Panel</Link></li>
              <li><Link to="/history" className="hover:text-purple-400 transition-colors">History Registry</Link></li>
              <li><Link to="/recruiter" className="hover:text-purple-400 transition-colors">Recruiter Pipeline</Link></li>
            </ul>
          </div>

         
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">Core Stack Specs</h4>
            <ul className="space-y-2 text-xs font-mono text-slate-500">
              <li className="flex items-center gap-2">⏱️ Groq LPU Inference</li>
              <li className="flex items-center gap-2">🧠 Llama-3.3-70b</li>
              <li className="flex items-center gap-2">🍃 MongoDB Server Atlas</li>
            </ul>
          </div>

          
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-mono">Node Status console</h4>
            <div className="p-4 bg-slate-900/40 border border-slate-800/60 rounded-2xl backdrop-blur-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                <span className="text-[10px] font-mono font-black text-emerald-400 uppercase tracking-widest">Pipeline Operational</span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono leading-normal">
                Sub-second file data thread compilation index: 100% green.
              </p>
            </div>
          </div>

        </div>

      
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-mono font-bold text-slate-600">
          <div>
            &copy; {new Date().getFullYear()} NEXAATS PLATFORM CORE. INTERNAL BUILD DEV-V1.0.
          </div>
          <div className="flex items-center gap-6 uppercase tracking-wider">
            <a href="#" className="hover:text-slate-400 transition-all">Privacy</a>
            <a href="#" className="hover:text-slate-400 transition-all">API Specs</a>
            <a href="#" className="hover:text-slate-400 transition-all">Security Shell</a>
          </div>
        </div>

      </div>
    </footer>
  );
}