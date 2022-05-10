import { useContext } from "react";
import { PlayerContext } from "./PlayerProviderV2";

export const useAudio = () => {
  const audioContext = useContext(PlayerContext);
  if (!audioContext) {
    throw new Error("useAudio must be used within a AudioContextProvider");
  }

  return audioContext;
};
