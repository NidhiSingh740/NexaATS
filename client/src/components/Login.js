import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));

        alert("Login successful! Redirecting to Dashboard Workspace...");
        navigate('/dashboard');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Invalid email or password.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-12 px-4 bg-slate-900 relative overflow-hidden">
      <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-md w-full relative z-10">
        <div className="bg-slate-950/60 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl">
          
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/5 text-purple-400 text-xs font-semibold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" /> Identity Protection Verification Secure
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">Welcome Back</h2>
            <p className="text-sm text-slate-400 mt-2">Sign in to check your matching history logs</p>
          </div>

          {errorMessage && (
            <div className="p-3 mb-4 text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">Password</label>
                <a href="#" className="text-xs text-slate-500 hover:text-purple-400 transition-colors">Forgot password?</a>
              </div>
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

            <button type="submit" className="w-full flex items-center justify-center gap-2 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-[0_0_30px_rgba(147,51,234,0.2)] text-sm">
              Sign In Account <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="text-center mt-6 pt-6 border-t border-slate-900 text-xs text-slate-500">
            Don't have an account? <Link to="/signup" className="text-purple-400 font-semibold hover:underline">Register Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}