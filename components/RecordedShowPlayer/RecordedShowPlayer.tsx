import React, { useState } from "react";
import style from "./RecordedShowsPlayer.module.scss";

import { usePlayerControls as usePlayerControlsV2 } from "../../providers/PlayerProvider/usePlayerControls";

import { PlayPauseButton } from "../PlayPauseButton/PlayPauseButton";
import {
  logPlayRecordedShow,
  logShareRecordedShow,
} from "../../api/Mixpanel.api";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareAlt } from "@fortawesome/free-solid-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import Modal from "react-modal";
import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import { usePlayerState } from "../../providers/PlayerProvider/usePlayerState";
import { useShare } from "../../hook/useShare";
import { ShareModal } from '../ShareModal/ShareModal';
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
  const { playTrack, pause, resume } = usePlayerControlsV2();
  const { isPlaying, songTitle } = usePlayerState();
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const onShareSuccess = () => {
    logClickShare("NATIVE");
  };
  const onShareFailed = () => {
    logClickShare("CUSTOM");
    setIsShareModalOpen(true);
  };

  const { share } = useShare({
    onError: onShareFailed,
    onSuccess: onShareSuccess,
  });

  const togglePlay = () => {
    if (songTitle === props.name) {
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
    return playTrack({
      audioUrl: props.url,
      title: props.name,
      artist: props.programName,
      imageUrl: props.backgroundImageUrl || "",
	  metaData: {
		  programId: props.programId,
		  recordedShowId: props.showId,
	  }
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
    const url = new URL(window.location.href);
    const shareData = {
      url: `${url.origin}/archive?showId=${props.showId}`,
      text: `${props.programName} - ${props.name}`,
    };
    share(shareData);
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
          isPlaying={isPlaying && songTitle === props.name}
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
          (typeof window !== "undefined" &&
            `${new URL(window.location.href).origin}/archive?showId=${
              props.showId
            }`) ||
          ""
        }
      />
    </div>
  );
};

interface ShareType {
  FACEBOOK: "FACEBOOK";
  WHATSAPP: "WHATSAPP";
}
interface ShareModalProps {
  isOpen: boolean;
  title: string;
  shareableTitle: string;
  url: string;
  onRequestClose?: () => void;
  onBeforeSave?: (type: ShareType) => void;
}