import React, { useState } from "react";

import styles from "./FooterPlayer.module.scss";
import { useLivePlayer } from "../../hook/useLivePlayer";
import { usePLayerState } from "../../hook/usePlayerState";
import { Agenda } from "../Agenda/Agenda";
import { ShareModal } from '../ShareModal/ShareModal';
import { logShareRecordedShow } from '../../api/Mixpanel.api';
import { useShare } from '../../hook/useShare';

export const FooterPlayer: React.FC = () => {
  const { isLive, streamer } = useLivePlayer();
  const { title,  programTitle, trackId} = usePLayerState();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const onShareSuccess = () => {
	  logClickShare("NATIVE");
	}
	const onShareFailed = () => {
		logClickShare('CUSTOM');
		setIsShareModalOpen(true);
	}
	
	const {share} = useShare({
		onSuccess: onShareSuccess,
		onError: onShareFailed
	});
  const logClickShare = (type: "NATIVE" | "CUSTOM") => {
    logShareRecordedShow({
      programName: programTitle,
      showName: title,
      showId: trackId as number,
      source: 'FOOTER_PLAYER',
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
