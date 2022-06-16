import styles from "./FullScreenPlayer.module.scss";
import { PlayPauseButton } from "../../PlayPauseButton/PlayPauseButton";
import { Agenda } from "../../Agenda/Agenda";
import React, { CSSProperties } from "react";
import {
  faAngleDown,
  faBackward,
  faBroadcastTower,
  faForward,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePlayerState } from "../../../providers/PlayerProvider/usePlayerState";
import { usePlayerControls } from "../../../providers/PlayerProvider/usePlayerControls";
import { useLivePlayer } from "../../../hook/useLivePlayer";
import { usePlayerBindings } from "../AudioPlayer/usePlayerBinding";
import { Seeker } from "../AudioPlayer/Seeker/Seeker";
import { useTogglePLay } from "../hooks/useTogglePlay";

interface FullScreenPlayerProps {
  visible: boolean;
  onClose: any;
  onShare: () => void;
  onSkipTenSeconds: () => void;
  onBackTenSeconds: () => void;
}

export const FullScreenPlayer = React.forwardRef(function FullScreenPlayer(
  props: FullScreenPlayerProps,
  ref: HTMLAudioElement
) {
  if (!ref) {
    throw new Error("ref is not defined");
  }

  const wrapperStyle: CSSProperties = {
    transform: props.visible ? "translateY(0)" : "translateY(100%)",
    transitionDelay: props.visible ? "0.3s" : "0s",
  };

  const { isLive, toggleLive } = useLivePlayer();
  const { isPlaying, isStopped, songTitle, artist, imageUrl, isLoading } =
    usePlayerState();
  // @ts-expect-error
  const { currentTime, seekerRef, onSeek } = usePlayerBindings(ref);
  const { togglePlay } = useTogglePLay();

  const shouldDisplaySeeker = !isStopped && !isLive;

  return (
    <>
      <div className={styles.fullScreenPlayerWrapper} style={wrapperStyle}>
        <div className={styles.fullScreenPlayer}>
          <div className={styles.fullScreenPlayer_content}>
            <div className={styles.fullScreenPlayer__actions}>
              <div
                onClick={() => props.onClose()}
                className={styles.fullScreenPlayer__close}
              >
                <FontAwesomeIcon icon={faAngleDown as any} color="white" />
              </div>
              <button
                className={styles.fullScreenPlayer__share}
                onClick={() => props.onShare()}
              >
                <FontAwesomeIcon icon={faShareAlt as any} />
                <span> שיתוף</span>
              </button>
              <button
                className={styles.fullScreenPlayer__share}
                onClick={toggleLive}
                disabled={isLive}
              >
                <>
                  <FontAwesomeIcon icon={faBroadcastTower as any} />
                  <span> חזרה לשידור חי</span>
                </>
              </button>
            </div>
            <h3 className={styles.fullScreenPLayer__title}>{artist}</h3>

            <h5 className={styles.fullScreenPLayer__subtitle}>{songTitle}</h5>
            <div className={styles.fullScreenPlayer__imageContainer}>
              <img
                className={styles.fullScreenPLayer__image}
                src={imageUrl}
                alt={songTitle}
              />
            </div>
            {shouldDisplaySeeker && (
              <Seeker
                ref={seekerRef}
                currentTime={currentTime}
                // @ts-expect-error
                durationTime={ref.current.duration}
                onSeek={onSeek}
              />
            )}
            <div className={styles.fullScreenPlayer__buttons}>
              {!isLive && (
                <button
                  className={styles.fullScreenPlayer__button}
                  onClick={props.onSkipTenSeconds}
                >
                  <FontAwesomeIcon
                    // TODO change to actual icon
                    icon={faForward as any}
                    size="1x"
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </button>
              )}
              <PlayPauseButton
                isPlaying={isPlaying}
                onClick={togglePlay}
                isLoading={isLoading}
                displayLoader
              />
              {!isLive && (
                <button
                  className={styles.fullScreenPlayer__button}
                  onClick={props.onBackTenSeconds}
                >
                  <FontAwesomeIcon
                    // TODO change to actual icon
                    icon={faBackward as any}
                    size="1x"
                    style={{
                      width: "20px",
                      height: "20px",
                    }}
                  />
                </button>
              )}
            </div>
            <Agenda open />
          </div>
        </div>
      </div>
    </>
  );
});
