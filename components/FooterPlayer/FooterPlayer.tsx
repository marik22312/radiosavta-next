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
  faPlay,
  faShareAlt,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";
import {
  logAgendaOpen,
  logShareLiveStream,
  logShareRecordedShow,
} from "../../api/Mixpanel.api";
import { Agenda } from "../Agenda/Agenda";
import { useTogglePLay } from "./hooks/useTogglePlay";
import { useShare } from "../../hook/useShare";
import { ShareModal } from "../ShareModal/ShareModal";
import PlayerWrapper from "./PlayerWrapper/PlayerWrapper";
import { PlayerWrapperState } from "../../domain/Player";

interface PlayerInterface {
  state: PlayerWrapperState;
  changeState: (state: PlayerWrapperState) => void;
}

const FooterPlayer: React.FC<PlayerInterface> = (props: PlayerInterface) => {
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
    metaData,
  } = usePlayerState();
  const { isLive, streamer, toggleLive } = useLivePlayer();
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [image, setImage] = useState("");
  const [isAgendaOpen, setIsAgendaOpen] = useState(false);
  const { togglePlay: togglePlayerPlay } = useTogglePLay();

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const onShareSuccess = () => {};
  const onShareFailed = () => {
    console.log("share failed")
    setIsShareModalOpen(true);
  };

  const { share } = useShare({
    onError: onShareFailed,
    onSuccess: onShareSuccess,
  });

  const onSkipTenSeconds = () => {
    const currentTime = audioRef.current?.currentTime;
    if (currentTime) {
      audioRef!.current!.currentTime = currentTime + 10;
    }
  };
  const onBackTenSeconds = () => {
    const currentTime = audioRef.current?.currentTime;
    if (currentTime) {
      audioRef!.current!.currentTime = currentTime - 10;
    }
  };

  const getShareableData = () => {
    // Fallback so it wont fail when SSR
    if (!global?.window || !window) {
      return { text: "רדיוסבתא - שידור חי", url: "" };
    }

    const url = new URL(window.location.href);
    if (isLive || isStopped) {
      return { text: "רדיוסבתא - שידור חי", url: url.origin };
    }

    return {
      text: `רדיוסבתא - ${songTitle}`,
      url: `${url.origin}/archive?showId=${metaData.recordedShowId}`,
    };
  };

  const onShare = () => {

    if (isStopped || isLive) {
      logShareRecordedShow({
        programName: artist ?? "UNKNOWN",
        showName: songTitle ?? "UNKNOWN",
        source: "FOOTER_PLAYER",
        type: "UNKNOWN",
        showId: metaData.recordedShowId as number,
      });
    } else {
      logShareLiveStream({
        streamerName: artist,
        type: "UNKNOWN",
      });
    }

    return share(getShareableData());
  };

  useEffect(() => {
    setImage(imageUrl || `${BASE_IMAGE_ICON}radiosavta/logo_head`)
  }, [imageUrl]);

  const togglePlay = (pageState?: PlayerWrapperState) => {
    pageState && props.changeState(pageState)
    togglePlayerPlay();
  };

  const shouldShowSeeker = !isStopped && !isLive;
  const durationTime = audioRef.current?.duration ?? 0;

  const footerWrapperClass = `${styles.footer} ${
    isPlayerOpen ? styles.footerClosed : ""
  }`;

  const playButtonContent = (pageState?: PlayerWrapperState) => (
    <PlayPauseButton
      isPlaying={isPlaying}
      isLoading={isLoading}
      onClick={() => togglePlay(pageState)}
      displayLoader
      style={{
        width: props.state === PlayerWrapperState.Initial ? "120px" : "60px",
        height: props.state === PlayerWrapperState.Initial ? "120px" : "60px",
      }}
    />
  )

  const headerTextContent = () => (
    <>
      <div className={styles.PlayerWrapperAbout}>
        <h1 className={styles.playerWrapperTitle}>רדיו סבתא</h1>
        <h2 className={styles.playerWrapperSubtitle}>קולקטיב רדיו אינטרנטי</h2>
        <h3 className={styles.playerWrapperQuote}>כשהעגלה נוסעת, המלונים...</h3>
      </div>
    </>
  )

  const initialContent = () => {
    return (
      <>
        {headerTextContent()}
        <div>
          {playButtonContent(PlayerWrapperState.Active)}
          <span className={styles.playerWrapperPlaySubtitle} onClick={() => togglePlay(PlayerWrapperState.Active)}>לחצו לניגון</span>
        </div>
      </>
    );
  };

  const inActiveContent = () => {
    return (
      <>
        <div className={footerWrapperClass}>
          <div
            className={styles.rightSide}
            onClick={() => setIsPlayerOpen(true)}
          >
            {playButtonContent()}
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
          <div
            className={styles.footerActionsWrapper}
            onClick={() => setIsPlayerOpen(true)}
          >
            <div className={styles.toggleFullScreen}>
              <FontAwesomeIcon icon={faAngleUp as any} color="white" />
            </div>
            <button onClick={toggleLive} disabled={isStopped || isLive}>
              <FontAwesomeIcon icon={faBroadcastTower as any} size="1x" />
              <span className={styles.iconText}>חזרה לשידור חי</span>
            </button>
            <button onClick={onShare}>
              <FontAwesomeIcon icon={faShareAlt as any} size="1x" />
              <span className={styles.iconText}>שתף</span>
            </button>
            <button
              onClick={() => {
                logAgendaOpen();
                setIsAgendaOpen((prevState) => !prevState);
              }}
            >
              <FontAwesomeIcon icon={faCalendar as any} size="1x" />
              <span className={styles.iconText}>מה הלו&quot;ז?</span>
            </button>
          </div>
        </div>
        <FullScreenPlayer
          ref={audioRef}
          onShare={onShare}
          visible={isPlayerOpen}
          onClose={() => setIsPlayerOpen(false)}
          onSkipTenSeconds={onSkipTenSeconds}
          onBackTenSeconds={onBackTenSeconds}
        />
        <Agenda open={isAgendaOpen} />
      </>
    );
  };

  const activeContent = () => {
    return (
      <div className={styles.activeContent}>
        {isPlaying && !isLive && <Seeker ref={seekerRef} currentTime={currentTime} durationTime={durationTime} onSeek={onSeek} />}
        <div className={styles.activeContentHeader}>
          <FontAwesomeIcon icon={faBroadcastTower as any} style={{ color: '#ccc', width: '25px', height: '25px' }} />
          <button className="closeButton" onClick={() => props.changeState(PlayerWrapperState.Inactive)}>
            <span className={styles.togglePlayerButton} />
          </button>
          <div className={styles.headerColumn}>
            {/* TODO: add volume slider */}
            <button className="volumeSliderOpenButton"><FontAwesomeIcon icon={faVolumeUp as any} /></button>
            <button onClick={onShare}>
              <FontAwesomeIcon icon={faShareAlt as any} size="1x" />
            </button>
          </div>
          </div>
        {headerTextContent()}
        <div className={styles.activeContentWrapper}>
          <img className={styles.playerImage} src={image} alt="" />
          {playButtonContent()}
          <p className={styles.programName}>
            {isLive ? `שידור חי ${streamer}` : artist}
          </p>
          <p className={styles.songTitle} title={songTitle}>
            {songTitle}
          </p>
      </div>
      </div>
    );
  };

  return (
    <>
      <AudioPlayer ref={audioRef} />
      {/* this could be written as a switch case, but I prefer this way */}
      {props.state === PlayerWrapperState.Initial && initialContent()}
      {props.state === PlayerWrapperState.Active && activeContent()}
      {props.state === PlayerWrapperState.Inactive && inActiveContent()}
      <ShareModal
          isOpen={isShareModalOpen}
          title={getShareableData().text}
          url={getShareableData().url}
          shareableTitle={getShareableData().text}
          onRequestClose={() => setIsShareModalOpen(false)}
        />
    </>
  );
};

export default FooterPlayer;
