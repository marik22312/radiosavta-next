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
    if (navigator.share) {
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
const ShareModal: React.FC<ShareModalProps> = (props) => {
  return (
    <div>
      <Modal
        className={style.shareModal}
        isOpen={props.isOpen}
        onRequestClose={props.onRequestClose}
        contentLabel="Example Modal"
      >
        <div className={style.shareModalContent}>
          <h3 className={style.shareModalTitle}>{props.title}</h3>
          <div className={style.shareModalSocialWrapper}>
            <FacebookShareButton url={props.url} quote={props.shareableTitle}>
              <FacebookIcon size={40} />
            </FacebookShareButton>
            <WhatsappShareButton url={props.url} title={props.shareableTitle}>
              <WhatsappIcon size={40} />
            </WhatsappShareButton>
          </div>
          <input
            readOnly
            type="url"
            value={props.url}
            style={{ width: "100%", height: "40px", fontSize: "1rem" }}
          />
        </div>
      </Modal>
    </div>
  );
};
