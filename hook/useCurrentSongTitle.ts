import { useQuery } from "react-query";
import { getCurrentSongTitle, GetStreamInfoResponse } from "../api/RadioInfo.api";

interface UseSongTitleOptions {
  enabled?: boolean;
  refetchInterval?: number;
  onSuccess?: (data: GetStreamInfoResponse) => void;
}
export const useCurrentSongTitle = (opts?: UseSongTitleOptions) => {
  const { data, refetch } = useQuery(
    "currentSongTitle",
    getCurrentSongTitle,
	// () => Promise.resolve('Song title'),
    opts
  );

  return {
    songTitle: data?.streamTitle,
	streamer: data?.streamer || '',
    refetch,
  };
};
