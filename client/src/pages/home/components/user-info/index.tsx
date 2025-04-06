const CHARACTERS = ['1', '2', '3', '4', '5'];

const UserInfo = () => {
  return (
    <section className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-bold mb-2">캐릭터 변경</h2>

      <div className="flex gap-2">
        {CHARACTERS.map((character) => (
          <div key={character} className="flex items-center mb-2">
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
