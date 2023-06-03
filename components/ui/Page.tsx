/* eslint-disable @next/next/no-page-custom-font */
import React from "react";
import style from "./Page.module.scss";
import Link from "next/link";
import { logNavbarNavigation } from "../../api/Mixpanel.api";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { HOME_PAGE_URL } from '../../domain/Navigation';

export const Page: React.FC = ({
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
const MenuItem: React.FC<{ url: string; title: string }> = (props) => {
  const router = useRouter();
  return (
    <Link href={props.url}>
      <a
        onClick={() => logNavbarNavigation(props.url)}
        data-current={router.pathname === props.url}
      >
        {props.title}
      </a>
    </Link>
  );
};

export const Navbar: React.FC = () => {
  return (
    <div className={style.navbarWrapper}>
      <Image
        src={process.env.SITE_LOGO_URL!}
        alt="לוגו"
        height="89"
        width="70"
      />
      <MenuItem url={HOME_PAGE_URL} title="ראשי" />
      <MenuItem url="/programs" title="תכניות" />
      <MenuItem url="/about" title="אודות" />
      <MenuItem url="/join-us" title="הצטרפות" />
    </div>
  );
};
