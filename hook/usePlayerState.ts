import { PlayerState, usePlayerContext } from "../providers/PlayerProvider";

export const usePLayerState = () => {
  const { title, playerState } = usePlayerContext();

  return {
    title,
    isPlaying: playerState === PlayerState.PLAYING,
  };
};
