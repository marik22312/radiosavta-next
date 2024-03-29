import React, { useState } from "react";
import classNames from "classnames";
import { PlayerWrapperState } from "../../../domain/Player";

import styles from "./PlayerWrapper.module.scss";
import FooterPlayer from "../FooterPlayer";

const PlayerWrapper: React.FC = () => {
  const [pageStatus, setPageStatus] = useState<PlayerWrapperState>(
    PlayerWrapperState.Inactive
  );

  const pageIsActive = pageStatus === PlayerWrapperState.Active;
  const pageIsInactive = pageStatus === PlayerWrapperState.Inactive;

  const getWrapperContainerClass = () => {
    if (pageIsInactive) {
      return styles.inactivePlayerWrapperContainer;
    }
    if (pageIsActive) {
      return styles.activePlayerWrapperContainer;
    }
  };

  const getWrapperClass = () => {
    if (pageIsInactive) {
      return styles.inactivePlayerWrapper;
    }
    if (pageIsActive) {
      return styles.activePlayerWrapper;
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
        className={classNames(styles.playerWrapperWrapper, getWrapperClass())}
      >
        <FooterPlayer state={pageStatus} changeState={setPageStatus} />
      </div>
    </div>
  );
};

export default PlayerWrapper;
