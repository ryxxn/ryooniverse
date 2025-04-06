import { useQueryClient } from '@tanstack/react-query';
import { queryKeyFactory } from '../../../../shared/apis/query-key-factory';

const CHARACTERS = ['1', '2', '3', '4', '5'];

const UserInfo = () => {
  /**
   * ! 임시로 로컬에서만처리
   * 추후 배치 처리 예정
   */
  const queryClient = useQueryClient();

  const onChangeCharacter = (character: string) => {
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
      <h2 className="text-lg font-bold mb-2">캐릭터 변경</h2>

      <div className="flex gap-2">
        {CHARACTERS.map((character) => (
          <div
            key={character}
            role="button"
            className="flex items-center mb-2"
            onClick={() => onChangeCharacter(character)}
          >
            <img
              src={`/assets/characters/${character}.png`}
              alt={character}
              className="w-10 h-10 mr-2"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default UserInfo;
