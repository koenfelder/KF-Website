/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Minimize2, ArrowRight, BookOpen, X, CheckCircle2, Target, Layers, Rocket } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { CASE_STUDIES } from '../data/caseStudies';

// Mapping of Google Drive File IDs for each page
const DRIVE_IDS: Record<number, string> = {
  1: "1OYuGhDjW1scZNwlegUH6ekoLSwugZbJM",
  2: "133YNFRlfN4Shvemfbd1F1nUZkdCeEKwK",
  3: "1outT8gJnm23dsPDk8jG77HA2eNHnN51X",
  4: "1n5CIJjmpgpGJ0J9OxTrGDkIALDbwjth3",
  5: "1Xipol3hovGQmJEyKoWYXLNDTeYsoEJhs",
  6: "1TFg5rmVjLzQMcptmRAca4nV1dLFMlEg0",
  7: "1W3xpIYp8GgxV2OMSfyOX61FXs0IWHeBA",
  8: "1VhNzMen5wjOBqCXyO-sWhrBcKkYr-eDX",
  9: "1wslazmWap1zUcuxJUPnEpu5AYSrg2JQK",
  10: "1TUIRqnPnDZKqBq5c3CXpAmNHHxV4li2A",
  11: "1SE6gYmXAMv4SzGlzM8g-tkOfnuNXAXK1",
  12: "1melHNLMdJZtTJYLTSwjpPNYyRnr22rCJ",
  13: "1fqVzZVpiqGwIp7MixGfzjTRS2TDyzpq3",
  14: "16EpEJ_6GNTv1oP9x9G027Z6wiF7rGeQE",
  15: "1D7QuQnSKz-U9b9tIo1Y4zFmYYa_VDmdE",
  16: "1S0flJ3CUIR5eMG7xUKNHTdRj5JXVZDRO",
  17: "1n1LvTYHBO_P4hBn8rAO5kMW6dB1nvOpe",
  18: "1hQ0c5_YjwOCBBZptp4pmjXlvNei0CcVJ",
  19: "1Q0HhkKlGsqeEAYR2unO_X0u-IA1rYkhp",
  20: "18KoT9SspNw4PJprH2fwAC6QiCuX56enR",
  21: "1sIDsWuwzSCatrhEKqDdXAAFXJeppBqCj",
  22: "1EQ2g0JNjBm7ZkK0IruFmVMAQGtVbFmHd",
  23: "1FQhj_mPznH1PYXGe4TF7a7FEMC5gSpwS",
  24: "14x6h9Oo3dduwXJUJoFvk5ZoAjHFdu4BS",
};

const metadata: Record<number, { title: string; description: string }> = {
  1: { title: "Cover", description: "SkinWalker Society Volume 1, Issue No. 5 - All About Skinwalkers!" },
  2: { title: "Member Directory", description: "Table of contents and welcome message for the SkinWalker Society." },
  3: { title: "Cultural Cryptozoology", description: "An introduction to the study of creatures outside mainstream science." },
  4: { title: "Cryptidcore Aesthetics", description: "Exploring the lifestyle, aesthetics, and field activities of paranormal enthusiasts." },
  5: { title: "Community Synergy", description: "Connecting researchers and the impact of digital media on modern folklore." },
  6: { title: "Navajo Origins", description: "Historical research into the traditional legends of the southwest." },
  7: { title: "The Oral Tradition", description: "Exclusive interviews and recordings with Navajo tribal elders." },
  8: { title: "Personal Encounters", description: "Vivid accounts and witness testimonies from those living on the reservation." },
  9: { title: "Media vs Mythos", description: "Analyzing the divide between sacred cultural truths and Hollywood adaptations." },
  10: { title: "Deconstructing Hoaxes", description: "A technical breakdown of the 'Sound Only' viral phenomenon." },
  11: { title: "Integrity in Research", description: "The ethical weight of misrepresentation and the path to cultural sensitivity." },
  12: { title: "Scientific Inquiry", description: "A conversation with Erik Bard on methodology and factual verification." },
  13: { title: "Research Horizons", description: "Mapping the future of investigative cryptozoology and archive building." },
  14: { title: "Observation Logs", description: "Community-submitted field notes and environmental data." },
  15: { title: "The Investigator’s Kit", description: "Technical review of essential gear for desert field research." },
  16: { title: "Preservation Efforts", description: "The critical mission of safeguarding Indigenous narratives for future generations." },
  17: { title: "Comparative Folklore", description: "Global perspectives on shapeshifting entities across cultures." },
  18: { title: "Cognitive Resonance", description: "The psychological factors behind belief in the unexplained." },
  19: { title: "Societal Impact", description: "Dr. Arlan Hall discusses how urban legends shape community identity." },
  20: { title: "Anomalous Tracking", description: "Advanced methods for identifying and documenting desert phenomena." },
  21: { title: "Researcher Profile", description: "Spotlighting innovative contributions from independent field scholars." },
  22: { title: "Restricted Archives", description: "A curation of historical documents and rare shapeshifter evidence." },
  23: { title: "Executive Summary", description: "Final insights from Issue No. 5 and a look ahead to Volume 2." },
  24: { title: "Back Cover", description: "Skinwalker Society Volume 1, Issue No. 5 - Join the hunt." },
};

