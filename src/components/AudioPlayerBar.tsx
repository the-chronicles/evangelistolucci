'use client';

import React from 'react';
import { useAudioPlayer } from './AudioPlayerContext';
import { Play, Pause, Volume2, VolumeX, X } from 'lucide-react';

function formatTime(seconds: number) {
  if (isNaN(seconds)) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function AudioPlayerBar() {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    togglePlay,
    seek,
    setVolume,
    closePlayer,
  } = useAudioPlayer();

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#12100f]/95 backdrop-blur-xl border-t border-white/[0.08] shadow-2xl px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-6">
        {/* Track Metadata */}
        <div className="flex items-center gap-3 w-1/3 min-w-0">
          <div className="w-10 h-10 bg-black shrink-0 overflow-hidden relative">
            {currentTrack.coverArt ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={currentTrack.coverArt}
                alt={currentTrack.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#c8a97e] text-xs font-mono">
                ♪
              </div>
            )}
          </div>
          <div className="truncate">
            <h4 className="text-xs font-medium text-[#f7f4ee] truncate">
              {currentTrack.title}
            </h4>
            <p className="text-[11px] text-[#c8a97e] truncate font-sans">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-1 w-full max-w-md">
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-full bg-[#c8a97e] text-[#0f0e0d] flex items-center justify-center hover:bg-[#dec49d] transition-all"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
          </button>

          {/* Time & Scrubber */}
          <div className="w-full flex items-center gap-2 text-[10px] text-[#9e978e] font-mono">
            <span>{formatTime(currentTime)}</span>
            <div
              className="relative flex-1 h-1 bg-white/10 cursor-pointer group"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = (e.clientX - rect.left) / rect.width;
                seek(pos * duration);
              }}
            >
              <div
                className="absolute top-0 left-0 h-full bg-[#c8a97e]"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume & Close */}
        <div className="hidden sm:flex items-center justify-end gap-3 w-1/3">
          <button
            onClick={() => setVolume(volume > 0 ? 0 : 0.85)}
            className="text-[#9e978e] hover:text-[#f7f4ee] transition-colors"
          >
            {volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 accent-[#c8a97e] h-0.5 bg-white/20 cursor-pointer"
          />
          <button
            onClick={closePlayer}
            className="p-1 text-[#9e978e] hover:text-red-400 transition-colors ml-2"
            title="Dismiss Audio Player"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
