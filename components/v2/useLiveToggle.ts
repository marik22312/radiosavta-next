import { useLivePlayer } from "../../hook/useLivePlayer";
import { usePlayerState } from "../../providers/PlayerProvider/usePlayerState";
import { logPlayLive, Origins } from "../../api/Mixpanel.api";

// Live-stream play state for the v2 play buttons (hero, dock). Everything is
// derived from the shared PlayerProvider, so every button stays in sync.
export const useLiveToggle = (origin: Origins) => {
  const { isLive, toggleLive } = useLivePlayer();
  const { isPlaying, isLoading, isStopped } = usePlayerState();

  const isOn = isLive && !isStopped;

  const toggle = () => {
    if (!isOn) {
      logPlayLive({ origin });
    }
    toggleLive();
  };

  return {
    // The live stream is selected and not stopped (playing or connecting).
    isOn,
    isLoading: isOn && isLoading,
    isPlaying: isLive && isPlaying,
    toggle,
  };
};
