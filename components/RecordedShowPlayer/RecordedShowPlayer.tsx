import React from "react";
import style from "./RecordedShowsPlayer.module.scss";

import { usePlayerControls } from "../../hook/usePlayerControls";

import { usePLayerState } from "../../hook/usePlayerState";
import { PlayPauseButton } from "../PlayPauseButton/PlayPauseButton";
import { logPlayRecordedShow } from "../../api/Mixpanel.api";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
export interface RecordedShowPlayerProps {
  url: string;
  name: string;
  programName: string;
  recordingDate: string;
  backgroundImageUrl?: string;
  programId: number;
  source: 'HOMEPAGE' | 'PROGRAM_PAGE' | 'ARCHIVE';
  showId: string | number;
}

export const RecordedShowPlayer: React.FC<RecordedShowPlayerProps> = (
  props
) => {
  const { play, pause, resume } = usePlayerControls();
  const { isPlaying, title } = usePLayerState();

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
    logPlayRecordedShow({
      programName: props.programName,
      showName: props.name,
	  source: props.source,
	  programId: props.programId,
    });
    return play({
      title: props.name,
      url: props.url,
      programTitle: props.programName,
    });
  };

  const onShare = async () => {
	  const url = new URL(window.location.href)
	  const shareData = {
		  url: `${url.origin}/archive?showId=${props.showId}`,
		  text: `[${Intl.DateTimeFormat("he").format(new Date(props.recordingDate))}] ${props.programName} - ${props.name}`
	  }
	if(navigator?.canShare?.(shareData) && navigator.share) {
		return navigator.share(shareData)
	}

	return alert('Can Share!') // TODO
  }
  
  return (
    <div
      className={style.RecordedShowPlayer}
    >
      <div className={style.imageWrapper} style={{ backgroundImage: `url(${props.backgroundImageUrl})` }}>
        {props.backgroundImageUrl && <Image src={props.backgroundImageUrl} layout="fill" className={style.programImg} alt="" />}
      </div>
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
        <PlayPauseButton
          onClick={() => togglePlay()}
          isPlaying={isPlaying && title === props.name}
        />
      </div>
	  <button className={style.shareButtonWrapper} onClick={onShare}>
        <FontAwesomeIcon icon={(faShareAlt as IconDefinition)} size="2x" color="white" />
      </button>
    </div>
  );
};
