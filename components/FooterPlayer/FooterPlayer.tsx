import React, { CSSProperties, useState } from "react";

import styles from "./FooterPlayer.module.scss";
import { useLivePlayer } from "../../hook/useLivePlayer";
import { usePLayerState } from "../../hook/usePlayerState";
import { ShareModal } from "../ShareModal/ShareModal";
import { logShareRecordedShow } from "../../api/Mixpanel.api";
import { useShare } from "../../hook/useShare";
import { FullScreenPlayer } from "./FullScreenPlayer/FullScreenPlayer";
import { PlayPauseButton } from "../PlayPauseButton/PlayPauseButton";

export const FooterPlayer: React.FC = () => {
  const { isLive, streamer, toggleLive } = useLivePlayer();
  const { title, programTitle, trackId, isPlaying, isLoading } =
    usePLayerState();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);

  const onShareSuccess = () => {
    logClickShare("NATIVE");
  };
  const onShareFailed = () => {
    logClickShare("CUSTOM");
    setIsShareModalOpen(true);
  };

  const { share } = useShare({
    onSuccess: onShareSuccess,
    onError: onShareFailed,
  });
  const logClickShare = (type: "NATIVE" | "CUSTOM") => {
    logShareRecordedShow({
      programName: programTitle,
      showName: title,
      showId: trackId as number,
      source: "FOOTER_PLAYER",
      type,
    });
  };
  const onShare = async () => {
    const url = new URL(window.location.href);
    const shareData = {
      url: `${url.origin}/archive?showId=${trackId}`,
      text: `${title} - ${programTitle}`,
    };
    await share(shareData);
  };

  const image = "http://placekitten.com/20/30";

  const wrapperStyle: CSSProperties = {
    transform: isPlayerOpen ? "translateY(80px)" : "",
    transitionDelay: isPlayerOpen ? "0s" : "0.3s",
  };

  return (
    <>
      <div className={styles.footer} style={wrapperStyle}>
        <PlayPauseButton
          isPlaying={isPlaying}
          isLoading={isLoading}
          displayLoader
          onClick={toggleLive}
        />
        <img src={image} alt="" />
        <div className={styles.contentWrapper}>
          <p className={styles.programName}>
            {isLive ? `שידור חי ${streamer}` : programTitle}
          </p>
          <div className={styles.horizontalDivider} />
          <p className={styles.songTitle} title={title}>
            {title}
          </p>
        </div>
        <div
          className={styles.toggleFullScreen}
          onClick={() => setIsPlayerOpen(true)}
          style={{ color: "white" }}
        >
          Click here
        </div>
      </div>
      <FullScreenPlayer
        visible={isPlayerOpen}
        isLive={isLive}
        programTitle={title}
        programName={programTitle}
        onClose={() => setIsPlayerOpen(false)}
        onBackToLive={toggleLive}
        onShare={onShare}
        toggleLive={toggleLive}
        programImage={image}
      />
      <ShareModal
        isOpen={isShareModalOpen}
        onRequestClose={() => setIsShareModalOpen(false)}
        title={`שתפו את ${programTitle} - ${title}`}
        shareableTitle={`${programTitle} - ${title} האזינו ברדיוסבתא!`}
        url={
          (typeof window !== "undefined" &&
            `${
              new URL(window.location.href).origin
            }/archive?showId=${trackId}`) ||
          ""
        }
      />
    </>
  );
};
