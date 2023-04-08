import React, { useRef, useState } from "react";

import styles from "./FooterPlayer.module.scss";
import { useLivePlayer } from "../../hook/useLivePlayer";
import { AudioPlayer } from "./AudioPlayer/AudioPlayer";
import { usePlayerState } from "../../providers/PlayerProvider/usePlayerState";
import { PlayPauseButton } from "../PlayPauseButton/PlayPauseButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BASE_IMAGE_ICON } from "../../config/images";
import { usePlayerBindings } from "./AudioPlayer/usePlayerBinding";
import { Seeker } from "./Seeker/Seeker";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import {
  logShareLiveStream,
  logShareRecordedShow,
} from "../../api/Mixpanel.api";
import { useTogglePLay } from "./hooks/useTogglePlay";
import { useShare } from "../../hook/useShare";
import { ShareModal } from "../ShareModal/ShareModal";
import { PlayerWrapperState } from "../../domain/Player";
import VolumeSlider from "./VolumeSlider/VolumeSlider";
import classNames from "classnames";

import isLiveIcon from "../../images/isLive.svg";
import isBroadcastIcon from "../../images/isPlayingProgram.svg";

interface PlayerInterface {
  state: PlayerWrapperState;
  changeState: (state: PlayerWrapperState) => void;
}

