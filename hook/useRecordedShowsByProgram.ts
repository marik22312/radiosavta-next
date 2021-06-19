import { useState } from "react";
import { useInfiniteQuery } from "react-query";
import { queryRecordedShows } from "../api/RecordedShows.api";

export const useRecordedShowByProgramId = (programId: string | number) => {
  const queryData = useInfiniteQuery(
    `recordedShows-progarm${programId}`,
	// someCode
    ({ pageParam = 1 }) => queryRecordedShows({ programId, page: pageParam }),
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
