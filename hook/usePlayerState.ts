import { useEffect, useState } from "react";
import { PlayerState, usePlayerContext } from "../providers/PlayerProvider";


export const usePLayerState = () => {
  const { title, playerState, programTitle, trackId } = usePlayerContext();

  return {
    title,
	  programTitle,
	  trackId,
    isPlaying: playerState === PlayerState.PLAYING,
	  isStopped: playerState === PlayerState.STOPPED,
	  isPaused: playerState === PlayerState.PAUSED,
    isLoading: playerState === PlayerState.LOADING,
  };
};
