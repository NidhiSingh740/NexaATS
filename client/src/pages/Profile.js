import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('identity');
  const [userMeta, setUserMeta] = useState({ name: 'User', email: 'user@example.com', role: 'candidate' });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(true);

  // ✅ Swapped hardcoded values for a dynamic production database state wire-up
  const [savedResumes, setSavedResumes] = useState([]);
  const [preferences, setPreferences] = useState({
    aiModel: 'llama-3.3-70b-versatile',
    strictnessMode: 'Balanced',
    emailAlerts: true,
    twoFactor: false
  });

  const triggerSuccessBanner = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const triggerErrorBanner = (msg) => {
    setErrorMessage(msg);
    setTimeout(() => setErrorMessage(''), 4000);
  };

  // ✅ 1. DYNAMIC FETCH LOGIC (GET SYSTEM PROFILE STATE MATRIX)
  const fetchProfileData = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      triggerErrorBanner("Authentication token missing. Please sign in again.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/profile/meta`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        const { identity, savedResumes, preferences } = response.data.data;
        setUserMeta(identity);
        setSavedResumes(savedResumes);
        setPreferences(preferences);
      }
    } catch (error) {
      console.error("Profile payload synchronization crash:", error);
      triggerErrorBanner(error.response?.data?.message || "Failed to download profile parameters from cloud database.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileData();
  }, [fetchProfileData]);

  // ✅ 2. DYNAMIC PREFERENCES OPTIMIZATION SYNC (PUT ROUTE HANDLER)
  const handlePreferencesToggle = async (key) => {
    const token = localStorage.getItem('token');
    const updatedPreferences = { ...preferences, [key]: !preferences[key] };
    
    // Optimistic UI change to keep rendering instantaneous
    setPreferences(updatedPreferences);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/profile/preferences`,
        updatedPreferences,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        triggerSuccessBanner('Engine optimization parameters synced successfully.');
      }
    } catch (error) {
      console.error("Preferences cloud save failure:", error);
      triggerErrorBanner("Failed to write updated parameters state.");
      fetchProfileData(); // Rollback to actual database state on failure
    }
  };

  const handleModelChange = async (newModel) => {
    const token = localStorage.getItem('token');
    const updatedPreferences = { ...preferences, aiModel: newModel };
    
    setPreferences(updatedPreferences);

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/api/profile/preferences`,
        updatedPreferences,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        triggerSuccessBanner('AI computational layout rerouted smoothly.');
      }
    } catch (error) {
      console.error("Model routing update error:", error);
      triggerErrorBanner("Failed to alter remote AI configuration.");
      fetchProfileData();
    }
  };

  // ✅ 3. DYNAMIC DOCUMENT PURGING PROTOCOL (DELETE ROUTE HANDLER)
  const handleDeleteResume = async (id) => {
    if (!window.confirm("Are you sure you want to completely purge this historical analysis record?")) return;
    
    const token = localStorage.getItem('token');
    
    // Optimistically update frontend state layout
    setSavedResumes(prev => prev.filter(res => res.id !== id));

    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/profile/resume/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        triggerSuccessBanner('Document cleared from cloud registry storage clusters.');
      }
    } catch (error) {
      console.error("Document core delete call failure:", error);
      triggerErrorBanner("Purge request handling thread dropped: Unauthorized or missing node.");
      fetchProfileData(); // Re-sync state layout if network dropped
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center font-mono text-xs text-purple-400 gap-2">
        <div className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <span>PARSING LIVE ARCHIVE DATA LAYERS...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen text-slate-100 space-y-8 pb-20 text-left">
      
      {/* HEADER CONTROLS META */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tight flex items-center gap-2.5">
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
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs font-bold text-emerald-400">
          ✓ {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-400">
          ⚠️ {errorMessage}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* SIDE MENU BUTTON TAB ACTIONS */}
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

        {/* WORKSPACE VIEWER CORE */}
        <div className="lg:col-span-3 bg-slate-950/20 border border-slate-800/60 rounded-3xl p-6 min-h-[380px] backdrop-blur-md relative overflow-hidden">
          <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-purple-600/5 blur-[80px] rounded-full pointer-events-none" />

          {/* IDENTITY SUB-SHEET */}
          {activeTab === 'identity' && (
            <div className="space-y-6">
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

          {/* RESUMES HISTORY DIRECTORY LIST */}
          {activeTab === 'resumes' && (
            <div className="space-y-6">
              <div className="border-b border-slate-900 pb-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-purple-400 font-mono">Document Repository Storage</h3>
                <p className="text-xs text-slate-500 mt-0.5">Manage and view previously parsed resume payloads.</p>
              </div>

              {savedResumes.length === 0 ? (
                <div className="py-12 text-center text-xs font-mono text-slate-600">
                  Cloud storage registry database indexes empty.
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

          {/* DYNAMIC CONFIG PREFERENCES ENGINE */}
          {activeTab === 'preferences' && (
            <div className="space-y-6">
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
                    onChange={(e) => handleModelChange(e.target.value)}
                    className="bg-slate-950 border border-slate-800 text-slate-300 text-xs font-mono font-bold p-2 rounded-xl focus:outline-none focus:border-purple-500"
                  >
                    <option value="llama-3.3-70b-versatile">Llama 3.3 (70B) [Default]</option>
                    <option value="mixtral-8x7b-32768">Mixtral 8x7b Cluster</option>
                  </select>
                </div>

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