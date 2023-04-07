import React from "react";
import { usePlayerState } from "../../../providers/PlayerProvider/usePlayerState";

export const AudioPlayer = React.forwardRef<HTMLAudioElement, {} >(function AudioPlayer(props, ref) {
  const { audioUrl} = usePlayerState();

  return (
    <>
      <audio ref={ref} src={audioUrl}></audio>
    </>
  );
});
