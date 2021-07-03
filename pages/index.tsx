import { useState, useRef, useEffect } from "react";
import { Page } from "../components/Page";
import style from "./Home.module.scss";

import cn from "classnames";

import { useKeenSlider } from "keen-slider/react";
import { GetServerSideProps } from "next";
import { QueryClient } from "react-query";
import { queryRecordedShows } from "../api/RecordedShows.api";
import { stringify } from "flatted";
import { dehydrate } from "react-query/hydration";
import { RecordedShowsListStandalone } from "../components/RecordedShowsList/RecordedShowsListStandalone";
import { useRecordedShows } from "../hook/useRecordedShows";
import Image from "next/image";

import GreyBg from "../public/assets/backgrounds/text1.jpg";
import Link from "next/link";

const images = [
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921319/radiosavta/gallery/1.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921320/radiosavta/gallery/10.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921412/radiosavta/gallery/11.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922090/radiosavta/gallery/12.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922147/radiosavta/gallery/14.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922261/radiosavta/gallery/15.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922386/radiosavta/gallery/17.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922451/radiosavta/gallery/18.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922514/radiosavta/gallery/19.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921370/radiosavta/gallery/anotherass.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921384/radiosavta/gallery/ass.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921769/radiosavta/gallery/batya.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921329/radiosavta/gallery/berech.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921988/radiosavta/gallery/bigonyou.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921544/radiosavta/gallery/buidingmitspe.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921470/radiosavta/gallery/buildinghigher.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922579/radiosavta/gallery/cats.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921355/radiosavta/gallery/clouds.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921347/radiosavta/gallery/fox.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921340/radiosavta/gallery/ibex.jpg",
];
export default function Home() {
  const timer = useRef<any>();
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    duration: 1000,
  });

  useEffect(() => {
    timer.current = setInterval(() => {
      if (slider) {
        slider.next();
      }
    }, 7000);
    return () => {
      clearInterval(timer.current);
    };
  }, [slider]);

  const { recordedShows } = useRecordedShows();
  return (
    <Page title="רדיוסבתא">
      <section
        className={cn("gallery-section", style.gallerySection)}
        style={{ direction: "ltr" }}
      >
        <div ref={sliderRef} className={cn("keen-slider", style.sliderWrapper)}>
          {images.map((url, index) => {
            return (
              <div key={url} className="keen-slider__slide">
                <img className={style.slideImage} src={url} alt={url} />
              </div>
            );
          })}
        </div>
        <div className={style.homeContentWrapper}>
          <div className={style.homeContent}>
            <div className="logo">
              <h2>רדיוסבתא</h2>
              <p>קולקטיב רדיו אינטרנט</p>
            </div>
          </div>
          <div className={cn(style.homeContent, style.quote)}>
            <p>כשהעגלה נוסעת, כל המלונים מסתדרים בארגזים שלהם - סבא בקל</p>
          </div>
        </div>
      </section>
      <section className={style.latestShowsSection}>
        <h2>העלאות אחרונות</h2>
        <div className={style.latestShowsList}>
          <RecordedShowsListStandalone />
        </div>
        <p className={style.allShowsLink}>
          <Link href="/archive">לבויעדם &gt;&gt;</Link>
        </p>
      </section>
    </Page>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery(
    `recordedShows-archive`,
    ({ pageParam = 1 }) => queryRecordedShows({ page: pageParam, limit: 8 })
  );

  return {
    props: {
      dehydratedState: stringify(dehydrate(queryClient)),
    },
  };
};
