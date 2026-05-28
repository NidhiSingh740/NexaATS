
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 px-4 max-w-7xl mx-auto text-center z-10">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-950/60 border border-purple-800/60 text-purple-300 text-xs md:text-sm font-medium mb-6 backdrop-blur-sm"
      >
        <Sparkles className="h-4 w-4 text-purple-400 animate-pulse" />
        Next-Gen AI Resume & ATS Optimization Platform
      </motion.div>

      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.15] text-white"
      >
        Land More Interviews With The <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400">Power of Hybrid AI</span>
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-6 text-gray-400 text-base md:text-xl max-w-3xl mx-auto leading-relaxed"
      >
        Bridge the gap between human talent and corporate algorithms. Optimize candidate profiles against semantic embeddings and strict keyword filters instantly.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
      >
        <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 rounded-xl font-semibold shadow-lg shadow-purple-900/30 flex items-center justify-center gap-2 group transition-all duration-200 text-white">
          Scan Your Resume Free 
          <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </button>
        <button className="w-full sm:w-auto px-8 py-4 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl font-semibold text-white transition-colors">
          Recruiter Demo
        </button>
      </motion.div>
    </section>
  );
}