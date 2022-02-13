import { usePlayerControls } from "../../hook/usePlayerControls";
import styles from "./Seeker.module.scss";

export const Seeker: React.FC = () => {
  const { handlePlayerChange, seekerRef, currentTime, durationTime } =
    usePlayerControls();

  const currentPercentage = durationTime
    ? `${(currentTime / durationTime) * 100}%`
    : "0%";
  const trackStyling = ` 
      -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, var(--banana)), color-stop(${currentPercentage}, var(--dark-green)))
    `;

  const handleSeekerChange = (e: any) => {
    handlePlayerChange(e.target.value);
  };

  return (
    <input
      ref={(seekerRef as any)}
      type="range"
      min="0"
      defaultValue={0}
      max={durationTime}
      className={styles.seeker}
      style={{ background: trackStyling }}
      onChange={handleSeekerChange}
    />
  );
};
