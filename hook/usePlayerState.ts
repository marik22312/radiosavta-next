import { useEffect, useState } from "react";
import { PlayerState, usePlayerContext } from "../providers/PlayerProvider";

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
export const usePLayerState = () => {
  const { title, playerState, programTitle } = usePlayerContext();

  return {
    title,
	  programTitle,
    isPlaying: playerState === PlayerState.PLAYING,
	  isStopped: playerState === PlayerState.STOPPED,
	  isPaused: playerState === PlayerState.PAUSED,
    isLoading: playerState === PlayerState.LOADING,
  };
};
