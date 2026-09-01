import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  Cpu, 
  Network, 
  Wrench, 
  PhoneCall, 
  Menu, 
  X, 
  Sparkles,
  Server,
  Activity
} from 'lucide-react';

interface NavbarProps {
  onOpenAiTriage: () => void;
  onOpenQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAiTriage, onOpenQuote }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [latency, setLatency] = useState(14);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Subtle dynamic ping simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(prev => {
        const jitter = Math.floor(Math.random() * 5) - 2;
        return Math.max(9, Math.min(24, prev + jitter));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const navLinks = [
    { name: 'Specialties', href: '#specialties', icon: Network },
    { name: 'Topology Map', href: '#topology', icon: Server },
    { name: 'Client Dashboard', href: '#status-dashboard', icon: Activity },
    { name: 'Tech Toolkit', href: '#tools', icon: Wrench },
    { name: 'Case Studies', href: '#cases', icon: ShieldCheck },
  ];

  return (
    <header 
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-2xl shadow-cyan-950/20' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo and Live Status */}
          <div className="flex items-center gap-4">
            <a href="#" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 via-slate-900 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-500/10 group-hover:border-cyan-400 transition-colors">
                <Terminal className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold tracking-wider text-base sm:text-lg text-slate-100 font-mono">
                    TECH<span className="text-cyan-400">SEC</span>
                  </span>
                  <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    L3 Infra
                  </span>
                </div>
                <span className="text-xs text-slate-400 hidden sm:inline-block font-sans">
                  Network, Security & Cloud Specialist
                </span>
              </div>
            </a>

            {/* Telemetry Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-emerald-400 font-semibold">Active Ready</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-400 flex items-center gap-1">
                <Activity className="w-3 h-3 text-cyan-400" />
                {latency}ms
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 border border-slate-800/80 rounded-full px-3 py-1.5 shadow-inner">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-cyan-300 rounded-full hover:bg-slate-800/80 transition-all flex items-center gap-1.5"
                >
                  <Icon className="w-3.5 h-3.5 text-slate-400" />
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <button
              id="nav-ai-triage-btn"
              onClick={onOpenAiTriage}
              className="px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 transition-all flex items-center gap-2 shadow-sm shadow-cyan-900/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              AI Troubleshooter
            </button>

            <button
              id="nav-get-quote-btn"
              onClick={onOpenQuote}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              Request Dispatch
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenAiTriage}
              className="p-2 rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-400 text-xs"
              title="AI Diagnostic"
            >
              <Sparkles className="w-4 h-4" />
            </button>

            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/98 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-sm text-slate-200 hover:border-cyan-500/40"
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  {link.name}
                </a>
              );
            })}
          </div>

          <div className="flex flex-col gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAiTriage();
              }}
              className="w-full py-2.5 rounded-lg text-sm font-medium bg-slate-900 text-cyan-300 border border-cyan-500/30 flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Launch AI Troubleshooter
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuote();
              }}
              className="w-full py-2.5 rounded-lg text-sm font-bold bg-cyan-500 text-slate-950 flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              Request Dispatch / Quote
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
