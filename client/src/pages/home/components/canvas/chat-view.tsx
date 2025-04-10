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
      <div className="px-2 py-1 relative">
        <div className="absolute inset-0 size-full bg-black opacity-60 rounded-lg" />
        <span className="relative z-50">{chat}</span>
      </div>
    </div>
  );
};

export default ChatView;
