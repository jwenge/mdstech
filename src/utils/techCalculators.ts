import { SubnetResult, CctvCalcResult } from '../types';

/**
 * Calculates IPv4 Subnet details accurately based on IP and CIDR prefix
 */
export function calculateSubnet(ipStr: string, cidr: number): SubnetResult | null {
  const parts = ipStr.trim().split('.').map(p => parseInt(p, 10));
  if (parts.length !== 4 || parts.some(p => isNaN(p) || p < 0 || p > 255) || cidr < 0 || cidr > 32) {
    return null;
  }

  // Convert IP to 32-bit integer
  const ipInt = ((parts[0] << 24) >>> 0) + ((parts[1] << 16) >>> 0) + ((parts[2] << 8) >>> 0) + (parts[3] >>> 0);
  
  // Calculate mask
  const maskInt = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
  const wildcardInt = ~maskInt >>> 0;
  
  const networkInt = (ipInt & maskInt) >>> 0;
  const broadcastInt = (networkInt | wildcardInt) >>> 0;

  const intToIp = (num: number) => {
    return [
      (num >>> 24) & 255,
      (num >>> 16) & 255,
      (num >>> 8) & 255,
      num & 255
    ].join('.');
  };

  const netmask = intToIp(maskInt);
  const wildcard = intToIp(wildcardInt);
  const networkAddress = intToIp(networkInt);
  const broadcastAddress = intToIp(broadcastInt);

  const totalHosts = Math.pow(2, 32 - cidr);
  const usableHosts = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.max(0, totalHosts - 2);

  let usableHostRange = '';
  if (cidr === 32) {
    usableHostRange = `${networkAddress} (Single Host /32)`;
  } else if (cidr === 31) {
    usableHostRange = `${networkAddress} - ${broadcastAddress} (Point-to-Point RFC 3021)`;
  } else {
    const firstHost = intToIp(networkInt + 1);
    const lastHost = intToIp(broadcastInt - 1);
    usableHostRange = `${firstHost} - ${lastHost}`;
  }

  // Determine Class & Scope
  let ipClass = 'Class A';
  if (parts[0] >= 128 && parts[0] <= 191) ipClass = 'Class B';
  else if (parts[0] >= 192 && parts[0] <= 223) ipClass = 'Class C';
  else if (parts[0] >= 224 && parts[0] <= 239) ipClass = 'Class D (Multicast)';
  else if (parts[0] >= 240) ipClass = 'Class E (Experimental)';

  // Private vs Public check
  const isPrivate = 
    parts[0] === 10 ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168);

  const ipClassWithScope = `${ipClass} (${isPrivate ? 'RFC 1918 Private' : 'Public Routable'})`;

  // Binary Representation of Subnet
  const binarySubnet = maskInt.toString(2).padStart(32, '0').match(/.{8}/g)?.join('.') || '';

  return {
    ip: ipStr,
    cidr,
    netmask,
    wildcard,
    networkAddress,
    broadcastAddress,
    usableHostRange,
    totalHosts,
    usableHosts,
    ipClass: ipClassWithScope,
    binarySubnet
  };
}

/**
 * Calculates CCTV NVR Storage and Bandwidth requirements
 */
