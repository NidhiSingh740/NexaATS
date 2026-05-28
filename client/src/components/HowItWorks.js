
import React from 'react';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-slate-950 border-y border-slate-900 relative z-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">The Optimization Lifecycle</h2>
          <p className="mt-4 text-gray-400">Three distinct steps transforming standard profiles into high-scoring interview winners.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-lg font-bold text-purple-400 mx-auto shadow-md">1</div>
            <h3 className="text-xl font-semibold text-white">Drop & Extract</h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">Upload your document. Our system immediately map-parses files into structured JSON schemas.</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-lg font-bold text-pink-400 mx-auto shadow-md">2</div>
            <h3 className="text-xl font-semibold text-white">Dual-Stage Alignment</h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">Gemini analyzes semantic context alongside keyword frequency metrics targeting specific job descriptions.</p>
          </div>

          <div className="text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-lg font-bold text-indigo-400 mx-auto shadow-md">3</div>
            <h3 className="text-xl font-semibold text-white">Export & Elevate</h3>
            <p className="text-sm text-gray-400 max-w-xs mx-auto">Download tailored PDF adjustment briefs and dynamic leaderboard placements for recruiter review.</p>
          </div>
        </div>
      </div>
    </section>
  );
}