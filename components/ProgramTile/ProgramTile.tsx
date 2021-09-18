import Link from 'next/link';
import React from "react";
import { BASE_IMAGE_AVATAR, BASE_IMAGE_ICON } from '../../config/images';
import { Program } from "../../domain/Program";
import { getDayOfWeek } from "../../utils/program.utils";
import styles from "./ProgramTile.module.scss";

export const ProgramTile: React.FC<{ program: Program }> = ({ program }) => {
  return (
    <div key={`program-${program.id}`} className={styles.programTile} style={{backgroundImage: `url('${BASE_IMAGE_ICON}/${program.cover_image}')`}}>
      <div className={styles.topSection}>
        <div>
          <h3 className={styles.title}>{program.name_he}</h3>
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
			<Link href={`/programs/${program.id}`}>
			<a>עבור לתוכנית</a>
			</Link>
		</div>
      </div>
    </div>
  );
};
