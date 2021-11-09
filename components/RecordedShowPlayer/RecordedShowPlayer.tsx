import React, { useRef, useEffect } from "react";
import { useState } from "react";
import style from "./RecordedShowsPlayer.module.scss";

import { usePlayerControls } from '../../hook/usePlayerControls'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { usePLayerState } from '../../hook/usePlayerState';
import { PlayPauseButton } from '../PlayPauseButton/PlayPauseButton'
import { resourceUsage } from 'process';
import { resourceLimits } from 'worker_threads';
import { shallowEqualObjects } from 'react-query/types/core/utils';
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
	const {play, pause, resume} = usePlayerControls();
	const { isPlaying, title } = usePLayerState()

const togglePlay = () => {
	if (title === props.name) {
		if (isPlaying) {
			// TODO Add log of pause recorded show
			// 1. show name
			// 2. program title
			return pause();
		}
		return resume();
	}
	// TODO Add log of play recorded show
	// 1. show name
	// 2. program title
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
