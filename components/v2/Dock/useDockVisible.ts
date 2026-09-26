import { useState } from "react";
import {
  DOCK_REVEAL_PROGRESS,
  currentDock,
  flightProgress,
} from "../dockGeometry";
import { usePageScroll } from "../usePageScroll";

// Whether the dock is shown: once the hero play button's flight is nearly
// done (see useHeroFlight). State only changes when the threshold is
// crossed, so scrolling doesn't re-render on every frame.
export const useDockVisible = () => {
  const [visible, setVisible] = useState(false);

  usePageScroll(({ scrollY }) => {
    setVisible(flightProgress(currentDock(), scrollY) >= DOCK_REVEAL_PROGRESS);
  });

  return visible;
};
