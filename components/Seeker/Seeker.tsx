import { usePlayerControls } from "../../hook/usePlayerControls";
import styles from "./Seeker.module.scss";

export const Seeker: React.FC = () => {
    const { handlePlayerChange, handlePlayerTimeChange } = usePlayerControls()
    const { time, durationTime } = handlePlayerTimeChange();
    console.log(time, durationTime);
    
    const currentPercentage = durationTime ? `${(time / durationTime) * 100}%` : '0%';
    const trackStyling = `
      -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
    `;
  
    const handleSeekerChange = (e: any) => {
        handlePlayerChange(e.target.value);
      }    

    return (
        <input type="range" min="0" max="100" value={time} className={styles.seeker} style={{background: trackStyling}} onChange={(e) => handleSeekerChange(e)}/>
    )
}


