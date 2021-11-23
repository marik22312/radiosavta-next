import React, { useCallback, useEffect, useRef } from "react";
import styles from '../../pages/programs/ProgramsPage.module.scss';

import { ProgramTile } from "../ProgramTile/ProgramTile";
import { Program } from "../../domain/Program";

export const ProgramsListStandalone: React.FC<{ programs: Program[] }> = (props) => {

	const {programs} = props;

	if (!programs.length) {
		return <div className="recordedShowsListWrapper">לא נמצאו תוכניות</div>;
	}
	return (
		<>
			<section className={styles.programsList}>
				{programs.map((program) => {
					return (
						<div key={program.id} className={styles.programWrapper}>
							<ProgramTile program={program} />
						</div>
					);
				})}
			</section>
		</>
	);
};
