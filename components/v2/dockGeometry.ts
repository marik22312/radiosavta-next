// Where the mini-player dock's play button sits, per breakpoint. The hero
// play button flies here on scroll (MAR-30), and the dock (MAR-34) should be
// laid out from the same numbers so the two line up.
// Keep DESKTOP_MIN_WIDTH in sync with the breakpoint in the v2 SCSS modules.
export const DESKTOP_MIN_WIDTH = 1024;

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

// Viewport coordinates of the dock play button's center. The dock hugs the
// left edge in both directions, so the button is its leftmost item in RTL.
export const dockButtonCenter = (dock: DockGeometry, viewportHeight: number) => ({
  x: dock.inset + dock.padding + dock.buttonSize / 2,
  y: viewportHeight - dock.inset - dock.height / 2,
});
