export interface Avatar {
  id: string;
  name: string;
  url: string;
  category: 'professional' | 'creative' | 'friendly';
}

export const AVATARS: Avatar[] = [
  // ==========================================
  // PROFESSIONAL - Tons Azul/Cinza Corporativo
  // ==========================================
  
  {
    id: 'prof-1',
    name: 'Taylor Anderson',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light&circleColor=2563eb',
    category: 'professional',
  },
  {
    id: 'prof-2',
    name: 'Morgan Chen',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Serious&skinColor=Tanned&circleColor=1e40af',
    category: 'professional',
  },
  {
    id: 'prof-3',
    name: 'Jordan Silva',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=CollarSweater&eyeType=Default&eyebrowType=RaisedExcitedNatural&mouthType=Smile&skinColor=DarkBrown&circleColor=1e3a8a',
    category: 'professional',
  },
  {
    id: 'prof-4',
    name: 'Casey Martinez',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads01&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Brown&circleColor=3b82f6',
    category: 'professional',
  },
  {
    id: 'prof-5',
    name: 'Alex Johnson',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairSides&accessoriesType=Blank&hairColor=Auburn&facialHairType=BeardLight&clotheType=ShirtCrewNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Pale&circleColor=475569',
    category: 'professional',
  },
  {
    id: 'prof-6',
    name: 'Riley Brown',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=Blonde&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light&circleColor=334155',
    category: 'professional',
  },
  {
    id: 'prof-7',
    name: 'Jamie Davis',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesar&accessoriesType=Prescription01&hairColor=BrownDark&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Gray01&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Tanned&circleColor=1e293b',
    category: 'professional',
  },
  {
    id: 'prof-8',
    name: 'Sam Wilson',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=DarkBrown&circleColor=0f172a',
    category: 'professional',
  },
  {
    id: 'prof-9',
    name: 'Drew Moore',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBun&accessoriesType=Prescription02&hairColor=Brown&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=Blue03&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light&circleColor=0ea5e9',
    category: 'professional',
  },
  {
    id: 'prof-10',
    name: 'Avery Lee',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggyMullet&accessoriesType=Blank&hairColor=Red&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Pale&circleColor=0284c7',
    category: 'professional',
  },
  {
    id: 'prof-11',
    name: 'Quinn White',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight2&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Blue02&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Brown&circleColor=0369a1',
    category: 'professional',
  },
  {
    id: 'prof-12',
    name: 'Blake Harris',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairFrizzle&accessoriesType=Prescription01&hairColor=Black&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Serious&skinColor=DarkBrown&circleColor=075985',
    category: 'professional',
  },

  // ==========================================
  // CREATIVE - Tons Vibrantes Modernos
  // ==========================================
  
  {
    id: 'cre-1',
    name: 'Parker Clark',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairMiaWallace&accessoriesType=Sunglasses&hairColor=BlondeGolden&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Gray01&graphicType=Skull&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light&circleColor=8b5cf6',
    category: 'creative',
  },
  {
    id: 'cre-2',
    name: 'Reese Lewis',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurly&accessoriesType=Blank&hairColor=Red&facialHairType=Blank&clotheType=Hoodie&clotheColor=PastelGreen&eyeType=Wink&eyebrowType=UpDown&mouthType=Smile&skinColor=Pale&circleColor=a855f7',
    category: 'creative',
  },
  {
    id: 'cre-3',
    name: 'Dakota Walker',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairDreads02&accessoriesType=Wayfarers&hairColor=Black&facialHairType=Blank&clotheType=Overall&clotheColor=Blue01&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Brown&circleColor=c026d3',
    category: 'creative',
  },
  {
    id: 'cre-4',
    name: 'Skyler Moore',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraightStrand&accessoriesType=Blank&hairColor=PastelPink&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=PastelYellow&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Light&circleColor=d946ef',
    category: 'creative',
  },
  {
    id: 'cre-5',
    name: 'River Taylor',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShaggy&accessoriesType=Round&hairColor=Blue&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Black&graphicType=Pizza&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Tanned&circleColor=06b6d4',
    category: 'creative',
  },
  {
    id: 'cre-6',
    name: 'Phoenix Garcia',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBob&accessoriesType=Kurt&hairColor=SilverGray&facialHairType=Blank&clotheType=CollarSweater&clotheColor=PastelRed&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light&circleColor=0891b2',
    category: 'creative',
  },
  {
    id: 'cre-7',
    name: 'Sage Rodriguez',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurvy&accessoriesType=Blank&hairColor=Auburn&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Gray02&graphicType=Bear&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Pale&circleColor=0e7490',
    category: 'creative',
  },
  {
    id: 'cre-8',
    name: 'Rowan Martinez',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=Turban&accessoriesType=Blank&hairColor=Black&facialHairType=BeardMedium&facialHairColor=BrownDark&clotheType=ShirtCrewNeck&clotheColor=PastelBlue&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Brown&circleColor=f97316',
    category: 'creative',
  },
  {
    id: 'cre-9',
    name: 'Finley Lopez',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=WinterHat4&accessoriesType=Blank&hairColor=Blonde&facialHairType=Blank&clotheType=Hoodie&clotheColor=Red&eyeType=Surprised&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Light&circleColor=ea580c',
    category: 'creative',
  },
  {
    id: 'cre-10',
    name: 'Kai Hernandez',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFro&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=GraphicShirt&clotheColor=Black&graphicType=Resist&eyeType=Default&eyebrowType=UpDown&mouthType=Smile&skinColor=DarkBrown&circleColor=c2410c',
    category: 'creative',
  },
  {
    id: 'cre-11',
    name: 'Nova Gonzalez',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairFroBand&accessoriesType=Sunglasses&hairColor=Red&facialHairType=Blank&clotheType=Overall&clotheColor=Gray01&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Tanned&circleColor=eab308',
    category: 'creative',
  },
  {
    id: 'cre-12',
    name: 'Atlas Perez',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=Hat&accessoriesType=Wayfarers&hairColor=Brown&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=Blue03&eyeType=Wink&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Light&circleColor=ca8a04',
    category: 'creative',
  },

  // ==========================================
  // FRIENDLY - Tons Pastéis Suaves
  // ==========================================
  
  {
    id: 'fri-1',
    name: 'Echo Sanchez',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortFlat&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=PastelGreen&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light&circleColor=86efac',
    category: 'friendly',
  },
  {
    id: 'fri-2',
    name: 'Orion Rivera',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=CollarSweater&clotheColor=PastelBlue&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=DarkBrown&circleColor=6ee7b7',
    category: 'friendly',
  },
  {
    id: 'fri-3',
    name: 'Luna Torres',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight&accessoriesType=Blank&hairColor=Blonde&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=PastelRed&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale&circleColor=5eead4',
    category: 'friendly',
  },
  {
    id: 'fri-4',
    name: 'Robin Flores',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBigHair&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=PastelYellow&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Brown&circleColor=2dd4bf',
    category: 'friendly',
  },
  {
    id: 'fri-5',
    name: 'Logan Cruz',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairSides&accessoriesType=Blank&hairColor=Auburn&facialHairType=Blank&clotheType=Hoodie&clotheColor=PastelBlue&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Tanned&circleColor=93c5fd',
    category: 'friendly',
  },
  {
    id: 'fri-6',
    name: 'Harper Reyes',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairNotTooLong&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=PastelOrange&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Light&circleColor=7dd3fc',
    category: 'friendly',
  },
  {
    id: 'fri-7',
    name: 'Storm Cooper',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairTheCaesarSidePart&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Gray02&eyeType=Happy&eyebrowType=DefaultNatural&mouthType=Smile&skinColor=Brown&circleColor=5eead4',
    category: 'friendly',
  },
  {
    id: 'fri-8',
    name: 'Ember Reed',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairStraight2&accessoriesType=Blank&hairColor=Red&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Blue01&eyeType=Happy&eyebrowType=RaisedExcited&mouthType=Smile&skinColor=Pale&circleColor=fda4af',
    category: 'friendly',
  },
  {
    id: 'fri-9',
    name: 'Sky Bailey',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortWaved&accessoriesType=Blank&hairColor=Black&facialHairType=Blank&clotheType=ShirtScoopNeck&clotheColor=PastelGreen&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=DarkBrown&circleColor=f9a8d4',
    category: 'friendly',
  },
  {
    id: 'fri-10',
    name: 'Ocean Foster',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairBun&accessoriesType=Blank&hairColor=Blonde&facialHairType=Blank&clotheType=CollarSweater&clotheColor=Blue02&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Light&circleColor=f0abfc',
    category: 'friendly',
  },
  {
    id: 'fri-11',
    name: 'Forest Gray',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortRound&accessoriesType=Blank&hairColor=Brown&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Gray01&eyeType=Happy&eyebrowType=Default&mouthType=Smile&skinColor=Tanned&circleColor=fde68a',
    category: 'friendly',
  },
  {
    id: 'fri-12',
    name: 'Sunset Hayes',
    url: 'https://avataaars.io/?avatarStyle=Transparent&topType=LongHairCurly&accessoriesType=Blank&hairColor=Auburn&facialHairType=Blank&clotheType=ShirtVNeck&clotheColor=PastelRed&eyeType=Default&eyebrowType=Default&mouthType=Smile&skinColor=Brown&circleColor=fed7aa',
    category: 'friendly',
  },
];

/**
 * Buscar avatar por ID
 */
export const getAvatarById = (id: string): Avatar | undefined => {
  return AVATARS.find((avatar) => avatar.id === id);
};

/**
 * Buscar avatares por categoria
 */
export const getAvatarsByCategory = (category: Avatar['category']): Avatar[] => {
  return AVATARS.filter((avatar) => avatar.category === category);
};

/**
 * Buscar URL do avatar por ID (retorna URL ou undefined)
 * @deprecated Use resolveAvatarUrl from avatar-utils instead
 */
export const getAvatarUrl = (id: string): string | undefined => {
  const avatar = getAvatarById(id);
  return avatar?.url;
};

/**
 * Buscar URL do avatar com fallback garantido
 */
export const getAvatarUrlSafe = (id: string | null | undefined, fallbackName?: string): string => {
  // Se não tem ID, retorna avatar padrão
  if (!id) {
    if (fallbackName) {
      return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fallbackName)}`;
    }
    return AVATARS[0].url;
  }

  // Buscar avatar
  const avatar = getAvatarById(id);
  if (avatar) {
    return avatar.url;
  }

  // Fallback
  if (fallbackName) {
    return `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(fallbackName)}`;
  }
  return AVATARS[0].url;
};