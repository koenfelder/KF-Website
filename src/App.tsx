/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import ReadmeGenerator from './components/ReadmeGenerator';
import NexusCRM from './components/NexusCRM';
import MagazineViewer from './components/MagazineViewer';
import ScrollToTop from './components/ScrollToTop';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean, error: Error | null }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-neutral-950 text-white p-8">
          <div className="max-w-md w-full">
            <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
            <pre className="bg-neutral-900 p-4 rounded text-xs overflow-auto max-h-64">
              {this.state.error?.message}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              className="mt-6 bg-white text-black px-6 py-2 rounded-full font-bold"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/readme" element={<ReadmeGenerator />} />
          <Route path="/nexus" element={<NexusCRM />} />
          <Route path="/magazine" element={<MagazineViewer />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}
