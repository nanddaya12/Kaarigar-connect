import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-surface-container-lowest border-t border-outline-variant/40 py-10 mt-16">
      <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-primary text-on-primary font-bold flex items-center justify-center text-lg">
            K
          </div>
          <div>
            <span className="font-headline font-bold text-base text-primary">KaarigarConnect</span>
            <p class="text-xs text-outline">Hyderabad District Division, Sindh Pakistan</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs text-on-surface-variant font-medium">
          <a href="#" className="hover:text-primary transition-colors">Sindh Guild Standards</a>
          <a href="#" className="hover:text-primary transition-colors">NADRA Verification</a>
          <a href="#" className="hover:text-primary transition-colors">Security Controls</a>
          <a href="#" className="hover:text-primary transition-colors">Privacy & Terms</a>
        </div>

        <p className="text-xs text-outline font-mono">© 2026 KaarigarConnect. All rights reserved.</p>
      </div>
    </footer>
  );
};
