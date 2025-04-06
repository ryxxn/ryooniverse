import { API_URL } from './env-variables';

const joinPath = (path: string) => {
  return API_URL + path;
};

export const PATH_API = {
  users: {
    enter: joinPath('/users/enter'),
    update: joinPath('/users'),
  },
  guestbook: {
    getAll: joinPath('/guestbook'),
    create: joinPath('/guestbook'),
    // delete: (id: string) => joinPath(`/guestbook/${id}`),
  },
};
