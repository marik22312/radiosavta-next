import { Schedule, ScheduleResponse } from "../domain/Schedule";
import { httpClient } from "./httpClient";

interface getStreamInfoResponse {
  streamTitle: string;
  streamSource: string;
  streamer: string;
}
export const getCurrentSongTitle = async () => {
  const { data } = await httpClient.get<getStreamInfoResponse>(
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