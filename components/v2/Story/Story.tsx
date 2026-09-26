import React from "react";
import cn from "classnames";
import story from "../../../data/story.json";
import styles from "./Story.module.css";
import motion from "../motion.module.css";

// Content decided in MAR-39/MAR-40. The birth year is still to come; the
// photo asset is still to come too (a Cloudinary URL) — until then the frame
// shows the design's hatched placeholder.
const NAME = "יעל קרן";
const YEARS = "[שנה]–2014";
const PHOTO_URL: string | null = null;
const PULL_QUOTE = "הזרם הבלתי פוסק של מוזיקה ואהבה, כמו בסלון של סבתא.";
const PATREON_URL = "https://www.patreon.com/radiosavta/";

export const Story: React.FC = () => (
  <section
    id="story"
    className={cn(styles.story, motion.storyTimeline)}
    aria-labelledby="story-title"
  >
    <header className={styles.header}>
      <div className={cn(styles.eyebrow, motion.reveal)}>הסיפור שלנו</div>
      <h2 id="story-title" className={cn(styles.title, motion.bloom)}>
        לזכר {NAME}
      </h2>
    </header>

    <figure className={styles.figure}>
      <div className={cn(styles.frame, motion.develop)}>
        {PHOTO_URL ? (
          <img className={styles.photo} src={PHOTO_URL} alt={NAME} />
        ) : (
          <div className={styles.placeholder}>
            <svg
              className={styles.placeholderIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <circle cx="9" cy="10" r="2" />
              <path d="M21 16l-5-5-9 9" />
            </svg>
            <span>תמונה אישית</span>
          </div>
        )}
      </div>
      <figcaption className={cn(styles.caption, motion.develop)}>
        {NAME} ז״ל · {YEARS}
      </figcaption>
    </figure>

    <div className={styles.body}>
      <p className={cn(styles.lead, motion.reveal)}>{story.lead}</p>
      {story.paragraphs.map((paragraph) => (
        <p key={paragraph} className={cn(styles.paragraph, motion.reveal)}>
          {paragraph}
        </p>
      ))}
      {/* Wrapped: the reveal animation would override the link's hover filter. */}
      <div className={cn(styles.ctaWrap, motion.reveal)}>
        <a
          href={PATREON_URL}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cta}
        >
          <span>תמכו בנו ב-Patreon</span>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
          </svg>
        </a>
      </div>
      <div className={cn(styles.quoteBlock, motion.reveal)}>
        <div className={styles.divider} aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <blockquote className={styles.quote}>{PULL_QUOTE}</blockquote>
      </div>
    </div>
  </section>
);
