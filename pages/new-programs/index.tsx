import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { QueryClient } from "react-query";
import { getAllActivePrograms } from "../../api/Programs.api";
import { Page } from "../../components/ui/Page";
import { Heading } from "../../components/ui/Typography";
import * as FLATTED from "flatted";
import { dehydrate } from "react-query/hydration";
import { usePrograms } from "../../hook/usePrograms";
import { Colors } from "../../components/ui/Colors";
import style from "./ProgramTile.module.scss";
import { programParser } from "../../parsers/Programs.parser";
import Image from "next/image";
import { useRecordedShowByProgramId } from "../../hook/useRecordedShowsByProgram";
import Link from 'next/link';

const LIMIT_OF_PROGRAMS = 5;

const ProgramsPage: React.FC = () => {
  const { programs } = usePrograms({ limit: LIMIT_OF_PROGRAMS });
  const [expandedProgramIndex, setExpandedProgramIndex] = useState<number>();

  const onExpandProgram = (index: number) => {
    setExpandedProgramIndex((currentIndex) =>
      currentIndex === index ? undefined : index
    );
  };

  return (
    <>
      <Page>
        <div style={{ paddingRight: "21px" }}>
          <Heading>התכניות של סבתא</Heading>
        </div>
        <div
          style={{
            marginTop: "45px",
          }}
        >
          {programs.map((program, index) => {
            return (
              <Program
                programId={program.id}
                key={program.id}
                title={program.name_he}
                isExpanded={expandedProgramIndex === index}
                onExpandProgram={() => onExpandProgram(index)}
                imageUrl={programParser.programImage(program)}
              />
            );
          })}
        </div>
      </Page>
    </>
  );
};

const Program: React.FC<{
  title: string;
  isExpanded: boolean;
  onExpandProgram: () => void;
  imageUrl: string;
  programId: string | number;
}> = (props) => {
  return (
    <div
      onClick={props.onExpandProgram}
      data-is-expanded={props.isExpanded}
      className={style.programWrapper}
      style={{
        fontFamily: "Heebo",
        paddingRight: "21px",
      }}
    >
      <div className={style.programHeader}>
        <div>
          <h3
            style={{
              color: Colors.TEXT_GREY,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {props.title}
          </h3>
          {props.isExpanded ? null : (
            <div
              style={{
                marginTop: "4px",
                color: Colors.SAVTA_RED,
                fontSize: "16px",
              }}
            >
              <span>עוד</span>
            </div>
          )}
        </div>
        <div className={style.imageWrapper}>
          <Image
            src={props.imageUrl}
            height="52"
            width="55"
            alt={props.title}
          />
        </div>
      </div>
      <ProgramContent
        isCollapsed={!!props.isExpanded}
        programId={props.programId}
      />
    </div>
  );
};

const ProgramContent: React.FC<{
  isCollapsed: boolean;
  programId: string | number;
}> = (props) => {
  const { recordedShows } = useRecordedShowByProgramId(props.programId);
  return (
    <>
      <div className={style.programContent} data-collapsed={props.isCollapsed}>
        <ul>
          {recordedShows
            ?.flat()
            .slice(0, 5)
            .map((recordedShow) => {
              return (
                <li key={recordedShow.id} data-is-playing={false}>
                  {recordedShow.name}
                </li>
              );
            })}
        </ul>
        <div className={style.archiveCtaWrapper} onClick={(e) => e.stopPropagation()}>
			<Link href={`/programs/${props.programId}`} passHref>
          <span>
            <a>לארכיון</a>
          </span>
			</Link>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(`active-programs`, ({ pageParam = 1 }) =>
    getAllActivePrograms({ limit: LIMIT_OF_PROGRAMS })
  );
  const { data } = await getAllActivePrograms();

  if (!data.activeShows) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      activePrograms: data.activeShows,
      dehydratedState: FLATTED.stringify(dehydrate(queryClient)),
    },
  };
};

export default ProgramsPage;
