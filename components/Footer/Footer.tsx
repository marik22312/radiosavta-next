import React from 'react';
import { BASE_IMAGE_ICON } from '../../config/images';

import styles from './Footer.module.scss';

export const Footer: React.FC = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.logoColumnWrapper}>
				<div className={styles.logoWrapper}>
				<img src={`${BASE_IMAGE_ICON}radiosavta/logo_head`} width="100%" height="100%"/>
				</div>
				<div className={styles.logoText}>

				<h5>רדיוסבתא</h5>
				<p>קולקטיב רדיו אינטרנטי</p>
				</div>
			</div>
		<div>links</div>
		<div>akum</div></footer>
	)
}