import { QueryClient, useQuery } from "react-query";
import { getAgenda } from "../api/RadioInfo.api";

export const prefetchAgenda = (queryClient: QueryClient) => {
	return queryClient.prefetchQuery("agenda", getAgenda);
}
export const useAgenda = () => {
  const { data, refetch } = useQuery(
    "agenda",
    getAgenda,
  );

  return {
    data
  };
};
