import { useState } from "react"
import { Schedule } from "../../domain/Schedule";
import { useAgenda } from "../../hook/useAgenda";
import styles from './Agenda.module.scss';

export const Agenda: React.FC = () => {

    const [isOpen, setIsOpen] = useState<Boolean>(false)

    const agendaClassName = isOpen ? styles.open : styles.closed;

    const { data } = useAgenda();

    const timeOptions: DateTimeFormatOptions = {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit'
      };

	return (
        <div className={`${styles.agendaWrapper} ${agendaClassName}`}>
            <button className={styles.agendaButton} onClick={() => setIsOpen(!isOpen)} ><span className={styles.toggleIcon}></span></button>
            <div className={styles.agenda}>
                {data?.schedule.map((e: Schedule) => {
                    return (
                    <div className={styles.agendaProgram} key={e.id}>
                        <span className={styles.programName}>{e.name}</span> - <span className={styles.programTime}>{new Intl.DateTimeFormat('en-US', timeOptions).format(e.start_timestamp)}</span>
                    </div>)
                })}
            </div>
        </div>
	)
}