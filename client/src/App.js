import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Sidebar from './pages/Sidebar';
import Hero from './components/Hero';
import AiAnimation from './components/AiAnimation';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Testimonials from './components/Testimonials';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './pages/Dashboard';
import Analysis from './pages/Analysis';
import History from './pages/History'; 
import Recruiter from './pages/Recruiter';
import Profile from './pages/Profile';


function PageContainer() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, [location]);

  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';
  const isLandingRoute = location.pathname === '/';
  const showSidebarLayout = isLoggedIn && !isLandingRoute && !isAuthRoute;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-white font-sans overflow-x-hidden relative selection:bg-purple-500 selection:text-white">
      
      
      {!showSidebarLayout && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-purple-900/20 via-indigo-900/10 to-transparent blur-3xl pointer-events-none z-0" />
      )}
      
     
      {!showSidebarLayout ? (
        <Navbar />
      ) : (
        <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      )}

    
      <main className={`flex-grow relative z-10 transition-all duration-300 ${showSidebarLayout ? (sidebarCollapsed ? 'pl-20 pt-6' : 'pl-64 pt-6') : ''}`}>
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
          
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<Analysis />} />
          <Route path="/history" element={<History />} /> 
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/profile" element={<Profile />} />


          

        </Routes>
      </main>

   
      <div className={`transition-all duration-300 relative z-10 ${showSidebarLayout ? (sidebarCollapsed ? 'pl-20' : 'pl-64') : ''}`}>
        <Footer />
      </div>
      
    </div>
  );
}

function App() {
  return (
    <Router>
      <PageContainer />
    </Router>
  );
}

export default App;