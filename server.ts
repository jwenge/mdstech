import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: "5mb" }));

  // Shared Gemini client (server-side only)
  let ai: GoogleGenAI | null = null;
  function getGeminiClient(): GoogleGenAI | null {
    if (!ai && process.env.GEMINI_API_KEY) {
      ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });
    }
    return ai;
  }

  // Health check
  app.get("/api/health", (_req, res) => {
    res.json({
      status: "online",
      timestamp: new Date().toISOString(),
      capabilities: [
        "network-security",
        "web-mail-hosting",
        "cctv-access-control",
        "system-automation",
        "cloud-infrastructure",
      ],
      aiConfigured: Boolean(process.env.GEMINI_API_KEY),
    });
  });

  // AI Diagnostic & Triage Endpoint
  app.post("/api/diagnose", async (req, res) => {
    const { category, issueDescription, environmentDetails, urgency } = req.body;

    if (!issueDescription || typeof issueDescription !== "string") {
      return res.status(400).json({ error: "issueDescription is required" });
    }

    const client = getGeminiClient();

    if (!client) {
      // Intelligent fallback diagnostics when API key is not yet set
      return res.json({
        analysis: `Preliminary Diagnostic for ${category || "General Tech Infra"}: Based on the reported symptoms ("${issueDescription.slice(0, 80)}..."), this typically indicates a configuration mismatch, firewall drop rule, or handshake timeout.`,
        likelyCauses: [
          "DNS record propagation lag or incorrect MX/SPF configuration",
          "VLAN routing ACL or stateful inspection firewall rule dropping packets",
          "RTSP stream bandwidth saturation or MTU fragmentation over trunk link",
          "Certificate mismatch or TLS cipher suite negotiation failure",
        ],
        recommendedCommands: [
          `ping -c 4 1.1.1.1 # Verify Layer 3 gateway reachability`,
          `dig +trace +short ${category?.toLowerCase().includes("mail") ? "MX example.com" : "example.com"}`,
          `traceroute -T -p 443 destination.host`,
          `tcpdump -ni any 'tcp[tcpflags] & (tcp-rst|tcp-syn) != 0' -c 20`,
        ],
        severity: urgency || "Moderate",
        estimatedResolutionTime: "30 - 90 mins",
        recommendedAction: "Schedule remote diagnostic session or onsite packet analysis.",
      });
    }

    try {
      const prompt = `You are a Principal Tech Support & Infrastructure Security Engineer specializing in:
1. Network & Network Security (pfSense, FortiGate, Cisco, VLANs, WireGuard/IPsec VPN, BGP/OSPF, QoS)
2. Web & Mail Hosting (DNS, SPF/DKIM/DMARC, Nginx/Apache, Postfix, cPanel, SSL/TLS, reverse proxies)
3. Cyber Security (Hardening, firewall ACLs, vulnerability isolation, brute-force mitigation, CrowdStrike/Wazuh)
4. Physical & Home/Business Security (CCTV RTSP/ONVIF NVRs, Hikvision/Dahua/UniFi, Biometric Access Control, RFID Wiegand, IoT)
5. System Automation & Scripting (Bash, Python, Ansible, Webhooks, Home Assistant, automated cron backups)
6. Cloud & Hybrid Services (AWS VPC/EC2, Azure Entra ID, M365 migration, Google Workspace, Proxmox/VMware)

Analyze the following support incident and provide a concise, highly technical yet actionable diagnosis.

Category: ${category || "General IT & Network Infrastructure"}
Reported Issue: ${issueDescription}
Environment: ${environmentDetails || "Not specified"}
Reported Urgency: ${urgency || "Standard"}

Format your response strictly as valid JSON with the following keys:
{
  "analysis": "A concise 2-3 sentence expert technical diagnosis",
  "likelyCauses": ["Cause 1 with specific protocol/tech detail", "Cause 2", "Cause 3"],
  "recommendedCommands": ["command 1 with explanation", "command 2", "command 3"],
  "severity": "Low | Moderate | High | Critical",
  "estimatedResolutionTime": "e.g. 15-45 minutes / 1-2 hours",
  "recommendedAction": "Immediate step to stabilize the service"
}`;

      const response = await client.models.generateContent({
        model: "gemini-3.7-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const responseText = response.text || "{}";
      const parsed = JSON.parse(responseText);
      return res.json(parsed);
    } catch (err: any) {
      console.error("Gemini diagnosis error:", err);
      return res.status(500).json({
        error: "Diagnostic service encountered an error. Please verify the prompt.",
        fallback: {
          analysis: "Automated analysis timeout. Standard triage protocol recommended.",
          likelyCauses: ["Network timeout", "Unreachable service port", "Authentication failure"],
          recommendedCommands: ["ping 8.8.8.8", "nslookup google.com", "curl -Iv https://localhost"],
          severity: "Moderate",
          estimatedResolutionTime: "45 mins",
          recommendedAction: "Direct support contact recommended.",
        },
      });
    }
  });

  // Vite middleware for development vs static serve in production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TechSec Infrastructure Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
});
