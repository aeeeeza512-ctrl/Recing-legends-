import React, { useState } from 'react';
import { 
  Palette, 
  Copy, 
  Check, 
  Code2, 
  Sparkles, 
  Layers, 
  Sliders, 
  RefreshCw 
} from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface LiveryPreset {
  id: string;
  name: string;
  primaryColor: string;
  accentColor: string;
  glowColor: string;
  speedoColor: string;
}

const LIVERY_PRESETS: LiveryPreset[] = [
  {
    id: 'electric-blue',
    name: 'Electric Cyan & Crimson (Original Brief)',
    primaryColor: '#00E5FF',
    accentColor: '#FF1E44',
    glowColor: 'rgba(0, 229, 255, 0.7)',
    speedoColor: '#FF6B00'
  },
  {
    id: 'cyber-magenta',
    name: 'Cyberpunk Neon Magenta & Violet',
    primaryColor: '#E000FF',
    accentColor: '#00F0FF',
    glowColor: 'rgba(224, 0, 255, 0.7)',
    speedoColor: '#FF0077'
  },
  {
    id: 'apex-gold',
    name: 'Championship Trophy Gold & Carbon',
    primaryColor: '#FFD700',
    accentColor: '#FF5500',
    glowColor: 'rgba(255, 215, 0, 0.7)',
    speedoColor: '#FF8800'
  },
  {
    id: 'toxic-nitro',
    name: 'Toxic Nitro Lime & Electric Blue',
    primaryColor: '#00FF66',
    accentColor: '#00B4D8',
    glowColor: 'rgba(0, 255, 102, 0.7)',
    speedoColor: '#CCFF00'
  }
];

