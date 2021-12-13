import { useState, useRef, useEffect } from "react";
import { Page } from "../components/Page";
import style from "./Home.module.scss";

import cn from "classnames";

import { useKeenSlider } from "keen-slider/react";
import { GetServerSideProps } from "next";
import { QueryClient } from "react-query";
import { stringify } from "flatted";
import { dehydrate } from "react-query/hydration";
import { RecordedShowsListStandalone } from "../components/RecordedShowsList/RecordedShowsListStandalone";

import Link from "next/link";
import { usePrograms } from "../hook/usePrograms";
import { ProgramsListStandalone } from "../components/ProgramsList/ProgramsListStandalone";
import { getAllActivePrograms } from "../api/Programs.api";
import { prefetchLatestRecordedShows } from '../hook/useLatestRecordedShows';

import { getFilteredImages } from "../utils/getRandomImages.utils";

export const Home: React.FC<{imagesToShow: string[]}> = (props) => {
  

  const { programs } = usePrograms({ limit: 3, rand: true });

  return (
    <Page title="ראשי">
      <AboutSection imagesToShow={props.imagesToShow}/>
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

export const AboutSection: React.FC<{imagesToShow: string[]}> = (props) => {
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
            כשהעגלה נוסעת, המלונים מסתדרים בארגזים - סבא בקל
          </p>
        </div>
      </div>
      <div className={style.galleryPane}>
	  <div ref={sliderRef} className={cn("keen-slider", style.sliderWrapper)}>
          {props.imagesToShow.map((url, index) => {
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

export default Home;


export const getServerSideProps: GetServerSideProps = async (context) => {
	const queryClient = new QueryClient();
  
	await prefetchLatestRecordedShows(queryClient, {limit: 3});
  
	await queryClient.prefetchQuery(
	  'active-programs',
	  () => getAllActivePrograms({ limit: 3, rand: true })
	);
  
	const imagesToShow = getFilteredImages();
  
	return {
	  props: {
		dehydratedState: stringify(dehydrate(queryClient)),
		imagesToShow
	  },
	};
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