const FooterPlayer: React.FC<PlayerInterface> = (props: PlayerInterface) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { songTitle, artist, imageUrl, isStopped, metaData } = usePlayerState();
  const { isLive, streamer } = useLivePlayer();
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

  const togglePlay = (pageState?: PlayerWrapperState) => {
    pageState && props.changeState(pageState);
    togglePlayerPlay();
  };

  return (
    <>
      <AudioPlayer ref={audioRef} />
      <RenderContent {...props} audioRef={audioRef} onShare={onShare} togglePlay={togglePlay} />
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

interface playPauseButtonContentInterface {
  pageStateActive?: PlayerWrapperState;
  currentPageState: PlayerWrapperState;
  togglePlay: (pageState?: PlayerWrapperState) => void;
}

const PlayButtonContent: React.FC<playPauseButtonContentInterface> = (
  props: playPauseButtonContentInterface
) => {
  const { isPlaying, isLoading } = usePlayerState();

  let iconSize = "50px";
  if (props.currentPageState === PlayerWrapperState.Initial) {
    iconSize = "120px";
  } else if (props.currentPageState === PlayerWrapperState.Active) {
    iconSize = "60px";
  }

  return (
    <PlayPauseButton
      isPlaying={isPlaying}
      isLoading={isLoading}
      onClick={() =>
        props.togglePlay && props.togglePlay(props.pageStateActive)
      }
      displayLoader
      style={{ width: iconSize, height: iconSize }}
    />
  );
};

const BroadcastIcon: React.FC = () => {
  const { isPlaying } = usePlayerState();
  const { isLive, toggleLive } = useLivePlayer();

  const style = {minHeight: "12px", maxHeight: "18px", width: '30px'}

  if (!isPlaying) {
    return <div style={style} />;
  }
  if (isLive) {
    return <img src={isLiveIcon} alt="live streaming" style={style} />;
  }
  return (
    <img
      src={isBroadcastIcon}
      alt="pre recorder program"
      onClick={toggleLive}
      style={style}
    />
  );
};

interface seekerInterface {
  audioRef: React.RefObject<HTMLAudioElement>;
}

const SeekerContent: React.FC<seekerInterface> = (props: seekerInterface) => {
  const { seekerRef, currentTime, onSeek } = usePlayerBindings(props.audioRef);
  const { isStopped } = usePlayerState();
  const { isLive } = useLivePlayer();

  const shouldShowSeeker = !isStopped && !isLive;
  const durationTime = props.audioRef.current?.duration ?? 0;

  return (
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
  );
};

const VolumeControlContent: React.FC<seekerInterface> = (
  props: seekerInterface
) => {
  const { volume, onVolumeChange } = usePlayerBindings(props.audioRef);
  return (
    <div className={styles.volumeWrapper}>
      <button className={classNames(styles.actionButton, styles.volumeButton)}>
        <VolumeSlider volume={volume} onVolumeChange={onVolumeChange} />
      </button>
    </div>
  );
};

const HeaderTextContent = () => (
  <>
    <div className={styles.PlayerWrapperAbout}>
      <h1 className={styles.playerWrapperTitle}>רדיו סבתא</h1>
      <h2 className={styles.playerWrapperSubtitle}>קולקטיב רדיו אינטרנטי</h2>
      <h3 className={styles.playerWrapperQuote}>כשהעגלה נוסעת, המלונים...</h3>
    </div>
  </>
);

interface initialContentInterface {
  togglePlay: (pageState?: PlayerWrapperState) => void;
}

const InitialContent: React.FC<initialContentInterface> = (
  props: initialContentInterface
) => (
  <>
    <HeaderTextContent />
    <div>
      <PlayButtonContent
        currentPageState={PlayerWrapperState.Initial}
        pageStateActive={PlayerWrapperState.Active}
        togglePlay={props.togglePlay}
      />
      <span
        className={styles.playerWrapperPlaySubtitle}
        onClick={() => props.togglePlay(PlayerWrapperState.Active)}
      >
        לחצו לניגון
      </span>
    </div>
  </>
);

interface shareButtonContentInterface {
  onShare: () => void;
}

const ShareButtonContent: React.FC<shareButtonContentInterface> = (
  props: shareButtonContentInterface
) => (
  <button className={styles.actionButton} onClick={props.onShare}>
    <FontAwesomeIcon icon={faShareAlt as any} size="1x" />
  </button>
);

interface openClosePlayerButtonInterface {
  changeState: () => void;
}

const OpenClosePlayerButton: React.FC<openClosePlayerButtonInterface> = (props: openClosePlayerButtonInterface) => (
  <button
    className={styles.actionButton}
    onClick={props.changeState}
  >
    <span className={styles.togglePlayerButton} />
  </button>
);

interface activeContentInterface {
  audioRef: React.RefObject<HTMLAudioElement>;
  togglePlay: () => void;
  changeState: () => void;
  onShare: () => void;
}

const ActiveContent: React.FC<activeContentInterface> = (props: activeContentInterface) => {
  const { songTitle, artist, imageUrl} = usePlayerState();
  const { isLive, streamer } = useLivePlayer();
  
  return (
    <div className={styles.activeContent}>
      <SeekerContent audioRef={props.audioRef} />
      <div className={styles.activeContentHeader}>
        <BroadcastIcon />
        <OpenClosePlayerButton changeState={() => props.changeState()} />
        <div className={styles.headerColumn}>
          <VolumeControlContent audioRef={props.audioRef} />
          <ShareButtonContent onShare={props.onShare} />
        </div>
      </div>
      <HeaderTextContent />
      <div className={styles.activeContentWrapper}>
        <img
          className={styles.playerImage}
          src={imageUrl || `${BASE_IMAGE_ICON}radiosavta/logo_head`}
          alt=""
        />
        <PlayButtonContent
          currentPageState={PlayerWrapperState.Active}
          togglePlay={props.togglePlay}
        />
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

interface inactiveContentInterface {
  audioRef: React.RefObject<HTMLAudioElement>;
  togglePlay: () => void;
  changeState: () => void;
  onShare: () => void;
}

const InActiveContent: React.FC<inactiveContentInterface> = (props: inactiveContentInterface) => {
  const { songTitle, artist} = usePlayerState();
  const { isLive, streamer } = useLivePlayer();
  return (
    <>
      <div className={styles.inactivePlayerWrapper}>
        <BroadcastIcon />
        <div className={styles.inactivePlayerInner}>
          <PlayButtonContent
            currentPageState={PlayerWrapperState.Inactive}
            togglePlay={props.togglePlay}
          />
          <div className={styles.contentWrapper}>
            <p className={styles.programName}>
              {isLive ? `שידור חי ${streamer}` : artist}
            </p>
            <p className={styles.songTitle} title={songTitle}>
              {songTitle}
            </p>
          </div>
          <SeekerContent audioRef={props.audioRef} />
          <div className={styles.footerActions}>
            <VolumeControlContent audioRef={props.audioRef} />
            <ShareButtonContent onShare={props.onShare} />
          </div>
        </div>
        <OpenClosePlayerButton changeState={() => props.changeState()} />
      </div>
    </>
  );
};

interface playerContentInterface {
  state: PlayerWrapperState;
  changeState: (state: PlayerWrapperState) => void;
  audioRef: React.RefObject<HTMLAudioElement>;
  togglePlay: (pageState?: PlayerWrapperState) => void;
  onShare: () => void;
}

const RenderContent: React.FC<playerContentInterface> = (props: playerContentInterface) => {
  if (props.state === PlayerWrapperState.Initial) {
    return <InitialContent togglePlay={props.togglePlay} />;
  }
  if (props.state === PlayerWrapperState.Active) {
    return (<ActiveContent 
    togglePlay={props.togglePlay} 
    audioRef={props.audioRef} 
    changeState={() => props.changeState(PlayerWrapperState.Inactive)} 
    onShare={props.onShare} 
    />);
  }
  if (props.state === PlayerWrapperState.Inactive) {
    return (<InActiveContent 
      togglePlay={props.togglePlay} 
      audioRef={props.audioRef} 
      changeState={() => props.changeState(PlayerWrapperState.Active)} 
      onShare={props.onShare} 
      />);
  }
  return <div />;
};