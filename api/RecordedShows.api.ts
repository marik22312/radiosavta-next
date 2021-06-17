import { RecordedShow } from "../domain/RecordedShow";
import { httpClient } from "./httpClient";

export const queryRecordedShows = (params?: {
  page?: number;
  limit?: number;
  programId?: number | string;
}) => {
  return httpClient.get<{ recordedShows: RecordedShow[]; pageData: any }>(
    "/v2/recorded-shows",
    {
      params,
    }
  );
};
