import styles from "./FullScreenPlayer.module.scss";
import { PlayPauseButton } from "../../PlayPauseButton/PlayPauseButton";
import { Agenda } from "../../Agenda/Agenda";
import React, { CSSProperties } from "react";
import {
  faAngleDown,
  faBroadcastTower,
  faFastForward,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons/faArrowCircleRight";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons/faArrowCircleLeft";
import { AudioPlayer } from "../../AudioPlayer/AudioPlayer";

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
    transitionDelay: props.visible ? "0.3s" : "0s",
  };

  return (
    <>
      <div className={styles.fullScreenPlayerWrapper} style={wrapperStyle}>
        <div className={styles.fullScreenPlayer}>
          <div
            onClick={() => props.onClose()}
            className={styles.fullScreenPlayer__close}
          >
            <FontAwesomeIcon icon={faAngleDown as any} color="white" />
          </div>
          <div className={styles.fullScreenPlayer_content}>
            <div className={styles.fullScreenPlayer__actions}>
              <div
                className={styles.fullScreenPlayer__share}
                onClick={() => props.onShare()}
              >
                <FontAwesomeIcon icon={faShareAlt as any} color="white" />
                <span> שיתוף</span>
              </div>
              <div
                className={styles.fullScreenPlayer__share}
                onClick={() => props.toggleLive()}
              >
                {!props.isLive && (
                  <>
                    <FontAwesomeIcon
                      icon={faBroadcastTower as any}
                      color="white"
                    />
                    <span> חזרה לשידור חי</span>
                  </>
                )}
              </div>
            </div>
            <h3 className={styles.fullScreenPLayer__title}>
              {props.isLive ? "שידור חי" : props.programName}
            </h3>

            <h5 className={styles.fullScreenPLayer__subtitle}>
              {props.streamerName ? props.streamerName : props.programTitle}
            </h5>
            <img
              className={styles.fullScreenPLayer__image}
              src={props.programImage}
              alt={props.programTitle}
            />
            <AudioPlayer />
            <div className={styles.fullScreenPlayer__buttons}>
              <button className={styles.fullScreenPlayer__button}>
                <FontAwesomeIcon
                  icon={faArrowCircleRight as any}
                  size="1x"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </button>
              <PlayPauseButton />
              <button className={styles.fullScreenPlayer__button}>
                <FontAwesomeIcon
                  icon={faArrowCircleLeft as any}
                  size="1x"
                  style={{
                    width: "50px",
                    height: "50px",
                  }}
                />
              </button>
            </div>
            <Agenda open onShare={props.onShare} />
          </div>
        </div>
      </div>
    </>
  );
}
