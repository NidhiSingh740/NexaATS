

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export default function AiAnimation() {
  return (
    <section className="px-4 max-w-5xl mx-auto pb-24 z-10 relative">
      <motion.div 
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative bg-slate-900/50 border border-slate-800 rounded-2xl p-6 md:p-10 backdrop-blur-xl shadow-2xl shadow-purple-950/20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
        
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_15px_#a855f7] z-20 pointer-events-none"
        />

        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="text-xs text-gray-500 font-mono ml-auto">resume_parser.js</span>
            </div>
            <div className="bg-slate-950 rounded-xl p-5 border border-slate-800/80 font-mono text-xs md:text-sm text-gray-400 space-y-3 shadow-inner">
              <p className="text-purple-400">{"{"}</p>
              <p className="pl-4"><span className="text-indigo-400">"candidate"</span>: "Nidhi Singh",</p>
              <p className="pl-4"><span className="text-indigo-400">"skills"</span>: ["React.js", "Node.js", "TailwindCSS"],</p>
              <p className="pl-4"><span className="text-indigo-400">"embedding_match"</span>: <span className="text-green-400">0.9482</span>,</p>
              <p className="pl-4"><span className="text-indigo-400">"missing_keywords"</span>: ["Redis", "CI/CD Pipeline"],</p>
              <p className="text-purple-400">{"}"}</p>
            </div>
          </div>

          <div className="space-y-6 text-left">
            <div>
              <h3 className="text-xl font-bold mb-1 flex items-center gap-2 text-white">
                <Sparkles className="h-5 w-5 text-purple-400" /> Real-time Vector Parsing
              </h3>
              <p className="text-sm text-gray-400">AI matching system parsing content in milliseconds.</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-300">Semantic Relevance Score</span>
                  <span className="text-purple-400">94%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '94%' }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="text-gray-300">Keyword Optimization Threshold</span>
                  <span className="text-pink-400">82%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '82%' }} transition={{ duration: 1, delay: 0.7 }} className="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}