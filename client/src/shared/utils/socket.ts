import { io, Socket } from 'socket.io-client';

export const socket: Socket = io(import.meta.env.VITE_WS_URL, {
  path: '/socket.io',
  transports: ['websocket'],
});
