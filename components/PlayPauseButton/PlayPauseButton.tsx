import React from "react";

import Play from "./Button/Play.svg";
import Pause from "./Button/Pause.svg";
import LoadingAnimated from "./Button/LoadingAnimated.svg";
import styles from "./PlayPauseButton.module.scss";
import cn from "classnames";

export const PlayPauseButton: React.FC<{
  isPlaying?: boolean;
  isLoading?: boolean;
  displayLoader?: boolean;
  onClick?: (e: any) => void;
}> = (props) => {
  if (props.isLoading && props.displayLoader) {
    return (
      <img
        src={LoadingAnimated}
        alt="Loading"
        className={cn(styles.loadingCircle, styles.playPauseImg)}
      />
    );
  }
  if (props.isPlaying) {
    return (
      <img
        src={Pause}
        alt="Pause Button"
        onClick={(e) => props.onClick?.(e)}
        className={styles.playPauseImg}
      />
    );
  }
  return (
    <img
      src={Play}
      alt="Play Button"
      onClick={props.onClick}
      className={styles.playPauseImg}
    />
  );
};
