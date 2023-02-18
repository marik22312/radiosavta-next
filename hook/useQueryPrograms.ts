import {QueryClient, useQuery } from 'react-query';
import { queryPrograms, QueryProgramsRequest } from '../api/Programs.api';

export const prefetchQueryPrograms = (queryClient: QueryClient, req: QueryProgramsRequest) => {
	return queryClient.prefetchQuery(['query-programs', req], () => queryPrograms(req));
}

export const useQueryPrograms = (req: QueryProgramsRequest) => {
	const {data, ...rest} = useQuery(['query-programs', req], () => queryPrograms(req));

	return {
		programs: data?.data.programs || [],
		...rest
	}
}