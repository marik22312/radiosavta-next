import { Page } from "../components/ui/Page";
import style from "./Home.module.scss";

import cn from "classnames";

import { GetServerSideProps } from "next";
import { QueryClient } from "react-query";
import { stringify } from "flatted";
import { dehydrate } from "react-query/hydration";

import { usePrograms } from "../hook/usePrograms";
import { getAllActivePrograms } from "../api/Programs.api";
import {
  prefetchLatestRecordedShows,
  useLatestRecordedShows,
} from "../hook/useLatestRecordedShows";

import { getFilteredImages } from "../utils/getRandomImages.utils";
import { Heading } from "../components/ui/Typography";
import { Colors } from "../components/ui/Colors";
import { prefetchAgenda, useAgenda } from "../hook/useAgenda";
import { usePlayerControls } from "../providers/PlayerProvider/usePlayerControls";
import { programParser } from "../parsers/Programs.parser";
import { usePlayerState } from "../providers/PlayerProvider/usePlayerState";
import { asStandardPage } from '../components/asStandardPage';
import {motion} from 'framer-motion';
import { useRouter } from 'next/router';

export const Home: React.FC<{ imagesToShow: string[] }> = (props) => {
	const router = useRouter();
  return (
	<>
    <motion.div
              key={router.route}
              initial="initialState"
              animate="animateState"
              exit="exitState"
              transition={{
                duration: 0.75,
              }}
              variants={{
                initialState: {
                  opacity: 0,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                },
                animateState: {
                  opacity: 1,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                },
                exitState: {
                  clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
                },
              }}
            >
      <AboutSection imagesToShow={props.imagesToShow} />
      <UploadsSection />
    </motion.div>
	</>
  );
};

export const AboutSection: React.FC<{ imagesToShow: string[] }> = (props) => {
  const { data } = useAgenda();
  return (
    <section>
      <div style={{ paddingRight: "21px" }}>
        <Heading>לו&quot;ז יומי</Heading>
      </div>
      <div className={style.agendaWrapper}>
        {data?.schedule
          .map((item, index) => {
            return (
              <div key={index} className={style.agendaItem}>
                <div className={style.agendaItemTime}>
                  <p className={style.agendaItemTime}>
                    {Intl.DateTimeFormat("he", {
                      hour: "2-digit",
                      minute: "2-digit",
                    }).format(new Date(item.start))}
                  </p>
                  <p className={style.agendaItemName}>{item.name}</p>
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
              data-isplaying={songTitle === show.name}
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

export default asStandardPage(Home);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await prefetchLatestRecordedShows(queryClient, { limit: 3 });
  await prefetchAgenda(queryClient);
  
  return {
    props: {
      dehydratedState: stringify(dehydrate(queryClient)),
    },
  };
};
