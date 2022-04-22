import React, { CSSProperties, useEffect, useState } from "react";

import styles from "./FooterPlayer.module.scss";
import { useLivePlayer } from "../../hook/useLivePlayer";
import { AudioPlayer } from "../AudioPlayer/AudioPlayer";
import { usePlayerState } from "../../providers/PlayerProvider/usePlayerState";
import { FullScreenPlayer } from "./FullScreenPlayer/FullScreenPlayer";
import { PlayPauseButton } from "../PlayPauseButton/PlayPauseButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons/faAngleUp";
import { BASE_IMAGE_ICON } from "../../config/images";

export const FooterPlayer: React.FC = () => {
  const { songTitle, artist, isPlaying, isLoading, imageUrl } =
    usePlayerState();
  const { isLive, streamer, toggleLive } = useLivePlayer();
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [image, setImage] = useState("");

  const wrapperStyle: CSSProperties = {
    transform: isPlayerOpen ? "translateY(80px)" : "",
    transitionDelay: isPlayerOpen ? "0s" : "0.3s",
  };

  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
    } else {
      setImage(`${BASE_IMAGE_ICON}radiosavta/logo_head`);
    }
  }, [imageUrl]);

  return (
    <>
      <AudioPlayer />
      <div className={styles.footer} style={wrapperStyle}>
        <PlayPauseButton
          isPlaying={isPlaying}
          isLoading={isLoading}
          displayLoader
          onClick={toggleLive}
        />
        <img className={styles.playerImage} src={image} alt="" />
        {/*<Agenda /> should show only on desktop*/}
        <div className={styles.contentWrapper}>
          <p className={styles.programName}>
            {isLive ? `שידור חי ${streamer}` : artist}
          </p>
          <div className={styles.horizontalDivider} />
          <p className={styles.songTitle} title={songTitle}>
            {songTitle}
          </p>
        </div>
        <div
          className={styles.toggleFullScreen}
          onClick={() => setIsPlayerOpen(true)}
        >
          <FontAwesomeIcon icon={faAngleUp as any} color="white" />
        </div>
      </div>
      <FullScreenPlayer
        onShare={
          () => {} // TODO add share function
        }
        visible={isPlayerOpen}
        isLive={isLive}
        programTitle={songTitle}
        onClose={() => setIsPlayerOpen(false)}
        onBackToLive={toggleLive}
        toggleLive={toggleLive}
        programImage={image}
      />
    </>
  );
};
