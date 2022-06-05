import { RefObject, useEffect, useRef, useState } from "react";
import { PlayerState } from "../../../providers/PlayerProvider/PlayerProviderV2";

interface AudioControlCallbacks {
	onCanPlay?: () => void;
	onEnded?: () => void;
	onLoadStart?: () => void;
	onError?: () => void;
}
export const usePlayerBindings = (audioRef: RefObject<HTMLAudioElement>, playerState: PlayerState, audioUrl: string | undefined, callbacks?: AudioControlCallbacks) => {
  const animationRef = useRef<any>();
  const seekerRef = useRef<any>();
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("canplay", () => {
        callbacks?.onCanPlay?.();
      });

      audioRef.current.addEventListener("ended", () => {
		callbacks?.onEnded?.();
      });

	  audioRef.current.addEventListener("loadstart", () => {
		callbacks?.onLoadStart?.();
	  
	  })
	  audioRef.current.addEventListener("error", () => {
		callbacks?.onError?.();
	  })
    }
    return () => {
      audioRef.current?.removeEventListener("canplay", () => null);
      audioRef.current?.removeEventListener("ended", () => null);
      audioRef.current?.removeEventListener("loadstart", () => null);
      audioRef.current?.removeEventListener("error", () => null);
    };
  }, [audioRef, callbacks]);

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
