/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Minimize2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  2: { title: "Table of Contents", description: "Welcome Members, Cryptozoology Lifestyle, History of Skinwalkers, and more." },
  3: { title: "Welcome Members!", description: "The study of creatures whose existence is unsupported by mainstream science." },
  4: { title: "The Cryptozoology Lifestyle", description: "Exploring the aesthetic (Cryptidcore) and common activities like field investigations." },
  5: { title: "Community & Connections", description: "Engagement with the cryptozoology community and the impact of mainstream media." },
  6: { title: "The History of Skinwalkers", description: "Stories and legends from the Navajo Reservation." },
  7: { title: "Interviews With Navajo Elders", description: "First-hand accounts from Paul Sells Sr. and Kenneth Yazzie." },
  8: { title: "Stories from the Reservation", description: "Personal experiences shared by Marisa Sells and Eric Begaye." },
  9: { title: "Skinwalkers in the Mainstream", description: "The disconnect between cultural representation and pop culture tropes." },
  10: { title: "The Skinwalker Hoax", description: "The true story behind the 'Sound Only' hoax of 2021." },
  11: { title: "The Cost of Misrepresentation", description: "How virality and hoaxes impact Indigenous cultures and cryptozoology." },
  12: { title: "Fact Check with Erik Bard", description: "An exclusive interview with Erik Bard on searching for Skinwalkers and combatting hoaxes." },
  13: { title: "The Future of Cryptozoology", description: "Advancing the field through scientific rigor and cultural sensitivity." },
  14: { title: "Field Reports", description: "Recent sightings and investigations documented by our community members." },
  15: { title: "Cryptid Gear Guide", description: "Essential tools for any serious field investigator." },
  16: { title: "Navajo Cultural Preservation", description: "The importance of protecting sacred stories and traditions." },
  17: { title: "Global Context", description: "Comparing Skinwalker legends to shapeshifter myths around the world." },
  18: { title: "The Psychology of Belief", description: "Why we are drawn to the unknown and the mysterious." },
  19: { title: "Interview: Dr. Arlan Hall", description: "Discussing the sociological impact of urban legends." },
  20: { title: "Advanced Tracking Techniques", description: "Methods for identifying anomalous activity in the desert." },
  21: { title: "Community Spotlight", description: "Highlighting the work of independent researchers." },
  22: { title: "Society Archives", description: "A look back at historical documents related to Navajo shapeshifters." },
  23: { title: "Conclusion & Future Research", description: "Summarizing our findings and outlining goals for the next issue." },
  24: { title: "Back Cover", description: "Skinwalker Society Volume 1, Issue No. 5 - Join the hunt." },
};

export default function MagazineViewer() {
  const [currentPage, setCurrentPage] = useState(0); // 0 = Cover, 1 = Spread 1 (pages 2-3), etc.
  const [showGrid, setShowGrid] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

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
                    )}

                    {imageError[page.id] ? (
                      <div className="w-full h-full flex flex-col items-center justify-center p-12 text-center bg-neutral-50">
                        <p className="text-neutral-300 text-xs font-bold uppercase tracking-widest mb-4">Error Loading Page {page.id}</p>
                        <div className="w-12 h-1px bg-neutral-200" />
                      </div>
                    ) : (
                      <img 
                        src={page.image} 
                        alt={page.title}
                        className="w-full h-full object-cover transform-gpu"
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(page.id)}
                      />
                    )}

                    {/* Page Number Overlay */}
                    <div className={`absolute bottom-6 font-mono text-[10px] text-neutral-400 ${idx === 0 && array.length === 2 ? 'left-6' : 'right-6'}`}>
                      {page.id.toString().padStart(2, '0')}
                    </div>
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
              {getPagesForSpread(currentPage).map(p => p.title).join(' & ')}
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
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        referrerPolicy="no-referrer"
                        onError={() => handleImageError(page.id)}
                      />
                      <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-colors" />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] font-black font-mono text-neutral-300 uppercase">{idx + 1}</span>
                      <h4 className="text-[11px] font-bold uppercase tracking-tight text-neutral-900 group-hover:text-brand transition-colors line-clamp-1">{page.title}</h4>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
