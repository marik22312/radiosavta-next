import React, { useRef } from "react";
import cn from "classnames";
import { Origins } from "../../../api/Mixpanel.api";
import { useLiveToggle } from "../useLiveToggle";
import { Equalizer } from "../Equalizer/Equalizer";
import { useHeroFlight } from "./useHeroFlight";
import styles from "./Hero.module.css";

export const Hero: React.FC = () => {
  const { isOn, isLoading, isPlaying, toggle } = useLiveToggle(Origins.HERO);

  const rootRef = useRef<HTMLElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  useHeroFlight({ root: rootRef, anchor: ringsRef, button: buttonRef });

  const label = !isOn
    ? "לחצו לניגון"
    : isLoading
    ? "מתחבר…"
    : "מנגן עכשיו";

  return (
    <section id="live" ref={rootRef} className={styles.hero}>
      <div className={styles.intro}>
        <div className={styles.kicker}>
          תקשיבו לסבתא · קולקטיב רדיו אינטרנטי
        </div>
        <h1 className={styles.headline}>
          כשהעגלה נוסעת, המלונים מסתדרים בארגזים
        </h1>
      </div>

      <div className={styles.playArea}>
        <div
          ref={ringsRef}
          className={cn(styles.rings, { [styles.ringsOn]: isPlaying })}
        >
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
          <button
            ref={buttonRef}
            type="button"
            className={styles.play}
            onClick={toggle}
            aria-label={isOn ? "השהיית השידור החי" : "ניגון השידור החי"}
          >
            {isOn ? (
              <svg className={styles.pauseIcon} viewBox="0 0 24 24" aria-hidden="true">
                <rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor" />
                <rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg className={styles.playIcon} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M7 4.5v15l12.5-7.5z" fill="currentColor" />
              </svg>
            )}
          </button>
        </div>

        <div className={styles.status} aria-live="polite">
          {isPlaying && (
            <Equalizer className={styles.eq} />
          )}
          <span>{label}</span>
        </div>
      </div>

      <a href="#story" className={styles.scrollCue}>
        <span>הסיפור שלנו</span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M6 13l6 6 6-6" />
        </svg>
      </a>
    </section>
  );
};
