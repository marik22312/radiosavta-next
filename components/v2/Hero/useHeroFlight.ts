import { RefObject, useEffect } from "react";
import {
  DESKTOP_MIN_WIDTH,
  DOCK_DESKTOP,
  DOCK_MOBILE,
  dockButtonCenter,
} from "../dockGeometry";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (p: number) => p * p * (3 - 2 * p);

// Scroll-linked flight of the hero play button into the mini-player dock.
// Uses a rAF-throttled scroll listener rather than CSS scroll timelines,
// which Safari doesn't support. Styles are written straight to the DOM so
// scrolling doesn't re-render React.
//
// `anchor` must be an untransformed element centered on the button (the
// rings container) so its rect gives the button's resting position.
// `root` receives `--hero-fade` (1 → 0 over the first half of the flight)
// for the rings and status label to fade with.
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
    const desktop = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    let frame: number | undefined;

    const update = () => {
      frame = undefined;
      const rootEl = root.current;
      const anchorEl = anchor.current;
      const buttonEl = button.current;
      if (!rootEl || !anchorEl || !buttonEl) {
        return;
      }

      const dock = desktop.matches ? DOCK_DESKTOP : DOCK_MOBILE;
      const p = clamp01(window.scrollY / dock.flightDistance);
      const e = smoothstep(p);

      const rect = anchorEl.getBoundingClientRect();
      const target = dockButtonCenter(dock, window.innerHeight);
      const dx = (target.x - (rect.left + rect.width / 2)) * e;
      const dy = (target.y - (rect.top + rect.height / 2)) * e;
      const endScale = dock.buttonSize / buttonEl.offsetWidth;
      const scale = 1 - (1 - endScale) * e;

      buttonEl.style.transform =
        p === 0 ? "" : `translate(${dx}px, ${dy}px) scale(${scale})`;
      buttonEl.style.opacity = p < 0.9 ? "" : String((1 - p) / 0.1);
      buttonEl.style.visibility = p >= 1 ? "hidden" : "";
      rootEl.style.setProperty("--hero-fade", String(clamp01(1 - p * 2)));
    };

    const schedule = () => {
      if (frame === undefined) {
        frame = requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    desktop.addEventListener("change", schedule);

    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      desktop.removeEventListener("change", schedule);
      if (frame !== undefined) {
        cancelAnimationFrame(frame);
      }
    };
  }, [root, anchor, button]);
};
