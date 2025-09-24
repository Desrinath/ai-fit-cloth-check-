import React from 'react';

interface IconProps {
  className?: string;
}

export const UploadIcon: React.FC<IconProps> = ({ className }) => (
  <svg className={className} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
  </svg>
);

export const SparklesIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 010 1.414L16 12l-2.293-2.293a1 1 0 010-1.414L16 6l-2.293-2.293a1 1 0 010-1.414L16 0l2.293 2.293a1 1 0 010 1.414L16 6zM17 17l-2.293 2.293a1 1 0 01-1.414 0L11 17l2.293-2.293a1 1 0 011.414 0L17 17z" />
    </svg>
);

export const PersonIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);

export const TrashIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);

export const WandIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 4l6 6-7 7-6-6 7-7z"></path>
        <path d="M5 15l-2 2 6 6 2-2"></path>
        <path d="M15 4l-3.5 3.5"></path>
    </svg>
);

export const LogoIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm2.29 15.41L12 15.12l-2.29 2.29c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L10.59 12 8.3 9.71c-.39-.39-.39-1.02 0-1.41s1.02-.39 1.41 0L12 10.59l2.29-2.29c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L13.41 12l2.29 2.29c.39.39.39 1.02 0 1.41-.38.4-1.02.4-1.41.01z"></path>
    </svg>
);

export const DownloadIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
);

// BODY MEASUREMENT ICONS
export const HeightIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 21V3"/>
        <path d="m15 6-3-3-3 3"/>
        <path d="m15 18-3 3-3-3"/>
    </svg>
);
export const ChestIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22a2 2 0 0 0 2-2V7l-2-2-2 2v13a2 2 0 0 0 2 2z"/>
        <path d="M16 7h3a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2"/>
        <path d="M5 6H3a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h3"/>
    </svg>
);
export const HipIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 22V12h6v10M9 12a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3"/>
        <path d="M3 12h18"/>
    </svg>
);

// GENDER ICONS
export const MaleIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="17" x2="12" y2="22"></line>
        <line x1="9" y1="22" x2="15" y2="22"></line>
        <line x1="12" y1="1" x2="12" y2="7"></line>
        <line x1="9" y1="4" x2="15" y2="4"></line>
    </svg>
);

export const FemaleIcon: React.FC<IconProps> = ({ className }) => (
     <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5"></circle>
        <path d="M12 13v9"></path>
        <path d="M9 22h6"></path>
        <path d="M17 18h-4.5a2.5 2.5 0 0 1-2.5-2.5V13h9v2.5a2.5 2.5 0 0 1-2.5 2.5z"></path>
    </svg>
);

// LIGHTING ICONS
export const StudioLightIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 13l-3 9"></path>
        <path d="M15 13l-3.5-3.5"></path>
        <path d="M12 22l-3-9"></path>
        <path d="M6 13l3.5-3.5"></path>
        <path d="M18 13l-3.5-3.5"></path>
        <circle cx="12" cy="5" r="3"></circle>
    </svg>
);

export const NaturalLightIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);

export const DramaticLightIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);

// POSE ICONS
export const APoseIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v7"></path>
        <path d="M12 14l-3 7"></path>
        <path d="M12 14l3 7"></path>
        <path d="M9 11h6"></path>
    </svg>
);
export const WalkingIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v6"></path>
        <path d="M14 11l-2 2-2-4"></path>
        <path d="M10 17l2 4 4-6"></path>
    </svg>
);
export const HandsOnHipsIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v5"></path>
        <path d="M12 12l-4 1h-1l-1 4"></path>
        <path d="M12 12l4 1h1l1 4"></path>
        <path d="M10 21l2-5 2 5"></path>
    </svg>
);
export const SittingIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="5" r="2"></circle>
        <path d="M10 7v5"></path>
        <path d="M10 12l-4 1"></path>
        <path d="M6 13h8v5h-5l-3 3"></path>
    </svg>
);
export const LeaningIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="5" r="2"></circle>
        <path d="M10 7l2 12"></path>
        <path d="M12 19l-4 2"></path>
        <path d="M8 12l-3-1"></path>
        <path d="M17 3v18"></path>
    </svg>
);
export const ActionIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="6" r="2"></circle>
        <path d="M8 8l3 4 5-3-4 8"></path>
        <path d="M5 14l3-2"></path>
        <path d="M16 4l-3 2"></path>
    </svg>
);
export const CandidIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="6" r="2"></circle>
        <path d="M12 8a4 4 0 0 0-4 4v1"></path>
        <path d="M12 8a4 4 0 0 1 4 4v1"></path>
        <path d="M12 13v8"></path>
        <path d="M10 21l2-4 2 4"></path>
        <path d="M9 11h6"></path>
    </svg>
);
export const OverTheShoulderIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="6" r="2"></circle>
        <path d="M9 8v8l6 4"></path>
        <path d="M9 16l-3 4"></path>
        <path d="M12 12l-6-2"></path>
    </svg>
);
export const CrossedArmsIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v4"></path>
        <path d="M8 11h8l-4 4-4-4z"></path>
        <path d="M12 15v6"></path>
        <path d="M10 21l2-4 2 4"></path>
    </svg>
);
export const FashionStanceIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="5" r="2"></circle>
        <path d="M12 7v7"></path>
        <path d="M12 14l-3 7"></path>
        <path d="M15 21l-1-7h-4"></path>
    </svg>
);

// NEW ICONS

export const HairIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 13s2-6 7-8 7 3 7 8-2 6-7 8-7-3-7-8z"></path>
        <path d="M20.5 10c-3-2-5.5 2.5-5.5 2.5"></path>
    </svg>
);

export const LightbulbIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6v-2.2c0-1-.4-2-1.2-2.8C13 12.4 12.4 12 12 11.5V9c0-1.7 1.3-3 3-3h0a3 3 0 0 0-3-3C9.3 6 8 7.3 8 9v2.5c-.4.5-1 1.4-1.8 2.2C5.4 14 5 15 5 16v2h4"></path>
        <line x1="12" y1="22" x2="12" y2="18"></line>
        <line x1="9" y1="22" x2="15" y2="22"></line>
    </svg>
);

export const SendIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

// BACKGROUND ICONS
export const StreetIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 22h16"/>
        <path d="M8 18V7c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2v11"/>
        <path d="M10 12h4"/>
        <path d="M10 16h4"/>
        <path d="M12 7V5"/>
        <path d="M12 22v-4"/>
    </svg>
);
export const GalleryIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
    </svg>
);
export const BeachIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22c-5 0-8-3-8-6s3-6 8-6 8 3 8 6-3 6-8 6z"></path>
        <path d="M12 2v6"></path>
        <path d="M18.36 5.64l-4.24 4.24"></path>
        <path d="M5.64 5.64l4.24 4.24"></path>
    </svg>
);
export const CityIcon: React.FC<IconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 22h18"/>
        <path d="M5 22V8l4-4 4 4v14"/>
        <path d="M15 22V4l4 4v14"/>
        <path d="M9 18h4"/>
    </svg>
);