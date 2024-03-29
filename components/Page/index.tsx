/* eslint-disable @next/next/google-font-display */
import React, { useState } from "react";

import Head from "next/head";
import Script from "next/script";

import { Navbar } from "../Navbar/Navbar";

import styles from "./Page.module.scss";
import { Footer } from "../Footer/Footer";

interface PageProps {
  title: string;
  previewImage?: string;
}
export const Page: React.FC<PageProps> = ({
  children,
  title,
  previewImage,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navbarWidth = 215;
  return (
    <>
      <Script
        id="pixel-script-poptin"
        src="https://cdn.popt.in/pixel.js?id=a87d12a175b8f"
        async={true}
      ></Script>
      <Head>
        <title>רדיוסבתא - {title}</title>
        <meta name="description" content="קולקטיב רדיו אינטרנט" />
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="height=device-height, 
                      width=device-width, initial-scale=1.0, 
                      minimum-scale=1.0, maximum-scale=1.0, 
                      user-scalable=no, target-densitydpi=device-dpi"
        />

        <meta property="og:title" content={title} />
        <meta
          property="og:description"
          content="Radiosavta - An Online Internet Radio"
        />
        <meta
          property="og:image"
          content={
            previewImage ||
            "https://res.cloudinary.com/marik-shnitman/image/upload/f_auto,dpr_auto,q_auto/v1637258645/radiosavta/assets/ogImage.jpg"
          }
        />

        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Karantina"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre"
          rel="stylesheet"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo"
          rel="stylesheet"
        />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
      </Head>
      <Navbar
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        title={title}
        width={navbarWidth}
      />
      <div className={styles.pageContent}>
        <div className={styles.pageWrapper}>
          {children}
          <Footer />
        </div>
      </div>
    </>
  );
};
