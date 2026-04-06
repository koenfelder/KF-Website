/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import ReadmeGenerator from './components/ReadmeGenerator';
import NexusCRM from './components/NexusCRM';
import ScrollToTop from './components/ScrollToTop';

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/readme" element={<ReadmeGenerator />} />
        <Route path="/nexus" element={<NexusCRM />} />
      </Routes>
    </Router>
  );
}
