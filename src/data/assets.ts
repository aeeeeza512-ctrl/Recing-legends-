export interface BrandAsset {
  id: string;
  title: string;
  subtitle: string;
  aspectRatio: string;
  category: 'master' | 'banner' | 'icon' | 'badge';
  imagePath: string;
  description: string;
  recommendedUse: string;
  specs: string[];
}

export const BRAND_ASSETS: BrandAsset[] = [
  {
    id: 'master-logo',
    title: 'RACING LEGENDS Master 3D Logo',
    subtitle: 'Official Esports Primary Shield Emblem',
    aspectRatio: '1:1',
    category: 'master',
    imagePath: '/src/assets/images/racing_legends_logo_1792717865418.jpg',
    description: 'Logo utama perisai 3D dengan supercar biru elektrik aksen merah, dual bendera kotak-kotak, speedometer neon 180°, siluet kota cyberpunk, tulisan RACING metalik krom tebal, dan LEGENDS miring beraksen kecepatan.',
    recommendedUse: 'Game Title Screen, Esports Team Crest, Official Merch, Main Branding',
    specs: ['Ultra 3D CGI Chrome typography', 'Symmetric shield crest', 'Electric blue & neon red racing livery', 'Dual checkered victory flags']
  },
  {
    id: 'cinematic-banner',
    title: 'Cinematic Splash Screen & Key Art',
    subtitle: '16:9 Ultra-Wide Game Banner',
    aspectRatio: '16:9',
    category: 'banner',
    imagePath: '/src/assets/images/racing_legends_banner_1792717867092.jpg',
    description: 'Key art sinematik di sirkuit sirkuit futuristik basah dengan jejak cahaya neon, gedung pencakar langit kota metropolis malam hari, dan lambang RACING LEGENDS bercahaya di tengah.',
    recommendedUse: 'Steam Banner, PlayStation 5 Home Tile, Splash Loading Screen, YouTube Header',
    specs: ['16:9 Widescreen aspect ratio', 'Dynamic wet asphalt light trails', 'Cyberpunk neon metropolis background', 'Full visual impact for desktop & TV']
  },
  {
    id: 'app-icon',
    title: 'Mobile Game App Icon (Squircle)',
    subtitle: 'iOS App Store & Google Play Ready',
    aspectRatio: '1:1',
    category: 'icon',
    imagePath: '/src/assets/images/racing_app_icon_1792717867697.jpg',
    description: 'Ikon aplikasi game balap premium dengan bevel chrome tebal, tekstur serat karbon hitam, supercar biru elektrik tampak depan agresif, dan tachometer RPM bercahaya.',
    recommendedUse: 'Apple App Store (1024px), Google Play Store (512px), Mobile Launcher Icon',
    specs: ['Beveled metallic rim with glossy gloss', 'High contrast on dark app grids', 'Distinctive front-view supercar fascia', 'Optimized for 32px to 1024px scaling']
  },
  {
    id: 'championship-emblem',
    title: 'Championship Trophy Emblem',
    subtitle: 'Esports Tournament & Victory Badge',
    aspectRatio: '1:1',
    category: 'badge',
    imagePath: '/src/assets/images/racing_legends_emblem_1792717867788.jpg',
    description: 'Badge lambang kejuaraan balap dunia dengan sayap perak, mahkota titanium, knalpot nitro ganda, jarum RPM 10,000, serta siluet supercar berkecepatan tinggi.',
    recommendedUse: 'Ranked Season Badges, Winner Podium Screen, In-Game Decals, Physical Patches',
    specs: ['Dual checkered flag wings', 'Nitro exhaust pipes & mechanical cogs', '0-10,000 RPM tachometer dial', 'Crown crest of champion status']
  }
];

