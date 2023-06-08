import { GetServerSideProps } from "next";
import React, { useState } from "react";
import { QueryClient } from "react-query";
import { Page } from "../../components/ui/Page";
import { Heading } from "../../components/ui/Typography";
import * as FLATTED from "flatted";
import { dehydrate } from "react-query/hydration";
import { programParser } from "../../parsers/Programs.parser";
import { ProgramLine } from "../../components/ProgramLine/ProgramLine";
import {
  prefetchQueryPrograms,
  useQueryPrograms,
} from "../../hook/useQueryPrograms";
import { asStandardPage } from '../../components/asStandardPage';
import { Seo } from '../../components/seo/seo';
import { Program } from '../../domain/Program';
import { logExpandProgram } from '../../api/Mixpanel.api';

const ProgramsPage: React.FC = () => {
  const [expandedProgramIndex, setExpandedProgramIndex] = useState<number>();
  const { programs } = useQueryPrograms({
    sort: {
      orderBy: "DESC",
      field: "program.recordedShow",
    },
  });

  const onExpandProgram = ({index, program}:{index: number; program: Program}) => {
	logExpandProgram({
		programId: program.id,
		programName: programParser.name(program),
	})
    setExpandedProgramIndex((currentIndex) =>
      currentIndex === index ? undefined : index
    );
  };

  return (
    <>
	<Seo title="התכניות של סבתא"/>
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
              <ProgramLine
                programId={program.id}
                key={program.id}
                title={program.name_he}
                isExpanded={expandedProgramIndex === index}
                onExpandProgram={() => onExpandProgram({index, program})}
                imageUrl={programParser.programImage(program)}
              />
            );
          })}
        </div>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();

  await prefetchQueryPrograms(queryClient, {
    sort: {
      orderBy: "DESC",
      field: "program.recordedShow",
    },
  });
  return {
    props: {
      dehydratedState: FLATTED.stringify(dehydrate(queryClient)),
    },
  };
};

export default asStandardPage(ProgramsPage);
