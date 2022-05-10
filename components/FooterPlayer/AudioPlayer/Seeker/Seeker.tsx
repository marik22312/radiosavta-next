import React from "react";
import styles from "./Seeker.module.scss";

function formatTime(seconds: any) {
    let minutes: string | number = Math.floor(seconds / 60);
    minutes = (minutes >= 10) ? minutes : "0" + minutes;
    seconds = Math.floor(seconds % 60);
    seconds = (seconds >= 10) ? seconds : "0" + seconds;
    return minutes + ":" + seconds;
  }

interface SeekerProps {
	currentTime: number;
	durationTime: number;
	onSeek: (e: any) => void;
}

export const Seeker = React.forwardRef<
  any,
  SeekerProps
>(function Seeker(props, ref: any) {
  const { onSeek, currentTime, durationTime } = props;

  const currentPercentage = durationTime
    ? `${(currentTime / durationTime) * 100}%`
    : "0%";
  const trackStyling = ` 
      -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, var(--banana)), color-stop(${currentPercentage}, var(--light-green)))
    `;

  const handleSeekerChange = (e: any) => {
    onSeek(e.target.value);
  };

  return (
    <div className={styles.seekerWrapper}>
      <span>
	  {currentTime
          ? formatTime(currentTime)
          : "00:00"}
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
