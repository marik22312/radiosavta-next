import React from "react";
import { NextSeo } from "next-seo";
import { NextPageWithLayout } from "../../domain/AppProps";
import { LiveAudio } from "../../components/v2/LiveAudio";
import { Hero } from "../../components/v2/Hero/Hero";
import { Story } from "../../components/v2/Story/Story";
import { Dock } from "../../components/v2/Dock/Dock";
import { Grain } from "../../components/v2/Grain/Grain";
import styles from "./V2.module.css";

// Redesign homepage (Website redesign milestone). Sections from the
// "Radio Savta — Homepage" prototype get built here until it replaces "/".
const V2HomePage: NextPageWithLayout = () => {
  return (
    <>
      <NextSeo title="רדיוסבתא" noindex nofollow />
      <LiveAudio />
      <main className={styles.page}>
        <Hero />
        <Story />
      </main>
      <Dock />
      <Grain />
    </>
  );
};

V2HomePage.fullPage = true;

export default V2HomePage;
