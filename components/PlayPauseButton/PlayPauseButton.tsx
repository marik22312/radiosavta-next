import React from "react";

import Play from "./Button/Play.svg";
import Pause from "./Button/Pause.svg";
import LoadingAnimated from "./Button/LoadingAnimated.svg";
import styles from './PlayPauseButton.module.scss';

export const PlayPauseButton: React.FC<{isPlaying: boolean; isLoading: boolean, displayLoader?: boolean, onClick:() => void}> = (props) => {
  if(props.isLoading && props.displayLoader) {
    return <img src={LoadingAnimated} alt="test" width={150} height={150} className={styles.loadingCircle}/>;
  }
  if (props.isPlaying) {
    return <img src={Pause} alt="test" width={150} height={150} onClick={props.onClick}/>;
  }
  return <img src={Play} alt="test" width={150} height={150} onClick={props.onClick}/>;
};
