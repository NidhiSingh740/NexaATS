import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, Briefcase, Eye, EyeOff, Sparkles, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'candidate'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', formData);
      if (response.data.success) {
        alert("Account created successfully in MongoDB! Redirecting to login...");
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Something went wrong during signup.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-slate-950/60 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.3)]">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-semibold mb-4">
              <Sparkles className="w-3 h-3" /> Step into the Future of Hiring
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Create Account</h2>
            <p className="text-sm text-slate-400 mt-2">Data will sync directly to Atlas database layers</p>
          </div>

          {errorMessage && (
            <div className="p-3 mb-4 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  required 
                  placeholder="Nidhi Singh" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white transition-colors"
                  onChange={(e) => setFormData({...formData, name: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="email" 
                  required 
                  placeholder="you@example.com" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white transition-colors"
                  onChange={(e) => setFormData({...formData, email: e.target.value})} 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-12 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white transition-colors"
                  onChange={(e) => setFormData({...formData, password: e.target.value})} 
                />
                {/* Dynamic Visibility Button Switch Toggle */}
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Account Type</label>
              <div className="relative">
                <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <select 
                  className="w-full pl-11 pr-4 py-3 bg-slate-900/50 border border-slate-800 rounded-xl text-sm focus:outline-none focus:border-purple-500 text-white transition-colors appearance-none cursor-pointer"
                  value={formData.role} 
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="candidate" className="bg-slate-950">Job Seeker (Analyze Resumes)</option>
                  <option value="recruiter" className="bg-slate-950">Recruiter (Batch Rank Profiles)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(147,51,234,0.2)] text-sm">
              Create Account <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-slate-900 text-xs text-slate-500">
            Already have an account? <Link to="/login" className="text-purple-400 font-semibold hover:underline">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}