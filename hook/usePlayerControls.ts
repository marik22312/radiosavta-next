import { PlayerState, usePlayerContext } from "../providers/PlayerProvider";
import { Track } from "../domain/Player";

export const usePlayerControls = () => {
  const { audioRef, setTitle, setPlayerState } = usePlayerContext();

  const play = (track: Track) => {
	  console.log('Play!', track)
    setPlayerState(PlayerState.PLAYING);
    audioRef.src = track.url;
    setTitle(track.title);
    audioRef.play();
  };

  const pause = () => {
    setPlayerState(PlayerState.STOPPED);
    audioRef.pause();
  };

  const stop = () => {
    setPlayerState(PlayerState.STOPPED);
    audioRef.pause();
    audioRef.src = "";
  };

  return {
    play,
    pause,
    stop,
  };
};
