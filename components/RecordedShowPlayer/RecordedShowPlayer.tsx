import React, { useRef, useEffect } from "react";
import { useState } from "react";
import style from "./RecordedShowsPlayer.module.scss";

import { usePlayerControls } from '../../hook/usePlayerControls'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause } from "@fortawesome/free-solid-svg-icons";
import { usePLayerState } from '../../hook/usePlayerState';

export interface RecordedShowPlayerProps {
  url: string;
  name: string;
  recordingDate: string;
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

  const audioRef = useRef();
  const [playerState, setPlayerState] = useState<PlayerStates>(
    PlayerStates.Paused
  );
  const [currentTime, setCurrentTime] = useState(0);

const togglePlay = () => {
	if (!isPlaying) {
		return play({
			title: props.name,
			url: props.url
		})
	}

	if (title === props.name) {
		return stop()
	}
}

  return (
    <div
      className={style.RecordedShowPlayer}
      //   style={{ backgroundImage: `url(${props.backgroundImage})` }}
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
        <button
          className={style.playPauseBtn}
          onClick={() => togglePlay()}
          data-testid="play-pause-button"
        >
          {isPlaying && title === props.name ? (
			  <FontAwesomeIcon icon={faPause} size="2x" color="#ffffff" />
			  ) : (
				  <FontAwesomeIcon icon={faPlay} size="2x" color="#ffffff"/>
          )}
        </button>
        {/* <input
          min={0}
          max={audioRef.current.duration || 100}
          value={audioRef.current.currentTime}
          type="range"
          className={style.progressBar}
          onChange={(e) => debouncedSetTime(parseInt(e.target.value))}
        /> */}
        <span className={style.duration}>
          {new Date(currentTime * 1000).toISOString().substr(14, 6)}
        </span>
      </div>
    </div>
  );
};
