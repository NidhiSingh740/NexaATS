import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'candidate' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // ✅ Password visibility tracking state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/auth/signup`, formData);
      
      if (response.data.success) {
        alert("Registration complete! Booting authentication layer...");
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Registration failed. Try alternative parameters.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 text-left">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight">Register Terminal</h2>
          <p className="text-xs text-slate-400 mt-1">Deploy your personalized metrics parsing profile node.</p>
        </div>

        {errorMessage && (
          <div className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-bold text-red-400">
            ⚠️ {errorMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Full Name Identity</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-purple-500" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Registry Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-purple-500" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Secure Password Access</label>
            {/* ✅ Added relative wrapping block to align positioning overlays */}
            <div className="relative w-full">
              <input 
                type={showPassword ? "text" : "password"} // ✅ Switches field types based on click state
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-12 py-3 text-xs text-white font-mono focus:outline-none focus:border-purple-500" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-purple-400 p-1 rounded-md transition-colors bg-transparent border-none cursor-pointer select-none"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  /* Open Eye Vector Mask */
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  /* Slashed Closed Eye Vector Mask */
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-widest text-slate-500">System Permission Role</label>
            <select 
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-slate-300 font-mono focus:outline-none focus:border-purple-500"
            >
              <option value="candidate">Candidate Profile Shell</option>
              <option value="recruiter">Recruiter Engine Access</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl transition-all cursor-pointer">
            Initialize Account Shell
          </button>
        </form>

        <p className="text-center text-[11px] text-slate-500">
          Already verified?{' '}
          <button type="button" onClick={() => navigate('/login')} className="text-purple-400 hover:underline font-bold bg-transparent border-none cursor-pointer">
            Return to Login
          </button>
        </p>
      </div>
    </div>
  );
}