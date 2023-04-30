import React, { useState } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { PlayerWrapperState } from "../../../domain/Player";

import styles from "./PlayerWrapper.module.scss";
import FooterPlayer from "../FooterPlayer";

const PlayerWrapper: React.FC = () => {
  const [pageStatus, setPageStatus] = useState<PlayerWrapperState>(
    PlayerWrapperState.Initial
  );

  const pageIsActive = false
//   const pageIsInactive = pageStatus === PlayerWrapperState.Inactive;
  const pageIsInactive = true
  const pageIsInitial = false

  const getWrapperContainerClass = () => {
    if (pageIsInitial) {
      return styles.initialPlayerWrapperContainer;
    }
    if (pageIsActive) {
      return styles.activePlayerWrapperContainer;
    }
    if (pageIsInactive) {
      return styles.inactivePlayerWrapperContainer;
    }
  };

  const getWrapperClass = () => {
    if (pageIsInitial) {
      return styles.initialPlayerWrapper;
    }
    if (pageIsActive) {
      return styles.activePlayerWrapper;
    }
    if (pageIsInactive) {
      return styles.inactivePlayerWrapper;
    }
  };

  return (
    <div
      className={classNames(
        styles.playerWrapperContainer,
        getWrapperContainerClass()
      )}
    >
      <div
        className={classNames(
          styles.playerWrapperWrapper,
          getWrapperClass()
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
      </div>
    </div>
  );
};

export default PlayerWrapper;