import toast from 'react-hot-toast';
import { PATH_API } from '../../constants/api-path';
import { IGuestbook } from '../../types';
import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';
import { queryKeyFactory } from '../query-key-factory';

type Payload = Pick<IGuestbook, 'message' | 'isPrivate'>;

export const createGuestbook = async (data: Payload) => {
  const response = await fetch(PATH_API.guestbook.create, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to create guestbook');
  }

  return response.json();
};

// query
export const useCreateGuestbook = (
  options?: Omit<UseMutationOptions<Payload, unknown, unknown>, 'mutationKey'>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createGuestbook,
    onSuccess: () => {
      toast.success('방명록이 등록되었습니다.');
      queryClient.invalidateQueries({
        queryKey: queryKeyFactory.guestbook.all,
      });
    },
    onError: () => {
      toast.error('방명록 등록에 실패했습니다. 잠시 후 다시 시도해주세요.');
    },
    ...options,
  });
};
