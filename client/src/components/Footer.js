

import React from 'react';

export default function Footer() {
  return (
    <footer className="border-t border-slate-900 py-8 text-center text-xs text-gray-600 px-4 w-full bg-slate-950">
      &copy; {new Date().getFullYear()} NexaATS Platform Inc. Designed for SaaS-grade performance tracking.
    </footer>
  );
}