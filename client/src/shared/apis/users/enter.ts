import { PATH_API } from '../../constants/api-path';
import { IUser } from '../../types';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import { queryKeyFactory } from '../query-key-factory';

export const enterUser = async () => {
  const response = await fetch(PATH_API.users.enter, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to enter user');
  }

  return response.json();
};

// query
export const useEnterUser = (
  other?: Omit<UseQueryOptions<Partial<IUser>, unknown, unknown>, 'queryKey'>
) => {
  return useQuery({
    queryKey: queryKeyFactory.users.me,
    queryFn: enterUser,
    gcTime: Infinity,
    staleTime: Infinity,
    ...other,
  }) as UseQueryResult<IUser, Error>;
};
