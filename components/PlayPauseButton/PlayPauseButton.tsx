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
  style?: React.CSSProperties;
}> = (props) => {
  const shouldDisplayLoader = props.isLoading && props.displayLoader;

  if (props.isLoading && props.displayLoader) {
    return (
      <img
        src={LoadingAnimated.src}
        alt="Loading"
        className={cn(styles.loadingCircle, styles.playPauseImg)}
        style={props.style}
      />
    );
  }
  if (props.isPlaying) {
    return (
      <img
        src={Pause.src}
        alt="Pause Button"
        onClick={(e) => props.onClick?.(e)}
        className={styles.playPauseImg}
        style={props.style}
      />
    );
  }
  return (
    <img
      src={Play.src}
      alt="Play Button"
      onClick={props.onClick}
      className={styles.playPauseImg}
      style={props.style}
    />
  );
};
