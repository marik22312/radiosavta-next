import moment from "moment";
import { useState } from "react"
import { Schedule } from "../../domain/Schedule";
import { useAgenda } from "../../hook/useAgenda";
import styles from './Agenda.module.scss';
import Arrow from '../../images/arrow.svg';

export const Agenda: React.FC = () => {

    const [isOpen, setIsOpen] = useState<Boolean>(false)

    const agendaClassName = isOpen ? styles.dFlex : styles.dNone;

    const schedule = useAgenda();

    const timeOptions = {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit'
      };

	return (
        <div className={`${styles.agendaWrapper} ${agendaClassName}`}>
            <button className={styles.agendaButton} onClick={() => setIsOpen(!isOpen)} ><img src={Arrow} /></button>
            <div>
                {schedule?.data?.schedule.map((e: Schedule) => {
                    return (<p>{e.name} - {new Intl.DateTimeFormat('en-US', timeOptions).format(e.start_timestamp)}</p>)
                })}
            </div>
        </div>
	)
}