export const BRAND_COLORS = [
  {
    name: 'Electric Blue',
    nameId: 'Biru Elektrik',
    hex: '#00D4FF',
    rgb: '0, 212, 255',
    hsl: '190°, 100%, 50%',
    role: 'Warna bodi supercar utama, glow speedometer, dan tipografi LEGENDS',
    badgeClass: 'bg-[#00D4FF] text-black'
  },
  {
    name: 'Apex Crimson',
    nameId: 'Merah Apex',
    hex: '#FF1E44',
    rgb: '255, 30, 68',
    hsl: '350°, 100%, 56%',
    role: 'Aksen aero splitter, kaliper rem, garis neon agresif, dan redline RPM',
    badgeClass: 'bg-[#FF1E44] text-white'
  },
  {
    name: 'Cyber Magenta',
    nameId: 'Magenta Siber',
    hex: '#E000FF',
    rgb: '224, 0, 255',
    hsl: '293°, 100%, 50%',
    role: 'Glow perisai luar, ambient gedung kota malam, dan efek partikel kecepatan',
    badgeClass: 'bg-[#E000FF] text-white'
  },
  {
    name: 'Titanium Chrome',
    nameId: 'Krom Titanium',
    hex: '#E2E8F0',
    rgb: '226, 232, 240',
    hsl: '214°, 32%, 91%',
    role: 'Tipografi RACING 3D timbul, bevel bingkai perisai, dan refleksi logam',
    badgeClass: 'bg-[#E2E8F0] text-black'
  },
  {
    name: 'Deep Void Black',
    nameId: 'Hitam Pekat',
    hex: '#05060A',
    rgb: '5, 6, 10',
    hsl: '228°, 33%, 3%',
    role: 'Latar belakang kontras tinggi agar semua elemen neon dan krom terpancar',
    badgeClass: 'bg-[#05060A] text-white border border-slate-700'
  }
];

export const DESIGN_ELEMENTS = [
  {
    id: 'supercar',
    title: 'Supercar Biru Elektrik & Aksen Merah',
    englishTitle: 'Electric Blue Supercar with Crimson Accents',
    description: 'Mobil sport balap aerodinamis futuristik dengan lampu LED tajam, canard serat karbon, dan livery dual-tone kecepatan tinggi.',
    icon: 'Car'
  },
  {
    id: 'flags',
    title: 'Dua Bendera Kotak-Kotak (Checkered Flags)',
    englishTitle: 'Dual Symmetrical Checkered Flags',
    description: 'Dua bendera hitam-putih berkibar simetris di sisi kiri dan kanan, melambangkan garis finis, kemenangan, dan tradisi motorsport.',
    icon: 'Flag'
  },
  {
    id: 'speedometer',
    title: 'Speedometer Neon Setengah Lingkaran',
    englishTitle: 'Semi-Circular Neon Speedometer / Tachometer',
    description: 'Gauge instrumen digital RPM bercahaya oranye-merah neon dengan jarum analitik yang menegaskan sensasi kecepatan 350+ km/jam.',
    icon: 'Gauge'
  },
  {
    id: 'city',
    title: 'Siluet Kota Metropolis Futuristik',
    englishTitle: 'Cyber City Skyline Silhouette',
    description: 'Gedung-gedung pencakar langit masa depan berlatar neon ungu dan biru, menghadirkan atmosfer balap jalanan malam hari.',
    icon: 'Building2'
  },
  {
    id: 'racing-text',
    title: 'Tipografi "RACING" Logam 3D Krom',
    englishTitle: 'Heavy 3D Chrome "RACING" Typography',
    description: 'Huruf balok tebal bergaya chrome metallic dengan bevel miring, refleksi studio 3D, dan bayangan dimensi yang sangat kuat.',
    icon: 'Type'
  },
  {
    id: 'legends-text',
    title: 'Tipografi "LEGENDS" Miring Efek Kecepatan',
    englishTitle: 'Italic Speed-Streak "LEGENDS" Font',
    description: 'Font italic miring dengan sapuan biru elektrik bercahaya (neon cyan glow) yang memberikan kesan akselerasi dan nitro.',
    icon: 'Zap'
  },
  {
    id: 'shield',
    title: 'Bingkai Perisai Neon Multi-Layer',
    englishTitle: 'Multi-Layered Shield Crest Emblem',
    description: 'Emblem pelindung bersudut tajam esports dengan outline gradasi neon cyan, biru royal, merah, dan magenta berpadu bezel titanium.',
    icon: 'Shield'
  },
  {
    id: 'contrast',
    title: 'Latar Belakang Hitam Pekat (High Contrast)',
    englishTitle: 'Pitch Black Backdrop for Maximum Impact',
    description: 'Latar hitam tanpa distraksi memastikan visual 3D, refleksi chrome, dan pendaran lampu neon bersinar dengan daya tarik maksimal.',
    icon: 'Contrast'
  }
];
