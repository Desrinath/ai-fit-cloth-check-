import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="text-2xl text-lime-400 font-retro-heading">
      LOADING<span className="blinking-cursor">...</span>
    </div>
  );
};