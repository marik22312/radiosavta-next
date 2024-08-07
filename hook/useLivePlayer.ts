import { useEffect, useState } from "react";
import { logFooterPlayerPause } from "../api/Mixpanel.api";
import { LIVE_STREAM_URL } from "../config/stream";
import { useCurrentSongTitle } from "./useCurrentSongTitle";
import { usePlayerControls } from "../providers/PlayerProvider/usePlayerControls";
import { usePlayerState } from "../providers/PlayerProvider/usePlayerState";
import { useAudio } from "../providers/PlayerProvider/useAudio";
import { DEFAULT_PLAYER_IMAGE } from "../config/images";

export const useLivePlayer = () => {
  const { playTrack, stop } = usePlayerControls();
  const { audioUrl } = usePlayerState();
  const { setSongTitle } = useAudio();
  const [isLive, setIsLive] = useState(audioUrl === LIVE_STREAM_URL);

  const { songTitle, refetch, streamer } = useCurrentSongTitle({
    enabled: false,
    refetchInterval: 10000,
    onSuccess: (data) => setSongTitle(data.streamTitle),
  });

  useEffect(() => {
    setIsLive(audioUrl === LIVE_STREAM_URL);
  }, [audioUrl]);

  const toggleLive = async () => {
    if (!isLive) {
		const streamer = 'NA'
		playTrack({
		  audioUrl: LIVE_STREAM_URL,
		  title: songTitle || "",
		  artist: streamer === "NA" ? "שידור חי" : streamer,
		  imageUrl: DEFAULT_PLAYER_IMAGE,
		  metaData: {},
		});
		setIsLive(true);
		// refetch();
		
      return;
    }
    logFooterPlayerPause();
    stop();
    setIsLive(false);
	return;
  };

  return {
    isLive,
    streamer,
    toggleLive,
  };
};
