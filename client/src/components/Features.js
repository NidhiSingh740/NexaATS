

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, BarChart3 } from 'lucide-react';

export default function Features() {
  const container = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } };
  const item = { hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section id="features" className="py-20 px-4 max-w-7xl mx-auto z-10 relative">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Engineered to Outperform Traditional ATS</h2>
        <p className="mt-4 text-gray-400">A bidirectional architecture designed to maximize profile conversion for candidates and sourcing speed for recruiters.</p>
      </div>

      <motion.div variants={container} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <motion.div variants={item} className="bg-slate-900/40 border border-slate-800/80 hover:border-purple-500/50 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 group">
          <div className="w-12 h-12 bg-purple-950/50 rounded-xl flex items-center justify-center border border-purple-800/50 text-purple-400 mb-6 group-hover:scale-110 transition-transform">
            <Layers className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-100">Hybrid AI Matching</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Combines vector semantic embeddings with algorithmic string filters to achieve exact corporate pipeline compatibility.</p>
        </motion.div>

        <motion.div variants={item} className="bg-slate-900/40 border border-slate-800/80 hover:border-pink-500/50 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 group">
          <div className="w-12 h-12 bg-pink-950/50 rounded-xl flex items-center justify-center border border-pink-800/50 text-pink-400 mb-6 group-hover:scale-110 transition-transform">
            <Zap className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-100">Layout-Aware Parser</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Multi-column and structured PDF/DOCX layouts are mapped perfectly without text jumbling or structural omissions.</p>
        </motion.div>

        <motion.div variants={item} className="bg-slate-900/40 border border-slate-800/80 hover:border-indigo-500/50 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 group">
          <div className="w-12 h-12 bg-indigo-950/50 rounded-xl flex items-center justify-center border border-indigo-800/50 text-indigo-400 mb-6 group-hover:scale-110 transition-transform">
            <BarChart3 className="h-6 w-6" />
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-100">Actionable Analytics</h3>
          <p className="text-gray-400 text-sm leading-relaxed">Receive clear visual metric charts detailing exactly where content changes, missing skills, or formatting patches are needed.</p>
        </motion.div>
      </motion.div>
    </section>
  );
}