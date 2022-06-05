import { RefObject, useEffect, useRef, useState } from "react";
import { PlayerState } from "../../../providers/PlayerProvider/PlayerProviderV2";
import { usePlayerState } from '../../../providers/PlayerProvider/usePlayerState';


export const usePlayerBindings = (audioRef: RefObject<HTMLAudioElement>) => {
  const animationRef = useRef<any>();
  const seekerRef = useRef<any>();
  const [currentTime, setCurrentTime] = useState(0);

  const { playerState, audioUrl, setPlayerState, isPlaying, isPaused } =
    usePlayerState();
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("canplay", () => {
        setPlayerState(PlayerState.PLAYING);
      });

      audioRef.current.addEventListener("ended", () => {
		setPlayerState(PlayerState.STOPPED);
      });

	  audioRef.current.addEventListener("loadstart", () => {
		setPlayerState(PlayerState.LOADING);
	  
	  })
	  audioRef.current.addEventListener("error", () => {
		setPlayerState(PlayerState.STOPPED);
	  })
    }
    return () => {
      audioRef.current?.removeEventListener("canplay", () => null);
      audioRef.current?.removeEventListener("ended", () => null);
      audioRef.current?.removeEventListener("loadstart", () => null);
      audioRef.current?.removeEventListener("error", () => null);
    };
  }, [audioRef, setPlayerState]);

  useEffect(() => {
    const whilePlaying = () => {
      animationRef.current = requestAnimationFrame(whilePlaying);
      if (seekerRef.current) {
        (seekerRef.current as any).value = audioRef.current?.currentTime;
        setCurrentTime(audioRef.current?.currentTime ?? 0);
      }
    };

    const onPlay = () => {
		console.log('onPlay')
      audioRef.current?.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    };
    const onPause = () => {
      audioRef.current?.pause();
      cancelAnimationFrame(animationRef.current as any);
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
  }, [playerState, audioUrl, audioRef]);

  const onSeek = (value: number) => {
	  if (audioRef.current) {
		  audioRef.current.currentTime = value;
	  }
  };

  return { currentTime, seekerRef, onSeek };
};
