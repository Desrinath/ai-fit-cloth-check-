import { GoogleGenAI, Modality } from "@google/genai";
import { ClothingCategory, Pose, BodyShape, BodyMeasurements, Gender, Lighting, Background } from "../types";

type ImageFile = { base64: string; mimeType: string };
type Wardrobe = { [key in ClothingCategory]?: ImageFile };

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = "gemini-2.5-flash-image-preview";

const callGeminiWithRetry = async (prompt: string, parts: any[]): Promise<ImageFile> => {
    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: { parts: [...parts, { text: prompt }] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    return {
                        base64: part.inlineData.data,
                        mimeType: part.inlineData.mimeType,
                    };
                }
            }
        }
        throw new Error("The AI did not return an image. It might be a content safety issue or an API error.");
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate image from Gemini API.");
    }
}

export const generateAvatar = async (userImage: ImageFile, gender: Gender, bodyShape: BodyShape, measurements: BodyMeasurements): Promise<ImageFile> => {
    const measurementPrompts = [];
    if (measurements.height) measurementPrompts.push(`Height: approximately ${measurements.height}`);
    if (measurements.chest) measurementPrompts.push(`Chest: approximately ${measurements.chest}`);
    if (measurements.hip) measurementPrompts.push(`Hips: approximately ${measurements.hip}`);

    const prompt = `**PRIMARY OBJECTIVE: CREATE A PERFECT DIGITAL TWIN.**

Your task is to perform a high-fidelity reconstruction of the person in the provided photo to create their digital twin. This is a precision task, not a creative one.

**CRITICAL TWO-STEP PROCESS:**
1.  **ANALYZE & DECONSTRUCT:** First, meticulously analyze the source photograph. Identify and map all unique facial features: eye shape and color, nose structure, mouth shape, jawline, cheekbones, hairline, skin tone, and any unique marks like moles or scars. Understand the person's fundamental facial geometry.
2.  **RECONSTRUCT WITH FIDELITY:** Second, use your analysis to generate a new, hyper-realistic, full-body photograph. This new image must feature a perfectly symmetrical, centered, and front-facing view of the person.

**NON-NEGOTIABLE CORE DIRECTIVE: 100% IDENTITY PRESERVATION.**
- The reconstructed face in your output **MUST** be an exact, perfect match to the person in the source photo. There can be zero deviation in their identity.
- Even if the source photo is taken from a slight angle, has uneven lighting, or a casual expression, your final output must be a normalized, studio-quality portrait that is undeniably the same person. You are correcting the pose and environment, not the person.

**GENERATION PARAMETERS:**
- **Gender:** ${gender}
- **Pose:** Full-body, standing in a neutral 'A-pose'.
- **Attire:** Simple, form-fitting grey athletic wear (a short-sleeve t-shirt and shorts) that clearly reveals the body shape.
- **Physique:** The model should have a '${bodyShape}' build. ${measurementPrompts.length > 0 ? `Adhere to these specific measurements: ${measurementPrompts.join(', ')}.` : ''}
- **Background:** Plain, light grey studio background.
- **Realism:** The final image must be photorealistic, with natural skin texture and soft studio lighting. Avoid any artificial, CGI, or 'airbrushed' look.

**OUTPUT:**
- You must only output the final image. No text, no commentary.`;

    const parts = [{ inlineData: { data: userImage.base64, mimeType: userImage.mimeType } }];
    return callGeminiWithRetry(prompt, parts);
};

export const changeHairstyle = async (avatarImage: ImageFile, hairstylePrompt: string): Promise<ImageFile> => {
    const prompt = `**PRIMARY OBJECTIVE: EDIT HAIRSTYLE ONLY. This is a precision image editing task.**

**NON-NEGOTIABLE CORE DIRECTIVE: ABSOLUTE IDENTITY PRESERVATION.**
1.  **Source of Truth:** The provided image contains the person whose hairstyle you will edit. Everything else about them, especially their face, is **OFF-LIMITS**.
2.  **Critical Mandate:** The person's face, facial structure, expression, and skin tone in your final output **MUST** be a perfect, identical match to the input image. Any deviation is a failure.
3.  **Background Integrity:** The plain, light grey studio background must be preserved.

**TASK:**
- Apply this specific hairstyle: '${hairstylePrompt}'.
- The new hairstyle must be hyper-realistic and blend seamlessly.

**OUTPUT:**
- Only the final, edited image.`;

    const parts = [{ inlineData: { data: avatarImage.base64, mimeType: avatarImage.mimeType } }];
    return callGeminiWithRetry(prompt, parts);
};

