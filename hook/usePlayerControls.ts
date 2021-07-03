import { PlayerState, usePlayerContext } from "../providers/PlayerProvider";
import { Track } from "../domain/Player";

export const usePlayerControls = () => {
  const { audioRef, setTitle, setPlayerState, setProgramTitle } = usePlayerContext();

  const play = (track: Track) => {
    setPlayerState(PlayerState.PLAYING);
    audioRef.src = track.url;
    setTitle(track.title);
	setProgramTitle(track.programTitle)
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
