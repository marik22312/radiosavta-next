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

  const pageIsActive = pageStatus === PlayerWrapperState.Active;
  const pageIsInactive = pageStatus === PlayerWrapperState.Inactive;
  const pageIsInitial = pageStatus === PlayerWrapperState.Initial;

  return (
    <div
      className={classNames(
        style.playerWrapperContainer,
        {
          [style.initialPlayerWrapperContainer]:
          pageIsInitial,
        },
        {
          [style.inactivePlayerWrapperContainer]:
          pageIsActive,
        },
        {
          [style.inactivePlayerWrapperContainer]:
          pageIsInactive,
        }
      )}
    >
      <div
        className={classNames(
          style.playerWrapperWrapper,
          {
            [style.initialPlayerWrapper]:
              pageIsInitial,
          },
          {
            [style.activePlayerWrapper]:
            pageIsActive,
          },
          {
            [style.inactivePlayerWrapper]:
            pageIsInactive,
          }
        )}
      >
        {/* <FooterPlayer state={pageStatus} /> */}
        <div className={classNames(style.PlayerWrapperAbout, {[style.hide]: pageIsInactive })}>
          <h1 className={style.playerWrapperTitle}>רדיו סבתא</h1>
          <h2 className={style.playerWrapperSubtitle}>קולקטיב רדיו אינטרנטי</h2>
          <h3 className={style.playerWrapperQuote}>כשהעגלה נוסעת, המלונים...</h3>
        </div>
        <div
          className={classNames(style.playerWrapperPlay, {[style.hide]: pageIsInactive })}
          onClick={() => setPageStatus(PlayerWrapperState.Active)}
        >
          <PlayPauseButton />
          <span className={style.playerWrapperPlaySubtitle}>לחצו לניגון</span>
        </div>
        <div className={style.PlayerWrapperFooter}>
          <button
            className={classNames(style.playerWrapperFooterButton, {[style.hide]: pageIsInactive })}
            onClick={() => setPageStatus(PlayerWrapperState.Inactive)}
          >
            <FontAwesomeIcon
              className={style.footerButtonIcon}
              icon={faPlay as any}
            />{" "}
            כניסה לאתר
          </button>
        </div>
        <button
          className={classNames(style.playerWrapperOpenButton, {[style.hide]: !pageIsInactive })}
          onClick={() => setPageStatus(PlayerWrapperState.Active)}
        >
          <FontAwesomeIcon className={style.footerOpenIcon} icon={faPlay as any} />
        </button>
      </div>
    </div>
  );
};

export default PlayerWrapper;