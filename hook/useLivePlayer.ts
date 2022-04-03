import { useEffect, useState } from "react";
import { logPlayLive } from '../api/Mixpanel.api';
import { LIVE_STREAM_URL } from "../config/stream";
import { usePlayerContext } from "../providers/PlayerProvider";
import { useCurrentSongTitle } from "./useCurrentSongTitle";
import { usePlayerControls } from "./usePlayerControls";

export const useLivePlayer = () => {
  const { setTitle, audioRef } = usePlayerContext();
  const { play, stop } = usePlayerControls();
  const [isLive, setIsLive] = useState(audioRef?.src === LIVE_STREAM_URL);

  const { songTitle, refetch, streamer } = useCurrentSongTitle({
    enabled: isLive,
    refetchInterval: 10000,
	onSuccess: (data) => setTitle(data.streamTitle),
  });
  
  useEffect(() => {
		setIsLive(audioRef?.src === LIVE_STREAM_URL)
  },[audioRef, audioRef?.src])

  const toggleLive = async () => {
	  if (!isLive) {
      const data = await refetch();
	  const streamer = data.data?.streamer || 'NA';
	  logPlayLive({streamerName: streamer})
      play({
        url: LIVE_STREAM_URL,
        title: songTitle || "",
		programTitle: 'שידור חי',
		trackId: 'LIVE'
      });
      setIsLive(true);
      return;
    }

    stop();
    setIsLive(false);
  };

  return {
    isLive,
	streamer,
    toggleLive,
  };
};
