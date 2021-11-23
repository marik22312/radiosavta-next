import { useQuery } from "react-query";
import { PaginatedRequest, queryActivePrograms } from "../api/Programs.api";

export const usePrograms = (opts?: PaginatedRequest) => {
  const { data, isLoading } = useQuery(
    'active-programs',
    () => queryActivePrograms(opts),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  return {
    programs: data?.data?.activeShows || [],
    isLoading,
  };
};
