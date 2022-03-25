import { ScheduleResponse } from "../domain/Schedule";
import { httpClient } from "./httpClient";

export interface GetStreamInfoResponse {
  streamTitle: string;
  streamSource: string;
  streamer: string;
}
export const getCurrentSongTitle = async () => {
  const { data } = await httpClient.get<GetStreamInfoResponse>(
    "/v2/stream-info"
  );
  return data;
};

export const getAgenda = async () => {
  const { data } = await httpClient.get<ScheduleResponse>(
    "/V2/schedule"
  )
  return data;
}