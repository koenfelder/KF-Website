/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TechNovaPreview() {
  const [loading, setLoading] = React.useState(true);
  const iframeUrl = "https://koenfelder.github.io/TechNova-Website/";

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

        <div className="flex items-center gap-3">
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
            Open Original <ExternalLink className="w-3 h-3" />
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
    </div>
  );
}
