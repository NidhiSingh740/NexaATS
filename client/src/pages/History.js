import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { History as HistoryIcon, Calendar, ArrowRight, Loader2, FileText } from 'lucide-react';
import axios from 'axios';

export default function History() {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchHistoryLogs = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('No session token found. Please log in again.');
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:5000/api/analysis/history', {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.data && response.data.success) {
          setLogs(response.data.data || []);
        } else {
          setError('Server responded with an unsuccessful status flag.');
        }
      } catch (err) {
        console.error("Frontend History Fetch Error Trace:", err);
        setError(err.response?.data?.message || 'Failed to populate history registry index panels.');
      } finally {
        setLoading(false);
      }
    };

    fetchHistoryLogs();
  }, []);

  const handleLoadHistoricReport = (record) => {
    localStorage.setItem('latestAnalysis', JSON.stringify(record));
    navigate('/analysis');
  };

  const getScoreBadgeColor = (score) => {
    if (score >= 80) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
    return 'text-red-400 bg-red-500/10 border-red-500/20';
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen text-slate-100 space-y-8">
      
      <div className="text-left">
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          <HistoryIcon className="w-8 h-8 text-purple-400" /> Historical Analysis Vault
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review and instantly reload any previously saved optimization records and keyword audits from MongoDB.
        </p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm font-semibold text-red-400 text-left">
          ⚠️ {error}
        </div>
      )}

      {loading ? (
        <div className="py-20 text-center space-y-4">
          <Loader2 className="w-10 h-10 text-purple-400 animate-spin mx-auto" />
          <p className="text-xs font-mono text-slate-500">Querying past pipeline records schemas securely...</p>
        </div>
      ) : logs.length === 0 ? (
        <div className="border border-slate-800/80 bg-slate-950/20 rounded-3xl p-16 text-center space-y-4 max-w-xl mx-auto mt-12">
          <div className="w-12 h-12 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center mx-auto text-slate-500">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-200">No Historic Evaluations Found</h3>
            <p className="text-xs text-slate-500 mt-1">You haven't processed any resume documents through the Groq pipeline engine yet.</p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
          >
            Run First Evaluation
          </button>
        </div>
      ) : (
        <div className="bg-slate-950/40 border border-slate-800/80 rounded-3xl overflow-hidden shadow-2xl text-left">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-900 bg-slate-950/60 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-4 px-6">Evaluation Timestamp</th>
                  <th className="py-4 px-6">Matched Target Keywords</th>
                  <th className="py-4 px-6">Missing Skills Gap</th>
                  <th className="py-4 px-6 text-center">Match Index</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900 text-xs">
                {logs.map((log) => (
                  <tr key={log._id} className="hover:bg-slate-900/30 transition-colors group">
                    <td className="py-4 px-6 font-medium whitespace-nowrap">
                      <div className="flex items-center gap-2.5 text-slate-200">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <div>
                          <p className="font-bold">{new Date(log.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5">{new Date(log.createdAt).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 flex-wrap max-w-[240px]">
                        {log.keywords?.matched?.slice(0, 3).map((kw, idx) => (
                          <span key={idx} className="text-[10px] font-semibold px-1.5 py-0.5 bg-emerald-500/5 text-emerald-400 border border-emerald-500/10 rounded">
                            {kw}
                          </span>
                        ))}
                        {log.keywords?.matched?.length > 3 && <span className="text-[9px] text-slate-600">+{log.keywords.matched.length - 3}</span>}
                      </div>
                    </td>

                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1.5 flex-wrap max-w-[240px]">
                        {log.keywords?.missing?.slice(0, 3).map((kw, idx) => (
                          <span key={idx} className="text-[10px] font-semibold px-1.5 py-0.5 bg-red-500/5 text-red-400 border border-red-500/10 rounded">
                            {kw}
                          </span>
                        ))}
                        {log.keywords?.missing?.length > 3 && <span className="text-[9px] text-slate-600">+{log.keywords.missing.length - 3}</span>}
                      </div>
                    </td>

                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-1 rounded-lg border text-xs font-mono font-bold ${getScoreBadgeColor(log.scores?.finalOverall)}`}>
                        {log.scores?.finalOverall}%
                      </span>
                    </td>

                    <td className="py-4 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => handleLoadHistoricReport(log)}
                        className="inline-flex items-center gap-1 text-purple-400 hover:text-purple-300 font-bold uppercase tracking-wider text-[11px] transition-colors cursor-pointer group-hover:translate-x-1 duration-200"
                      >
                        Inspect Report <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}