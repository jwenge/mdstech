import React, { useState } from 'react';
import { 
  Wrench, 
  Calculator, 
  Video, 
  Radio, 
  Lock, 
  Copy, 
  Check, 
  Search, 
  Terminal,
  HardDrive,
  Network,
  Cpu,
  Layers
} from 'lucide-react';
import { calculateSubnet, calculateCctvStorage, COMMON_PORTS, PortDetail } from '../utils/techCalculators';

export const InteractiveTechTools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'subnet' | 'cctv' | 'mail-dns' | 'ports'>('subnet');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // 1. Subnet Calculator State
  const [ipInput, setIpInput] = useState('192.168.10.0');
  const [cidrInput, setCidrInput] = useState(24);
  const subnetResult = calculateSubnet(ipInput, cidrInput);

  // 2. CCTV Calculator State
  const [cctvCameras, setCctvCameras] = useState(16);
  const [cctvResolution, setCctvResolution] = useState<'720p' | '1080p' | '2k' | '4k' | '8k'>('4k');
  const [cctvFps, setCctvFps] = useState(25);
  const [cctvCompression, setCctvCompression] = useState<'h264' | 'h265' | 'h265_plus'>('h265_plus');
  const [cctvRetention, setCctvRetention] = useState(30);
  const [cctvMotionHours, setCctvMotionHours] = useState(16);
  const cctvResult = calculateCctvStorage(
    cctvCameras,
    cctvResolution,
    cctvFps,
    cctvCompression,
    cctvRetention,
    cctvMotionHours
  );

  // 3. Mail DNS Record Generator State
  const [mailDomain, setMailDomain] = useState('company.com');
  const [mailProvider, setMailProvider] = useState<'m365' | 'google' | 'custom'>('m365');
  const [dmarcPolicy, setDmarcPolicy] = useState<'reject' | 'quarantine' | 'none'>('reject');
  const [reportEmail, setReportEmail] = useState('dmarc-reports@company.com');

  const generatedSpf = mailProvider === 'm365'
    ? `v=spf1 include:spf.protection.outlook.com ~all`
    : mailProvider === 'google'
    ? `v=spf1 include:_spf.google.com ~all`
    : `v=spf1 ip4:198.51.100.10 ~all`;

  const generatedDmarc = `v=DMARC1; p=${dmarcPolicy}; rua=mailto:${reportEmail}; pct=100; adkim=s; aspf=s`;

  // 4. Port Lookup State
  const [portSearch, setPortSearch] = useState('');
  const filteredPorts = COMMON_PORTS.filter(p => 
    p.port.toString().includes(portSearch) ||
    p.service.toLowerCase().includes(portSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(portSearch.toLowerCase()) ||
    p.description.toLowerCase().includes(portSearch.toLowerCase())
  );

  return (
    <section id="tools" className="py-24 bg-slate-950 relative border-t border-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-400 mb-3">
            <Wrench className="w-3.5 h-3.5" />
            ENGINEER TOOLKIT & CALCULATORS
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Interactive Network & Security Utilities
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Real calculation engines used during planning, sizing, and audit deployments.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex p-1.5 rounded-2xl bg-slate-900 border border-slate-800 gap-1 overflow-x-auto max-w-full">
            <button
              onClick={() => setActiveTab('subnet')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'subnet'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Network className="w-4 h-4" />
              Subnet & CIDR
            </button>

            <button
              onClick={() => setActiveTab('cctv')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'cctv'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Video className="w-4 h-4" />
              CCTV Storage & Bandwidth
            </button>

            <button
              onClick={() => setActiveTab('mail-dns')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'mail-dns'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Radio className="w-4 h-4" />
              Mail SPF / DMARC
            </button>

            <button
              onClick={() => setActiveTab('ports')}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                activeTab === 'ports'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Lock className="w-4 h-4" />
              Port Intelligence
            </button>
          </div>
        </div>

        {/* Tab 1: Subnet Calculator */}
        {activeTab === 'subnet' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-cyan-400" />
                  IPv4 Subnet & Mask Calculator
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Computes usable IP ranges, wildcard masks, broadcast addresses, and binary values.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">IP Address / Network:</label>
                  <input
                    type="text"
                    value={ipInput}
                    onChange={(e) => setIpInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500"
                    placeholder="192.168.1.0"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>CIDR Prefix:</span>
                    <span className="text-cyan-400 font-bold">/{cidrInput}</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="32"
                    value={cidrInput}
                    onChange={(e) => setCidrInput(parseInt(e.target.value, 10))}
                    className="w-full accent-cyan-500"
                  />
                </div>

                {/* Preset Quick Buttons */}
                <div>
                  <label className="text-slate-400 text-[11px] block mb-1.5">Common Subnet Presets:</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { label: '/24 Standard (254 hosts)', cidr: 24, ip: '192.168.1.0' },
                      { label: '/28 Subnet (14 hosts)', cidr: 28, ip: '192.168.1.0' },
                      { label: '/29 WAN (6 hosts)', cidr: 29, ip: '198.51.100.0' },
                      { label: '/30 P2P (2 hosts)', cidr: 30, ip: '10.0.0.0' },
                    ].map((preset, i) => (
                      <button
                        key={i}
                        onClick={() => {
                          setIpInput(preset.ip);
                          setCidrInput(preset.cidr);
                        }}
                        className="p-2 rounded bg-slate-950 border border-slate-800 hover:border-cyan-500/50 text-[10px] text-slate-300 text-center cursor-pointer"
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Subnet Results Output */}
            <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-6 space-y-4 font-mono text-xs">
              {subnetResult ? (
                <>
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <span className="text-cyan-400 font-bold text-sm">
                      {subnetResult.networkAddress}/{subnetResult.cidr}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 text-[11px]">
                      {subnetResult.ipClass}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80">
                      <span className="text-slate-500 text-[10px] block">Subnet Netmask:</span>
                      <span className="text-slate-100 font-bold">{subnetResult.netmask}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80">
                      <span className="text-slate-500 text-[10px] block">Wildcard Inverted Mask:</span>
                      <span className="text-slate-100 font-bold">{subnetResult.wildcard}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80">
                      <span className="text-slate-500 text-[10px] block">Network Address (ID):</span>
                      <span className="text-cyan-300 font-bold">{subnetResult.networkAddress}</span>
                    </div>

                    <div className="p-3 rounded-lg bg-slate-900/80 border border-slate-800/80">
                      <span className="text-slate-500 text-[10px] block">Broadcast Address:</span>
                      <span className="text-cyan-300 font-bold">{subnetResult.broadcastAddress}</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-lg bg-slate-900/90 border border-slate-800 space-y-1">
                    <span className="text-slate-400 text-[11px] block">Usable Host Range:</span>
                    <div className="text-emerald-400 font-bold text-sm">
                      {subnetResult.usableHostRange}
                    </div>
                    <div className="text-slate-500 text-[10px] pt-1">
                      Usable Hosts: <strong className="text-slate-200">{subnetResult.usableHosts.toLocaleString()}</strong> of {subnetResult.totalHosts.toLocaleString()} total IP allocations
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-900/50 border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block">Binary Subnet Representation:</span>
                    <span className="text-slate-400 text-[11px] break-all">{subnetResult.binarySubnet}</span>
                  </div>
                </>
              ) : (
                <div className="text-rose-400 text-center py-8">
                  Invalid IPv4 address format. Please enter a valid 4-octet address (e.g. 192.168.1.0).
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: CCTV Storage & Bandwidth Calculator */}
        {activeTab === 'cctv' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
            <div className="lg:col-span-6 space-y-5">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Video className="w-5 h-5 text-amber-400" />
                  CCTV NVR Storage & Bandwidth Sizer
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Calculates total RAID array capacity and PoE switch throughput based on codec, FPS, and retention.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Number of IP Cameras:</span>
                    <span className="text-amber-400 font-bold">{cctvCameras} Cameras</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="64"
                    value={cctvCameras}
                    onChange={(e) => setCctvCameras(parseInt(e.target.value, 10))}
                    className="w-full accent-amber-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-slate-300 block mb-1 text-[11px]">Stream Resolution:</label>
                    <select
                      value={cctvResolution}
                      onChange={(e: any) => setCctvResolution(e.target.value)}
                      className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                    >
                      <option value="720p">720p HD (1 MP)</option>
                      <option value="1080p">1080p Full HD (2 MP)</option>
                      <option value="2k">2K Quad HD (4 MP)</option>
                      <option value="4k">4K Ultra HD (8 MP)</option>
                      <option value="8k">8K Ultra HD (32 MP)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-slate-300 block mb-1 text-[11px]">Compression Codec:</label>
                    <select
                      value={cctvCompression}
                      onChange={(e: any) => setCctvCompression(e.target.value)}
                      className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                    >
                      <option value="h265_plus">H.265+ (Smart AI Motion - 65% save)</option>
                      <option value="h265">H.265 (HEVC Standard - 45% save)</option>
                      <option value="h264">H.264 (Legacy AVC)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex justify-between text-slate-300 mb-1 text-[11px]">
                      <span>Frame Rate (FPS):</span>
                      <span className="text-amber-400">{cctvFps} FPS</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="30"
                      step="5"
                      value={cctvFps}
                      onChange={(e) => setCctvFps(parseInt(e.target.value, 10))}
                      className="w-full accent-amber-500"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-slate-300 mb-1 text-[11px]">
                      <span>Retention (Days):</span>
                      <span className="text-amber-400">{cctvRetention} Days</span>
                    </div>
                    <input
                      type="range"
                      min="7"
                      max="90"
                      step="7"
                      value={cctvRetention}
                      onChange={(e) => setCctvRetention(parseInt(e.target.value, 10))}
                      className="w-full accent-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Deck */}
            <div className="lg:col-span-6 rounded-xl bg-slate-950 border border-slate-800 p-6 space-y-4 font-mono text-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
                  <span className="text-xs font-mono text-slate-400 uppercase">CALCULATED STORAGE REQUIREMENT</span>
                  <span className="text-amber-400 font-bold">{cctvCameras}x {cctvResolution.toUpperCase()}</span>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Total RAW Storage Needed:</span>
                    <div className="text-2xl font-extrabold text-amber-300 mt-1">
                      {cctvResult.totalStorageTB} <span className="text-sm font-normal text-slate-400">TB</span>
                    </div>
                    <span className="text-[10px] text-slate-500">({cctvResult.totalStorageGB.toLocaleString()} GB)</span>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Continuous Network Bitrate:</span>
                    <div className="text-2xl font-extrabold text-cyan-300 mt-1">
                      {cctvResult.totalBitrateMbps} <span className="text-sm font-normal text-slate-400">Mbps</span>
                    </div>
                    <span className="text-[10px] text-slate-500">({cctvResult.bandwidthMBps} MB/s throughput)</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-amber-500/30 space-y-1.5">
                  <span className="text-slate-400 text-[11px] block">Recommended Hardware Specification:</span>
                  <div className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    <HardDrive className="w-4 h-4 text-amber-400" />
                    {cctvResult.recommendedHDD}
                  </div>
                  <p className="text-[10px] text-slate-400 pt-1">
                    Calculated for dedicated Surveillance Grade drives (24/7 write cycles & vibration damping).
                  </p>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-800 flex justify-between">
                <span>Monthly Bandwidth: ~{cctvResult.monthlyBandwidthGB.toLocaleString()} GB</span>
                <span>PoE Budget: ~{cctvCameras * 15}W Estimated</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Mail DNS Record Generator */}
        {activeTab === 'mail-dns' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8">
            <div className="lg:col-span-5 space-y-5">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Radio className="w-5 h-5 text-emerald-400" />
                  Mail SPF & DMARC Generator
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Generates RFC-compliant email authentication TXT records to prevent spoofing and guarantee inbox delivery.
                </p>
              </div>

              <div className="space-y-4 font-mono text-xs">
                <div>
                  <label className="text-slate-300 block mb-1">Target Domain Name:</label>
                  <input
                    type="text"
                    value={mailDomain}
                    onChange={(e) => setMailDomain(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500"
                    placeholder="example.com"
                  />
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Primary Email Infrastructure:</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => setMailProvider('m365')}
                      className={`p-2 rounded border text-[11px] transition-all cursor-pointer ${
                        mailProvider === 'm365' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      Microsoft 365
                    </button>
                    <button
                      onClick={() => setMailProvider('google')}
                      className={`p-2 rounded border text-[11px] transition-all cursor-pointer ${
                        mailProvider === 'google' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      Google Mails
                    </button>
                    <button
                      onClick={() => setMailProvider('custom')}
                      className={`p-2 rounded border text-[11px] transition-all cursor-pointer ${
                        mailProvider === 'custom' ? 'bg-emerald-500 text-slate-950 font-bold border-emerald-400' : 'bg-slate-950 text-slate-300 border-slate-800'
                      }`}
                    >
                      Custom Postfix
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">DMARC Enforcement Policy:</label>
                  <select
                    value={dmarcPolicy}
                    onChange={(e: any) => setDmarcPolicy(e.target.value)}
                    className="w-full p-2 rounded bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                  >
                    <option value="reject">p=reject (Highest Security - Reject all spoofed emails)</option>
                    <option value="quarantine">p=quarantine (Moderate - Send failed emails to Spam)</option>
                    <option value="none">p=none (Audit only - Deliver all with reports)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-300 block mb-1">Forensic Aggregate Report Email (rua):</label>
                  <input
                    type="text"
                    value={reportEmail}
                    onChange={(e) => setReportEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>
            </div>

            {/* Generated TXT Records */}
            <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800 p-6 space-y-4 font-mono text-xs">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-xs text-emerald-400 font-bold uppercase">COPY-PASTE DNS TXT RECORDS</span>
                <span className="text-[10px] text-slate-400">RFC 7208 / RFC 7489 Compliant</span>
              </div>

              {/* Record 1: SPF */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300">1. SPF Record (TXT @)</span>
                  <button
                    onClick={() => copyToClipboard(generatedSpf, 'spf')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedId === 'spf' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'spf' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-emerald-300 break-all select-all">
                  {generatedSpf}
                </div>
              </div>

              {/* Record 2: DMARC */}
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-slate-300">2. DMARC Record (TXT _dmarc.{mailDomain})</span>
                  <button
                    onClick={() => copyToClipboard(generatedDmarc, 'dmarc')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedId === 'dmarc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    {copiedId === 'dmarc' ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-cyan-300 break-all select-all">
                  {generatedDmarc}
                </div>
              </div>

              {/* Notice */}
              <p className="text-[11px] text-slate-500 leading-relaxed pt-2">
                Note: Ensure DKIM 2048-bit CNAME or TXT keys are exported directly from your mail portal (e.g. Defender Portal / Google Workspace Admin) and verified prior to enabling <code className="text-emerald-400">p=reject</code>.
              </p>
            </div>
          </div>
        )}

        {/* Tab 4: Port Intelligence Lookup */}
        {activeTab === 'ports' && (
          <div className="rounded-2xl bg-slate-900/60 border border-slate-800 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Lock className="w-5 h-5 text-rose-400" />
                  Port & Protocol Intelligence Lookup
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Quick security audit reference for standard and proprietary service ports.
                </p>
              </div>

              <div className="relative w-full sm:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={portSearch}
                  onChange={(e) => setPortSearch(e.target.value)}
                  placeholder="Search port, protocol, service..."
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs focus:outline-none focus:border-cyan-500 font-mono"
                />
              </div>
            </div>

            {/* Ports Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-800">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[11px]">
                  <tr>
                    <th className="p-3.5">PORT</th>
                    <th className="p-3.5">PROTOCOL</th>
                    <th className="p-3.5">SERVICE / DOMAIN</th>
                    <th className="p-3.5">CATEGORY</th>
                    <th className="p-3.5">SECURITY AUDIT RECOMMENDATION</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 bg-slate-900/40">
                  {filteredPorts.map((item) => (
                    <tr key={item.port} className="hover:bg-slate-850/60 transition-colors">
                      <td className="p-3.5 font-bold text-cyan-300">{item.port}</td>
                      <td className="p-3.5 text-slate-400">{item.protocol}</td>
                      <td className="p-3.5 text-slate-200 font-semibold">{item.service}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-slate-950 border border-slate-800 text-[10px] text-slate-300">
                          {item.category}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-300 text-[11px] leading-relaxed max-w-md">
                        {item.securityRecommendation}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
