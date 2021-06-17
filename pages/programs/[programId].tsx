import React from "react";
import { getProgramById } from "../../api/Programs.api";
import { queryRecordedShows } from "../../api/RecordedShows.api";
import { GetServerSideProps } from "next";

import style from "./SingleProgramPage.module.scss";
import moment from "moment";

import { Page } from "../../components/Page";
import { RecordedShowsList } from "../../components/RecordedShowsList/RecordedShowsList";

import Image from "next/image";

const BASE_IMAGE_BW =
  "https://res.cloudinary.com/marik-shnitman/image/upload/e_grayscale/w_1080/v1547932540/";
const BASE_IMAGE =
  "https://res.cloudinary.com/marik-shnitman/image/upload/w_1080/v1547932540/";
const getProgramImage = (program: any) => {
  return `${BASE_IMAGE_BW}/${
    program.cover_image ? program.cover_image : program.users[0].profile_image
  }`;
};

const getDayOfWeek = (program: any) => {
  return moment().weekday(program.programTimes[0].day_of_week).toDate();
};
const getTime = (program: any) => {
  return moment(program.programTimes[0].start_time).toDate();
};

const About: React.FC<{ program: any; recordedShows: any[] }> = ({
  program,
  recordedShows,
}) => {
  return (
    <>
      <Page title={program.name_he}>
        <div
          className={style.programHeader}
          style={{ backgroundImage: `url(${getProgramImage(program)})` }}
        >
          <div className={style.programDetailsWrapper}>
            <div className={style.programInfo}>
              <p className={style.programTime}>
                {Intl.DateTimeFormat("he", { weekday: "long" }).format(
                  getDayOfWeek(program)
                )}{" "}
                - {program.programTimes[0].start_time}
              </p>
              <p>{program.users.map((u: any) => u.name).join(", ")}</p>
            </div>
            <div className={style.people}>
              <div className={style.broadcasterImage}>
                {program.users.map((u: any) => {
                  return <img key={`image-${program.id}-${u.id}`}src={`${BASE_IMAGE}/${u.profile_image}`} />;
                })}
              </div>
            </div>
          </div>
        </div>
        <section className={style.archiveSection}>
          <h3 className="section-title">הבוידעם</h3>
          <div className={style.recordedShows}>
            <RecordedShowsList recordedShows={recordedShows} />
          </div>
        </section>
      </Page>
    </>
  );
};

export default About;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // @ts-ignore
  const { data } = await getProgramById(context.params.programId);
  const {
    data: { recordedShows, pageData },
  } = await queryRecordedShows({
    // @ts-ignore
    programId: context.params.programId,
  });

  if (!data.program) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      program: data.program,
      recordedShows,
      recordedShowsPageData: pageData,
    },
  };
};
