import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2 } from "lucide-react";

const formatTime = (s) => {
  if (!isFinite(s) || isNaN(s)) return "0:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
};

const AudioPlayer = ({ src, accentColor = "#C9A86C" }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);      // 0–1
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [hasFile, setHasFile] = useState(true);
  const progressBarRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
      setProgress(audio.duration ? audio.currentTime / audio.duration : 0);
    };
    const onLoadedMetadata = () => setDuration(audio.duration);
    const onEnded = () => { setIsPlaying(false); setProgress(0); setCurrentTime(0); };
    const onError = (e) => {
      console.warn("[AudioPlayer] Fehler beim Laden der Audio-Datei:", src, e);
      setHasFile(false);
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("error", onError);
    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("error", onError);
    };
  }, [src]);

  // Reset when src changes
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    setHasFile(true);
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch(() => setHasFile(false));
      setIsPlaying(true);
    }
  };

  const handleProgressClick = (e) => {
    const bar = progressBarRef.current;
    if (!bar || !audioRef.current) return;
    const rect = bar.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    const clamped = Math.max(0, Math.min(1, ratio));
    audioRef.current.currentTime = clamped * audioRef.current.duration;
  };

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    if (audioRef.current) audioRef.current.volume = v;
  };

  return (
    <div style={{
      width: "100%",
      maxWidth: 420,
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(201,168,108,0.18)",
      borderRadius: 16,
      padding: "20px 24px",
      backdropFilter: "blur(8px)",
    }}>
      <audio ref={audioRef} src={src} preload="metadata" />

      {/* Play/Pause + Time */}
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 14 }}>
        {/* Big play button with pulse */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          {isPlaying && (
            <div style={{
              position: "absolute", inset: -6, borderRadius: "50%",
              border: `1px solid ${accentColor}40`,
              animation: "pingRing 2s ease-out infinite",
            }} />
          )}
          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={togglePlay}
            style={{
              width: 52, height: 52, borderRadius: "50%",
              background: accentColor,
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: isPlaying ? `0 0 24px ${accentColor}55` : "none",
              transition: "box-shadow 0.4s",
              position: "relative",
            }}
          >
            {isPlaying
              ? <Pause size={20} style={{ color: "#0A0907", fill: "#0A0907" }} />
              : <Play  size={20} style={{ marginLeft: 2, color: "#0A0907", fill: "#0A0907" }} />
            }
          </motion.button>
        </div>

        {/* Times */}
        <div style={{ flex: 1 }}>
          <div
            ref={progressBarRef}
            onClick={handleProgressClick}
            style={{
              height: 4, background: "rgba(240,234,224,0.1)",
              borderRadius: 99, cursor: "pointer", marginBottom: 8, position: "relative",
            }}
          >
            <div style={{
              height: "100%", background: accentColor, borderRadius: 99,
              width: `${progress * 100}%`, transition: "width 0.15s linear",
            }} />
            {/* Thumb */}
            <div style={{
              position: "absolute", top: "50%", left: `${progress * 100}%`,
              transform: "translate(-50%, -50%)",
              width: 12, height: 12, borderRadius: "50%", background: accentColor,
              boxShadow: `0 0 6px ${accentColor}80`,
            }} />
          </div>
          <div style={{
            display: "flex", justifyContent: "space-between",
            color: "rgba(240,234,224,0.35)", fontSize: 11,
            fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.05em",
          }}>
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Volume */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <Volume2 size={13} style={{ color: "rgba(240,234,224,0.3)", flexShrink: 0 }} />
        <input
          type="range" min={0} max={1} step={0.02} value={volume}
          onChange={handleVolumeChange}
          style={{
            flex: 1, height: 3, cursor: "pointer", accentColor,
            background: `linear-gradient(to right, ${accentColor} 0%, ${accentColor} ${volume * 100}%, rgba(240,234,224,0.1) ${volume * 100}%, rgba(240,234,224,0.1) 100%)`,
            borderRadius: 99, outline: "none", border: "none", appearance: "none",
          }}
        />
      </div>

      {/* No file notice */}
      {!hasFile && (
        <p style={{
          marginTop: 12, color: "rgba(240,234,224,0.3)", fontSize: 11,
          fontFamily: "'DM Sans', sans-serif", textAlign: "center",
        }}>
          Audio wird geladen sobald die Datei hinterlegt ist.
        </p>
      )}

      <style>{`
        input[type=range]::-webkit-slider-thumb { appearance: none; width: 12px; height: 12px; border-radius: 50%; background: ${accentColor}; cursor: pointer; }
        @keyframes pingRing { 0% { transform: scale(0.85); opacity: 0.7; } 100% { transform: scale(1.5); opacity: 0; } }
      `}</style>
    </div>
  );
};

export default AudioPlayer;
