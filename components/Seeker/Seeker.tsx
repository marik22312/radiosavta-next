import { usePlayerControls } from "../../hook/usePlayerControls";
import styles from "./Seeker.module.scss";

export const Seeker: React.FC = () => {
    const { handlePlayerChange, handlePlayerTimeChange } = usePlayerControls()
    const { currentTime, durationTime } = handlePlayerTimeChange();
    console.log(currentTime, durationTime);
    
    const currentPercentage = durationTime ? `${(currentTime / durationTime) * 100}%` : '0%';
    const trackStyling = `
      -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `;
  
    const handleSeekerChange = (e: any) => {
        handlePlayerChange(e.target.value);
      }

    return (
        <input type="range" min="0" max={durationTime} value={currentTime} className={styles.seeker} style={{background: trackStyling, direction: 'ltr'}} onChange={(e) => handleSeekerChange(e)}/>
    )
}


