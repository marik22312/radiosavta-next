import React, { useState } from "react";
import style from "./RecordedShowsPlayer.module.scss";

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
import Modal from "react-modal";
import {
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceShareButton,
} from "react-share";
import { Title } from "../Typography/Title";
import { programParser } from "../../parsers/Programs.parser";
export interface RecordedShowPlayerProps {
  url: string;
  name: string;
  programName: string;
  recordingDate: string;
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
      text: `[${Intl.DateTimeFormat("he").format(
        new Date(props.recordingDate)
      )}] ${props.programName} - ${props.name}`,
    };
    if (navigator?.canShare?.(shareData) && navigator.share) {
      try {
        const shareRes = await navigator.share(shareData);
        logClickShare("NATIVE");
        return shareRes;
      } catch (error) {
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

// Modal.setAppElement('#yourAppElement');

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
