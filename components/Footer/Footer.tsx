import { faFacebook, faInstagram, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
		<div className={styles.socialsWrapper}>
			<div className={styles.socialIconsWrapper}>
				<SocialIcon url={'mailto:radiosavta@gmail.com'} icon={faEnvelope}/>
				<SocialIcon url={'https://www.instagram.com/radiosavta"'} icon={faInstagram}/>
				<SocialIcon url={'https://www.facebook.com/radiosavta'} icon={faFacebook}/>
			</div>
			<p className={styles.socialsText}>כתבו לנו | עקבו אחרינו  | שתפו אותנו</p>
		</div>
		<div>
				<img src={`${BASE_IMAGE_ICON}radiosavta/assets/white_acum`} className={styles.acumLogo} alt={'אקו"ם'}/>
		</div></footer>
	)
}

const SocialIcon: React.FC<{
	url: string;
	icon: IconDefinition;
}> = (props) => {
return (
	<a
            className={styles.socialIcon}
            target="_blank"
            href={props.url}
			rel="noreferrer noopener"
          >
            <FontAwesomeIcon icon={props.icon} size="1x" color="white" />
          </a>
)
}