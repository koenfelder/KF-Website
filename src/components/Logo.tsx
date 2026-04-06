/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Vertical Stem of K */}
      <rect x="20" y="20" width="10" height="60" fill="#C4996B" />
      
      {/* Top Diagonal of K */}
      <path d="M30 50L65 15H80L45 50H30Z" fill="#C4996B" />
      
      {/* Bottom Diagonal of K */}
      <path d="M30 50L65 85H80L45 50H30Z" fill="#C4996B" />
      
      {/* Top Horizontal Bar of F */}
      <path d="M50 42H85L80 50H45L50 42Z" fill="#C4996B" />
      
      {/* Bottom Horizontal Bar of F */}
      <path d="M55 58H75L70 66H50L55 58Z" fill="#C4996B" />
    </svg>
  );
}
