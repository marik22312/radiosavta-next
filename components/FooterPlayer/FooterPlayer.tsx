import React, { useState } from "react";

import styles from "./FooterPlayer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { useLivePlayer } from "../../hook/useLivePlayer";
import { usePLayerState } from "../../hook/usePlayerState";
import { usePlayerControls } from '../../hook/usePlayerControls';
// import { logPlayButtonPressed } from "../../api/Mixpanel.api";

export const FooterPlayer: React.FC = () => {
  const { isLive, toggleLive } = useLivePlayer();
  const { pause } = usePlayerControls();
  const { title, isPlaying, programTitle } = usePLayerState();

  //   const debouncedSetTime = (time: number) => {
  //     audioRef.current.currentTime = time;
  //   };

  const logAndTogglePlayer = () => {
	  if (isPlaying) {
		return pause();
	  }
    // logPlayButtonPressed(isPlaying ? "PLAY" : "PAUSE");
    toggleLive();
  };

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