export const VectorBadgeViewer: React.FC = () => {
  const [selectedLivery, setSelectedLivery] = useState<LiveryPreset>(LIVERY_PRESETS[0]);
  const [copiedSvg, setCopiedSvg] = useState<boolean>(false);
  const [showCode, setShowCode] = useState<boolean>(false);

  const svgCode = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <!-- Glow Filters -->
    <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    <!-- Chrome Gradient for RACING -->
    <linearGradient id="chrome-grad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="35%" stop-color="#D4D9E2" />
      <stop offset="50%" stop-color="#8392A5" />
      <stop offset="65%" stop-color="#FFFFFF" />
      <stop offset="100%" stop-color="#4B5563" />
    </linearGradient>
    <!-- Dynamic Theme Gradient -->
    <linearGradient id="theme-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${selectedLivery.primaryColor}" />
      <stop offset="100%" stop-color="${selectedLivery.accentColor}" />
    </linearGradient>
  </defs>

  <!-- Deep Black Background -->
  <rect width="600" height="600" fill="#040508" rx="28" />

  <!-- Outer Shield Neon Bevel -->
  <polygon points="300,50 510,130 450,470 300,560 150,470 90,130" 
    fill="#090c14" stroke="url(#theme-grad)" stroke-width="6" filter="url(#neon-glow)" />

  <polygon points="300,70 490,145 435,455 300,540 165,455 110,145" 
    fill="#0b0f19" stroke="#1f2937" stroke-width="3" />

  <!-- Cyber Skyline Silhouette -->
  <path d="M 170 340 L 190 310 L 210 310 L 210 340 L 235 290 L 255 290 L 260 340 L 340 340 L 345 290 L 365 290 L 390 340 L 410 315 L 430 340 Z" 
    fill="#131926" opacity="0.7" />

  <!-- Speedometer Semi-Circle Gauge -->
  <path d="M 180 340 A 120 120 0 0 1 420 340" 
    fill="none" stroke="${selectedLivery.speedoColor}" stroke-width="6" stroke-dasharray="8 6" filter="url(#neon-glow)" />
  <!-- Speedo Tach Needle -->
  <line x1="300" y1="340" x2="390" y2="260" stroke="#FF1E44" stroke-width="4" stroke-linecap="round" />
  <circle cx="300" cy="340" r="8" fill="#FFFFFF" />

  <!-- Checkered Flags Left & Right -->
  <g transform="translate(110, 220) rotate(-15)">
    <rect x="0" y="0" width="20" height="15" fill="#FFFFFF" />
    <rect x="20" y="0" width="20" height="15" fill="#000000" />
    <rect x="0" y="15" width="20" height="15" fill="#000000" />
    <rect x="20" y="15" width="20" height="15" fill="#FFFFFF" />
    <line x1="40" y1="-5" x2="40" y2="70" stroke="#CBD5E1" stroke-width="3" />
  </g>
  <g transform="translate(450, 210) rotate(15)">
    <rect x="0" y="0" width="20" height="15" fill="#FFFFFF" />
    <rect x="20" y="0" width="20" height="15" fill="#000000" />
    <rect x="0" y="15" width="20" height="15" fill="#000000" />
    <rect x="20" y="15" width="20" height="15" fill="#FFFFFF" />
    <line x1="0" y1="-5" x2="0" y2="70" stroke="#CBD5E1" stroke-width="3" />
  </g>

  <!-- Futuristic Supercar Silhouette Front View -->
  <g transform="translate(180, 290)">
    <path d="M 40 90 L 70 40 L 170 40 L 200 90 L 230 100 L 240 120 L 0 120 L 10 100 Z" fill="${selectedLivery.primaryColor}" />
    <!-- Windshield -->
    <polygon points="75,45 165,45 180,85 60,85" fill="#050810" />
    <!-- Crimson Accents -->
    <polygon points="110,42 130,42 125,120 115,120" fill="${selectedLivery.accentColor}" />
    <!-- Glowing LED Headlights -->
    <polygon points="35,95 85,90 80,100 30,102" fill="#FFFFFF" filter="url(#neon-glow)" />
    <polygon points="205,95 155,90 160,100 210,102" fill="#FFFFFF" filter="url(#neon-glow)" />
    <!-- Front Splitter & Air Dam -->
    <rect x="30" y="115" width="180" height="10" fill="#111827" rx="2" />
  </g>

  <!-- Big 3D Chrome RACING Text -->
  <text x="300" y="180" font-family="'Orbitron', sans-serif" font-weight="900" font-size="64" 
    text-anchor="middle" fill="url(#chrome-grad)" stroke="#111827" stroke-width="3" letter-spacing="4">
    RACING
  </text>

  <!-- Italic Electric Speed LEGENDS Text -->
  <text x="300" y="225" font-family="'Rajdhani', sans-serif" font-style="italic" font-weight="900" font-size="44" 
    text-anchor="middle" fill="${selectedLivery.primaryColor}" filter="url(#neon-glow)" letter-spacing="8">
    LEGENDS
  </text>
</svg>`;

  const copySvgToClipboard = () => {
    navigator.clipboard.writeText(svgCode);
    setCopiedSvg(true);
    soundEngine.playUiClick();
    setTimeout(() => {
      setCopiedSvg(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6 w-full py-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-orbitron font-bold text-white flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyan-400" />
            LIVERY COLORWAY CUSTOMIZER & VECTOR ENGINE
          </h3>
          <p className="text-xs text-slate-400 font-rajdhani">
            Kustomisasi skema warna logo vektor secara live untuk tim esports, skin mobil, atau turnamen khusus.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setShowCode(!showCode);
              soundEngine.playUiClick();
            }}
            className="px-3.5 py-1.5 rounded-xl border border-slate-700 bg-slate-900 text-xs font-orbitron text-slate-300 hover:text-white flex items-center gap-1.5 transition-all"
          >
            <Code2 className="w-4 h-4" />
            <span>{showCode ? 'SEMBUNYIKAN KODE' : 'LIHAT KODE SVG'}</span>
          </button>

          <button
            onClick={copySvgToClipboard}
            className="px-4 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-orbitron font-semibold flex items-center gap-1.5 transition-all"
          >
            {copiedSvg ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedSvg ? 'SVG TERSALIN!' : 'SALIN SVG'}</span>
          </button>
        </div>
      </div>

      {/* Preset Livery Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {LIVERY_PRESETS.map((livery) => {
          const isSelected = selectedLivery.id === livery.id;
          return (
            <div
              key={livery.id}
              onClick={() => {
                setSelectedLivery(livery);
                soundEngine.playNeonSwitch();
              }}
              className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/40'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-orbitron font-bold text-white">
                  {livery.name.split(' (')[0]}
                </span>
                <div className="flex items-center gap-1">
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-black shadow"
                    style={{ backgroundColor: livery.primaryColor }}
                  ></div>
                  <div
                    className="w-3.5 h-3.5 rounded-full border border-black shadow"
                    style={{ backgroundColor: livery.accentColor }}
                  ></div>
                </div>
              </div>
              <span className="text-[10px] text-slate-400 font-rajdhani">
                {livery.id === 'electric-blue' ? 'Warna Standar Sesuai Instruksi' : 'Alternatif Esports Livery'}
              </span>
            </div>
          );
        })}
      </div>

      {/* SVG Canvas & Code View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Rendered Live SVG Badge */}
        <div className={`p-8 rounded-3xl border border-slate-800 bg-[#05060b] flex items-center justify-center relative overflow-hidden ${
          showCode ? 'lg:col-span-6' : 'lg:col-span-12'
        }`}>
          {/* Subtle Cyber Grid */}
          <div className="absolute inset-0 cyber-grid opacity-30"></div>

          <div className="relative w-full max-w-[440px] aspect-square flex items-center justify-center">
            <div
              className="w-full h-full flex items-center justify-center"
              dangerouslySetInnerHTML={{ __html: svgCode }}
            />
          </div>
        </div>

        {/* Live SVG Code Inspector */}
        {showCode && (
          <div className="lg:col-span-6 p-6 rounded-3xl border border-slate-800 bg-slate-950 flex flex-col justify-between gap-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-orbitron text-cyan-400 flex items-center gap-2">
                <Code2 className="w-4 h-4" />
                CLEAN VECTOR SVG SOURCE CODE
              </span>
              <span className="text-[10px] font-mono text-slate-400">Pure XML • No External Imgs</span>
            </div>

            <pre className="p-4 rounded-xl bg-black/90 border border-slate-800 text-[11px] font-mono text-slate-300 overflow-x-auto max-h-[380px] leading-relaxed selection:bg-cyan-500 selection:text-black">
              {svgCode}
            </pre>

            <div className="flex items-center justify-between text-xs text-slate-400 font-rajdhani">
              <span>Cocok untuk Adobe Illustrator, Figma, Inkscape, atau web inline SVG</span>
              <button
                onClick={copySvgToClipboard}
                className="text-cyan-400 hover:text-cyan-300 font-bold underline flex items-center gap-1"
              >
                Salin Semua Kode
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
