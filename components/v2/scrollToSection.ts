import type React from "react";

// In-page navigation for /v2: header nav, mobile menu, footer links and the
// hero scroll cue scroll smoothly to their section instead of jumping. The
// write side of the scroll system (MAR-36); usePageScroll.ts is the read
// side, and picks up the animated scroll like any other.
//
// With reduced motion the browser jumps straight there, as a plain anchor
// would.
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

// Scrolls to the element `hash` ("#story") points at and puts the hash in
// the URL, pushing a history entry like an anchor click does. Returns false
// when there's no such element, so the caller can leave it to the browser.
export const scrollToSection = (hash: string): boolean => {
  const target = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!target) return false;

  const reduceMotion = window.matchMedia(REDUCED_MOTION).matches;
  target.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }
  return true;
};

// onClick for an in-page anchor (`href="#…"`). Modified clicks (new tab,
// new window) are left to the browser.
export const onSectionLinkClick = (
  event: React.MouseEvent<HTMLAnchorElement>
) => {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    return;
  }
  if (scrollToSection(event.currentTarget.hash)) {
    event.preventDefault();
  }
};
