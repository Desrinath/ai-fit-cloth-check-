export enum Gender {
  Male = 'Male',
  Female = 'Female',
}

export enum ClothingCategory {
  Top = 'Top',
  Bottom = 'Bottom',
  Footwear = 'Footwear',
  Accessories = 'Accessories',
  FullWear = 'Full Wear',
}

export enum Pose {
    APose = 'A-Pose',
    Walking = 'Walking',
    HandsOnHips = 'Hands on Hips',
    Sitting = 'Sitting',
    Leaning = 'Leaning',
    Action = 'Action Pose',
    Candid = 'Candid',
    OverTheShoulder = 'Over The Shoulder',
    CrossedArms = 'Crossed Arms',
    FashionStance = 'Fashion Stance',
}

export enum Lighting {
    Studio = 'Studio',
    Natural = 'Natural',
    Dramatic = 'Dramatic',
}

export enum Background {
    Studio = 'Studio',
    ParisianStreet = 'Parisian Street',
    ArtGallery = 'Art Gallery',
    TropicalBeach = 'Tropical Beach',
    NeonCity = 'Neon City',
}

export enum BodyShape {
    Lean = 'Lean',
    Average = 'Average',
    Athletic = 'Athletic',
    Curvy = 'Curvy',
    Broad = 'Broad',
}

export const MaleBodyShapes: BodyShape[] = [BodyShape.Lean, BodyShape.Average, BodyShape.Athletic, BodyShape.Broad];
export const FemaleBodyShapes: BodyShape[] = [BodyShape.Lean, BodyShape.Average, BodyShape.Athletic, BodyShape.Curvy];

export type BodyMeasurements = {
    height: string;
    chest: string;
    hip: string;
};