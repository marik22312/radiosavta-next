import mixpanel from "mixpanel-browser";
import moment from "moment";
import { Track } from '../domain/Player';
import { Program } from '../domain/Program';

const log = (event: string, opts: any) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Mixpanel log: ${event}, params: ${JSON.stringify(opts)}, user: ${mixpanel.get_distinct_id()}`);
    return;
  }

  return mixpanel.track(event, {
    ...opts,
    current_time: moment.utc().toISOString(),
    distinct_id: mixpanel.get_distinct_id(),
  });
};

export const logPlayRecordedShow = (args: {
	programName: string;
	showName: string;
	source: 'HOMEPAGE' | 'PROGRAM_PAGE' | 'ARCHIVE'
	programId: number;
}) => {
  log("media.playRecordedShow", args);
};

export const logFooterPlayerPlay = () => {
	log('footerPlayer.play',{})
}
export const logPlayLive = ({streamerName}:{streamerName: string}) => {
	log('livePlayer.playLive', {streamerName})
}

export const logSearchRecordedShow = (searchQuery: string) => {
  log("archive.searchShow", {
    searchQuery,
  });
};

export const logFilterByRecordedShow = (showId: number) => {
  log("archive.searchShow", {
    showId,
  });
};
export const logResetFilterByProgram = () => {
  log("archive.searchShow", {
    showId: 'ALL',
  });
};
export const logOpenProgram = ({programId}:{programId: number}) => {
  log("programs.openProgram", {
    programId,
  });
};

export const logNavbarOpen = () => {
	log("navbar.open", {});
}
export const logNavbarClose = () => {
	log("navbar.close", {});
}

export const logAgendaOpen = () => {
  log("agenda.open", {});
};

export const logNavbarNavigation = (url: string) => {
	log('navbar.navigateTo', {
		url: url
	})
}

export const logWebVitals = ({eventName, value}:{eventName: string; value: number}) => {
  log('system.webVitals', {
    eventName,
    value,
  });
}

export const logShareRecordedShow = (args: {
	programName: string;
	showName: string;
	source: "HOMEPAGE" | "PROGRAM_PAGE" | "ARCHIVE" | 'FOOTER_PLAYER';
	programId?: number;
	showId: number;
	type: "NATIVE" | "CUSTOM" | "UNKNOWN"
}) => {
	log('recordedShows.share', args)
}
export const logShareLiveStream = (args: {
	streamerName?: string;
	type: "NATIVE" | "CUSTOM" | "UNKNOWN",
}) => {
	log('player.shareLiveStream', args)
}

export const logOpenSharedShow = (showId: string) => {
	log('archive.openSharedShow', {showId})
}
