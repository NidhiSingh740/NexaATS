

import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Files, UploadCloud, CheckCircle, ShieldAlert, Trophy, Filter, UserCheck, Loader2 } from 'lucide-react';
import axios from 'axios';

export default function RecruiterHub() {
  const [files, setFiles] = useState([]);
  const [jobDescription, setJobDescription] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [scoreThreshold, setScoreThreshold] = useState(70);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    onDrop: (acceptedFiles) => {
      setErrorMessage('');
      setFiles((prev) => [...prev, ...acceptedFiles]);
    }
  });

  const handleClearQueue = () => {
    setFiles([]);
    setCandidates([]);
    setErrorMessage('');
  };

  const handleBatchAnalysisSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (files.length === 0) {
      setErrorMessage('Please upload a batch of resumes to rank.');
      return;
    }
    if (!jobDescription.trim()) {
      setErrorMessage('Please provide a criteria job description to rank against.');
      return;
    }

    setIsProcessing(true);
    const formData = new FormData();
    files.forEach((file) => formData.append('resumes', file));
    formData.append('jobDescription', jobDescription);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/recruiter/batch-rank', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setCandidates(response.data.data);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(err.response?.data?.message || 'Batch ranking pipeline thread collapsed.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Filter and sort calculated candidate parameters live dynamically on screen
  const filteredCandidates = candidates
    .filter(c => c.score >= scoreThreshold)
    .sort((a, b) => b.score - a.score);

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen text-slate-100 space-y-8 pb-20 text-left">
      
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          <Files className="w-8 h-8 text-purple-400" /> Recruiter Batch-Ranking Hub
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Drop hundreds of profiles in parallel to instantly evaluate and rank matching candidates via Groq LPUs.
        </p>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400">
          ⚠️ {errorMessage}
        </div>
      )}

      {!isProcessing ? (
        <form onSubmit={handleBatchAnalysisSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* DRAG-AND-DROP PANEL */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 1: Upload Candidate Profiles Stack</label>
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-3xl p-8 text-center transition-all min-h-[220px] flex flex-col items-center justify-center cursor-pointer bg-slate-950/40 backdrop-blur-sm ${
                isDragActive ? 'border-purple-500 bg-purple-500/5' : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <input {...getInputProps()} />
              <UploadCloud className="w-10 h-10 text-purple-400 mb-3 animate-pulse" />
              <p className="text-xs font-bold text-slate-200">Drag & Drop Batch Resumes Array</p>
              <p className="text-[10px] text-slate-500 mt-1">Accepts multiple .PDF / .DOCX documents simultaneously</p>
            </div>

            {/* Uploaded File Queue Metadata Previewers */}
            {files.length > 0 && (
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl max-h-48 overflow-y-auto space-y-2">
                <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-2">
                  <span className="text-[10px] font-black uppercase text-purple-400">Queue List ({files.length} loaded)</span>
                  <button type="button" onClick={handleClearQueue} className="text-[10px] font-bold text-slate-500 hover:text-red-400 uppercase">Reset Files</button>
                </div>
                {files.map((f, index) => (
                  <div key={index} className="flex items-center justify-between text-[11px] font-mono text-slate-400 truncate">
                    <span className="truncate max-w-xs">📄 {f.name}</span>
                    <span className="text-slate-600 text-[10px]">{(f.size / 1024).toFixed(0)} KB</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* CRITERIA CRITERIA SPECIFICATION BOARD */}
          <div className="flex flex-col space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 2: Define Ideal Target Role Credentials</label>
            <div className="bg-slate-950/40 border border-slate-800/80 p-5 rounded-3xl flex-grow flex flex-col justify-between">
              <textarea
                required
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the corporate description profile. The AI will cross-reference every uploaded resume file content directly against these rules..."
                className="w-full h-36 bg-slate-900/60 border border-slate-800 focus:border-purple-500 text-white p-4 rounded-xl text-xs focus:outline-none resize-none leading-relaxed"
              />
              <button 
                type="submit"
                className="w-full py-3.5 mt-4 bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all shadow-[0_0_30px_rgba(147,51,234,0.2)] cursor-pointer"
              >
                Compute & Rank Talent Pipeline
              </button>
            </div>
          </div>

        </form>
      ) : (
        /* BATCH PROCESSING PROGRESS LOADER MASK */
        <div className="max-w-md mx-auto py-16 text-center border border-slate-800/60 bg-slate-950/40 rounded-3xl p-8 space-y-4 shadow-2xl">
          <Loader2 className="w-10 h-10 text-purple-400 animate-spin mx-auto" />
          <h3 className="text-base font-black text-white">Mapping Multi-File Buffer Arrays</h3>
          <p className="text-xs font-mono text-purple-400">Executing asynchronous Groq LPU API loops across {files.length} candidate files...</p>
          <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
            <div className="bg-purple-500 h-full animate-pulse w-2/3 mx-auto" />
          </div>
        </div>
      )}

      {/* RANKED TALENT LEADERBOARD SCREEN RESULT MATRICES */}
      {candidates.length > 0 && !isProcessing && (
        <div className="space-y-4 animate-fade-in">
          
          {/* Threshold Dynamic Slider Controller Block */}
          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-purple-400" />
              <div>
                <p className="text-xs font-bold text-white uppercase tracking-wider">Leaderboard Filter Threshold</p>
                <p className="text-[10px] text-slate-500">Excluding lower alignment index matching criteria logs</p>
              </div>
            </div>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <input 
                type="range" min="0" max="100" 
                value={scoreThreshold} 
                onChange={(e) => setScoreThreshold(Number(e.target.value))}
                className="w-full sm:w-44 accent-purple-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <span className="text-xs font-mono font-bold bg-purple-500/10 border border-purple-500/20 px-2 py-0.5 rounded text-purple-400">{scoreThreshold}%+ Match</span>
            </div>
          </div>

          {/* THE RANKS SCOREBOARD DATA TABLE DISPLAY */}
          <div className="bg-slate-950/40 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 bg-slate-950/60 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-6 text-center">Rank</th>
                  <th className="py-4 px-6">Candidate Profile Meta</th>
                  <th className="py-4 px-6">Identified Technical Skills Matrix</th>
                  <th className="py-4 px-6 text-center">Compatibility Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-xs">
                {filteredCandidates.map((cand, index) => (
                  <tr key={index} className="hover:bg-slate-900/20 transition-colors">
                    
                    {/* LEADERBOARD ICON MEDALS POSITION */}
                    <td className="py-4 px-6 text-center font-bold">
                      {index === 0 ? <span className="text-lg">🥇</span> : index === 1 ? <span className="text-lg">🥈</span> : index === 2 ? <span className="text-lg">🥉</span> : <span className="text-slate-500 font-mono">#{index + 1}</span>}
                    </td>

                    {/* NAME AND EMAIL METADATA */}
                    <td className="py-4 px-6 font-medium">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-purple-400 font-bold">
                          {cand.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-white">{cand.name}</p>
                          <p className="text-[10px] text-slate-500 font-mono">{cand.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* IDENTIFIED SKILLS PILLS CLOUD */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 flex-wrap max-w-sm">
                        {cand.skills.map((s, idx) => (
                          <span key={idx} className="text-[10px] bg-slate-900 text-slate-300 border border-slate-800 px-2 py-0.5 rounded-md font-medium">
                            {s}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* FINAL ALIGNMENT SCORE BADGE */}
                    <td className="py-4 px-6 text-center">
                      <span className={`px-2.5 py-1 rounded-lg border font-mono font-bold text-xs ${
                        cand.score >= 80 ? 'text-emerald-400 bg-emerald-500/5 border-emerald-500/10' : 'text-purple-400 bg-purple-500/5 border-purple-500/10'
                      }`}>
                        {cand.score}%
                      </span>
                    </td>

                  </tr>
                ))}

                {filteredCandidates.length === 0 && (
                  <tr>
                    <td colSpan="4" className="py-12 text-center font-mono text-xs text-slate-500">
                      No candidate profile matches the current filtered boundary thresholds.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}