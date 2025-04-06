import { useNavigate } from 'react-router-dom';

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 to-blue-200 text-center">
      <h1 className="text-4xl md:text-6xl font-bold mb-6">Ryooniverse에 오신 것을 환영합니다!</h1>
      <p className="text-lg text-gray-700 mb-10">당신만의 도트 세계로 입장해보세요</p>
      <button
        onClick={() => navigate('/home')}
        className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-xl shadow-lg transition-all"
      >
        입장하기
      </button>
    </div>
  );
}
