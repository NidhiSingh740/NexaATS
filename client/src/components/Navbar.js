import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Imported navigation hook
import { Menu, X, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate(); // Initialize routing controller


  const handleAuthRedirect = () => {
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/70 backdrop-blur-md border-b border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <Sparkles className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold tracking-tight text-white">Nexa<span className="text-purple-500">ATS</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-purple-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-purple-400 transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-purple-400 transition-colors">Testimonials</a>
            <a href="#pricing" className="hover:text-purple-400 transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-purple-400 transition-colors">FAQ</a>
          </div>

     
          <div className="hidden md:flex items-center gap-4">
            
            <button 
              onClick={handleAuthRedirect} 
              className="px-4 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
            >
              Get Started
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-400 hover:text-white">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-900 px-4 pt-2 pb-4 space-y-3 flex flex-col">
          <a href="#features" onClick={() => setIsOpen(false)} className="text-gray-300 py-2 text-left">Features</a>
          <a href="#how-it-works" onClick={() => setIsOpen(false)} className="text-gray-300 py-2 text-left">How It Works</a>
          <a href="#testimonials" onClick={() => setIsOpen(false)} className="text-gray-300 py-2 text-left">Testimonials</a>
          <a href="#pricing" onClick={() => setIsOpen(false)} className="text-gray-300 py-2 text-left">Pricing</a>
          <a href="#faq" onClick={() => setIsOpen(false)} className="text-gray-300 py-2 text-left">FAQ</a>
          <hr className="border-slate-900" />
          
          {/* ASSIGNED NAVIGATION CLICK LOGIC HERE */}
          <button 
            onClick={handleAuthRedirect} 
            className="w-full py-2.5 text-center text-gray-300 hover:text-white transition-colors"
          >
            Sign In
          </button>
          <button 
            onClick={handleAuthRedirect} 
            className="w-full py-2.5 text-center bg-purple-600 text-white rounded-lg hover:bg-purple-500 transition-colors"
          >
            Get Started
          </button>
        </div>
      )}
    </nav>
  );
}