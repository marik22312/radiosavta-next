import React, { CSSProperties } from "react";
import Image from "next/image";
import cn from "classnames";
import { Origins } from "../../../api/Mixpanel.api";
import { useLiveToggle } from "../useLiveToggle";
import { Equalizer } from "../Equalizer/Equalizer";
import { DOCK_DESKTOP, DOCK_MOBILE, DockGeometry } from "../dockGeometry";
import { useDockVisible } from "./useDockVisible";
import logo from "../../../public/assets/logo_round.png";
import styles from "./Dock.module.scss";

// Lays the dock out from dockGeometry so its play button sits exactly where
// the hero button's flight ends. Dock.module.scss picks the set per breakpoint.
const geometryVars = (prefix: string, dock: DockGeometry) => ({
  [`--${prefix}-inset`]: `${dock.inset}px`,
  [`--${prefix}-height`]: `${dock.height}px`,
  [`--${prefix}-padding`]: `${dock.padding}px`,
  [`--${prefix}-button`]: `${dock.buttonSize}px`,
});

const dockStyle = {
  ...geometryVars("mobile", DOCK_MOBILE),
  ...geometryVars("desktop", DOCK_DESKTOP),
} as CSSProperties;

// Floating mini-player, shown once the hero has scrolled away (MAR-34).
export const Dock: React.FC = () => {
  const visible = useDockVisible();
  const { isOn, isLoading, isPlaying, toggle } = useLiveToggle(Origins.DOCK);

  const label = !isOn
    ? "תקשיבו לסבתא"
    : isLoading
    ? "מתחבר…"
    : "מנגן עכשיו";

  return (
    <div
      className={cn(styles.dock, { [styles.on]: visible })}
      style={dockStyle}
      aria-hidden={!visible}
    >
      <Image className={styles.logo} src={logo} alt="" />
      <div className={styles.info}>
        <div className={styles.station}>
          <span className={styles.liveDot} />
          <span>רדיו סבתא · בשידור חי</span>
        </div>
        <div className={styles.status}>
          {isPlaying && <Equalizer className={styles.eq} />}
          <span>{label}</span>
        </div>
      </div>
      <button
        type="button"
        className={styles.play}
        onClick={toggle}
        tabIndex={visible ? undefined : -1}
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
  );
};
