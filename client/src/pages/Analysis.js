import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowLeft, CheckCircle, AlertTriangle, ShieldCheck, Download, Sparkles } from 'lucide-react';

export default function Analysis() {
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const savedData = localStorage.getItem('latestAnalysis');
    if (!savedData) {
      alert("No active scan records extracted. Returning to core entry workspace.");
      navigate('/dashboard');
      return;
    }
    try {
      setReport(JSON.parse(savedData));
    } catch (e) {
      console.error(e);
      navigate('/dashboard');
    }
  }, [navigate]);

  if (!report) return null;

  // Transform model integer objects into Recharts layout array structures safely
  const chartData = [
    { name: 'ATS Match', Score: report.scores.atsCompatibility },
    { name: 'Skills Match', Score: report.scores.technicalSkills },
    { name: 'Experience Match', Score: report.scores.experienceRelevance },
    { name: 'Strength Match', Score: report.scores.resumeStrength }
  ];

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen text-slate-100 space-y-8 pb-20">
      
      {/* 1. VIEW ACTION ACTIONS BAR */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-900 pb-6 text-left">
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Upload Workspace
        </button>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            onClick={() => window.print()}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
        </div>
      </div>

      {/* 2. DUAL-COLUMN INSIGHTS HUB EXECUTIVE OVERVIEW SPLIT MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* RADIAL RADAR SCORE TRACKER GAUGES CARD PANEL */}
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-3xl p-6 text-center flex flex-col justify-center items-center space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall Compatibility</h3>
          <div className="relative w-40 h-40 flex items-center justify-center">
            {/* Native SVG Circular Track Rings */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" stroke="#1e293b" strokeWidth="8" fill="transparent" />
              <circle 
                cx="50" cy="50" r="40" 
                stroke="#a855f7" strokeWidth="8" fill="transparent" 
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * report.scores.finalOverall) / 100}
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-white">{report.scores.finalOverall}%</span>
              <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mt-0.5">Match Index</span>
            </div>
          </div>
          {/* Updated text badge to visually align with Groq infrastructure metrics output */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5" /> Checked via Groq Engine
          </div>
        </div>

        {/* RECHARTS COMPONENT METRICS HORIZONTAL GRAPH LAYOUT */}
        <div className="lg:col-span-2 bg-slate-950/40 border border-slate-800/80 rounded-3xl p-6 text-left">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-6">Component Criteria Breakdowns</h3>
          <div className="w-full h-44 text-xs font-mono">
            <ResponsiveContainer width="100%" height="100%">
              {/* 🌟 FIX: Altered layout structure assignment safely to "vertical" to resolve empty canvas view error */}
              <BarChart layout="vertical" data={chartData} margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <XAxis type="number" domain={[0, 100]} stroke="#475569" />
                <YAxis dataKey="name" type="category" stroke="#475569" width={110} />
                <Tooltip cursor={{ fill: '#1e293b', opacity: 0.4 }} contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', color: '#f8fafc', borderRadius: '12px' }} />
                <Bar dataKey="Score" fill="#a855f7" radius={[0, 8, 8, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

      {/* 3. RECRUITING MATRIX PILLS KEYWORD GAP DETECTION TRACKER */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        
        {/* MATCHED CAPABILITIES BADGES */}
        <div className="bg-slate-950/40 border border-slate-800/80 p-6 rounded-3xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Detected Alignment Keywords
          </h3>
          <div className="flex flex-wrap gap-2">
            {report.keywords.matched.map((kw, i) => (
              <span key={i} className="text-xs font-semibold px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* CRITICAL MISSING BLANK GAPS MATRIX */}
        <div className="bg-slate-950/40 border border-slate-800/80 p-6 rounded-3xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-red-400" /> Highlighted Gaps & Missing Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {report.keywords.missing.map((kw, i) => (
              <span key={i} className="text-xs font-semibold px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl">
                {kw}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* 4. EXECUTIVE REACTIONARY TIP ADVICE BULLETS LIST SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
        
        <div className="bg-slate-950/40 border border-slate-800/80 p-6 rounded-3xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Core Profile Strengths</h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {report.insights.strengths.map((str, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 shrink-0" /> {str}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-slate-950/40 border border-slate-800/80 p-6 rounded-3xl space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" /> Actionable AI Diagnostics Suggestions
          </h3>
          <ul className="space-y-2.5 text-xs text-slate-300">
            {report.insights.suggestions.map((sug, i) => (
              <li key={i} className="flex items-start gap-2.5 leading-relaxed">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 shrink-0" /> {sug}
              </li>
            ))}
          </ul>
        </div>

      </div>

    </div>
  );
}