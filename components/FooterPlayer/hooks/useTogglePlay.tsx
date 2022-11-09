import { logFooterPlayerPause, logFooterPlayerPlay } from '../../../api/Mixpanel.api';
import { useLivePlayer } from '../../../hook/useLivePlayer';
import { usePlayerControls } from '../../../providers/PlayerProvider/usePlayerControls';
import { usePlayerState } from '../../../providers/PlayerProvider/usePlayerState';

export const useTogglePLay = () => {

	const {isStopped, isPaused} = usePlayerState();
	const {resume, pause} =  usePlayerControls();
	const {isLive, toggleLive} = useLivePlayer();
	
	const togglePlay = () => {
		debugger;
		if (isStopped || isLive) {
		  return toggleLive();
		}
		if (isPaused) {
		  return resume();
		}
		logFooterPlayerPause();
		return pause();
	  };

	return {togglePlay}
}