export default function MagazineViewer() {
  const [currentPage, setCurrentPage] = useState(0); // 0 = Cover, 1 = Spread 1 (pages 2-3), etc.
  const [showGrid, setShowGrid] = useState(false);
  const [showCaseStudy, setShowCaseStudy] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const location = useLocation();
  const content = CASE_STUDIES['magazine']!;

  useEffect(() => {
    // Check if we should open the case study automatically
    if (location.state && (location.state as any).openCaseStudy) {
      setShowCaseStudy(true);
    }
  }, [location]);

  // Generate pages based on Google Drive IDs
  const pages = Array.from({ length: 24 }, (_, i) => {
    const pageNum = i + 1;
    const driveId = DRIVE_IDS[pageNum];
    // sz=w2000 provides a high-quality thumbnail without the Drive UI
    const imageUrl = `https://drive.google.com/thumbnail?id=${driveId}&sz=w2000`;
    
    return {
      id: pageNum,
      title: metadata[pageNum]?.title || `Page ${pageNum}`,
      image: imageUrl,
      description: metadata[pageNum]?.description || `Continuing the exploration of the Skinwalker Society subculture.`
    };
  });

  // Spread logic:
  // index 0: [Page 1] (Cover)
  // index 1: [Page 2, Page 3]
  // index 2: [Page 4, Page 5]
  // ...
  // index 11: [Page 22, Page 23]
  // index 12: [Page 24] (Back Cover)
  
  const totalSpreads = Math.ceil((pages.length - 2) / 2) + 2; // Cover + Inside Spreads + Back Cover

  const getPagesForSpread = (spreadIdx: number) => {
    if (spreadIdx === 0) return [pages[0]]; // Cover
    if (spreadIdx === totalSpreads - 1) return [pages[pages.length - 1]]; // Back Cover
    
    const firstIdx = (spreadIdx - 1) * 2 + 1;
    return [pages[firstIdx], pages[firstIdx + 1]];
  };

  const handleImageError = (idx: number) => {
    setImageError(prev => ({ ...prev, [idx]: true }));
  };

  const nextPage = () => {
    if (currentPage < totalSpreads - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={`min-h-screen bg-white text-neutral-900 font-sans transition-colors duration-500 ${showGrid ? 'overflow-hidden' : ''}`}>
      {/* Header */}
      <nav className="px-6 py-4 flex justify-between items-center border-b border-neutral-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-neutral-500 hover:text-brand transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold text-sm">Portfolio</span>
        </Link>
        <div className="text-center">
          <h1 className="text-sm font-black uppercase tracking-[0.2em] text-neutral-900">SkinWalker Society</h1>
          <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest mt-0.5">Issue No. 05 • Digital Edition</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowCaseStudy(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-neutral-900 text-white hover:bg-brand rounded-full transition-all font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-neutral-900/10 hover:shadow-brand/20"
          >
            <BookOpen className="w-3 h-3" />
            <span className="hidden xs:inline">Case Study</span>
          </button>
          <button 
            onClick={() => setShowGrid(!showGrid)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all border ${showGrid ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-900'}`}
          >
            {showGrid ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
            <span className="text-[10px] font-bold uppercase tracking-tight">
              {showGrid ? "Close" : "Index"}
            </span>
          </button>
        </div>
      </nav>

      {/* Viewer Area */}
      <div className={`flex flex-col items-center justify-center p-4 md:p-12 transition-all duration-700 ${showGrid ? 'opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <div className="relative flex items-center justify-center w-full max-w-7xl mx-auto">
          {/* Navigation Controls - Desktop Left */}
          <div className="hidden lg:block absolute left-0 z-10">
            <button 
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`group p-6 bg-white border border-neutral-200 shadow-xl rounded-full transition-all hover:scale-110 active:scale-95 disabled:opacity-0`}
            >
              <ChevronLeft className="w-6 h-6 text-neutral-400 group-hover:text-neutral-900" />
            </button>
          </div>

          {/* Book Spreads Container */}
          <div className="relative w-full flex justify-center perspective-[2500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, rotateY: 45, x: 100 }}
                animate={{ opacity: 1, rotateY: 0, x: 0 }}
                exit={{ opacity: 0, rotateY: -45, x: -100 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex shadow-[0_40px_100px_-20px_rgba(0,0,0,0.2)] rounded-sm overflow-hidden bg-white ring-1 ring-neutral-200"
              >
                {getPagesForSpread(currentPage).map((page, idx, array) => (
                  <div 
                    key={page.id} 
                    className={`relative bg-white border-neutral-100 ${array.length === 2 ? 'w-[350px] md:w-[450px] aspect-[3/4]' : 'w-[350px] md:w-[450px] aspect-[3/4] mx-auto'} ${idx === 0 && array.length === 2 ? 'border-r' : ''}`}
                  >
                    {/* Shadow/Fold Effect */}
                    {array.length === 2 && (
                      <div 
                        className={`absolute inset-y-0 w-20 z-10 pointer-events-none transition-opacity duration-1000 ${idx === 0 ? 'right-0 bg-gradient-to-l from-black/10' : 'left-0 bg-gradient-to-r from-black/10'}`} 
                      />
                    )}                    {/* Page Image */}
                    {imageError[page.id] ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-neutral-50">
                        <p className="text-neutral-300 text-xs font-bold uppercase tracking-widest mb-4">Error Loading Page Content</p>
                        <div className="w-12 h-1px bg-neutral-200" />
                      </div>
                    ) : (
                      <img 
                        src={page.image} 
                        alt={page.title}
                        className="w-full h-full object-contain transform-gpu"
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(page.id)}
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls - Desktop Right */}
          <div className="hidden lg:block absolute right-0 z-10">
            <button 
              onClick={nextPage}
              disabled={currentPage === totalSpreads - 1}
              className={`group p-6 bg-white border border-neutral-200 shadow-xl rounded-full transition-all hover:scale-110 active:scale-95 disabled:opacity-0`}
            >
              <ChevronRight className="w-6 h-6 text-neutral-400 group-hover:text-neutral-900" />
            </button>
          </div>
        </div>

        {/* Mobile Controls */}
        <div className="flex lg:hidden items-center gap-8 mt-12">
          <button 
            onClick={prevPage}
            disabled={currentPage === 0}
            className="p-4 bg-white border border-neutral-200 rounded-full disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="text-[10px] font-black uppercase tracking-widest text-neutral-400">
            Spread {currentPage + 1} of {totalSpreads}
          </div>
          <button 
            onClick={nextPage}
            disabled={currentPage === totalSpreads - 1}
            className="p-4 bg-white border border-neutral-200 rounded-full disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Info Area */}
        <div className="mt-16 text-center max-w-xl mx-auto px-4">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <h2 className="text-2xl font-serif italic text-neutral-900 tracking-tight">
              {Array.from(new Set(getPagesForSpread(currentPage).map(p => p.title))).join(' & ')}
            </h2>
            <p className="text-neutral-500 text-sm leading-relaxed font-light">
              {getPagesForSpread(currentPage)[0].description}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Index Overlay */}
      <AnimatePresence>
        {showGrid && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white pt-24 pb-12 px-8 overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex justify-between items-end mb-16 border-b border-neutral-100 pb-8">
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 mb-3">Society Archives</h3>
                  <h2 className="text-5xl font-serif italic tracking-tighter text-neutral-900">SkinWalker Society Vol 1, No. 5</h2>
                </div>
                <button 
                  onClick={() => setShowGrid(false)}
                  className="group flex items-center gap-3 px-8 py-3 bg-neutral-900 text-white rounded-full font-bold text-xs uppercase tracking-widest hover:bg-neutral-800 transition-all"
                >
                  Return to Reader <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-x-8 gap-y-12">
                {pages.map((page, idx) => (
                  <button
                    key={page.id}
                    onClick={() => {
                      // Map page index back to spread index
                      const spreadIdx = idx === 0 ? 0 : idx === pages.length - 1 ? totalSpreads - 1 : Math.floor((idx - 1) / 2) + 1;
                      setCurrentPage(spreadIdx);
                      setShowGrid(false);
                    }}
                    className="group text-left"
                  >
                    <div className="relative aspect-[3/4] mb-4 overflow-hidden rounded-sm bg-neutral-50 ring-1 ring-neutral-200 transition-all group-hover:ring-neutral-900 group-hover:shadow-2xl">
                      <img 
                        src={page.image} 
                        alt={page.title} 
                        className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105" 
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(page.id)}
                      />
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-[11px] font-bold uppercase tracking-tight text-neutral-900 group-hover:text-brand transition-colors line-clamp-1">{page.title}</h4>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Case Study Side Panel */}
      <AnimatePresence>
        {showCaseStudy && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCaseStudy(false)}
              className="fixed inset-0 bg-neutral-900/40 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-xl bg-white shadow-2xl z-[110] overflow-y-auto"
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
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                      <Target className="w-5 h-5 text-orange-600" />
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
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center">
                      <Layers className="w-5 h-5 text-neutral-600" />
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
