

import React from 'react';

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 px-4 max-w-7xl mx-auto z-10 relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Validated by Engineers and Recruiters</h2>
        <p className="mt-4 text-gray-400">See how users are transforming their technical application pipelines.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl relative">
          <p className="text-gray-300 italic text-base leading-relaxed mb-6">
            "We optimized our engineering pipeline dramatically. Sorting dozens of technical candidate resumes matching vector similarity scores directly cut screening hours down by 75%."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500" />
            <div className="text-left">
              <h4 className="font-bold text-sm text-white">Sarah Jenkins</h4>
              <p className="text-xs text-gray-500">Talent Acquisition Lead, CloudScale</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900/30 border border-slate-800 p-8 rounded-2xl relative">
          <p className="text-gray-300 italic text-base leading-relaxed mb-6">
            "I applied for multiple full-stack positions with constant automatic rejections. Running my resume through the hybrid engine highlighted missing key framework terms. Two weeks later, I locked in 3 interviews."
          </p>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500" />
            <div className="text-left">
              <h4 className="font-bold text-sm text-white">Alex Rivera</h4>
              <p className="text-xs text-gray-500">Full-Stack Software Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}