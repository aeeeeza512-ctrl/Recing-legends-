import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Check, 
  Copy, 
  FileImage, 
  Smartphone, 
  Monitor, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';
import { BrandAsset } from '../data/assets';
import { soundEngine } from '../utils/audio';

interface ExportModalProps {
  asset: BrandAsset;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ asset, onClose }) => {
  const [downloading, setDownloading] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Trigger high quality image download using HTML canvas
  const handleDownload = async (label: string, width: number, height: number) => {
    setDownloading(label);
    soundEngine.playUiClick();

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = asset.imagePath;

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#05060A';
        ctx.fillRect(0, 0, width, height);

        // Aspect ratio cover/contain
        const imgRatio = img.width / img.height;
        const targetRatio = width / height;

        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (imgRatio > targetRatio) {
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
        } else {
          drawHeight = width / imgRatio;
          offsetY = (height - drawHeight) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

        const dataUrl = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = `racing-legends-${asset.id}-${width}x${height}.png`;
        link.href = dataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      // Fallback direct link
      const link = document.createElement('a');
      link.download = `racing-legends-${asset.id}.jpg`;
      link.href = asset.imagePath;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } finally {
      setTimeout(() => {
        setDownloading(null);
      }, 800);
    }
  };

  const copyPath = () => {
    navigator.clipboard.writeText(window.location.origin + asset.imagePath);
    setCopiedLink(true);
    soundEngine.playUiClick();
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl rounded-3xl border border-cyan-500/30 bg-slate-950 p-6 md:p-8 shadow-2xl shadow-cyan-950/50 flex flex-col gap-6 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="space-y-1">
            <span className="text-xs font-orbitron text-cyan-400 tracking-wider">
              EXPORT & DOWNLOAD ASSETS
            </span>
            <h3 className="text-xl font-orbitron font-extrabold text-white">
              {asset.title}
            </h3>
          </div>

          <button
            onClick={() => {
              soundEngine.playUiClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Selected Asset Preview */}
        <div className="flex flex-col sm:flex-row items-center gap-6 p-4 rounded-2xl bg-slate-900/60 border border-slate-800/80">
          <div className="w-32 h-32 rounded-xl overflow-hidden bg-black shrink-0 border border-slate-800 shadow-xl">
            <img
              src={asset.imagePath}
              alt={asset.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm font-orbitron font-bold text-white">{asset.subtitle}</div>
            <p className="text-xs text-slate-300 font-rajdhani">{asset.description}</p>
            <div className="pt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-orbitron text-cyan-300">
                Format: Ultra HD PNG / JPG
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-orbitron text-slate-300">
                Color Space: sRGB True Dark
              </span>
            </div>
          </div>
        </div>

        {/* Download Presets */}
        <div className="space-y-3">
          <div className="text-xs font-orbitron text-slate-300">
            PILIH FORMAT & RESOLUSI UNDUHAN:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* 4K Master Ultra HD */}
            <button
              onClick={() => handleDownload('4k', 3840, 3840)}
              disabled={downloading !== null}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-cyan-500/50 hover:bg-slate-900 transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400 group-hover:scale-105 transition-transform">
                  <Monitor className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-orbitron font-bold text-white group-hover:text-cyan-300">
                    4K Ultra Master (3840 x 3840)
                  </div>
                  <div className="text-[11px] text-slate-400 font-rajdhani">
                    Kualitas cetak poster, splash screen, banner raksasa
                  </div>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
            </button>

            {/* 2K Standard HD */}
            <button
              onClick={() => handleDownload('2k', 2048, 2048)}
              disabled={downloading !== null}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-cyan-500/50 hover:bg-slate-900 transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-purple-950/60 border border-purple-500/30 text-purple-400 group-hover:scale-105 transition-transform">
                  <FileImage className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-orbitron font-bold text-white group-hover:text-purple-300">
                    2K Gaming HD (2048 x 2048)
                  </div>
                  <div className="text-[11px] text-slate-400 font-rajdhani">
                    Ideal untuk Steam, PlayStation Store, Web UI
                  </div>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-500 group-hover:text-purple-400" />
            </button>

            {/* App Store Icon 1024px */}
            <button
              onClick={() => handleDownload('icon', 1024, 1024)}
              disabled={downloading !== null}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-pink-500/50 hover:bg-slate-900 transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-pink-950/60 border border-pink-500/30 text-pink-400 group-hover:scale-105 transition-transform">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-orbitron font-bold text-white group-hover:text-pink-300">
                    Mobile App Store (1024 x 1024)
                  </div>
                  <div className="text-[11px] text-slate-400 font-rajdhani">
                    Standar resmi Apple App Store & Google Play
                  </div>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-500 group-hover:text-pink-400" />
            </button>

            {/* Social Media Avatar 800px */}
            <button
              onClick={() => handleDownload('social', 800, 800)}
              disabled={downloading !== null}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900/80 hover:border-emerald-500/50 hover:bg-slate-900 transition-all flex items-center justify-between text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 group-hover:scale-105 transition-transform">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-orbitron font-bold text-white group-hover:text-emerald-300">
                    Profil Medsos (800 x 800)
                  </div>
                  <div className="text-[11px] text-slate-400 font-rajdhani">
                    Discord, Twitch, YouTube, Instagram & X
                  </div>
                </div>
              </div>
              <Download className="w-4 h-4 text-slate-500 group-hover:text-emerald-400" />
            </button>
          </div>
        </div>

        {/* Direct Link & Copy */}
        <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={copyPath}
            className="text-xs font-orbitron text-slate-400 hover:text-cyan-300 flex items-center gap-1.5 transition-colors"
          >
            {copiedLink ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            <span>{copiedLink ? 'URL ASET TERSALIN!' : 'SALIN URL GAMBAR ASLI'}</span>
          </button>

          <button
            onClick={() => {
              soundEngine.playUiClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-orbitron text-xs font-bold transition-all"
          >
            TUTUP
          </button>
        </div>
      </div>
    </div>
  );
};
