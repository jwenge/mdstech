import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Terminal, 
  ArrowRight, 
  Server, 
  Radio, 
  Lock, 
  Video, 
  Cpu, 
  Cloud, 
  Sparkles,
  ChevronDown
} from 'lucide-react';

interface HeroSectionProps {
  onOpenAiTriage: () => void;
  onOpenQuote: () => void;
}

const TERMINAL_LOGS = [
  '# Initializing TechSec Infrastructure Diagnostics v4.8...',
  '>> [CORE] 802.1Q Trunk Verified. VLANs 10 (Corp), 20 (CCTV), 30 (Guest), 40 (VoIP) active.',
  '>> [FIREWALL] pfSense State Table: 0 packet drops on primary WAN. Failover ready.',
  '>> [MAIL] DNSSEC, SPF, DKIM-2048 & DMARC strict reject policy validated. 100% Inbox score.',
  '>> [SURVEILLANCE] 32x 4K H.265+ RTSP streams streaming to RAID-6 NVR @ 25fps.',
  '>> [AUTOMATION] Automated Restic backup snapshot completed -> synced to S3 Glacier.',
  '>> [CLOUD] Entra ID SAML 2.0 Single Sign-On synchronized. All services nominal.'
];

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenAiTriage, onOpenQuote }) => {
  const [logIndex, setLogIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLogIndex((prev) => (prev + 1) % TERMINAL_LOGS.length);
    }, 3200);
    return () => clearInterval(interval);
  }, []);

  const domains = [
    { label: 'Network & Firewalls', icon: Server, color: 'text-cyan-400 border-cyan-500/30' },
    { label: 'Mail & Web Hosting', icon: Radio, color: 'text-emerald-400 border-emerald-500/30' },
    { label: 'Cyber Hardening', icon: Lock, color: 'text-rose-400 border-rose-500/30' },
    { label: 'CCTV & Biometrics', icon: Video, color: 'text-amber-400 border-amber-500/30' },
    { label: 'System Automation', icon: Cpu, color: 'text-purple-400 border-purple-500/30' },
    { label: 'Cloud & Hybrid Infra', icon: Cloud, color: 'text-blue-400 border-blue-500/30' },
  ];

  return (
    <section id="hero-section" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-tech-grid">
      {/* Background Radial Ambient Glows */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-cyan-500/10 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-40 right-10 w-[400px] h-[300px] bg-emerald-500/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Minimalist Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-sm text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-400">ARCHITECTED FOR</span>
            <span className="text-cyan-300 font-semibold">Zero-Downtime Reliability</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Enterprise-Grade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400">
              Tech Support & Infrastructure
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Hands-on engineering specialist across <strong className="text-slate-100 font-medium">Network Security</strong>, <strong className="text-slate-100 font-medium">DNS & Mail Hosting</strong>, <strong className="text-slate-100 font-medium">CCTV & Access Control</strong>, <strong className="text-slate-100 font-medium">Smart Automation</strong>, and <strong className="text-slate-100 font-medium">Hybrid Cloud Systems</strong>.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <a
              id="hero-explore-specialties-btn"
              href="#specialties"
              className="px-6 py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-2.5"
            >
              Explore Interactive Showcase
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              id="hero-open-ai-triage-btn"
              onClick={onOpenAiTriage}
              className="px-6 py-3.5 rounded-xl font-medium text-sm bg-slate-900/90 hover:bg-slate-800 text-cyan-300 border border-cyan-500/30 hover:border-cyan-400/60 shadow-lg backdrop-blur-sm transition-all flex items-center gap-2.5"
            >
              <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
              AI Incident Troubleshooter
            </button>

            <a
              id="hero-open-tools-btn"
              href="#tools"
              className="px-5 py-3.5 rounded-xl font-medium text-sm bg-slate-900/50 hover:bg-slate-800/80 text-slate-300 border border-slate-800 transition-all"
            >
              Engineer Toolset
            </a>
          </div>
        </div>

        {/* Live Terminal Stream Card */}
        <div className="mt-12 max-w-3xl mx-auto rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-2xl overflow-hidden backdrop-blur-md">
          <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800/90 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-xs font-mono text-slate-400 ml-2">sys-diag@techsec-infra:~</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/50">
                LIVE TELEMETRY
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5 font-mono text-xs sm:text-sm text-slate-300 space-y-2 min-h-[90px] flex flex-col justify-center">
            <div className="text-cyan-400 font-semibold flex items-center gap-2">
              <Terminal className="w-4 h-4 text-cyan-400 animate-pulse" />
              <span>root# {TERMINAL_LOGS[logIndex]}</span>
            </div>
            <p className="text-slate-500 text-[11px]">
              Ready for immediate troubleshooting • Remote terminal & On-site SLA coverage
            </p>
          </div>
        </div>

        {/* Six Domain Pills */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {domains.map((item, idx) => {
            const Icon = item.icon;
            return (
              <a
                key={idx}
                href="#specialties"
                className={`p-3 rounded-xl bg-slate-900/60 border ${item.color} flex flex-col items-center justify-center text-center gap-2 hover:bg-slate-900/90 hover:scale-[1.03] transition-all group shadow-sm`}
              >
                <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-slate-200">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Metric Badges */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">500+</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Endpoints Secured</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-mono">99.99%</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Network SLA Uptime</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">&lt; 15 Mins</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Critical Response Time</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">0 Breaches</div>
            <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">Hardened Systems</div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-10">
          <a
            href="#specialties"
            className="text-slate-500 hover:text-cyan-400 transition-colors animate-bounce p-2"
            aria-label="Scroll to showcase"
          >
            <ChevronDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
