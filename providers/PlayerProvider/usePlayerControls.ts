import { TrackV2 } from "../../domain/Player";
import { PlayerState } from "./PlayerProviderV2";
import { useAudio } from "./useAudio";

export const usePlayerControls = () => {
  const { setAudioUrl, setArtist, setImageUrl, setPlayerState, setSongTitle, setMetaData } =
    useAudio();

  const playTrack = (track: TrackV2) => {
    setPlayerState(PlayerState.PLAYING);
    setAudioUrl(track.audioUrl);
    setArtist(track.artist);
    setImageUrl(track.imageUrl);
    setSongTitle(track.title);
	setMetaData(track.metaData);
  };

  const pause = () => {
    setPlayerState(PlayerState.PAUSED);
  };
  const resume = () => {
    setPlayerState(PlayerState.PLAYING);
  };

  const stop = () => {
    setPlayerState(PlayerState.STOPPED);
    setAudioUrl("");
  };

  return {
    playTrack,
    pause,
    resume,
    stop,
  };
};
