import { SupportTicket } from '../types';

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    ticketId: 'TS-NET-8492',
    clientName: 'Marcus Vance',
    companyName: 'Apex Global Logistics',
    service: 'Network & Network Security',
    title: 'Dual WAN Failover & L3 VLAN Core Infrastructure Modernization',
    scopeSummary: 'Deployment of redundant pfSense firewalls (CARP HA), 802.1Q 10Gbps VLAN trunking (Corp, Guest, VoIP, CCTV), and WireGuard Site-to-Site mesh.',
    status: 'In Progress',
    priority: 'High',
    assignedEngineer: 'Alex K. (Senior L3 Network Engineer)',
    createdAt: 'Today, 08:30 AM',
    estimatedCompletion: 'Today, 05:00 PM',
    overallProgress: 75,
    slaTier: '4-Hour Response SLA',
    slaTargetHours: 4,
    timeRemaining: '1 hr 45 min',
    currentMilestone: 'Phase 3: Inter-VLAN ACL Policy Verification & WireGuard Tunnel Testing',
    milestones: [
      {
        id: 'm1',
        name: 'Perimeter Hardware Provisioning & CARP HA Setup',
        status: 'completed',
        timestamp: '09:15 AM',
        details: 'Configured dual pfSense appliances with sync interface and virtual IP failover (0.8s detection).'
      },
      {
        id: 'm2',
        name: 'Layer 3 VLAN Subnetting & DHCP Relay',
        status: 'completed',
        timestamp: '11:40 AM',
        details: 'Configured VLAN 10 (Corp /24), VLAN 20 (CCTV /24), VLAN 30 (Guest /24), and VLAN 40 (VoIP /24).'
      },
      {
        id: 'm3',
        name: 'Firewall Policy Hardening & WireGuard Mesh',
        status: 'current',
        timestamp: '01:20 PM',
        details: 'Restricting Guest & IoT from corporate LAN. Establishing 256-bit ChaCha20 Poly1305 VPN tunnels to branch offices.'
      },
      {
        id: 'm4',
        name: 'Simulated WAN Drop Failover & Latency Soak Test',
        status: 'pending',
        details: 'Automated packet flow benchmark across secondary fiber uplink under full 10Gbps load.'
      },
      {
        id: 'm5',
        name: 'As-Built Documentation Handover & Network Topology Signoff',
        status: 'pending',
        details: 'Delivering exportable Visio/Draw.io diagram, IPAM addressing book, and emergency restore keys.'
      }
    ],
    liveLogs: [
      { time: '13:42:10', message: 'WireGuard handshake successful with Branch Office 02 (10.200.0.2). Ping: 18ms.', type: 'success' },
      { time: '13:35:04', message: 'Applying stateful egress filter on VLAN 30 (Guest DMZ) -> Drop TCP 445/139/3389.', type: 'info' },
      { time: '12:50:22', message: 'DHCP Pool allocated for VLAN 20 (CCTV): 192.168.20.100 - 192.168.20.250.', type: 'info' },
      { time: '11:40:15', message: 'LACP 20Gbps Link Aggregation established on Core Switch Ports 47-48.', type: 'success' },
      { time: '09:15:00', message: 'CARP Virtual IP 192.168.1.1 bound to master node. Backup node synchronized.', type: 'info' }
    ],
    metrics: [
      { label: 'WAN Uplink Failover', value: '0.62', unit: 'sec failover', status: 'good' },
      { label: 'Packet Drop Rate', value: '0.00%', unit: 'loss', status: 'good' },
      { label: 'Core Inter-VLAN Latency', value: '0.4', unit: 'ms', status: 'good' },
      { label: 'VPN Throughput', value: '940', unit: 'Mbps', status: 'good' }
    ],
    deliverables: [
      { name: 'Layer_2_3_Network_Topology_v2.pdf', type: 'doc', status: 'ready' },
      { name: 'pfSense_CARP_Configuration_Backup.xml', type: 'config', status: 'ready' },
      { name: 'IPAM_Subnet_Allocation_Sheet.xlsx', type: 'doc', status: 'generating' }
    ]
  },
  {
    ticketId: 'TS-CCTV-2031',
    clientName: 'Elena Rostova',
    companyName: 'Bayside Commercial Plaza',
    service: 'CCTV & Biometric Access Control',
    title: '48-Camera 4K Surveillance Array & Turnstile Biometrics Integration',
    scopeSummary: 'Turnkey installation of 48x 4K AI Turret cameras, 64-channel RAID-6 NVR with 60-day H.265+ retention, and facial recognition speed turnstiles.',
    status: 'Testing & Audit',
    priority: 'Normal',
    assignedEngineer: 'Devin T. (Surveillance & Physical Sec Specialist)',
    createdAt: 'Yesterday, 02:00 PM',
    estimatedCompletion: 'Today, 06:30 PM',
    overallProgress: 90,
    slaTier: 'Standard Rollout SLA',
    slaTargetHours: 24,
    timeRemaining: '2 hrs 10 min',
    currentMilestone: 'Phase 4: Low-Light IR Calibration & Access Log Sync',
    milestones: [
      {
        id: 'm1',
        name: 'Cat6 Shielded Cabling & PoE+ Distribution Setup',
        status: 'completed',
        timestamp: 'Yesterday, 04:30 PM',
        details: 'Ran 48x Cat6 solid copper lines to 2x 24-Port 802.3at 740W PoE+ managed switches.'
      },
      {
        id: 'm2',
        name: 'RAID-6 Storage Array Initialization & NVR Config',
        status: 'completed',
        timestamp: 'Yesterday, 07:15 PM',
        details: 'Configured 8x 16TB Seagate SkyHawk AI surveillance drives (96TB usable capacity).'
      },
      {
        id: 'm3',
        name: 'Biometric Facial Turnstile & Wiegand Integration',
        status: 'completed',
        timestamp: 'Today, 11:00 AM',
        details: 'Paired ZKTeco speed turnstiles with corporate Active Directory for badge & face unlock.'
      },
      {
        id: 'm4',
        name: 'AI Smart Motion Perimeter Tripwires & IR Tuning',
        status: 'current',
        timestamp: 'Today, 02:45 PM',
        details: 'Configured human/vehicle classification tripwires with instant mobile push alerts.'
      },
      {
        id: 'm5',
        name: 'Final Security Walkthrough & Mobile App Provisioning',
        status: 'pending',
        details: 'Staff enrollment, security guard workstation multi-monitor setup, and client sign-off.'
      }
    ],
    liveLogs: [
      { time: '14:45:00', message: 'All 48 cameras streaming 3840x2160 @ 25fps via H.265+ codec. Total throughput: 192 Mbps.', type: 'info' },
      { time: '13:10:20', message: 'Facial recognition latency tested at main lobby turnstiles: 0.28s verification time.', type: 'success' },
      { time: '11:20:15', message: 'PoE Power draw audited: 395W / 740W budget (53% load - optimal thermal headroom).', type: 'info' }
    ],
    metrics: [
      { label: 'Online Cameras', value: '48 / 48', unit: '100% active', status: 'good' },
      { label: 'Storage Retention', value: '62', unit: 'days estimated', status: 'good' },
      { label: 'Biometric Auth Speed', value: '0.28', unit: 'seconds', status: 'good' },
      { label: 'PoE Thermal Load', value: '38', unit: '°C Switch Temp', status: 'good' }
    ],
    deliverables: [
      { name: 'Camera_Placement_Blueprint_Floor1_2.pdf', type: 'doc', status: 'ready' },
      { name: 'NVR_Export_Archive_Guidelines.pdf', type: 'doc', status: 'ready' },
      { name: 'Biometric_Access_Permission_Matrix.xlsx', type: 'doc', status: 'ready' }
    ]
  },
  {
    ticketId: 'TS-MAIL-5104',
    clientName: 'Sarah Jenkins',
    companyName: 'FinServe Advisory Group',
    service: 'Web & Mail Hosting',
    title: 'Enterprise Email Security & Strict DMARC p=reject Enforcement',
    scopeSummary: 'Fixing rampant email spoofing, configuring 2048-bit DKIM selectors across Microsoft 365, updating SPF includes, and establishing DMARC rua/ruf forensic reporting.',
    status: 'Completed',
    priority: 'Critical',
    assignedEngineer: 'Alex K. (Senior Infrastructure Specialist)',
    createdAt: '2 Days Ago',
    estimatedCompletion: 'Completed',
    overallProgress: 100,
    slaTier: '2-Hour Emergency SLA',
    slaTargetHours: 2,
    timeRemaining: 'Resolved',
    currentMilestone: 'Deployment Complete: 100% Mailbox Deliverability Verified',
    milestones: [
      {
        id: 'm1',
        name: 'DNS Zone Audit & Spoofing Vulnerability Scan',
        status: 'completed',
        timestamp: '2 Days Ago, 10:10 AM',
        details: 'Identified missing SPF record and unaligned third-party marketing senders.'
      },
      {
        id: 'm2',
        name: 'SPF Record Consolidation & Mechanism Optimization',
        status: 'completed',
        timestamp: '2 Days Ago, 10:45 AM',
        details: 'Collapsed lookup count to 4 (well within RFC 10-lookup limit) with hard ~all alignment.'
      },
      {
        id: 'm3',
        name: 'DKIM 2048-Bit Key Generation & CNAME Selector Publishing',
        status: 'completed',
        timestamp: '2 Days Ago, 11:15 AM',
        details: 'Published selector1._domainkey and selector2._domainkey in Cloudflare DNS.'
      },
      {
        id: 'm4',
        name: 'DMARC Quarantine -> Reject Policy Rollout',
        status: 'completed',
        timestamp: '2 Days Ago, 11:55 AM',
        details: 'Published strict p=reject policy with automated aggregate forensic telemetry.'
      },
      {
        id: 'm5',
        name: 'Deliverability Soak Test across Google, Outlook, & Yahoo Inboxes',
        status: 'completed',
        timestamp: '2 Days Ago, 12:15 PM',
        details: 'Scored 10/10 on Mail-Tester; 0 spoofed emails reaching inbox.'
      }
    ],
    liveLogs: [
      { time: 'Final Check', message: 'SPF: PASS | DKIM: PASS (2048-bit) | DMARC: PASS (p=reject). All outbound mail authenticated.', type: 'success' },
      { time: 'Telemetry', message: 'Zero legitimate messages blocked; 412 unauthorized spoof attempts quarantined/rejected at MX gateway.', type: 'info' }
    ],
    metrics: [
      { label: 'Mail Authentication Score', value: '10 / 10', unit: 'Perfect Score', status: 'good' },
      { label: 'DMARC Policy', value: 'p=reject', unit: 'Strict 100%', status: 'good' },
      { label: 'DNS Propagation', value: '100%', unit: 'Global Edge', status: 'good' }
    ],
    deliverables: [
      { name: 'Email_Authentication_Audit_Certificate.pdf', type: 'report', status: 'ready' },
      { name: 'DNS_Zone_Export_Cloudflare.bind', type: 'config', status: 'ready' }
    ]
  },
  {
    ticketId: 'TS-CYBER-9923',
    clientName: 'David Chen',
    companyName: 'Quantum Code Labs',
    service: 'Cyber Security & Hardening',
    title: 'Emergency Incident Response: SSH Botnet Mitigation & CIS Server Hardening',
    scopeSummary: 'Immediate mitigation of brute-force botnet attack against exposed Linux ports, deployment of CrowdSec / Fail2ban, SSH key-only enforcement, and iptables geo-blocking.',
    status: 'In Progress',
    priority: 'Critical',
    assignedEngineer: 'Devin T. & Alex K. (Incident Response Team)',
    createdAt: 'Today, 01:15 PM',
    estimatedCompletion: 'Today, 04:30 PM',
    overallProgress: 60,
    slaTier: 'Immediate Incident SLA',
    slaTargetHours: 1,
    timeRemaining: '55 minutes',
    currentMilestone: 'Phase 3: CrowdSec Dynamic Bouncer & UFW Port Lockdown',
    milestones: [
      {
        id: 'm1',
        name: 'Active Attack Triage & Malicious IP Subnet Null-Routing',
        status: 'completed',
        timestamp: '01:30 PM',
        details: 'Blocked 820+ attacker IPs via iptables raw table drop rules. CPU returned to normal (4%).'
      },
      {
        id: 'm2',
        name: 'SSH Hardening & Password Authentication Ban',
        status: 'completed',
        timestamp: '02:00 PM',
        details: 'Enforced Ed25519 public key auth only, disabled root login, changed listening port to custom high port.'
      },
      {
        id: 'm3',
        name: 'CrowdSec Collaborative Threat Defense Deployment',
        status: 'current',
        timestamp: '02:30 PM',
        details: 'Installing CrowdSec daemon with live community blacklists and automated application firewall bouncers.'
      },
      {
        id: 'm4',
        name: 'Kernel Hardening & Lynis Security Audit Verification',
        status: 'pending',
        details: 'Applying /etc/sysctl.d network stack security params (SYN cookies, ICMP broadcast ignore).'
      },
      {
        id: 'm5',
        name: 'Forensic Post-Mortem & Incident Report Delivery',
        status: 'pending',
        details: 'Root cause analysis summary and long-term hardening recommendations.'
      }
    ],
    liveLogs: [
      { time: '14:32:11', message: 'CrowdSec hub scenario: ssh-bf detected and banned 142 rogue IPs in last 10 minutes.', type: 'diagnostic' },
      { time: '14:05:00', message: 'sshd config tested: PasswordAuthentication no, PermitRootLogin no, Port 49222.', type: 'success' },
      { time: '01:35:22', message: 'Iptables geo-blocking rules activated on border interface.', type: 'info' }
    ],
    metrics: [
      { label: 'Attacks Blocked', value: '1,420+', unit: 'in last 2h', status: 'good' },
      { label: 'Server CPU Load', value: '4.2%', unit: 'down from 98%', status: 'good' },
      { label: 'Lynis Hardening Score', value: '86 / 100', unit: 'Hardened', status: 'good' }
    ],
    deliverables: [
      { name: 'Incident_Response_Forensic_Summary.pdf', type: 'report', status: 'generating' },
      { name: 'CIS_Linux_Hardening_Script.sh', type: 'config', status: 'ready' }
    ]
  },
  {
    ticketId: 'TS-CLOUD-3140',
    clientName: 'Nadia Thorne',
    companyName: 'Vanguard Medical Records',
    service: 'Cloud & Hybrid Infrastructure',
    title: 'Proxmox VE Cluster Setup & Encrypted S3 Glacier Offsite Backup Automation',
    scopeSummary: '3-node Proxmox VE high availability hypervisor setup, ZFS snapshot automation with Restic/Rclone, and automated Telegram outage notification webhooks.',
    status: 'Completed',
    priority: 'High',
    assignedEngineer: 'Alex K. (Cloud & Virtualization Architect)',
    createdAt: '3 Days Ago',
    estimatedCompletion: 'Completed',
    overallProgress: 100,
    slaTier: 'Standard Turnkey SLA',
    slaTargetHours: 48,
    timeRemaining: 'Resolved',
    currentMilestone: 'Turnover Complete: All 12 VMs Running with Zero-Downtime HA',
    milestones: [
      {
        id: 'm1',
        name: 'Proxmox VE 8.2 Cluster Initialization & Corosync Quorum',
        status: 'completed',
        timestamp: '3 Days Ago',
        details: 'Configured 3 physical Dell PowerEdge nodes with dedicated Corosync ring.'
      },
      {
        id: 'm2',
        name: 'ZFS RAID-10 NVMe Storage Pool & Replication',
        status: 'completed',
        timestamp: '3 Days Ago',
        details: 'Configured automated 15-minute ZFS replication across cluster nodes.'
      },
      {
        id: 'm3',
        name: 'Rclone / Restic AES-256 Cloud Backup Sync',
        status: 'completed',
        timestamp: '2 Days Ago',
        details: 'Nightly incremental deduplicated snapshots sent to AWS S3 Glacier.'
      },
      {
        id: 'm4',
        name: 'Telegram Bot Incident Webhook Trigger Testing',
        status: 'completed',
        timestamp: '2 Days Ago',
        details: 'Verified real-time alerts on disk SMART health, CPU thresholds, and node failover.'
      },
      {
        id: 'm5',
        name: 'Disaster Recovery Simulation & VM Live Migration Test',
        status: 'completed',
        timestamp: 'Yesterday',
        details: 'Migrated active Windows Server AD VM between nodes with 0 dropped pings.'
      }
    ],
    liveLogs: [
      { time: 'System Check', message: 'Proxmox Cluster Quorum: 3/3 nodes online. Corosync latency: 0.2ms.', type: 'success' },
      { time: 'Backup Cron', message: 'Last S3 backup snapshot verified: 480 GB compressed -> AWS Glacier (AES-256).', type: 'info' }
    ],
    metrics: [
      { label: 'Cluster Nodes Online', value: '3 / 3', unit: '100% Quorum', status: 'good' },
      { label: 'VM Live Migration', value: '0', unit: 'dropped pings', status: 'good' },
      { label: 'Offsite Sync Status', value: 'Verified', unit: 'Hourly Cron', status: 'good' }
    ],
    deliverables: [
      { name: 'Disaster_Recovery_Standard_Operating_Procedure.pdf', type: 'doc', status: 'ready' },
      { name: 'Proxmox_Cluster_Architecture_Schematic.pdf', type: 'doc', status: 'ready' },
      { name: 'Encrypted_Backup_Restore_Keys.txt', type: 'key', status: 'ready' }
    ]
  }
];

