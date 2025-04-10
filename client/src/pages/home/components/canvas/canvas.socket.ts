import { ICharacter } from '../../../../shared/types';
import { socket } from '../../../../shared/utils';
import { useCanvasStore } from './canvas.store';

export const socketService = {
  move: () => {
    socket.on('move', ({ id, position, username, character = '1' }) => {
      const { myCharacter, updateOthers } = useCanvasStore.getState();
      if (id === myCharacter.id) return;

      updateOthers((prev) => {
        const exists = prev.find((c) => c.id === id);
        if (exists) {
          return prev.map((c) =>
            c.id === id ? { ...c, x: position.x, y: position.y } : c
          );
        } else {
          return [
            ...prev,
            {
              id,
              username,
              x: position.x,
              y: position.y,
              character,
            },
          ];
        }
      });
    });
  },
  usersUpdate: () => {
    socket.on('users:update', (users: ICharacter[]) => {
      const { myCharacter, updateOthers } = useCanvasStore.getState();
      const others = users.filter((user) => user.id !== myCharacter.id);

      updateOthers(others);
    });
  },

  // user left
  userLeft: () => {
    socket.on('user:left', (userId) => {
      console.log('유저 퇴장:', userId);
      // → 해당 캐릭터 제거
    });
  },
  // chat
  chat: () => {
    socket.on('chat', (data) => {
      const { id, chat } = data;
      const { setChat, clearChat } = useCanvasStore.getState();

      setChat(id, chat);

      // 5초 후 채팅 지우기
      setTimeout(() => {
        clearChat(id);
      }, 5_000);
    });
  },
  // disconnect
  disconnect: () => {
    socket.off('move');
    socket.off('users:update');
    socket.off('user:left');
    socket.off('chat');
  },
};
