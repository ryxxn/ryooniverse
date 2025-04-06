import { IGuestbook } from '../../../../shared/types';

interface Props {
  item: IGuestbook;
}

const GuestbookItem = ({ item }: Props) => {
  const { message, user } = item;

  return (
    <div className="flex items-center mb-2 gap-4">
      <div className="flex flex-col items-center">
        <img
          src={`/assets/characters/${user.character}.png`}
          alt="character1"
          className="w-10 h-10 mr-2"
        />
        <span className="text-xs">{user.username}</span>
      </div>
      <span>{message}</span>
    </div>
  );
};

export default GuestbookItem;
