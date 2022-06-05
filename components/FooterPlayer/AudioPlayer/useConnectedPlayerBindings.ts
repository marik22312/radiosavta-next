import { RefObject } from "react";
import { PlayerState } from '../../../providers/PlayerProvider/PlayerProviderV2';
import { usePlayerState } from '../../../providers/PlayerProvider/usePlayerState';
import { usePlayerBindings } from "./usePlayerBinding";

export const useConectedPlayerBindings = (
  audioRef: RefObject<HTMLAudioElement>
) => {

	const { playerState, audioUrl, setPlayerState, isPlaying, isPaused } =
    usePlayerState();
  const onCanPlay = () => {
	  setPlayerState(PlayerState.PLAYING);
  };
  const onEnded = () => {
	  setPlayerState(PlayerState.STOPPED);
  };
  const onLoadStart = () => {
	  setPlayerState(PlayerState.LOADING);
  };
  const onError = () => {
	  setPlayerState(PlayerState.STOPPED);
  };

  const {currentTime, seekerRef, onSeek} = usePlayerBindings(audioRef, playerState, audioUrl, {
    onCanPlay,
    onEnded,
    onLoadStart,
    onError,
  });

  return {
	  currentTime, seekerRef, onSeek
  }
};
