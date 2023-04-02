import React, { useState } from "react";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { PlayerWrapperState } from "../../../domain/Player";
import { PlayPauseButton } from "../../PlayPauseButton/PlayPauseButton";

import style from "./playerWrapper.module.scss";
import FooterPlayer from "../FooterPlayer";

const PlayerWrapper: React.FC = () => {
  const [pageStatus, setPageStatus] = useState<PlayerWrapperState>(
    PlayerWrapperState.Initial
  );
  return (
    <div
      className={classNames(
        style.playerWrapperContainer,
        {
          [style.initialPlayerWrapperContainer]:
            pageStatus === PlayerWrapperState.Initial,
        },
        {
          [style.inactivePlayerWrapperContainer]:
            pageStatus === PlayerWrapperState.Active,
        },
        {
          [style.inactivePlayerWrapperContainer]:
            pageStatus === PlayerWrapperState.Inactive,
        }
      )}
    >
      <div
        className={classNames(
          style.playerWrapperWrapper,
          {
            [style.initialPlayerWrapper]:
              pageStatus === PlayerWrapperState.Initial,
          },
          {
            [style.activePlayerWrapper]:
              pageStatus === PlayerWrapperState.Active,
          },
          {
            [style.inactivePlayerWrapper]:
              pageStatus === PlayerWrapperState.Inactive,
          }
        )}
      >
        <FooterPlayer state={pageStatus} />
        <div className={style.PlayerWrapperAbout}>
          <h1 className={style.playerWrapperTitle}>רדיו סבתא</h1>
          <h2 className={style.playerWrapperSubtitle}>קולקטיב רדיו אינטרנטי</h2>
          <h3 className={style.playerWrapperQuote}>כשהעגלה נוסעת, המלונים...</h3>
        </div>
        <div
          className={style.playerWrapperPlay}
          onClick={() => setPageStatus(PlayerWrapperState.Active)}
        >
          <PlayPauseButton />
          <span className={style.playerWrapperPlaySubtitle}>לחצו לניגון</span>
        </div>
        <div className={style.PlayerWrapperFooter}>
          <button
            className={style.playerWrapperFooterButton}
            onClick={() => setPageStatus(PlayerWrapperState.Inactive)}
          >
            <FontAwesomeIcon
              className={style.footerButtonIcon}
              icon={faPlay as any}
            />{" "}
            כניסה לאתר
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerWrapper;