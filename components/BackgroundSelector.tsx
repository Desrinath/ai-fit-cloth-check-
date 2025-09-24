import React from 'react';
import { Background } from '../types';
import { StudioLightIcon, StreetIcon, GalleryIcon, BeachIcon, CityIcon } from './icons';

interface BackgroundSelectorProps {
  selectedBackground: Background;
  onSelectBackground: (background: Background) => void;
}

const backgroundIcons: { [key in Background]: React.ComponentType<{ className?: string }> } = {
  [Background.Studio]: StudioLightIcon,
  [Background.ParisianStreet]: StreetIcon,
  [Background.ArtGallery]: GalleryIcon,
  [Background.TropicalBeach]: BeachIcon,
  [Background.NeonCity]: CityIcon,
};

export const BackgroundSelector: React.FC<BackgroundSelectorProps> = ({ selectedBackground, onSelectBackground }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
      {Object.values(Background).map((background) => {
        const Icon = backgroundIcons[background];
        const isSelected = selectedBackground === background;
        return (
          <button
            key={background}
            onClick={() => onSelectBackground(background)}
            className={`flex flex-col items-center justify-center gap-2 p-2 border rounded-none
              ${isSelected 
                ? 'bg-lime-400 border-lime-200 text-neutral-900' 
                : 'bg-neutral-800 border-neutral-600 text-stone-300 hover:border-lime-400 hover:text-white'
              }`}
          >
            <Icon className="w-7 h-7"/>
            <span className="text-[10px] text-center uppercase">{background}</span>
          </button>
        );
      })}
    </div>
  );
};