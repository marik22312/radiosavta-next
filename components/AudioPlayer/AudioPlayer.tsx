import React, { useRef, useEffect, useState } from "react";
import { useLivePlayer } from '../../hook/useLivePlayer';
import { PlayerState } from "../../providers/PlayerProvider/PlayerProviderV2";
import { usePlayerControls } from "../../providers/PlayerProvider/usePlayerControls";
import { usePlayerState } from "../../providers/PlayerProvider/usePlayerState";
import { Seeker } from "../Seeker/Seeker";

export const AduioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const animationRef = useRef<any>();
  const seekerRef = useRef<any>();
  const [currentTime, setCurrentTime] = useState(0);

  const { playerState, audioUrl, setPlayerState, isPlaying, isPaused } = usePlayerState();
  const {isLive} = useLivePlayer()

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("canplay", () => {
        setPlayerState(PlayerState.PLAYING);
      });

      audioRef.current.addEventListener("ended", () => {
        setPlayerState(PlayerState.STOPPED);
      });
    }
    return () => {
      audioRef.current?.removeEventListener("canplay", () => null);
      audioRef.current?.removeEventListener("ended", () => null);
    };
  }, [setPlayerState]);

  useEffect(() => {
    const whilePlaying = () => {
      animationRef.current = requestAnimationFrame(whilePlaying);
      if (seekerRef.current) {
        (seekerRef.current as any).value = audioRef.current?.currentTime;
        setCurrentTime(audioRef.current?.currentTime ?? 0);
      }
    };

    const onPlay = () => {
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
          console.log("LoDINH");
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
  }, [playerState, audioUrl]);

  const handlePlayerChange = (value: number) => {
    audioRef.current!.currentTime = value;
  };

  return (
    <>
	{((isPlaying || isPaused) && !isLive) ? <Seeker
		ref={seekerRef}
        currentTime={currentTime}
        durationTime={audioRef.current?.duration ?? 0}
        handlePlayerChange={handlePlayerChange}
      />: null}
      
      <audio ref={audioRef} src={audioUrl}></audio>
    </>
  );
};
