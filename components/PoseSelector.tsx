import React from 'react';
import { Pose } from '../types';
import { APoseIcon, WalkingIcon, HandsOnHipsIcon, SittingIcon, LeaningIcon, ActionIcon, CandidIcon, OverTheShoulderIcon, CrossedArmsIcon, FashionStanceIcon } from './icons';

interface PoseSelectorProps {
  selectedPose: Pose;
  onSelectPose: (pose: Pose) => void;
}

const poseIcons: { [key in Pose]: React.ComponentType<{ className?: string }> } = {
  [Pose.APose]: APoseIcon,
  [Pose.Walking]: WalkingIcon,
  [Pose.HandsOnHips]: HandsOnHipsIcon,
  [Pose.Sitting]: SittingIcon,
  [Pose.Leaning]: LeaningIcon,
  [Pose.Action]: ActionIcon,
  [Pose.Candid]: CandidIcon,
  [Pose.OverTheShoulder]: OverTheShoulderIcon,
  [Pose.CrossedArms]: CrossedArmsIcon,
  [Pose.FashionStance]: FashionStanceIcon,
};

export const PoseSelector: React.FC<PoseSelectorProps> = ({ selectedPose, onSelectPose }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
      {Object.values(Pose).map((pose) => {
        const Icon = poseIcons[pose];
        const isSelected = selectedPose === pose;
        return (
          <button
            key={pose}
            onClick={() => onSelectPose(pose)}
            className={`flex flex-col items-center justify-center gap-2 p-2 border rounded-none
              ${isSelected 
                ? 'bg-lime-400 border-lime-200 text-neutral-900' 
                : 'bg-neutral-800 border-neutral-600 text-stone-300 hover:border-lime-400 hover:text-white'
              }`}
          >
            <Icon className="w-7 h-7"/>
            <span className="text-[10px] text-center uppercase">{pose}</span>
          </button>
        );
      })}
    </div>
  );
};