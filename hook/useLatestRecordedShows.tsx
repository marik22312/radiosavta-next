import { QueryClient, useQuery } from "react-query";
import { queryRecordedShows } from "../api/RecordedShows.api";

interface LatestRecordedShowsFilter {
  limit?: number;
}
export const prefetchLatestRecordedShows = (
  queryClient: QueryClient,
  args?: LatestRecordedShowsFilter
) => {
  return queryClient.prefetchQuery(
    `recordedShows-latest`,
    () =>
      queryRecordedShows({
        limit: args?.limit || undefined,
      })
  );
};

export const useLatestRecordedShows = (args?: LatestRecordedShowsFilter) => {
  const queryData = useQuery(
    `recordedShows-latest`,
    // someCode
    () =>
      queryRecordedShows({
        limit: args?.limit || undefined,
      }),
    {
      refetchOnWindowFocus: false,
    }
  );
  const { data, isLoading } = queryData;

  return {
    recordedShows: data?.data.recordedShows,
    isLoading,
  };
};
