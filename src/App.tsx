import React, { useState } from 'react';
import { 
  Trophy, 
  Sparkles, 
  Shield, 
  Layers, 
  Palette, 
  Smartphone, 
  Download, 
  Flame, 
  Compass, 
  ExternalLink,
  Volume2,
  VolumeX,
  Code2,
  CheckCircle2,
  Car
} from 'lucide-react';
import { BRAND_ASSETS, BrandAsset } from './data/assets';
import { InteractiveStage } from './components/InteractiveStage';
import { BrandGuide } from './components/BrandGuide';
import { MockupStudio } from './components/MockupStudio';
import { VectorBadgeViewer } from './components/VectorBadgeViewer';
import { ExportModal } from './components/ExportModal';
import { soundEngine } from './utils/audio';

type ActiveView = 'studio' | 'brand' | 'mockups' | 'vector';

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>('studio');
  const [selectedAsset, setSelectedAsset] = useState<BrandAsset>(BRAND_ASSETS[0]);
  const [exportModalAsset, setExportModalAsset] = useState<BrandAsset | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
    if (!next) soundEngine.playUiClick();
  };

  return (
    <div className="min-h-screen bg-[#040508] text-slate-100 flex flex-col font-rajdhani selection:bg-cyan-500 selection:text-black">
      {/* Top Esports Navigation Header */}
      <header className="sticky top-0 z-40 w-full border-b border-cyan-500/20 bg-[#06080e]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          {/* Logo Brand Title */}
          <div 
            onClick={() => {
              setActiveView('studio');
              soundEngine.playUiClick();
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-600 to-rose-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center overflow-hidden">
                <img
                  src={BRAND_ASSETS[0].imagePath}
                  alt="Racing Legends Icon"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-orbitron font-black text-base tracking-wider text-white">
                  RACING
                </span>
                <span className="font-rajdhani font-black italic text-lg tracking-widest text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
                  LEGENDS
                </span>
              </div>
              <span className="text-[10px] font-orbitron uppercase tracking-widest text-slate-400 block -mt-1">
                Official 3D Esports Brand Studio
              </span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1.5 bg-slate-950/80 p-1.5 rounded-2xl border border-slate-800">
            {[
              { id: 'studio', label: '3D Studio', icon: Compass },
              { id: 'brand', label: 'Brand Guide', icon: Shield },
              { id: 'mockups', label: 'Mockup Studio', icon: Smartphone },
              { id: 'vector', label: 'Custom Livery & SVG', icon: Palette }
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveView(item.id as ActiveView);
                    soundEngine.playUiClick();
                  }}
                  className={`px-3.5 py-2 rounded-xl text-xs font-orbitron font-bold flex items-center gap-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-md shadow-cyan-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Audio Toggle Button */}
            <button
              onClick={toggleMute}
              className={`p-2.5 rounded-xl border text-xs font-orbitron flex items-center gap-1.5 transition-all cursor-pointer ${
                isMuted
                  ? 'border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
                  : 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/50 shadow-sm shadow-cyan-500/20'
              }`}
              title={isMuted ? 'Nyalakan Audio' : 'Bisukan Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            </button>

            {/* Quick Export CTA */}
            <button
              onClick={() => {
                soundEngine.playUiClick();
                setExportModalAsset(selectedAsset);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-rose-600 hover:brightness-110 text-white font-orbitron font-black text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/25 active:scale-95 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">UNDUH ASET 4K</span>
            </button>
          </div>
        </div>

        {/* Mobile Sub-Navigation Bar */}
        <div className="flex md:hidden overflow-x-auto px-4 py-2 border-t border-slate-800/80 bg-slate-950 gap-2 no-scrollbar">
          {[
            { id: 'studio', label: '3D Studio', icon: Compass },
            { id: 'brand', label: 'Brand Guide', icon: Shield },
            { id: 'mockups', label: 'Mockups', icon: Smartphone },
            { id: 'vector', label: 'Livery & SVG', icon: Palette }
          ].map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveView(item.id as ActiveView);
                  soundEngine.playUiClick();
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-orbitron font-bold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-cyan-500 text-black'
                    : 'text-slate-400 bg-slate-900 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 flex flex-col gap-8">
        {/* Dynamic View Router */}
        {activeView === 'studio' && (
          <div className="flex flex-col gap-8 animate-in fade-in duration-300">
            {/* Interactive 3D Viewport Component */}
            <InteractiveStage
              selectedAsset={selectedAsset}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onOpenExport={(asset) => setExportModalAsset(asset)}
            />

            {/* Quick Spec Highlights Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { title: 'Simetri Desain', value: '100% Sempurna', desc: 'Symmetrical Shield Crest', color: 'text-cyan-400' },
                { title: 'Tipografi 3D', value: 'Chrome & Speed', desc: 'RACING + LEGENDS font', color: 'text-slate-100' },
                { title: 'Warna Utama', value: 'Biru Elektrik & Merah', desc: 'Cyberpunk Neon Palette', color: 'text-rose-400' },
                { title: 'Tingkat Resolusi', value: '4K CGI Master', desc: 'Ultra-High Contrast OLED', color: 'text-purple-400' }
              ].map((stat, i) => (
                <div key={i} className="p-4 rounded-xl border border-slate-800/80 bg-slate-950/70 backdrop-blur-md flex flex-col gap-1">
                  <span className="text-[10px] font-orbitron uppercase text-slate-400">{stat.title}</span>
                  <span className={`text-base font-orbitron font-extrabold ${stat.color}`}>{stat.value}</span>
                  <span className="text-[11px] text-slate-500 font-rajdhani">{stat.desc}</span>
                </div>
              ))}
            </div>

            {/* In-Depth Brand Guide Preview */}
            <BrandGuide />
          </div>
        )}

        {activeView === 'brand' && (
          <div className="animate-in fade-in duration-300">
            <BrandGuide />
          </div>
        )}

        {activeView === 'mockups' && (
          <div className="animate-in fade-in duration-300">
            <MockupStudio />
          </div>
        )}

        {activeView === 'vector' && (
          <div className="animate-in fade-in duration-300">
            <VectorBadgeViewer />
          </div>
        )}
      </main>

      {/* Esports Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-black py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 p-1 flex items-center justify-center">
              <Car className="w-5 h-5 text-cyan-400" />
            </div>
            <div>
              <div className="text-sm font-orbitron font-bold text-white">
                RACING LEGENDS ESPORTS
              </div>
              <div className="text-xs text-slate-500 font-rajdhani">
                Sistem Identitas Visual & Aset Game Balap Mobil 3D Generasi Baru
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-orbitron text-slate-400">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <CheckCircle2 className="w-4 h-4" />
              Semua Elemen Sesuai Brief
            </span>
            <span className="text-slate-600">|</span>
            <span>Bebas Watermark & Siap Produksi</span>
          </div>
        </div>
      </footer>

      {/* Export & Download Modal */}
      {exportModalAsset && (
        <ExportModal
          asset={exportModalAsset}
          onClose={() => setExportModalAsset(null)}
        />
      )}
    </div>
  );
}
