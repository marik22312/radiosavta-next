import React from "react";
import cn from "classnames";
import styles from "./Equalizer.module.scss";

// Animated four-bar equalizer. Size it from the parent's className by
// setting --eq-height, --eq-bar and --eq-gap.
export const Equalizer: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn(styles.eq, className)} aria-hidden="true">
    <span />
    <span />
    <span />
    <span />
  </div>
);
