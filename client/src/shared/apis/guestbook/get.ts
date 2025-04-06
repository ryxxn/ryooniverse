import {
  InfiniteData,
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
} from '@tanstack/react-query';
import { PATH_API } from '../../constants/api-path';
import { IGuestbook } from '../../types';
import { queryKeyFactory } from '../query-key-factory';
import { makeQueryString } from '../../utils';

const getGuestbooks = async ({ pageParam: page }: { pageParam: unknown }) => {
  // * 일단 사이즈는 10으로 고정
  const query = makeQueryString({ page: page as string, size: '10' });

  const response = await fetch(PATH_API.guestbook.getAll + query, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Failed to fetch guestbooks');
  }
  return response.json();
};

// query
interface ResponseType {
  data: IGuestbook[];
  page: number;
  size: number;
  total: number;
  totalPage: number;
}

export const useGuestbooks = (
  props?: Omit<
    UseInfiniteQueryOptions,
    'queryKey' | 'initialPageParam' | 'getNextPageParam'
  >
) => {
  return useInfiniteQuery({
    queryKey: queryKeyFactory.guestbook.all,
    queryFn: getGuestbooks,
    initialPageParam: 1,
    getNextPageParam: (lastData: any) => {
      const isEnd = lastData?.page === lastData?.totalPages;
      return isEnd ? undefined : lastData?.page + 1;
    },
    gcTime: Infinity,
    staleTime: Infinity,
    ...props,
  }) as UseInfiniteQueryResult<InfiniteData<ResponseType>, Error>;
};
