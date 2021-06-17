import React, { useState } from "react";

import Head from 'next/head'

import { Navbar } from "../Navbar/Navbar";

import styles from "./Page.module.scss";
import { FooterPlayer } from '../FooterPlayer/FooterPlayer';

interface PageProps {
	title: string;
}
export const Page: React.FC<PageProps> = ({ children, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
	<Head>
		<title>רדיוסבתא - {title}</title>
		<meta name="description" content="An Internet Radio Collective, Come And Listen!" />
        <link rel="icon" href="/favicon.ico" />

		<meta property="og:title" content={title} />
		<meta property="og:description" content="Radiosavta - An Online Internet Radio" />
	</Head>
      <Navbar onClose={() => setIsOpen(false)} onOpen={() => setIsOpen(true)} title={title}/>
      <div
        style={{
          marginRight: !isOpen
            ? "var(--navbar-width)"
            : "calc(215px + var(--navbar-width))",
        }}
        className={styles.pageContent}
      >
        {children}
      </div>
    </>
  );
};
