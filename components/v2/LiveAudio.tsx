import React, { useRef } from "react";
import { AudioPlayer } from "../FooterPlayer/AudioPlayer/AudioPlayer";
import { usePlayerBindings } from "../FooterPlayer/AudioPlayer/usePlayerBinding";

// Full-page layouts don't render the footer player, which is what normally
// owns the <audio> element. This mounts it headless, driven by the shared
// PlayerProvider state, so every v2 control toggles the same stream.
export const LiveAudio: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  usePlayerBindings(audioRef);

  return <AudioPlayer ref={audioRef} />;
};
