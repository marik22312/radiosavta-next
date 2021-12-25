import Link from 'next/link';
import React from "react";
import { logOpenProgram } from '../../api/Mixpanel.api';
import { BASE_IMAGE_AVATAR, BASE_IMAGE_ICON } from '../../config/images';
import { Program } from "../../domain/Program";
import { programParser } from '../../parsers/Programs.parser';
import { getDayOfWeek } from "../../utils/program.utils";
import styles from "./ProgramTile.module.scss";

export const ProgramTile: React.FC<{ program: Program }> = ({ program }) => {
  return (
    <div key={`program-${program.id}`} className={styles.programTile} style={{backgroundImage: `url('${programParser.programImage(program)}')`}}>
      <div className={styles.topSection}>
        <div>
          <h3 className={styles.title}>{programParser.name(program)}</h3>
        </div>
        <div>
          <p className={styles.time}>
            {Intl.DateTimeFormat("he", { weekday: "long" }).format(
              getDayOfWeek(program)
            )}{" "}
            - {program.programTimes.start_time}
          </p>
        </div>
      </div>
      <div className={styles.bottomSection}>
        <div className={styles.broadcasters}>
          {program.users.map((u) => {
            return <div key={`user-${u.id}`} className={styles.user} style={{
				backgroundImage: `url('${BASE_IMAGE_AVATAR}/${u.profile_image}')`
			}}></div>;
          })}
        </div>
        <div className={styles.seeProgram}>
			<Link href={`/archive?programId=${program.id}`}>
				<a onClick={() => logOpenProgram({programId:program.id})}>עבור לתוכנית</a>
			</Link>
		</div>
      </div>
    </div>
  );
};
