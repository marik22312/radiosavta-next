import React, { useRef } from "react";
import cn from "classnames";
import { usePageScroll } from "../usePageScroll";
import styles from "./ScrollProgress.module.css";

const Strip: React.FC<{
  className: string;
  stripRef?: React.Ref<HTMLDivElement>;
}> = ({ className, stripRef }) => (
  <div ref={stripRef} className={cn(styles.strip, className)}>
    <span />
    <span />
    <span />
  </div>
);

// Thin tricolor bar at the top of the viewport that fills right to left as
// the page scrolls (MAR-35). Reads the shared scroll source and writes the
// fill's clip-path directly, so scrolling doesn't re-render React.
export const ScrollProgress: React.FC = () => {
  const fillRef = useRef<HTMLDivElement>(null);

  usePageScroll(({ progress }) => {
    if (fillRef.current) {
      fillRef.current.style.clipPath = `inset(0 0 0 ${(1 - progress) * 100}%)`;
    }
  });

  return (
    <div className={styles.bar} aria-hidden="true">
      <Strip className={styles.track} />
      <Strip className={styles.fill} stripRef={fillRef} />
    </div>
  );
};
