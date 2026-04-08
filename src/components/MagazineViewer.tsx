/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ChevronLeft, ChevronRight, Maximize2, Minimize2 } from 'lucide-react';
import { Link } from 'react-router-dom';

// Default fallback URL - Updated based on user confirmation
const DEFAULT_BASE_URL = "https://raw.githubusercontent.com/koenfelder/KF-Website/main/images/";

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
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [baseUrl, setBaseUrl] = useState(DEFAULT_BASE_URL);
  const [hasTriedFallback, setHasTriedFallback] = useState(false);

  // Generate pages dynamically based on current baseUrl
  const pages = Array.from({ length: 24 }, (_, i) => {
    const pageNum = i + 1;
    const paddedPageNum = pageNum.toString().padStart(2, '0');
    
    const fileName = `SCM Final Version _Page_${paddedPageNum}.png`;
    const encodedFileName = encodeURIComponent(fileName);
    
    return {
      id: pageNum,
      title: metadata[pageNum]?.title || `Page ${pageNum}`,
      image: `${baseUrl}${encodedFileName}`,
      description: metadata[pageNum]?.description || `Continuing the exploration of the Skinwalker Society subculture.`
    };
  });

  const handleImageError = (idx: number) => {
    // If the first page fails, try switching from 'main' to 'master' (or vice versa)
    if (!hasTriedFallback) {
      const newUrl = baseUrl.includes('/main/') 
        ? baseUrl.replace('/main/', '/master/') 
        : baseUrl.replace('/master/', '/main/');
      
      setBaseUrl(newUrl);
      setHasTriedFallback(true);
      setImageError({}); // Reset errors to try again with new URL
      console.log("Switching branch fallback to:", newUrl);
    } else {
      setImageError(prev => ({ ...prev, [idx]: true }));
    }
  };

  const forceReload = () => {
    setImageError({});
    setHasTriedFallback(false);
    setBaseUrl(DEFAULT_BASE_URL);
    setCurrentPage(0);
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
    <div className={`min-h-screen bg-neutral-950 text-white font-sans ${isFullScreen ? 'overflow-hidden' : ''}`}>
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
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
          >
            {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Viewer Area */}
      <div className={`flex flex-col items-center justify-center p-4 md:p-12 ${isFullScreen ? 'h-[calc(100vh-80px)]' : 'min-h-[80vh]'}`}>
        <div className="relative max-w-4xl w-full aspect-[3/4] bg-neutral-900 rounded-lg shadow-2xl overflow-hidden border border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0"
            >
              {imageError[currentPage] ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-900 p-12 text-center">
                  <p className="text-neutral-500 mb-4">Image could not be loaded</p>
                  <code className="text-[10px] text-neutral-700 break-all max-w-xs mb-6">{pages[currentPage].image}</code>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => {
                        navigator.clipboard.writeText(pages[currentPage].image);
                        alert("URL copied to clipboard! Try opening it in a new tab to see if it works.");
                      }}
                      className="text-xs bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-full transition-colors"
                    >
                      Copy Failed URL
                    </button>
                    <button 
                      onClick={forceReload}
                      className="text-xs bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-full transition-colors"
                    >
                      Force Refresh
                    </button>
                  </div>
                </div>
              ) : (
                <img 
                  src={pages[currentPage].image} 
                  alt={pages[currentPage].title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={() => handleImageError(currentPage)}
                />
              )}
              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 to-transparent">
                <h2 className="text-2xl font-bold mb-2">{pages[currentPage].title}</h2>
                <p className="text-neutral-300 text-sm max-w-xl">{pages[currentPage].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <button 
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`p-4 bg-black/20 hover:bg-black/50 backdrop-blur-sm transition-all rounded-r-xl ${currentPage === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <button 
              onClick={nextPage}
              disabled={currentPage === pages.length - 1}
              className={`p-4 bg-black/20 hover:bg-black/50 backdrop-blur-sm transition-all rounded-l-xl ${currentPage === pages.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
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

      {/* Thumbnails */}
      {!isFullScreen && (
        <div className="max-w-6xl mx-auto px-6 pb-24">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-neutral-500 mb-8">Page Overview</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {pages.map((page, idx) => (
              <button
                key={page.id}
                onClick={() => setCurrentPage(idx)}
                className={`aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${currentPage === idx ? 'border-brand scale-105 shadow-lg shadow-brand/20' : 'border-transparent opacity-50 hover:opacity-100'}`}
              >
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                  {imageError[idx] ? (
                    <span className="text-[8px] text-neutral-600">404</span>
                  ) : (
                    <img 
                      src={page.image} 
                      alt={page.title} 
                      className="w-full h-full object-cover" 
                      referrerPolicy="no-referrer"
                      onError={() => handleImageError(idx)}
                    />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
