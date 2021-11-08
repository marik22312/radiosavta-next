import React from "react";

import Play from "./Button/Play.svg";
import Pause from "./Button/Pause.svg";
import { usePLayerState } from "../../hook/usePlayerState";

export const PlayPauseButton: React.FC<{onClick?():void; isPlaying: boolean}> = (props) => {

  if (props.isPlaying) {
    return <img src={Pause} onClick={props.onClick}alt="test" width={150} height={150} />;
  }
  return <img src={Play} onClick={props.onClick}alt="test" width={150} height={150} />;
};
