import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import Play from "../components/PlayPauseButton/Button/Play.svg";
import styles from "./lp/landingPage.module.scss";

const LandingPage = () => {
  const router = useRouter();

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
          <Link href="/">
            <div className={styles.playWrapper}>
              <img src={Play} alt="Play Button" />
              <span>לחצו לניגון</span>
            </div>
          </Link>
        </div>
        <div className={styles.footerButton}>
          <Link href="/">
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
