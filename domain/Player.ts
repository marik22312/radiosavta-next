export interface Track {
  title: string;
  url: string;
  programTitle: string;
  trackId: string | number;
}

export interface TrackV2 {
  artist: string;
  title: string;
  audioUrl: string;
  imageUrl: string;
  metaData: TrackMetaData;
}

export interface TrackMetaData {
	programId?: string | number;
	recordedShowId?: string | number;
	
}

export enum PlayerWrapperState {
  Initial = "initial",
  Active = "active",
  Inactive = "inactive",
}