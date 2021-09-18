import React, { useRef, useCallback, useEffect} from "react";
import { GetServerSideProps } from "next";
import * as FLATTED from "flatted";
import { QueryClient } from "react-query";

import { Page } from "../../components/Page";
import { dehydrate } from "react-query/hydration";

import styles from './ArchivePage.module.scss'
import { queryRecordedShows } from '../../api/RecordedShows.api';
import { useRecordedShows } from '../../hook/useRecordedShows';
import { RecordedShowsListStandalone } from '../../components/RecordedShowsList/RecordedShowsListStandalone';
import { RecordedShowsList } from '../../components/RecordedShowsList/RecordedShowsList';
import { RecordedShowPlayer } from '../../components/RecordedShowPlayer/RecordedShowPlayer';
import { getProgramImage } from '../../utils/program.utils';
import { BASE_IMAGE } from '../../config/images';

const ProgramsPage: React.FC = (props) => {
  const {recordedShows, fetchNext, hasNextPage} = useRecordedShows();

  const loader = useRef(null);

  const handleObserver = useCallback((entries) => {
    const target = entries[0];
    if (target.isIntersecting && hasNextPage) {
      fetchNext();
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
		// @ts-expect-error
		observer.observe(loader.current)
	};
  }, [handleObserver]);
  return (
    <Page title="הבוידעם">
		<div className={styles.programsPage}>
      <section className={styles.quoteSection}>
		  <p className={styles.quote}>
		  ברדיו יש לך שני כלים, צליל ושקט.
		  </p>
		  <div className={styles.pageTitleWrapper}>
		  	<h1 className={styles.pageTitle}>הבוידעם</h1>
		  </div>
	  </section>
      <section className={styles.programsList}>

	  {recordedShows?.map((r) => {
		  return r.map((show) => (
			  <div key={show.id} className={styles.singleShow}>
              <RecordedShowPlayer
                url={show.url}
                name={show.name}
                recordingDate={show.created_at}
				programName={show.program.name_he}
				backgroundImageUrl={`${BASE_IMAGE}/${
					show.program.cover_image ? show.program.cover_image : show.program.users[0].profile_image
				}`}
				/>
            </div>
          ));
        })}
		<div ref={loader} />
      </section>
		</div>
    </Page>
  );
};

export default ProgramsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const queryClient = new QueryClient();
  
	await queryClient.prefetchInfiniteQuery(
	  `recordedShows-archive`,
	  ({ pageParam = 1 }) => queryRecordedShows({ page: pageParam })
	);
  
	return {
	  props: {
		dehydratedState: FLATTED.stringify(dehydrate(queryClient)),
	  },
	};
  };
