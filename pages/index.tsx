import { useState, useRef, useEffect } from "react";
import { Page } from "../components/ui/Page";
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
import {
  prefetchLatestRecordedShows,
  useLatestRecordedShows,
} from "../hook/useLatestRecordedShows";

import { getFilteredImages } from "../utils/getRandomImages.utils";
import Image from "next/image";
import { Heading } from "../components/ui/Typography";
import { Colors } from "../components/ui/Colors";
import { useAgenda } from "../hook/useAgenda";
import { usePlayerControls } from "../providers/PlayerProvider/usePlayerControls";
import { programParser } from "../parsers/Programs.parser";
import { usePlayerState } from "../providers/PlayerProvider/usePlayerState";

export const Home: React.FC<{ imagesToShow: string[] }> = (props) => {
  const { programs } = usePrograms({ limit: 3, rand: true });

  return (
    <Page title="ראשי">
      <AboutSection imagesToShow={props.imagesToShow} />
      <UploadsSection />
    </Page>
  );
};

export const AboutSection: React.FC<{ imagesToShow: string[] }> = (props) => {
  const { data } = useAgenda();
  const timer = useRef<any>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    duration: 1000,
    slideChanged(s) {
      setCurrentSlide(s.details().relativeSlide);
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
    <section>
      <div style={{ paddingRight: "21px" }}>
        <Heading>לו&quot;ז יומי</Heading>
      </div>
      <div className={style.agendaWrapper}>
        {data?.schedule
          .sort((a, b) => {
            return new Date(a.start).getHours() - new Date(b.start).getHours();
          })
          .map((item, index) => {
            return (
              <div key={index} className={style.agendaItem}>
                <div className={style.agendaItemTime}>
                  <span className={style.agendaItemTime}>
                    {Intl.DateTimeFormat("he", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(item.start))}
                  </span>
                  <span className={style.agendaItemName}>{item.name}</span>
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
};

const UploadsSection: React.FC = () => {
  const { recordedShows } = useLatestRecordedShows({ limit: 5 });
  const { playTrack } = usePlayerControls();
  const { songTitle } = usePlayerState();

  return (
    <section className={style.recordedShowsSection}>
      <div style={{ paddingRight: "21px" }}>
        <Heading color={Colors.SAVTA_ORANGE}>העלאות אחרונות</Heading>
      </div>
      <div className={style.recordedShowsWrapper}>
        {recordedShows?.map((show, index) => {
          return (
            <div
              key={show.id}
              className={style.recordedShowItem}
              onClick={() =>
                playTrack({
                  artist: show.program?.name_he,
                  title: show.name,
                  audioUrl: show.url,
                  imageUrl: programParser.programImage(show.program),
                  metaData: {
                    programId: show.program?.id,
                    recordedShowId: show.id,
                  },
                })
              }
              data-isPlaying={songTitle === show.name}
            >
              <h4>{show.program?.name_he}</h4>
              <h5>{show.name}</h5>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await prefetchLatestRecordedShows(queryClient, { limit: 3 });

  await queryClient.prefetchQuery("active-programs", () =>
    getAllActivePrograms({ limit: 3, rand: true })
  );

  const imagesToShow = getFilteredImages();

  return {
    props: {
      dehydratedState: stringify(dehydrate(queryClient)),
      imagesToShow,
    },
  };
};

interface GalleryArrowProps {
  onClick: (e: any) => void;
  disabled: boolean;
}

const ArrowLeft: React.FC<GalleryArrowProps> = (props) => {
  const disabeld = props.disabled ? " arrowDisabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={cn(style.arrow, style.arrowLeft, disabeld)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
    </svg>
  );
};

const ArrowRight: React.FC<GalleryArrowProps> = (props) => {
  const disabeld = props.disabled ? " arrowDisabled" : "";
  return (
    <svg
      onClick={props.onClick}
      className={cn(style.arrow, style.arrowRight, disabeld)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />
    </svg>
  );
};
