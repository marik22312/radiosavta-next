import React from "react";
import cn from "classnames";
import styles from "./Gallery.module.css";
import motion from "../motion.module.css";

// Copy pending MAR-40.
const DESCRIPTION =
  "תמונות מהאולפן במצפה רמון, מהאולפנים הביתיים ומכל מי שעבר אצלנו מאז 2015.";

interface Slot {
  x: number;
  y: number;
  w: number;
  h: number;
  rotate: number;
  drift: "a" | "b" | "c";
}

interface Layout {
  width: number;
  height: number;
  slots: Slot[];
}

// Slot tables from the design's 1440 and 390 boards, in px of the collage
// box. They're rendered as percentages so the collage scales with its width.
const DESKTOP: Layout = {
  width: 1280,
  height: 820,
  slots: [
    { x: 40, y: 80, w: 300, h: 380, rotate: -3, drift: "a" },
    { x: 300, y: 340, w: 360, h: 260, rotate: 2, drift: "c" },
    { x: 560, y: 40, w: 280, h: 340, rotate: -1.5, drift: "b" },
    { x: 780, y: 380, w: 340, h: 340, rotate: 3, drift: "a" },
    { x: 960, y: 60, w: 280, h: 300, rotate: -2, drift: "c" },
    { x: 120, y: 500, w: 300, h: 240, rotate: 1.5, drift: "b" },
    { x: 600, y: 470, w: 220, h: 280, rotate: -4, drift: "a" },
  ],
};

const MOBILE: Layout = {
  width: 358,
  height: 660,
  slots: [
    { x: 10, y: 40, w: 200, h: 250, rotate: -3, drift: "a" },
    { x: 200, y: 20, w: 150, h: 130, rotate: 3, drift: "b" },
    { x: 160, y: 180, w: 190, h: 150, rotate: 2.5, drift: "c" },
    { x: 24, y: 320, w: 170, h: 210, rotate: 1.5, drift: "b" },
    { x: 180, y: 350, w: 170, h: 200, rotate: -2, drift: "a" },
    { x: 90, y: 500, w: 200, h: 140, rotate: -1, drift: "c" },
  ],
};

const percent = (value: number, total: number) => `${(value / total) * 100}%`;

const Placeholder: React.FC<{ label: string }> = ({ label }) => (
  <div className={styles.placeholder}>
    <svg
      className={styles.placeholderIcon}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="9" cy="10" r="2" />
      <path d="M21 16l-5-5-9 9" />
    </svg>
    <span>{label}</span>
  </div>
);

interface CollageProps {
  layout: Layout;
  photos: string[];
  className: string;
}

// Both collages are rendered and CSS shows the one for the breakpoint, so
// the server markup matches the client whatever the viewport.
const Collage: React.FC<CollageProps> = ({ layout, photos, className }) => (
  <div
    role="img"
    aria-label="קולאז׳ תמונות מתחלף מהארכיון"
    className={cn(styles.collage, className)}
  >
    {layout.slots.map((slot, i) => {
      const photo = photos.length ? photos[i % photos.length] : null;
      return (
        <div
          key={i}
          className={styles.slot}
          style={{
            left: percent(slot.x, layout.width),
            top: percent(slot.y, layout.height),
            width: percent(slot.w, layout.width),
            height: percent(slot.h, layout.height),
          }}
        >
          <div
            className={styles.tilt}
            style={{ transform: `rotate(${slot.rotate}deg)` }}
          >
            <div className={styles.card}>
              {photo ? (
                <img
                  className={styles.photo}
                  src={photo}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <Placeholder label={`תמונה ${i + 1}`} />
              )}
            </div>
          </div>
        </div>
      );
    })}
  </div>
);

interface GalleryProps {
  photos: string[];
}

export const Gallery: React.FC<GalleryProps> = ({ photos }) => (
  <section
    id="gallery"
    className={styles.gallery}
    aria-labelledby="gallery-title"
  >
    <header className={styles.header}>
      <div className={styles.heading}>
        <div className={cn(styles.eyebrow, motion.reveal)}>מהאלבום</div>
        <h2 id="gallery-title" className={cn(styles.title, motion.reveal)}>
          מהסלון של סבתא
        </h2>
      </div>
      <p className={cn(styles.description, motion.reveal)}>{DESCRIPTION}</p>
    </header>

    <Collage layout={MOBILE} photos={photos} className={styles.mobileOnly} />
    <Collage layout={DESKTOP} photos={photos} className={styles.desktopOnly} />
  </section>
);
