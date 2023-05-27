import React, { useState } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { PlayerWrapperState } from "../../../domain/Player";

import styles from "./PlayerWrapper.module.scss";
import FooterPlayer from "../FooterPlayer";

interface PlayerWrapperProps {
  visible: boolean;
}

const PlayerWrapper: React.FC<PlayerWrapperProps> = (
  props: PlayerWrapperProps
) => {
  const [pageStatus, setPageStatus] = useState<PlayerWrapperState>(
    PlayerWrapperState.Inactive
  );

  const pageIsActive = pageStatus === PlayerWrapperState.Active;
  const pageIsInactive = pageStatus === PlayerWrapperState.Inactive;

  const getWrapperContainerClass = () => {
    if (!props.visible) {
      return styles.hide;
    }
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
