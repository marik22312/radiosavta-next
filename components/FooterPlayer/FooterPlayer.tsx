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
import {
  faBroadcastTower,
  faCalendar,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { logFooterPlayerPlay } from '../../api/Mixpanel.api';
import { Agenda } from '../Agenda/Agenda';
import { useTogglePLay } from './hooks/useTogglePlay';

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
  const { pause, resume } = usePlayerControls();
  const { isLive, streamer, toggleLive } = useLivePlayer();
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [image, setImage] = useState("");
  const [isAgendaOpen, setIsAgendaOpen] = useState(false)
  const {togglePlay: togglePlayerPlay} = useTogglePLay();

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

  const togglePlay = (e: any) => {
	  e.stopPropagation();
	  togglePlayerPlay();
  };

  const shouldShowSeeker = !isStopped && !isLive;
  const durationTime = audioRef.current?.duration ?? 0;

  return (
    <>
      <AudioPlayer ref={audioRef} />
      <div className={styles.footer} style={wrapperStyle}>
        <div className={styles.rightSide} onClick={() => setIsPlayerOpen(true)}>
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
          {shouldShowSeeker && (
            <Seeker
              ref={seekerRef}
              currentTime={currentTime}
              durationTime={durationTime}
              onSeek={onSeek}
            />
          )}
        </div>
        <div className={styles.footerActionsWrapper} onClick={() => setIsPlayerOpen(true)}>
          <div
            className={styles.toggleFullScreen}
          >
            <FontAwesomeIcon icon={faAngleUp as any} color="white" />
          </div>
          <button onClick={toggleLive}>
            <FontAwesomeIcon icon={faBroadcastTower as any} size="1x" />
            חזרה לשידור חי
          </button>
          <button>
            <FontAwesomeIcon icon={faShareAlt as any} size="1x" />
            שתף
          </button>
          <button onClick={() => setIsAgendaOpen(!isAgendaOpen)}>
            <FontAwesomeIcon icon={faCalendar as any} size="1x" />
            מה הלו&quot;ז?
          </button>
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
	  <Agenda onShare={() => null}/>
    </>
  );
};
