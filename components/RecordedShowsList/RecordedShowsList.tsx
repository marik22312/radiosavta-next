import React from "react";
// import ProgramInterface from "../../../../../interfaces/Program";
import { RecordedShowPlayer } from "../RecordedShowPlayer/RecordedShowPlayer";
// import { RecordedShow } from "../../../../domain/RecordedShow";
// import { useProgramById } from "../hooks/useProgramById";
// import { useRecordedShowByProgramId } from "../hooks/useRecordedShowsByProgram";

import style from "./RecordedShowsList.module.scss";

interface RecordedShowsListProps {
	recordedShows: any[];
}
export const RecordedShowsList: React.FC<RecordedShowsListProps> = (props) => {
//   const { recordedShows, fetchNext, hasNextPage } = useRecordedShowByProgramId(
//     props.programId
//   );

  if (!props.recordedShows.length) {
    return <div className="recordedShowsListWrapper"> program not found</div>;
  }
  return (
    <>
      <div className={style.recordedShowsListWrapper}>
        {props.recordedShows.map((show) => {
          return (
            <div key={show.id} className={style.singleShow}>
              <RecordedShowPlayer
                url={show.url}
                name={show.name}
                recordingDate={show.created_at}
              />
            </div>
          )
        })}
      </div>
      {/* <button onClick={() => fetchNext()} disabled={!hasNextPage}>
        Load More
      </button> */}
    </>
  );
};
