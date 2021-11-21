import React, { useCallback, useEffect, useRef } from "react";
import { RecordedShowPlayer } from "../RecordedShowPlayer/RecordedShowPlayer";

import style from "./RecordedShowsList.module.scss";
import { useRecordedShows } from '../../hook/useRecordedShows';
import { BASE_IMAGE, BASE_IMAGE_BW } from '../../config/images';

interface RecordedShowsListProps {
  lazyLoad?: boolean;
}

export const RecordedShowsListStandalone: React.FC<RecordedShowsListProps> = (props) => {
  const { recordedShows, fetchNext, hasNextPage } = useRecordedShows();
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
    if (loader.current && props.lazyLoad) {
		// @ts-expect-error
		observer.observe(loader.current)
	};
  }, [handleObserver, props.lazyLoad]);

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
			  source="HOMEPAGE"
                url={show.url}
                name={show.name}
                recordingDate={show.created_at}
                programName={show.program.name_he}
                backgroundImageUrl={`${BASE_IMAGE}/${show.program.cover_image}`}
              />
            </div>
          ));
        })}
        <div ref={loader} />
      </div>
    </>
  );
};
