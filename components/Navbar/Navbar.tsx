import React, { useState, useEffect } from "react";

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
import { logNavbarClose, logFooterPlayerPlay, logNavbarOpen, logNavbarNavigation } from '../../api/Mixpanel.api';

interface NavBarProps {
  title: string;
  onOpen(): void;
  onClose(): void;
  width: number;
}

const MenuItem: React.FC<{url: string; title: string;}> = (props) => {
	const { pathname } = useRouter();
	return (
		<Link href={props.url}>
		<a onClick={() => logNavbarNavigation(props.url)}>{props.title}</a>
	  </Link>
	)
}

export const Navbar: React.FC<NavBarProps> = (props) => {
  const navbarWidth = props.width;
  const { toggleLive, isLive } = useLivePlayer();
  const { isPlaying, isStopped, isPaused, isLoading } = usePLayerState();
  const { pause, resume } = usePlayerControls()
  const { pathname } = useRouter();
  
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    document?.addEventListener('scroll', () => {
      setScrollPosition(window.scrollY);
    })
    return () => {
      document?.removeEventListener('scroll', () => {})
    }
  }, [])

  const toggleMenu = () => {
	  if (isOpen)  {
		  logNavbarClose();
		  close();
		return;
	  }

	  logNavbarOpen();
	  return open();
  };

  const togglePlay = () => {

	  if (isStopped || isLive) {
		logFooterPlayerPlay()
		  return logAndToggleLive();
		}
		if (isPaused) {
			return resume();
		}
		return pause();
	}
	
	const logAndToggleLive = () =>{
	  toggleLive()
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
        <div
			style={{
			width: navbarWidth
		}}>
			<MenuItem url="/" title="ראשי"/>
			<MenuItem url="/programs" title="תכניות"/>
			<MenuItem url="/archive" title="הבוידעם"/>
			<MenuItem url="/about" title="הסיפור שלנו"/>
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
          className={styles.titleWrapper + `${scrollPosition ? " " + styles.active : ''}`}
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
          <MenuItem url="/" title="ראשי" />
          <MenuItem url="/programs" title="תכניות" />
          <MenuItem url="/archive" title="הבוידעם" />
          <MenuItem url="/about" title="הסיפור שלנו" />
          <div className={styles.title}>
            {pathname !== '/' && <p>{props.title}</p>}
          </div>
		  <div className={styles.playPauseButton} onClick={() => togglePlay()}>
		  <PlayPauseButton isPlaying={isPlaying} isLoading={isLoading} displayLoader/>
			  {isPlaying && !isLive ? <BackToLive onClick={() => logAndToggleLive()}/> : null}
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