export function calculateCctvStorage(
  cameraCount: number,
  resolution: '720p' | '1080p' | '2k' | '4k' | '8k',
  fps: number,
  compression: 'h264' | 'h265' | 'h265_plus',
  retentionDays: number,
  motionActivityHoursPerDay: number
): CctvCalcResult {
  // Base bitrate in kbps for 1080p @ 25fps with H.264
  let baseBitrateKbps = 4096; // 4 Mbps for 1080p H.264

  switch (resolution) {
    case '720p':
      baseBitrateKbps = 2048;
      break;
    case '1080p':
      baseBitrateKbps = 4096;
      break;
    case '2k':
      baseBitrateKbps = 6144;
      break;
    case '4k':
      baseBitrateKbps = 12288; // 12 Mbps
      break;
    case '8k':
      baseBitrateKbps = 28672;
      break;
  }

  // Adjust for FPS (base is 25 fps)
  const fpsFactor = Math.max(0.2, fps / 25);
  let bitratePerCameraKbps = baseBitrateKbps * fpsFactor;

  // Compression savings
  if (compression === 'h265') {
    bitratePerCameraKbps *= 0.55; // 45% savings
  } else if (compression === 'h265_plus') {
    bitratePerCameraKbps *= 0.35; // 65% savings with Smart/AI motion encoding
  }

  const totalBitrateMbps = (bitratePerCameraKbps * cameraCount) / 1024;
  const bandwidthMBps = totalBitrateMbps / 8;

  // Daily Gigabytes calculation (accounting for active recording hours)
  const recordingHoursPerDay = Math.min(24, Math.max(1, motionActivityHoursPerDay));
  const secondsRecordedPerDay = recordingHoursPerDay * 3600;
  
  // Total bits per day = bitrateKbps * 1000 * seconds
  const bytesPerCameraPerDay = (bitratePerCameraKbps * 1000 * secondsRecordedPerDay) / 8;
  const gbPerCameraPerDay = bytesPerCameraPerDay / (1024 * 1024 * 1024);

  const totalStorageGB = Math.round(gbPerCameraPerDay * cameraCount * retentionDays);
  const totalStorageTB = parseFloat((totalStorageGB / 1024).toFixed(2));

  // Monthly bandwidth consumption in GB
  const monthlyBandwidthGB = Math.round(gbPerCameraPerDay * cameraCount * 30);

  // Recommended Surveillance HDD configuration
  let recommendedHDD = '1x 2TB Seagate SkyHawk / WD Purple';
  if (totalStorageTB > 48) {
    recommendedHDD = `${Math.ceil(totalStorageTB / 16)}x 16TB Enterprise Surveillance Drives (RAID 6)`;
  } else if (totalStorageTB > 24) {
    recommendedHDD = `${Math.ceil(totalStorageTB / 12)}x 12TB Surveillance HDDs (RAID 5 Array)`;
  } else if (totalStorageTB > 12) {
    recommendedHDD = `${Math.ceil(totalStorageTB / 8)}x 8TB WD Purple / SkyHawk (RAID 5)`;
  } else if (totalStorageTB > 6) {
    recommendedHDD = '2x 6TB Surveillance HDDs in RAID 1 Mirror';
  } else if (totalStorageTB > 3) {
    recommendedHDD = '1x 4TB to 6TB Surveillance HDD';
  }

  return {
    totalStorageGB,
    totalStorageTB,
    totalBitrateMbps: parseFloat(totalBitrateMbps.toFixed(2)),
    bandwidthMBps: parseFloat(bandwidthMBps.toFixed(2)),
    recommendedHDD,
    monthlyBandwidthGB
  };
}

export interface PortDetail {
  port: number;
  protocol: 'TCP' | 'UDP' | 'TCP/UDP';
  service: string;
  category: 'Network' | 'Web/Mail' | 'Security' | 'Surveillance' | 'Remote' | 'Cloud';
  description: string;
  securityRecommendation: string;
}

