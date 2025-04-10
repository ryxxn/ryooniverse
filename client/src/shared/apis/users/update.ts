import { PATH_API } from '../../constants/api-path';
import { IUser } from '../../types';
import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { socket } from '../../utils';

export const updateUser = async (data: Partial<IUser>) => {
  const response = await fetch(PATH_API.users.update, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to update user');
  }

  return response.json();
};

// query
export const useUpdateUser = (
  options?: Omit<
    UseMutationOptions<Partial<IUser>, unknown, unknown>,
    'mutationKey'
  >
) => {
  return useMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
      const { id, username, character } = data;
      // socket
      socket.emit('update_user', {
        id,
        username,
        character,
      });
    },
    ...options,
  });
};
