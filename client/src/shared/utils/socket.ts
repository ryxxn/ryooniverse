import { io, Socket } from 'socket.io-client';

const isProduction = import.meta.env.MODE === 'production';

export const socket: Socket = io(import.meta.env.VITE_WS_URL, {
  path: isProduction ? '/ryooniverse/socket.io' : '/socket.io',
  transports: ['websocket'],
});
