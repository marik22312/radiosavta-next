import React from 'react';
import styles from './TimeLineItem.module.scss';
import timeLineStyles from './TimeLineV2.module.scss';

import { TimelineData } from './TimelineData'

export interface TimeLineItemProps {
	imageSrc: string;
	date: string;
	title?: string;
	text: string;

}

export const TimeLineItem: React.FC<TimeLineItemProps> = (props) => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.image}>
				<img src={props.imageSrc} />
			</div>
			<div className={styles.details}>
				<h5>{props.date}</h5>
				<p>{props.text}</p>
			</div>
		</div>
	)
}

export const TimeLine: React.FC = (props) => {
	return (
		<div className={timeLineStyles.wrapper}>
			{TimelineData.map((item) => {
				return (
					<TimeLineItem key={item.id} imageSrc={item.img} date={item.date} text={item.text}/>
				)
			})}
		</div>
	)
}