import React, { useState } from "react";
import { ShareModal } from '../ShareModal/ShareModal';

import { usePlayerControls } from "../../hook/usePlayerControls";

import { usePLayerState } from "../../hook/usePlayerState";
import { PlayPauseButton } from "../PlayPauseButton/PlayPauseButton";
import {
	logPlayRecordedShow,
	logShareRecordedShow,
} from "../../api/Mixpanel.api";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import style from "./RecordedShowsPlayer.module.scss";
export interface RecordedShowPlayerProps {
  url: string;
  name: string;
  programName: string;
  backgroundImageUrl?: string;
  programId: number;
  source: "HOMEPAGE" | "PROGRAM_PAGE" | "ARCHIVE";
  showId: string | number;
}

export const RecordedShowPlayer: React.FC<RecordedShowPlayerProps> = (
  props
) => {
  const { play, pause, resume } = usePlayerControls();
  const { isPlaying, title } = usePLayerState();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const togglePlay = () => {
    if (title === props.name) {
      if (isPlaying) {
        return pause();
      }
      return resume();
    }
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
	  trackId: props.showId,
    });
  };

  const logClickShare = (type: "NATIVE" | "CUSTOM") => {
    logShareRecordedShow({
      programName: props.programName,
      programId: props.programId,
      showName: props.name,
      showId: props.showId as number,
      source: props.source,
      type,
    });
  };

  const onShare = async () => {
    if (typeof window === "undefined") {
      return null;
    }

    const url = new URL(window.location.href);
    const shareData = {
      url: `${url.origin}/archive?showId=${props.showId}`,
      text: `${props.programName} - ${props.name}`,
    };
    if (navigator?.canShare?.(shareData) && navigator.share) {
      try {
        const shareRes = await navigator.share(shareData);
        logClickShare("NATIVE");
        return shareRes;
      } catch (error: any) {
        console.error("Navigation failed", error.message);
      }
    }

    logClickShare("CUSTOM");
    return setIsShareModalOpen(true);
  };

  return (
    <div className={style.RecordedShowPlayer}>
      <div
        className={style.imageWrapper}
        style={{ backgroundImage: `url(${props.backgroundImageUrl})` }}
      >
        {props.backgroundImageUrl && (
          <Image
            src={props.backgroundImageUrl}
            layout="fill"
            className={style.programImg}
            alt=""
          />
        )}
      </div>
      <div className={style.titleWrapper}>
        <h5
          className={style.RecordedShowTitle}
          data-testid="recorded-show-title"
        >
          {props.name}
        </h5>
      </div>
      <div className={style.controlsWrapper}>
        <PlayPauseButton
          onClick={() => togglePlay()}
          isPlaying={isPlaying && title === props.name}
        />
      </div>
      <button className={style.shareButtonWrapper} onClick={onShare}>
        <FontAwesomeIcon
          icon={faShareAlt as IconDefinition}
          size="2x"
          color="white"
        />
      </button>
      <ShareModal
        onRequestClose={() => setIsShareModalOpen(false)}
        isOpen={isShareModalOpen}
        title={`שתפו את ${props.name}`}
        shareableTitle={`${props.programName} - ${props.name} האזינו ברדיוסבתא!`}
        url={
          typeof window !== "undefined" &&
          `${new URL(window.location.href).origin}/archive?showId=${
            props.showId
          }` || ''
        }
      />
    </div>
  );
};


