

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-800 py-4 text-left">
      <button 
        className="flex w-full items-center justify-between text-left text-lg font-medium text-gray-200 hover:text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <ChevronDown className={`h-5 w-5 text-purple-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <motion.div 
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden text-gray-400 mt-2 text-sm leading-relaxed"
      >
        {answer}
      </motion.div>
    </div>
  );
};

export default function FAQ() {
  return (
    <section id="faq" className="py-20 px-4 max-w-4xl mx-auto z-10 relative">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Frequently Asked Queries</h2>
        <p className="mt-3 text-gray-400">Everything you need to understand regarding parsing architecture capabilities.</p>
      </div>

      <div className="bg-slate-900/20 border border-slate-900 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
        <FAQItem 
          question="How does hybrid AI matching outperform simple keyword analysis?" 
          answer="Standard Applicant Tracking Systems look for exact text filters, often passing over ideal profiles using synonyms. Our hybrid approach maps exact keyword strings for standard filters while compiling vector space embeddings with Gemini to gauge overall contextual mastery." 
        />
        <FAQItem 
          question="Will multi-column or formatted PDF structures scramble the results?" 
          answer="No. The platform utilizes layout-aware text configuration rules via backend parsers that map textual positions coordinate-by-coordinate before structuring raw text blocks into schema models." 
        />
        <FAQItem 
          question="Is data handled securely during vector generation?" 
          answer="Completely. All documents uploaded to your user workspace or processed through corporate recruiter dashboards are isolated within SSL pipelines and stored via secure cloud storage targets with dynamic reference identifiers." 
        />
      </div>
    </section>
  );
}