import { useEffect, useState } from "react";
import { Schedule } from "../../domain/Schedule";
import { useAgenda } from "../../hook/useAgenda";
import styles from "./Agenda.module.scss";

export const Agenda: React.FC<{ open?: boolean }> = (
  props
) => {
  const [isOpen, setIsOpen] = useState<Boolean>(false);

  const [schedule, setSchedule] = useState<Schedule[]>([]);

  const agendaClassName = props.open
    ? styles.show
    : isOpen
    ? styles.open
    : styles.closed;

  const { data } = useAgenda();

  useEffect(() => {
    if (data?.schedule) {
      const sorted = data?.schedule.sort((a, b) => {
        return new Date(a.start).getHours() - new Date(b.start).getHours();
      });
      setSchedule(sorted);
    }
  }, [data]);

  // @ts-expect-error
  const timeOptions: DateTimeFormatOptions = {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <>
      <div className={`${styles.agendaWrapper} ${agendaClassName}`}>
        <div className={styles.agenda}>
          <h2 className={styles.agendaTitle}>מה הלו&quot;ז?</h2>
          {schedule.map((e) => {
            return (
              <div className={styles.agendaProgram} key={e.id}>
                <span className={styles.programName}>{e.name}</span> -{" "}
                <span className={styles.programTime}>
                  {new Intl.DateTimeFormat("en-US", timeOptions).format(
                    new Date(e.start)
                  )}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
