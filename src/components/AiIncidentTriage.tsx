import React, { useState } from 'react';
import { 
  Sparkles, 
  Terminal, 
  X, 
  Send, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Check, 
  Clock, 
  ShieldAlert, 
  PhoneCall, 
  RefreshCw,
  Zap
} from 'lucide-react';
import { DiagnosticResult } from '../types';

interface AiIncidentTriageProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
  onEscalateToDispatch: (issueSummary: string) => void;
}

const PRESET_SCENARIOS = [
  {
    title: 'Email Spoofing & Delivery Failures',
    category: 'Web & Mail Hosting',
    desc: 'Sent emails to Gmail and Yahoo are bouncing with 550 SPF or DMARC unauthenticated rejection errors.'
  },
  {
    title: 'Intermittent CCTV Camera Dropouts',
    category: 'CCTV & Physical Security',
    desc: '4K IP cameras on Switch Port 12-16 disconnect when night IR illuminators kick in. NVR shows packet timeouts.'
  },
  {
    title: 'Inter-VLAN Packet Loss / Drop',
    category: 'Network & Network Security',
    desc: 'Clients on VLAN 30 cannot reach internal ERP database on VLAN 10 despite routing rule enabled on pfSense.'
  },
  {
    title: 'Brute-Force Attack on SSH Port 22',
    category: 'Cyber Security',
    desc: 'Server CPU spiking with thousands of failed SSH authentication attempts from botnet subnets in auth.log.'
  }
];

