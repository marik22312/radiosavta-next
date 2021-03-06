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
import {
  logAgendaOpen,
  logFooterPlayerPlay,
  logShareLiveStream,
  logShareRecordedShow,
} from "../../api/Mixpanel.api";
import { Agenda } from "../Agenda/Agenda";
import { useTogglePLay } from "./hooks/useTogglePlay";
import { useShare } from "../../hook/useShare";
import { ShareModal } from "../ShareModal/ShareModal";

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
      return { text: "???????????????? - ?????????? ????", url: "" };
    }

    const url = new URL(window.location.href);
    if (isLive || isStopped) {
      return { text: "???????????????? - ?????????? ????", url: url.origin };
    }

    return {
      text: `???????????????? - ${songTitle}`,
      url: `${url.origin}/archive?showId=${metaData.recordedShowId}`,
    };
  };

  const onShare = () => {
    setIsPlayerOpen(false);

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

  const footerWrapperClass = `${styles.footer} ${
    isPlayerOpen ? styles.footerClosed : ""
  }`;

  return (
    <>
      <AudioPlayer ref={audioRef} />
      <div className={footerWrapperClass}>
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
              {isLive ? `?????????? ???? ${streamer}` : artist}
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
			<span className={styles.iconText}>
            ???????? ???????????? ????
			</span>
          </button>
          <button onClick={onShare}>
            <FontAwesomeIcon icon={faShareAlt as any} size="1x" />
			<span className={styles.iconText}>
            ??????
			</span>
          </button>
          <button
            onClick={() => {
              logAgendaOpen();
              setIsAgendaOpen((prevState) => !prevState);
            }}
          >
            <FontAwesomeIcon icon={faCalendar as any} size="1x" />
			<span className={styles.iconText}>
            ???? ??????&quot;???
			</span>
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
