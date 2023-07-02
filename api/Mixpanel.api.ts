import mixpanel from "mixpanel-browser";
import moment from "moment";
import { Track } from "../domain/Player";
import { Program } from "../domain/Program";

const log = (event: string, opts: any) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(
      `Mixpanel log: ${event}, params: ${JSON.stringify(
        opts
      )}, user: ${mixpanel.get_distinct_id()}`
    );
    return;
  }

  return mixpanel.track(event, {
    ...opts,
    current_time: moment.utc().toISOString(),
    distinct_id: mixpanel.get_distinct_id(),
  });
};

export const logLandingPagePressOnEnterSite = () => {
  log("landingPage.pressOnEnterSite", {});
};

export const logPlayRecordedShow = (args: {
  programName: string;
  showName: string;
  source: "HOMEPAGE" | "PROGRAM_PAGE" | "ARCHIVE";
  programId: number;
}) => {
  log("media.playRecordedShow", args);
};

export const logFooterPlayerPlay = () => {
  log("footerPlayer.play", {});
};

export const logFooterPlayerPause = () => {
  log("footerPlayer.pause", {});
};

export enum Origins {
  LANDING_PAGE = "LANDING_PAGE",
  PROGRAM_PAGE = "PROGRAM_PAGE",
  ARCHIVE = "ARCHIVE",
  FOOTER_PLAYER = "FOOTER_PLAYER",
}
export const logPlayLive = ({
  streamerName,
  origin,
}: {
  streamerName?: string;
  origin?: Origins;
}) => {
  log("livePlayer.playLive", {
    streamerName: streamerName ?? "NA",
    origin: origin ?? "NA",
  });
};

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
    showId: "ALL",
  });
};
export const logOpenProgram = ({ programId }: { programId: number }) => {
  log("programs.openProgram", {
    programId,
  });
};

export const logExpandProgram = ({
  programId,
  programName,
}: {
  programId?: number;
  programName: string;
}) => {
  log("programs.expandProgram", {
    programId,
    programName,
  });
};

export const logNavbarOpen = () => {
  log("navbar.open", {});
};
export const logNavbarClose = () => {
  log("navbar.close", {});
};

export const logAgendaOpen = () => {
  log("agenda.open", {});
};

export const logNavbarNavigation = ({
  url,
  currentUrl,
  targetUrl,
}: {
  url: string;
  currentUrl?: string;
  targetUrl?: string;
}) => {
  log("navbar.navigateTo", {
    url: url,
    current: currentUrl,
    target: targetUrl,
  });
};

export const logWebVitals = ({
  eventName,
  value,
}: {
  eventName: string;
  value: number;
}) => {
  log("system.webVitals", {
    eventName,
    value,
  });
};

export const logShareRecordedShow = (args: {
  programName: string;
  showName: string;
  source: "HOMEPAGE" | "PROGRAM_PAGE" | "ARCHIVE" | "FOOTER_PLAYER";
  programId?: number;
  showId: number;
  type: "NATIVE" | "CUSTOM" | "UNKNOWN";
}) => {
  log("recordedShows.share", args);
};
export const logShareLiveStream = (args: {
  streamerName?: string;
  type: "NATIVE" | "CUSTOM" | "UNKNOWN";
}) => {
  log("player.shareLiveStream", args);
};

export const logOpenSharedShow = (showId: string) => {
  log("archive.openSharedShow", { showId });
};

export const logPlayFromEmbeddedPlayer = (args: {
  streamer: string;
  parentOrigin: string;
}) => {
  log("player.playFromEmbeddedPlayer", args);
};

export const logFooterPlayerExpand = ({ state }: { state: string }) => {
  log("footerPlayer.expand", {
    state,
  });
};

interface ClickOnSubmitContactFormArgs {
	hasName?: boolean;
	hasEmail?: boolean;
	hasMessage?: boolean;
}
export const logClickOnSubmitContactForm = ({hasEmail,hasMessage,hasName}:ClickOnSubmitContactFormArgs) => {
  log("contactForm.submit", {
	hasEmail,
	hasMessage,
	hasName,
  });
}
