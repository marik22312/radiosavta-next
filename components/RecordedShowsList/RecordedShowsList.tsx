import React, { useCallback, useEffect, useRef } from "react";
import { RecordedShowPlayer } from "../RecordedShowPlayer/RecordedShowPlayer";
import { useRecordedShowByProgramId } from "../../hook/useRecordedShowsByProgram";

import style from "./RecordedShowsList.module.scss";

interface RecordedShowsListProps {
  programId: string;
  fetchMore?(): void;
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

  if (!recordedShows?.length) {
    return <div className="recordedShowsListWrapper"> program not found</div>;
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
              />
            </div>
          ));
        })}
        <div ref={loader} />
      </div>
    </>
  );
};
