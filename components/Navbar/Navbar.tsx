import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import RoundLogo from "./logo_round.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

import styles from "./Navbar.module.scss";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { BASE_IMAGE, BASE_IMAGE_ICON } from '../../config/images';
import { PlayPauseButton } from '../PlayPauseButton/PlayPauseButton';
import { usePLayerState } from '../../hook/usePlayerState';
import { useLivePlayer } from '../../hook/useLivePlayer';
import { usePlayerControls } from '../../hook/usePlayerControls';

import { useRouter } from 'next/router'

interface NavBarProps {
  title: string;
  onOpen(): void;
  onClose(): void;
  width: number;
}

export const Navbar: React.FC<NavBarProps> = (props) => {
  const navbarWidth = props.width;
  const { toggleLive, isLive } = useLivePlayer();
  const { isPlaying, isStopped, isPaused, isLoading } = usePLayerState();
  const { pause, resume } = usePlayerControls()
  const { pathname } = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    isOpen ? close() : open();
  };

  const togglePlay = () => {
    if(!isLoading) {
      if (isStopped || isLive) {
        return toggleLive();
      }
      if (isPaused) {
        return resume();
      }
      return pause();
    }
  }

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
        <div className={styles.menuWrapper}
        style={{
          width: navbarWidth
        }}>
          <Link href="/">
            <a>ראשי</a>
          </Link>
          <Link href="/programs">
            <a>תכניות</a>
          </Link>
          <Link href="/archive">
            <a>הבוידעם</a>
          </Link>
          <Link href="/about">
            <a>הסיפור שלנו</a>
          </Link>
        </div>
        <div className={styles.socialsWrapper}
        style={{
          width: navbarWidth
        }}>
          <a
            className={styles.socialLink}
            target="_blank"
            href="https://www.facebook.com/radiosavta"
			rel="noreferrer noopener"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" color="white" />
          </a>
          <a
            className={styles.socialLink}
            href="mailto:radiosavta@gmail.com"
			rel="noreferrer noopener"
          >
            <FontAwesomeIcon icon={faEnvelope} size="2x" color="white" />
          </a>
          <a
            className={styles.socialLink}
            target="_blank"
            href="https://www.instagram.com/radiosavta"
			rel="noreferrer noopener"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" color="white" />
          </a>
        </div>
      </div>
      <div
        className={styles.mainContent}
        style={{
          marginRight: !isOpen ? 0 : 215,
        }}
      >
        <div
          className={styles.titleWrapper}
          style={{
            marginRight: !isOpen ? 0 : 215,
          }}
        >
          <div className={styles.navbarHead}>
            <div className={styles.logo}>
				<Link href="/">
              <img src={`${BASE_IMAGE_ICON}radiosavta/logo_head`} width="100%" height="100%"/>
				</Link>
            </div>
            <div className={styles.menuBtn + `${isOpen ? " " + styles.open : ''}`} onClick={() => toggleMenu()}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div className={styles.title}>
            {pathname !== '/' && <p>{props.title}</p>}
          </div>
		  <div className={styles.playPauseButton} onClick={() => togglePlay()}>
		  <PlayPauseButton isPlaying={isPlaying} isLoading={isLoading}/>
			  {isPlaying && !isLive ? <BackToLive onClick={() => toggleLive()}/> : null}
		  </div>
        </div>
      </div>
    </>
  );
};

const BackToLive: React.FC<{onClick?: () => void}> = (props) => {
	return (
		<div className={styles.backToLive} onClick={props.onClick}>בחזרה לשידור חי</div>
	)
}
