import { PATH_API } from '../constants/api-path';

export const queryKeyFactory = {
  guestbook: {
    all: [PATH_API.guestbook.getAll] as const,
  },
  users: {
    me: [PATH_API.users.enter] as const,
  },
};
