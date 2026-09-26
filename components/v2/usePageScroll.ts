import { useEffect, useRef } from "react";

export interface PageScroll {
  scrollY: number;
  viewportHeight: number;
  // Share of the page scrolled, 0 → 1 (for the scroll progress bar, MAR-35).
  progress: number;
}

type Listener = (scroll: PageScroll) => void;

// The one scroll listener behind every JS scroll effect on /v2 (MAR-36):
// hero flight, dock visibility and the progress bar. Reads the scroll
// position once per animation frame and hands it to every subscriber, so
// effects stay in step and scrolling doesn't re-render React.
//
// Effects that CSS can express (reveal, exit, drift…) use scroll timelines
// instead, see components/v2/motion.module.css.
const listeners = new Set<Listener>();
let frame: number | undefined;
let resizeObserver: ResizeObserver | undefined;

const read = (): PageScroll => {
  const { scrollHeight, clientHeight } = document.documentElement;
  const scrollY = window.scrollY;
  return {
    scrollY,
    viewportHeight: window.innerHeight,
    progress: Math.min(1, scrollY / Math.max(1, scrollHeight - clientHeight)),
  };
};

const flush = () => {
  frame = undefined;
  const scroll = read();
  listeners.forEach((listener) => listener(scroll));
};

const schedule = () => {
  if (frame === undefined) {
    frame = requestAnimationFrame(flush);
  }
};

const start = () => {
  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", schedule);
  // The page's height changes without a scroll or resize as sections and
  // images load, which moves the progress and the hero's resting position.
  resizeObserver = new ResizeObserver(schedule);
  resizeObserver.observe(document.body);
};

const stop = () => {
  window.removeEventListener("scroll", schedule);
  window.removeEventListener("resize", schedule);
  resizeObserver?.disconnect();
  resizeObserver = undefined;
  if (frame !== undefined) {
    cancelAnimationFrame(frame);
    frame = undefined;
  }
};

const subscribe = (listener: Listener) => {
  if (listeners.size === 0) {
    start();
  }
  listeners.add(listener);
  listener(read());

  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      stop();
    }
  };
};

// Calls `listener` with the page scroll on mount and on every frame the
// page scrolls, resizes or changes height.
export const usePageScroll = (listener: Listener) => {
  const latest = useRef(listener);
  latest.current = listener;

  useEffect(() => subscribe((scroll) => latest.current(scroll)), []);
};
