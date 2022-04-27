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
}
