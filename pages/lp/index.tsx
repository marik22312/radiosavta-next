import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Play from "../../components/PlayPauseButton/Button/Play.svg";
import styles from "./LandingPage.module.scss";
import { useLivePlayer } from "../../hook/useLivePlayer";
import { useNextCssRemovalPrevention } from "@madeinhaus/nextjs-page-transition";

const LandingPage = () => {
  useNextCssRemovalPrevention();
  const { toggleLive } = useLivePlayer();
  const router = useRouter();

  const playLiveAndNavigateHome = async () => {
    await toggleLive();
    router.push("/", undefined, { shallow: true });
  };

  return (
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
            כשהעגלה נוסעת, המלונים...
          </h3>
        </div>
        <div>
          {/* <Link passHref href={{ pathname: "/", query: { playing: true } }}> */}
          {/* <Link passHref href="/"> */}
          <div
            className={styles.playWrapper}
            onClick={() => playLiveAndNavigateHome()}
          >
            <img src={Play} alt="Play Button" />
            <span>לחצו לניגון</span>
          </div>
          {/* </Link> */}
        </div>
        <div className={styles.footerButton}>
          <Link passHref href="/">
            <span>
              <FontAwesomeIcon
                style={{ transform: "rotate(180deg)" }}
                icon={faPlay as any}
              />{" "}
              כניסה לאתר
            </span>
          </Link>
        </div>
      </div>
    </motion.main>
  );
};

export default LandingPage;
