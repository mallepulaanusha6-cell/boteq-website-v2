import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';

// YouTube Player Type Definitions
declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: {
          videoId: string;
          playerVars?: Record<string, unknown>;
          events?: {
            onReady?: (event: { target: YTPlayerInstance }) => void;
            onStateChange?: (event: { data: number; target: YTPlayerInstance }) => void;
            onError?: (event: { data: number }) => void;
          };
        }
      ) => YTPlayerInstance;
      PlayerState: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
    };
  }
}

export interface YTPlayerInstance {
  playVideo: () => void;
  pauseVideo: () => void;
  mute: () => void;
  unMute: () => void;
  isMuted: () => boolean;
  setVolume: (volume: number) => void;
  getVolume: () => number;
  getPlayerState: () => number;
  getCurrentTime: () => number;
  getDuration: () => number;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
}

interface MusicPlayerProps {
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  onStateChange?: (playing: boolean) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  isPlaying: externalIsPlaying,
  onTogglePlay: externalTogglePlay,
  onStateChange,
}) => {
  const YOUTUBE_VIDEO_ID = 'z5y8Clp_TdE';
  const YOUTUBE_SONG_URL = 'https://youtu.be/z5y8Clp_TdE';

  const [internalIsPlaying, setInternalIsPlaying] = useState<boolean>(false);
  const isPlaying = externalIsPlaying !== undefined ? externalIsPlaying : internalIsPlaying;

  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(240);
  const [autoplayBlocked, setAutoplayBlocked] = useState<boolean>(false);
  const [isPlayerReady, setIsPlayerReady] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);

  const playerRef = useRef<YTPlayerInstance | null>(null);
  const timerRef = useRef<number | null>(null);
  const userManuallyPausedRef = useRef<boolean>(false);

  // Initialize YouTube IFrame API
  useEffect(() => {
    if (!window.YT) {
      const existingScript = document.querySelector('script[src*="youtube.com/iframe_api"]');
      if (!existingScript) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
      }
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      const container = document.getElementById('boteq-yt-player');
      if (!container) return;

      try {
        playerRef.current = new window.YT.Player('boteq-yt-player', {
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 1,
            loop: 1,
            playlist: YOUTUBE_VIDEO_ID,
            controls: 0,
            enablejsapi: 1,
            origin: window.location.origin,
            playsinline: 1,
            modestbranding: 1,
            rel: 0,
            iv_load_policy: 3,
            fs: 0,
          },
          events: {
            onReady: (event) => {
              setIsPlayerReady(true);
              const player = event.target;
              try {
                player.setVolume(75);
              } catch {
                // Ignore volume error
              }

              // Attempt autoplay as permitted by browser
              try {
                player.playVideo();
                setTimeout(() => {
                  try {
                    const state = player.getPlayerState();
                    if (state === 1) {
                      setInternalIsPlaying(true);
                      onStateChange?.(true);
                      setAutoplayBlocked(false);
                    } else {
                      setAutoplayBlocked(true);
                    }
                  } catch {
                    setAutoplayBlocked(true);
                  }
                }, 1000);
              } catch {
                setAutoplayBlocked(true);
              }
            },
            onStateChange: (event) => {
              if (event.data === 1) {
                setInternalIsPlaying(true);
                onStateChange?.(true);
                setAutoplayBlocked(false);
              } else if (event.data === 2) {
                setInternalIsPlaying(false);
                onStateChange?.(false);
              } else if (event.data === 0) {
                event.target.playVideo();
              }
            },
            onError: () => {
              setAutoplayBlocked(false);
            },
          },
        });
      } catch {
        // Fallback gracefully
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch {
          // Cleanup
        }
      }
    };
  }, []);

  // Sync external isPlaying prop if provided
  useEffect(() => {
    if (externalIsPlaying !== undefined && isPlayerReady && playerRef.current) {
      if (externalIsPlaying) {
        playerRef.current.playVideo();
      } else {
        playerRef.current.pauseVideo();
      }
    }
  }, [externalIsPlaying, isPlayerReady]);

  // Fallback: If autoplay was blocked, let first user gesture trigger playback if not manually muted
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!userManuallyPausedRef.current && !isPlaying && playerRef.current && isPlayerReady) {
        try {
          playerRef.current.playVideo();
          setAutoplayBlocked(false);
          setHasInteracted(true);
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [isPlaying, isPlayerReady]);

  // Track playback time
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        if (playerRef.current) {
          try {
            const cur = playerRef.current.getCurrentTime();
            const dur = playerRef.current.getDuration();
            if (cur) setCurrentTime(Math.floor(cur));
            if (dur && dur > 0) setDuration(Math.floor(dur));
          } catch {
            // Ignore
          }
        }
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying]);

  // Toggle Play / Pause
  const handleTogglePlay = () => {
    setHasInteracted(true);
    setAutoplayBlocked(false);

    if (isPlaying) {
      userManuallyPausedRef.current = true;
    } else {
      userManuallyPausedRef.current = false;
    }

    if (externalTogglePlay) {
      externalTogglePlay();
    } else {
      if (!playerRef.current) return;
      if (isPlaying) {
        playerRef.current.pauseVideo();
        setInternalIsPlaying(false);
        onStateChange?.(false);
      } else {
        playerRef.current.playVideo();
        setInternalIsPlaying(true);
        onStateChange?.(true);
      }
    }
  };

  // Toggle Mute
  const handleToggleMute = () => {
    if (!playerRef.current) return;
    if (isMuted) {
      playerRef.current.unMute();
      setIsMuted(false);
    } else {
      playerRef.current.mute();
      setIsMuted(true);
    }
  };

  // Seek time
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || duration <= 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    const newSeconds = pct * duration;
    playerRef.current.seekTo(newSeconds, true);
    setCurrentTime(Math.floor(newSeconds));
  };

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <>
      {/* Official YouTube Embed Container */}
      <div
        className={
          showVideoModal
            ? 'fixed bottom-20 left-3 sm:left-4 z-50 w-72 sm:w-80 h-44 sm:h-48 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(185,106,115,0.45)] border border-[#B96A73]/40 bg-[#0D0A10] transition-all duration-300'
            : 'fixed -left-[9999px] -top-[9999px] w-80 h-48 pointer-events-none opacity-0'
        }
      >
        <div id="boteq-yt-player" className="w-full h-full" />
        {showVideoModal && (
          <div className="absolute top-2 right-2 flex items-center gap-1.5 z-10">
            <a
              href={YOUTUBE_SONG_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-full bg-black/80 text-white/80 hover:text-[#EBB8C0] transition-colors"
              title="Open in YouTube"
              aria-label="Open in YouTube"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={() => setShowVideoModal(false)}
              className="p-1.5 rounded-full bg-black/80 text-white/80 hover:text-[#EBB8C0] transition-colors cursor-pointer"
              aria-label="Hide video preview"
              title="Hide video preview"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* 1-Click Autoplay Blocked Banner */}
      {autoplayBlocked && !hasInteracted && !isPlaying && (
        <div className="fixed bottom-20 left-3 sm:left-4 z-40 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            onClick={handleTogglePlay}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] text-white font-semibold text-xs shadow-[0_0_25px_rgba(185,106,115,0.6)] hover:shadow-[0_0_35px_rgba(235,184,192,0.8)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border border-white/30"
          >
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center animate-pulse">
              <Play className="w-3 h-3 fill-white ml-0.5" />
            </div>
            <span>Turn Background Music ON</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </button>
        </div>
      )}

      {/* Floating Futuristic Music Player Bar in Wine & Rose Palette */}
      <div className="fixed bottom-3 left-3 sm:bottom-4 sm:left-4 z-40 select-none">
        <div className="flex items-center gap-2.5 sm:gap-3 bg-[#140D18]/95 backdrop-blur-xl text-white px-3 sm:px-3.5 py-2 sm:py-2.5 rounded-full shadow-[0_0_30px_rgba(10,5,12,0.85)] border border-[#B96A73]/40 transition-all duration-300 hover:border-[#EBB8C0] hover:shadow-[0_0_25px_rgba(185,106,115,0.35)]">
          {/* Spinning Disc / Track Art */}
          <div
            className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#EBB8C0]/70 shadow-inner shrink-0 group cursor-pointer"
            onClick={handleTogglePlay}
            title={isPlaying ? "Pause Background Music" : "Play Background Music"}
          >
            <img
              src="/src/assets/images/product_futuristic_saree_1791909500548.jpg"
              alt="BOTEQ Official Music"
              className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_8s_linear_infinite]' : ''}`}
            />
            <div className="absolute inset-0 bg-[#0D0A10]/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-white ml-0.5" />}
            </div>
            <div className="absolute center w-2.5 h-2.5 bg-[#EBB8C0] rounded-full border border-[#0D0A10] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_8px_#EBB8C0]" />
          </div>

          {/* Track Details & Visualizer Bars */}
          <div className="flex flex-col pr-1 min-w-[90px] sm:min-w-[130px]">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-sans font-bold text-white tracking-wide truncate max-w-[100px] sm:max-w-[130px]">
                BOTEQ Sound
              </span>
              {/* Equalizer animation when playing */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-[#EBB8C0] h-2 animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-[#B96A73] h-3 animate-[pulse_0.4s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-[#EBB8C0] h-1.5 animate-[pulse_0.8s_ease-in-out_infinite]" />
                </div>
              )}
            </div>
            <span className="text-[9.5px] sm:text-[10px] text-[#EBB8C0] tracking-wider uppercase font-mono truncate">
              {isPlaying ? 'Now Playing' : 'Music Paused'}
            </span>
          </div>

          {/* Primary Play / Pause Action Button */}
          <button
            onClick={handleTogglePlay}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 active:scale-95 shadow-sm cursor-pointer ${
              isPlaying
                ? 'bg-[#EBB8C0] text-[#0D0A10] shadow-[0_0_12px_#EBB8C0]'
                : 'bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] text-white hover:shadow-[0_0_15px_#B96A73]'
            }`}
            title={isPlaying ? "Pause Background Music" : "Play Background Music"}
            aria-label={isPlaying ? "Pause Music" : "Play Music"}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 fill-[#0D0A10]" />
            ) : (
              <Play className="w-3.5 h-3.5 fill-white ml-0.5" />
            )}
          </button>

          {/* Visible Music ON/OFF Toggle Pill Button */}
          <button
            onClick={handleTogglePlay}
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border transition-all duration-300 cursor-pointer ${
              isPlaying
                ? 'bg-[#731E1B]/30 text-[#EBB8C0] border-[#B96A73]/60 shadow-[0_0_10px_rgba(235,184,192,0.3)]'
                : 'bg-[#18101E] text-[#9E9CA8] border-white/10 hover:border-[#B96A73]/40 hover:text-white'
            }`}
            title={isPlaying ? "Turn Music OFF" : "Turn Music ON"}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-[#EBB8C0] animate-pulse' : 'bg-[#5D5C68]'}`} />
            <span>{isPlaying ? 'Music ON' : 'Music OFF'}</span>
          </button>

          {/* Scrubber Bar and Timestamps (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 pl-1 pr-1 font-mono">
            <div
              className="w-20 xl:w-24 h-1 bg-white/20 rounded-full overflow-hidden relative cursor-pointer"
              onClick={handleSeek}
              title="Seek audio position"
            >
              <div
                className="h-full bg-gradient-to-r from-[#731E1B] via-[#B96A73] to-[#EBB8C0] transition-all duration-300"
                style={{ width: `${Math.min(100, (currentTime / (duration || 240)) * 100)}%` }}
              />
            </div>
            <span className="text-[10px] tabular-nums text-[#9E9CA8] whitespace-nowrap">
              {formatTime(currentTime)}
            </span>
          </div>

          {/* Mute button */}
          <button
            onClick={handleToggleMute}
            className="p-1 text-[#9E9CA8] hover:text-[#EBB8C0] transition-colors cursor-pointer"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label="Toggle Mute"
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-red-400" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>

          {/* Video Preview Toggle button */}
          <button
            onClick={() => setShowVideoModal(!showVideoModal)}
            className="p-1 text-[#9E9CA8] hover:text-[#EBB8C0] transition-colors hidden sm:block cursor-pointer"
            title={showVideoModal ? "Hide Video" : "View Official YouTube Video"}
            aria-label="Toggle Video Embed"
          >
            {showVideoModal ? <ChevronDown className="w-3.5 h-3.5 text-[#EBB8C0]" /> : <ChevronUp className="w-3.5 h-3.5 text-[#EBB8C0]" />}
          </button>
        </div>
      </div>
    </>
  );
};
