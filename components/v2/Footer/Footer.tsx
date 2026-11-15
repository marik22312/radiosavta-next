import React from "react";
import Image from "next/image";
import cn from "classnames";
import logo from "../../../public/assets/logo_round.png";
import styles from "./Footer.module.css";
import motion from "../motion.module.css";
import { onSectionLinkClick } from "../scrollToSection";

// "#top" is the site header, at the top of the page by the hero's play
// button.
const LINKS = [
  { href: "#story", label: "הסיפור" },
  { href: "#gallery", label: "מהאלבום" },
  { href: "#top", label: "האזנה" },
];

// Page footer (MAR-33). Its bottom padding keeps the links clear of the
// floating mini-player dock (MAR-34).
export const Footer: React.FC = () => (
  <footer className={cn(styles.footer, motion.reveal)}>
    {/* width/height = the desktop size, so next/image serves a 1x/2x pair
        near 120px instead of the full 847px source. */}
    <Image
      className={styles.logo}
      src={logo}
      width={120}
      height={120}
      alt="לוגו רדיו סבתא"
    />
    <div className={styles.tagline}>תקשיבו לסבתא.</div>
    <div className={styles.place}>רדיו סבתא · מצפה רמון</div>
    <nav aria-label="ניווט תחתון" className={styles.nav}>
      {LINKS.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={styles.link}
          onClick={onSectionLinkClick}
        >
          {label}
        </a>
      ))}
    </nav>
  </footer>
);
