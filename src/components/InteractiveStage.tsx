import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Gauge, 
  Maximize2, 
  Flame, 
  SunMedium, 
  ZoomIn, 
  Compass, 
  Download,
  ShieldCheck,
  Zap,
  Layers
} from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { BRAND_ASSETS, BrandAsset } from '../data/assets';

interface InteractiveStageProps {
  selectedAsset: BrandAsset;
  onSelectAsset: (asset: BrandAsset) => void;
  onOpenExport: (asset: BrandAsset) => void;
}

export const InteractiveStage: React.FC<InteractiveStageProps> = ({
  selectedAsset,
  onSelectAsset,
  onOpenExport
}) => {
  const [glowIntensity, setGlowIntensity] = useState<'off' | 'subtle' | 'high' | 'overdrive'>('high');
  const [backgroundType, setBackgroundType] = useState<'oled' | 'carbon' | 'grid' | 'city'>('oled');
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [rpm, setRpm] = useState<number>(1200); // Idle RPM
  const [isRevving, setIsRevving] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isMagnifierActive, setIsMagnifierActive] = useState<boolean>(false);
  const [magnifierPos, setMagnifierPos] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const revIntervalRef = useRef<number | null>(null);

  // Handle Parallax Tilt
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -12; // rotateX
    const tiltY = ((x - centerX) / centerX) * 12;  // rotateY

    setTilt({ x: tiltX, y: tiltY });

    if (isMagnifierActive) {
      setMagnifierPos({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100
      });
    }
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Engine Rev Action
  const triggerRev = useCallback(() => {
    if (isRevving) return;
    setIsRevving(true);
    soundEngine.playEngineRev();

    let currentRpm = 1200;
    const targetRpm = 8800;

    // Ramp up
    const startTime = Date.now();
    const duration = 500;

    if (revIntervalRef.current) clearInterval(revIntervalRef.current);

    revIntervalRef.current = window.setInterval(() => {
      const elapsed = Date.now() - startTime;
      if (elapsed < duration) {
        const progress = elapsed / duration;
        currentRpm = 1200 + (targetRpm - 1200) * Math.sin((progress * Math.PI) / 2);
        setRpm(Math.round(currentRpm));
      } else {
        // Fall back to idle
        if (revIntervalRef.current) clearInterval(revIntervalRef.current);
        const fallStartTime = Date.now();
        const fallDuration = 900;
        revIntervalRef.current = window.setInterval(() => {
          const fallElapsed = Date.now() - fallStartTime;
          if (fallElapsed < fallDuration) {
            const p = fallElapsed / fallDuration;
            const dropRpm = targetRpm - (targetRpm - 1200) * p;
            setRpm(Math.round(dropRpm));
          } else {
            setRpm(1200);
            setIsRevving(false);
            if (revIntervalRef.current) clearInterval(revIntervalRef.current);
          }
        }, 30);
      }
    }, 25);
  }, [isRevving]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        e.preventDefault();
        triggerRev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (revIntervalRef.current) clearInterval(revIntervalRef.current);
    };
  }, [triggerRev]);

  const toggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    soundEngine.setMuted(next);
    if (!next) soundEngine.playUiClick();
  };

  // Determine glow style
  const getGlowStyles = () => {
    switch (glowIntensity) {
      case 'off':
        return '';
      case 'subtle':
        return 'drop-shadow(0 0 15px rgba(0,212,255,0.3))';
      case 'high':
        return 'drop-shadow(0 0 25px rgba(0,229,255,0.55)) drop-shadow(0 0 45px rgba(255,30,68,0.35))';
      case 'overdrive':
        return 'drop-shadow(0 0 35px rgba(0,240,255,0.8)) drop-shadow(0 0 70px rgba(255,0,110,0.6)) drop-shadow(0 0 100px rgba(0,140,255,0.4))';
    }
  };

  // Speedometer needle rotation in deg (Idle 1200 = -110deg, 9000 = +110deg)
  const needleDeg = -110 + ((rpm - 1000) / 8000) * 220;

  return (
    <div className={`relative flex flex-col w-full rounded-2xl border border-cyan-500/20 bg-slate-950/80 backdrop-blur-xl overflow-hidden shadow-2xl shadow-cyan-950/30 ${
      isFullscreen ? 'fixed inset-0 z-50 rounded-none bg-black' : ''
    }`}>
      {/* Top Studio Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-b border-slate-800/80 bg-slate-900/60 z-20">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-md bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 text-xs font-orbitron tracking-wider">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            3D CGI VIEWPORT
          </div>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Status: <strong className="text-slate-200">Production Ready 4K</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Aktifkan Suara Mesin & FX' : 'Bisukan Suara'}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
              isMuted
                ? 'border-slate-700 bg-slate-800/80 text-slate-400 hover:text-slate-200'
                : 'border-cyan-500/40 bg-cyan-950/40 text-cyan-300 hover:bg-cyan-900/40'
            }`}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
            <span className="hidden md:inline font-rajdhani font-semibold text-xs">
              {isMuted ? 'MUTE' : 'AUDIO ON'}
            </span>
          </button>

          {/* Magnifier Inspector */}
          <button
            onClick={() => {
              setIsMagnifierActive(!isMagnifierActive);
              soundEngine.playUiClick();
            }}
            className={`p-2 rounded-lg border text-xs flex items-center gap-1.5 transition-all ${
              isMagnifierActive
                ? 'border-pink-500/50 bg-pink-950/40 text-pink-300'
                : 'border-slate-800 bg-slate-900/80 text-slate-300 hover:border-slate-700'
            }`}
          >
            <ZoomIn className="w-4 h-4" />
            <span className="hidden md:inline font-rajdhani font-semibold text-xs">INSPECTOR</span>
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => {
              setIsFullscreen(!isFullscreen);
              soundEngine.playUiClick();
            }}
            className="p-2 rounded-lg border border-slate-800 bg-slate-900/80 text-slate-300 hover:text-white hover:border-slate-700 transition-all text-xs"
            title="Fullscreen Mode"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main 3D Interactive Stage Canvas Area */}
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`relative flex items-center justify-center p-6 md:p-12 min-h-[460px] md:min-h-[580px] cursor-crosshair select-none overflow-hidden transition-colors ${
          backgroundType === 'oled' ? 'bg-[#030406]' : ''
        } ${backgroundType === 'carbon' ? 'carbon-pattern' : ''} ${
          backgroundType === 'grid' ? 'bg-slate-950 cyber-grid' : ''
        } ${backgroundType === 'city' ? 'bg-gradient-to-b from-[#080b18] via-[#05060f] to-[#020204]' : ''}`}
        style={{ perspective: '1100px' }}
      >
        {/* Ambient Neon Atmosphere Light Flares */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-rose-600/15 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Speed lines backdrop animation when revving */}
        {isRevving && (
          <div className="absolute inset-0 speed-lines opacity-40 animate-pulse pointer-events-none"></div>
        )}

        {/* 3D Tilting Card Container */}
        <div
          className="relative transition-transform duration-100 ease-out flex items-center justify-center"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${isRevving ? '1.03' : '1'}, ${isRevving ? '1.03' : '1'}, 1)`,
            filter: getGlowStyles(),
          }}
        >
          {/* Main Logo Image */}
          <div className="relative group max-w-[420px] sm:max-w-[480px] md:max-w-[540px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={selectedAsset.imagePath}
              alt={selectedAsset.title}
              referrerPolicy="no-referrer"
              className={`w-full h-auto object-contain transition-all duration-300 ${
                isRevving ? 'brightness-110 contrast-105' : ''
              }`}
            />

            {/* Magnifier Lens HUD */}
            {isMagnifierActive && (
              <div
                className="absolute w-44 h-44 rounded-full border-2 border-cyan-400 shadow-2xl pointer-events-none overflow-hidden"
                style={{
                  top: `calc(${magnifierPos.y}% - 88px)`,
                  left: `calc(${magnifierPos.x}% - 88px)`,
                  boxShadow: '0 0 25px rgba(0, 240, 255, 0.8), inset 0 0 20px rgba(0,0,0,0.5)',
                }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    backgroundImage: `url(${selectedAsset.imagePath})`,
                    backgroundPosition: `${magnifierPos.x}% ${magnifierPos.y}%`,
                    backgroundSize: '350%',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                {/* Crosshair indicator */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-4 h-0.5 bg-cyan-400/80"></div>
                  <div className="h-4 w-0.5 bg-cyan-400/80 absolute"></div>
                </div>
              </div>
            )}

            {/* Nitrous Flame Emitters when revving */}
            {isRevving && (
              <>
                <div className="absolute bottom-12 left-10 w-24 h-12 bg-gradient-to-r from-cyan-400 to-transparent blur-md opacity-80 animate-pulse transform -rotate-12 pointer-events-none"></div>
                <div className="absolute bottom-12 right-10 w-24 h-12 bg-gradient-to-l from-rose-500 to-transparent blur-md opacity-80 animate-pulse transform rotate-12 pointer-events-none"></div>
              </>
            )}
          </div>
        </div>

        {/* HUD Live Tachometer & Rev Widget (Bottom Left) */}
        <div className="absolute bottom-4 left-4 z-20 flex items-center gap-3 bg-black/85 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800 shadow-xl">
          {/* Mini Tachometer Dial */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
              {/* Background Arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="#1e293b"
                strokeWidth="8"
                strokeDasharray="188"
                strokeDashoffset="45"
              />
              {/* Active RPM Arc */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke={rpm > 7000 ? '#ef4444' : '#06b6d4'}
                strokeWidth="8"
                strokeDasharray="188"
                strokeDashoffset={188 - ((rpm - 1000) / 8000) * 143}
                className="transition-all duration-75"
              />
            </svg>
            <div 
              className="absolute w-1 h-5 bg-white origin-bottom rounded-full transition-transform duration-75"
              style={{
                bottom: '24px',
                transform: `rotate(${needleDeg}deg)`,
                boxShadow: '0 0 6px #00e5ff'
              }}
            />
          </div>

          <div>
            <div className="text-[10px] tracking-wider text-slate-400 font-orbitron flex items-center gap-1">
              <Gauge className="w-3 h-3 text-cyan-400" />
              TACHOMETER
            </div>
            <div className="flex items-baseline gap-1">
              <span className={`text-base font-orbitron font-bold ${
                rpm > 7000 ? 'text-red-400 animate-pulse' : 'text-cyan-300'
              }`}>
                {rpm.toLocaleString()}
              </span>
              <span className="text-[10px] text-slate-400 font-rajdhani">RPM</span>
            </div>
          </div>

          {/* Rev Pedal Button */}
          <button
            onClick={triggerRev}
            onMouseEnter={() => soundEngine.playUiClick()}
            className={`ml-2 px-3 py-1.5 rounded-lg border font-orbitron text-xs flex items-center gap-1.5 transition-all shadow-lg active:scale-95 ${
              isRevving 
                ? 'bg-rose-600 border-rose-400 text-white shadow-rose-900/50 scale-105' 
                : 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 border-cyan-400 text-white shadow-cyan-900/40'
            }`}
          >
            <Flame className={`w-3.5 h-3.5 ${isRevving ? 'animate-bounce text-yellow-300' : 'text-cyan-200'}`} />
            <span>{isRevving ? 'REDLINE!' : 'REV ENGINE'}</span>
          </button>
        </div>

        {/* 3D Tilt HUD Indicator (Bottom Right) */}
        <div className="absolute bottom-4 right-4 z-20 hidden sm:flex items-center gap-2 bg-black/85 backdrop-blur-md px-3 py-2 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-orbitron">
          <Compass className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>3D TILT:</span>
          <span className="text-cyan-300">{Math.round(tilt.y)}° Y / {Math.round(tilt.x)}° X</span>
        </div>
      </div>

      {/* Bottom Control Deck: Switch Backgrounds, Glow Mode, and Asset Carousel */}
      <div className="p-4 md:p-5 border-t border-slate-800/80 bg-slate-900/90 flex flex-col gap-4">
        {/* Controls Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 items-center">
          {/* Stage Backdrop Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-rajdhani font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              Latar:
            </span>
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {[
                { id: 'oled', label: 'Hitam OLED' },
                { id: 'carbon', label: 'Karbon' },
                { id: 'grid', label: 'Grid Siber' },
                { id: 'city', label: 'Kota Malam' }
              ].map(bg => (
                <button
                  key={bg.id}
                  onClick={() => {
                    setBackgroundType(bg.id as typeof backgroundType);
                    soundEngine.playUiClick();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-rajdhani transition-all ${
                    backgroundType === bg.id
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {bg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Neon Glow Level */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-rajdhani font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <SunMedium className="w-3.5 h-3.5 text-pink-400" />
              Pendar Neon:
            </span>
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {[
                { id: 'off', label: 'Mati' },
                { id: 'subtle', label: 'Halus' },
                { id: 'high', label: 'Tinggi' },
                { id: 'overdrive', label: 'Overdrive' }
              ].map(glow => (
                <button
                  key={glow.id}
                  onClick={() => {
                    setGlowIntensity(glow.id as typeof glowIntensity);
                    soundEngine.playNeonSwitch();
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-rajdhani transition-all ${
                    glowIntensity === glow.id
                      ? 'bg-pink-500/20 text-pink-300 border border-pink-500/40 font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {glow.label}
                </button>
              ))}
            </div>
          </div>

          {/* Export Action Button */}
          <div className="flex justify-end gap-2">
            <button
              onClick={() => {
                soundEngine.playUiClick();
                onOpenExport(selectedAsset);
              }}
              className="w-full md:w-auto px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-orbitron font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>UNDUH LOGO 4K & ASET</span>
            </button>
          </div>
        </div>

        {/* Logo Variations Carousel */}
        <div>
          <div className="text-[11px] font-orbitron uppercase text-slate-400 tracking-wider mb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-cyan-400">
              <ShieldCheck className="w-3.5 h-3.5" />
              VARIASI LOGO & ASSET RACING LEGENDS RESMI:
            </span>
            <span className="text-slate-500 lowercase text-[10px]">Pilih untuk melihat preview 3D</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {BRAND_ASSETS.map((asset) => {
              const isSelected = selectedAsset.id === asset.id;
              return (
                <div
                  key={asset.id}
                  onClick={() => {
                    onSelectAsset(asset);
                    soundEngine.playUiClick();
                  }}
                  className={`relative p-2 rounded-xl border cursor-pointer transition-all flex flex-col gap-2 group ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-950/50'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                  }`}
                >
                  <div className="relative aspect-square sm:aspect-[4/3] rounded-lg overflow-hidden bg-black flex items-center justify-center">
                    <img
                      src={asset.imagePath}
                      alt={asset.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 backdrop-blur-sm border border-slate-700 text-[9px] font-orbitron text-cyan-300">
                      {asset.aspectRatio}
                    </span>
                  </div>

                  <div className="flex flex-col">
                    <span className="text-xs font-rajdhani font-bold text-slate-100 line-clamp-1 group-hover:text-cyan-300 transition-colors">
                      {asset.title}
                    </span>
                    <span className="text-[10px] text-slate-400 line-clamp-1">
                      {asset.subtitle}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping"></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
