import { CSSProperties } from "react";

// Where the mini-player dock's play button sits, per breakpoint. The hero
// play button flies here on scroll (MAR-30), and the dock (MAR-34) should be
// laid out from the same numbers so the two line up.
// Keep DESKTOP_MIN_WIDTH in sync with the 768px breakpoint in the v2 CSS
// modules and styles/redesign-tokens.css (MAR-38).
export const DESKTOP_MIN_WIDTH = 768;

export interface DockGeometry {
  // Dock offset from the viewport's left and bottom edges.
  inset: number;
  height: number;
  padding: number;
  buttonSize: number;
  // Scroll distance (px) over which the hero button completes its flight.
  flightDistance: number;
}

export const DOCK_DESKTOP: DockGeometry = {
  inset: 32,
  height: 80,
  padding: 8,
  buttonSize: 64,
  flightDistance: 560,
};

export const DOCK_MOBILE: DockGeometry = {
  inset: 16,
  height: 68,
  padding: 8,
  buttonSize: 52,
  flightDistance: 460,
};

// Both geometries as inline CSS variables (--mobile-inset, --desktop-inset…)
// for a CSS module to pick from per breakpoint.
export const dockGeometryVars = () =>
  ({
    ...geometryVars("mobile", DOCK_MOBILE),
    ...geometryVars("desktop", DOCK_DESKTOP),
  } as CSSProperties);

const geometryVars = (prefix: string, dock: DockGeometry) => ({
  [`--${prefix}-inset`]: `${dock.inset}px`,
  [`--${prefix}-height`]: `${dock.height}px`,
  [`--${prefix}-padding`]: `${dock.padding}px`,
  [`--${prefix}-button`]: `${dock.buttonSize}px`,
  [`--${prefix}-flight`]: `${dock.flightDistance}px`,
});

let desktopQuery: MediaQueryList | undefined;

// The geometry for the current breakpoint. Client-only.
export const currentDock = () => {
  desktopQuery ??= window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
  return desktopQuery.matches ? DOCK_DESKTOP : DOCK_MOBILE;
};

// Flight progress at which the hero button hands off to the dock: the dock
// clips in while the hero button fades out over the rest of the flight.
// Keep in sync with the hero-handoff range in Hero.module.css.
export const DOCK_REVEAL_PROGRESS = 0.9;

// Hero button flight progress (0 → 1) for a scroll position.
export const flightProgress = (dock: DockGeometry, scrollY: number) =>
  Math.min(1, Math.max(0, scrollY / dock.flightDistance));
