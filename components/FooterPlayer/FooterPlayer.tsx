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
import VolumeSlider from "./VolumeSlider/VolumeSlider";
import classNames from "classnames";

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

  const seekerContent = () => (
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
  )

  const broadcastIcon = () => {
    // TODO: get icons
    if (!isPlaying) {
      return
    }
    if (isLive) {
      return <img className={styles.broadcastIcon} src={`${BASE_IMAGE_ICON}radiosavta/broadcast.svg`} alt="" />
    }
    if (isPlaying && !isLive) {
      return <img className={styles.broadcastIcon} src={`${BASE_IMAGE_ICON}radiosavta/recorded.svg`} alt="" />
    }
    return null
  }

  const volumeControlContent = () => (
    <div className={styles.volumeWrapper}>
      <button className={classNames(styles.actionButton, styles.volumeButton)}>
        <FontAwesomeIcon icon={faVolumeUp as any} />
        <VolumeSlider />
      </button>
    </div>
  )

  const shareButtonContent = () => (
    <button className={styles.actionButton} onClick={onShare}>
      <FontAwesomeIcon icon={faShareAlt as any} size="1x" />
    </button>
  )

  const openClosePlayerButton = (mode: PlayerWrapperState) => (
    <button className={styles.actionButton} onClick={() => props.changeState(mode)}>
      <span className={styles.togglePlayerButton} />
    </button>
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
        <div className={styles.inactivePlayerWrapper}>
        <div className={styles.inactivePlayerInner}>
          {playButtonContent()}
          <div className={styles.contentWrapper}>
            <p className={styles.programName}>
              {isLive ? `שידור חי ${streamer}` : artist}
            </p>
            <p className={styles.songTitle} title={songTitle}>
              {songTitle}
            </p>
          </div>
          {seekerContent()}
          <div className={styles.footerActions}>
            {volumeControlContent()}
            {shareButtonContent()}
          </div>
        </div>
          {openClosePlayerButton(PlayerWrapperState.Active)}
        </div>
      </>
    );
  };

  const activeContent = () => {
    return (
      <div className={styles.activeContent}>
        {isPlaying && !isLive && <Seeker ref={seekerRef} currentTime={currentTime} durationTime={durationTime} onSeek={onSeek} />}
        <div className={styles.activeContentHeader}>
          <FontAwesomeIcon icon={faBroadcastTower as any} style={{ color: '#ccc', width: '25px', height: '25px' }} />
          {openClosePlayerButton(PlayerWrapperState.Inactive)}
          <div className={styles.headerColumn}>
            {volumeControlContent()}
            {shareButtonContent()}
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
