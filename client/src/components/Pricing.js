
import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-slate-950 border-t border-slate-900 z-10 relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Predictable Plans for Everyone</h2>
          <p className="mt-4 text-gray-400">Scale your outreach metrics with simple, transparent monthly models.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-8">
          <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl flex flex-col justify-between relative hover:border-purple-500/30 transition-all duration-300 text-left">
            <div>
              <h3 className="text-xl font-bold text-white">Job Seeker</h3>
              <p className="text-sm text-gray-400 mt-2">Perfect for single applicants looking to optimize profiles.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$0</span>
                <span className="text-gray-500 text-sm">/ forever free</span>
              </div>
              <ul className="mt-8 space-y-4 text-sm text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" /> 5 AI Resume Scans / Mo</li>
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" /> Missing Keyword Identification</li>
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" /> Structural JSON Schema Export</li>
              </ul>
            </div>
            <button className="w-full mt-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors">
              Get Started Free
            </button>
          </div>

          <div className="bg-slate-900/60 border-2 border-purple-600 p-8 rounded-2xl flex flex-col justify-between relative shadow-xl shadow-purple-950/10 text-left">
            <div className="absolute top-0 right-6 -translate-y-1/2 px-3 py-1 rounded-full bg-purple-600 text-white text-xs font-semibold uppercase tracking-wider">
              Enterprise Sourcing
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Talent Specialist</h3>
              <p className="text-sm text-gray-400 mt-2">Built for high-volume recruitment match leaderboards.</p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">$49</span>
                <span className="text-gray-500 text-sm">/ month</span>
              </div>
              <ul className="mt-8 space-y-4 text-sm text-gray-300">
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" /> Unlimited Bulk Multi-File Uploads</li>
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" /> Custom Target Job Leaderboards</li>
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" /> Advanced Layout-Aware Parser Access</li>
                <li className="flex items-center gap-3"><CheckCircle className="h-4 w-4 text-purple-400 flex-shrink-0" /> Dedicated API Token Integration</li>
              </ul>
            </div>
            <button className="w-full mt-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold rounded-xl shadow-md transition-all duration-200">
              Upgrade to Recruiter
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}