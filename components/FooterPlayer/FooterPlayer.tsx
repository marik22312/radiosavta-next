import React, { useState } from "react";

import styles from "./FooterPlayer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { useLivePlayer } from "../../hook/useLivePlayer";
import { usePLayerState } from "../../hook/usePlayerState";
import { usePlayerControls } from '../../hook/usePlayerControls';
// import { logPlayButtonPressed } from "../../api/Mixpanel.api";

const PlayIcon = () => {
  return <FontAwesomeIcon icon={faPlay} size="2x" />;
};
const PauseIcon = () => {
  return <FontAwesomeIcon icon={faPause} size="2x" />;
};

export const FooterPlayer: React.FC = () => {
  const { isLive, toggleLive } = useLivePlayer();
  const { pause } = usePlayerControls();
  const { title, isPlaying } = usePLayerState();

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
        <div className={styles.playButtonWrapper}>
          <button onClick={() => logAndTogglePlayer()}>
            {/* {isLive ? "pause" : "play"} */}
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <div className={styles.horizontalDivider} />
          <p className={styles.nowPlayingTitle} title={title}>
            {title || "Press Play To Go Live!"}
          </p>
        </div>
        <input
          style={{ opacity: isPlaying && !isLive ? 1 : 0 }}
          min={0}
          max={100}
          //   value={26}
          type="range"
          className={styles.progressBar}
          //   onChange={(e) => debouncedSetTime(parseInt(e.target.value))}
        />
        <div
          className={styles.liveBadge}
          style={{ opacity: isPlaying && isLive ? 1 : 0 }}
        >
          LIVE !
        </div>
      </div>
    </>
  );
};
