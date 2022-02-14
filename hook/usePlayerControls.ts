import { useEffect } from "react";
import { PlayerState, usePlayerContext } from "../providers/PlayerProvider";
import { Track } from "../domain/Player";

export const usePlayerControls = () => {
  const {
    audioRef,
    setTitle,
    setPlayerState,
    setProgramTitle,
    animationRef,
    seekerRef,
    setCurrentTime,
    currentTime,
  } = usePlayerContext();

  useEffect(() => {
    audioRef?.addEventListener("canplay", () => {
        setPlayerState(PlayerState.PLAYING);
    });

    audioRef?.addEventListener("ended", () => {
      setPlayerState(PlayerState.PAUSED);
    });
    return () => {
      audioRef?.removeEventListener("canplay", () => null);
      audioRef?.removeEventListener("ended", () => null);
    };
  }, [audioRef, setPlayerState]);

  const whilePlaying = () => {
    animationRef.current = requestAnimationFrame(whilePlaying);
    if (seekerRef.current) {
      (seekerRef.current as any).value = audioRef.currentTime;
      setCurrentTime(audioRef.currentTime);
    }
  };

  const play = (track: Track) => {
    setPlayerState(PlayerState.LOADING);
    audioRef.src = track.url;
    setTitle(track.title);
    setProgramTitle(track.programTitle);
    audioRef.play();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const pause = () => {
    setPlayerState(PlayerState.PAUSED);
    audioRef.pause();
    cancelAnimationFrame(animationRef.current as any);
  };
  const resume = () => {
    animationRef.current = requestAnimationFrame(whilePlaying);
    setPlayerState(PlayerState.PLAYING);
    audioRef.play();
  };

  const stop = () => {
    setPlayerState(PlayerState.STOPPED);
    audioRef.pause();
    audioRef.src = "";
    cancelAnimationFrame(animationRef.current as any);
  };

  const handlePlayerTimeChange = () => {
    const durationTime = audioRef.duration;
    const currentTime = audioRef.currentTime;
    return { currentTime, durationTime };
  };

  const handlePlayerChange = (value: number) => {
    audioRef.currentTime = value;
  };

  return {
    play,
    pause,
    stop,
    resume,
    handlePlayerTimeChange,
    handlePlayerChange,
    seekerRef,
    durationTime: audioRef?.duration,
    currentTime: currentTime,
  };
};

const padZero = (v: any) => (v < 10 ? "0" + v : v);

const secondsToTime = (t: any) => {
  return (
    // @ts-expect-error
    padZero(parseInt((t / (60 * 60)) % 24)) +
    ":" +
    // @ts-expect-error
    padZero(parseInt((t / 60) % 60)) +
    ":" +
    // @ts-expect-error
    padZero(parseInt(t % 60))
  );
};
