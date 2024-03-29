import React, { useEffect } from "react";
import { getProgramById } from "../../api/Programs.api";
import { queryRecordedShows } from "../../api/RecordedShows.api";
import { GetServerSideProps } from "next";

import style from "./SingleProgramPage.module.scss";
import moment from "moment";

import { Page } from "../../components/Page";
import { RecordedShowsList } from "../../components/RecordedShowsList/RecordedShowsList";

import Image from "next/image";
import { QueryClient } from "react-query";
import { dehydrate } from "react-query/hydration";
import { useRecordedShowByProgramId } from "../../hook/useRecordedShowsByProgram";
import * as FLATTED from "flatted";
import { BASE_IMAGE_BW, BASE_IMAGE } from "../../config/images";
import { getDayOfWeek } from '../../utils/program.utils';
import { programParser } from '../../parsers/Programs.parser';



const UsersList: React.FC<{ users: any[] }> = (props) => {
  if (props.users.length > 1) {
    return (
      <div className={style.people}>
        <div className={style.broadcasterImageMulti}>
          {props.users.map((u: any) => {
            return (
              <>
                <img
                  key={`image-${u.id}`}
                  src={`${BASE_IMAGE}/${u.profile_image}`}
				  alt={u.name}
                />
              </>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className={style.people}>
      <div className={style.broadcasterImage}>
        {props.users.map((u: any) => {
          return (
            <>
              <img
                key={`image-${u.id}`}
                src={`${BASE_IMAGE}/${u.profile_image}`}
              />
            </>
          );
        })}
      </div>
    </div>
  );
};
const SingleProgramPage: React.FC<{ program: any; recordedShows: any[] }> = ({
  program,
  //   recordedShows,
}) => {
  return (
    <>
      <Page title={programParser.name(program)} previewImage={programParser.programImage(program)}>
        <div
          className={style.programHeader}
          style={{ backgroundImage: `url(${programParser.programImage(program)})` }}
        >
          <div className={style.programDetailsWrapper}>
            <div className={style.programInfo}>
				<h1 className={style.programTime}>{programParser.name(program)}</h1>
              <p className={style.programTime}>
                {Intl.DateTimeFormat("he", { weekday: "long" }).format(
                  getDayOfWeek(program)
                )}{" "}
                - {program.programTimes[0].start_time}
              </p>
            </div>
            <UsersList users={program.users} />
          </div>
        </div>
        <section className={style.archiveSection}>
          <h3 className="section-title">הבוידעם</h3>
          <div className={style.recordedShows}>
            <RecordedShowsList programId={program.id} programName={programParser.name(program)}/>
          </div>
        </section>
      </Page>
    </>
  );
};

export default SingleProgramPage;

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
