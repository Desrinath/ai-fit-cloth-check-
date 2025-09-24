import React from 'react';
import { Gender } from '../types';
import { MaleIcon, FemaleIcon } from './icons';

interface GenderSelectorProps {
  onSelectGender: (gender: Gender) => void;
}

export const GenderSelector: React.FC<GenderSelectorProps> = ({ onSelectGender }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <button
        onClick={() => onSelectGender(Gender.Female)}
        className="flex flex-col items-center justify-center gap-4 p-6 border rounded-none bg-neutral-800 border-neutral-600 text-stone-300 hover:border-lime-400 hover:text-white"
      >
        <FemaleIcon className="w-16 h-16" />
        <span className="text-2xl tracking-widest uppercase">Female</span>
      </button>
      <button
        onClick={() => onSelectGender(Gender.Male)}
        className="flex flex-col items-center justify-center gap-4 p-6 border rounded-none bg-neutral-800 border-neutral-600 text-stone-300 hover:border-lime-400 hover:text-white"
      >
        <MaleIcon className="w-16 h-16" />
        <span className="text-2xl tracking-widest uppercase">Male</span>
      </button>
    </div>
  );
};