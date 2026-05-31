import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'candidate' });
  const [errorMessage, setErrorMessage] = useState('');
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
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white font-mono focus:outline-none focus:border-purple-500" 
            />
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
          <button onClick={() => navigate('/login')} className="text-purple-400 hover:underline font-bold bg-transparent border-none cursor-pointer">
            Return to Login
          </button>
        </p>
      </div>
    </div>
  );
}