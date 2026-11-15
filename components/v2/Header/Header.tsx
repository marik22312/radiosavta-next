import React, { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import cn from "classnames";
import { logNavbarNavigation } from "../../../api/Mixpanel.api";
import { DESKTOP_MIN_WIDTH } from "../dockGeometry";
import logo from "../../../public/assets/logo_round.png";
import styles from "./Header.module.css";

const STORY = "#story";
const GALLERY = "#gallery";
const LIVE = "#live";

// Site header for the redesign (MAR-29). Part of the page flow, not sticky:
// once it scrolls away, navigation is carried by the dock and progress bar.
// On mobile the hamburger opens a full-screen menu with the same links.
export const Header: React.FC = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  // Hash to jump to once the menu has closed and the page scrolls again.
  const pendingHash = useRef<string | null>(null);

  const logNav = (href: string) =>
    logNavbarNavigation({
      url: href,
      currentUrl: router.asPath,
      targetUrl: href,
    });

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    menuButtonRef.current?.focus({ preventScroll: true });
  }, []);

  const onMenuLink = (event: React.MouseEvent, href: string) => {
    logNav(href);
    event.preventDefault();
    pendingHash.current = href;
    setMenuOpen(false);
  };

  // While open: lock page scroll, close on Esc, keep Tab inside the menu,
  // and close if the viewport grows to the desktop layout (no hamburger).
  useEffect(() => {
    if (!menuOpen) return;

    const root = document.documentElement;
    const previousOverflow = root.style.overflow;
    root.style.overflow = "hidden";
    closeButtonRef.current?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !menuRef.current) return;
      const focusable = menuRef.current.querySelectorAll<HTMLElement>("a, button");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia(`(min-width: ${DESKTOP_MIN_WIDTH}px)`);
    const onBreakpoint = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      root.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen, closeMenu]);

  // After a menu link closes the menu, jump to its section. Runs after the
  // effect above has unlocked scrolling.
  useEffect(() => {
    if (menuOpen || !pendingHash.current) return;
    const hash = pendingHash.current;
    pendingHash.current = null;
    if (window.location.hash === hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    } else {
      window.location.hash = hash;
    }
  }, [menuOpen]);

  return (
    <header id="top" className={styles.header}>
      <a href="#top" className={styles.brand} onClick={() => logNav("#top")}>
        <Image className={styles.logo} src={logo} alt="" />
        <span className={styles.wordmark}>
          <span className={styles.name}>רדיו סבתא</span>
          <span className={styles.place}>מצפה רמון</span>
        </span>
      </a>

      <nav aria-label="ניווט ראשי" className={styles.nav}>
        <a href={STORY} className={styles.link} onClick={() => logNav(STORY)}>
          הסיפור
        </a>
        <a href={GALLERY} className={styles.link} onClick={() => logNav(GALLERY)}>
          מהאלבום
        </a>
        <a
          href={LIVE}
          className={cn(styles.link, styles.live)}
          onClick={() => logNav(LIVE)}
        >
          <span className={styles.liveDot} />
          <span>בשידור חי</span>
        </a>
      </nav>

      <div className={styles.mobileActions}>
        <a
          href={LIVE}
          className={cn(styles.link, styles.live)}
          onClick={() => logNav(LIVE)}
          aria-label="בשידור חי"
        >
          <span className={styles.liveDot} />
          <span aria-hidden="true">חי</span>
        </a>
        <button
          ref={menuButtonRef}
          type="button"
          className={styles.iconButton}
          onClick={() => setMenuOpen(true)}
          aria-label="תפריט"
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      <div
        id="site-menu"
        ref={menuRef}
        className={cn(styles.menu, { [styles.menuOpen]: menuOpen })}
        role="dialog"
        aria-modal="true"
        aria-label="תפריט"
        aria-hidden={!menuOpen}
      >
        <div className={styles.menuBar}>
          <span className={styles.brand}>
            <Image className={styles.logo} src={logo} alt="" />
            <span className={styles.name}>רדיו סבתא</span>
          </span>
          <button
            ref={closeButtonRef}
            type="button"
            className={styles.iconButton}
            onClick={closeMenu}
            aria-label="סגירת התפריט"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="ניווט ראשי" className={styles.menuNav}>
          <a
            href={STORY}
            className={styles.menuLink}
            onClick={(event) => onMenuLink(event, STORY)}
          >
            הסיפור
          </a>
          <a
            href={GALLERY}
            className={styles.menuLink}
            onClick={(event) => onMenuLink(event, GALLERY)}
          >
            מהאלבום
          </a>
          <a
            href={LIVE}
            className={cn(styles.menuLink, styles.menuLive)}
            onClick={(event) => onMenuLink(event, LIVE)}
          >
            <span className={styles.liveDot} />
            <span>בשידור חי</span>
          </a>
        </nav>
      </div>
    </header>
  );
};
