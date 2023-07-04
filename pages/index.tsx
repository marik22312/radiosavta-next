import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Play from "../components/PlayPauseButton/Button/Play.svg";
import styles from "./lp/LandingPage.module.scss";
import { useLivePlayer } from "../hook/useLivePlayer";
import { useNextCssRemovalPrevention } from "@madeinhaus/nextjs-page-transition";
import { HOME_PAGE_URL } from "../domain/Navigation";
import { NextSeo } from "next-seo";
import { Seo } from "../components/seo/seo";
import LoadingAnimated from "../components/PlayPauseButton/Button/LoadingAnimated.svg";
import { Origins, logLandingPagePressOnEnterSite, logPlayLive, logNavbarNavigation } from '../api/Mixpanel.api';

const LandingPage = () => {
  useNextCssRemovalPrevention();
  const { toggleLive } = useLivePlayer();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
	router.prefetch(HOME_PAGE_URL);
  }, [router])

  const playLiveAndNavigateHome = async () => {
    setIsLoading(true);
	logPlayLive({
		origin: Origins.LANDING_PAGE
	});
    await toggleLive();
    router.push(HOME_PAGE_URL, undefined, { shallow: true });
  };

  return (
    <>
      <Seo />
      <motion.main
        exit={{
          top: "100%",
          opacity: 0,
        }}
        transition={{
          duration: 0.75,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "#000000",
          color: "#ffffff",
          overflow: "hidden",
        }}
      >
        <div className={styles.landingPageWrapper}>
          <div className={styles.PlayerWrapperAbout}>
            <h1 className={styles.playerWrapperTitle}>רדיו סבתא</h1>
            <h2 className={styles.playerWrapperSubtitle}>
              קולקטיב רדיו אינטרנטי
            </h2>
            <h3 className={styles.playerWrapperQuote}>
              כשהעגלה נוסעת, המלונים מסתדרים בארגזים
            </h3>
          </div>
          <div>
            <div
              className={styles.playWrapper}
              onClick={() => playLiveAndNavigateHome()}
            >
              <img src={isLoading ? LoadingAnimated : Play} alt="Play Button" />
              <span>לחצו לניגון</span>
            </div>
          </div>
          <div className={styles.footerButton} onClick={() => {
			logLandingPagePressOnEnterSite();
			logNavbarNavigation({
				currentUrl: router.pathname,
				targetUrl: HOME_PAGE_URL,
				url: HOME_PAGE_URL
			})
			router.push(HOME_PAGE_URL);
		  }}>
              <span>
                <FontAwesomeIcon
                  style={{ transform: "rotate(180deg)" }}
                  icon={faPlay as any}
                />{" "}
                כניסה לאתר
              </span>
          </div>
        </div>
      </motion.main>
    </>
  );
};

export default LandingPage;
