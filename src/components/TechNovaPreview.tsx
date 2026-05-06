/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, RefreshCw, BookOpen, X, CheckCircle2, Target, Layers, Rocket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CASE_STUDIES } from '../data/caseStudies';

export default function TechNovaPreview() {
  const [loading, setLoading] = React.useState(true);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const location = useLocation();
  const iframeUrl = "https://koenfelder.github.io/TechNova-Website/";
  const content = CASE_STUDIES['technova']!;

  useEffect(() => {
    // Check if we should open the case study automatically
    if (location.state && (location.state as any).openCaseStudy) {
      setShowCaseStudy(true);
    }
  }, [location]);

  return (
    <div className="flex flex-col h-screen bg-neutral-900 overflow-hidden">
      {/* Navigation Header */}
      <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 z-20 shrink-0">
        <div className="flex items-center gap-4">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-neutral-500 hover:text-brand transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Portfolio</span>
          </Link>
          <div className="h-4 w-px bg-neutral-200 mx-2" />
          <h1 className="font-bold text-neutral-900 hidden sm:block">TechNova Website Preview</h1>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            onClick={() => setShowCaseStudy(true)}
            className="flex items-center gap-2 px-3 py-2 bg-neutral-900 text-white hover:bg-brand rounded-full transition-all font-bold text-xs uppercase tracking-widest shadow-lg shadow-neutral-900/10 hover:shadow-brand/20"
          >
            <BookOpen className="w-4 h-4" />
            <span className="hidden xs:inline">Case Study</span>
          </button>

          <button 
            onClick={() => {
              setLoading(true);
              const iframe = document.getElementById('technova-iframe') as HTMLIFrameElement;
              if (iframe) iframe.src = iframeUrl;
            }}
            className="p-2 text-neutral-400 hover:text-brand transition-colors rounded-lg hover:bg-neutral-50"
            title="Refresh Preview"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          
          <a 
            href={iframeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-brand text-white px-4 py-2 rounded-full font-semibold text-sm hover:bg-brand-dark transition-all shadow-lg shadow-brand/10"
          >
            <span className="hidden sm:inline">Open Original</span> <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </header>

      {/* Iframe Viewport */}
      <div className="flex-1 relative bg-neutral-100">
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-brand/20 border-t-brand rounded-full animate-spin" />
              <p className="text-neutral-500 font-medium animate-pulse">Loading TechNova Experience...</p>
            </div>
          </div>
        )}
        
        <iframe
          id="technova-iframe"
          src={iframeUrl}
          className="w-full h-full border-none"
          title="TechNova Website"
          onLoad={() => setLoading(false)}
        />
      </div>

      {/* Case Study Side Panel */}
      <AnimatePresence>
        {showCaseStudy && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCaseStudy(false)}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm z-30"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-40 overflow-y-auto"
            >
              <div className="sticky top-0 bg-white/80 backdrop-blur-md px-8 py-6 border-b border-neutral-100 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-neutral-900">Case Study</h2>
                <button 
                  onClick={() => setShowCaseStudy(false)}
                  className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-neutral-400" />
                </button>
              </div>

              <div className="p-8 space-y-12 pb-20">
                {/* Title */}
                <section>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand mb-3 block">{content.subtitle}</span>
                  <h3 className="text-3xl font-bold text-neutral-900 leading-tight">
                    {content.title}
                  </h3>
                  <p className="mt-4 text-neutral-500 leading-relaxed">
                    {content.overview}
                  </p>
                </section>

                {/* Objective */}
                <section className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <Target className="w-5 h-5 text-blue-600" />
                    </div>
                    <h4 className="text-xl font-bold text-neutral-900">Objective</h4>
                  </div>
                  <p className="text-neutral-600 leading-relaxed bg-neutral-50 p-6 rounded-2xl border border-neutral-100">
                    {content.objective}
                  </p>
                </section>

                {/* Process */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="text-xl font-bold text-neutral-900">Process</h4>
                  </div>
                  <div className="grid gap-6">
                    {content.process.map((step, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="shrink-0 w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-sm font-bold text-neutral-900">{idx + 1}</div>
                        <p className="text-neutral-600 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Results */}
                <section className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <Rocket className="w-5 h-5 text-green-600" />
                    </div>
                    <h4 className="text-xl font-bold text-neutral-900">Results</h4>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {content.results.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-4 bg-white border border-neutral-100 rounded-xl">
                        <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                        <span className="text-sm font-medium text-neutral-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-neutral-500 italic mt-8 border-t border-neutral-100 pt-6">
                    The project was successfully delivered within technical specifications while maintaining strict adherence to performance budgets and project timelines.
                  </p>
                </section>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
