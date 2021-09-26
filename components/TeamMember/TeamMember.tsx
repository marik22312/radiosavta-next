import React from 'react';
import styles from './TeamMember.module.scss';

interface TeamMemberProps {
	image: string;
	name: string;
	role: string;
}

export const TeamMember: React.FC<TeamMemberProps> = (member) => {
	return <div  key={`member-${member.name}`}className={styles.memberWrapper}>
	<div className={styles.imageWrap}>
	  <img src={member.image} alt={member.name} />
	</div>
	<div className={styles.memberInfo}>
	  <h3>{member.name}</h3>
	  <p>{member.role}</p>
	</div>
  </div>
}
