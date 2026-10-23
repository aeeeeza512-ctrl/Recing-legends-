import React, { useState } from 'react';
import { 
  Smartphone, 
  Shirt, 
  Tv, 
  Share2, 
  Gamepad2, 
  Star, 
  Download, 
  Trophy, 
  Sparkles, 
  Users, 
  Flame, 
  Check, 
  ExternalLink 
} from 'lucide-react';
import { BRAND_ASSETS } from '../data/assets';
import { soundEngine } from '../utils/audio';

type MockupTab = 'mobile' | 'jersey' | 'steam' | 'social' | 'arcade';

export const MockupStudio: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MockupTab>('mobile');

  const masterLogo = BRAND_ASSETS[0].imagePath;
  const bannerImage = BRAND_ASSETS[1].imagePath;
  const appIconImage = BRAND_ASSETS[2].imagePath;
  const emblemImage = BRAND_ASSETS[3].imagePath;

  return (
    <div className="flex flex-col gap-6 w-full py-4">
      {/* Studio Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-3 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { id: 'mobile', label: 'Mobile App Store & Icon', icon: Smartphone },
            { id: 'steam', label: 'PlayStation / Steam Banner', icon: Tv },
            { id: 'jersey', label: 'Esports Racing Jersey', icon: Shirt },
            { id: 'social', label: 'Social & Twitch Kit', icon: Share2 },
            { id: 'arcade', label: 'Sim Rig Arcade Marquee', icon: Gamepad2 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as MockupTab);
                  soundEngine.playUiClick();
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-orbitron font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-lg shadow-cyan-500/25 scale-[1.02]'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="text-xs text-slate-400 font-rajdhani hidden xl:flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-time High-Fidelity Mockup Simulator</span>
        </div>
      </div>

      {/* Mockup Display Viewports */}
      <div className="w-full">
        {/* 1. Mobile App Icon & App Store Showcase */}
        {activeTab === 'mobile' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* iPhone 16 Pro Home Screen Preview */}
            <div className="lg:col-span-5 p-6 rounded-3xl border border-slate-800 bg-[#07090f] flex flex-col items-center justify-center relative overflow-hidden">
              <div className="text-xs font-orbitron text-slate-400 mb-4 flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-cyan-400" />
                IOS 18 HOME SCREEN GRID
              </div>

              {/* iPhone Frame */}
              <div className="relative w-[280px] h-[560px] rounded-[48px] border-[6px] border-slate-700 bg-black shadow-2xl p-4 flex flex-col justify-between overflow-hidden">
                {/* Dynamic Island */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-6 rounded-full bg-slate-900 border border-slate-800 z-30 flex items-center justify-between px-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-slate-950"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 animate-pulse"></div>
                </div>

                {/* Clock Widget */}
                <div className="pt-8 text-center text-white">
                  <div className="text-3xl font-orbitron font-bold">18:42</div>
                  <div className="text-xs text-slate-400">Kamis, 22 Oktober</div>
                </div>

                {/* App Grid */}
                <div className="grid grid-cols-4 gap-3.5 my-auto px-1">
                  {/* Hero App: RACING LEGENDS */}
                  <div className="flex flex-col items-center gap-1 group cursor-pointer col-span-2 row-span-2">
                    <div className="relative w-28 h-28 rounded-[24px] overflow-hidden shadow-2xl shadow-cyan-500/30 ring-2 ring-cyan-400 group-hover:scale-105 transition-transform">
                      <img
                        src={appIconImage}
                        alt="Racing Legends Icon"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                      {/* iOS Gloss Reflection */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none"></div>
                      {/* Notification Badge */}
                      <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white text-[10px] font-bold font-mono flex items-center justify-center border border-black">
                        1
                      </div>
                    </div>
                    <span className="text-[11px] font-rajdhani font-bold text-white tracking-wide mt-1">
                      Racing Legends
                    </span>
                  </div>

                  {/* Dummy Companion Apps */}
                  {['Discord', 'Twitch', 'Steam', 'Spotify'].map((appName) => (
                    <div key={appName} className="flex flex-col items-center gap-1 opacity-70">
                      <div className="w-12 h-12 rounded-[14px] bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
                        {appName[0]}
                      </div>
                      <span className="text-[9px] text-slate-400">{appName}</span>
                    </div>
                  ))}
                </div>

                {/* iOS Dock */}
                <div className="h-16 rounded-[30px] bg-white/10 backdrop-blur-xl flex items-center justify-around px-2 border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/80"></div>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/80"></div>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/80"></div>
                  <div className="w-10 h-10 rounded-xl bg-rose-500/80"></div>
                </div>
              </div>
            </div>

            {/* App Store Product Page Card */}
            <div className="lg:col-span-7 p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-950 flex flex-col justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-800">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 shrink-0">
                  <img
                    src={appIconImage}
                    alt="Racing Legends Icon"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <div className="text-xs font-orbitron text-cyan-400 uppercase tracking-wider">
                    #1 in Racing & Esports
                  </div>
                  <h3 className="text-2xl font-orbitron font-extrabold text-white">
                    RACING LEGENDS 3D
                  </h3>
                  <p className="text-xs text-slate-400 font-rajdhani">
                    Apex Nitro Studios • Balap Mobil Next-Gen Real-Time
                  </p>
                  <div className="flex items-center gap-3 pt-2 text-xs">
                    <div className="flex items-center text-yellow-400 font-bold">
                      <Star className="w-3.5 h-3.5 fill-yellow-400 mr-1" />
                      4.9
                    </div>
                    <span className="text-slate-500">•</span>
                    <span className="text-slate-300">1.4M Ulasan</span>
                    <span className="text-slate-500">•</span>
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-cyan-300">
                      12+ Esports
                    </span>
                  </div>
                </div>
              </div>

              {/* Banner screenshot inside store */}
              <div className="space-y-2">
                <div className="text-xs font-orbitron text-slate-300 flex items-center justify-between">
                  <span>GAMEPLAY PREVIEW SCREENSHOT</span>
                  <span className="text-cyan-400">4K 120 FPS SUPPORTED</span>
                </div>
                <div className="aspect-[16/9] rounded-2xl overflow-hidden border border-slate-800 shadow-xl group">
                  <img
                    src={bannerImage}
                    alt="Game Splash Preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs text-slate-400 font-rajdhani">
                  Kompatibel dengan iOS 17+, Android 14+, iPadOS & Android TV
                </div>
                <button
                  onClick={() => soundEngine.playUiClick()}
                  className="px-5 py-2.5 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-orbitron font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-400/20 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>DAPATKAN GAME</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 2. Steam & PlayStation 5 Console Banner */}
        {activeTab === 'steam' && (
          <div className="p-6 md:p-8 rounded-3xl border border-slate-800 bg-[#090b12] flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="text-xs font-orbitron text-cyan-400 flex items-center gap-2">
                <Tv className="w-4 h-4" />
                PLAYSTATION 5 & STEAM BIG PICTURE INTERFACE
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800">4K HDR</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">120Hz</span>
                <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">RAY TRACING</span>
              </div>
            </div>

            {/* PlayStation 5 Hero Banner UI */}
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
              <img
                src={bannerImage}
                alt="Banner Key Art"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Gradient Bottom Tint for Console UI */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              {/* Console HUD Overlay */}
              <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2 max-w-lg">
                  <div className="w-36 h-auto">
                    <img
                      src={masterLogo}
                      alt="Logo Overlay"
                      referrerPolicy="no-referrer"
                      className="w-full h-auto drop-shadow-2xl"
                    />
                  </div>
                  <p className="text-xs text-slate-300 font-rajdhani line-clamp-2">
                    Masuki dunia balap jalanan siber masa depan dengan supercar tercepat di sirkuit metropolis bercahaya neon.
                  </p>
                </div>

                {/* Console Action Buttons */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => soundEngine.playEngineRev()}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-orbitron font-extrabold text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/30 transition-transform active:scale-95"
                  >
                    <Flame className="w-4 h-4" />
                    <span>MAINKAN SEKARANG</span>
                  </button>
                  <button
                    onClick={() => soundEngine.playUiClick()}
                    className="px-4 py-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-white font-orbitron text-xs border border-slate-700 flex items-center gap-2"
                  >
                    <Trophy className="w-4 h-4 text-yellow-400" />
                    <span>PRESTASI (48/48)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Esports Racing Jersey */}
        {activeTab === 'jersey' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-950">
            {/* Jersey Visualizer */}
            <div className="relative aspect-square rounded-2xl bg-gradient-to-b from-[#11131c] via-[#090b10] to-[#040508] border border-slate-800 p-8 flex items-center justify-center overflow-hidden">
              {/* Carbon textile background pattern */}
              <div className="absolute inset-0 carbon-pattern opacity-60"></div>
              {/* Cyber neon speed stripes across jersey chest */}
              <div className="absolute -left-20 top-1/2 w-96 h-12 bg-cyan-500/20 transform -rotate-12 blur-md"></div>
              <div className="absolute -left-20 top-1/2 mt-8 w-96 h-4 bg-rose-500/20 transform -rotate-12 blur-md"></div>

              {/* Jersey Silhouette Shape */}
              <div className="relative w-72 h-80 bg-gradient-to-b from-slate-900 via-slate-950 to-black rounded-t-[60px] rounded-b-2xl border-2 border-slate-800 shadow-2xl flex flex-col items-center justify-start p-6">
                {/* Collar */}
                <div className="w-24 h-10 border-b-2 border-cyan-400 rounded-b-full mb-6"></div>

                {/* Chest Logo Placement */}
                <div className="w-36 h-36 rounded-xl overflow-hidden shadow-2xl filter drop-shadow-[0_0_15px_rgba(0,212,255,0.4)]">
                  <img
                    src={masterLogo}
                    alt="Jersey Chest Badge"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Sponsor decals */}
                <div className="mt-auto w-full flex items-center justify-between text-[9px] font-orbitron text-slate-500 px-2 border-t border-slate-800/80 pt-3">
                  <span>NITRO X</span>
                  <span className="text-cyan-400 font-bold">ESPORTS PRO</span>
                  <span>HYPERDRIVE</span>
                </div>
              </div>
            </div>

            {/* Jersey Tech Specs */}
            <div className="space-y-4">
              <div className="text-xs font-orbitron text-pink-400 flex items-center gap-2">
                <Shirt className="w-4 h-4" />
                OFFICIAL ESPORTS PRO TEAM APPAREL
              </div>
              <h3 className="text-2xl font-orbitron font-extrabold text-white">
                RACING LEGENDS CHAMPIONSHIP JERSEY
              </h3>
              <p className="text-xs text-slate-300 font-rajdhani leading-relaxed">
                Aplikasi logo emblem 3D pada kain performa serat karbon teknis hitam pekat. Desain emblem perisai simetris memberikan wibawa atlet esports profesional di atas panggung turnamen.
              </p>

              <div className="space-y-2 pt-2">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-rajdhani">
                  <span className="text-slate-400">Teknik Cetak:</span>
                  <strong className="text-cyan-300">High-Density 3D Silicone Transfer + Holographic Foil</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-rajdhani">
                  <span className="text-slate-400">Ketahanan Warna:</span>
                  <strong className="text-rose-400">Grade A+ (Anti Pudar & Cuci Mesin)</strong>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between text-xs font-rajdhani">
                  <span className="text-slate-400">Ukuran Rekomendasi Dada:</span>
                  <strong className="text-white">12 cm x 12 cm (Presisi Simetris)</strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Social Media & Streaming Kit */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 md:p-8 rounded-3xl border border-slate-800 bg-slate-950">
            {/* Discord Avatar */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col items-center text-center gap-3">
              <span className="text-xs font-orbitron text-slate-400">DISCORD / TWITCH AVATAR</span>
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-cyan-400 shadow-xl shadow-cyan-500/20">
                <img
                  src={masterLogo}
                  alt="Discord Avatar"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-110"
                />
                <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-black"></div>
              </div>
              <div>
                <div className="text-sm font-orbitron font-bold text-white">RacingLegends_ID</div>
                <div className="text-xs text-cyan-400 font-rajdhani">Official Esports Team</div>
              </div>
            </div>

            {/* YouTube / Twitch Banner */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col gap-3 md:col-span-2">
              <span className="text-xs font-orbitron text-slate-400">YOUTUBE / TWITCH STREAM HEADER</span>
              <div className="relative aspect-[16/6] rounded-xl overflow-hidden border border-slate-700 shadow-xl">
                <img
                  src={bannerImage}
                  alt="Stream Header"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-between px-6">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-red-600 text-white font-orbitron text-[10px] uppercase font-bold animate-pulse">
                      LIVE NOW
                    </span>
                    <h4 className="text-lg font-orbitron font-black text-white mt-1">
                      GRAND FINALS 2026
                    </h4>
                  </div>
                  <div className="hidden sm:flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-lg border border-slate-700 text-xs text-cyan-300 font-rajdhani">
                    <Users className="w-4 h-4" />
                    <span>84.2K Penonton</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. Sim Rig Arcade Marquee */}
        {activeTab === 'arcade' && (
          <div className="p-6 md:p-8 rounded-3xl border border-slate-800 bg-[#080910] flex flex-col gap-6">
            <div className="text-xs font-orbitron text-cyan-400 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              SIMULATOR WHEEL RIG & ARCADE CABINET MARQUEE
            </div>

            {/* Arcade Lightbox Header */}
            <div className="relative p-6 rounded-2xl bg-black border-4 border-slate-800 shadow-[0_0_40px_rgba(0,212,255,0.25)] flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-rose-500/10 pointer-events-none"></div>

              {/* Glowing Arcade Marquee */}
              <div className="w-full max-w-xl h-auto flex items-center justify-center">
                <img
                  src={masterLogo}
                  alt="Marquee Header"
                  referrerPolicy="no-referrer"
                  className="max-h-72 w-auto object-contain drop-shadow-[0_0_30px_rgba(0,212,255,0.7)]"
                />
              </div>

              {/* Neon edge lights */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-rose-500 to-purple-500"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-rose-500 to-cyan-400"></div>
            </div>

            <p className="text-xs text-slate-400 font-rajdhani text-center">
              Tampilan neon backlit signage berdaya pikat tinggi untuk simulator balap, turnamen esports LAN party, dan display mall.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
