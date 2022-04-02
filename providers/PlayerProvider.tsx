import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { RecordedShow } from "../domain/RecordedShow";

const PlayerContext = createContext<PlayerContext | null>(null);

export enum PlayerState {
  STOPPED = "STOPPED",
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
  LOADING = "LOADING",
}

export interface PlayerContext {
  audioRef: HTMLAudioElement;
  playerState: PlayerState;
  audioSrc: string;
  currentTime: number;
  title: string;
  programTitle: string;
  animationRef: ReturnType<typeof useRef>;
  seekerRef: ReturnType<typeof useRef>;
  setAudioSrc(ket: string): void;
  setCurrentTime(ket: number): void;
  setPlayerState(state: PlayerState): void;
  setTitle(title: string): void;
  setProgramTitle(title: string): void;
  trackId: string | number;
  setTrackId: (trackId: string | number) => void;
}
export const PlayerProvider: React.FC = ({ children }) => {
  const [audioRef, setAudioRef] = useState<HTMLAudioElement>();
  const animationRef = useRef<any>();
  const seekerRef = useRef<any>();

  const [playerState, setPlayerState] = useState(PlayerState.STOPPED);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [programTitle, setProgramTitle] = useState<string>("");
  const [currentTime, setCurrentTime] = useState(0);
  const [trackId, setTrackId] = useState<string | number>("");

  useEffect(() => {
    const audio = new Audio("");

    if (!audioRef) {
      setAudioRef(audio);
    }
  }, [audioRef]);

  return (
    <PlayerContext.Provider
      value={{
        playerState,
        setAudioSrc,
        setPlayerState,
        audioSrc,
        audioRef: audioRef!,
        title,
        setTitle,
        programTitle,
        setProgramTitle,
        animationRef,
        seekerRef,
        currentTime,
        setCurrentTime,
        trackId,
        setTrackId,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const playerContext = useContext(PlayerContext);

  if (!playerContext) {
    throw new Error("PlayerProviderIsNotFound");
  }

  return playerContext;
};
