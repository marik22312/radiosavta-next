import React, { useState } from "react";

import Head from 'next/head'

import { Navbar } from "../Navbar/Navbar";

import styles from "./Page.module.scss";
import { FooterPlayer } from '../FooterPlayer/FooterPlayer';

interface PageProps {
	title: string;
	previewImage?: string
}
export const Page: React.FC<PageProps> = ({ children, title, previewImage }) => {
  const [isOpen, setIsOpen] = useState(false);
  console.log('image', previewImage)
  return (
    <>
	<Head>
		<title>רדיוסבתא - {title}</title>
		<meta name="description" content="קולקטיב רדיו אינטרנט" />
        <link rel="icon" href="/favicon.ico" />

		<meta property="og:title" content={title} />
		<meta property="og:description" content="Radiosavta - An Online Internet Radio" />
		{previewImage && <meta property="og:image" content={previewImage} />}
	</Head>
      <Navbar onClose={() => setIsOpen(false)} onOpen={() => setIsOpen(true)} title={title}/>
      <div
        style={{
          marginRight: "auto",
          width: "calc(100% - var(--navbar-width))",
          transform: !isOpen ? "" : "translateX(-215px)"
        }}
        className={styles.pageContent}
      >
        {children}
      </div>
    </>
  );
};
