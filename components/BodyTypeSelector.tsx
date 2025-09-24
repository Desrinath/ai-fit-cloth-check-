import React from 'react';
import { BodyShape, BodyMeasurements, Gender, MaleBodyShapes, FemaleBodyShapes } from '../types';
import { HeightIcon, ChestIcon, HipIcon, WandIcon } from './icons';

interface BodyTypeSelectorProps {
  gender: Gender;
  shape: BodyShape;
  onShapeChange: (shape: BodyShape) => void;
  measurements: BodyMeasurements;
  onMeasurementsChange: (measurements: BodyMeasurements) => void;
  onGenerateAvatar: () => void;
  isGenerating: boolean;
}

const InputField: React.FC<{ 
    label: string; 
    placeholder: string; 
    value: string; 
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: React.ReactNode;
}> = ({ label, placeholder, value, onChange, icon }) => (
    <div>
        <label className="block text-sm text-stone-400 mb-1 uppercase tracking-widest">{label}</label>
        <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {icon}
            </div>
            <input 
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full bg-neutral-800 border border-neutral-600 rounded-none py-2 pl-10 pr-3 text-white placeholder-stone-500 focus:outline-none focus:bg-neutral-700 focus:border-lime-400"
            />
        </div>
    </div>
);


export const BodyTypeSelector: React.FC<BodyTypeSelectorProps> = ({ gender, shape, onShapeChange, measurements, onMeasurementsChange, onGenerateAvatar, isGenerating }) => {
    
    const handleMeasurementChange = (field: keyof BodyMeasurements, value: string) => {
        onMeasurementsChange({ ...measurements, [field]: value });
    };

    const availableShapes = gender === Gender.Male ? MaleBodyShapes : FemaleBodyShapes;

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm text-stone-400 mb-2 uppercase tracking-widest">Body Shape</label>
                <div className="grid grid-cols-2 gap-2">
                    {availableShapes.map((s) => (
                        <button
                            key={s}
                            onClick={() => onShapeChange(s)}
                            className={`px-4 py-2 text-sm rounded-none ${
                                shape === s 
                                ? 'bg-lime-400 text-neutral-900' 
                                : 'bg-neutral-700 hover:bg-neutral-600 border border-transparent text-stone-300 hover:border-stone-400'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
            <div>
                <label className="block text-sm text-stone-400 mb-2 uppercase tracking-widest">Measurements (Optional)</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <InputField 
                        label="Height"
                        placeholder={`e.g., 5'10"`}
                        value={measurements.height}
                        onChange={(e) => handleMeasurementChange('height', e.target.value)}
                        icon={<HeightIcon className="w-5 h-5 text-stone-400" />}
                    />
                     <InputField 
                        label="Chest"
                        placeholder={`e.g., 40"`}
                        value={measurements.chest}
                        onChange={(e) => handleMeasurementChange('chest', e.target.value)}
                        icon={<ChestIcon className="w-5 h-5 text-stone-400" />}
                    />
                     <InputField 
                        label="Hip"
                        placeholder={`e.g., 34"`}
                        value={measurements.hip}
                        onChange={(e) => handleMeasurementChange('hip', e.target.value)}
                        icon={<HipIcon className="w-5 h-5 text-stone-400" />}
                    />
                </div>
            </div>
             <button
                onClick={onGenerateAvatar}
                disabled={isGenerating}
                className="w-full pt-4 flex items-center justify-center gap-3 bg-stone-200 hover:bg-lime-400 disabled:bg-neutral-600 disabled:text-neutral-400 text-neutral-900 py-3 px-4 rounded-none text-md"
            >
                {isGenerating ? 'Creating Avatar...' : <><WandIcon className="w-5 h-5" /> CREATE DIGITAL TWIN</>}
            </button>
        </div>
    );
};