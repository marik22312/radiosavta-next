
import React,{ useRef, useState } from 'react';

import { QueryClient, QueryClientProvider } from "react-query";
import { NextPageWithLayout } from "../../domain/AppProps";
import { useCurrentSongTitle } from "../../hook/useCurrentSongTitle";

import PlayButton from "./components/assets/Play.svg";
import Logo from "./components/assets/Logo.svg";
import VolumeIcon from "./components/assets/volume.svg";
import style from "./player.module.scss";
import { usePlayerBindings } from '../../components/FooterPlayer/AudioPlayer/usePlayerBinding';
import { PlayerState } from '../../providers/PlayerProvider/PlayerProviderV2';
import { LIVE_STREAM_URL } from '../../config/stream';

const queryClient = new QueryClient();
const EmbeddedPlayerPage: NextPageWithLayout = () => {

	const audioRef = useRef<HTMLAudioElement>(null);
	const [audioUrl, setAudioUrl] = useState('');
	const [playerState, setPlayerState] = useState(PlayerState.STOPPED);
	
	const {songTitle, streamer: artist} = useCurrentSongTitle({
		enabled: playerState === PlayerState.PLAYING,
		refetchInterval: 5000,
	})

	const onCanPlay = () => {
		setPlayerState(PlayerState.PLAYING);
	};
	const onEnded = () => {
		setPlayerState(PlayerState.STOPPED);
	};
	const onLoadStart = () => {
		setPlayerState(PlayerState.LOADING);
	};
	const onError = () => {
		setPlayerState(PlayerState.STOPPED);
	};

	usePlayerBindings(audioRef, playerState, audioUrl, {
		onCanPlay,
		onEnded,
		onLoadStart,
		onError,
	});

	const onPlay = () => {

		if (playerState === PlayerState.PLAYING) {
			setPlayerState(PlayerState.STOPPED);
			setAudioUrl('');
			return;
		}

		setPlayerState(PlayerState.PLAYING);
		setAudioUrl(LIVE_STREAM_URL)
	}

	const onVolumeChange = (e: any) => {
		if (audioRef.current) {
			audioRef.current.volume = e.target.value;
		}
	}
  return (
    <div className={style.radiosavtaPlayer}>
      <div className={style.playerWrapper}>
        <div className="playPauseButtonWrapper">
          <img src={PlayButton} alt="Play" onClick={onPlay}/>
        </div>
        <div className={style.currentSongInfo}>
          <h2 className={style.songTitle}>
            {audioUrl ? songTitle : 'רדיוסבתא - נגן לייב'}
          </h2>
          <p className={style.artistName}>{audioUrl ? artist || 'אוטו דיגיי' : 'לחיצה על פליי לשידור'}</p>
        </div>
        <div className={style.volumeControlsWrapper}>
			<div className={style.volumeIconWrapper}><img src={VolumeIcon} alt=""/></div>
			<input className={style.volumeSlider} type="range" min="0" max="1" step="0.05" defaultValue="1" onChange={onVolumeChange}/>
		</div>
        <div className={style.logoWrapper}>
          <img src={Logo} alt="רדיוסבתא"/>
        </div>
      </div>
	  <audio ref={audioRef} src={audioUrl}/>
    </div>
  );
};

const WrappedEmbeddedPlayer: NextPageWithLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <EmbeddedPlayerPage />
    </QueryClientProvider>
  );
};

WrappedEmbeddedPlayer.getLayout = function getLayout(page) {
  return <>{page}</>;
};

export default WrappedEmbeddedPlayer;
