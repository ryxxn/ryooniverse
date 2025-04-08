import { useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '../../../../shared/apis/query-key-factory';
import { useUpdateUser } from '../../../../shared/apis/users/update';
import { debounce } from '../../../../shared/utils/debounce';
import NameChangeButton from './name-change-button';

const CHARACTERS = ['1', '2', '3', '4', '5'];

const UserInfo = () => {
  const queryClient = useQueryClient();
  const updateMutation = useUpdateUser();

  // 마지막으로 변경한지 5초 후 요청
  const debouncedUpdate = debounce(updateMutation.mutate, 5_000);

  const onChangeCharacter = (character: string) => {
    debouncedUpdate({ character });
    queryClient.setQueryData(queryKeyFactory.users.me, (oldData: any) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        character,
      };
    });
  };

  return (
    <section className="bg-white p-4 rounded-lg shadow-lg">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold">캐릭터 변경</h2>
        <NameChangeButton />
      </div>

      <div className="flex gap-2 justify-around">
        {CHARACTERS.map((character) => (
          <button
            key={character}
            type="button"
            className="flex items-center mb-2 cursor-pointer hover:scale-120 transition-transform duration-200"
            onClick={() => onChangeCharacter(character)}
          >
            <img
              src={`/assets/characters/${character}.png`}
              alt={character}
              className="w-10 h-10 mr-2"
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default UserInfo;
