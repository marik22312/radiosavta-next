import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const PlayerContext = createContext<PlayerContext | null>(null);

export enum PlayerState {
  STOPPED = "STOPPED",
  PLAYING = "PLAYING",
  PAUSED = 'PAUSED'
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
  const [audioRef, setAudioRef] = useState<HTMLAudioElement>();

  const [playerState, setPlayerState] = useState(PlayerState.STOPPED);
  const [audioSrc, setAudioSrc] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [programTitle, setProgramTitle] = useState<string>("");

  useEffect(() => {
	  const audio = new Audio("");

	//   const handleCanPlay = (e: any) => {
	// 	  console.log('Can play', e)
	//   }
	//   const handleLoadStart = (e: any) => {
	// 	  console.log('loadStart', audio?.src)
	//   }
	//   const handleLoadedData = (e: any) => {
	// 	  console.log('loadedData')
	//   }
	//   const handleError = () => {
	// 	  console.log('OnError')
	//   }
    if (!audioRef) {
      	setAudioRef(audio);
		// audio.addEventListener('canplay', handleCanPlay)
		// audio.addEventListener('loadstart', handleLoadStart)
		// audio.addEventListener('loadeddata', handleLoadedData)
		// audio.addEventListener('error', handleError)
	  }

	  return () => {
		// audio.removeEventListener('canplay', handleCanPlay)
		// audio.removeEventListener('loadstart', handleLoadStart)
		// audio.removeEventListener('loadeddata', handleLoadedData)
		// audio.removeEventListener('error', handleError)
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
