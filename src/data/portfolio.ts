export interface PortfolioItem {
  id: string;
  title: string;
  category: '3D Général' | 'Pets Minecraft' | 'Motion Graphics';
  coverImage: string;
  images: string[]; // Array of images or videos
  description?: string;
}

export const portfolioData: PortfolioItem[] = [
  // 3D Général
  {
    id: 'cyberpunk-launcher',
    title: 'CyberPunk Launcher Minecraft',
    category: '3D Général',
    coverImage: '/Portfolio/3d Général/CyberPunckLuncheurMinecraft/blue-geai-image (1).jpg',
    images: [
      '/Portfolio/3d Général/CyberPunckLuncheurMinecraft/blue-geai-image (1).jpg',
      '/Portfolio/3d Général/CyberPunckLuncheurMinecraft/blue-geai-image1.jpg',
    ],
  },
  {
    id: 'escalier',
    title: 'Escalier',
    category: '3D Général',
    coverImage: '/Portfolio/3d Général/escalier/Untitled2.png',
    images: [
      '/Portfolio/3d Général/escalier/Untitled2.png',
      '/Portfolio/3d Général/escalier/Untitled.png',
      '/Portfolio/3d Général/escalier/Untitled3.png',
      '/Portfolio/3d Général/escalier/Capture d\'écran 2025-12-25 223925.png',
    ],
  },
  {
    id: 'homme-pc',
    title: 'Homme dans une pièce PC',
    category: '3D Général',
    coverImage: '/Portfolio/3d Général/HommeDansunepiecePC/blue-geai-kombo-style.jpg',
    images: [
      '/Portfolio/3d Général/HommeDansunepiecePC/blue-geai-kombo-style.jpg',
    ],
  },
  {
    id: 'plage',
    title: 'Plage',
    category: '3D Général',
    coverImage: '/Portfolio/3d Général/plage/Untitled.jpg',
    images: [
      '/Portfolio/3d Général/plage/Untitled.jpg',
      '/Portfolio/3d Général/plage/Untitled2.jpg',
      '/Portfolio/3d Général/plage/Untitled3.jpg',
      '/Portfolio/3d Général/plage/Capture d\'écran 2025-12-25 220757.png',
    ],
  },
  {
    id: 'strava-vision-os',
    title: 'Strava Vision OS',
    category: '3D Général',
    coverImage: '/Portfolio/3d Général/StravaVisionOS/blue-geai-image.jpg',
    images: [
      '/Portfolio/3d Général/StravaVisionOS/blue-geai-image.jpg',
      '/Portfolio/3d Général/StravaVisionOS/blue-geai-image2.jpg',
    ],
  },
  {
    id: 'vfx-arch-launcher',
    title: 'VFX Arch Launcher',
    category: '3D Général',
    coverImage: '/Portfolio/3d Général/VFXArchLuncher/blue-geai-image.jpg',
    images: [
      '/Portfolio/3d Général/VFXArchLuncher/blue-geai-image.jpg',
      '/Portfolio/3d Général/VFXArchLuncher/blue-geai-image1.jpg',
    ],
  },
  {
    id: 'vfx-steve-bob',
    title: 'VFX Steve avec Bob',
    category: '3D Général',
    coverImage: '/Portfolio/3d Général/VFXSteveAvecBob/eeeea.mp4', // Video as cover
    images: [
      '/Portfolio/3d Général/VFXSteveAvecBob/eeeea.mp4',
    ],
  },
  {
    id: 'factor-bike',
    title: 'Factor Bike',
    category: '3D Général',
    coverImage: '/Portfolio/3d Général/FactorBike/colorpng.png',
    images: [
      '/Portfolio/3d Général/FactorBike/colorpng.png',
      '/Portfolio/3d Général/FactorBike/colorpng2.png',
      '/Portfolio/3d Général/FactorBike/blackandwhyte.png',
      '/Portfolio/3d Général/FactorBike/BLACKANDWHYTEBLUR.png',
    ],
  },

  // Pets Minecraft
  {
    id: 'aigle-america',
    title: 'Aigle America',
    category: 'Pets Minecraft',
    coverImage: '/Portfolio/Pets/Aigle America/blue-geai-e.jpg',
    images: [
      '/Portfolio/Pets/Aigle America/blue-geai-e.jpg',
      '/Portfolio/Pets/Aigle America/blue-geai-capture-d-ecran-2024-12-15-095256.jpg',
      '/Portfolio/Pets/Aigle America/blue-geai-capture-d-ecran-2024-12-15-095313.jpg',
      '/Portfolio/Pets/Aigle America/blue-geai-capture-d-ecran-2024-12-15-095331.jpg',
      '/Portfolio/Pets/Aigle America/blue-geai-capture-d-ecran-2024-12-15-095346.jpg',
      '/Portfolio/Pets/Aigle America/blue-geai-capture-d-ecran-2024-12-15-095358.jpg',
    ],
  },
  {
    id: 'bee-crystal',
    title: 'Bee Crystal',
    category: 'Pets Minecraft',
    coverImage: '/Portfolio/Pets/BeeCrystal/blue-geai-image (2).jpg',
    images: [
      '/Portfolio/Pets/BeeCrystal/blue-geai-image (2).jpg',
      '/Portfolio/Pets/BeeCrystal/blue-geai-image1.jpg',
      '/Portfolio/Pets/BeeCrystal/blue-geai-image3.jpg',
      '/Portfolio/Pets/BeeCrystal/blue-geai-image4.jpg',
      '/Portfolio/Pets/BeeCrystal/blue-geai-image5.jpg',
    ],
  },
  {
    id: 'duck-fun',
    title: 'Duck Fun',
    category: 'Pets Minecraft',
    coverImage: '/Portfolio/Pets/duckfun/blue-geai-eeee.jpg',
    images: [
      '/Portfolio/Pets/duckfun/blue-geai-eeee.jpg',
      '/Portfolio/Pets/duckfun/blue-geai-capture-d-ecran-2024-12-20-165512.jpg',
      '/Portfolio/Pets/duckfun/blue-geai-capture-d-ecran-2024-12-20-165528.jpg',
      '/Portfolio/Pets/duckfun/blue-geai-capture-d-ecran-2024-12-20-165552.jpg',
    ],
  },
  {
    id: 'go-noob',
    title: 'Go Noob',
    category: 'Pets Minecraft',
    coverImage: '/Portfolio/Pets/GoNoob/blue-geai-gopro-face-droit.jpg',
    images: [
      '/Portfolio/Pets/GoNoob/blue-geai-gopro-face-droit.jpg',
      '/Portfolio/Pets/GoNoob/blue-geai-gopro-face-gauche.jpg',
      '/Portfolio/Pets/GoNoob/blue-geai-vue-de-bas.jpg',
      '/Portfolio/Pets/GoNoob/blue-geai-vue-de-haut.jpg',
    ],
  },
  {
    id: 'little-skeleton',
    title: 'Little Skeleton',
    category: 'Pets Minecraft',
    coverImage: '/Portfolio/Pets/littleSkeleton/blue-geai-snow1.jpg',
    images: [
      '/Portfolio/Pets/littleSkeleton/blue-geai-snow1.jpg',
      '/Portfolio/Pets/littleSkeleton/blue-geai-snow2.jpg',
      '/Portfolio/Pets/littleSkeleton/blue-geai-snow3.jpg',
    ],
  },
  {
    id: 'magic-slime',
    title: 'Magic Slime',
    category: 'Pets Minecraft',
    coverImage: '/Portfolio/Pets/MagicSlime/blue-geai-face.jpg',
    images: [
      '/Portfolio/Pets/MagicSlime/blue-geai-face.jpg',
      '/Portfolio/Pets/MagicSlime/blue-geai-cote-droit.jpg',
      '/Portfolio/Pets/MagicSlime/blue-geai-cote-gauche.jpg',
      '/Portfolio/Pets/MagicSlime/blue-geai-dos.jpg',
    ],
  },
  {
    id: 'robot',
    title: 'Robot',
    category: 'Pets Minecraft',
    coverImage: '/Portfolio/Pets/Robot/blue-geai-capture-d-ecran-2024-12-20-170025.jpg',
    images: [
      '/Portfolio/Pets/Robot/blue-geai-capture-d-ecran-2024-12-20-170025.jpg',
      '/Portfolio/Pets/Robot/blue-geai-capture-d-ecran-2024-12-20-170040.jpg',
      '/Portfolio/Pets/Robot/blue-geai-capture-d-ecran-2024-12-20-170051.jpg',
      '/Portfolio/Pets/Robot/blue-geai-capture-d-ecran-2024-12-20-170111.jpg',
      '/Portfolio/Pets/Robot/blue-geai-capture-d-ecran-2024-12-20-170127.jpg',
    ],
  },
  {
    id: 'snowman',
    title: 'Snow Man',
    category: 'Pets Minecraft',
    coverImage: '/Portfolio/Pets/SnowMan/blue-geai-image (2).jpg',
    images: [
      '/Portfolio/Pets/SnowMan/blue-geai-image (2).jpg',
      '/Portfolio/Pets/SnowMan/blue-geai-image1.jpg',
      '/Portfolio/Pets/SnowMan/blue-geai-image2.jpg',
      '/Portfolio/Pets/SnowMan/blue-geai-image3.jpg',
    ],
  },
  {
    id: 'sword',
    title: 'Sword',
    category: 'Pets Minecraft',
    coverImage: '/Portfolio/Pets/Sword/blue-geai-sword1.jpg',
    images: [
      '/Portfolio/Pets/Sword/blue-geai-sword1.jpg',
      '/Portfolio/Pets/Sword/blue-geai-sword2.jpg',
      '/Portfolio/Pets/Sword/blue-geai-sword3.jpg',
      '/Portfolio/Pets/Sword/blue-geai-sword4.jpg',
    ],
  },
  {
    id: 'wither-crystal',
    title: 'Wither Crystal',
    category: 'Pets Minecraft',
    coverImage: '/Portfolio/Pets/WitherCrystal/blue-geai-image (2).jpg',
    images: [
      '/Portfolio/Pets/WitherCrystal/blue-geai-image (2).jpg',
      '/Portfolio/Pets/WitherCrystal/blue-geai-image1.jpg',
      '/Portfolio/Pets/WitherCrystal/blue-geai-image2.jpg',
      '/Portfolio/Pets/WitherCrystal/blue-geai-image3.jpg',
    ],
  },

  // Motion Graphics
  {
    id: 'cube-neige',
    title: 'Cube Neige',
    category: 'Motion Graphics',
    coverImage: '/Portfolio/MotioGraphic/cube-neige-etc.mp4',
    images: ['/Portfolio/MotioGraphic/cube-neige-etc.mp4'],
  },
  {
    id: 'france-motion',
    title: 'France Motion Graphic',
    category: 'Motion Graphics',
    coverImage: '/Portfolio/MotioGraphic/FRANCEmotiongraphic.mp4',
    images: ['/Portfolio/MotioGraphic/FRANCEmotiongraphic.mp4'],
  },
  {
    id: 'marathon',
    title: 'Marathon 3h16',
    category: 'Motion Graphics',
    coverImage: '/Portfolio/MotioGraphic/Marathon3h16.mp4',
    images: ['/Portfolio/MotioGraphic/Marathon3h16.mp4'],
  },
  {
    id: 'shoes-brutalism',
    title: 'Shoes 3D Brutalism',
    category: 'Motion Graphics',
    coverImage: '/Portfolio/MotioGraphic/shoes3dbrutalism.mp4',
    images: ['/Portfolio/MotioGraphic/shoes3dbrutalism.mp4'],
  },
];
