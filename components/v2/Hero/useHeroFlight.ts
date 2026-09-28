import { RefObject, useEffect } from "react";
import { currentDock } from "../dockGeometry";

// Measures what the hero play button's flight into the mini-player dock
// needs from layout. The flight itself is a CSS scroll-driven animation
// (see .play in Hero.module.css), so it runs off the main thread in step
// with scrolling; this only re-measures when the layout changes.
//
// Writes to `root`:
// - `--rest-x` / `--rest-y`: the button's resting center in page
//   coordinates. `anchor` must be an untransformed element centered on the
//   button (the rings container) so its rect isn't thrown off by the flight.
// - `--end-scale`: the button's scale once it's docked.
export const useHeroFlight = ({
  root,
  anchor,
  button,
}: {
  root: RefObject<HTMLElement>;
  anchor: RefObject<HTMLElement>;
  button: RefObject<HTMLElement>;
}) => {
  useEffect(() => {
    const measure = () => {
      const rootEl = root.current;
      const anchorEl = anchor.current;
      const buttonEl = button.current;
      if (!rootEl || !anchorEl || !buttonEl) {
        return;
      }

      const rect = anchorEl.getBoundingClientRect();
      const restX = rect.left + window.scrollX + rect.width / 2;
      const restY = rect.top + window.scrollY + rect.height / 2;
      const endScale = currentDock().buttonSize / buttonEl.offsetWidth;

      rootEl.style.setProperty("--rest-x", `${restX}px`);
      rootEl.style.setProperty("--rest-y", `${restY}px`);
      rootEl.style.setProperty("--end-scale", String(endScale));
    };

    measure();
    // The resting spot moves as fonts and images above it load, and on
    // resize. Watching the body catches both.
    const observer = new ResizeObserver(measure);
    observer.observe(document.body);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [root, anchor, button]);
};
