import React, { useState } from 'react';
import { Loader } from './Loader';
import { LogoIcon, DownloadIcon, SendIcon } from './icons';
import { Typewriter } from './Typewriter';

interface StageProps {
  isLoading: boolean;
  loadingMessage: string;
  avatarImage: { base64: string; mimeType: string; } | null;
  outfitImage: string | null;
  error: string | null;
  onSave: () => void;
  onGetFeedback: (query: string) => void;
  isFeedbackLoading: boolean;
  feedback: string | null;
}

export const Stage: React.FC<StageProps> = ({ isLoading, loadingMessage, avatarImage, outfitImage, error, onSave, onGetFeedback, isFeedbackLoading, feedback }) => {
  const [query, setQuery] = useState('');

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onGetFeedback(query);
      setQuery('');
    }
  };


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <Loader />
        <p className="mt-4 text-stone-300 animate-pulse text-lg">{loadingMessage}</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-center text-red-400 bg-red-900/20 border border-red-500 rounded-none p-4">
        <p className="text-xl">{error}</p>
      </div>
    );
  }

  const imageToDisplay = outfitImage || (avatarImage ? `data:${avatarImage.mimeType};base64,${avatarImage.base64}` : null);
  const altText = outfitImage ? "Generated virtual try-on" : "Generated Digital Twin avatar";

  if (imageToDisplay) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center animate-scan-in gap-4">
        <div className="flex justify-between items-center w-full">
            <p className="text-stone-400 uppercase tracking-widest">{outfitImage ? "Styled Look" : "Digital Twin"}</p>
            {outfitImage && (
                <button 
                    onClick={onSave}
                    className="flex items-center gap-2 bg-stone-200 hover:bg-lime-400 text-neutral-900 py-2 px-4 rounded-none"
                >
                    <DownloadIcon className="w-5 h-5"/>
                    SAVE
                </button>
            )}
        </div>
        <div className="w-full flex-grow relative bg-black/20 p-1 border border-neutral-800">
            <img
                src={imageToDisplay}
                alt={altText}
                className="w-full h-full object-contain"
            />
        </div>
        {outfitImage && (
            <div className="w-full pt-4 space-y-3">
                 <h3 className="text-base text-stone-300 uppercase tracking-widest">Ask The Stylist:</h3>
                 <form onSubmit={handleFeedbackSubmit} className="flex items-center gap-2">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="e.g., 'What shoes would go with this?'"
                        className="w-full bg-neutral-800 border border-neutral-600 rounded-none py-2 px-3 text-white placeholder-stone-500 focus:outline-none focus:bg-neutral-700 focus:border-lime-400"
                    />
                    <button type="submit" disabled={isFeedbackLoading} className="bg-stone-200 hover:bg-lime-400 disabled:bg-neutral-600 p-2.5 rounded-none text-white">
                        <SendIcon className="w-5 h-5 text-neutral-900"/>
                    </button>
                 </form>
                 {isFeedbackLoading && (
                    <p className="text-sm text-lime-400 animate-pulse">Stylist is thinking...</p>
                 )}
                 {feedback && (
                    <div className="text-lg text-lime-300 bg-black/30 p-3 rounded-none border border-neutral-700 animate-scan-in">
                        <p><Typewriter text={feedback} /></p>
                    </div>
                 )}
            </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-full text-center text-neutral-700 border border-dashed border-neutral-700 p-4">
        <LogoIcon className="w-24 h-24"/>
        <p className="text-xl font-retro-heading text-neutral-600">STAGE AWAITS INPUT</p>
        <p className="text-neutral-500">Follow steps on the left panel to generate digital twin.</p>
    </div>
  );
};