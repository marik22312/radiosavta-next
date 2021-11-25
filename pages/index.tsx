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

import Link from "next/link";
import { usePrograms } from "../hook/usePrograms";
import { ProgramsListStandalone } from "../components/ProgramsList/ProgramsListStandalone";
import { getAllActivePrograms } from "../api/Programs.api";
import dynamic from "next/dynamic";
import { Carousel } from "react-responsive-carousel";

const images = [
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921319/radiosavta/gallery/1.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921320/radiosavta/gallery/10.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921412/radiosavta/gallery/11.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922090/radiosavta/gallery/12.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922147/radiosavta/gallery/14.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922261/radiosavta/gallery/15.jpg",
  "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922386/radiosavta/gallery/17.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922451/radiosavta/gallery/18.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922514/radiosavta/gallery/19.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921370/radiosavta/gallery/anotherass.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921384/radiosavta/gallery/ass.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921769/radiosavta/gallery/batya.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921329/radiosavta/gallery/berech.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921988/radiosavta/gallery/bigonyou.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921544/radiosavta/gallery/buidingmitspe.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921470/radiosavta/gallery/buildinghigher.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606922579/radiosavta/gallery/cats.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921355/radiosavta/gallery/clouds.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921347/radiosavta/gallery/fox.jpg",
//   "https://res.cloudinary.com/marik-shnitman/image/upload/v1606921340/radiosavta/gallery/ibex.jpg",
];
export default function Home() {
  

  const { programs } = usePrograms({ limit: 3, rand: true });

  const { recordedShows } = useRecordedShows();
  return (
    <Page title="רדיוסבתא">
      {/* <section
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
      </section> */}
      <AboutSection />
      <section className={style.latestShowsSection}>
        <h2>העלאות אחרונות</h2>
        <div className={style.latestShowsList}>
          <RecordedShowsListStandalone />
        </div>
        <p className={style.allShowsLink}>
          <Link href="/archive">לבויעדם &gt;&gt;</Link>
        </p>
      </section>
      <section className={style.programsList}>
        <h2>תוכניות</h2>
        <div className={style.programsListWrapper}>
          <ProgramsListStandalone programs={programs} />
        </div>
        <p className={style.allShowsLink}>
          <Link href="/programs">לכל התוכניות &gt;&gt;</Link>
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

  await queryClient.prefetchInfiniteQuery(`active-programs`, () =>
    getAllActivePrograms({ limit: 3, rand: true })
  );

  return {
    props: {
      dehydratedState: stringify(dehydrate(queryClient)),
    },
  };
};

export const AboutSection: React.FC = () => {
	const timer = useRef<any>();
	const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    duration: 1000,
	slideChanged(s) {
		setCurrentSlide(s.details().relativeSlide)
	  },
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

  return (
    <section className={style.aboutUsSection}>
      <div className={style.aboutUsPane}>
        <div className={style.logoWrapper}>
          <h1>רדיוסבתא</h1>
          <h2>קולקטיב רדיו אינטרנטי</h2>
        </div>
        <div className={style.aboutUsTextWrapper}>
          <p className={style.aboutUsText}>
            קולקטיב &apos;רדיו סבתא&apos; נוסד בשנת 2015 כתחנת רדיו אינטרנטי במצפה רמון.
            התחנה נוסדה ע&quot;י עירא דיין, במטרה להנציח את (סבתא) יעל קרן, חותנתו של
            עירא
          </p>
          <p className={style.aboutUsText}>
            עירא ביקש לשמר בפעילות התחנה את האוירה החמה והמארחת שהיתה בסלון של
            סבתא, שהיתה מלווה תמיד במוזיקה משובחת בשלל סגנונות. הרדיו משדר
            מוזיקה איכותית ללא פשרות והרבה כבוד לסבים והסבתות
          </p>
        </div>
      </div>
      <div className={style.galleryPane}>
	  <div ref={sliderRef} className={cn("keen-slider", style.sliderWrapper)}>
          {images.map((url, index) => {
            return (
              <div key={url} className="keen-slider__slide">
                <img className={style.slideImage} src={url} alt={url} />
              </div>
            );
          })}
        </div>
		{slider && (
          <>
            <ArrowLeft
              onClick={(e) => e.stopPropagation() || slider.prev()}
              disabled={currentSlide === 0}
            />
            <ArrowRight
              onClick={(e) => e.stopPropagation() || slider.next()}
              disabled={currentSlide === slider.details().size - 1}
            />
          </>
        )}
	  {slider && (
        <div className={style.dots}>
          {[...Array(slider.details().size).keys()].map((idx) => {
			  const activeClass = currentSlide === idx ? style.activeDot : ""
            return (
              <button
                key={idx}
                onClick={() => {
                  slider.moveToSlideRelative(idx)
                }}
				className={cn(style.dot, activeClass)}
              />
            )
          })}
        </div>
      )}
      </div>
    </section>
  );
};

interface GalleryArrowProps {
	onClick: (e: any) => void;
	disabled: boolean;
}

const ArrowLeft: React.FC<GalleryArrowProps> = (props) => {
	const disabeld = props.disabled ? " arrowDisabled" : ""
	return (
	  <svg
		onClick={props.onClick}
		className={cn(style.arrow, style.arrowLeft, disabeld)}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	  >
		<path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
	  </svg>
	)
  }
  
  const ArrowRight: React.FC<GalleryArrowProps> = (props) => {
	const disabeld = props.disabled ? " arrowDisabled" : ""
	return (
	  <svg
		onClick={props.onClick}
		className={cn(style.arrow, style.arrowRight, disabeld)}
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
	  >
		<path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
	  </svg>
	)
  }
