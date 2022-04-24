import React from "react";
// import { usePlayerControls } from "../../hook/usePlayerControls";
import styles from "./Seeker.module.scss";

export const Seeker = React.forwardRef<
  any,
  {
    currentTime: number;
    durationTime: number;
    handlePlayerChange: (e: any) => void;
  }
>(function Seeker(props, ref: any) {
  const { handlePlayerChange, currentTime, durationTime } = props;

  const currentPercentage = durationTime
    ? `${(currentTime / durationTime) * 100}%`
    : "0%";
  const trackStyling = ` 
      -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, var(--banana)), color-stop(${currentPercentage}, var(--light-green)))
    `;

  const handleSeekerChange = (e: any) => {
    handlePlayerChange(e.target.value);
  };

  return (
    <div className={styles.seekerWrapper}>
      <span>
        {Math.floor(currentTime / 60)}:{Math.floor(currentTime % 60)}
      </span>
      <input
        ref={ref}
        type="range"
        min="0"
        defaultValue={0}
        max={durationTime}
        className={styles.seeker}
        style={{ background: trackStyling }}
        onChange={handleSeekerChange}
      />
      <span>
        {durationTime
          ? Intl.DateTimeFormat("he", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).format(durationTime)
          : "00:00"}
      </span>
    </div>
  );
});
