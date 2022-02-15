import { useEffect, useState } from "react";
import { PlayerState, usePlayerContext } from "../providers/PlayerProvider";


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
