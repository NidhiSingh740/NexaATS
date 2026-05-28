import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AiAnimation from './components/AiAnimation';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-slate-950 text-white font-sans overflow-x-hidden relative selection:bg-purple-500 selection:text-white">
      
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-purple-900/20 via-indigo-900/10 to-transparent blur-3xl pointer-events-none z-0" />
        
        
        <Navbar />

       
        <main className="flex-grow relative z-10">
          <Routes>
            
    
            <Route path="/" element={
              <>
                <Hero />
                <AiAnimation />
                <Features />
                <HowItWorks />
                <Testimonials />
                <Pricing />
                <FAQ />
              </>
            } />
            
           
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          
            <Route path="/dashboard" element={
              <div className="pt-32 text-center text-2xl font-bold min-h-[60vh] text-emerald-400">
                Dashboard Panel Canvas
              </div>
            } />

          </Routes>
        </main>

        <Footer />
        
      </div>
    </Router>
  );
}

export default App;