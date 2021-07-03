import { useQuery } from "react-query";
import { getCurrentSongTitle } from "../api/RadioInfo.api";

interface UseSongTitleOptions {
  enabled?: boolean;
  refetchInterval?: number;
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
    refetch,
  };
};
