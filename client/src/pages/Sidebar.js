import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  LayoutDashboard, History, User, Users, // 🌟 Imported Users Icon
  LogOut, Cpu, AlertTriangle, X,
  ChevronLeft, ChevronRight
} from 'lucide-react';

export default function Sidebar({ isCollapsed, setIsCollapsed }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [userProfile, setUserProfile] = useState({ name: 'User', role: 'candidate' });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUserProfile(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing user session profile", e);
      }
    }
  }, []);

  const handleLogoutConfirm = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setShowLogoutModal(false);
    alert("Logged out successfully!");
    navigate('/');
  };

  
  const navigationItems = [
    { label: 'Dashboard Workspace', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Analysis and History', path: '/history', icon: History },
    { label: 'Recruiter Workspace', path: '/recruiter', icon: Users },
    { label: 'My Profile', path: '/profile', icon: User },
  ];

  return (
    <>
      <aside className={`fixed top-0 left-0 h-screen bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between z-30 transition-all duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
        
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute top-5 -right-3.5 w-7 h-7 bg-slate-900 border border-slate-800 text-slate-400 hover:text-white rounded-full flex items-center justify-center cursor-pointer shadow-md z-40"
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>

        <div>
     
          <div className="h-16 flex items-center gap-2.5 px-6 border-b border-slate-900 overflow-hidden whitespace-nowrap">
            <Cpu className="w-6 h-6 text-purple-400 shrink-0" />
            {!isCollapsed && (
              <>
                <span className="text-sm font-black tracking-widest text-white animate-fade-in">
                  NEXA<span className="text-purple-400">ATS</span>
                </span>
                <span className="text-[9px] bg-purple-500/10 border border-purple-500/20 text-purple-400 px-1.5 py-0.5 rounded uppercase font-bold">
                  {userProfile.role}
                </span>
              </>
            )}
          </div>

      
          <nav className="p-4 space-y-1.5 mt-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  title={isCollapsed ? item.label : ''}
                  className={`flex items-center rounded-xl text-xs font-bold uppercase tracking-wider transition-all ${
                    isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3 whitespace-nowrap'
                  } ${
                    isActive 
                      ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.15)]' 
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/50'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                  {!isCollapsed && <span className="animate-fade-in">{item.label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

       
        <div className="p-4 border-t border-slate-900 space-y-3">
          <div className={`flex items-center px-2 py-1 ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center font-bold text-xs text-white shrink-0">
              {userProfile.name.charAt(0).toUpperCase()}
            </div>
            {!isCollapsed && (
              <div className="truncate animate-fade-in">
                <p className="text-xs font-bold text-white truncate">{userProfile.name}</p>
                <p className="text-[10px] text-slate-500 truncate">{userProfile.email}</p>
              </div>
            )}
          </div>

          <button
            onClick={() => setShowLogoutModal(true)}
            title={isCollapsed ? 'Logout' : ''}
            className={`w-full flex items-center rounded-xl text-xs font-bold uppercase tracking-wider text-red-400 hover:text-red-300 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all cursor-pointer ${
              isCollapsed ? 'justify-center p-3' : 'px-4 py-3 gap-3 whitespace-nowrap'
            }`}
          >
            <LogOut className="w-4 h-4 shrink-0" />
            {!isCollapsed && <span className="animate-fade-in">Logout</span>}
          </button>
        </div>
      </aside>

      {showLogoutModal && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-md rounded-2xl shadow-2xl p-6 relative">
            
            <button 
              onClick={() => setShowLogoutModal(false)}
              className="absolute top-4 right-4 text-slate-500 hover:text-slate-300"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-start gap-4 mb-6">
              <div className="p-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white mb-1">Confirm Logout</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Are you sure you want to logout? Any unsaved active file uploads or live text analyses will be reset.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-800/60">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2.5 rounded-xl border border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-white bg-slate-900/50 hover:bg-slate-800 transition-all cursor-pointer"
              >
                Cancel, Keep Active
              </button>

              <button
                onClick={handleLogoutConfirm}
                className="px-5 py-2.5 rounded-xl bg-red-500 hover:bg-red-400 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(239,68,68,0.2)] transition-all cursor-pointer"
              >
                Logout
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}