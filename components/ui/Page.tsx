/* eslint-disable @next/next/no-page-custom-font */
import React from "react";
import style from "./Page.module.scss";
import Head from "next/head";

export const Page: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <>
      <Head>
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo&display=optional"
          rel="stylesheet"
        />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        {/* <script
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
        /> */}
      </Head>
      <div className={style.responsivePage}>
        <div className={style.pageWrapper}>
          {children}
        </div>
      </div>
    </>
  );
};
