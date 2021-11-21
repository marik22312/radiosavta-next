import React from "react";

import Play from "./Button/Play.svg";
import Pause from "./Button/Pause.svg";
import LoadingAnimated from "./Button/LoadingAnimated.svg";
import { usePLayerState } from "../../hook/usePlayerState";

export const PlayPauseButton: React.FC<{isPlaying: boolean; isLoading: boolean}> = (props) => {
  if(props.isLoading) {
    return <img src={LoadingAnimated} alt="test" width={150} height={150} />;
  }
  if (props.isPlaying) {
    return <img src={Pause} alt="test" width={150} height={150} />;
  }
  return <img src={Play} alt="test" width={150} height={150} />;
};
