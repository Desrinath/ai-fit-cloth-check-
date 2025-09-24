import React from 'react';
import { LogoIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-neutral-900/80 backdrop-blur-sm border-b border-stone-700 sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center h-20">
            <div className="flex items-center gap-4">
              <LogoIcon className="w-8 h-8 text-lime-400" />
              <h1 className="text-2xl sm:text-3xl font-retro-heading text-stone-100 tracking-tighter animate-flicker" style={{textShadow: '0 0 5px rgba(163, 230, 53, 0.5)'}}>
                AI Digital Twin &amp; Stylist
              </h1>
            </div>
        </div>
      </div>
    </header>
  );
};