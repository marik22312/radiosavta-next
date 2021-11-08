import { useEffect, useState } from "react";
import { LIVE_STREAM_URL } from "../config/stream";
import { usePlayerContext } from "../providers/PlayerProvider";
import { useCurrentSongTitle } from "./useCurrentSongTitle";
import { usePlayerControls } from "./usePlayerControls";

export const useLivePlayer = () => {
  const { setTitle, audioRef } = usePlayerContext();
  const { play, stop } = usePlayerControls();
  const [isLive, setIsLive] = useState(audioRef?.src === LIVE_STREAM_URL);

  const { songTitle, refetch } = useCurrentSongTitle({
    enabled: isLive,
    refetchInterval: 10000,
  });
  
  useEffect(() => {
		setIsLive(audioRef?.src === LIVE_STREAM_URL)
  },[audioRef, audioRef?.src])
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
