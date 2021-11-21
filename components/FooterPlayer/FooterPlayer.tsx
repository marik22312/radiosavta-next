import React from "react";

import styles from "./FooterPlayer.module.scss";
import { useLivePlayer } from "../../hook/useLivePlayer";
import { usePLayerState } from "../../hook/usePlayerState";

export const FooterPlayer: React.FC = () => {
  const { isLive} = useLivePlayer();
  const { title,  programTitle} = usePLayerState();

  return (
    <>
      <div className={styles.footer}>
		  <div className={styles.contentWrapper}>
			  <p className={styles.programName}>{isLive ? 'שידור חי' : programTitle}</p>
			  <div className={styles.horizontalDivider} />
			  <p className={styles.songTitle}>{title}</p>
			  {/* <p className={styles.playTime}>{currentTime}</p> */}
		  </div>
      </div>
    </>
  );
};
