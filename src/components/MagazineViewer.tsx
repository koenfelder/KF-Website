/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Minimize2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// The images are located in the 'images' folder within the repository
const BASE_URL = "https://raw.githubusercontent.com/koenfelder/KF-Website/main/images/";

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
};

export default function MagazineViewer() {
  const [currentPage, setCurrentPage] = useState(0);
  const [showGrid, setShowGrid] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});

  // Generate pages based on the hardcoded BASE_URL
  const pages = Array.from({ length: 24 }, (_, i) => {
    const pageNum = i + 1;
    const paddedPageNum = pageNum.toString().padStart(2, '0');
    const fileName = `SCM Final Version _Page_${paddedPageNum}.png`;
    const encodedFileName = encodeURIComponent(fileName);
    
    return {
      id: pageNum,
      title: metadata[pageNum]?.title || `Page ${pageNum}`,
      image: `${BASE_URL}${encodedFileName}`,
      description: metadata[pageNum]?.description || `Continuing the exploration of the Skinwalker Society subculture.`
    };
  });

  const handleImageError = (idx: number) => {
    setImageError(prev => ({ ...prev, [idx]: true }));
  };

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className={`min-h-screen bg-neutral-950 text-white font-sans ${showGrid ? 'overflow-hidden' : ''}`}>
      {/* Header */}
      <nav className="p-6 flex justify-between items-center border-b border-white/10 bg-neutral-950/50 backdrop-blur-md sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 text-neutral-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Portfolio</span>
        </Link>
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-tight">SkinWalker Society</h1>
          <p className="text-xs text-neutral-500 uppercase tracking-widest">Vol. 1, No. 5</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowGrid(!showGrid)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all shadow-lg ${showGrid ? 'bg-brand text-white' : 'bg-white text-black hover:bg-neutral-200'}`}
            title={showGrid ? "Close Overview" : "View All Pages"}
          >
            {showGrid ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            <span className="text-[11px] font-black uppercase tracking-tighter">
              {showGrid ? "Close Overview" : "View All Pages"}
            </span>
          </button>
        </div>
      </nav>

      {/* Viewer Area */}
      <div className={`flex flex-col items-center justify-center p-4 md:p-8 ${showGrid ? 'h-[calc(100vh-80px)] opacity-20 pointer-events-none blur-sm' : 'min-h-[85vh]'}`}>
        <div className="flex items-center justify-center gap-2 md:gap-8 w-full max-w-6xl">
          <button 
            onClick={prevPage}
            disabled={currentPage === 0}
            className={`p-2 md:p-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all rounded-full ${currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronLeft className="w-6 h-6 md:w-8 h-8" />
          </button>

          <div className="relative max-w-4xl w-full max-h-[75vh] aspect-[3/4] bg-neutral-900 rounded-lg shadow-2xl overflow-hidden border border-white/5">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center"
              >
                {imageError[currentPage] ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 p-12 text-center">
                    <p className="text-neutral-500 mb-4">Image could not be loaded</p>
                    <code className="text-[10px] text-neutral-700 break-all max-w-xs mb-6">{pages[currentPage].image}</code>
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(pages[currentPage].image);
                        alert("URL copied to clipboard! Try opening it in a new tab to see if it works.");
                      }}
                      className="text-xs bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-full transition-colors"
                    >
                      Copy Failed URL
                    </button>
                  </div>
                ) : (
                  <img 
                    src={pages[currentPage].image} 
                    alt={pages[currentPage].title}
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                    onError={() => handleImageError(currentPage)}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={nextPage}
            disabled={currentPage === pages.length - 1}
            className={`p-2 md:p-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm transition-all rounded-full ${currentPage === pages.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronRight className="w-6 h-6 md:w-8 h-8" />
          </button>
        </div>

        {/* Page Info */}
        <div className="mt-6 text-center max-w-2xl px-4">
          <h2 className="text-xl font-bold mb-1">{pages[currentPage].title}</h2>
          <p className="text-neutral-400 text-sm leading-relaxed">{pages[currentPage].description}</p>
        </div>

        {/* Page Indicator */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex gap-2">
            {pages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-2 h-2 rounded-full transition-all ${currentPage === idx ? 'bg-white w-8' : 'bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
          <span className="text-sm font-mono text-neutral-500">
            {currentPage + 1} / {pages.length}
          </span>
        </div>
      </div>

      {/* Thumbnails Overlay */}
      <AnimatePresence>
        {showGrid && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed inset-0 z-40 bg-neutral-950/95 backdrop-blur-xl pt-24 pb-12 px-6 overflow-y-auto"
          >
            <div className="max-w-6xl mx-auto">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-2">Page Overview</h3>
                  <h2 className="text-3xl font-bold">All 24 Pages</h2>
                </div>
                <button 
                  onClick={() => setShowGrid(false)}
                  className="px-6 py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-neutral-200 transition-colors"
                >
                  Back to Reader
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
                {pages.map((page, idx) => (
                  <button
                    key={page.id}
                    onClick={() => {
                      setCurrentPage(idx);
                      setShowGrid(false);
                    }}
                    className={`group relative aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all duration-500 ${currentPage === idx ? 'border-brand scale-105 shadow-2xl shadow-brand/40' : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'}`}
                  >
                    <div className="w-full h-full bg-neutral-900 flex items-center justify-center">
                      {imageError[idx] ? (
                        <span className="text-[10px] text-neutral-600 font-mono">404</span>
                      ) : (
                        <img 
                          src={page.image} 
                          alt={page.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                          referrerPolicy="no-referrer"
                          onError={() => handleImageError(idx)}
                        />
                      )}
                    </div>
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="text-xs font-bold uppercase tracking-widest">View Page {idx + 1}</span>
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
