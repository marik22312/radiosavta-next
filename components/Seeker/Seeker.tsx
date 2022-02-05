import { useEffect, useState } from "react";
import { usePlayerControls } from "../../hook/usePlayerControls";
import styles from "./Seeker.module.scss";

export const Seeker: React.FC = () => {
    const { handlePlayerChange, handlePlayerTimeChange, audioRef } = usePlayerControls()
    const { currentTime, durationTime } = handlePlayerTimeChange();
    const [currentTimePercent, setCurrentTimePercent] = useState(currentTime);
    
    const currentPercentage = durationTime ? `${(currentTimePercent / durationTime) * 100}%` : '0%';
    const trackStyling = `
      -webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #042901), color-stop(${currentPercentage}, #042901))
    `;
  
    const handleSeekerChange = (e: any) => {
        handlePlayerChange(e.target.value);
      }

    //   useEffect(() => {
    //     const interval = setInterval(() => {
    //         const { currentTime } = handlePlayerTimeChange();
    //         setCurrentTimePercent(currentTime)
    //     }, 500);
    //     return () => {
    //       clearInterval(interval);
    //     };
    //   }, []);
    useEffect(() => {
        audioRef.addEventListener("seeked", (e:any) => {
            console.log(e.target.currentTime);
            setCurrentTimePercent(e.target.currentTime);
        })
        return () => {
            audioRef.removeEventListener("seeked", (e) => {})
        }
    }, [])

    return (
        <input type="range" min="0" max={durationTime} className={styles.seeker} style={{background: trackStyling, direction: 'ltr'}} onChange={(e) => handleSeekerChange(e)}/>
    )
}


