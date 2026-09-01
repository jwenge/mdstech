import React, { useState, useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  Pause, 
  ShieldCheck, 
  Server, 
  Radio, 
  Lock, 
  Video, 
  Cpu, 
  Cloud, 
  CheckCircle2, 
  Layers, 
  Terminal, 
  Zap, 
  ArrowRight,
  ShieldAlert,
  Key,
  HardDrive,
  Eye,
  BellRing
} from 'lucide-react';
import { SPECIALIZATIONS } from '../data/specializations';
import { CategoryId, Specialization } from '../types';

interface SpecializationCarouselProps {
  onOpenQuoteWithCategory?: (category: string) => void;
  onOpenAiTriageWithCategory?: (category: string) => void;
}

export const SpecializationCarousel: React.FC<SpecializationCarouselProps> = ({
  onOpenQuoteWithCategory,
  onOpenAiTriageWithCategory
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const autoPlayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Filtered items
  const filteredItems = selectedCategory === 'all' 
    ? SPECIALIZATIONS 
    : SPECIALIZATIONS.filter(item => item.category === selectedCategory);

  // Reset index when filter changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedCategory]);

  // Autoplay functionality
  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayTimerRef.current = setInterval(() => {
        setCurrentIndex(prev => (prev + 1) % filteredItems.length);
      }, 7000);
    } else if (autoPlayTimerRef.current) {
      clearInterval(autoPlayTimerRef.current);
    }
    return () => {
      if (autoPlayTimerRef.current) clearInterval(autoPlayTimerRef.current);
    };
  }, [isAutoPlaying, filteredItems.length]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % filteredItems.length);
  };

  const activeItem: Specialization = filteredItems[currentIndex] || SPECIALIZATIONS[0];

  // Category buttons
  const categories: { id: CategoryId; label: string; icon: any }[] = [
    { id: 'all', label: 'All Specializations', icon: Layers },
    { id: 'network', label: 'Network & Security', icon: Server },
    { id: 'web-mail', label: 'Web & Mail Hosting', icon: Radio },
    { id: 'cybersecurity', label: 'Cyber Hardening', icon: Lock },
    { id: 'cctv-access', label: 'CCTV & Access Control', icon: Video },
    { id: 'automation', label: 'Automation & IoT', icon: Cpu },
    { id: 'cloud', label: 'Cloud & Hybrid', icon: Cloud },
  ];

  return (
    <section id="specialties" className="py-24 bg-slate-950 relative border-t border-slate-900 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-cyan-600/5 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-600/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-400 mb-3">
              <Terminal className="w-3.5 h-3.5" />
              SPECIALIZATION PORTFOLIO
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Domain Expertise & Capabilities
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Swipe through primary infrastructure modules. Test live interactive mini-simulators embedded within each domain.
            </p>
          </div>

          {/* Carousel Navigation Toolbar */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`p-2.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
                isAutoPlaying 
                  ? 'bg-cyan-500/20 border-cyan-500 text-cyan-300' 
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
              }`}
              title={isAutoPlaying ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="hidden sm:inline">{isAutoPlaying ? 'Auto-Advancing' : 'Auto Play'}</span>
            </button>

            <button
              id="carousel-prev-btn"
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <span className="font-mono text-xs text-slate-400 px-1">
              <span className="text-cyan-400 font-bold">{currentIndex + 1}</span> / {filteredItems.length}
            </span>

            <button
              id="carousel-next-btn"
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-medium whitespace-nowrap flex items-center gap-2 transition-all cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* The Main Showcase Carousel Card */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-950 border border-slate-800/90 shadow-2xl overflow-hidden transition-all duration-300">
          
          {/* Card Top Banner / Meta */}
          <div className="px-6 py-4 bg-slate-900/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-cyan-950 text-cyan-400 border border-cyan-800/60 text-xs font-mono font-semibold uppercase tracking-wider">
                {activeItem.badge}
              </span>
              <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                ID: {activeItem.id}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                {filteredItems.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      currentIndex === idx ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-800 hover:bg-slate-700'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Card Body - 2 Columns (Specs & Interactive Simulator) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-8 lg:p-10">
            
            {/* Left Column: Scope & Technical Capabilities (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {activeItem.title}
                </h3>
                <p className="text-cyan-400 text-sm font-medium mt-1 font-mono">
                  {activeItem.subtitle}
                </p>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeItem.description}
              </p>

              {/* Highlights Checklist */}
              <div className="space-y-2.5 pt-2">
                <h4 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                  Deliverables & Architecture
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeItem.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-200 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/60">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                {activeItem.stats.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                    <div className="text-lg sm:text-xl font-bold font-mono text-cyan-300">{s.value}</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack Chips */}
              <div className="pt-2">
                <div className="text-xs font-mono uppercase text-slate-400 mb-2">Technologies & Protocols</div>
                <div className="flex flex-wrap gap-1.5">
                  {activeItem.techStack.map((tech, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-slate-800/70 border border-slate-700 text-xs font-mono text-slate-300">
                      {tech}
                    </span>
                  ))}
                  {activeItem.protocols.map((proto, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-cyan-950/40 border border-cyan-900/60 text-xs font-mono text-cyan-300">
                      {proto}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-800/80">
                <button
                  onClick={() => onOpenQuoteWithCategory && onOpenQuoteWithCategory(activeItem.title)}
                  className="px-5 py-2.5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2"
                >
                  Request Dispatch for {activeItem.title.split(' ')[0]}
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => onOpenAiTriageWithCategory && onOpenAiTriageWithCategory(activeItem.title)}
                  className="px-4 py-2.5 rounded-xl text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 flex items-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  Ask AI Diagnostic
                </button>
              </div>
            </div>

            {/* Right Column: Embedded Live Interactive Mini-Simulator (5 Cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <div className="rounded-xl bg-slate-950 border border-slate-800 p-5 shadow-inner">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80 mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400 animate-pulse" />
                    <span className="text-xs font-mono font-semibold text-slate-200 uppercase">
                      Live Simulation: {activeItem.interactiveType}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-400 border border-emerald-800/50">
                    INTERACTIVE
                  </span>
                </div>

                {/* Specific Simulator based on activeItem.interactiveType */}
                <InteractiveSimulator type={activeItem.interactiveType} />
              </div>
            </div>

          </div>

          {/* Quick Carousel Thumbnail Strip */}
          <div className="px-6 py-4 bg-slate-950 border-t border-slate-800/90 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {SPECIALIZATIONS.map((spec, idx) => {
              const isSelected = activeItem.id === spec.id;
              return (
                <button
                  key={spec.id}
                  onClick={() => {
                    setSelectedCategory('all');
                    setCurrentIndex(idx);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-cyan-500/80 shadow-md shadow-cyan-950/40'
                      : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
                  }`}
                >
                  <div className="text-[11px] font-mono font-semibold truncate text-slate-200">
                    {spec.title.split('&')[0]}
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">{spec.badge}</div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};

// Sub-component: Live Interactive Mini-Simulators for each domain
function InteractiveSimulator({ type }: { type: Specialization['interactiveType'] }) {
  // Simulator 1: Firewall
  const [packetSource, setPacketSource] = useState('WAN (Public)');
  const [packetDest, setPacketDest] = useState('VLAN 20 (CCTV & NVR)');
  const [packetPort, setPacketPort] = useState('554 RTSP');
  const [firewallLog, setFirewallLog] = useState<{ status: 'PASS' | 'DROP' | 'ISOLATE'; msg: string; rule: string } | null>({
    status: 'PASS',
    msg: 'Allowed via WireGuard VPN Tunnel Rule #104',
    rule: 'PASS in on wg0 inet proto tcp from 10.8.0.0/24 to 192.168.20.10 port 554'
  });

  const testFirewallRule = (src: string, dest: string, port: string) => {
    setPacketSource(src);
    setPacketDest(dest);
    setPacketPort(port);

    if (src === 'WAN (Public)' && dest.includes('CCTV') && !port.includes('VPN')) {
      setFirewallLog({
        status: 'DROP',
        msg: 'BLOCKED: Public direct access to RTSP/CCTV is denied by default security policy',
        rule: 'BLOCK in on wan0 inet proto tcp from any to 192.168.20.0/24 port 554 [DROP_WAN_RTSP]'
      });
    } else if (src.includes('Guest') && dest.includes('Corporate')) {
      setFirewallLog({
        status: 'ISOLATE',
        msg: 'ISOLATED: Inter-VLAN isolation rule triggered (802.1Q zero-trust)',
        rule: 'BLOCK in on vlan30 inet proto any from 192.168.30.0/24 to 192.168.10.0/24'
      });
    } else if (port.includes('22 SSH') && src === 'WAN (Public)') {
      setFirewallLog({
        status: 'DROP',
        msg: 'RATE-LIMIT DROP: Fail2ban + GeoIP policy dropped unauthenticated WAN SSH attempt',
        rule: 'BLOCK in on wan0 proto tcp port 22 [TABLE_BRUTEFORCE_ABUSE]'
      });
    } else {
      setFirewallLog({
        status: 'PASS',
        msg: 'ALLOWED: Valid internal traffic matches stateful policy',
        rule: 'PASS out on vlan10 proto tcp all keep state'
      });
    }
  };

  // Simulator 2: DNS & DMARC Checker
  const [domainQuery, setDomainQuery] = useState('acme-corp.com');
  const [dnsResults, setDnsResults] = useState({
    spf: 'v=spf1 include:_spf.google.com ip4:198.51.100.4 ~all [VALID]',
    dkim: '2048-bit RSA Selector: google._domainkey.acme-corp.com [VERIFIED]',
    dmarc: 'v=DMARC1; p=reject; rua=mailto:dmarc-reports@acme-corp.com [STRICT REJECT]',
    score: '100% (Inbox Ready)'
  });

  // Simulator 3: Hardening Benchmark
  const [sshKeysOnly, setSshKeysOnly] = useState(true);
  const [fail2banActive, setFail2banActive] = useState(true);
  const [ufwActive, setUfwActive] = useState(true);
  const [edrAgent, setEdrAgent] = useState(true);

  const calculateHardeningScore = () => {
    let score = 20;
    if (sshKeysOnly) score += 20;
    if (fail2banActive) score += 20;
    if (ufwActive) score += 20;
    if (edrAgent) score += 20;
    return score;
  };

  // Simulator 4: CCTV Camera Switcher
  const [selectedCam, setSelectedCam] = useState<'cam1' | 'cam2' | 'cam3' | 'cam4'>('cam1');
  const [accessBadgeStatus, setAccessBadgeStatus] = useState<string | null>(null);

  // Simulator 5: Automation Chain
  const [automationStep, setAutomationStep] = useState(0);
  const [isExecutingAutomation, setIsExecutingAutomation] = useState(false);

  const triggerAutomation = () => {
    setIsExecutingAutomation(true);
    setAutomationStep(1);
    setTimeout(() => setAutomationStep(2), 700);
    setTimeout(() => setAutomationStep(3), 1400);
    setTimeout(() => {
      setAutomationStep(4);
      setIsExecutingAutomation(false);
    }, 2100);
  };

  // Simulator 6: Cloud Cost & Sizer
  const [userCount, setUserCount] = useState(25);
  const [cloudPlan, setCloudPlan] = useState<'m365' | 'google' | 'hybrid'>('m365');

  if (type === 'firewall') {
    return (
      <div className="space-y-4 font-mono text-xs">
        <div className="space-y-2">
          <label className="text-[11px] text-slate-400">Select Test Packet Origin & Destination:</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <button
              onClick={() => testFirewallRule('WAN (Public)', 'VLAN 20 (CCTV & NVR)', '554 RTSP')}
              className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 text-[11px] text-left"
            >
              🌐 WAN → CCTV (RTSP)
            </button>
            <button
              onClick={() => testFirewallRule('VLAN 30 (Guest WiFi)', 'VLAN 10 (Corporate Server)', '445 SMB')}
              className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 text-[11px] text-left"
            >
              📱 Guest WiFi → Corp SMB
            </button>
            <button
              onClick={() => testFirewallRule('WireGuard Tunnel', 'VLAN 10 (Corporate Server)', '443 HTTPS')}
              className="p-2 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-slate-300 text-[11px] text-left"
            >
              🔒 WireGuard VPN → Corp
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Simulated Flow:</span>
            <span className="text-cyan-300">{packetSource} ➔ {packetDest}</span>
          </div>

          {firewallLog && (
            <div className={`p-2.5 rounded border text-xs ${
              firewallLog.status === 'PASS' 
                ? 'bg-emerald-950/40 border-emerald-800/60 text-emerald-300' 
                : firewallLog.status === 'ISOLATE'
                ? 'bg-amber-950/40 border-amber-800/60 text-amber-300'
                : 'bg-rose-950/40 border-rose-800/60 text-rose-300'
            }`}>
              <div className="font-bold flex items-center gap-1.5">
                {firewallLog.status === 'PASS' ? <CheckCircle2 className="w-4 h-4" /> : <ShieldAlert className="w-4 h-4" />}
                VERDICT: {firewallLog.status}
              </div>
              <p className="mt-1 text-[11px] opacity-90">{firewallLog.msg}</p>
              <div className="mt-1.5 pt-1.5 border-t border-slate-800 text-[10px] opacity-75 font-mono">
                {firewallLog.rule}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (type === 'dns') {
    return (
      <div className="space-y-3 font-mono text-xs">
        <div className="space-y-1">
          <label className="text-[11px] text-slate-400">Simulate Mail Auth Verification:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={domainQuery}
              onChange={(e) => setDomainQuery(e.target.value)}
              className="flex-1 px-2.5 py-1.5 rounded bg-slate-900 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500"
              placeholder="yourdomain.com"
            />
            <button
              onClick={() => {
                setDnsResults({
                  spf: `v=spf1 include:_spf.${domainQuery} ip4:198.51.100.2 ~all [PASS]`,
                  dkim: `2048-bit RSA key valid for ${domainQuery} [PASS]`,
                  dmarc: `v=DMARC1; p=reject; rua=mailto:reports@${domainQuery} [ENFORCED]`,
                  score: '100% Deliverability'
                });
              }}
              className="px-3 py-1.5 rounded bg-cyan-500 text-slate-950 font-bold text-xs hover:bg-cyan-400"
            >
              Verify
            </button>
          </div>
        </div>

        <div className="space-y-2 p-3 rounded-lg bg-slate-900/80 border border-slate-800">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">SPF Record:</span>
            <span className="text-emerald-400 font-semibold">{dnsResults.spf}</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">DKIM 2048:</span>
            <span className="text-emerald-400 font-semibold">{dnsResults.dkim}</span>
          </div>
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-slate-400">DMARC Policy:</span>
            <span className="text-cyan-300 font-semibold">{dnsResults.dmarc}</span>
          </div>
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-slate-300 font-bold">Spam Bypass Score:</span>
            <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
              {dnsResults.score}
            </span>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'hardening') {
    const score = calculateHardeningScore();
    return (
      <div className="space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400">CIS Benchmark Hardening:</span>
          <span className={`font-bold px-2 py-0.5 rounded text-xs ${
            score >= 80 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-amber-950 text-amber-400 border border-amber-800'
          }`}>
            Score: {score}%
          </span>
        </div>

        <div className="space-y-2">
          <label className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
            <span className="text-slate-300 text-[11px]">SSH Key-Only (Password Auth OFF)</span>
            <input
              type="checkbox"
              checked={sshKeysOnly}
              onChange={(e) => setSshKeysOnly(e.target.checked)}
              className="accent-cyan-500 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
            <span className="text-slate-300 text-[11px]">Fail2ban / CrowdSec IPS Enabled</span>
            <input
              type="checkbox"
              checked={fail2banActive}
              onChange={(e) => setFail2banActive(e.target.checked)}
              className="accent-cyan-500 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
            <span className="text-slate-300 text-[11px]">UFW Strict Ingress Whitelisting</span>
            <input
              type="checkbox"
              checked={ufwActive}
              onChange={(e) => setUfwActive(e.target.checked)}
              className="accent-cyan-500 rounded"
            />
          </label>

          <label className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 cursor-pointer hover:border-slate-700">
            <span className="text-slate-300 text-[11px]">EDR Wazuh / CrowdStrike Agent</span>
            <input
              type="checkbox"
              checked={edrAgent}
              onChange={(e) => setEdrAgent(e.target.checked)}
              className="accent-cyan-500 rounded"
            />
          </label>
        </div>
      </div>
    );
  }

  if (type === 'cctv') {
    const camFeeds = {
      cam1: { title: 'CAM 01: Main Entrance Gate', res: '4K UltraHD @ 25fps', bitrate: '3.8 Mbps', codec: 'H.265+' },
      cam2: { title: 'CAM 02: Server Rack Corridor', res: '1080p Starlight IR', bitrate: '1.4 Mbps', codec: 'H.265' },
      cam3: { title: 'CAM 03: Perimeter South Fence', res: '4K AI Motion Tracking', bitrate: '4.1 Mbps', codec: 'H.265+' },
      cam4: { title: 'CAM 04: Biometric Turnstile', res: '4K Face Capture', bitrate: '3.6 Mbps', codec: 'H.265+' }
    };

    return (
      <div className="space-y-3 font-mono text-xs">
        {/* Camera Selector Tabs */}
        <div className="grid grid-cols-4 gap-1">
          {(['cam1', 'cam2', 'cam3', 'cam4'] as const).map((cam) => (
            <button
              key={cam}
              onClick={() => setSelectedCam(cam)}
              className={`py-1 px-1.5 rounded text-[10px] text-center transition-all ${
                selectedCam === cam 
                  ? 'bg-cyan-500 text-slate-950 font-bold' 
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cam.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Simulated Camera Feed Window */}
        <div className="relative rounded-lg bg-slate-900 border border-slate-800 p-4 h-36 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 bg-tech-grid opacity-30 pointer-events-none" />
          <div className="relative z-10 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-rose-400 font-bold text-[10px]">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
              REC • RTSP STREAM
            </span>
            <span className="text-[10px] text-slate-400">{camFeeds[selectedCam].res}</span>
          </div>

          <div className="relative z-10 text-center space-y-1">
            <div className="text-sm font-bold text-slate-100">{camFeeds[selectedCam].title}</div>
            <div className="text-[11px] text-cyan-400">Codec: {camFeeds[selectedCam].codec} • Bitrate: {camFeeds[selectedCam].bitrate}</div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-500">
            <span>NVR RAID-6 OK</span>
            <span>Motion AI: Active</span>
          </div>
        </div>

        {/* Access Badge Scan Simulator */}
        <div className="flex gap-2 items-center pt-1">
          <button
            onClick={() => {
              setAccessBadgeStatus('ACCESS GRANTED • User #8410 (Engineering Team) • Door 01 Unlocked');
              setTimeout(() => setAccessBadgeStatus(null), 3500);
            }}
            className="w-full py-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-300 text-[11px] flex items-center justify-center gap-2"
          >
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            Simulate RFID Badge Tap
          </button>
        </div>

        {accessBadgeStatus && (
          <div className="p-2 rounded bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-[10px] text-center font-bold">
            {accessBadgeStatus}
          </div>
        )}
      </div>
    );
  }

  if (type === 'automation') {
    return (
      <div className="space-y-3 font-mono text-xs">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-slate-400">Incident Auto-Healing Pipeline:</span>
          <button
            disabled={isExecutingAutomation}
            onClick={triggerAutomation}
            className="px-3 py-1 rounded bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[11px] disabled:opacity-50"
          >
            {isExecutingAutomation ? 'Running...' : 'Trigger Disk Warning'}
          </button>
        </div>

        <div className="space-y-2 p-3 rounded-lg bg-slate-900 border border-slate-800">
          <div className={`flex items-center gap-2 text-[11px] transition-all ${automationStep >= 1 ? 'text-amber-400' : 'text-slate-600'}`}>
            <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px]">1</span>
            <span>Alert Triggered: /var/log Partition at 92%</span>
          </div>

          <div className={`flex items-center gap-2 text-[11px] transition-all ${automationStep >= 2 ? 'text-cyan-300' : 'text-slate-600'}`}>
            <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px]">2</span>
            <span>Cronjob dispatches Restic snapshot to S3 Glacier</span>
          </div>

          <div className={`flex items-center gap-2 text-[11px] transition-all ${automationStep >= 3 ? 'text-blue-300' : 'text-slate-600'}`}>
            <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px]">3</span>
            <span>Logrotate executes & cleans temporary buffers</span>
          </div>

          <div className={`flex items-center gap-2 text-[11px] transition-all ${automationStep >= 4 ? 'text-emerald-400 font-bold' : 'text-slate-600'}`}>
            <span className="w-4 h-4 rounded-full border flex items-center justify-center text-[10px]">4</span>
            <span>Telegram Webhook: "System Healthy. Disk usage 24%"</span>
          </div>
        </div>
      </div>
    );
  }

  // Cloud & Hybrid
  return (
    <div className="space-y-3 font-mono text-xs">
      <div className="space-y-1">
        <label className="text-[11px] text-slate-400">Simulate Hybrid Cloud Sizing (Users): {userCount}</label>
        <input
          type="range"
          min="5"
          max="150"
          step="5"
          value={userCount}
          onChange={(e) => setUserCount(parseInt(e.target.value, 10))}
          className="w-full accent-cyan-500"
        />
      </div>

      <div className="grid grid-cols-3 gap-1">
        <button
          onClick={() => setCloudPlan('m365')}
          className={`p-1.5 rounded text-[10px] ${cloudPlan === 'm365' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'}`}
        >
          Microsoft 365
        </button>
        <button
          onClick={() => setCloudPlan('google')}
          className={`p-1.5 rounded text-[10px] ${cloudPlan === 'google' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'}`}
        >
          Google Workspace
        </button>
        <button
          onClick={() => setCloudPlan('hybrid')}
          className={`p-1.5 rounded text-[10px] ${cloudPlan === 'hybrid' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400'}`}
        >
          Proxmox Hybrid
        </button>
      </div>

      <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1.5 text-[11px]">
        <div className="flex justify-between">
          <span className="text-slate-400">Total Mailboxes:</span>
          <span className="text-slate-200 font-bold">{userCount} Accounts</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Recommended Storage:</span>
          <span className="text-cyan-300 font-bold">{userCount * 50} GB Cloud Sync</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Migration SLA:</span>
          <span className="text-emerald-400 font-bold">{userCount > 50 ? '3 - 5 Days' : '48 Hours (Zero Downtime)'}</span>
        </div>
      </div>
    </div>
  );
}
