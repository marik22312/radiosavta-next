import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import styles from "./Timeline.module.scss";
import cn from 'classnames';
import { TimelineData } from './TimelineData';


export const Timeline: React.FC<any> = () => {
	return (
	<VerticalTimeline className={styles.timelineWrapper} >
		{TimelineData.map((timelineItem) => {
			return (
				<VerticalTimelineElement
					key={timelineItem.id}
					className="vertical-timeline-element--work"
					contentStyle={{ background: 'transparent', color: '#000', boxShadow: "none", paddingTop: 0 }}
					contentArrowStyle={{ display: 'none' }}
					iconClassName={styles.timelineCircle}
					date=""
				>
					<div className={cn("rtl", styles.timeLineItemWrapper)}>
						<h3 className={styles.timelineTitle}>{timelineItem.title}</h3>
						<span>{timelineItem.date}</span>
						<br />
						<br />
						<p className={styles.timelineText}>
							{timelineItem.text}
						</p>
					</div>
					<span className={cn("vertical-timeline-element-date", styles.timelineImageWrapper)}>
							<img className={styles.timelineImage} src={timelineItem.img} alt="Our team image" />
					</span>
					{/* <p><img src="http://lorempixel.com/1920/400/people/team-image-here/" alt="Our team image" /></p> */}
				</VerticalTimelineElement>
			)
		})}
	</VerticalTimeline>
	)
}