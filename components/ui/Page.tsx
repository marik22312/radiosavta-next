import React from 'react';
import style from './Page.module.scss';

export const Page: React.FC = ({children}) => {
	return (
		<div className={style.responsivePage}>
		<div className={style.pageWrapper}>
			{children}
		</div>
		</div>
	)
}