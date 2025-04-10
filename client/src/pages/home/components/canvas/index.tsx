import React, { useEffect, useRef } from 'react';
import { CANVAS_CONSTANT } from './canvas.constants';
import {
  setupInput,
  loadCharacterImage,
  loadMap,
  startGameLoop,
} from './canvas.utils';
import { useEnterUser } from '../../../../shared/apis/users/enter';
import { useCanvasStore } from './canvas.store';
import { socketService } from './canvas.socket';
import { ICharacter } from '../../../../shared/types';
import ChatInput from './chat-input';
import ChatView from './chat-view';

const UserName = ({
  user,
}: {
  user: Pick<ICharacter, 'username' | 'x' | 'y'>;
}) => {
  const { x, y, username } = user;
  return (
    <div
      className="absolute text-white text-sm font-bold"
      style={{
        top: y + 100,
        left: x + 50,
        transform: 'translateX(-50%) translateY(-50%)',
      }}
    >
      <div className="bg-black bg-opacity-60 px-2 py-1 rounded-lg">
        {username}
      </div>
    </div>
  );
};

export default function CanvasStage() {
  const { data } = useEnterUser({ enabled: false });
  const { x, y, username, chat } = useCanvasStore((state) => state.myCharacter);
  const { setMyCharacter, otherCharacters } = useCanvasStore();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;

    const cleanup = setupInput();

    Promise.all([loadCharacterImage(data?.character ?? '1'), loadMap()]).then(
      () => {
        startGameLoop(ctx);
      }
    );

    return cleanup;
  }, [data]);

  // socket
  useEffect(() => {
    if (!data) return;

    setMyCharacter(data);

    socketService.move();
    socketService.chat();
    socketService.usersUpdate();
    socketService.updateOneUser();
    socketService.userLeft();

    return () => {
      socketService.disconnect();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={CANVAS_CONSTANT.MAP_WIDTH}
        height={CANVAS_CONSTANT.MAP_HEIGHT}
      />

      {/* Me */}
      <ChatInput user={{ chat, x, y }} />
      <ChatView user={{ chat, x, y }} />

      <UserName user={{ username, x, y }} />

      {/* Others */}
      {otherCharacters.map((character) => (
        <React.Fragment key={character.id}>
          <ChatView
            user={{ chat: character.chat, x: character.x, y: character.y }}
          />
          <UserName
            key={character.id}
            user={{
              username: character.username,
              x: character.x,
              y: character.y,
            }}
          />
        </React.Fragment>
      ))}
    </div>
  );
}
