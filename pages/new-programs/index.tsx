import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { QueryClient } from "react-query";
import { getAllActivePrograms } from "../../api/Programs.api";
import { Page } from "../../components/ui/Page";
import { Heading } from "../../components/ui/Typography";
import * as FLATTED from "flatted";
import { dehydrate } from "react-query/hydration";
import { usePrograms } from "../../hook/usePrograms";
import { programParser } from "../../parsers/Programs.parser";
import { ProgramTile } from './components/ProgramTile';


const ProgramsPage: React.FC = () => {
  const { programs } = usePrograms();
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
              <ProgramTile
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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(`active-programs`, ({ pageParam = 1 }) =>
    getAllActivePrograms()
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
