import { Specialization, CaseStudy } from '../types';

export const SPECIALIZATIONS: Specialization[] = [
  {
    id: 'network-security',
    category: 'network',
    title: 'Network & Security Engineering',
    subtitle: 'L2/L3 Routing, Next-Gen Firewalls & Encrypted Tunnels',
    badge: 'Core Specialty',
    tagline: 'Zero-downtime, segment-isolated enterprise architectures',
    description: 'Design, configuration, and proactive monitoring of robust enterprise and small-business network backbones. Implementing strict 802.1Q VLAN segmentation, site-to-site VPN tunnels, QoS traffic shaping, and Next-Gen stateful inspection firewalls.',
    highlights: [
      'Stateful Inspection & Next-Gen Firewall (pfSense, FortiGate, OPNsense, Cisco)',
      'VLAN 802.1Q Trunking & Zero-Trust Guest/IoT Isolation',
      'High-Throughput Site-to-Site & Remote VPNs (WireGuard, IPsec IKEv2, OpenVPN)',
      'Dynamic Routing (BGP / OSPF) & Multi-WAN Failover with policy-based routing',
      'WiFi 6/7 Enterprise Mesh Deployments (UniFi, TP-Link Omada, Aruba Instant On)',
      'Bandwidth Traffic Shaping, VoIP QoS Prioritization & Deep Packet Inspection'
    ],
    techStack: ['pfSense', 'FortiGate', 'Cisco IOS', 'UniFi Enterprise', 'MikroTik RouterOS', 'WireGuard', 'Wireshark'],
    protocols: ['IPv4/IPv6', '802.1Q', 'BGP', 'OSPF', 'IPsec', 'WireGuard', 'SNMPv3', 'Radius 802.1X'],
    stats: [
      { label: 'Subnet Max Uptime', value: '99.99%' },
      { label: 'VLAN Segregation', value: '100% Isolated' },
      { label: 'VPN Latency Overhead', value: '< 2ms' }
    ],
    interactiveType: 'firewall'
  },
  {
    id: 'web-mail-hosting',
    category: 'web-mail',
    title: 'Web & Mail Server Hosting',
    subtitle: 'DNS Security, Reverse Proxies & 100% Inbox Deliverability',
    badge: 'Hosting & DNS',
    tagline: 'Flawless email reputation and lightning-fast web delivery',
    description: 'End-to-end web server stack deployment, reverse proxy optimization, SSL/TLS certificates, and complete email authentication compliance (SPF, DKIM, DMARC, PTR, BIMI) ensuring emails never land in spam.',
    highlights: [
      'Authoritative DNS Management & Propagation (Cloudflare, Route53, BIND9)',
      '100% Email Deliverability Hardening (SPF, 2048-bit DKIM, Strict DMARC reject policy)',
      'High-Performance Reverse Proxies (Nginx, Caddy, Traefik, Apache HTTPD)',
      'cPanel/WHM, Plesk, Webmin & DirectAdmin Server Fleet Administration',
      'Zero-Downtime VPS / Dedicated Server Migrations & DB Replication',
      'Automated Let’s Encrypt / ZeroSSL TLS Wildcard renewals via ACME DNS-01'
    ],
    techStack: ['Nginx', 'Postfix / Dovecot', 'cPanel / WHM', 'Cloudflare DNS', 'Caddy Server', 'Let\'s Encrypt', 'Certbot'],
    protocols: ['HTTPS / TLS 1.3', 'HTTP/3 (QUIC)', 'SMTP/S', 'IMAP/S', 'DNSSEC', 'DMARC', 'SPF'],
    stats: [
      { label: 'Email Deliverability', value: '99.8%' },
      { label: 'TLS Benchmark', value: 'A+ Grade' },
      { label: 'Migration Downtime', value: '0 sec' }
    ],
    interactiveType: 'dns'
  },
  {
    id: 'cyber-security',
    category: 'cybersecurity',
    title: 'Cyber Security & Hardening',
    subtitle: 'Vulnerability Isolation, Endpoint EDR & Zero-Trust Defense',
    badge: 'SecOps',
    tagline: 'Proactive defense preventing breaches before they materialize',
    description: 'Comprehensive cybersecurity audits, CIS benchmark hardening for Linux/Windows servers, intrusion detection, automated IP blocking with Fail2ban/CrowdSec, and employee phishing awareness simulations.',
    highlights: [
      'Server Baseline Hardening (SSH key-only, disable root, sysctl kernel tuning, UFW/iptables)',
      'Automated Intrusion Prevention & Brute-Force Blocking (CrowdSec, Fail2ban, Snort/Suricata)',
      'Endpoint Detection & Response (EDR / XDR) & Patch Management workflows',
      'Network Vulnerability Scanning & Port Audit (Nmap, OpenVAS, Nessus)',
      'SSL/TLS Cipher Suite Hardening (Enforce TLS 1.3, Strict-Transport-Security HSTS)',
      'Incident Response, Forensic Log Analysis & Disaster Recovery Plans'
    ],
    techStack: ['CrowdSec', 'Fail2ban', 'Wazuh SIEM', 'Nmap', 'OpenVAS', 'Suricata', 'Bitdefender GravityZone'],
    protocols: ['SSH Ed25519', 'TLS 1.3 Only', 'HSTS Preload', 'Syslog-ng', 'CIS Benchmark L1/L2'],
    stats: [
      { label: 'Brute-Force Drops', value: '100%' },
      { label: 'Audit Compliance', value: 'CIS L2' },
      { label: 'Patch Verification', value: '24/7' }
    ],
    interactiveType: 'hardening'
  },
  {
    id: 'cctv-access-control',
    category: 'cctv-access',
    title: 'CCTV & Physical Security',
    subtitle: 'IP Surveillance, NVR Storage Arrays & Biometric Access',
    badge: 'Physical Sec',
    tagline: '24/7 crystal-clear surveillance and frictionless access logs',
    description: 'Turnkey physical security engineering: High-definition IP CCTV camera systems with AI motion tracking, redundant RAID NVR storage calculation, PoE power budgeting, biometric face/fingerprint terminals, and RFID access gates.',
    highlights: [
      'High-Definition IP CCTV Camera Deployment (4K / 8K, Starlight Night Vision, PTZ Optical Zoom)',
      'NVR & NAS Surveillance Storage Calculation (H.265+ Codec, RAID 5/6, Offsite Archiving)',
      'PoE+ Switch Power Budgeting & Dedicated Surveillance VLAN Separation',
      'Biometric Fingerprint, Facial Recognition & RFID Wiegand Door Access Systems',
      'Electromagnetic Mag-Locks, Break-Glass Buttons & Battery Backup Power (UPS)',
      'Time & Attendance Cloud Reporting, Intruder Alarm & Perimeter Beam Integration'
    ],
    techStack: ['Hikvision IP/NVR', 'Dahua Technology', 'UniFi Protect', 'ZKTeco Biometrics', 'Synology Surveillance', 'Axis'],
    protocols: ['ONVIF Profile S/G/T', 'RTSP Stream', 'H.265 / H.264', 'Wiegand 26/34', 'RS485', 'PoE 802.3at/bt'],
    stats: [
      { label: 'Video Retention', value: 'Up to 90 Days' },
      { label: 'Stream Latency', value: '< 200ms' },
      { label: 'Access Log Accuracy', value: '99.99%' }
    ],
    interactiveType: 'cctv'
  },
  {
    id: 'system-automation',
    category: 'automation',
    title: 'System & Office Automation',
    subtitle: 'Scripted Workflows, Smart IoT & Proactive Alerting',
    badge: 'Automation',
    tagline: 'Automate repetitive IT tasks and monitor critical services in real time',
    description: 'Custom automation pipelines eliminating manual IT overhead. Automated offsite snapshot backups, self-healing system health cronjobs, smart office IoT environmental automation, and instant Telegram/Slack alert webhooks for outage events.',
    highlights: [
      'Automated Encrypted Offsite Backups (Restic, Rclone, BorgBackup, Duplicati to S3/B2)',
      'Automated Server Health & Auto-Healing Scripts (Bash, Python, Systemd Watchdogs)',
      'Smart Office IoT & Facility Automation (Home Assistant, Node-RED, MQTT sensors, Smart Relays)',
      'Real-Time Outage & Service Monitoring Webhooks (Uptime Kuma, Telegram, Discord, Pushbullet)',
      'Automated SSL Certificate & Domain Expiry Notifiers',
      'Scheduled Maintenance Windows with zero user intervention'
    ],
    techStack: ['Python 3', 'Bash / Shell', 'Home Assistant', 'Node-RED', 'Uptime Kuma', 'Rclone', 'Restic', 'MQTT'],
    protocols: ['REST Webhooks', 'MQTT', 'SSH Automation', 'Cron / Systemd', 'Z-Wave / Zigbee'],
    stats: [
      { label: 'Manual Tasks Cut', value: '85%' },
      { label: 'Outage Notification', value: '< 10s' },
      { label: 'Backup Verification', value: 'Daily Auto' }
    ],
    interactiveType: 'automation'
  },
  {
    id: 'cloud-services-hybrid',
    category: 'cloud',
    title: 'Cloud Services & Hybrid Infra',
    subtitle: 'AWS, Azure Entra ID, M365 & Hypervisor Virtualization',
    badge: 'Cloud & Hybrid',
    tagline: 'Seamless bridge between on-premises reliability and cloud agility',
    description: 'Planning, migration, and management of cloud and hybrid IT setups. Microsoft 365 and Google Workspace enterprise rollouts, AWS VPC/EC2 infrastructure, Proxmox VE hypervisor clustering, and TrueNAS network storage.',
    highlights: [
      'Microsoft 365 & Google Workspace Seamless Corporate Tenant Migrations',
      'Azure Active Directory / Entra ID Hybrid Cloud Identity & Single Sign-On (SSO)',
      'AWS / DigitalOcean / Linode Cloud Virtual Machine & S3 Storage Provisioning',
      'Proxmox VE & VMware ESXi Hypervisor Deployment with Live VM Migration',
      'TrueNAS / FreeNAS ZFS Storage Pool Configuration (NFS, SMB, iSCSI Targets)',
      'Hybrid Cloud Sync: Local NAS to Cold Cloud Glacier Storage for Disaster Recovery'
    ],
    techStack: ['Microsoft 365', 'Entra ID', 'AWS Cloud', 'Proxmox VE', 'TrueNAS CORE', 'VMware ESXi', 'Google Workspace'],
    protocols: ['SAML 2.0 / OIDC', 'iSCSI / NFS / SMB', 'S3 API', 'LDAP / Kerberos', 'CloudFormation / Terraform'],
    stats: [
      { label: 'Migration Success', value: '100%' },
      { label: 'Cloud Cost Savings', value: '35% Avg' },
      { label: 'Recovery Point (RPO)', value: '< 15 mins' }
    ],
    interactiveType: 'cloud'
  }
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-1',
    title: 'Multi-Branch WireGuard VPN & 802.1Q Network Overhaul',
    category: 'Network & Security',
    clientType: 'Logistics & Distribution HQ (4 Branch Offices, 120 Users)',
    challenge: 'Branches suffered frequent disconnects on legacy IPsec tunnels, VoIP calls were dropping during heavy file transfers, and guest WiFi was unsegmented from internal ERP databases.',
    solution: 'Engineered high-throughput WireGuard site-to-site mesh with automated failover over dual WANs. Segmented network into 5 strict VLANs with pfSense firewall rules and strict QoS queuing for SIP traffic.',
    technologies: ['pfSense HA', 'WireGuard', 'UniFi Switch Pro', 'VLAN 802.1Q', 'Dual WAN BGP/Failover'],
    results: [
      { metric: '0%', label: 'VoIP Packet Loss' },
      { metric: '99.99%', label: 'Uptime over 12 Months' },
      { metric: '3.8x', label: 'VPN Throughput Boost' }
    ],
    timeline: '2 Weeks Turnaround'
  },
  {
    id: 'case-2',
    title: '48-Camera 4K AI CCTV & Biometric Turnstile Integration',
    category: 'Physical Security',
    clientType: 'Commercial Business Park & Warehouse',
    challenge: 'Security blind spots, hard drive burnouts due to improper camera bitrate calculations, and inaccurate manual timecard logging for 85 staff members.',
    solution: 'Designed and deployed 48x 4K Starlight IP cameras over Gigabit PoE+ switches, calculated 64TB RAID-6 NVR storage with H.265+ compression (45 days retention), and installed ZKTeco facial recognition turnstiles with automated time logs.',
    technologies: ['Hikvision 4K IP', '64TB RAID-6 NVR', 'ZKTeco Facial Terminal', 'Managed PoE Switch', 'Surveillance VLAN'],
    results: [
      { metric: '45 Days', label: 'Full 4K Video Retention' },
      { metric: '0', label: 'Storage Drive Failures' },
      { metric: '< 0.3s', label: 'Biometric Access Speed' }
    ],
    timeline: '3 Weeks Turnaround'
  },
  {
    id: 'case-3',
    title: 'Exchange to Microsoft 365 Cloud Migration & DMARC Enforce',
    category: 'Web & Mail Hosting',
    clientType: 'Financial Advisory & Accounting Firm (65 Mailboxes)',
    challenge: 'Client was running aging on-premises Exchange 2016 facing frequent spam blacklisting, spoofing attacks, and high maintenance costs.',
    solution: 'Orchestrated staged migration to Microsoft 365 Business Premium with zero email loss. Implemented DKIM 2048-bit keys, hardened SPF, and enforced strict `p=reject` DMARC policy with automated forensic reporting.',
    technologies: ['Microsoft 365', 'Exchange Online', 'Cloudflare DNS', 'DMARC Analyzer', 'Entra ID MFA'],
    results: [
      { metric: '100%', label: 'Inbox Deliverability' },
      { metric: '0', label: 'Spoofing Incidents Post-Launch' },
      { metric: '$4,200', label: 'Annual Server Cost Saved' }
    ],
    timeline: '5 Days Turnaround'
  },
  {
    id: 'case-4',
    title: 'Proxmox Hypervisor Cluster & Automated S3 Disaster Recovery',
    category: 'System Automation & Cloud',
    clientType: 'Engineering Firm & Media Production Studio',
    challenge: 'Client had 12 unmonitored physical tower servers consuming excessive power, with manual USB external drive backups that were frequently forgotten.',
    solution: 'Consolidated infrastructure onto a 3-node Proxmox VE high-availability cluster with 10GbE SFP+ networking. Scripted automated daily encrypted ZFS snapshots synced to Wasabi S3 via Restic, with instant Telegram alerts on completion.',
    technologies: ['Proxmox VE Cluster', 'ZFS RAID-Z2', 'Restic Encrypted Backup', 'Wasabi S3', 'Telegram Webhooks'],
    results: [
      { metric: '70%', label: 'Power Consumption Reduced' },
      { metric: '100%', label: 'Automated Daily Verification' },
      { metric: '12 Mins', label: 'Full Disaster Recovery RTO' }
    ],
    timeline: '10 Days Turnaround'
  }
];

