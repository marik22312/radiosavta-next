import { useQuery } from "react-query";
import { getAgenda } from "../api/RadioInfo.api";

export const useAgenda = () => {
  const { data, refetch } = useQuery(
    "agenda",
    getAgenda,
  );

  return {
    data
  };
};
