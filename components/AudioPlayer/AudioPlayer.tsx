import React, { useRef} from "react";
import { useLivePlayer } from '../../hook/useLivePlayer';
import { usePlayerState } from "../../providers/PlayerProvider/usePlayerState";
import { Seeker } from "./Seeker/Seeker";
import { usePlayerBindings } from './usePlayerBinding';

export const AduioPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const {seekerRef, currentTime} = usePlayerBindings(audioRef);

  const { audioUrl, isPlaying, isPaused } = usePlayerState();
  const {isLive} = useLivePlayer()

  const handlePlayerChange = (value: number) => {
    audioRef.current!.currentTime = value;
  };

  return (
    <>
	{((isPlaying || isPaused) && !isLive) ? <Seeker
		ref={seekerRef}
        currentTime={currentTime}
        durationTime={audioRef.current?.duration ?? 0}
        handlePlayerChange={handlePlayerChange}
      />: null}
      
      <audio ref={audioRef} src={audioUrl}></audio>
    </>
  );
};
