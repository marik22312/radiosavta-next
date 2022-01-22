import React from "react";

import styles from "./FooterPlayer.module.scss";
import { useLivePlayer } from "../../hook/useLivePlayer";
import { usePLayerState } from "../../hook/usePlayerState";
import { Agenda } from "../Agenda/Agenda";

export const FooterPlayer: React.FC = () => {
  const { isLive, streamer } = useLivePlayer();
  const { title,  programTitle} = usePLayerState();

  return (
    <>
      <div className={styles.footer}>
        <Agenda />
        <div className={styles.contentWrapper}>
          <p className={styles.programName}>{isLive ? `שידור חי ${'| '+ streamer}` : programTitle}</p>
          <div className={styles.horizontalDivider} />
          <p className={styles.songTitle} title={title}>{title}</p>
        </div>
      </div>
    </>
  );
};
