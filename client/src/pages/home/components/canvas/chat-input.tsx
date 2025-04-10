import React from 'react';
import { ICharacter } from '../../../../shared/types';
import { useEnterUser } from '../../../../shared/apis/users/enter';
import { socket } from '../../../../shared/utils';

const ChatInput = ({
  user,
}: {
  user: Pick<ICharacter, 'x' | 'y' | 'chat'>;
}) => {
  const { x, y, chat } = user;

  const { data: me } = useEnterUser({ enabled: false });

  const [openChat, setOpenChat] = React.useState(false);
  const [value, setValue] = React.useState(chat ?? '');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.length > 20) return;
    if (value.trim() === '') {
      setOpenChat(false);
      return;
    }
    const { id, username, character } = me!;
    const payload = {
      id,
      username,
      character,
      chat: value,
    };
    socket.emit('chat', payload);

    setValue('');
    setOpenChat(false);
  };

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSubmit(e);
    }
    if (e.key === 'Escape') {
      setOpenChat(false);
    }
  };

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !openChat) {
        e.preventDefault();
        setOpenChat(true);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openChat]);

  if (!openChat) return null;

  return (
    <div
      className="absolute text-white text-sm font-bold"
      style={{
        top: y,
        left: x + 50,
        transform: 'translateX(-50%) translateY(-50%)',
      }}
    >
      <input
        className="bg-black bg-opacity-60 px-2 py-1 rounded-lg"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoFocus
        maxLength={20}
        placeholder="채팅을 입력하세요."
        onKeyUp={onKeyUp}
      />
    </div>
  );
};

export default ChatInput;
