import React from 'react';
import style from './Page.module.scss';

export const Page: React.FC = ({children}) => {
	return (
		<div className="responsive-page" style={{
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
		}}>
		<div className={style.pageWrapper}>
			{children}
		</div>
		</div>
	)
}