export const SERVICE_PACKAGES = [
  {
    id: 'emergency-support',
    name: 'Emergency IT Breakdown',
    description: 'Rapid on-demand remote or onsite incident triage for downed networks, mail outages, or security breaches.',
    sla: '< 1 Hour Response',
    icon: 'AlertCircle',
    features: ['Root cause diagnosis', 'Service restoration', 'Post-incident report', 'Patch deployment']
  },
  {
    id: 'infra-audit',
    name: 'Network & Security Audit',
    description: 'Deep-dive vulnerability scan, port assessment, firewall review, and email authentication checkup.',
    sla: 'Comprehensive Report',
    icon: 'ShieldCheck',
    features: ['Vulnerability report', 'CIS compliance score', 'DNS/DMARC analysis', 'Prioritized action roadmap']
  },
  {
    id: 'turnkey-installation',
    name: 'Turnkey Project Deployment',
    description: 'Full installation of CCTV systems, access control gates, new network infrastructure, or cloud migration.',
    sla: 'Fixed Scope & SLA',
    icon: 'Wrench',
    features: ['Hardware procurement guidance', 'Cabling & rack mounting', 'Configuration & testing', 'Staff training']
  },
  {
    id: 'retaining-maintenance',
    name: 'Proactive Monthly Retainer',
    description: 'Ongoing 24/7 monitoring, automated backups, security patching, and unlimited routine support.',
    sla: 'Continuous SLA',
    icon: 'Cpu',
    features: ['Automated monitoring', 'Weekly health reviews', 'Priority dispatch', 'Discounted project rates']
  }
];
