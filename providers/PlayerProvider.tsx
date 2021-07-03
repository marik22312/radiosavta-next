import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const PlayerContext = createContext<PlayerContext | null>(null);

export enum PlayerState {
  STOPPED = "STOPPED",
  PLAYING = "PLAYING",
}

export interface PlayerContext {
  audioRef: HTMLAudioElement;
  playerState: PlayerState;
  audioSrc: string;
  title: string;
  programTitle: string;
  setAudioSrc(ket: string): void;
  setPlayerState(state: PlayerState): void;
  setTitle(title: string): void;
  setProgramTitle(title: string): void;
}
export const PlayerProvider: React.FC = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement>();

  const [playerState, setPlayerState] = useState(PlayerState.STOPPED);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [programTitle, setProgramTitle] = useState<string>("");

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("");
    }
    // const ref = audioRef.current;
    // return () => {
    //   ref.src = "";
    // };
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        playerState,
        setAudioSrc,
        setPlayerState,
        audioSrc,
        audioRef: audioRef.current!,
        title,
        setTitle,
		programTitle,
		setProgramTitle
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
