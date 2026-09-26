import { RefObject } from "react";
import {
  DOCK_REVEAL_PROGRESS,
  currentDock,
  dockButtonCenter,
  flightProgress,
} from "../dockGeometry";
import { usePageScroll } from "../usePageScroll";

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smoothstep = (p: number) => p * p * (3 - 2 * p);

// Scroll-linked flight of the hero play button into the mini-player dock.
// Driven by the shared page scroll listener rather than CSS scroll
// timelines: the flight's end point depends on the viewport, which a
// keyframe can't express. Styles are written straight to the DOM so
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
  usePageScroll(({ scrollY, viewportHeight }) => {
    const rootEl = root.current;
    const anchorEl = anchor.current;
    const buttonEl = button.current;
    if (!rootEl || !anchorEl || !buttonEl) {
      return;
    }

    const dock = currentDock();
    const p = flightProgress(dock, scrollY);
    const e = smoothstep(p);

    const rect = anchorEl.getBoundingClientRect();
    const target = dockButtonCenter(dock, viewportHeight);
    const dx = (target.x - (rect.left + rect.width / 2)) * e;
    const dy = (target.y - (rect.top + rect.height / 2)) * e;
    const endScale = dock.buttonSize / buttonEl.offsetWidth;
    const scale = 1 - (1 - endScale) * e;

    buttonEl.style.transform =
      p === 0 ? "" : `translate(${dx}px, ${dy}px) scale(${scale})`;
    buttonEl.style.opacity =
      p < DOCK_REVEAL_PROGRESS
        ? ""
        : String((1 - p) / (1 - DOCK_REVEAL_PROGRESS));
    buttonEl.style.visibility = p >= 1 ? "hidden" : "";
    rootEl.style.setProperty("--hero-fade", String(clamp01(1 - p * 2)));
  });
};
