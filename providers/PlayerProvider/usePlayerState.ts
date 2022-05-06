import { PlayerState } from "./PlayerProviderV2";
import { useAudio } from "./useAudio";

export const usePlayerState = () => {
  const { playerState, audioUrl, setPlayerState, songTitle, artist, imageUrl, metaData } =
    useAudio();

  return {
    isPlaying: playerState === PlayerState.PLAYING,
    isStopped: playerState === PlayerState.STOPPED,
    isPaused: playerState === PlayerState.PAUSED,
    isLoading: playerState === PlayerState.LOADING,
    audioUrl,
    playerState,
    setPlayerState,
    songTitle,
    artist,
    imageUrl,
	metaData
  };
};
