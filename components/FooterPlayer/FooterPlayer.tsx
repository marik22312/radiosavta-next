import React, { CSSProperties, useEffect, useRef, useState } from "react";

import styles from "./FooterPlayer.module.scss";
import { useLivePlayer } from "../../hook/useLivePlayer";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import { usePlayerState } from "../../providers/PlayerProvider/usePlayerState";
import { FullScreenPlayer } from "./FullScreenPlayer/FullScreenPlayer";
import { PlayPauseButton } from "../PlayPauseButton/PlayPauseButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons/faAngleUp";
import { BASE_IMAGE_ICON } from "../../config/images";
import { usePlayerBindings } from "./AudioPlayer/usePlayerBinding";
import { Seeker } from "./AudioPlayer/Seeker/Seeker";
import { usePlayerControls } from "../../providers/PlayerProvider/usePlayerControls";

export const FooterPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { seekerRef, currentTime, onSeek } = usePlayerBindings(audioRef);
  const {
    songTitle,
    artist,
    isPlaying,
    isLoading,
    imageUrl,
    isStopped,
    isPaused,
  } = usePlayerState();
  const { playTrack, pause, resume } = usePlayerControls();
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


  const togglePlay = () => {
    if (isStopped || isLive) {
      //   logFooterPlayerPlay();
      return toggleLive();
    }
    if (isPaused) {
      return resume();
    }
    return pause();
  };

  return (
    <>
      <AudioPlayer ref={audioRef} />
      <div className={styles.footer} style={wrapperStyle}>
        <div className={styles.rightSide}>
          <PlayPauseButton
            isPlaying={isPlaying}
            isLoading={isLoading}
            displayLoader
            onClick={togglePlay}
          />
          <img className={styles.playerImage} src={image} alt="" />
          {/*<Agenda /> should show only on desktop*/}
          <div className={styles.contentWrapper}>
            <p className={styles.programName}>
              {isLive ? `שידור חי ${streamer}` : artist}
            </p>
            <p className={styles.songTitle} title={songTitle}>
              {songTitle}
            </p>
          </div>
        </div>
        <div className={styles.seekerWrapper}>
          {!isStopped && !isLive && (
            <Seeker
              ref={seekerRef}
              currentTime={currentTime}
              durationTime={audioRef.current?.duration ?? 0}
              onSeek={onSeek}
            />
          )}
        </div>
        <div className={styles.footerActionsWrapper}>
          <div
            className={styles.toggleFullScreen}
            onClick={() => setIsPlayerOpen(true)}
          >
            <FontAwesomeIcon icon={faAngleUp as any} color="white" />
          </div>
        </div>
      </div>
      <FullScreenPlayer
	  ref={audioRef}
        onShare={
          () => {} // TODO add share function
        }
        visible={isPlayerOpen}
        onClose={() => setIsPlayerOpen(false)}
      />
    </>
  );
};
