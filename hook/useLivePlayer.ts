import { useEffect, useState } from "react";
import { logPlayLive } from "../api/Mixpanel.api";
import { LIVE_STREAM_URL } from "../config/stream";
import { useCurrentSongTitle } from "./useCurrentSongTitle";
import { usePlayerControls } from "../providers/PlayerProvider/usePlayerControls";
import { usePlayerState } from "../providers/PlayerProvider/usePlayerState";
import { useAudio } from "../providers/PlayerProvider/useAudio";

export const useLivePlayer = () => {
  const { playTrack, stop } = usePlayerControls();
  const { audioUrl } = usePlayerState();
  const { setSongTitle } = useAudio();
  const [isLive, setIsLive] = useState(audioUrl === LIVE_STREAM_URL);

  const { songTitle, refetch, streamer } = useCurrentSongTitle({
    enabled: isLive,
    refetchInterval: 10000,
    onSuccess: (data) => setSongTitle(data.streamTitle),
  });

  useEffect(() => {
    setIsLive(audioUrl === LIVE_STREAM_URL);
  }, [audioUrl]);

  const toggleLive = async () => {
    if (!isLive) {
      const data = await refetch();
      const streamer = data.data?.streamer || "NA";
      logPlayLive({ streamerName: streamer });
      playTrack({
        audioUrl: LIVE_STREAM_URL,
        title: songTitle || "",
        artist: "שידור חי",
        imageUrl: "https://res.cloudinary.com/marik-shnitman/image/upload/v1637258645/radiosavta/assets/ogImage.jpg",
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
