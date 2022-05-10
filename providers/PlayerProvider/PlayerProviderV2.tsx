import React, { useState } from "react";
import { DEFAULT_PLAYER_IMAGE } from '../../config/images';
import { TrackMetaData, TrackV2 } from '../../domain/Player';

export enum PlayerState {
  STOPPED = "STOPPED",
  PLAYING = "PLAYING",
  PAUSED = "PAUSED",
  LOADING = "LOADING",
}

export interface AudioContext {
  imageUrl?: string;
  setImageUrl(url: string): void;
  songTitle?: string;
  setSongTitle(songTitle: string): void;
  artist?: string;
  setArtist(artist: string): void;
  audioUrl?: string;
  setAudioUrl(url: string): void;
  playerState: PlayerState;
  setPlayerState(state: PlayerState): void;
  metaData: TrackMetaData;
  setMetaData(metaData: any): void,
}

export const PlayerContext = React.createContext<AudioContext | null>(null);

export const AudioPlayerProvider: React.FC = (props) => {
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_PLAYER_IMAGE);
  const [songTitle, setSongTitle] = useState<string>("לחץ פליי לשידור חי");
  const [artist, setArtist] = useState<string>("רדיוסבתא");
  const [audioUrl, setAudioUrl] = useState<string>();
  const [playerState, setPlayerState] = useState(PlayerState.STOPPED);
  const [metaData, setMetaData] = useState<TrackMetaData>({})

  return (
    <PlayerContext.Provider
      value={{
		  metaData, setMetaData,
        imageUrl,
        setArtist,
        setAudioUrl,
        setImageUrl,
        setSongTitle,
        songTitle,
        artist,
        audioUrl,
        playerState,
        setPlayerState,
      }}
    >
      {props.children}
    </PlayerContext.Provider>
  );
};
