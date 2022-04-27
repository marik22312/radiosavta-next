import React, { useRef } from "react";
import { useLivePlayer } from "../../../hook/useLivePlayer";
import { usePlayerState } from "../../../providers/PlayerProvider/usePlayerState";
import { Seeker } from "./Seeker/Seeker";
import { usePlayerBindings } from "./usePlayerBinding";

export const AudioPlayer = React.forwardRef<HTMLAudioElement, {} >(function AudioPlayer(props, ref) {
  const { audioUrl, isPlaying, isPaused } = usePlayerState();
  const { isLive } = useLivePlayer();

  return (
    <>
      <audio ref={ref} src={audioUrl}></audio>
    </>
  );
});
