import React from "react";

import styles from "./FooterPlayer.module.scss";
import { useLivePlayer } from "../../hook/useLivePlayer";
import { Agenda } from "../Agenda/Agenda";
import { AduioPlayer } from '../AudioPlayer/AudioPlayer';
import { usePlayerState } from '../../providers/PlayerProvider/usePlayerState';

export const FooterPlayer: React.FC = () => {
	const {songTitle, artist} = usePlayerState();
  const { isLive, streamer } = useLivePlayer();

  return (
    <>
	<AduioPlayer />
      <div className={styles.footer}>
        <Agenda />
        <div className={styles.contentWrapper}>
          <p className={styles.programName}>{isLive ? `שידור חי ${streamer}` : artist}</p>
          <div className={styles.horizontalDivider} />
          <p className={styles.songTitle} title={songTitle}>{songTitle}</p>
        </div>
      </div>
    </>
  );
};
