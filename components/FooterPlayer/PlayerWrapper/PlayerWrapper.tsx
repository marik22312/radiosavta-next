import React, { useState } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { PlayerWrapperState } from "../../../domain/Player";
import { PlayPauseButton } from "../../PlayPauseButton/PlayPauseButton";

import styles from "./PlayerWrapper.module.scss";
import FooterPlayer from "../FooterPlayer";

const PlayerWrapper: React.FC = () => {
  const [pageStatus, setPageStatus] = useState<PlayerWrapperState>(
    PlayerWrapperState.Initial
  );

  const pageIsActive = pageStatus === PlayerWrapperState.Active;
  const pageIsInactive = pageStatus === PlayerWrapperState.Inactive;
  const pageIsInitial = pageStatus === PlayerWrapperState.Initial;

  return (
    <div
      className={classNames(
        styles.playerWrapperContainer,
        {
          [styles.initialPlayerWrapperContainer]:
          pageIsInitial,
        },
        {
          [styles.activePlayerWrapperContainer]:
          pageIsActive,
        },
        {
          [styles.inactivePlayerWrapperContainer]:
          pageIsInactive,
        }
      )}
    >
      <div
        className={classNames(
          styles.playerWrapperWrapper,
          {
            [styles.initialPlayerWrapper]:
              pageIsInitial,
          },
          {
            [styles.activePlayerWrapper]:
            pageIsActive,
          },
          {
            [styles.inactivePlayerWrapper]:
            pageIsInactive,
          }
        )}
      >
        <FooterPlayer state={pageStatus} changeState={setPageStatus} />
        <div className={classNames(styles.PlayerWrapperFooter, {[styles.hide]: !pageIsInitial })}>
          <button
            className={classNames(styles.playerWrapperFooterButton, {[styles.hide]: pageIsInactive })}
            onClick={() => setPageStatus(PlayerWrapperState.Inactive)}
          >
            <FontAwesomeIcon
              className={styles.footerButtonIcon}
              icon={faPlay as any}
            />{" "}
            כניסה לאתר
          </button>
        </div>
        {/* <button
          className={classNames(styles.playerWrapperOpenButton, {[styles.hide]: !pageIsInactive })}
          onClick={() => setPageStatus(PlayerWrapperState.Active)}
        >
          <FontAwesomeIcon className={styles.footerOpenIcon} icon={faPlay as any} />
        </button> */}
      </div>
    </div>
  );
};

export default PlayerWrapper;