import { NICKNAMES } from '../nicknames';

export const generateRandomNickname = () => {
  const randomIndex = Math.floor(Math.random() * NICKNAMES.length);
  return NICKNAMES[randomIndex];
};
