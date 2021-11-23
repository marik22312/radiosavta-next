import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { queryRecordedShows } from "../api/RecordedShows.api";

export const useRecordedShows = (args?: {search?: string, programId?: number, limit?: number}) => {
  const queryData = useInfiniteQuery(
    `recordedShows-archive${args?.search}${args?.programId}`,
	// someCode
    ({ pageParam = 1 }) => queryRecordedShows({ page: pageParam, search: args?.search || undefined, programId: args?.programId, limit: args?.limit || undefined }),
    {
      getNextPageParam: (lastPage) => lastPage.data.pageData.next.page,
      refetchOnWindowFocus: false,
    }
  );
  const {data, isLoading, hasNextPage, fetchNextPage} = queryData;
  
  const fetchNext = () => {
    fetchNextPage();
  };

  return {
    recordedShows: data?.pages.map((p) => p.data.recordedShows),
    isLoading,
    fetchNext,
    hasNextPage,
  };
};
