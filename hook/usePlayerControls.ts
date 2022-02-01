import {useEffect} from 'react';
import { PlayerState, usePlayerContext } from "../providers/PlayerProvider";
import { Track } from "../domain/Player";

export const usePlayerControls = () => {
  const { audioRef, setTitle, setPlayerState, setProgramTitle } = usePlayerContext();

  useEffect(() => {
		  audioRef?.addEventListener("canplay",() => {
			  setPlayerState(PlayerState.PLAYING)
			});
	  return () => {
			  audioRef?.removeEventListener('canplay', () => null)
	  }
  }, [audioRef, setPlayerState])

  const play = (track: Track) => {
    setPlayerState(PlayerState.LOADING);
    audioRef.src = track.url;
    setTitle(track.title);
    setProgramTitle(track.programTitle)
    audioRef.play();
  };

  const pause = () => {
    setPlayerState(PlayerState.PAUSED);
    audioRef.pause();
  };
  const resume = () => {
    setPlayerState(PlayerState.PLAYING);
    audioRef.play();
  };

  const stop = () => {
    setPlayerState(PlayerState.STOPPED);
    audioRef.pause();
    audioRef.src = "";
  };

  const handlePlayerTimeChange = () => {
    const durationTime = audioRef.duration;
    const time = audioRef.currentTime;
    return { time, durationTime };
  }

  const handlePlayerChange = (value: number) => {
    audioRef.currentTime = value;
    handlePlayerTimeChange();
  }

  return {
    play,
    pause,
    stop,
	  resume,
    handlePlayerTimeChange,
    handlePlayerChange,
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