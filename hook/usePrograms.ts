import { useQuery } from "react-query";
import { getAllActivePrograms, PaginatedRequest } from "../api/Programs.api";

export const usePrograms = (opts?: PaginatedRequest) => {
  const { data, isLoading } = useQuery(
    'active-programs',
    () => getAllActivePrograms(opts),
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
