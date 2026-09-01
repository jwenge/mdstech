import React, { useState, useEffect } from 'react';
import { 
  PhoneCall, 
  X, 
  CheckCircle2, 
  Layers, 
  Clock, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  FileText,
  AlertCircle,
  Activity
} from 'lucide-react';
import { SERVICE_PACKAGES } from '../data/specializations';
import { createNewTicketFromDispatch } from '../data/tickets';

interface ServiceQuoteEstimatorProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledScope?: string;
  onViewTicket?: (ticketId: string) => void;
}

export const ServiceQuoteEstimator: React.FC<ServiceQuoteEstimatorProps> = ({
  isOpen,
  onClose,
  prefilledScope = '',
  onViewTicket
}) => {
  const [selectedService, setSelectedService] = useState('Network & Security Engineering');
  const [infraScale, setInfraScale] = useState<'small' | 'medium' | 'enterprise'>('medium');
  const [slaSpeed, setSlaSpeed] = useState<'emergency' | 'sameday' | 'scheduled'>('emergency');
  
  const [includeBackupSync, setIncludeBackupSync] = useState(true);
  const [includeHardening, setIncludeHardening] = useState(true);
  const [includeMonitoring, setIncludeMonitoring] = useState(true);
  const [includeDmarc, setIncludeDmarc] = useState(false);

  const [clientName, setClientName] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState(prefilledScope);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [createdTicketId, setCreatedTicketId] = useState<string>('');

  useEffect(() => {
    if (prefilledScope) {
      setClientNotes(prefilledScope);
    }
  }, [prefilledScope]);

  if (!isOpen) return null;

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new live persistent ticket
    const newTicket = createNewTicketFromDispatch({
      clientName: clientName || 'Valued Client',
      companyName: clientCompany || 'Corporate Partner',
      service: selectedService,
      notes: clientNotes,
      scale: infraScale,
      urgency: slaSpeed
    });

    setCreatedTicketId(newTicket.ticketId);
    setIsSubmitted(true);
  };

  const generateWhatsAppMessage = () => {
    const text = `Hello TechSec Support! I have registered a dispatch ticket.
Ticket ID: ${createdTicketId || 'Pending'}
Service: ${selectedService}
Scale: ${infraScale.toUpperCase()}
SLA: ${slaSpeed.toUpperCase()}
Name: ${clientName || 'Client'} (${clientCompany || 'Business'})
Notes: ${clientNotes || 'Standard inquiry'}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div 
        id="quote-estimator-modal"
        className="w-full max-w-3xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden my-8"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-950 border border-cyan-800 text-cyan-400">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-mono">
                Scope Estimator & Dispatch Request
              </h3>
              <p className="text-xs text-slate-400">
                Direct technician contact • Emergency 2-hour SLA response or scheduled turnkey rollout
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

        {/* Modal Body */}
        <div className="p-6 max-h-[78vh] overflow-y-auto space-y-6">
          {isSubmitted ? (
            <div className="text-center py-10 space-y-4 font-mono">
              <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-2xl font-bold text-white">Dispatch Ticket Registered!</h4>
              
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-slate-950 border border-cyan-500/50 text-cyan-300 font-mono text-sm font-bold">
                <span>TICKET ID:</span>
                <span className="text-white">{createdTicketId}</span>
              </div>

              <p className="text-slate-300 text-xs sm:text-sm max-w-md mx-auto">
                Your infrastructure ticket has been registered in the system. You can monitor live engineer telemetry, milestones, and deliverables in real time.
              </p>
              
              <div className="pt-4 flex flex-wrap justify-center gap-3">
                {onViewTicket && (
                  <button
                    type="button"
                    onClick={() => {
                      onViewTicket(createdTicketId);
                      setIsSubmitted(false);
                      onClose();
                    }}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
                  >
                    <Activity className="w-4 h-4" />
                    Track in Client Status Dashboard
                  </button>
                )}

                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  WhatsApp Direct Update
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    onClose();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 text-slate-300 text-xs hover:text-white cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmitRequest} className="space-y-6 font-mono text-xs">
              
              {/* Step 1: Service Type */}
              <div>
                <label className="text-slate-300 block mb-2 font-bold text-xs uppercase text-cyan-400">
                  1. Select Primary Service Focus:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Network & Security Engineering',
                    'Web & Mail Hosting (DNS/DMARC)',
                    'CCTV & Biometric Access Control',
                    'Cyber Security & Server Hardening',
                    'System Automation & Backups',
                    'Cloud & Hybrid M365/Proxmox'
                  ].map((service) => (
                    <button
                      key={service}
                      type="button"
                      onClick={() => setSelectedService(service)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        selectedService === service
                          ? 'bg-slate-950 border-cyan-500 text-cyan-300 font-bold shadow-md'
                          : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{service}</span>
                        {selectedService === service && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Scale & SLA Speed */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-300 block mb-1.5 font-bold uppercase text-cyan-400">
                    2. Infrastructure Scale:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'small', label: '1 - 15 Nodes' },
                      { id: 'medium', label: '16 - 60 Nodes' },
                      { id: 'enterprise', label: '60+ Nodes' },
                    ].map((scale) => (
                      <button
                        key={scale.id}
                        type="button"
                        onClick={() => setInfraScale(scale.id as any)}
                        className={`p-2 rounded-lg border text-center text-[11px] transition-all cursor-pointer ${
                          infraScale === scale.id ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                        }`}
                      >
                        {scale.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1.5 font-bold uppercase text-cyan-400">
                    3. Dispatch Urgency:
                  </label>
                  <div className="grid grid-cols-3 gap-1.5">
                    {[
                      { id: 'emergency', label: '🔴 2-Hr SLA' },
                      { id: 'sameday', label: '🟡 Same Day' },
                      { id: 'scheduled', label: '🟢 Scheduled' },
                    ].map((sla) => (
                      <button
                        key={sla.id}
                        type="button"
                        onClick={() => setSlaSpeed(sla.id as any)}
                        className={`p-2 rounded-lg border text-center text-[11px] transition-all cursor-pointer ${
                          slaSpeed === sla.id ? 'bg-cyan-500 text-slate-950 font-bold border-cyan-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                        }`}
                      >
                        {sla.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Step 3: Hardening Add-ons */}
              <div>
                <label className="text-slate-300 block mb-1.5 font-bold uppercase text-cyan-400">
                  4. Recommended Security Add-ons:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                    <span className="text-slate-300 text-[11px]">Encrypted S3 Offsite Backup Cron</span>
                    <input
                      type="checkbox"
                      checked={includeBackupSync}
                      onChange={(e) => setIncludeBackupSync(e.target.checked)}
                      className="accent-cyan-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                    <span className="text-slate-300 text-[11px]">CIS Linux/Windows Server Hardening</span>
                    <input
                      type="checkbox"
                      checked={includeHardening}
                      onChange={(e) => setIncludeHardening(e.target.checked)}
                      className="accent-cyan-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                    <span className="text-slate-300 text-[11px]">Real-Time Telegram Outage Webhook</span>
                    <input
                      type="checkbox"
                      checked={includeMonitoring}
                      onChange={(e) => setIncludeMonitoring(e.target.checked)}
                      className="accent-cyan-500"
                    />
                  </label>

                  <label className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800 cursor-pointer">
                    <span className="text-slate-300 text-[11px]">Strict DMARC `p=reject` Mail Deliverability</span>
                    <input
                      type="checkbox"
                      checked={includeDmarc}
                      onChange={(e) => setIncludeDmarc(e.target.checked)}
                      className="accent-cyan-500"
                    />
                  </label>
                </div>
              </div>

              {/* Step 4: Contact Form */}
              <div className="pt-2 border-t border-slate-800 space-y-3">
                <label className="text-slate-300 block font-bold uppercase text-cyan-400">
                  5. Contact & Deployment Specifics:
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Full Name *"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="Company / Organization Name"
                      value={clientCompany}
                      onChange={(e) => setClientCompany(e.target.value)}
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <input
                      type="email"
                      placeholder="Business Email *"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp Number *"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      required
                      className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <textarea
                    rows={2}
                    placeholder="Brief description of the issue or project goals..."
                    value={clientNotes}
                    onChange={(e) => setClientNotes(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 resize-none"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Transmit Scope & Dispatch Request
                </button>

                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-xl font-bold text-xs bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  Chat on WhatsApp
                </a>
              </div>

            </form>
          )}
        </div>
      </div>
    </div>
  );
};
