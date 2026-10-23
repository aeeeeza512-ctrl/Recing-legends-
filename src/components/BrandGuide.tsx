import React, { useState } from 'react';
import { 
  Check, 
  Copy, 
  Car, 
  Flag, 
  Gauge, 
  Building2, 
  Type, 
  Zap, 
  Shield, 
  Contrast, 
  Sparkles,
  Info,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { BRAND_COLORS, DESIGN_ELEMENTS } from '../data/assets';
import { soundEngine } from '../utils/audio';

export const BrandGuide: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const [activeElementId, setActiveElementId] = useState<string>('supercar');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    soundEngine.playUiClick();
    setTimeout(() => {
      setCopiedHex(null);
    }, 2000);
  };

  const getElementIcon = (iconName: string) => {
    switch (iconName) {
      case 'Car': return <Car className="w-5 h-5 text-cyan-400" />;
      case 'Flag': return <Flag className="w-5 h-5 text-slate-200" />;
      case 'Gauge': return <Gauge className="w-5 h-5 text-rose-500" />;
      case 'Building2': return <Building2 className="w-5 h-5 text-purple-400" />;
      case 'Type': return <Type className="w-5 h-5 text-slate-100" />;
      case 'Zap': return <Zap className="w-5 h-5 text-cyan-300" />;
      case 'Shield': return <Shield className="w-5 h-5 text-pink-400" />;
      case 'Contrast': return <Contrast className="w-5 h-5 text-blue-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  return (
    <div className="flex flex-col gap-10 w-full py-4">
      {/* Brand Overview Header */}
      <div className="relative rounded-2xl p-6 md:p-8 border border-cyan-500/20 bg-gradient-to-r from-slate-900/90 via-slate-950/90 to-slate-900/90 backdrop-blur-xl overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-[80px] pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-cyan-400 font-orbitron text-xs tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              PANDUAN IDENTITAS RESMI (BRAND SPECIFICATION)
            </div>
            <h2 className="text-2xl md:text-3xl font-orbitron font-extrabold text-white tracking-wide">
              RACING LEGENDS <span className="text-cyan-400 font-rajdhani italic font-black">DESIGN SYSTEM</span>
            </h2>
            <p className="text-sm md:text-base text-slate-300 font-rajdhani leading-relaxed">
              Standar desain visual esports tingkat tinggi untuk franchise balap mobil 3D "RACING LEGENDS". Menggabungkan estetika aerodinamika supercar, krom logam 3D, neon siber, dan bendera kemenangan simetris.
            </p>
          </div>

          <div className="flex flex-wrap md:flex-col gap-2">
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-rajdhani flex items-center gap-2">
              <span className="text-slate-400">Genre:</span>
              <strong className="text-cyan-400">Esports 3D Sim-Arcade</strong>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-rajdhani flex items-center gap-2">
              <span className="text-slate-400">Rasio Desain:</span>
              <strong className="text-rose-400">Simetris 100%</strong>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-rajdhani flex items-center gap-2">
              <span className="text-slate-400">Rendering:</span>
              <strong className="text-white">Ray-Traced CGI 4K</strong>
            </div>
          </div>
        </div>
      </div>

      {/* 8 Core Design Anatomy Elements Breakdown */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-orbitron font-bold text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-cyan-400" />
              ANATOMI 8 ELEMEN UTAMA LOGO
            </h3>
            <p className="text-xs text-slate-400 font-rajdhani">
              Setiap elemen dirancang presisi sesuai brief desain game balap profesional
            </p>
          </div>
          <span className="text-xs font-orbitron text-cyan-400/80 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-500/30">
            8/8 PERSYARATAN TERPENUHI
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {DESIGN_ELEMENTS.map((elem) => {
            const isActive = activeElementId === elem.id;
            return (
              <div
                key={elem.id}
                onClick={() => {
                  setActiveElementId(elem.id);
                  soundEngine.playUiClick();
                }}
                className={`relative p-5 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between gap-3 group ${
                  isActive
                    ? 'bg-slate-900 border-cyan-400/80 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                    : 'bg-slate-950/70 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                    {getElementIcon(elem.icon)}
                  </div>
                  <span className="text-[10px] font-orbitron px-2 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    REQ
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-orbitron font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {elem.title}
                  </h4>
                  <p className="text-[11px] text-cyan-400 font-rajdhani font-semibold mt-0.5">
                    {elem.englishTitle}
                  </p>
                  <p className="text-xs text-slate-400 font-rajdhani mt-2 leading-relaxed">
                    {elem.description}
                  </p>
                </div>

                {isActive && (
                  <div className="h-0.5 w-full bg-gradient-to-r from-cyan-400 via-rose-500 to-purple-500 rounded-full mt-2"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Official Brand Color Palette with Click-to-Copy */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-orbitron font-bold text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            PALET WARNA RESMI (OFFICIAL COLOR PALETTE)
          </h3>
          <p className="text-xs text-slate-400 font-rajdhani">
            Klik kode HEX untuk menyalin kode warna ke clipboard
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {BRAND_COLORS.map((c) => {
            const isJustCopied = copiedHex === c.hex;
            return (
              <div
                key={c.name}
                onClick={() => copyToClipboard(c.hex)}
                className="group relative p-4 rounded-2xl border border-slate-800 bg-slate-950/80 hover:border-slate-700 hover:bg-slate-900/60 transition-all cursor-pointer flex flex-col justify-between gap-4 overflow-hidden"
              >
                {/* Color Swatch Preview */}
                <div
                  className="w-full h-24 rounded-xl flex items-end p-2.5 transition-transform group-hover:scale-[1.02] shadow-inner relative border border-white/10"
                  style={{ backgroundColor: c.hex }}
                >
                  <div className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-white text-[10px] font-orbitron flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {isJustCopied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    <span>{isJustCopied ? 'TERSALIN' : 'SALIN'}</span>
                  </div>
                </div>

                {/* Color Details */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-orbitron font-bold text-slate-100">
                      {c.name}
                    </span>
                    <span className="text-[10px] text-slate-400 font-rajdhani">
                      {c.nameId}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-slate-900">
                    <code className="text-xs font-mono font-bold text-cyan-400">
                      {c.hex}
                    </code>
                    <span className="text-[10px] font-mono text-slate-500">
                      RGB({c.rgb})
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-400 font-rajdhani leading-tight pt-1">
                    {c.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Typography System Section */}
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-orbitron font-bold text-white flex items-center gap-2">
            <Type className="w-5 h-5 text-cyan-400" />
            HIERARKI TIPOGRAFI & HURUF
          </h3>
          <p className="text-xs text-slate-400 font-rajdhani">
            Spesifikasi font dan perlakuan 3D chrome untuk branding RACING LEGENDS
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Primary 3D Wordmark */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-orbitron text-cyan-400 tracking-wider">
                  PRIMARY WORDMARK (TITLE)
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono border border-slate-800">
                  3D Beveled Chrome
                </span>
              </div>

              <div className="mt-4 p-5 rounded-xl bg-gradient-to-b from-[#141824] to-[#07090e] border border-slate-800 flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl font-orbitron font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-200 to-slate-400 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] filter">
                  RACING
                </h1>
              </div>

              <ul className="mt-4 space-y-1.5 text-xs text-slate-300 font-rajdhani">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <strong>Font:</strong> Orbitron / Custom Geometric Heavy Esports Sans
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <strong>Efek:</strong> 3D Extrusion bevel, specular highlight krom, dan ambient occluded rim
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                  <strong>Tracking:</strong> Loose (+0.12em) untuk legibilitas maksimal saat skala kecil
                </li>
              </ul>
            </div>
          </div>

          {/* Sub-Brand Speed Typography */}
          <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/80 flex flex-col justify-between gap-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-orbitron text-pink-400 tracking-wider">
                  SUB-WORDMARK (SPEED ACCENT)
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-900 text-slate-300 font-mono border border-slate-800">
                  Electric Blue Speed Italic
                </span>
              </div>

              <div className="mt-4 p-5 rounded-xl bg-gradient-to-b from-[#141824] to-[#07090e] border border-slate-800 flex items-center justify-center">
                <h2 className="text-3xl md:text-4xl font-rajdhani font-black italic tracking-widest text-[#00E5FF] drop-shadow-[0_0_18px_rgba(0,229,255,0.7)]">
                  LEGENDS
                </h2>
              </div>

              <ul className="mt-4 space-y-1.5 text-xs text-slate-300 font-rajdhani">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                  <strong>Font:</strong> Rajdhani / Speed Brush Oblique Display
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                  <strong>Efek:</strong> Sudut kemiringan 18° italic dinamis dengan pendaran neon cyan & horizontal motion streaks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" />
                  <strong>Penempatan:</strong> Tepat di bawah RACING, sejajar dengan garis bumper supercar
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Rules & Usage (Do's and Don'ts) */}
      <div className="p-6 rounded-2xl border border-slate-800 bg-slate-950/90 flex flex-col gap-4">
        <h3 className="text-lg font-orbitron font-bold text-white flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          ATURAN PENGGUNAAN & KETENTUAN LOGO (DO'S & DON'TS)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-rajdhani">
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
            <span className="font-orbitron font-bold text-emerald-400 flex items-center gap-1.5 text-xs">
              <CheckCircle2 className="w-4 h-4" />
              DISARANKAN (DO)
            </span>
            <ul className="space-y-1 text-slate-300">
              <li>• Gunakan latar belakang hitam pekat (#05060A) atau gelap agar neon memancar kuat.</li>
              <li>• Pertahankan aspek rasio 1:1 tanpa peregangan (stretching) agar perisai tetap simetris.</li>
              <li>• Berikan ruang aman (clearance area) minimal 15% dari lebar logo di sekeliling bingkai.</li>
              <li>• Gunakan file format WebP/PNG resolusi tinggi (2K/4K) untuk tampilan layar tajam.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 space-y-2">
            <span className="font-orbitron font-bold text-rose-400 flex items-center gap-1.5 text-xs">
              <XCircle className="w-4 h-4" />
              DILARANG (DON'T)
            </span>
            <ul className="space-y-1 text-slate-300">
              <li>• Jangan mengubah ejaan "RACING LEGENDS" atau menutupi tulisan dengan elemen lain.</li>
              <li>• Jangan menaruh logo di atas latar putih polos yang memudarkan glow neon speedometer.</li>
              <li>• Jangan memutar emblem di luar orientasi tegak lurus (0° vertikal).</li>
              <li>• Jangan menambahkan watermark atau teks tambahan yang merusak kebersihan komposisi.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
