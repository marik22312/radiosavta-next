import React, { useCallback, useEffect, useRef } from "react";
import { RecordedShowPlayer } from "../RecordedShowPlayer/RecordedShowPlayer";

import style from "./RecordedShowsList.module.scss";
import { useRecordedShows } from "../../hook/useRecordedShows";
import { BASE_IMAGE, BASE_IMAGE_BW } from "../../config/images";
import { useLatestRecordedShows } from "../../hook/useLatestRecordedShows";
import { programParser } from "../../parsers/Programs.parser";

interface RecordedShowsListProps {
  lazyLoad?: boolean;
}

export const RecordedShowsListStandalone: React.FC<RecordedShowsListProps> = (
  props
) => {
  const { recordedShows } = useLatestRecordedShows({ limit: 3 });
  const loader = useRef(null);

  if (!recordedShows?.length) {
    return (
      <div className="recordedShowsListWrapper">
        לא מצאנו כלום בבוידעם לתכנית זו
      </div>
    );
  }
  return (
    <>
      <div className={style.recordedShowsListWrapper}>
        {recordedShows.map((show) => (
          <div key={show.id} className={style.singleShow}>
            <RecordedShowPlayer
              source="HOMEPAGE"
              showId={show.id}
              url={show.url}
              name={show.name}
              recordingDate={show.created_at}
              programName={programParser.name(show.program)}
              programId={show.program.id}
              backgroundImageUrl={programParser.programImage(show.program)}
            />
          </div>
        ))}
        <div ref={loader} />
      </div>
    </>
  );
};