export const AiIncidentTriage: React.FC<AiIncidentTriageProps> = ({
  isOpen,
  onClose,
  initialCategory = 'Network & Security',
  onEscalateToDispatch
}) => {
  const [category, setCategory] = useState(initialCategory);
  const [issueDescription, setIssueDescription] = useState('');
  const [environmentDetails, setEnvironmentDetails] = useState('');
  const [urgency, setUrgency] = useState<'Low' | 'Moderate' | 'High' | 'Critical'>('High');

  const [isLoading, setIsLoading] = useState(false);
  const [diagnostic, setDiagnostic] = useState<DiagnosticResult | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleRunDiagnostic = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!issueDescription.trim()) return;

    setIsLoading(true);
    setDiagnostic(null);

    try {
      const response = await fetch('/api/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category,
          issueDescription,
          environmentDetails,
          urgency
        })
      });

      if (!response.ok) {
        throw new Error('Diagnostic service failed');
      }

      const data = await response.json();
      setDiagnostic(data);
    } catch (err) {
      console.error(err);
      // Fallback response
      setDiagnostic({
        analysis: `Diagnostic for ${category}: Issue symptoms point towards routing policy drops or service timeout.`,
        likelyCauses: [
          'Firewall ACL / stateful packet filter rule drop',
          'DNS resolution failure or stale cache record',
          'MTU fragmentation or switch port negotiation mismatch'
        ],
        recommendedCommands: [
          'ping -c 4 1.1.1.1',
          'traceroute -n destination.ip',
          'dmesg -T | grep -i error'
        ],
        severity: urgency,
        estimatedResolutionTime: '30 - 60 minutes',
        recommendedAction: 'Verify Layer 2/3 connectivity and escalate for direct engineer intervention.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyCommand = (cmd: string, index: number) => {
    navigator.clipboard.writeText(cmd);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSelectPreset = (preset: typeof PRESET_SCENARIOS[0]) => {
    setCategory(preset.category);
    setIssueDescription(preset.desc);
    setEnvironmentDetails('Standard production environment with managed switch & firewall');
    setUrgency('High');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        id="ai-triage-modal"
        className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-mono flex items-center gap-2">
                AI Incident Troubleshooter & Triage
              </h3>
              <p className="text-xs text-slate-400">
                Powered by Gemini 3.7 Flash • Generates root cause hypotheses and CLI fixes
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Quick Scenario Preset Chips */}
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase block mb-2">
              ⚡ Quick Incident Presets (Click to load):
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {PRESET_SCENARIOS.map((preset, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-cyan-500/50 text-left text-xs transition-all cursor-pointer group"
                >
                  <div className="font-bold text-slate-200 group-hover:text-cyan-300 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-cyan-400" />
                    {preset.title}
                  </div>
                  <div className="text-[11px] text-slate-400 truncate mt-0.5">{preset.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleRunDiagnostic} className="space-y-4 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 block mb-1">Infrastructure Domain:</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Network & Network Security">Network & Network Security</option>
                  <option value="Web & Mail Hosting">Web & Mail Hosting (DNS/SPF)</option>
                  <option value="Cyber Security">Cyber Security & Hardening</option>
                  <option value="CCTV & Physical Security">CCTV & Access Control</option>
                  <option value="System Automation">System Automation & Scripting</option>
                  <option value="Cloud & Hybrid Infrastructure">Cloud & Hybrid Services</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Reported Severity / Urgency:</label>
                <select
                  value={urgency}
                  onChange={(e: any) => setUrgency(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Critical">🔴 Critical (Total Service Outage / Breach)</option>
                  <option value="High">🟠 High (Degraded Performance / Packet Loss)</option>
                  <option value="Moderate">🟡 Moderate (Single User / Feature Issue)</option>
                  <option value="Low">🟢 Low (Configuration Inquiry / Sizing)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Issue Description & Observed Symptoms:</label>
              <textarea
                rows={3}
                value={issueDescription}
                onChange={(e) => setIssueDescription(e.target.value)}
                placeholder="e.g. Emails bouncing with '550 5.7.26 This message does not pass authentication checks (DMARC)'. We recently updated our DNS nameservers."
                className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                required
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">Hardware / OS / Environment (Optional):</label>
              <input
                type="text"
                value={environmentDetails}
                onChange={(e) => setEnvironmentDetails(e.target.value)}
                placeholder="e.g. pfSense 2.7, Cisco SG350, Microsoft 365, Ubuntu 24.04 LTS"
                className="w-full p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              id="submit-diagnostic-btn"
              type="submit"
              disabled={isLoading || !issueDescription.trim()}
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Analyzing Telemetry & Generating Hypotheses...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Run AI Diagnostic & CLI Triage
                </>
              )}
            </button>
          </form>

          {/* Diagnostic Results Card */}
          {diagnostic && (
            <div className="rounded-xl bg-slate-950 border border-cyan-500/40 p-5 space-y-5 font-mono text-xs">
              
              {/* Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold text-white uppercase">Diagnostic Assessment</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    diagnostic.severity === 'Critical' ? 'bg-rose-950 text-rose-400 border border-rose-800' :
                    diagnostic.severity === 'High' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    Severity: {diagnostic.severity}
                  </span>
                  <span className="text-slate-400 text-[10px] flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Est: {diagnostic.estimatedResolutionTime}
                  </span>
                </div>
              </div>

              {/* Analysis Text */}
              <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 leading-relaxed">
                {diagnostic.analysis}
              </div>

              {/* Likely Root Causes */}
              <div className="space-y-2">
                <span className="text-slate-400 text-[11px] uppercase block">Likely Root Causes:</span>
                <div className="space-y-1.5">
                  {diagnostic.likelyCauses.map((cause, i) => (
                    <div key={i} className="flex items-start gap-2 text-slate-300 bg-slate-900/60 p-2 rounded border border-slate-800/80">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span>{cause}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Diagnostic CLI Commands */}
              <div className="space-y-2">
                <span className="text-slate-400 text-[11px] uppercase block">Recommended CLI Diagnostic Commands:</span>
                <div className="space-y-1.5">
                  {diagnostic.recommendedCommands.map((cmd, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px]">
                      <span className="text-emerald-400 break-all select-all">{cmd}</span>
                      <button
                        type="button"
                        onClick={() => copyCommand(cmd, i)}
                        className="ml-2 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] flex items-center gap-1 shrink-0"
                      >
                        {copiedIndex === i ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        {copiedIndex === i ? 'Copied' : 'Copy'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Action & Escalate CTA */}
              <div className="p-3.5 rounded-lg bg-cyan-950/40 border border-cyan-800/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <span className="text-cyan-400 text-[10px] uppercase font-bold block">Recommended Action:</span>
                  <p className="text-slate-200 text-xs mt-0.5">{diagnostic.recommendedAction}</p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onEscalateToDispatch(`AI Triage [${diagnostic.severity}]: ${issueDescription}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  Escalate to Engineer
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
