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
  const [baseUrl, setBaseUrl] = useState(() => {
    return localStorage.getItem('magazine_base_url') || DEFAULT_BASE_URL;
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [imageError, setImageError] = useState<Record<number, boolean>>({});
  const [showDebugger, setShowDebugger] = useState(false);

  // Generate pages dynamically based on current baseUrl
  const pages = Array.from({ length: 24 }, (_, i) => {
    const pageNum = i + 1;
    const paddedPageNum = pageNum.toString().padStart(2, '0');
    
    // Try both padded and non-padded page numbers
    const fileName = `SCM Final Version _Page_${paddedPageNum}.png`;
    const encodedFileName = encodeURIComponent(fileName);
    
    return {
      id: pageNum,
      title: metadata[pageNum]?.title || `Page ${pageNum}`,
      image: `${baseUrl}${encodedFileName}`,
      description: metadata[pageNum]?.description || `Continuing the exploration of the Skinwalker Society subculture.`
    };
  });

  const handleBaseUrlChange = (newUrl: string) => {
    // Ensure URL ends with a slash
    const formattedUrl = newUrl.endsWith('/') ? newUrl : `${newUrl}/`;
    setBaseUrl(formattedUrl);
    localStorage.setItem('magazine_base_url', formattedUrl);
    setImageError({}); // Reset errors when URL changes
  };

  const tryDiscovery = async () => {
    const commonPaths = [
      "https://raw.githubusercontent.com/koenfelder/KF-Website/main/Untitled/images/",
      "https://raw.githubusercontent.com/koenfelder/KF-Website/main/images/",
      "https://raw.githubusercontent.com/koenfelder/KF-Website/master/Untitled/images/",
      "https://raw.githubusercontent.com/koenfelder/KF-Website/master/images/",
      "https://raw.githubusercontent.com/koenfelder/KF-Website/main/KF-Website/Untitled/images/",
      "https://koenfelder.github.io/KF-Website/images/",
      "https://koenfelder.github.io/KF-Website/Untitled/images/",
    ];

    for (const path of commonPaths) {
      const testUrl = `${path}${encodeURIComponent("SCM Final Version _Page_01.png")}`;
      try {
        const response = await fetch(testUrl, { method: 'HEAD' });
        if (response.ok) {
          handleBaseUrlChange(path);
          alert(`Success! Found working path: ${path}`);
          return;
        }
      } catch (e) {
        // Continue to next path
      }
    }
    alert("Could not automatically find the images. Please check if your GitHub repository is PUBLIC.");
  };

  const handleManualUrl = (fullUrl: string) => {
    try {
      const url = new URL(fullUrl);
      // Extract everything before the filename
      const pathParts = url.pathname.split('/');
      const fileName = pathParts.pop();
      if (fileName && fileName.includes('_Page_')) {
        const newBase = `${url.origin}${pathParts.join('/')}/`;
        handleBaseUrlChange(newBase);
        alert("Successfully learned the base URL from your link!");
      } else {
        alert("Please paste a full URL to one of your magazine pages (e.g. Page 01).");
      }
    } catch (e) {
      alert("Invalid URL format.");
    }
  };

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
            onClick={() => setShowDebugger(!showDebugger)}
            className={`flex items-center gap-2 px-3 py-1 rounded-full transition-colors ${showDebugger ? 'bg-brand text-white' : 'text-neutral-400 hover:text-white hover:bg-white/5'}`}
            title="Debug Image Path"
          >
            <Maximize2 className="w-4 h-4 rotate-45" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Debug Path</span>
          </button>
          <button 
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="p-2 text-neutral-400 hover:text-white transition-colors"
          >
            {isFullScreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Debugger Panel */}
      {showDebugger && (
        <div className="bg-neutral-900 border-b border-white/10 p-6 animate-in slide-in-from-top duration-300">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
              Image Path Debugger
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-neutral-500 mb-2">Base Folder URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={baseUrl}
                    onChange={(e) => handleBaseUrlChange(e.target.value)}
                    className="flex-1 bg-black border border-white/10 rounded px-4 py-2 text-sm font-mono focus:border-brand outline-none transition-colors"
                    placeholder="https://raw.githubusercontent.com/..."
                  />
                  <button 
                    onClick={() => handleBaseUrlChange(DEFAULT_BASE_URL)}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded text-xs transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/40 p-4 rounded border border-white/5">
                  <p className="text-[10px] text-neutral-500 mb-2 uppercase">Common Fixes</p>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={tryDiscovery}
                      className="text-[10px] bg-brand text-white px-3 py-1 rounded font-bold hover:bg-brand-dark transition-colors"
                    >
                      Run Auto-Discovery
                    </button>
                    <button 
                      onClick={() => handleBaseUrlChange(baseUrl.replace('/main/', '/master/'))}
                      className="text-[10px] bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded"
                    >
                      Try 'master' branch
                    </button>
                    <button 
                      onClick={() => handleBaseUrlChange(baseUrl.replace('/Untitled/', '/'))}
                      className="text-[10px] bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded"
                    >
                      Remove 'Untitled'
                    </button>
                    <button 
                      onClick={() => handleBaseUrlChange(baseUrl.replace('/images/', '/'))}
                      className="text-[10px] bg-neutral-800 hover:bg-neutral-700 px-3 py-1 rounded"
                    >
                      Remove 'images'
                    </button>
                  </div>
                </div>
                <div className="bg-black/40 p-4 rounded border border-white/5">
                  <p className="text-[10px] text-neutral-500 mb-2 uppercase">Manual URL Learning</p>
                  <p className="text-[10px] text-neutral-400 mb-3">Paste the URL of any single page from GitHub:</p>
                  <input 
                    type="text" 
                    placeholder="Paste full URL to Page 01 here..."
                    className="w-full bg-black border border-white/10 rounded px-3 py-1.5 text-xs font-mono mb-2 focus:border-brand outline-none"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleManualUrl(e.currentTarget.value);
                    }}
                  />
                  <p className="text-[9px] text-neutral-600 italic">Example: https://raw.githubusercontent.com/.../Page_01.png</p>
                </div>
                <div className="bg-black/40 p-4 rounded border border-white/5">
                  <p className="text-[10px] text-red-500 mb-2 uppercase font-bold">⚠️ Private Repository?</p>
                  <p className="text-[10px] text-neutral-400 leading-relaxed">
                    If your GitHub repository is <strong>Private</strong>, images will never load here. 
                    Go to GitHub Settings → General → Danger Zone → <strong>Change visibility to Public</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

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
