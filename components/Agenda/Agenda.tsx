import { useState } from "react"
import styles from './Agenda.module.scss'

export const Agenda: React.FC = () => {

    const [isOpen, setIsOpen] = useState<Boolean>(false)

	return (
        <div className={styles.agendaWrapper}>
            <button onClick={() => setIsOpen(!isOpen)} >{'>'}</button>
            <div className={isOpen ? styles.dFlex : styles.dNone}>
                <p>08:00 - דיסקו פילינג</p> <br />
                <p>08:00 - דיסקו פילינג</p> <br />
                <p>08:00 - דיסקו פילינג</p> <br />
                <p>08:00 - דיסקו פילינג</p> <br />
            </div>
        </div>
	)
}