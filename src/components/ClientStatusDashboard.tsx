import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Search, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Terminal, 
  AlertTriangle, 
  UserCheck, 
  FileText, 
  Download, 
  MessageSquare, 
  PhoneCall, 
  RefreshCw, 
  Server, 
  Check, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  Cpu,
  Layers,
  ArrowUpRight,
  Send,
  PlusCircle,
  HelpCircle
} from 'lucide-react';
import { SupportTicket } from '../types';
import { getStoredTickets, INITIAL_TICKETS } from '../data/tickets';

interface ClientStatusDashboardProps {
  onOpenQuote?: () => void;
  onOpenAiTriage?: (category?: string) => void;
  initialTicketId?: string;
}

export const ClientStatusDashboard: React.FC<ClientStatusDashboardProps> = ({
  onOpenQuote,
  onOpenAiTriage,
  initialTicketId = 'TS-NET-8492'
}) => {
  const [tickets, setTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [selectedTicketId, setSelectedTicketId] = useState<string>(initialTicketId);
  const [searchInput, setSearchInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'milestones' | 'logs' | 'metrics' | 'deliverables'>('milestones');
  
  const [isPingingEngineer, setIsPingingEngineer] = useState(false);
  const [pingSuccessMessage, setPingSuccessMessage] = useState<string | null>(null);
  const [downloadedDoc, setDownloadedDoc] = useState<string | null>(null);

  // Load from localStorage on mount & listen for updates
  useEffect(() => {
    const loaded = getStoredTickets();
    setTickets(loaded);
    if (initialTicketId) {
      const match = loaded.find(t => t.ticketId.toLowerCase() === initialTicketId.toLowerCase());
      if (match) {
        setSelectedTicketId(match.ticketId);
      }
    }
  }, [initialTicketId]);

  // Refresh ticket list
  const refreshTickets = () => {
    const loaded = getStoredTickets();
    setTickets(loaded);
  };

  // Find currently active ticket
  const activeTicket = tickets.find(t => 
    t.ticketId.toLowerCase() === selectedTicketId.toLowerCase()
  ) || tickets[0] || INITIAL_TICKETS[0];

  // Filtered tickets for search suggestions
  const filteredTickets = tickets.filter(t => 
    t.ticketId.toLowerCase().includes(searchInput.toLowerCase()) ||
    t.clientName.toLowerCase().includes(searchInput.toLowerCase()) ||
    t.companyName.toLowerCase().includes(searchInput.toLowerCase()) ||
    t.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const exactMatch = tickets.find(t => 
      t.ticketId.toLowerCase() === searchInput.trim().toLowerCase()
    );

    if (exactMatch) {
      setSelectedTicketId(exactMatch.ticketId);
      setSearchInput('');
      return;
    }

    const partialMatch = filteredTickets[0];
    if (partialMatch) {
      setSelectedTicketId(partialMatch.ticketId);
      setSearchInput('');
    }
  };

  const handlePingEngineer = () => {
    setIsPingingEngineer(true);
    setPingSuccessMessage(null);

    setTimeout(() => {
      setIsPingingEngineer(false);
      setPingSuccessMessage(`Engineer ${activeTicket.assignedEngineer.split(' ')[0]} acknowledged your status ping via dispatch terminal. Telemetry refreshed.`);
      
      // Auto-clear message after 5 seconds
      setTimeout(() => setPingSuccessMessage(null), 6000);
    }, 1200);
  };

  const handleDownloadDeliverable = (fileName: string) => {
    setDownloadedDoc(fileName);
    
    // Simulate generating and downloading a text summary file
    const content = `=====================================================
TECHSEC INFRASTRUCTURE & SECURITY AUDIT SUMMARY
=====================================================
Ticket ID: ${activeTicket.ticketId}
Client: ${activeTicket.clientName} (${activeTicket.companyName})
Service: ${activeTicket.service}
Title: ${activeTicket.title}
Status: ${activeTicket.status} (${activeTicket.overallProgress}% Completed)
Assigned Engineer: ${activeTicket.assignedEngineer}
SLA Tier: ${activeTicket.slaTier}

SCOPE SUMMARY:
${activeTicket.scopeSummary}

ACTIVE MILESTONES:
${activeTicket.milestones.map(m => `[${m.status.toUpperCase()}] ${m.name}\n  - Details: ${m.details}`).join('\n\n')}

VERIFIED METRICS:
${activeTicket.metrics.map(m => `* ${m.label}: ${m.value} ${m.unit || ''}`).join('\n')}

=====================================================
Generated securely via TechSec Client Portal v4.8
Timestamp: ${new Date().toISOString()}
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName.endsWith('.pdf') ? fileName.replace('.pdf', '_Summary.txt') : fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setDownloadedDoc(null), 3000);
  };

  const generateTicketWhatsAppUrl = () => {
    const msg = `Hello TechSec Support! I am checking on my active infrastructure ticket:
Ticket ID: ${activeTicket.ticketId}
Client: ${activeTicket.clientName} (${activeTicket.companyName})
Status: ${activeTicket.status} [${activeTicket.overallProgress}%]
Current Stage: ${activeTicket.currentMilestone}`;
    return `https://wa.me/?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="status-dashboard" className="py-24 bg-slate-950 border-t border-slate-900 relative overflow-hidden">
      
      {/* Background glow accents */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-cyan-500/5 blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-400 mb-3">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              REAL-TIME DISPATCH TELEMETRY
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Client Status & Deployment Dashboard
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-2xl">
              Track real-time engineering milestones, live terminal logs, SLA timers, and configuration deliverables for your ongoing infrastructure tickets.
            </p>
          </div>

          {onOpenQuote && (
            <button
              onClick={onOpenQuote}
              className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold flex items-center gap-2 transition-all shadow-md cursor-pointer self-start md:self-auto"
            >
              <PlusCircle className="w-4 h-4 text-cyan-400" />
              Register New Dispatch Ticket
            </button>
          )}
        </div>

        {/* Ticket Lookup & Quick Switcher Strip */}
        <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 sm:p-6 mb-8 space-y-4 shadow-xl">
          
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Ticket ID (e.g., TS-NET-8492) or Company Name..."
                className="w-full pl-10 pr-24 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-500 font-mono text-xs sm:text-sm focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs font-mono transition-all cursor-pointer"
              >
                Track
              </button>
            </form>

            <button
              onClick={refreshTickets}
              className="px-3 py-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-mono flex items-center justify-center gap-2 cursor-pointer transition-colors"
              title="Refresh tickets from local storage"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Refresh Data</span>
            </button>
          </div>

          {/* Quick Preset Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80">
            <span className="text-[11px] font-mono text-slate-400 uppercase mr-1">
              Active Deployments:
            </span>
            {tickets.map((t) => (
              <button
                key={t.ticketId}
                onClick={() => {
                  setSelectedTicketId(t.ticketId);
                  setSearchInput('');
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 cursor-pointer ${
                  selectedTicketId.toLowerCase() === t.ticketId.toLowerCase()
                    ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20 scale-[1.02]'
                    : 'bg-slate-950 text-slate-300 border border-slate-800 hover:border-slate-700'
                }`}
              >
                <span>{t.ticketId}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${
                  selectedTicketId.toLowerCase() === t.ticketId.toLowerCase()
                    ? 'bg-slate-950 text-cyan-300'
                    : t.status === 'Completed' ? 'bg-emerald-950 text-emerald-400' :
                      t.status === 'In Progress' ? 'bg-cyan-950 text-cyan-400' : 'bg-amber-950 text-amber-400'
                }`}>
                  {t.overallProgress}%
                </span>
              </button>
            ))}
          </div>

        </div>

        {/* Selected Ticket Main Panel */}
        <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Top Status Header */}
          <div className="p-6 sm:p-8 bg-slate-950 border-b border-slate-800 space-y-6">
            
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Ticket Identification */}
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <span className="px-3 py-1 rounded-lg bg-cyan-950 text-cyan-300 border border-cyan-800 font-mono text-sm font-extrabold tracking-wider">
                    {activeTicket.ticketId}
                  </span>

                  <span className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 ${
                    activeTicket.status === 'Completed'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : activeTicket.status === 'In Progress'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {activeTicket.status === 'Completed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    )}
                    {activeTicket.status.toUpperCase()}
                  </span>

                  <span className={`px-2.5 py-1 rounded-lg text-xs font-mono ${
                    activeTicket.priority === 'Critical'
                      ? 'bg-rose-950 text-rose-400 border border-rose-800 font-bold'
                      : 'bg-slate-900 text-slate-300 border border-slate-800'
                  }`}>
                    {activeTicket.priority} Priority
                  </span>

                  <span className="text-xs font-mono text-slate-400">
                    Created: {activeTicket.createdAt}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                  {activeTicket.title}
                </h3>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-300 pt-1">
                  <span className="flex items-center gap-1.5 text-cyan-300">
                    <UserCheck className="w-4 h-4 text-cyan-400" />
                    {activeTicket.clientName} ({activeTicket.companyName})
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-slate-400">
                    Assigned: <strong className="text-slate-200">{activeTicket.assignedEngineer}</strong>
                  </span>
                  <span className="text-slate-600">•</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    SLA: {activeTicket.slaTier} ({activeTicket.timeRemaining})
                  </span>
                </div>
              </div>

              {/* Progress Dial Block */}
              <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 lg:min-w-[240px] space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 uppercase">Deployment Progress:</span>
                  <span className="text-cyan-400 font-bold text-base">{activeTicket.overallProgress}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-3 rounded-full bg-slate-950 overflow-hidden border border-slate-800 p-0.5">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 via-teal-400 to-emerald-400 transition-all duration-700"
                    style={{ width: `${activeTicket.overallProgress}%` }}
                  />
                </div>

                <div className="text-[11px] font-mono text-slate-400 flex justify-between pt-1">
                  <span>Target: {activeTicket.estimatedCompletion}</span>
                  <span className="text-emerald-400 font-semibold">{activeTicket.milestones.filter(m => m.status === 'completed').length}/{activeTicket.milestones.length} Steps</span>
                </div>
              </div>

            </div>

            {/* Current Phase Highlight Box */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider block">
                  ACTIVE PHASE IN PROGRESS:
                </span>
                <p className="text-sm font-semibold text-slate-100">
                  {activeTicket.currentMilestone}
                </p>
                <p className="text-xs text-slate-400 font-sans">
                  {activeTicket.scopeSummary}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  onClick={handlePingEngineer}
                  disabled={isPingingEngineer}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isPingingEngineer ? 'animate-spin' : ''}`} />
                  {isPingingEngineer ? 'Pinging Engineer...' : 'Ping Dispatch Telemetry'}
                </button>

                <a
                  href={generateTicketWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-all shadow-md"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  Live Chat with Engineer
                </a>
              </div>
            </div>

            {/* Ping Feedback Alert */}
            {pingSuccessMessage && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{pingSuccessMessage}</span>
              </div>
            )}

          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 sm:px-8 overflow-x-auto gap-2">
            {[
              { id: 'milestones', label: 'Milestone Roadmap', icon: Layers },
              { id: 'logs', label: 'Live CLI & Telemetry Logs', icon: Terminal },
              { id: 'metrics', label: 'Network & System Telemetry', icon: TrendingUp },
              { id: 'deliverables', label: 'As-Built Deliverables', icon: FileText },
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-4 px-4 font-mono text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-cyan-400 text-cyan-300 bg-slate-900/40'
                      : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab 1: Milestone Roadmap */}
          {activeTab === 'milestones' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="space-y-4">
                {activeTicket.milestones.map((m, index) => {
                  const isCompleted = m.status === 'completed';
                  const isCurrent = m.status === 'current';
                  const isPending = m.status === 'pending';

                  return (
                    <div
                      key={m.id}
                      className={`p-5 rounded-2xl border transition-all ${
                        isCurrent
                          ? 'bg-slate-950 border-cyan-500/60 shadow-lg shadow-cyan-950/40 scale-[1.01]'
                          : isCompleted
                          ? 'bg-slate-950/80 border-slate-800'
                          : 'bg-slate-950/40 border-slate-900 opacity-70'
                      }`}
                    >
                      <div className="flex items-start gap-4">
                        
                        {/* Step Number / Icon */}
                        <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 font-mono font-bold text-xs ${
                          isCompleted
                            ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                            : isCurrent
                            ? 'bg-cyan-950 text-cyan-300 border border-cyan-500 animate-pulse'
                            : 'bg-slate-900 text-slate-500 border border-slate-800'
                        }`}>
                          {isCompleted ? <Check className="w-5 h-5" /> : `0${index + 1}`}
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-1">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h4 className={`text-sm sm:text-base font-bold ${
                              isCurrent ? 'text-white' : isCompleted ? 'text-slate-200' : 'text-slate-400'
                            }`}>
                              {m.name}
                            </h4>

                            <div className="flex items-center gap-2">
                              {m.timestamp && (
                                <span className="text-[11px] font-mono text-slate-400">
                                  {m.timestamp}
                                </span>
                              )}
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                                isCompleted
                                  ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                                  : isCurrent
                                  ? 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                                  : 'bg-slate-900 text-slate-500 border border-slate-800'
                              }`}>
                                {m.status}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed font-mono">
                            {m.details}
                          </p>
                        </div>

                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Tab 2: Live CLI & Telemetry Logs */}
          {activeTab === 'logs' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white font-mono flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    Live System & Field Audit Stream
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Streaming syslog and remote engineer telemetry for ticket {activeTicket.ticketId}
                  </p>
                </div>

                <span className="text-xs font-mono text-emerald-400 bg-emerald-950 px-2.5 py-1 rounded-lg border border-emerald-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Live Sync Active
                </span>
              </div>

              {/* Terminal Window */}
              <div className="rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs overflow-hidden shadow-2xl">
                <div className="px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between text-slate-400 text-[11px]">
                  <span>dispatch-stream://syslog/{activeTicket.ticketId.toLowerCase()}</span>
                  <span>Buffer: 100% Nominal</span>
                </div>

                <div className="p-4 sm:p-6 space-y-3 max-h-96 overflow-y-auto">
                  {activeTicket.liveLogs.map((log, i) => (
                    <div key={i} className="flex items-start gap-3 text-xs leading-relaxed">
                      <span className="text-slate-500 text-[11px] shrink-0 font-bold">
                        [{log.time}]
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold shrink-0 ${
                        log.type === 'success' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                        log.type === 'warning' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                        log.type === 'diagnostic' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                        'bg-cyan-950 text-cyan-400 border border-cyan-800'
                      }`}>
                        {log.type}
                      </span>
                      <span className="text-slate-200">
                        {log.message}
                      </span>
                    </div>
                  ))}

                  <div className="pt-2 text-slate-600 text-[11px] italic">
                    -- End of buffer. Listening for active engineer socket events... --
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Network & System Telemetry Metrics */}
          {activeTab === 'metrics' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white font-mono flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-cyan-400" />
                    Verified Performance & Hardening Telemetry
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Live audit statistics recorded during deployment phases
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {activeTicket.metrics.map((metric, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                    <span className="text-slate-400 text-xs font-mono uppercase block">
                      {metric.label}
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300">
                      {metric.value}
                    </div>
                    {metric.unit && (
                      <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        {metric.unit}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* SLA & Security Compliance Card */}
              <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-slate-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Zero-Trust & SLA Compliance Verification
                  </div>
                  <p className="text-xs text-slate-400 font-sans">
                    All network ACLs, DNS records, and firewall state tables pass NIST SP 800-53 and CIS hardening baselines.
                  </p>
                </div>

                <div className="text-right">
                  <span className="px-3 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-bold">
                    PASSED AUDIT 100%
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: As-Built Deliverables */}
          {activeTab === 'deliverables' && (
            <div className="p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white font-mono flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    As-Built Documentation & Configuration Exports
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Download official topology schematics, backup XMLs, and security audit sign-offs
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeTicket.deliverables.map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-slate-200 font-mono">
                          {item.name}
                        </div>
                        <div className="text-[11px] font-mono text-slate-400 uppercase mt-0.5">
                          Type: {item.type.toUpperCase()} • Status: {item.status}
                        </div>
                      </div>
                    </div>

                    {item.status === 'ready' ? (
                      <button
                        onClick={() => handleDownloadDeliverable(item.name)}
                        className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-md shadow-cyan-500/20"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Download
                      </button>
                    ) : (
                      <span className="px-3 py-1.5 rounded-xl bg-slate-900 text-slate-500 text-xs font-mono border border-slate-800">
                        Generating...
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {downloadedDoc && (
                <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Downloaded file: <strong>{downloadedDoc}</strong></span>
                </div>
              )}
            </div>
          )}

          {/* Footer Contact Strip */}
          <div className="p-6 bg-slate-950 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Need immediate emergency support for Ticket {activeTicket.ticketId}?</span>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={generateTicketWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline flex items-center gap-1"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp Tech Support
              </a>
              <span className="text-slate-700">|</span>
              <button
                onClick={() => onOpenAiTriage && onOpenAiTriage(activeTicket.service)}
                className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Run AI Incident Check
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
