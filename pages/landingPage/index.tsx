import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Page } from "../../components/Page";
import { PlayPauseButton } from "../../components/PlayPauseButton/PlayPauseButton";

import style from "./landingPage.module.scss";

const LandingPage = () => {
  return (
    <Page title="עמוד נחיתה" showHeaderFooter={false}>
      <div className={style.LandingPageContainer}>
        <div className={style.LandingPageAbout}>
          <h1 className={style.landingPageTitle}>רדיו סבתא</h1>
          <h2 className={style.landingPageSubtitle}>קולקטיב רדיו אינטרנטי</h2>
          <h3 className={style.landingPageQuote}>כשהעגלה נוסעת, המלונים...</h3>
        </div>
        <div className={style.landingPagePlay}>
          <PlayPauseButton />
          <span className={style.landingPagePlaySubtitle}>לחצו לניגון</span>
        </div>
        <div className={style.LandingPageFooter}>
          <button className={style.landingPageFooterButton}>
            <FontAwesomeIcon
              className={style.footerButtonIcon}
              icon={faPlay as any}
            />{" "}
            כניסה לאתר
          </button>
        </div>
      </div>
    </Page>
  );
};

export default LandingPage;
