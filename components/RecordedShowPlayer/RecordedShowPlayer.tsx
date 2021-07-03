import React, { useRef, useEffect } from "react";
import { useState } from "react";
import style from "./RecordedShowsPlayer.module.scss";

import { usePlayerControls } from '../../hook/usePlayerControls'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { usePLayerState } from '../../hook/usePlayerState';
import { PlayPauseButton } from '../PlayPauseButton/PlayPauseButton'
export interface RecordedShowPlayerProps {
  url: string;
  name: string;
  programName: string;
  recordingDate: string;
  backgroundImageUrl?: string;
}

enum PlayerStates {
  Playing = "PLAYING",
  Paused = "PAUSED",
}
export const RecordedShowPlayer: React.FC<RecordedShowPlayerProps> = (
  props
) => {
	const {play, stop} = usePlayerControls();
	const { isPlaying, title } = usePLayerState()

const togglePlay = () => {
	if (title === props.name) {
		return stop()
	}
		return play({
			title: props.name,
			url: props.url,
			programTitle: props.programName
		})

}

  return (
    <div
      className={style.RecordedShowPlayer}
        style={{ backgroundImage: `url(${props.backgroundImageUrl})` }}
    >
      <div className={style.titleWrapper}>
        <h5
          className={style.RecordedShowTitle}
          data-testid="recorded-show-title"
        >
          {props.name}
        </h5>
        <p data-testid="recorded-show-date" className={style.uploadedAt}>
          {Intl.DateTimeFormat("he").format(new Date(props.recordingDate))}
        </p>
      </div>
      <div className={style.controlsWrapper}>
			<PlayPauseButton onClick={() => togglePlay()} isPlaying={isPlaying && title === props.name}/>
      </div>
    </div>
  );
};
