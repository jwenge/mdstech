export type CategoryId = 
  | 'all'
  | 'network'
  | 'web-mail'
  | 'cybersecurity'
  | 'cctv-access'
  | 'automation'
  | 'cloud';

export interface Specialization {
  id: string;
  category: CategoryId;
  title: string;
  subtitle: string;
  badge: string;
  tagline: string;
  description: string;
  highlights: string[];
  techStack: string[];
  protocols: string[];
  stats: { label: string; value: string }[];
  interactiveType: 'firewall' | 'dns' | 'cctv' | 'hardening' | 'automation' | 'cloud';
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  clientType: string;
  challenge: string;
  solution: string;
  technologies: string[];
  results: { metric: string; label: string }[];
  timeline: string;
}

export interface DiagnosticResult {
  analysis: string;
  likelyCauses: string[];
  recommendedCommands: string[];
  severity: 'Low' | 'Moderate' | 'High' | 'Critical';
  estimatedResolutionTime: string;
  recommendedAction: string;
}

export interface SubnetResult {
  ip: string;
  cidr: number;
  netmask: string;
  wildcard: string;
  networkAddress: string;
  broadcastAddress: string;
  usableHostRange: string;
  totalHosts: number;
  usableHosts: number;
  ipClass: string;
  binarySubnet: string;
}

export interface CctvCalcResult {
  totalStorageGB: number;
  totalStorageTB: number;
  totalBitrateMbps: number;
  bandwidthMBps: number;
  recommendedHDD: string;
  monthlyBandwidthGB: number;
}

export interface TicketMilestone {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'pending';
  timestamp?: string;
  details: string;
}

export interface TicketLog {
  time: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'diagnostic';
}

export interface SupportTicket {
  ticketId: string;
  clientName: string;
  companyName: string;
  service: string;
  title: string;
  scopeSummary: string;
  status: 'Initiated' | 'In Progress' | 'Testing & Audit' | 'Completed' | 'Standby';
  priority: 'Low' | 'Moderate' | 'Normal' | 'High' | 'Critical';
  assignedEngineer: string;
  createdAt: string;
  estimatedCompletion: string;
  overallProgress: number; // 0 - 100
  slaTier: string;
  slaTargetHours: number;
  timeRemaining?: string;
  currentMilestone: string;
  milestones: TicketMilestone[];
  liveLogs: TicketLog[];
  metrics: { label: string; value: string; unit?: string; status?: 'good' | 'warning' | 'neutral' }[];
  deliverables: { name: string; type: 'doc' | 'config' | 'report' | 'key'; status: 'ready' | 'generating' | 'pending'; downloadContent?: string }[];
}
