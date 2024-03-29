import React, { useRef, useCallback, useEffect } from "react";
import { GetServerSideProps } from "next";
import * as FLATTED from "flatted";
import { QueryClient } from "react-query";

import { Page } from "../../components/Page";
import { dehydrate } from "react-query/hydration";

import styles from "./ArchivePage.module.scss";
import { queryRecordedShows } from "../../api/RecordedShows.api";
import {
  prefetchRecordedShows,
  useRecordedShows,
} from "../../hook/useRecordedShows";
import { RecordedShowPlayer } from "../../components/RecordedShowPlayer/RecordedShowPlayer";
import { BASE_IMAGE } from "../../config/images";
import cn from "classnames";
import Select from "react-select";
import { usePrograms } from "../../hook/usePrograms";
import { Title } from "../../components/Typography/Title";
import {
  logFilterByRecordedShow,
  logSearchRecordedShow,
  logResetFilterByProgram,
  logOpenSharedShow,
} from "../../api/Mixpanel.api";
import { useRouter } from "next/router";
import { programParser } from "../../parsers/Programs.parser";

const ProgramsPage: React.FC = (props) => {
  const router = useRouter();

  const { recordedShows, fetchNext, hasNextPage } = useRecordedShows({
    search: router.query.searchQuery as string,
    showId: router.query.showId as string,
    programId: router.query.programId
      ? parseInt(router.query.programId as string)
      : undefined,
  });
  const { programs } = usePrograms();

  useEffect(() => {
	const showId = router.query.showId as string;
	if (showId) {
		logOpenSharedShow(showId);
	}
  }, [router.query.showId]);
  

  const options = [
    { label: "כל התכניות", value: undefined },
    ...programs.map((program) => ({
      label: programParser.name(program),
      value: program.id,
    })),
  ];

  const updateSearchQuery = useCallback(
    ({ programId, searchQuery }: any) => {
      const query: any = {};

      if (programId) {
        query.programId = programId;
      }
      if (searchQuery) {
        query.searchQuery = searchQuery;
      }
      router.push({ pathname: "/archive", query }, undefined, {
        shallow: true,
      });
    },
    [router]
  );

  const onSearchChange = useCallback(
    (e) => {
      const searchQuery = e.target.value;
      if (searchQuery) {
        logSearchRecordedShow(searchQuery);
      }
      updateSearchQuery({ searchQuery, programId: router.query.programId });
    },
    [router.query.programId, updateSearchQuery]
  );

  const onProgramChange = (id: number) => {
    if (id) {
      logFilterByRecordedShow(id);
    } else {
      logResetFilterByProgram();
    }
    updateSearchQuery({ searchQuery: router.query.searchQuery, programId: id });
  };

  const loader = useRef<Element | null>(null);

  const handleObserver = useCallback(
    (entries) => {
      const target = entries[0];
      if (target.isIntersecting && hasNextPage) {
        fetchNext();
      }
    },
    [hasNextPage]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "40px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) {
      observer.observe(loader.current);
    }
  }, [handleObserver]);

  const getPageTitle = () => {
	if (router.query.showId && recordedShows?.length && recordedShows[0].length) {
		const programName = programParser.name(recordedShows[0][0].program);
		const showName = recordedShows[0][0].name;

		return  `האזינו ל${programName} - ${showName}`
	}

	return "הבוידעם"
  }
  const getPageImage = () => {
	if (router.query.showId && recordedShows?.length && recordedShows[0].length) {
		const programImage = programParser.programImage(recordedShows[0][0].program);

		return  programImage
	}
  }

  return (
    <Page title={getPageTitle()} previewImage={getPageImage()}>
      <div className={styles.archivePage}>
        <section className={styles.quoteSection}>
          <Title as="h1">הבוידעם</Title>
          <p className={styles.quote}>ברדיו יש לך שני כלים, צליל ושקט.</p>
        </section>
        <section className={styles.programsList}>
          <div className={styles.filterWrapper}>
            <input
              className={cn(styles.input, styles.searchQuery)}
              autoComplete="off"
              placeholder="חיפוש לפי שם ההקלטה"
              value={router.query.searchQuery || ""}
              onChange={onSearchChange}
            />
            <Select
              options={options}
              value={options.find((o) => o.value == router.query.programId)}
              placeholder="סינון לפי תכנית"
              // @ts-ignore
              onChange={(value) => onProgramChange(value!.value)}
              styles={{
                container: (provided: any) => ({
                  ...provided,
                  display: "inline-block",
                  border: "1px solid var(--banana)",
                  width: `calc(50% - 10px)`,
                  marginLeft: "10px",
                  height: "50px",
                  fontSize: "0.8rem",
                  outline: "none !important",
                }),
                control: (provided: any) => ({
                  ...provided,
                  color: "rgba(255, 255, 255, 100%)",
                  paddingRight: "10px",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 40%)",
                }),
                placeholder: (provided: any) => ({
                  ...provided,
                  color: "rgba(255, 255, 255, 75%)",
                  fontSize: "0.8rem",
                  paddingRight: "10px",
                }),
                singleValue: (provided: any) => ({
                  ...provided,
                  color: "#ffffff",
                }),
              }}
            />
            {/* <input
              className={cn(styles.input, styles.dateSelect)}
              autoComplete="off"
              placeholder="סינון לפי תאריך העלאה"
            /> */}
          </div>
          {recordedShows?.map((r,i) => {
            if (!r.length) {
              return (
                <div className={styles.noResultsWrapper} key={`recorded-show-empty-state-${i}`}>
                  <h5>לא מצאנו תוכנית בבוידעם שמתאימה לחיפוש זה</h5>
                  <p>אולי ננסה חיפוש אחר?</p>
                </div>
              );
            }
            return r.map((show) => (
              <div key={show.id} className={styles.singleShow}>
                <RecordedShowPlayer
                  showId={show.id}
                  url={show.url}
                  name={show.name}
                  programName={programParser.name(show.program)}
                  source={"ARCHIVE"}
                  programId={show.program.id}
                  backgroundImageUrl={programParser.programImage(show.program)}
                />
              </div>
            ));
          })}
          {/* @ts-ignore-error */}
          <div ref={loader} />
        </section>
      </div>
    </Page>
  );
};

export default ProgramsPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queryClient = new QueryClient();
  const searchQuery = context.query.searchQuery as string;
  const programId = context.query.programId
  ? parseInt(context.query.programId as string)
  : undefined;
  const showId = context.query.showId as string;

  await prefetchRecordedShows(queryClient, { search: searchQuery, programId, showId });

  return {
    props: {
      dehydratedState: FLATTED.stringify(dehydrate(queryClient)),
    },
  };
};
