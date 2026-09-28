import React from "react";
import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { NextPageWithLayout } from "../../domain/AppProps";
import { getGalleryPhotos } from "../../api/Gallery.api";
import { LiveAudio } from "../../components/v2/LiveAudio";
import { Hero } from "../../components/v2/Hero/Hero";
import { Story } from "../../components/v2/Story/Story";
import { Gallery } from "../../components/v2/Gallery/Gallery";
import { Dock } from "../../components/v2/Dock/Dock";
import styles from "./V2.module.css";

// Redesign homepage (Website redesign milestone). Sections from the
// "Radio Savta — Homepage" prototype get built here until it replaces "/".
interface V2HomePageProps {
  galleryPhotos: string[];
}

const V2HomePage: NextPageWithLayout<V2HomePageProps> = ({ galleryPhotos }) => {
  return (
    <>
      <NextSeo title="רדיוסבתא" noindex nofollow />
      <LiveAudio />
      <main className={styles.page}>
        <Hero />
        <Story />
        <Gallery photos={galleryPhotos} />
      </main>
      <Dock />
    </>
  );
};

V2HomePage.fullPage = true;

// Gallery photos come from the Cloudinary Admin API, which is rate-limited,
// so they're fetched at build time and refreshed at most hourly (ISR) rather
// than per request. Newly tagged photos show up after the next revalidation.
export const getStaticProps: GetStaticProps<V2HomePageProps> = async () => ({
  props: { galleryPhotos: await getGalleryPhotos() },
  revalidate: 3600,
});

export default V2HomePage;
