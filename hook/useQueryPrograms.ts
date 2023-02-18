import {QueryClient, useInfiniteQuery, useQuery } from 'react-query';
import { queryPrograms, QueryProgramsRequest } from '../api/Programs.api';

export const prefetchQueryPrograms = (queryClient: QueryClient, req: QueryProgramsRequest) => {
	return queryClient.prefetchInfiniteQuery(['query-programs', req], () => queryPrograms(req));
}

export const useQueryPrograms = (req: QueryProgramsRequest) => {
	const {data, ...rest} = useInfiniteQuery(['query-programs', req], () => queryPrograms(req));

	return {
		programs: data?.pages.map(p => p.data.programs).flat() ?? [],
		...rest
	}
}