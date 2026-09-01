import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Building2, 
  Sparkles,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import { CASE_STUDIES } from '../data/specializations';

interface ProjectShowcaseCarouselProps {
  onOpenQuote?: () => void;
}

export const ProjectShowcaseCarousel: React.FC<ProjectShowcaseCarouselProps> = ({ onOpenQuote }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? CASE_STUDIES.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % CASE_STUDIES.length);
  };

  const activeCase = CASE_STUDIES[currentIndex];

  return (
    <section id="cases" className="py-24 bg-slate-950/90 border-t border-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-xs font-mono text-emerald-400 mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              PROVEN FIELD DEPLOYMENTS
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Case Studies & System Modernizations
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-xl">
              Inspect before-and-after architecture transformations, SLA achievements, and technical turnarounds.
            </p>
          </div>

          {/* Carousel Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Previous case"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="font-mono text-xs text-slate-400 px-2">
              <span className="text-emerald-400 font-bold">{currentIndex + 1}</span> / {CASE_STUDIES.length}
            </span>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all shadow-md active:scale-95"
              aria-label="Next case"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active Case Study Card */}
        <div className="rounded-2xl bg-gradient-to-b from-slate-900/80 to-slate-950 border border-slate-800 shadow-2xl p-6 sm:p-8 lg:p-10 space-y-8">
          
          {/* Card Top Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-xs font-mono font-semibold">
                  {activeCase.category}
                </span>
                <span className="text-xs text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  {activeCase.timeline}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-2">
                {activeCase.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 font-mono">
              <Building2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>{activeCase.clientType}</span>
            </div>
          </div>

          {/* Body: Challenge vs Solution */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-950/80 border border-rose-900/30 space-y-2">
              <div className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                The Operational Bottleneck / Challenge:
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {activeCase.challenge}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-950/80 border border-emerald-900/30 space-y-2">
              <div className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                The Deployed Engineering Solution:
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {activeCase.solution}
              </p>
            </div>
          </div>

          {/* Results Metric Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {activeCase.results.map((res, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center">
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400 flex items-center justify-center gap-1">
                  <TrendingUp className="w-4 h-4 text-emerald-500" />
                  {res.metric}
                </div>
                <div className="text-xs text-slate-300 mt-1 font-medium">{res.label}</div>
              </div>
            ))}
          </div>

          {/* Technologies Deployed Strip */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800/80">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-slate-400 uppercase mr-1">Deployed Tech:</span>
              {activeCase.technologies.map((t, idx) => (
                <span key={idx} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-300">
                  {t}
                </span>
              ))}
            </div>

            {onOpenQuote && (
              <button
                onClick={onOpenQuote}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-2 transition-all cursor-pointer"
              >
                Inquire Similar Solution
                <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
              </button>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
