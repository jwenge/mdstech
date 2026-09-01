import React, { useState } from 'react';
import { 
  Network, 
  Server, 
  ShieldCheck, 
  Globe, 
  Video, 
  Radio, 
  Cloud, 
  Laptop, 
  PhoneCall, 
  CheckCircle2, 
  Terminal,
  Activity
} from 'lucide-react';

interface TopologyNode {
  id: string;
  label: string;
  zone: string;
  icon: any;
  ip: string;
  subnet: string;
  vlan: string;
  status: 'online' | 'active' | 'hardened';
  details: string[];
  protocols: string[];
}

export const InteractiveTopology: React.FC = () => {
  const [activeNodeId, setActiveNodeId] = useState<string>('firewall');

  const nodes: TopologyNode[] = [
    {
      id: 'isp',
      label: 'Dual WAN ISP Gateway',
      zone: 'WAN Gateway',
      icon: Globe,
      ip: '203.0.113.1 / 198.51.100.1',
      subnet: '/30 BGP Multi-Homing',
      vlan: 'WAN 0 / WAN 1',
      status: 'online',
      details: [
        'Dual fiber uplinks with automated 2.5 Gbps failover',
        'Dynamic BGP / OSPF route metrics',
        'DDoS traffic filtering at edge'
      ],
      protocols: ['BGP-4', 'PPPoE', 'DHCPv6-PD', 'ICMP SLA']
    },
    {
      id: 'firewall',
      label: 'pfSense / FortiGate Next-Gen Firewall',
      zone: 'Core Perimeter',
      icon: ShieldCheck,
      ip: '192.168.1.1 (LAN GW)',
      subnet: '802.1Q Parent Interface',
      vlan: 'Trunk (All VLANs)',
      status: 'hardened',
      details: [
        'Stateful inspection with 10Gbps line-rate throughput',
        'WireGuard & IPsec IKEv2 site-to-site tunnels',
        'Snort / Suricata IDS/IPS engine with live threat feed'
      ],
      protocols: ['WireGuard', 'IPsec', 'Suricata IDS', 'CARP HA']
    },
    {
      id: 'switch',
      label: 'Core 10GbE Managed Switch (L3)',
      zone: 'Core Distribution',
      icon: Server,
      ip: '192.168.1.2',
      subnet: '255.255.255.0 (/24)',
      vlan: 'Management VLAN 99',
      status: 'online',
      details: [
        '48-Port PoE+ 802.3at Power Budget (740W)',
        '802.1X Port Security & Dynamic MAC Limiting',
        'LACP 20Gbps Link Aggregation Trunk to Hypervisors'
      ],
      protocols: ['802.1Q', 'LACP 802.3ad', 'RSTP 802.1w', 'SNMPv3']
    },
    {
      id: 'vlan-corp',
      label: 'VLAN 10: Corporate LAN & AD Servers',
      zone: 'Secure Internal',
      icon: Laptop,
      ip: '192.168.10.0/24',
      subnet: '255.255.255.0 (GW: .1)',
      vlan: 'VLAN 10 (Corp-Trust)',
      status: 'hardened',
      details: [
        'Zero-trust isolation from Guest WiFi & IoT devices',
        'Dedicated Domain Controller & Proxmox Hypervisor',
        'Enforced 802.1X EAP-TLS certificate auth'
      ],
      protocols: ['Kerberos', 'SMB 3.1.1', 'LDAPS', 'DNSSEC']
    },
    {
      id: 'vlan-cctv',
      label: 'VLAN 20: 4K IP CCTV & Biometric Access',
      zone: 'Physical Security',
      icon: Video,
      ip: '192.168.20.0/24',
      subnet: '255.255.255.0 (GW: .1)',
      vlan: 'VLAN 20 (Surveillance)',
      status: 'active',
      details: [
        'Isolated subnet with zero direct public WAN routing',
        '48x 4K H.265+ IP cameras streaming to RAID-6 NVR',
        'ZKTeco Biometric facial turnstile controller'
      ],
      protocols: ['ONVIF Profile S', 'RTSP / H.265+', 'Wiegand', 'PoE+']
    },
    {
      id: 'vlan-guest',
      label: 'VLAN 30: Guest WiFi & Captive Portal',
      zone: 'Isolated Public',
      icon: Radio,
      ip: '192.168.30.0/24',
      subnet: '255.255.255.0 (GW: .1)',
      vlan: 'VLAN 30 (Guest-DMZ)',
      status: 'online',
      details: [
        'Client-to-client isolation (no LAN scanning permitted)',
        'Dynamic bandwidth throttle (15 Mbps cap per client)',
        'Automated 12-hour session expiration'
      ],
      protocols: ['WPA3-Enterprise', 'Captive Portal', 'DNS Shield']
    },
    {
      id: 'vlan-cloud',
      label: 'Hybrid Cloud & S3 Backup Sync',
      zone: 'Cloud Extension',
      icon: Cloud,
      ip: '10.200.0.0/16 (AWS VPC)',
      subnet: 'IPsec Encrypted Tunnel',
      vlan: 'Cloud Bridge',
      status: 'hardened',
      details: [
        'Automated encrypted offsite ZFS snapshots to S3 Glacier',
        'Microsoft Entra ID Hybrid identity synchronization',
        'Automated multi-region failover replication'
      ],
      protocols: ['S3 API', 'Rclone / Restic', 'SAML 2.0', 'BGP over IPsec']
    }
  ];

  const activeNode = nodes.find(n => n.id === activeNodeId) || nodes[1];

  return (
    <section id="topology" className="py-20 bg-slate-950/80 border-t border-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-400 mb-3">
            <Network className="w-3.5 h-3.5" />
            LIVE ARCHITECTURE BLUEPRINT
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Enterprise Network & Security Topology
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Click any node in the topology map below to inspect Layer 2/3 subnets, VLAN segregation rules, and active security protocols.
          </p>
        </div>

        {/* Interactive Layout: Left Node Visualizer Grid, Right Node Telemetry Deck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Visual Map (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-slate-900/60 border border-slate-800 p-6 space-y-6">
            
            {/* Top Tier: WAN */}
            <div className="flex justify-center">
              <button
                onClick={() => setActiveNodeId('isp')}
                className={`w-full max-w-md p-4 rounded-xl border transition-all text-left flex items-center justify-between group cursor-pointer ${
                  activeNodeId === 'isp'
                    ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-950/50 scale-[1.02]'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-cyan-950 border border-cyan-800 text-cyan-400">
                    <Globe className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-cyan-400 uppercase">WAN Perimeter</div>
                    <div className="text-sm font-bold text-slate-100">Dual WAN Fiber Uplink (ISP)</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono text-slate-400">Active Failover</span>
                </div>
              </button>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center">
              <div className="w-0.5 h-6 bg-gradient-to-b from-cyan-500 to-emerald-500 animate-pulse" />
            </div>

            {/* Mid Tier: Firewall */}
            <div className="flex justify-center">
              <button
                onClick={() => setActiveNodeId('firewall')}
                className={`w-full max-w-md p-4 rounded-xl border transition-all text-left flex items-center justify-between group cursor-pointer ${
                  activeNodeId === 'firewall'
                    ? 'bg-slate-900 border-emerald-400 shadow-lg shadow-emerald-950/50 scale-[1.02]'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-emerald-400 uppercase">Perimeter Defense</div>
                    <div className="text-sm font-bold text-slate-100">pfSense / FortiGate Firewall</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
                  Stateful Inspection
                </span>
              </button>
            </div>

            {/* Connection Line */}
            <div className="flex justify-center">
              <div className="w-0.5 h-6 bg-gradient-to-b from-emerald-500 to-blue-500 animate-pulse" />
            </div>

            {/* Distribution Tier: Core Switch */}
            <div className="flex justify-center">
              <button
                onClick={() => setActiveNodeId('switch')}
                className={`w-full max-w-md p-4 rounded-xl border transition-all text-left flex items-center justify-between group cursor-pointer ${
                  activeNodeId === 'switch'
                    ? 'bg-slate-900 border-blue-400 shadow-lg shadow-blue-950/50 scale-[1.02]'
                    : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-blue-950 border border-blue-800 text-blue-400">
                    <Server className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-blue-400 uppercase">Core Distribution</div>
                    <div className="text-sm font-bold text-slate-100">48-Port 10GbE PoE+ Switch (L3)</div>
                  </div>
                </div>
                <span className="text-xs font-mono text-slate-400">802.1Q Trunking</span>
              </button>
            </div>

            {/* Subnet / VLAN Branches Grid */}
            <div className="pt-4 border-t border-slate-800/80">
              <div className="text-xs font-mono text-slate-400 uppercase mb-3 text-center">
                Segmented VLAN Subnets (Zero-Trust Isolation)
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* VLAN 10 */}
                <button
                  onClick={() => setActiveNodeId('vlan-corp')}
                  className={`p-3 rounded-xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                    activeNodeId === 'vlan-corp'
                      ? 'bg-slate-900 border-cyan-400 shadow-md shadow-cyan-950/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Laptop className="w-5 h-5 text-cyan-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">VLAN 10: Corp LAN</div>
                    <div className="text-[11px] font-mono text-slate-400">192.168.10.0/24</div>
                  </div>
                </button>

                {/* VLAN 20 */}
                <button
                  onClick={() => setActiveNodeId('vlan-cctv')}
                  className={`p-3 rounded-xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                    activeNodeId === 'vlan-cctv'
                      ? 'bg-slate-900 border-amber-400 shadow-md shadow-amber-950/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Video className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">VLAN 20: 4K CCTV</div>
                    <div className="text-[11px] font-mono text-slate-400">192.168.20.0/24</div>
                  </div>
                </button>

                {/* VLAN 30 */}
                <button
                  onClick={() => setActiveNodeId('vlan-guest')}
                  className={`p-3 rounded-xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                    activeNodeId === 'vlan-guest'
                      ? 'bg-slate-900 border-purple-400 shadow-md shadow-purple-950/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Radio className="w-5 h-5 text-purple-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">VLAN 30: Guest WiFi</div>
                    <div className="text-[11px] font-mono text-slate-400">192.168.30.0/24</div>
                  </div>
                </button>

                {/* Hybrid Cloud Bridge */}
                <button
                  onClick={() => setActiveNodeId('vlan-cloud')}
                  className={`p-3 rounded-xl border transition-all text-left flex items-center gap-3 cursor-pointer ${
                    activeNodeId === 'vlan-cloud'
                      ? 'bg-slate-900 border-blue-400 shadow-md shadow-blue-950/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Cloud className="w-5 h-5 text-blue-400 shrink-0" />
                  <div>
                    <div className="text-xs font-bold text-slate-200">Hybrid Cloud S3</div>
                    <div className="text-[11px] font-mono text-slate-400">AWS / M365 Sync</div>
                  </div>
                </button>

              </div>
            </div>

          </div>

          {/* Right: Detailed Node Inspector Deck (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-slate-900/90 border border-slate-800 p-6 space-y-6 shadow-xl">
            
            {/* Inspector Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                  NODE TELEMETRY INSPECTOR
                </div>
                <h3 className="text-xl font-bold text-white mt-1">
                  {activeNode.label}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-semibold">
                {activeNode.zone}
              </span>
            </div>

            {/* Network Addressing Details */}
            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">IP Address / Gateway:</span>
                <span className="text-cyan-300 font-semibold">{activeNode.ip}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Subnet Mask:</span>
                <span className="text-slate-200">{activeNode.subnet}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">VLAN Tag:</span>
                <span className="text-emerald-300 font-semibold">{activeNode.vlan}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Operating Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-400" />
                  ONLINE 100%
                </span>
              </div>
            </div>

            {/* Architecture Details Checklist */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-slate-400">
                Active Architecture Specifications:
              </div>
              <div className="space-y-2">
                {activeNode.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Protocol Tags */}
            <div>
              <div className="text-xs font-mono uppercase text-slate-400 mb-2">
                Active Encapsulation & Security Protocols:
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {activeNode.protocols.map((p, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                    {p}
                  </span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
