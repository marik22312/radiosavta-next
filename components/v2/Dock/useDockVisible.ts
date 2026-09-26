import { useEffect, useState } from "react";
import {
  DESKTOP_MIN_WIDTH,
  DOCK_DESKTOP,
  DOCK_MOBILE,
  DOCK_REVEAL_PROGRESS,
  flightProgress,
} from "../dockGeometry";

// Whether the dock is shown: once the hero play button's flight is nearly
// done (see useHeroFlight). State only changes when the threshold is
// crossed, so scrolling doesn't re-render on every frame.
export const useDockVisible = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const desktop = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    let frame: number | undefined;

    const update = () => {
      frame = undefined;
      const dock = desktop.matches ? DOCK_DESKTOP : DOCK_MOBILE;
      setVisible(flightProgress(dock, window.scrollY) >= DOCK_REVEAL_PROGRESS);
    };

    const schedule = () => {
      if (frame === undefined) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    desktop.addEventListener("change", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      desktop.removeEventListener("change", schedule);
      if (frame !== undefined) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return visible;
};
