import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Category from './models/Category.js';
import Template from './models/Template.js';

dotenv.config();

const categories = [
  { id: 'cat-1', title: 'Wedding', slug: 'wedding' },
  { id: 'cat-2', title: 'Birthday', slug: 'birthday' },
  { id: 'cat-3', title: 'Anniversary', slug: 'anniversary' },
  { id: 'cat-4', title: 'Engagement', slug: 'engagement' },
  { id: 'cat-5', title: 'Baby Shower', slug: 'baby-shower' },
  { id: 'cat-6', title: 'Party / Gala', slug: 'party' },
  { id: 'cat-7', title: 'Apology', slug: 'apology' },
  { id: 'cat-8', title: 'Proposal', slug: 'proposal' }
];

const templates = [
  // WEDDING CATEGORY (cat-1) - 10 Templates
  {
    id: 'tpl-royal-gold',
    name: 'Royal Gold',
    slug: 'royal-gold',
    categoryId: 'cat-1',
    description: 'An exquisite, luxury design featuring gold borders, floral details, and timeless serif typography.',
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#d4af37',
      secondaryColor: '#1e293b',
      accentColor: '#94721d',
      backgroundColor: '#fdfbf7',
      textColor: '#0f172a',
      fontFamily: 'playfair'
    }
  },
  {
    id: 'tpl-enchanted-forest',
    name: 'Enchanted Forest',
    slug: 'enchanted-forest',
    categoryId: 'cat-1',
    description: 'Deep forest green paired with delicate gold lines, capturing the magic of outdoor nature.',
    previewImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#166534',
      secondaryColor: '#b8942c',
      accentColor: '#fef08a',
      backgroundColor: '#f4fbf7',
      textColor: '#14532d',
      fontFamily: 'cormorant'
    }
  },
  {
    id: 'tpl-blossom-pink',
    name: 'Blossom Pink',
    slug: 'blossom-pink',
    categoryId: 'cat-1',
    description: 'Romantic watercolor pink textures combined with a gorgeous script calligraphy font.',
    previewImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#ec4899',
      secondaryColor: '#db2777',
      accentColor: '#f472b6',
      backgroundColor: '#fff1f2',
      textColor: '#4c0519',
      fontFamily: 'greatvibes'
    }
  },
  {
    id: 'tpl-nikkah-emerald',
    name: 'Islamic Nikkah Emerald',
    slug: 'nikkah-emerald',
    categoryId: 'cat-1',
    description: 'Featuring a beautiful Bismillah header, intricate arabesque gold stars, and a deep emerald layout.',
    previewImage: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1508189860359-777d945909ef?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#10b981',
      secondaryColor: '#d4af37',
      accentColor: '#f59e0b',
      backgroundColor: '#042f1a',
      textColor: '#f8fafc',
      fontFamily: 'cormorant'
    }
  },
  {
    id: 'tpl-nikkah-persian',
    name: 'Islamic Nikkah Persian',
    slug: 'nikkah-persian',
    categoryId: 'cat-1',
    description: 'Stunning royal Persian blue backdrop detailed with gold crescent motifs and arabesque trims.',
    previewImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#f59e0b',
      accentColor: '#fbbf24',
      backgroundColor: '#030712',
      textColor: '#f3f4f6',
      fontFamily: 'playfair'
    }
  },
  {
    id: 'tpl-mehndi-traditional',
    name: 'Traditional Indian Mehndi',
    slug: 'mehndi-traditional',
    categoryId: 'cat-1',
    description: 'Vibrant marigold orange patterns, mandala vectors, and royal yellow fonts celebrating henna nights.',
    previewImage: 'https://images.unsplash.com/photo-1590075865003-e48277faa558?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1561542320-9a18cd340469?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#f97316',
      secondaryColor: '#b45309',
      accentColor: '#f59e0b',
      backgroundColor: '#fef3c7',
      textColor: '#78350f',
      fontFamily: 'greatvibes'
    }
  },
  {
    id: 'tpl-boho-sunset',
    name: 'Boho Terracotta Sunset',
    slug: 'boho-sunset',
    categoryId: 'cat-1',
    description: 'Rustic warm clay terracotta gradients paired with dry pampas grass silhouettes.',
    previewImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#c2410c',
      secondaryColor: '#8c5e58',
      accentColor: '#eab308',
      backgroundColor: '#fff7ed',
      textColor: '#431407',
      fontFamily: 'sans'
    }
  },
  {
    id: 'tpl-vintage-crimson',
    name: 'Vintage Crimson',
    slug: 'vintage-crimson',
    categoryId: 'cat-1',
    description: 'Deep crimson watercolor roses, antiqued paper borders, and elegant italic scripts.',
    previewImage: 'https://images.unsplash.com/photo-1525253086316-d0c936c814f8?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#991b1b',
      secondaryColor: '#450a0a',
      accentColor: '#fb7185',
      backgroundColor: '#fdf8f8',
      textColor: '#450a0a',
      fontFamily: 'cormorant'
    }
  },
  {
    id: 'tpl-minimal-ivory',
    name: 'Minimalist Ivory',
    slug: 'minimal-ivory',
    categoryId: 'cat-1',
    description: 'Clean ivory card background, single-line dark borders, and modern editorial sans fonts.',
    previewImage: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#1e293b',
      secondaryColor: '#475569',
      accentColor: '#94a3b8',
      backgroundColor: '#fafafa',
      textColor: '#0f172a',
      fontFamily: 'sans'
    }
  },
  {
    id: 'tpl-nautical-coastal',
    name: 'Coastal Yacht Wedding',
    slug: 'nautical-coastal',
    categoryId: 'cat-1',
    description: 'Crisp navy blue details, sailor ropes, and light blue watercolor waves.',
    previewImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1473116763269-255ea7b2f5f9?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#1d4ed8',
      secondaryColor: '#3b82f6',
      accentColor: '#60a5fa',
      backgroundColor: '#f0f4f8',
      textColor: '#1e293b',
      fontFamily: 'sans'
    }
  },

  // BIRTHDAY CATEGORY (cat-2) - 6 Templates
  {
    id: 'tpl-midnight-party',
    name: 'Midnight Celebration',
    slug: 'midnight-celebration',
    categoryId: 'cat-2',
    description: 'Vibrant neon purple glow and gold stars set against a deep obsidian night sky backdrop.',
    previewImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#a855f7',
      secondaryColor: '#f59e0b',
      accentColor: '#ec4899',
      backgroundColor: '#090d16',
      textColor: '#f8fafc',
      fontFamily: 'sans'
    }
  },
  {
    id: 'tpl-retro-arcade',
    name: 'Retro Arcade Birthday',
    slug: 'retro-arcade',
    categoryId: 'cat-2',
    description: '8-bit pixel fonts, neon grids, and yellow highlights recreating vintage gaming lounges.',
    previewImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#eab308',
      secondaryColor: '#06b6d4',
      accentColor: '#f43f5e',
      backgroundColor: '#0c0a09',
      textColor: '#f5f5f4',
      fontFamily: 'sans'
    }
  },
  {
    id: 'tpl-kids-carnival',
    name: 'Kids Carnival Balloon',
    slug: 'kids-carnival',
    categoryId: 'cat-2',
    description: 'Dotted pastel grids, floating red and blue balloons, and playful cartoon fonts.',
    previewImage: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#ef4444',
      accentColor: '#10b981',
      backgroundColor: '#f0fdf4',
      textColor: '#1e3a8a',
      fontFamily: 'sans'
    }
  },
  {
    id: 'tpl-sweet-16',
    name: 'Sweet 16 Pink Glitter',
    slug: 'sweet-16',
    categoryId: 'cat-2',
    description: 'Glittery rose gold backgrounds, floating bubbles, and cursive calligraphy scripts.',
    previewImage: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#ec4899',
      secondaryColor: '#f43f5e',
      accentColor: '#fbcfe8',
      backgroundColor: '#fff1f2',
      textColor: '#4c0519',
      fontFamily: 'greatvibes'
    }
  },
  {
    id: 'tpl-jungle-safari',
    name: 'Jungle Safari Adventure',
    slug: 'jungle-safari',
    categoryId: 'cat-2',
    description: 'Safari plant leaves, cute watercolor lions, giraffes, and warm earthy fonts.',
    previewImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#15803d',
      secondaryColor: '#b45309',
      accentColor: '#f59e0b',
      backgroundColor: '#f0fdf4',
      textColor: '#14532d',
      fontFamily: 'sans'
    }
  },
  {
    id: 'tpl-vintage-50th',
    name: 'Golden Vintage 50th',
    slug: 'vintage-50th',
    categoryId: 'cat-2',
    description: 'Noble obsidian black background detailed with metallic gold fonts and stars.',
    previewImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#d4af37',
      secondaryColor: '#fbbf24',
      accentColor: '#78350f',
      backgroundColor: '#0a0a0a',
      textColor: '#fafafa',
      fontFamily: 'playfair'
    }
  },
  {
    id: 'tpl-birthday-gif',
    name: 'Animated Panda Celebration',
    slug: 'birthday-panda-gif',
    categoryId: 'cat-2',
    description: 'An adorable, interactive birthday template featuring cute animated panda gifs, floating hearts, and watercolor details.',
    previewImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#ec4899', // Pink
      secondaryColor: '#db2777',
      accentColor: '#f472b6',
      backgroundColor: '#fff1f2', // Warm rose background
      textColor: '#2c1b3d',
      fontFamily: 'greatvibes'
    }
  },

  // ANNIVERSARY CATEGORY (cat-3) - 5 Templates
  {
    id: 'tpl-silver-jubilee',
    name: 'Silver Jubilee',
    slug: 'silver-jubilee',
    categoryId: 'cat-3',
    description: 'Platinum silver leaf borders, classic dark navy fonts, and a premium clean layout.',
    previewImage: 'https://images.unsplash.com/photo-1507504038482-76210214dae1?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#64748b',
      secondaryColor: '#1e3a8a',
      accentColor: '#94a3b8',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      fontFamily: 'playfair'
    }
  },
  {
    id: 'tpl-golden-55th',
    name: 'Golden Anniversary 50th',
    slug: 'golden-50th',
    categoryId: 'cat-3',
    description: 'Rich amber glow textures, metallic gold borders, and elegant serif headings.',
    previewImage: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#d4af37',
      secondaryColor: '#f59e0b',
      accentColor: '#b45309',
      backgroundColor: '#fffbeb',
      textColor: '#451a03',
      fontFamily: 'cormorant'
    }
  },
  {
    id: 'tpl-diamond-romance',
    name: 'Diamond Romance',
    slug: 'diamond-romance',
    categoryId: 'cat-3',
    description: 'Delicate light teal watercolor background matching silver outlines and sparkles.',
    previewImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#0ea5e9',
      secondaryColor: '#0284c7',
      accentColor: '#bae6fd',
      backgroundColor: '#f0f9ff',
      textColor: '#0c4a6e',
      fontFamily: 'greatvibes'
    }
  },
  {
    id: 'tpl-cozy-autumn',
    name: 'Cozy Autumn Love',
    slug: 'cozy-autumn',
    categoryId: 'cat-3',
    description: 'Warm burnt sienna gradients, dry maple leaf frames, and cozy serif fonts.',
    previewImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#c2410c',
      secondaryColor: '#ea580c',
      accentColor: '#fed7aa',
      backgroundColor: '#fff7ed',
      textColor: '#431407',
      fontFamily: 'playfair'
    }
  },
  {
    id: 'tpl-greenhouse-botanical',
    name: 'Greenhouse Botanical',
    slug: 'greenhouse-botanical',
    categoryId: 'cat-3',
    description: 'Eucalyptus leaf motifs, white wood borders, and vintage typewriter fonts.',
    previewImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1530026405186-ed1ea0ac7a63?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#166534',
      secondaryColor: '#15803d',
      accentColor: '#bbf7d0',
      backgroundColor: '#f8fafc',
      textColor: '#0f172a',
      fontFamily: 'cormorant'
    }
  },

  // ENGAGEMENT CATEGORY (cat-4) - 4 Templates
  {
    id: 'tpl-champagne-ring',
    name: 'Champagne Ring Silhouette',
    slug: 'champagne-ring',
    categoryId: 'cat-4',
    description: 'Golden ring outlines overlaid on a classy dark charcoal background.',
    previewImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#d4af37',
      secondaryColor: '#e2e8f0',
      accentColor: '#78350f',
      backgroundColor: '#111827',
      textColor: '#f9fafb',
      fontFamily: 'playfair'
    }
  },
  {
    id: 'tpl-sage-minimal',
    name: 'Sage Minimalist Ring',
    slug: 'sage-minimal',
    categoryId: 'cat-4',
    description: 'Warm cream base matching sage green elements and clean sans fonts.',
    previewImage: 'https://images.unsplash.com/photo-1607190074257-dd4b7af0309f?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1549417229-aa67d3263c09?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#15803d',
      secondaryColor: '#475569',
      accentColor: '#cbd5e1',
      backgroundColor: '#f4fbf7',
      textColor: '#0f172a',
      fontFamily: 'sans'
    }
  },
  {
    id: 'tpl-rosy-proposal',
    name: 'Rosy Bliss Engagement',
    slug: 'rosy-bliss',
    categoryId: 'cat-4',
    description: 'Splashes of soft pink blush watercolor, floral frames, and script fonts.',
    previewImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#ec4899',
      secondaryColor: '#f43f5e',
      accentColor: '#fce7f3',
      backgroundColor: '#fff1f2',
      textColor: '#4c0519',
      fontFamily: 'greatvibes'
    }
  },
  {
    id: 'tpl-sunset-skyline',
    name: 'Sunset Skyline Toast',
    slug: 'sunset-skyline',
    categoryId: 'cat-4',
    description: 'Dusk purple horizon line sketches, perfect for city-top cocktail proposal announcements.',
    previewImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#6366f1',
      secondaryColor: '#8b5cf6',
      accentColor: '#c7d2fe',
      backgroundColor: '#0c0f1d',
      textColor: '#f8fafc',
      fontFamily: 'sans'
    }
  },

  // BABY SHOWER CATEGORY (cat-5) - 4 Templates
  {
    id: 'tpl-teddy-bear',
    name: 'Cute Teddy Bear',
    slug: 'teddy-bear',
    categoryId: 'cat-5',
    description: 'Warm cream watercolor teddy bears, soft clouds, and brown round serif titles.',
    previewImage: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#b45309',
      secondaryColor: '#d97706',
      accentColor: '#fef3c7',
      backgroundColor: '#fdfbf7',
      textColor: '#451a03',
      fontFamily: 'sans'
    }
  },
  {
    id: 'tpl-moon-stars',
    name: 'Moon & Stars Cloud',
    slug: 'moon-stars',
    categoryId: 'cat-5',
    description: 'Deep navy papercraft style showing crescent moon, sleeping stars, and yellow fonts.',
    previewImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#fbbf24',
      secondaryColor: '#f59e0b',
      accentColor: '#fef3c7',
      backgroundColor: '#0b1329',
      textColor: '#f8fafc',
      fontFamily: 'sans'
    }
  },
  {
    id: 'tpl-floral-girl',
    name: 'Floral Baby Girl',
    slug: 'floral-girl',
    categoryId: 'cat-5',
    description: 'Delicate light lavender watercolor bouquets, warm pink borders, and calligraphic titles.',
    previewImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#c084fc',
      secondaryColor: '#f43f5e',
      accentColor: '#f3e8ff',
      backgroundColor: '#faf5ff',
      textColor: '#3b0764',
      fontFamily: 'greatvibes'
    }
  },
  {
    id: 'tpl-prince-carriage',
    name: 'Prince Carriage Blue',
    slug: 'prince-carriage',
    categoryId: 'cat-5',
    description: 'Royal carriage outlines, sky blue textures, and golden typography for baby boys.',
    previewImage: 'https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#3b82f6',
      secondaryColor: '#d4af37',
      accentColor: '#93c5fd',
      backgroundColor: '#eff6ff',
      textColor: '#1e3a8a',
      fontFamily: 'playfair'
    }
  },

  // PARTY / GALA CATEGORY (cat-6) - 3 Templates
  {
    id: 'tpl-neon-dance',
    name: 'Neon Dance Night',
    slug: 'neon-dance',
    categoryId: 'cat-6',
    description: 'Glow-in-the-dark magenta outlines and musical beats vectors set against indigo vaults.',
    previewImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#ec4899',
      secondaryColor: '#8b5cf6',
      accentColor: '#fbcfe8',
      backgroundColor: '#070417',
      textColor: '#fdf4ff',
      fontFamily: 'sans'
    }
  },
  {
    id: 'tpl-black-tie',
    name: 'Black Tie Dinner Gala',
    slug: 'black-tie',
    categoryId: 'cat-6',
    description: 'Tuxedo black theme detailed with sharp silver linings and premium modern serif fonts.',
    previewImage: 'https://images.unsplash.com/photo-1519225495810-7512c696505a?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#ffffff',
      secondaryColor: '#94a3b8',
      accentColor: '#475569',
      backgroundColor: '#090d16',
      textColor: '#f8fafc',
      fontFamily: 'cormorant'
    }
  },
  {
    id: 'tpl-summer-pool',
    name: 'Summer Cocktail Poolside',
    slug: 'summer-pool',
    categoryId: 'cat-6',
    description: 'Bright pool-water teal backdrop, yellow lemon vectors, and modern block headlines.',
    previewImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1473116763269-255ea7b2f5f9?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#06b6d4',
      secondaryColor: '#f59e0b',
      accentColor: '#22d3ee',
      backgroundColor: '#ecfeff',
      textColor: '#083344',
      fontFamily: 'sans'
    }
  },
  {
    id: 'tpl-apology-watercolor',
    name: 'Watercolor Apology',
    slug: 'apology-watercolor',
    categoryId: 'cat-7',
    description: 'A soft watercolor card template to convey warm, heartfelt apologies.',
    previewImage: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&auto=format&fit=crop&q=60',
    bgImage: '/watercolor-couple.png',
    isPremium: false,
    theme: {
      primaryColor: '#ec4899',
      secondaryColor: '#64748b',
      accentColor: '#f472b6',
      backgroundColor: '#fff1f2',
      textColor: '#4c0519',
      fontFamily: 'greatvibes'
    }
  },
  {
    id: 'tpl-apology-letter',
    name: 'Apology Heartfelt Letter',
    slug: 'apology-letter',
    categoryId: 'cat-7',
    description: 'Clean typographic letter layout on vintage parchment paper to say I am sorry.',
    previewImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=1200&auto=format&fit=crop&q=80',
    isPremium: true,
    theme: {
      primaryColor: '#475569',
      secondaryColor: '#94a3b8',
      accentColor: '#64748b',
      backgroundColor: '#fafaf9',
      textColor: '#1c1917',
      fontFamily: 'cormorant'
    }
  },
  {
    id: 'tpl-proposal-watercolor',
    name: 'Watercolor Proposal Double Seal',
    slug: 'proposal-watercolor',
    categoryId: 'cat-8',
    description: 'Immersive watercolor blend illustration with double-door curtain animations and gold wax seals.',
    previewImage: 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&auto=format&fit=crop&q=60',
    bgImage: '/watercolor-couple.png',
    isPremium: true,
    theme: {
      primaryColor: '#b8942c',
      secondaryColor: '#db2777',
      accentColor: '#f472b6',
      backgroundColor: '#fafaf9',
      textColor: '#0f172a',
      fontFamily: 'playfair'
    }
  },
  {
    id: 'tpl-proposal-floral',
    name: 'Floral Gold Proposal',
    slug: 'proposal-floral',
    categoryId: 'cat-8',
    description: 'Premium proposal card template featuring rose gold floral vectors and a classic script format.',
    previewImage: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=500&auto=format&fit=crop&q=60',
    bgImage: 'https://images.unsplash.com/photo-1533616688419-b7a585564566?w=1200&auto=format&fit=crop&q=80',
    isPremium: false,
    theme: {
      primaryColor: '#f43f5e',
      secondaryColor: '#f472b6',
      accentColor: '#fda4af',
      backgroundColor: '#fff1f2',
      textColor: '#4c0519',
      fontFamily: 'greatvibes'
    }
  },
  {
    id: 'tpl-violet-butterfly',
    name: 'Royal Violet Butterfly Proposal',
    slug: 'violet-butterfly-proposal',
    categoryId: 'cat-8',
    description: 'Breathtaking template decorated with watercolor purple roses and floating violet butterflies.',
    previewImage: '/purple-flowers.png',
    bgImage: '/purple-flowers.png',
    isPremium: true,
    theme: {
      primaryColor: '#8b5cf6',
      secondaryColor: '#7c3aed',
      accentColor: '#c084fc',
      backgroundColor: '#faf5ff',
      textColor: '#2e1065',
      fontFamily: 'greatvibes'
    }
  },
  {
    id: 'tpl-apology-butterfly',
    name: 'Lavender Butterfly Apology Letter',
    slug: 'apology-butterfly',
    categoryId: 'cat-7',
    description: 'Premium lavender apology card framed with watercolor purple roses and butterflies.',
    previewImage: '/purple-flowers.png',
    bgImage: '/purple-flowers.png',
    isPremium: false,
    theme: {
      primaryColor: '#7c3aed',
      secondaryColor: '#6d28d9',
      accentColor: '#a78bfa',
      backgroundColor: '#fbfbfe',
      textColor: '#2e1065',
      fontFamily: 'cormorant'
    }
  }
];

const seedDatabase = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/invitely');
    console.log(`Database connected: ${conn.connection.host}`);

    // Clear existing templates/categories
    await Category.deleteMany();
    await Template.deleteMany();
    console.log('Existing categories and templates cleared.');

    // Seed Categories
    const seededCategories = await Category.insertMany(categories);
    console.log(`Seeded ${seededCategories.length} categories.`);

    // Seed Templates
    const seededTemplates = await Template.insertMany(templates);
    console.log(`Seeded ${seededTemplates.length} templates.`);

    console.log('Database seeding successfully finished!');
    process.exit(0);
  } catch (error) {
    console.error(`Seeding error: ${error.message}`);
    process.exit(1);
  }
};

seedDatabase();
