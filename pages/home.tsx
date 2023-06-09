import style from "./Home.module.scss";

import { GetServerSideProps } from "next";
import { QueryClient } from "react-query";
import { stringify } from "flatted";
import { dehydrate } from "react-query/hydration";
import {
  prefetchLatestRecordedShows,
  useLatestRecordedShows,
} from "../hook/useLatestRecordedShows";

import { Heading } from "../components/ui/Typography";
import { Colors } from "../components/ui/Colors";
import { prefetchAgenda, useAgenda } from "../hook/useAgenda";
import { usePlayerControls } from "../providers/PlayerProvider/usePlayerControls";
import { programParser } from "../parsers/Programs.parser";
import { usePlayerState } from "../providers/PlayerProvider/usePlayerState";
import { asStandardPage } from "../components/asStandardPage";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { Seo } from "../components/seo/seo";
import { logPlayRecordedShow } from "../api/Mixpanel.api";

export const Home: React.FC<{ imagesToShow: string[] }> = (props) => {
  return (
    <>
      <Seo />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.75,
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
        {data?.schedule.map((item, index) => {
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
              onClick={() => {
                logPlayRecordedShow({
                  programName: show.program?.name_he,
                  showName: show.name,
                  source: "HOMEPAGE",
                  programId: show.program?.id,
                });
                playTrack({
                  artist: show.program?.name_he,
                  title: show.name,
                  audioUrl: show.url,
                  imageUrl: programParser.programImage(show.program),
                  metaData: {
                    programId: show.program?.id,
                    recordedShowId: show.id,
                  },
                });
              }}
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
