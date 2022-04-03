import styles from "./FullScreenPlayer.module.scss";
import { Seeker } from "../../Seeker/Seeker";
import { PlayPauseButton } from "../../PlayPauseButton/PlayPauseButton";
import { Agenda } from "../../Agenda/Agenda";
import React, { CSSProperties } from "react";

interface FullScreenPlayerProps {
  visible: boolean;
  isLive: boolean;
  programTitle?: string;
  programName?: string;
  streamerName?: string;
  programImage: string;
  onClose: any;
  onShare: () => void;
  onBackToLive: () => void;
  toggleLive: () => void;
}

export function FullScreenPlayer(props: FullScreenPlayerProps) {
  const wrapperStyle: CSSProperties = {
    top: props.visible ? "0" : "100%",
    zIndex: props.visible ? "5002" : "-1",
  };

  return (
    <div className={styles.fullScreenPlayerWrapper} style={wrapperStyle}>
      <div className={styles.fullScreenPlayer}>
        <button
          onClick={() => props.onClose()}
          className={styles.fullScreenPlayer__close}
        >
          V {/* todo change to icon */}
        </button>
        <div className={styles.fullScreenPlayer__content}>
          <div className={styles.fullScreenPlayer__content__title}>
            <h3 className={styles.fullScreenPLayer__title}>
              {props.isLive ? "שידור חי" : props.programName}
            </h3>

            <h5 className={styles.fullScreenPLayer__subtitle}>
              {props.streamerName ? props.streamerName : props.programTitle}
            </h5>
          </div>

          <div className={styles.fullScreenPLayer__image}>
            <img src={props.programImage} alt={props.programTitle} />
          </div>

          <Seeker />

          <div className={styles.fullScreenPlayer__buttons}>
            <button className={styles.fullScreenPlayer__button}>
              10S back
            </button>
            <PlayPauseButton />
            <button className={styles.fullScreenPlayer__button}>
              10S forward
            </button>
          </div>

          <div className={styles.fullScreenPlayer__actions}>
            <div
              className={styles.fullScreenPlayer__share}
              onClick={() => props.onShare()}
            >
              icon שיתוף
            </div>
            <div
              className={styles.fullScreenPlayer__share}
              onClick={() => props.toggleLive()}
            >
              icon חזרה לשידור החי
            </div>
          </div>

          <Agenda open onShare={props.onShare} />
        </div>
      </div>
    </div>
  );
}
