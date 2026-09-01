import React from 'react';
import { 
  Terminal, 
  ShieldCheck, 
  Mail, 
  Phone, 
  MessageSquare, 
  Server, 
  Radio, 
  Video, 
  Cpu, 
  Cloud,
  Lock,
  ArrowUp
} from 'lucide-react';

interface FooterProps {
  onOpenAiTriage: () => void;
  onOpenQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAiTriage, onOpenQuote }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-900">
          
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-900 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-extrabold tracking-wider text-lg text-white font-mono">
                TECH<span className="text-cyan-400">SEC</span> // INFRA
              </span>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm font-sans">
              Specialized technical support, security engineering, surveillance arrays, and cloud automation for businesses and residential infrastructure demanding 99.99% uptime.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>24/7 Priority Emergency Dispatch Available</span>
            </div>
          </div>

          {/* Col 3: Core Domains */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Engineering Specialties
            </div>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li><a href="#specialties" className="hover:text-cyan-300 transition-colors">Network & pfSense Firewalls</a></li>
              <li><a href="#specialties" className="hover:text-cyan-300 transition-colors">Web & Mail (SPF/DKIM/DMARC)</a></li>
              <li><a href="#specialties" className="hover:text-cyan-300 transition-colors">Cyber Hardening & CIS Sec</a></li>
              <li><a href="#specialties" className="hover:text-cyan-300 transition-colors">4K IP CCTV & Biometric Access</a></li>
              <li><a href="#specialties" className="hover:text-cyan-300 transition-colors">System Automation & Rclone</a></li>
              <li><a href="#specialties" className="hover:text-cyan-300 transition-colors">Microsoft 365 & Proxmox Cloud</a></li>
            </ul>
          </div>

          {/* Col 4: Interactive Tools */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Calculators & Blueprints
            </div>
            <ul className="space-y-2 text-xs text-slate-400 font-sans">
              <li><a href="#status-dashboard" className="text-cyan-300 font-bold hover:text-cyan-200 transition-colors">Client Status Dashboard</a></li>
              <li><a href="#tools" className="hover:text-cyan-300 transition-colors">IPv4 Subnet & CIDR Masker</a></li>
              <li><a href="#tools" className="hover:text-cyan-300 transition-colors">CCTV NVR Storage Sizer</a></li>
              <li><a href="#tools" className="hover:text-cyan-300 transition-colors">DMARC Record Generator</a></li>
              <li><a href="#tools" className="hover:text-cyan-300 transition-colors">Port & Protocol Matrix</a></li>
              <li><a href="#topology" className="hover:text-cyan-300 transition-colors">Network Topology Blueprints</a></li>
              <li><button onClick={onOpenAiTriage} className="text-cyan-400 hover:text-cyan-300 transition-colors text-left cursor-pointer">AI Incident Diagnostic</button></li>
            </ul>
          </div>

          {/* Col 5: Dispatch & Inquiries */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Direct Contact
            </div>
            <div className="space-y-2 text-xs text-slate-300">
              <button
                onClick={onOpenQuote}
                className="w-full py-2 px-3 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all text-center cursor-pointer shadow-md shadow-cyan-500/20"
              >
                Request Dispatch / SLA
              </button>

              <button
                onClick={onOpenAiTriage}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 transition-all text-center cursor-pointer"
              >
                Run AI Diagnosis
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} TechSec Infrastructure Systems. Designed for high availability and zero-trust security.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-cyan-300 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
