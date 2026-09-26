import { RefObject, useEffect, useRef, useState } from "react";
import { PlayerState } from "../../../providers/PlayerProvider/PlayerProviderV2";
import { usePlayerState } from "../../../providers/PlayerProvider/usePlayerState";
import { usePlayerControls } from "../../../providers/PlayerProvider/usePlayerControls";

export const usePlayerBindings = (audioRef: RefObject<HTMLAudioElement>) => {
  const seekerRef = useRef<any>();
  const [currentTime, setCurrentTime] = useState(0);

  const { playerState, audioUrl, setPlayerState, isPlaying, isPaused } =
    usePlayerState();
  const { stop } = usePlayerControls();
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const onCanPlay = () => setPlayerState(PlayerState.PLAYING);
    const onEnded = () => setPlayerState(PlayerState.STOPPED);
    const onLoadStart = () => setPlayerState(PlayerState.LOADING);
    const onError = () => setPlayerState(PlayerState.STOPPED);

    audio.addEventListener("canplay", onCanPlay);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("loadstart", onLoadStart);
    audio.addEventListener("error", onError);

    return () => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("loadstart", onLoadStart);
      audio.removeEventListener("error", onError);
    };
  }, [audioRef, setPlayerState]);

  useEffect(() => {
    let animationFrame: number | undefined;
    let cancelled = false;

    const whilePlaying = () => {
      animationFrame = requestAnimationFrame(whilePlaying);
      if (seekerRef.current) {
        (seekerRef.current as any).value = audioRef.current?.currentTime;
        setCurrentTime(audioRef.current?.currentTime ?? 0);
      }
    };

    const onPlay = () => {
      audioRef.current?.play()?.then(() => {
        console.log("playing");
        if (!cancelled) {
          animationFrame = requestAnimationFrame(whilePlaying);
        }
      }).catch((err) => {
        if(err.name === 'AbortError') {
          console.log('audio play aborted');
        }
        // Autoplay was blocked because there was no user gesture yet (e.g.
        // a ?playing=true deep link). Reset so the next tap starts playback.
        if (err.name === 'NotAllowedError') {
          console.log('audio autoplay blocked');
          stop();
        }
      });
    };
    const onPause = () => {
      audioRef.current?.pause();
    };

    if (audioRef.current && audioUrl) {
      switch (playerState) {
        case PlayerState.LOADING:
          break;

        case PlayerState.PLAYING:
          onPlay();
          break;

        case PlayerState.PAUSED:
          onPause();
          break;

        default:
          break;
      }
    }

    return () => {
      cancelled = true;
      if (animationFrame !== undefined) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [playerState, audioUrl, audioRef]);

  const onSeek = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
  };

  const onVolumeChange = (value: number | number[]) => {
    if (audioRef.current) {
      if (Array.isArray(value)) {
        value = value[0];
      }
      audioRef.current.volume = value;
    }
  };

  return { currentTime, seekerRef, onSeek, onVolumeChange, volume: audioRef.current?.volume ?? 1 };
};
