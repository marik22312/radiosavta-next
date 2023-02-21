import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Colors } from "../ui/Colors";
import { useRecordedShowByProgramId } from "../../hook/useRecordedShowsByProgram";
import style from "./ProgramLine.module.scss";
import { usePlayerControls as usePlayerControlsV2 } from "../../providers/PlayerProvider/usePlayerControls";
import { usePlayerState } from "../../providers/PlayerProvider/usePlayerState";
import { RecordedShow } from "../../domain/RecordedShow";
import { programParser } from "../../parsers/Programs.parser";

interface ProgramLineProps {
  title: string;
  isExpanded: boolean;
  onExpandProgram: () => void;
  imageUrl: string;
  programId: string | number;
}

export const ProgramLine: React.FC<ProgramLineProps> = (props) => {
  const { playTrack } = usePlayerControlsV2();
  const onPlayTrack = (recordedShow: RecordedShow) => {
    playTrack({
      title: recordedShow.name,
      audioUrl: recordedShow.url,
      artist: props.title,
      imageUrl: programParser.programImage(recordedShow.program),
      metaData: {},
    });
  };
  return (
    <div
      onClick={props.onExpandProgram}
      data-is-expanded={props.isExpanded}
      className={style.programWrapper}
      style={{
        fontFamily: "Heebo",
        paddingRight: "21px",
      }}
    >
      <div className={style.programHeader}>
        <div>
          <h3
            style={{
              color: Colors.TEXT_GREY,
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            {props.title}
          </h3>
          {props.isExpanded ? null : (
            <div
              style={{
                marginTop: "4px",
                color: Colors.SAVTA_RED,
                fontSize: "16px",
              }}
            >
              <span>עוד</span>
            </div>
          )}
        </div>
        <div className={style.imageWrapper}>
          <Image
            src={props.imageUrl}
            height="52"
            width="55"
            alt={props.title}
          />
        </div>
      </div>
      <ProgramContent
        onPressTrack={onPlayTrack}
        programName={props.title}
        isCollapsed={!!props.isExpanded}
        programId={props.programId}
      />
    </div>
  );
};

interface ProgramContentProps {
  programName: string;
  isCollapsed: boolean;
  programId: string | number;
  onPressTrack: (recordedShow: RecordedShow) => void;
}
const ProgramContent: React.FC<ProgramContentProps> = (props) => {
  const { recordedShows } = useRecordedShowByProgramId(props.programId);
  const { songTitle } = usePlayerState();

  return (
    <>
      <div className={style.programContent} data-collapsed={props.isCollapsed}>
        <ul>
          {recordedShows
            ?.flat()
            .slice(0, 5)
            .map((recordedShow) => {
              return (
                <li
                  key={recordedShow.id}
                  data-is-playing={recordedShow.name === songTitle}
                  onClick={(e) => {
                    e.stopPropagation();
                    props.onPressTrack(recordedShow);
                  }}
                >
                  {recordedShow.name}
                </li>
              );
            })}
        </ul>
        <div
          className={style.archiveCtaWrapper}
          onClick={(e) => e.stopPropagation()}
        >
          <Link href={`/programs/${props.programId}`} passHref>
            <span>
              <a>לארכיון</a>
            </span>
          </Link>
        </div>
      </div>
    </>
  );
};
