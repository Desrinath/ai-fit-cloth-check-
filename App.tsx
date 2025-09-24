import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PoseSelector } from './components/PoseSelector';
import { Stage } from './components/Stage';
import { ClothingCategory, Pose, BodyShape, Gender, Lighting, MaleBodyShapes, FemaleBodyShapes, Background } from './types';
import { generateAvatar, generateVirtualTryOn, changeHairstyle, suggestOutfit, getOutfitFeedback } from './services/geminiService';
import { SparklesIcon, PersonIcon, TrashIcon, HairIcon, LightbulbIcon } from './components/icons';
import { BodyTypeSelector } from './components/BodyTypeSelector';
import { GenderSelector } from './components/GenderSelector';
import { LightingSelector } from './components/LightingSelector';
import { BackgroundSelector } from './components/BackgroundSelector';

type ImageFile = { base64: string; mimeType: string };
type BodyMeasurements = { height: string; chest: string; hip: string; };

const App: React.FC = () => {
  const [gender, setGender] = useState<Gender | null>(null);
  const [userImage, setUserImage] = useState<ImageFile | null>(null);
  const [avatarImage, setAvatarImage] = useState<ImageFile | null>(null);
  const [wardrobeItems, setWardrobeItems] = useState<{ [key in ClothingCategory]?: ImageFile }>({});
  
  const [selectedPose, setSelectedPose] = useState<Pose>(Pose.APose);
  const [selectedLighting, setSelectedLighting] = useState<Lighting>(Lighting.Studio);
  const [selectedBackground, setSelectedBackground] = useState<Background>(Background.Studio);
  
  const [bodyShape, setBodyShape] = useState<BodyShape>(BodyShape.Average);
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurements>({ height: '', chest: '', hip: ''});

  const [hairstylePrompt, setHairstylePrompt] = useState('');
  const [styleTheme, setStyleTheme] = useState('');

  const [generatedOutfitImage, setGeneratedOutfitImage] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const [isLoadingAvatar, setIsLoadingAvatar] = useState(false);
  const [isLoadingHairstyle, setIsLoadingHairstyle] = useState(false);
  const [isLoadingOutfit, setIsLoadingOutfit] = useState(false);
  const [isLoadingSuggestion, setIsLoadingSuggestion] = useState(false);
  const [isLoadingFeedback, setIsLoadingFeedback] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenderSelect = (selectedGender: Gender) => {
    setGender(selectedGender);
    const defaultShape = selectedGender === Gender.Male ? MaleBodyShapes[1] : FemaleBodyShapes[1];
    setBodyShape(defaultShape);
  };

  const handleUserImageUpload = (base64: string, mimeType: string) => {
    setUserImage({ base64, mimeType });
    setAvatarImage(null);
    setGeneratedOutfitImage(null);
    setError(null);
  };
  
  const handleWardrobeUpload = (category: ClothingCategory, base64: string, mimeType: string) => {
    setWardrobeItems(prev => ({ ...prev, [category]: { base64, mimeType } }));
    setGeneratedOutfitImage(null);
    setFeedback(null);
  };

  const handleRemoveItem = (category: ClothingCategory) => {
    setWardrobeItems(prev => {
        const newItems = { ...prev };
        delete newItems[category];
        return newItems;
    });
  };
  
  const clearStage = () => {
      setGeneratedOutfitImage(null);
      setFeedback(null);
      setError(null);
  };

  const handleGenerateAvatar = useCallback(async () => {
    if (!userImage || !gender) return;
    setIsLoadingAvatar(true);
    setError(null);
    setAvatarImage(null);
    clearStage();
    try {
      const result = await generateAvatar(userImage, gender, bodyShape, bodyMeasurements);
      setAvatarImage(result);
    } catch (e) {
      console.error(e);
      setError('Failed to create your Digital Twin. The AI might be busy or the photo may not be suitable. Please try again with a clear, full-body photo.');
    } finally {
      setIsLoadingAvatar(false);
    }
  }, [userImage, gender, bodyShape, bodyMeasurements]);

  const handleHairstyleChange = async () => {
    if (!avatarImage || !hairstylePrompt) return;
    setIsLoadingHairstyle(true);
    clearStage();
    try {
        const result = await changeHairstyle(avatarImage, hairstylePrompt);
        setAvatarImage(result);
    } catch (e) {
        console.error(e);
        setError('Failed to update hairstyle. Please try a different prompt.');
    } finally {
        setIsLoadingHairstyle(false);
    }
  };

  const handleGenerateOutfit = useCallback(async () => {
    if (!avatarImage) return;
    if (Object.keys(wardrobeItems).length === 0) {
        setError('Please add at least one clothing item to the wardrobe.');
        return;
    }
    setIsLoadingOutfit(true);
    clearStage();
    try {
      const result = await generateVirtualTryOn(avatarImage, wardrobeItems, selectedPose, selectedLighting, selectedBackground);
      setGeneratedOutfitImage(result);
    } catch (e) {
      console.error(e);
      setError('Failed to generate the outfit. Please try again.');
    } finally {
      setIsLoadingOutfit(false);
    }
  }, [avatarImage, wardrobeItems, selectedPose, selectedLighting, selectedBackground]);

  const handleSuggestOutfit = async () => {
    if (!avatarImage || !styleTheme) return;
    setIsLoadingSuggestion(true);
    clearStage();
    try {
        const result = await suggestOutfit(avatarImage, styleTheme, selectedPose, selectedLighting, selectedBackground);
        setGeneratedOutfitImage(result);
    } catch (e) {
        console.error(e);
        setError('Failed to suggest an outfit. Please try a different theme.');
    } finally {
        setIsLoadingSuggestion(false);
    }
  };

  const handleGetFeedback = async (query: string) => {
    if (!generatedOutfitImage) return;
    setIsLoadingFeedback(true);
    setFeedback(null);
    try {
        const result = await getOutfitFeedback(generatedOutfitImage, query);
        setFeedback(result);
    } catch (e) {
        console.error(e);
        setFeedback("Sorry, I couldn't process that request.");
    } finally {
        setIsLoadingFeedback(false);
    }
  };


  const handleSaveImage = () => {
    if (!generatedOutfitImage) return;
    const link = document.createElement('a');
    link.href = generatedOutfitImage;
    link.download = 'digital-twin-outfit.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  const getAvailableCategories = (g: Gender | null) => {
    if (!g) return [];
    const baseCategories = [ClothingCategory.Top, ClothingCategory.Bottom, ClothingCategory.Footwear, ClothingCategory.Accessories];
    return g === Gender.Female ? [...baseCategories, ClothingCategory.FullWear] : baseCategories;
  };

  const availableCategories = getAvailableCategories(gender);
  const canGenerateOutfit = avatarImage && Object.keys(wardrobeItems).length > 0;
  const canSuggestOutfit = avatarImage && styleTheme.trim().length > 0;
  const isAnythingLoading = isLoadingAvatar || isLoadingOutfit || isLoadingHairstyle || isLoadingSuggestion;


  return (
    <div className="min-h-screen bg-neutral-900 text-stone-200 text-lg">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Controls */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {!gender && (
              <div className="bg-black/20 p-6 border border-stone-700">
                <h2 className="text-xl font-retro-heading text-lime-400 mb-4">> 1. SELECT MODEL TYPE</h2>
                <GenderSelector onSelectGender={handleGenderSelect} />
              </div>
            )}
            
            {gender && (
              <div className="bg-black/20 p-6 border border-stone-700 animate-scan-in">
                  <h2 className="text-xl font-retro-heading text-lime-400 mb-4">> 1. UPLOAD PHOTO</h2>
                  <p className="text-base text-stone-400 mb-4">Provide a clear, well-lit photo. Front-facing is optimal. The system will attempt to normalize slight angles.</p>
                  <ImageUploader 
                      onImageUpload={handleUserImageUpload}
                      icon={<PersonIcon className="w-10 h-10 mb-3 text-stone-400"/>}
                      label="UPLOAD SOURCE IMAGE"
                  />
              </div>
            )}

            {userImage && (
              <div className="bg-black/20 p-6 border border-stone-700 animate-scan-in">
                  <h2 className="text-xl font-retro-heading text-lime-400 mb-4">> 2. DEFINE AVATAR</h2>
                  <BodyTypeSelector 
                    gender={gender!}
                    shape={bodyShape}
                    onShapeChange={setBodyShape}
                    measurements={bodyMeasurements}
                    onMeasurementsChange={setBodyMeasurements}
                    onGenerateAvatar={handleGenerateAvatar}
                    isGenerating={isLoadingAvatar}
                  />
              </div>
            )}
            
            {avatarImage && (
                <>
                <div className="bg-black/20 p-6 border border-stone-700 animate-scan-in">
                    <h2 className="text-xl font-retro-heading text-lime-400 mb-4">> OPTIONAL: REFINE AVATAR</h2>
                    <div className="flex items-center gap-2">
                         <input 
                            type="text"
                            placeholder="e.g., 'platinum blonde bob'"
                            value={hairstylePrompt}
                            onChange={(e) => setHairstylePrompt(e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-600 rounded-none py-2 px-3 text-white placeholder-stone-500 focus:outline-none focus:bg-neutral-700 focus:border-lime-400"
                        />
                        <button onClick={handleHairstyleChange} disabled={!hairstylePrompt.trim() || isLoadingHairstyle} className="p-2.5 bg-stone-200 hover:bg-lime-400 rounded-none disabled:bg-neutral-600">
                            {isLoadingHairstyle ? <div className="w-5 h-5 border-2 border-t-transparent border-neutral-800 rounded-full animate-spin"></div> : <HairIcon className="w-5 h-5 text-neutral-900"/>}
                        </button>
                    </div>
                </div>

                <div className="bg-black/20 p-6 border border-stone-700 animate-scan-in">
                    <h2 className="text-xl font-retro-heading text-lime-400 mb-4">> 3. STYLE WARDROBE</h2>
                    <p className="text-base text-stone-400 mb-4">Add clothing items to try on your avatar.</p>
                    <div className="grid grid-cols-2 gap-4">
                        {availableCategories.map(category => (
                            <div key={category}>
                                <h3 className="text-center mb-2 text-stone-300 uppercase text-sm">{category}</h3>
                                {wardrobeItems[category] ? (
                                    <div className="relative group">
                                        <img src={`data:${wardrobeItems[category]?.mimeType};base64,${wardrobeItems[category]?.base64}`} alt={category} className="w-full h-32 object-cover rounded-none"/>
                                        <button onClick={() => handleRemoveItem(category)} className="absolute top-1 right-1 bg-red-600/80 hover:bg-red-500 rounded-none p-1.5 opacity-0 group-hover:opacity-100">
                                            <TrashIcon className="w-4 h-4 text-white"/>
                                        </button>
                                    </div>
                                ) : (
                                    <ImageUploader 
                                        onImageUpload={(b64, mime) => handleWardrobeUpload(category, b64, mime)} 
                                        isCompact={true}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-black/20 p-6 border border-stone-700 animate-scan-in space-y-6">
                    <div>
                        <h2 className="text-xl font-retro-heading text-lime-400 mb-4">> 4. CHOOSE POSE</h2>
                        <PoseSelector selectedPose={selectedPose} onSelectPose={setSelectedPose} />
                    </div>
                    <div>
                        <h2 className="text-xl font-retro-heading text-lime-400 mb-4">> 5. SET LIGHTING</h2>
                        <LightingSelector selectedLighting={selectedLighting} onSelectLighting={setSelectedLighting} />
                    </div>
                     <div>
                        <h2 className="text-xl font-retro-heading text-lime-400 mb-4">> 6. CHOOSE SCENE</h2>
                        <BackgroundSelector selectedBackground={selectedBackground} onSelectBackground={setSelectedBackground} />
                    </div>
                </div>
                
                <div className="bg-black/20 p-6 border border-stone-700 animate-scan-in space-y-4">
                     <h2 className="text-xl font-retro-heading text-lime-400">> 7. GENERATE LOOK</h2>
                     <div>
                         <h3 className="text-base text-stone-300 mb-2 uppercase tracking-widest">A) Try On Clothes</h3>
                         <button
                            onClick={handleGenerateOutfit}
                            disabled={!canGenerateOutfit || isAnythingLoading}
                            className="w-full flex items-center justify-center gap-3 bg-stone-200 hover:bg-lime-400 disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed text-neutral-900 py-3 px-6 rounded-none text-lg"
                        >
                            {isLoadingOutfit ? 'Dressing...' : <><SparklesIcon className="w-6 h-6" /> GENERATE FIT</>}
                        </button>
                    </div>
                    <div className="relative flex py-2 items-center">
                        <div className="flex-grow border-t border-dashed border-neutral-700"></div>
                        <span className="flex-shrink mx-4 text-stone-500">OR</span>
                        <div className="flex-grow border-t border-dashed border-neutral-700"></div>
                    </div>
                    <div className="space-y-3">
                         <h3 className="text-base text-stone-300 mb-2 uppercase tracking-widest">B) Let AI Style You</h3>
                         <input 
                            type="text"
                            placeholder="Outfit theme, e.g., 'summer beach party'"
                            value={styleTheme}
                            onChange={(e) => setStyleTheme(e.target.value)}
                            className="w-full bg-neutral-800 border border-neutral-600 rounded-none py-2 px-3 text-white placeholder-stone-500 focus:outline-none focus:bg-neutral-700 focus:border-lime-400"
                        />
                         <button
                            onClick={handleSuggestOutfit}
                            disabled={!canSuggestOutfit || isAnythingLoading}
                            className="w-full flex items-center justify-center gap-3 bg-stone-200 hover:bg-lime-400 disabled:bg-neutral-600 disabled:text-neutral-400 disabled:cursor-not-allowed text-neutral-900 py-3 px-6 rounded-none text-lg"
                        >
                            {isLoadingSuggestion ? 'Designing...' : <><LightbulbIcon className="w-6 h-6" /> SUGGEST OUTFIT</>}
                        </button>
                    </div>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-8 bg-black/20 p-6 border border-stone-700 min-h-[600px] flex flex-col">
             <h2 className="text-xl font-retro-heading text-lime-400 mb-4">> THE STAGE</h2>
            <Stage
              isLoading={isAnythingLoading}
              loadingMessage={isLoadingAvatar ? "Building Digital Twin..." : isLoadingHairstyle ? "Updating Hairstyle..." : isLoadingOutfit ? "Styling your outfit..." : isLoadingSuggestion ? "Designing your look..." : "Loading..."}
              avatarImage={avatarImage}
              outfitImage={generatedOutfitImage}
              error={error}
              onSave={handleSaveImage}
              onGetFeedback={handleGetFeedback}
              isFeedbackLoading={isLoadingFeedback}
              feedback={feedback}
            />
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-stone-500 text-sm">
        <p>Powered by Gemini. Welcome to the future of personal styling.</p>
      </footer>
    </div>
  );
};

export default App;