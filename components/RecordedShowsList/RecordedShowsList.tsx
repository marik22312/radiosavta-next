import React, { useCallback, useEffect, useRef } from "react";
import { RecordedShowPlayer } from "../RecordedShowPlayer/RecordedShowPlayer";
import { useRecordedShowByProgramId } from "../../hook/useRecordedShowsByProgram";

import style from "./RecordedShowsList.module.scss";
import ProgramsPage from '../../pages/programs';

interface RecordedShowsListProps {
  programId: string;
  fetchMore?(): void;
  programName: string;
}

export const RecordedShowsList: React.FC<RecordedShowsListProps> = (props) => {
  const { recordedShows, fetchNext, hasNextPage } = useRecordedShowByProgramId(
    props.programId
  );
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

  if (!recordedShows?.[0]?.length) {
    return <div className="recordedShowsListWrapper">לא מצאנו כלום בבוידעם לתכנית זו</div>;
  }
  return (
    <>
      <div className={style.recordedShowsListWrapper}>
        {recordedShows.map((r) => {
          return r.map((show) => (
            <div key={show.id} className={style.singleShow}>
              <RecordedShowPlayer
                url={show.url}
                name={show.name}
                recordingDate={show.created_at}
				programName={props.programName}
				source={'PROGRAM_PAGE'}
              />
            </div>
          ));
        })}
        <div ref={loader} />
      </div>
    </>
  );
};
