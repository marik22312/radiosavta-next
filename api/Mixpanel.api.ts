import mixpanel from "mixpanel-browser";
import moment from "moment";
import { Track } from '../domain/Player';

const log = (event: string, opts: any) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`Mixpanel log: ${event}, params: ${JSON.stringify(opts)}`);
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
}) => {
  log("media.playRecordedShow", args);
};

export const logFooterPlayerPlay = () => {
	log('footerPlayer.play', {})
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
