import React, { useState, useEffect } from "react";

import Link from "next/link";

import styles from "./Navbar.module.scss";
import { BASE_IMAGE_ICON } from "../../config/images";
import { useLivePlayer } from "../../hook/useLivePlayer";

import { useRouter } from "next/router";
import {
  logNavbarClose,
  logFooterPlayerPlay,
  logNavbarOpen,
  logNavbarNavigation,
} from "../../api/Mixpanel.api";
import { usePlayerState } from "../../providers/PlayerProvider/usePlayerState";
import { usePlayerControls } from "../../providers/PlayerProvider/usePlayerControls";

interface NavBarProps {
  title: string;
  onOpen(): void;
  onClose(): void;
  width: number;
}

const MenuItem: React.FC<{ url: string; title: string }> = (props) => {
  return (
    <Link href={props.url}>
      <a onClick={() => logNavbarNavigation(props.url)}>{props.title}</a>
    </Link>
  );
};

export const Navbar: React.FC<NavBarProps> = (props) => {
  const navbarWidth = props.width;
  const { toggleLive, isLive } = useLivePlayer();
  const { isStopped, isPaused } = usePlayerState();
  const { pause, resume } = usePlayerControls();

  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    document?.addEventListener("scroll", () => {
      setScrollPosition(window.scrollY);
    });
    return () => {
      document?.removeEventListener("scroll", () => {});
    };
  }, []);

  const toggleMenu = () => {
    if (isOpen) {
      logNavbarClose();
      close();
      return;
    }

    logNavbarOpen();
    return open();
  };

  const togglePlay = () => {
    if (isStopped || isLive) {
      logFooterPlayerPlay();
      return logAndToggleLive();
    }
    if (isPaused) {
      return resume();
    }
    return pause();
  };

  const logAndToggleLive = () => {
    toggleLive();
  };

  const open = () => {
    setIsOpen(true);
    props.onOpen();
  };
  const close = () => {
    setIsOpen(false);
    props.onClose();
  };

  return (
    <>
      <div
        className={styles.sidenav}
        style={{
          width: !isOpen ? 0 : navbarWidth,
        }}
      >
        <div
          style={{
            width: navbarWidth,
          }}
        >
          <MenuItem url="/" title="????????" />
          <MenuItem url="/programs" title="????????????" />
          <MenuItem url="/archive" title="??????????????" />
          <MenuItem url="/about" title="???????????? ????????" />
        </div>
      </div>
      <div
        className={styles.mainContent}
        style={{
          marginRight: !isOpen ? 0 : 215,
        }}
      >
        <div
          className={
            styles.titleWrapper + `${scrollPosition ? " " + styles.active : ""}`
          }
        >
          <div className={styles.navbarHead}>
            <div className={styles.logo}>
              <Link href="/">
                <img
                  src={`${BASE_IMAGE_ICON}radiosavta/logo_head`}
                  width="100%"
                  height="100%"
                />
              </Link>
            </div>
            <div
              style={{
                marginRight: !isOpen ? 0 : 215,
              }}
              className={styles.menuBtn + `${isOpen ? " " + styles.open : ""}`}
              onClick={() => toggleMenu()}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <MenuItem url="/" title="????????" />
          <MenuItem url="/programs" title="????????????" />
          <MenuItem url="/archive" title="??????????????" />
          <MenuItem url="/about" title="???????????? ????????" />
        </div>
      </div>
    </>
  );
};

const BackToLive: React.FC<{ onClick?: () => void }> = (props) => {
  return (
    <div className={styles.backToLive} onClick={props.onClick}>
      ?????????? ???????????? ????
    </div>
  );
};
