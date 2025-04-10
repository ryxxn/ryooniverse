import { ICharacter } from '../../../../shared/types';

const ChatView = ({ user }: { user: Pick<ICharacter, 'x' | 'y' | 'chat'> }) => {
  const { x, y, chat } = user;

  if (!chat) return null;

  return (
    <div
      className="absolute text-white text-sm font-bold"
      style={{
        top: y,
        left: x + 50,
        transform: 'translateX(-50%) translateY(-50%)',
      }}
    >
      <div className="bg-black bg-opacity-60 px-2 py-1 rounded-lg">{chat}</div>
    </div>
  );
};

export default ChatView;
