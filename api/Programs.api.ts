import { httpClient } from "./httpClient";

export interface PaginatedRequest {
  limit?: number;
  offset?: number;
  rand?: boolean;
}

export const getAllActivePrograms = (opts?: PaginatedRequest) => {
  return httpClient.get<{ activeShows: any[] }>("/v2/programs", {
    params: {
      ...opts,
    },
  });
};

export const getAllArchivedPrograms = (opts?: PaginatedRequest) => {
  return httpClient.get<{ archivedShows: any[] }>(
    "/v2/programs/archived",
    {
      params: {
        ...opts,
      },
    }
  );
};

export const getProgramById = (programId: string | number) => {
  return httpClient.get<{ program: any }>(
    `/v2/programs/${programId}`
  );
};
