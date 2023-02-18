import { Program } from '../domain/Program';
import { httpClient } from "./httpClient";

export interface PaginatedRequest {
  limit?: number;
  offset?: number;
  rand?: boolean;
}

export const getAllActivePrograms = (opts?: PaginatedRequest) => {
  return httpClient.get<{ activeShows: Program[] }>("/v2/programs", {
    params: {
      ...opts,
    },
  });
};

export const getAllArchivedPrograms = (opts?: PaginatedRequest) => {
  return httpClient.get<{ archivedShows: Program[] }>(
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

export interface QueryProgramsRequest {
	sort?: {
		orderBy: 'ASC' | 'DESC';
		field: 'program.recordedShow';
	}
}
export const queryPrograms = (req: QueryProgramsRequest) => {
	return httpClient.post<{ programs: Program[] }>('/v2/programs/query', req);
}
