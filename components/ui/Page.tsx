/* eslint-disable @next/next/no-page-custom-font */
import React from "react";
import style from "./Page.module.scss";
import Link from "next/link";
import { logNavbarNavigation } from "../../api/Mixpanel.api";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";

interface PageProps {
  hideNavbar?: boolean;
  children: React.ReactNode;
}

export const Page = (props: PageProps) => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Heebo&display=optional"
          rel="stylesheet"
        />
      </Head>
      <div className={style.responsivePage}>
        <div className={style.pageWrapper}>
          {!props.hideNavbar && <Navbar />}
          {props.children}
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

const Navbar: React.FC = () => {
  return (
    <div className={style.navbarWrapper}>
      <Image
        src={process.env.SITE_LOGO_URL!}
        alt="לוגו"
        height="89"
        width="70"
      />
      <MenuItem url="/" title="ראשי" />
      <MenuItem url="/new-programs" title="תכניות" />
      <MenuItem url="/new-about" title="אודות" />
      <MenuItem url="/" title="הצטרפות" />
    </div>
  );
};
