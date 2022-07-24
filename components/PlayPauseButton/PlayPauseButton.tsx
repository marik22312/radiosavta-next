import React from "react";

import Play from "./Button/Play.svg";
import Pause from "./Button/Pause.svg";
import LoadingAnimated from "./Button/LoadingAnimated.svg";
import styles from "./PlayPauseButton.module.scss";

export const PlayPauseButton: React.FC<{
  isPlaying?: boolean;
  isLoading?: boolean;
  displayLoader?: boolean;
  onClick?: (e: any) => void;
}> = (props) => {

	const shouldDisplayLoader = props.isLoading && props.displayLoader;
	
  if (props.isLoading && props.displayLoader) {
    return (
      <img
        src={LoadingAnimated}
        alt="Loading"
        width={65}
        height={65}
        className={styles.loadingCircle}
      />
    );
  }
  if (props.isPlaying) {
    return (
      <img
        src={Pause}
        alt="Pause Button"
        width={65}
        height={65}
        onClick={(e) => props.onClick?.(e)}
      />
    );
  }
  return (
    <img src={Play} alt="Play Button" width={65} height={65} onClick={props.onClick} />
  );
};
