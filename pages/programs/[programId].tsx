import { GetServerSideProps } from "next";
import { dehydrate, QueryClient } from "react-query";
import { getProgramById } from "../../api/Programs.api";
import { queryRecordedShows } from "../../api/RecordedShows.api";
import * as FLATTED from "flatted";
import { Program } from "../../domain/Program";
import { Page } from "../../components/ui/Page";
import { Heading } from "../../components/ui/Typography";
import { Colors } from "../../components/ui/Colors";
import { useRecordedShowByProgramId } from "../../hook/useRecordedShowsByProgram";

import style from "./singleProgram.module.scss";
import { usePlayerState } from "../../providers/PlayerProvider/usePlayerState";
import { usePlayerControls } from "../../providers/PlayerProvider/usePlayerControls";
import { programParser } from "../../parsers/Programs.parser";
import { asStandardPage } from '../../components/asStandardPage';
import { Seo } from '../../components/seo/seo';

export const SingleProgramPage: React.FC<{
  program: Program;
}> = (props) => {
  const { recordedShows } = useRecordedShowByProgramId(props.program.id);
  const { songTitle } = usePlayerState();
  const { playTrack } = usePlayerControls();
  return (
	<>
	<Seo title={`רדיוסבתא - ${props.program.name_he}`}/>
      <div className={style.pageTitleWrapepr}>
        <Heading>{props.program.name_he}</Heading>
      </div>
      <div className={style.programHostsWrapper}>
        <p className={style.programHosts}>
          בהגשת {props.program.users.map((u) => u.name).join(", ")}
        </p>
      </div>
      <div>
        <div
          className={style.recordedShowsTitleWrapper}>
          <Heading color={Colors.SAVTA_ORANGE}>העלאות אחרונות</Heading>
        </div>
        <div>
          {recordedShows?.flat().map((s) => {
            return (
              <div
                key={s.id}
                data-isPlaying={songTitle === s.name}
                className={style.recordedShowWrapper}
                onClick={() => {
                  playTrack({
                    title: s.name,
                    audioUrl: s.url,
                    artist: props.program.name_he,
                    imageUrl: programParser.programImage(props.program),
                    metaData: {
                      programId: props.program.id,
                      recordedShowId: s.id,
                    },
                  });
                }}
              >
                <Heading as="h3" color={Colors.TEXT_GREY}>
                  {s.name}
                </Heading>
                <p className={style.uploadDate}>
                  {Intl.DateTimeFormat("he", {
                    day: "2-digit",
                    month: "numeric",
                    year: "numeric",
                  }).format(new Date(s.created_at))}
                </p>
              </div>
            );
          })}
        </div>
      </div>
	  </>
  );
};

export default asStandardPage(SingleProgramPage);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  // @ts-expect-error
  const programId: string = context.params.programId;

  await queryClient.prefetchInfiniteQuery(
    `recordedShows-progarm${programId}`,
    ({ pageParam = 1 }) => queryRecordedShows({ page: pageParam, programId })
  );
  const { data } = await getProgramById(programId);

  if (!data.program) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      program: data.program,
      dehydratedState: FLATTED.stringify(dehydrate(queryClient)),
    },
  };
};
