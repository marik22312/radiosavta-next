import React, { useState } from "react";

import Image from "next/image";
import Link from "next/link";

import RoundLogo from "./logo_round.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";

import styles from "./Navbar.module.scss";
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

interface NavBarProps {
  title: string;
  onOpen(): void;
  onClose(): void;
  width: number;
}

export const Navbar: React.FC<NavBarProps> = (props) => {
  const navbarWidth = props.width;
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    isOpen ? close() : open();
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
          <Link href="/programs/211">
            <a>תכנית לבדיקה</a>
          </Link>
          <Link href="/archive">
            <a>הבוידעם</a>
          </Link>
          <Link href="/">
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
              <Image src={RoundLogo} width="100%" height="100%"/>
				</Link>
            </div>
            <div className={styles.menuBtn + `${isOpen ? " " + styles.open : ''}`} onClick={() => toggleMenu()}>
              <span></span>
              <span></span>
              <span></span>
              {/* <button onClick={() => toggleMenu()}>
                <FontAwesomeIcon
                  icon={isOpen ? faTimes : faBars}
                  size="2x"
                  color="white"
                /> */}
              {/* </button> */}
            </div>
          </div>
          <div className={styles.title}>
            <p>{props.title}</p>
          </div>
        </div>
      </div>
    </>
  );
};
