import { PlayerState, usePlayerContext } from "../providers/PlayerProvider";
import { Track } from "../domain/Player";

export const usePlayerControls = () => {
  const { audioRef, setTitle, setPlayerState, setProgramTitle } = usePlayerContext();

  audioRef?.addEventListener("canplay",() => {
    setPlayerState(PlayerState.PLAYING)
  });

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

  return {
    play,
    pause,
    stop,
	  resume
  };
};
