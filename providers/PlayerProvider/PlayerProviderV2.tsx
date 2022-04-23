import React, { useState } from "react";

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
}

export const PlayerContext = React.createContext<AudioContext | null>(null);

export const AudioPlayerProvider: React.FC = (props) => {
  const [imageUrl, setImageUrl] = useState<string>('https://res.cloudinary.com/marik-shnitman/image/upload/v1637258645/radiosavta/assets/ogImage.jpg');
  const [songTitle, setSongTitle] = useState<string>("לחץ פליי לשידור חי");
  const [artist, setArtist] = useState<string>("רדיוסבתא");
  const [audioUrl, setAudioUrl] = useState<string>();
  const [playerState, setPlayerState] = useState(PlayerState.STOPPED);

  return (
    <PlayerContext.Provider
      value={{
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
