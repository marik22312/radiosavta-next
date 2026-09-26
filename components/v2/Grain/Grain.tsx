import React from "react";
import styles from "./Grain.module.css";

// Film-grain noise over the whole page (MAR-36). Purely decorative: fixed
// above everything, ignores the pointer and screen readers.
export const Grain: React.FC = () => (
  <svg className={styles.grain} aria-hidden="true" focusable="false">
    <filter id="v2-grain">
      <feTurbulence
        type="fractalNoise"
        baseFrequency="0.85"
        numOctaves={3}
        stitchTiles="stitch"
      />
    </filter>
    <rect width="100%" height="100%" filter="url(#v2-grain)" />
  </svg>
);
