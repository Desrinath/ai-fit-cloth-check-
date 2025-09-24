import React from 'react';
import { Lighting } from '../types';
import { StudioLightIcon, NaturalLightIcon, DramaticLightIcon } from './icons';

interface LightingSelectorProps {
  selectedLighting: Lighting;
  onSelectLighting: (lighting: Lighting) => void;
}

const lightingIcons: { [key in Lighting]: React.ComponentType<{ className?: string }> } = {
  [Lighting.Studio]: StudioLightIcon,
  [Lighting.Natural]: NaturalLightIcon,
  [Lighting.Dramatic]: DramaticLightIcon,
};

export const LightingSelector: React.FC<LightingSelectorProps> = ({ selectedLighting, onSelectLighting }) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Object.values(Lighting).map((lighting) => {
        const Icon = lightingIcons[lighting];
        const isSelected = selectedLighting === lighting;
        return (
          <button
            key={lighting}
            onClick={() => onSelectLighting(lighting)}
            className={`flex flex-col items-center justify-center gap-2 p-3 border rounded-none
              ${isSelected 
                ? 'bg-lime-400 border-lime-200 text-neutral-900' 
                : 'bg-neutral-800 border-neutral-600 text-stone-300 hover:border-lime-400 hover:text-white'
              }`}
          >
            <Icon className="w-7 h-7"/>
            <span className="text-xs text-center uppercase">{lighting}</span>
          </button>
        );
      })}
    </div>
  );
};