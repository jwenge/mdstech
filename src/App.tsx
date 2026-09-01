import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { SpecializationCarousel } from './components/SpecializationCarousel';
import { InteractiveTopology } from './components/InteractiveTopology';
import { InteractiveTechTools } from './components/InteractiveTechTools';
import { ProjectShowcaseCarousel } from './components/ProjectShowcaseCarousel';
import { ClientStatusDashboard } from './components/ClientStatusDashboard';
import { AiIncidentTriage } from './components/AiIncidentTriage';
import { ServiceQuoteEstimator } from './components/ServiceQuoteEstimator';
import { Footer } from './components/Footer';

export default function App() {
  const [aiTriageOpen, setAiTriageOpen] = useState(false);
  const [aiTriageCategory, setAiTriageCategory] = useState<string>('Network & Network Security');

  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quotePrefillScope, setQuotePrefillScope] = useState<string>('');
  const [activeDashboardTicketId, setActiveDashboardTicketId] = useState<string>('TS-NET-8492');

  const handleOpenAiTriage = (category?: string) => {
    if (category) setAiTriageCategory(category);
    setAiTriageOpen(true);
  };

  const handleOpenQuote = (scope?: string) => {
    if (scope) setQuotePrefillScope(scope);
    setQuoteOpen(true);
  };

  const handleEscalateFromAi = (issueSummary: string) => {
    setAiTriageOpen(false);
    setQuotePrefillScope(issueSummary);
    setQuoteOpen(true);
  };

  const handleViewTicketInDashboard = (ticketId: string) => {
    setActiveDashboardTicketId(ticketId);
    // Smooth scroll to the dashboard
    const el = document.getElementById('status-dashboard');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-300 relative">
      
      {/* Top Navbar */}
      <Navbar
        onOpenAiTriage={() => handleOpenAiTriage()}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section with Live Telemetry */}
        <HeroSection
          onOpenAiTriage={() => handleOpenAiTriage()}
          onOpenQuote={() => handleOpenQuote()}
        />

        {/* 2. Specialization Carousel with Embedded Mini-Simulators */}
        <SpecializationCarousel
          onOpenQuoteWithCategory={(cat) => handleOpenQuote(`Inquiry regarding ${cat}`)}
          onOpenAiTriageWithCategory={(cat) => handleOpenAiTriage(cat)}
        />

        {/* 3. Client Status & Deployment Telemetry Dashboard */}
        <ClientStatusDashboard
          onOpenQuote={() => handleOpenQuote()}
          onOpenAiTriage={handleOpenAiTriage}
          initialTicketId={activeDashboardTicketId}
        />

        {/* 4. Interactive Network & Security Topology Blueprint */}
        <InteractiveTopology />

        {/* 5. Engineer Toolkit (Subnet, CCTV Storage, Mail DMARC, Port Matrix) */}
        <InteractiveTechTools />

        {/* 6. Field Deployments & Case Studies Carousel */}
        <ProjectShowcaseCarousel
          onOpenQuote={() => handleOpenQuote('Inquiry regarding Enterprise Infrastructure Modernization')}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenAiTriage={() => handleOpenAiTriage()}
        onOpenQuote={() => handleOpenQuote()}
      />

      {/* Modals */}
      <AiIncidentTriage
        isOpen={aiTriageOpen}
        onClose={() => setAiTriageOpen(false)}
        initialCategory={aiTriageCategory}
        onEscalateToDispatch={handleEscalateFromAi}
      />

      <ServiceQuoteEstimator
        isOpen={quoteOpen}
        onClose={() => setQuoteOpen(false)}
        prefilledScope={quotePrefillScope}
        onViewTicket={handleViewTicketInDashboard}
      />

    </div>
  );
}

