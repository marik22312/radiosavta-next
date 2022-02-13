import { useEffect, useState } from "react"
import { logAgendaOpen } from "../../api/Mixpanel.api";
import { Schedule } from "../../domain/Schedule";
import { useAgenda } from "../../hook/useAgenda";
import styles from './Agenda.module.scss';

export const Agenda: React.FC = () => {

    const [isOpen, setIsOpen] = useState<Boolean>(false)

    const [schedule, setSchedule] = useState<Schedule[]>([])

    const agendaClassName = isOpen ? styles.open : styles.closed;

    const { data } = useAgenda();

    useEffect(() => {
        if(data?.schedule) {
            const sorted = data?.schedule.sort((a,b) => {
                return new Date(a.start).getHours() - new Date(b.start).getHours();
              })
              setSchedule(sorted)
        }
    }, [data])

    const toggle = () => {
        if(!isOpen) {
            logAgendaOpen()
        }
        setIsOpen(!isOpen)
    }


    // @ts-expect-error
    const timeOptions: DateTimeFormatOptions = {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit'
      };

	return (
        <div className={`${styles.agendaWrapper} ${agendaClassName}`}>
            <button className={styles.agendaButton} onClick={() => toggle()} ><span className={styles.toggleIcon}></span></button>
            <div className={styles.agenda}>
                <h2 className={styles.agendaTitle}>
                    מה היום?
                </h2>
                {schedule.map((e: Schedule) => {
                    return (
                    <div className={styles.agendaProgram} key={e.id}>
                        <span className={styles.programName}>{e.name}</span> - <span className={styles.programTime}>{new Intl.DateTimeFormat('en-US', timeOptions).format(new Date(e.start))}</span>
                    </div>)
                })}
            </div>
        </div>
	)
}