export const COMMON_PORTS: PortDetail[] = [
  {
    port: 22,
    protocol: 'TCP',
    service: 'SSH (Secure Shell)',
    category: 'Security',
    description: 'Encrypted administrative remote terminal access.',
    securityRecommendation: 'Disable password authentication, enforce Ed25519 keys, bind to WireGuard VPN only, install Fail2ban.'
  },
  {
    port: 25,
    protocol: 'TCP',
    service: 'SMTP (Simple Mail Transfer)',
    category: 'Web/Mail',
    description: 'Direct server-to-server email transmission.',
    securityRecommendation: 'Enforce STARTTLS, SPF, DKIM, and strict PTR reverse DNS matching hostname to avoid spam drop.'
  },
  {
    port: 53,
    protocol: 'TCP/UDP',
    service: 'DNS (Domain Name System)',
    category: 'Network',
    description: 'Name resolution service.',
    securityRecommendation: 'Disable open recursive resolution on public interfaces to prevent DNS amplification DDoS attacks.'
  },
  {
    port: 80,
    protocol: 'TCP',
    service: 'HTTP (Web Plaintext)',
    category: 'Web/Mail',
    description: 'Unencrypted hypertext transfer protocol.',
    securityRecommendation: 'Force permanent HTTP 301 redirect to HTTPS (Port 443) with HSTS header enabled.'
  },
  {
    port: 443,
    protocol: 'TCP',
    service: 'HTTPS / TLS 1.3 / QUIC',
    category: 'Web/Mail',
    description: 'Encrypted modern web traffic.',
    securityRecommendation: 'Enforce TLS 1.2/1.3, disable weak ciphers (RC4, 3DES), automate 90-day Let\'s Encrypt ACME renewals.'
  },
  {
    port: 465,
    protocol: 'TCP',
    service: 'SMTPS (Implicit TLS SMTP)',
    category: 'Web/Mail',
    description: 'Authenticated email client submission over SSL.',
    securityRecommendation: 'Use with SASL authentication and rate-limiting to prevent outbound spam compromises.'
  },
  {
    port: 554,
    protocol: 'TCP/UDP',
    service: 'RTSP (Real Time Streaming)',
    category: 'Surveillance',
    description: 'CCTV IP camera and NVR live video feed transport.',
    securityRecommendation: 'NEVER expose directly to WAN. Place cameras on isolated VLAN and tunnel RTSP over WireGuard/IPsec.'
  },
  {
    port: 587,
    protocol: 'TCP',
    service: 'Mail Submission (STARTTLS)',
    category: 'Web/Mail',
    description: 'Standard modern email client message submission port.',
    securityRecommendation: 'Mandate strict password complexity and SPF alignment for authenticating accounts.'
  },
  {
    port: 993,
    protocol: 'TCP',
    service: 'IMAPS (Encrypted IMAP)',
    category: 'Web/Mail',
    description: 'Secure multi-device email inbox synchronization.',
    securityRecommendation: 'Use valid TLS certificate matching hostname and enable fail2ban for brute-force protection.'
  },
  {
    port: 1194,
    protocol: 'UDP',
    service: 'OpenVPN',
    category: 'Network',
    description: 'Encrypted virtual private network tunnel.',
    securityRecommendation: 'Enforce TLS-Auth HMAC key, AES-256-GCM cipher, and certificate revocation list (CRL).'
  },
  {
    port: 3389,
    protocol: 'TCP/UDP',
    service: 'RDP (Remote Desktop Protocol)',
    category: 'Remote',
    description: 'Microsoft Windows Graphical Remote Desktop.',
    securityRecommendation: 'CRITICAL: Never forward directly on public router. Enforce NLA, 2FA, and gate behind VPN or Apache Guacamole.'
  },
  {
    port: 5060,
    protocol: 'TCP/UDP',
    service: 'SIP (VoIP Telephony)',
    category: 'Network',
    description: 'Voice over IP telephony signaling.',
    securityRecommendation: 'Apply QoS traffic shaping, IP whitelist SIP trunks, and deploy Fail2ban on Asterisk/FreePBX.'
  },
  {
    port: 8000,
    protocol: 'TCP',
    service: 'Hikvision / CCTV SDK Port',
    category: 'Surveillance',
    description: 'DVR/NVR device management and stream controller.',
    securityRecommendation: 'Restrict access to trusted administrative subnet only; update camera firmware regularly.'
  },
  {
    port: 8006,
    protocol: 'TCP',
    service: 'Proxmox VE Web GUI',
    category: 'Cloud',
    description: 'Hypervisor cluster virtualization management portal.',
    securityRecommendation: 'Enforce TOTP / WebAuthn Two-Factor Authentication and restrict WAN access via firewall.'
  },
  {
    port: 51820,
    protocol: 'UDP',
    service: 'WireGuard VPN',
    category: 'Security',
    description: 'Ultra-fast modern cryptographic VPN protocol.',
    securityRecommendation: 'Silent to port scanning (drops unrecognized handshakes), uses Noise protocol with Curve25519.'
  }
];