const LOCAL_STORAGE_KEY = 'techsec_client_support_tickets_v1';

export function getStoredTickets(): SupportTicket[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_TICKETS));
      return INITIAL_TICKETS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
    return INITIAL_TICKETS;
  } catch (e) {
    console.error('Failed to read tickets from localStorage', e);
    return INITIAL_TICKETS;
  }
}

export function saveTickets(tickets: SupportTicket[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tickets));
  } catch (e) {
    console.error('Failed to save tickets to localStorage', e);
  }
}

export function createNewTicketFromDispatch(data: {
  clientName: string;
  companyName: string;
  service: string;
  notes: string;
  scale: string;
  urgency: string;
}): SupportTicket {
  const all = getStoredTickets();
  
  const prefix = data.service.includes('Network') ? 'NET' :
                 data.service.includes('CCTV') ? 'CCTV' :
                 data.service.includes('Mail') || data.service.includes('Web') ? 'MAIL' :
                 data.service.includes('Cyber') ? 'CYBER' :
                 data.service.includes('Automation') ? 'AUTO' : 'CLOUD';

  const randomNum = Math.floor(1000 + Math.random() * 9000);
  const ticketId = `TS-${prefix}-${randomNum}`;

  const slaTier = data.urgency === 'emergency' ? '🔴 2-Hour SLA' :
                  data.urgency === 'sameday' ? '🟡 Same-Day SLA' : '🟢 Scheduled Rollout';
  
  const slaTargetHours = data.urgency === 'emergency' ? 2 : data.urgency === 'sameday' ? 8 : 48;

  const newTicket: SupportTicket = {
    ticketId,
    clientName: data.clientName || 'Valued Client',
    companyName: data.companyName || 'Corporate Client',
    service: data.service,
    title: `${data.service} Deployment & Security Provisioning`,
    scopeSummary: data.notes || `Engineered infrastructure setup for ${data.scale.toUpperCase()} scale environment under ${slaTier}.`,
    status: 'Initiated',
    priority: data.urgency === 'emergency' ? 'Critical' : 'High',
    assignedEngineer: 'Senior L3 On-Duty Field Specialist',
    createdAt: 'Just now',
    estimatedCompletion: data.urgency === 'emergency' ? 'Within 2 Hours' : 'Within 24-48 Hours',
    overallProgress: 15,
    slaTier,
    slaTargetHours,
    timeRemaining: data.urgency === 'emergency' ? '1 hr 55 min' : 'Scheduled',
    currentMilestone: 'Phase 1: Engineer Dispatch & Telemetry Assessment',
    milestones: [
      {
        id: 'm1',
        name: 'Ticket Ingestion & Senior Engineer Dispatch',
        status: 'current',
        timestamp: 'Just now',
        details: `Ticket registered. SLA timer active (${slaTier}). Engineer reviewing initial scope and environment parameters.`
      },
      {
        id: 'm2',
        name: 'Network Topology & Security Boundary Audit',
        status: 'pending',
        details: 'Performing baseline vulnerability scan, subnet verification, and port audit.'
      },
      {
        id: 'm3',
        name: 'Hardware / Software Configuration & Policy Hardening',
        status: 'pending',
        details: 'Implementing zero-trust access control, firewall state rules, and backup pipelines.'
      },
      {
        id: 'm4',
        name: 'Live Quality Assurance & Penetration Testing',
        status: 'pending',
        details: 'Simulated failover, throughput stress testing, and client acceptance testing.'
      },
      {
        id: 'm5',
        name: 'Deliverable Handover & Production Sign-Off',
        status: 'pending',
        details: 'Handover of credentials, network documentation, and as-built architecture guides.'
      }
    ],
    liveLogs: [
      { time: 'Just now', message: `Ticket ${ticketId} created successfully. Assigned to Senior On-Duty Engineer.`, type: 'info' },
      { time: 'Just now', message: `SLA timer initialized: ${slaTier} active. Dispatch notification sent via WhatsApp & Email.`, type: 'success' }
    ],
    metrics: [
      { label: 'Dispatch Status', value: 'En Route', unit: 'Engineer Assigned', status: 'good' },
      { label: 'Target SLA', value: slaTier, unit: 'Guaranteed Response', status: 'good' },
      { label: 'Security Verification', value: 'Queued', unit: 'Pre-flight check', status: 'neutral' }
    ],
    deliverables: [
      { name: `${ticketId}_Deployment_Scope_Sheet.pdf`, type: 'doc', status: 'ready' }
    ]
  };

  const updated = [newTicket, ...all];
  saveTickets(updated);
  return newTicket;
}
