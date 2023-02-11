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
import style from './ProgramTile.module.scss';

const LIMIT_OF_PROGRAMS = 5;

const ProgramsPage: React.FC = () => {
  const { programs } = usePrograms({ limit: LIMIT_OF_PROGRAMS });
  const [expandedProgramIndex, setExpandedProgramIndex] = useState<number>();

  const onExpandProgram = (index: number) => {
    setExpandedProgramIndex((currentIndex) => currentIndex === index ? undefined : index);
  };

  return (
    <>
      <Page>
        <div style={{ paddingRight: "21px" }}>
          <Heading>התכניות של סבתא</Heading>
        </div>
        <div style={{
			marginTop: '45px'
		}}>
          {programs.map((program, index) => {
            return (
              <Program
                key={program.id}
                title={program.name_he}
                isExpanded={expandedProgramIndex === index}
                onExpandProgram={() => onExpandProgram(index)}
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
}> = (props) => {
  return (
    <div
	onClick={props.onExpandProgram}
	className={style.programWrapper}
      style={{
        fontFamily: "Heebo",
		paddingRight: '21px',
      }}
    >
      <div style={{
		paddingTop: '6px'
	  }}>
        <h3
          style={{
            color: Colors.TEXT_GREY,
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          {props.title}
        </h3>
		<div>Logo</div>
      </div>
      {props.isExpanded ? null : <div 
	  style={{marginTop: '4px', color: Colors.SAVTA_RED, fontSize: '16px'}}
	  >
        <span>עוד</span>
      </div>}
      <ProgramContent isCollapsed={!!props.isExpanded}/>
    </div>
  );
};

const ProgramContent: React.FC<{isCollapsed: boolean}> = (props) => {
	return (
		<div className={style.programContent} data-collapsed={props.isCollapsed}>
			<div>,ufi</div>
			<div>,ufi</div>
			<div>,ufi</div>
			<div>,ufi</div>
			<div>,ufi</div>
		</div>
	)
}

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
