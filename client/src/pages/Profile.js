

import React, { useState, useEffect } from 'react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('identity');
  const [userMeta, setUserMeta] = useState({ name: 'User', email: 'user@example.com', role: 'candidate' });
  const [successMessage, setSuccessMessage] = useState('');
  

  const [preferences, setPreferences] = useState({
    aiModel: 'llama-3.3-70b-versatile',
    strictnessMode: 'Balanced',
    emailAlerts: true,
    twoFactor: false
  });

  
  const [savedResumes, setSavedResumes] = useState([
    { id: 1, filename: "Nidhi_Singh_FullStack_2026.pdf", date: "May 30, 2026", size: "124 KB", score: 89 },
    { id: 2, filename: "Nidhi_Singh_Frontend_Intern.pdf", date: "May 28, 2026", size: "118 KB", score: 74 }
  ]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserMeta(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user session context profile", e);
      }
    }
  }, []);

  const handlePreferencesToggle = (key) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
    triggerSuccessBanner('Engine optimization parameters synced successfully.');
  };

  const handleDeleteResume = (id) => {
    setSavedResumes(prev => prev.filter(res => res.id !== id));
    triggerSuccessBanner('Document cleared from cloud registry storage clusters.');
  };

  const triggerSuccessBanner = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen text-slate-100 space-y-8 pb-20 text-left">
      
      {/* HEADER CONTROLS META */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
          {/* Native Inline SVG User Crown Hex Vector */}
          <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          Account Configuration Meta
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage token access criteria, historical document repositories, and pipeline optimization rules.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400 animate-fade-in">
          ✓ {successMessage}
        </div>
      )}

      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
       
        <div className="flex flex-row lg:flex-col bg-slate-950/40 border border-slate-800/80 p-2 rounded-2xl overflow-x-auto lg:overflow-x-visible gap-1 shrink-0 whitespace-nowrap">
          <button
            onClick={() => setActiveTab('identity')}
            className={`w-full text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'identity' ? 'bg-purple-600 text-white font-black' : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            Identity Profile
          </button>
          <button
            onClick={() => setActiveTab('resumes')}
            className={`w-full text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'resumes' ? 'bg-purple-600 text-white font-black' : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            Saved Resumes ({savedResumes.length})
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`w-full text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-xl transition-all cursor-pointer flex items-center gap-2.5 ${
              activeTab === 'preferences' ? 'bg-purple-600 text-white font-black' : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
            }`}
          >
            Preferences Engine
          </button>
        </div>

        
        <div className="lg:col-span-3 bg-slate-950/20 border border-slate-800/60 rounded-3xl p-6 min-h-[380px] backdrop-blur-md relative overflow-hidden">
          
         
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-600/5 blur-[80px] rounded-full pointer-events-none" />

         
          {activeTab === 'identity' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-900 pb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 font-mono">User Details Matrix</h3>
                <p className="text-xs text-slate-500 mt-0.5">Core account ownership encryption references.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Account Identity Name</label>
                  <div className="w-full bg-slate-900/60 border border-slate-800 px-4 py-3 rounded-xl text-xs font-bold text-slate-200 select-none">
                    {userMeta.name}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Registered Email Address</label>
                  <div className="w-full bg-slate-900/60 border border-slate-800 px-4 py-3 rounded-xl text-xs font-mono text-slate-400 select-none">
                    {userMeta.email}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">System Permission Tier</label>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold bg-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-xl text-purple-400 uppercase">
                      👑 {userMeta.role} Engine Access
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          
          {activeTab === 'resumes' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-900 pb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 font-mono">Document Repository Storage</h3>
                <p className="text-xs text-slate-500 mt-0.5">Manage and view previously parsed resume payloads.</p>
              </div>

              {savedResumes.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-slate-600">
                  Cloud storage registry indexes empty.
                </div>
              ) : (
                <div className="space-y-3">
                  {savedResumes.map((res) => (
                    <div key={res.id} className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-slate-700/80 transition-all">
                      <div className="flex items-center gap-3 truncate">
                        <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center font-bold text-xs text-purple-400 shrink-0">
                          PDF
                        </div>
                        <div className="truncate">
                          <p className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md">{res.filename}</p>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">Uploaded: {res.date} • {res.size}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                        <div className="text-right">
                          <span className="text-xs font-mono font-black text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded">
                            {res.score}% Match
                          </span>
                        </div>
                        <button
                          onClick={() => handleDeleteResume(res.id)}
                          className="p-2 bg-slate-950 border border-slate-800/80 hover:border-red-500/20 text-slate-500 hover:text-red-400 rounded-xl transition-all cursor-pointer"
                          title="Purge Document"
                        >
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          
          {activeTab === 'preferences' && (
            <div className="space-y-6 animate-fade-in">
              <div className="border-b border-slate-900 pb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 font-mono">Platform Preference Vectors</h3>
                <p className="text-xs text-slate-500 mt-0.5">Fine-tune background execution variables and model triggers.</p>
              </div>

              <div className="space-y-5">
            
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 p-4 bg-slate-900/20 border border-slate-800/60 rounded-2xl">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Primary Core LLM Router</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Target brain used to run parsing vectors across evaluation sheets.</p>
                  </div>
                  <select 
                    value={preferences.aiModel}
                    onChange={(e) => {
                      setPreferences(prev => ({ ...prev, aiModel: e.target.value }));
                      triggerSuccessBanner('AI computational layout rerouted smoothly.');
                    }}
                    className="bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono font-bold p-2 rounded-xl focus:outline-none focus:border-purple-500"
                  >
                    <option value="llama-3.3-70b-versatile">Llama 3.3 (70B) [Default]</option>
                    <option value="mixtral-8x7b-32768">Mixtral 8x7b Cluster</option>
                  </select>
                </div>

                {/* TOGGLE 1 */}
                <div className="flex items-center justify-between p-4 bg-slate-900/20 border border-slate-800/60 rounded-2xl">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Real-Time Email Log Sync</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Automate email backup dispatches when new evaluation pipelines save.</p>
                  </div>
                  <button
                    onClick={() => handlePreferencesToggle('emailAlerts')}
                    className={`w-11 h-6 rounded-full p-1 transition-all duration-300 cursor-pointer ${preferences.emailAlerts ? 'bg-purple-600' : 'bg-slate-800'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transition-all duration-300 transform ${preferences.emailAlerts ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>

                {/* TOGGLE 2 */}
                <div className="flex items-center justify-between p-4 bg-slate-900/20 border border-slate-800/60 rounded-2xl">
                  <div>
                    <h5 className="text-xs font-bold text-slate-200">Double-Shell Security Mode (2FA)</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Require multi-factor payload handshakes on administrative logins.</p>
                  </div>
                  <button
                    onClick={() => handlePreferencesToggle('twoFactor')}
                    className={`w-11 h-6 rounded-full p-1 transition-all duration-300 cursor-pointer ${preferences.twoFactor ? 'bg-purple-600' : 'bg-slate-800'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow-md transition-all duration-300 transform ${preferences.twoFactor ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}