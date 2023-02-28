import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { useState } from "react";
import { PlayPauseButton } from "../../PlayPauseButton/PlayPauseButton";

import style from "./landingPage.module.scss";

enum LandingPageState {
  Initial,
  Active,
  Inactive,
}

const LandingPage = () => {
  const [pageStatus, setPageStatus] = useState<LandingPageState>(
    LandingPageState.Initial
  );
  return (
    <div
      className={classNames(
        style.landingPageContainer,
        {
          [style.initialLandingPageContainer]:
            pageStatus === LandingPageState.Initial,
        },
        {
          [style.inactiveLandingPageContainer]:
            pageStatus === LandingPageState.Active,
        },
        {
          [style.inactiveLandingPageContainer]:
            pageStatus === LandingPageState.Inactive,
        }
      )}
    >
      <div
        className={classNames(
          style.landingPageWrapper,
          {
            [style.initialLandingPage]: pageStatus === LandingPageState.Initial,
          },
          {
            [style.activeLandingPage]: pageStatus === LandingPageState.Active,
          },
          {
            [style.inactiveLandingPage]:
              pageStatus === LandingPageState.Inactive,
          }
        )}
      >
        <div className={style.LandingPageAbout}>
          <h1 className={style.landingPageTitle}>רדיו סבתא</h1>
          <h2 className={style.landingPageSubtitle}>קולקטיב רדיו אינטרנטי</h2>
          <h3 className={style.landingPageQuote}>כשהעגלה נוסעת, המלונים...</h3>
        </div>
        <div
          className={style.landingPagePlay}
          onClick={() => setPageStatus(LandingPageState.Active)}
        >
          <PlayPauseButton />
          <span className={style.landingPagePlaySubtitle}>לחצו לניגון</span>
        </div>
        <div className={style.LandingPageFooter}>
          <button
            className={style.landingPageFooterButton}
            onClick={() => setPageStatus(LandingPageState.Inactive)}
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

export default LandingPage;