export const generateVirtualTryOn = async (
  avatarImage: ImageFile,
  wardrobeItems: Wardrobe,
  pose: Pose,
  lighting: Lighting,
  background: Background
): Promise<string> => {
  const clothingItemsDescription = Object.keys(wardrobeItems).join(', ');

  const prompt = `**PRIMARY OBJECTIVE: HIGH-FIDELITY VIRTUAL TRY-ON. This is an image editing task, not a new image generation.**

**NON-NEGOTIABLE CORE DIRECTIVE: ABSOLUTE IDENTITY PRESERVATION.**
1.  **Source of Truth:** The very first image provided is the user's avatar. Their face, facial structure, hair, and skin tone are the **UNCHANGEABLE** base layer.
2.  **Critical Mandate:** The person in your final output **MUST** be 100% identifiable as the person in the avatar image. Any change to their facial identity is a critical failure. You are editing the clothes and scene, **NOT** the person.

**TASK:**
- **Dress the Avatar:** Realistically apply the provided clothing items (${clothingItemsDescription}) to the avatar. The clothes should conform to the avatar's body shape.
- **Set the Scene:** The final image must be a photorealistic '${background}' setting.
- **Set the Pose:** The model's pose should be a '${pose}' pose.
- **Set the Lighting:** The lighting of the final image should be '${lighting}' style.

**OUTPUT:**
- A single, photorealistic image. Do not output any text or commentary.`;

  const parts: any[] = [
    { inlineData: { data: avatarImage.base64, mimeType: avatarImage.mimeType } },
  ];

  for (const category in wardrobeItems) {
    const item = wardrobeItems[category as ClothingCategory];
    if (item) {
      parts.push({
        inlineData: { data: item.base64, mimeType: item.mimeType },
      });
    }
  }

  const resultImageFile = await callGeminiWithRetry(prompt, parts);
  return `data:${resultImageFile.mimeType};base64,${resultImageFile.base64}`;
};

export const suggestOutfit = async (
    avatarImage: ImageFile,
    theme: string,
    pose: Pose,
    lighting: Lighting,
    background: Background,
): Promise<string> => {
    const prompt = `**PRIMARY OBJECTIVE: AI OUTFIT DESIGN. This is an image editing task where you design clothes onto an existing person.**

**NON-NEGOTIABLE CORE DIRECTIVE: ABSOLUTE IDENTITY PRESERVATION.**
1.  **Source of Truth:** The provided image is the user's avatar. Their face, facial structure, hair, and skin tone are the **UNCHANGEABLE** base layer.
2.  **Critical Mandate:** The person in your final output **MUST** be 100% identifiable as the person in the avatar image. Any change to their facial identity is a critical failure. You are creating the clothes and scene, **NOT** the person.

**TASK:**
- **Design the Outfit:** Based on the theme '${theme}', design a complete, photorealistic outfit (top, bottom, footwear, accessories) and apply it to the avatar.
- **Set the Scene:** Place the avatar in a photorealistic '${background}' setting.
- **Set the Pose:** The model's pose should be a '${pose}' pose.
- **Set the Lighting:** The lighting should be '${lighting}' style.

**OUTPUT:**
- A single, photorealistic image. Do not output any text or commentary.`;

    const parts = [{ inlineData: { data: avatarImage.base64, mimeType: avatarImage.mimeType } }];
    const resultImageFile = await callGeminiWithRetry(prompt, parts);
    return `data:${resultImageFile.mimeType};base64,${resultImageFile.base64}`;
};


export const getOutfitFeedback = async (outfitImageDataUrl: string, userQuery: string): Promise<string> => {
    const [header, base64Data] = outfitImageDataUrl.split(',');
    if (!header || !base64Data) throw new Error("Invalid image data URL");

    const mimeTypeMatch = header.match(/:(.*?);/);
    if (!mimeTypeMatch || !mimeTypeMatch[1]) throw new Error("Could not determine mime type from data URL");
    const mimeType = mimeTypeMatch[1];

    const imagePart = { inlineData: { data: base64Data, mimeType: mimeType } };
    const prompt = `You are a world-class fashion stylist providing feedback. The user has sent you an image of a styled outfit on their digital avatar and has a question. Analyze the image and answer their question concisely, helpfully, and with a positive and encouraging tone. User's Question: '${userQuery}'.`;
    const textPart = { text: prompt };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: { parts: [imagePart, textPart] },
        });
        return response.text;
    } catch (error) {
        console.error("Error getting outfit feedback from Gemini:", error);
        throw new Error("Failed to get outfit feedback.");
    }
};