import React, { useState } from "react";

import styles from "./FooterPlayer.module.scss";
import { useLivePlayer } from "../../hook/useLivePlayer";
import { usePLayerState } from "../../hook/usePlayerState";
import { Agenda } from "../Agenda/Agenda";
import { ShareModal } from '../ShareModal/ShareModal';

export const FooterPlayer: React.FC = () => {
  const { isLive, streamer } = useLivePlayer();
  const { title,  programTitle, trackId} = usePLayerState();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)

  const onShare = () => {
	  console.log('Share')
	  setIsShareModalOpen(true);
  }

  return (
    <>
      <div className={styles.footer}>
        <Agenda onShare={onShare}/>
        <div className={styles.contentWrapper}>
          <p className={styles.programName}>{isLive ? `שידור חי ${streamer}` : programTitle}</p>
          <div className={styles.horizontalDivider} />
          <p className={styles.songTitle} title={title}>{title}</p>
        </div>
      </div>
	  <ShareModal 
	  isOpen={isShareModalOpen}
	  onRequestClose={() => setIsShareModalOpen(false)}
	  title={`שתפו את ${programTitle} - ${title}`}
	  shareableTitle={`${programTitle} - ${title} האזינו ברדיוסבתא!`}
	  url={
		typeof window !== "undefined" &&
		`${new URL(window.location.href).origin}/archive?showId=${trackId}` || ''
	  }
	  	  />
    </>
  );
};
