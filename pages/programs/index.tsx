import React from "react";
import { GetServerSideProps } from "next";
import * as FLATTED from "flatted";
import { QueryClient } from "react-query";

import { getAllActivePrograms } from "../../api/Programs.api";
import { Page } from "../../components/Page";
import { dehydrate } from "react-query/hydration";
import { usePrograms } from "../../hook/usePrograms";

import { ProgramTile } from "../../components/ProgramTile/ProgramTile";

import styles from './ProgramsPage.module.scss'
import { Title } from '../../components/Typography/Title'
import { ProgramsListStandalone } from "../../components/ProgramsList/ProgramsListStandalone";

const ProgramsPage: React.FC = (props) => {
  const { programs } = usePrograms();
  return (
    <Page title="התכניות שלנו">
		<div className={styles.programsPage}>
      <section className={styles.quoteSection}>
        <p className={styles.quote}>
        הלו? זה רדיו? זוהי השאלה, מהי הפינה?
        </p>
        <Title as="h1">התכניות שלנו</Title>
      </section>
        <ProgramsListStandalone programs={programs} />
		</div>
    </Page>
  );
};

export default ProgramsPage;

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
