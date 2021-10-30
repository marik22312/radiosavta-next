import { useEffect, useState } from "react";
import { LIVE_STREAM_URL } from "../config/stream";
import { PlayerState, usePlayerContext } from "../providers/PlayerProvider";
import { useCurrentSongTitle } from "./useCurrentSongTitle";
import { usePlayerControls } from "./usePlayerControls";
import { usePLayerState } from "./usePlayerState";

export const useLivePlayer = () => {
  const { setTitle, audioRef } = usePlayerContext();
  const { play, stop } = usePlayerControls();
  const [isLive, setIsLive] = useState(audioRef?.currentSrc === LIVE_STREAM_URL);

  const { songTitle, refetch } = useCurrentSongTitle({
    enabled: isLive,
    refetchInterval: 10000,
  });
  
  useEffect(() => {
	setIsLive(audioRef?.currentSrc === LIVE_STREAM_URL)
  },[audioRef.currentSrc])
  useEffect(() => {
	  if (songTitle) {
		  setTitle(songTitle);
	  }
  }, [songTitle, setTitle]);

  const toggleLive = () => {
	  if (!isLive) {
      refetch();
      play({
        url: LIVE_STREAM_URL,
        title: songTitle || "",
		programTitle: 'שידור חי'
      });
      setIsLive(true);
      return;
    }

    stop();
    setIsLive(false);
  };

  return {
    isLive,
    toggleLive,
  };
};
