import {
  faCalendarPlus,
  faCalendarMinus,
  faBroadcastTower,
  faShareAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { logAgendaOpen } from "../../api/Mixpanel.api";
import { Schedule } from "../../domain/Schedule";
import { useAgenda } from "../../hook/useAgenda";
import { useLivePlayer } from "../../hook/useLivePlayer";
import styles from "./Agenda.module.scss";

export const Agenda: React.FC<{ onShare: () => void; open?: boolean }> = (
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
  const { isLive, toggleLive } = useLivePlayer();

  useEffect(() => {
    if (data?.schedule) {
      const sorted = data?.schedule.sort((a, b) => {
        return new Date(a.start).getHours() - new Date(b.start).getHours();
      });
      setSchedule(sorted);
    }
  }, [data]);

  const toggle = () => {
    if (!isOpen) {
      logAgendaOpen();
    }
    setIsOpen(!isOpen);
  };

  // @ts-expect-error
  const timeOptions: DateTimeFormatOptions = {
    hourCycle: "h23",
    hour: "2-digit",
    minute: "2-digit",
  };

  return (
    <>
      <div className={`${styles.agendaWrapper} ${agendaClassName}`}>
        {!props.open && (
          <div className={styles.agendaButton}>
            <button
              className={styles.toggleIcon}
              onClick={() => toggle()}
              title="מה בלוז"
            >
              <FontAwesomeIcon
                icon={isOpen ? faCalendarMinus : (faCalendarPlus as any)}
                color="white"
              />
              <span>מה בלו&quot;ז?</span>
            </button>
            {!isLive && (
              <button
                className={styles.toggleIcon}
                onClick={() => props.onShare()}
                title="חזרה לשידור החי"
              >
                <FontAwesomeIcon icon={faShareAlt as any} color="white" />
                <span>שיתוף</span>
              </button>
            )}
            {!isLive && (
              <button
                className={styles.toggleIcon}
                onClick={() => toggleLive()}
                title="חזרה לשידור החי"
              >
                <FontAwesomeIcon icon={faBroadcastTower as any} color="white" />
                <span>חזרה לשידור חי</span>
              </button>
            )}
          </div>
        )}
        <div className={styles.agenda}>
          <h2 className={styles.agendaTitle}>מה הלו"ז?</h2>
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
