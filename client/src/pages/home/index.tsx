import { useEnterUser } from '../../shared/apis/users/enter';
import CanvasStage from './components/canvas';
import Guestbooks from './components/guestbook';
import UserInfo from './components/user-info';

export default function HomePage() {
  const { isLoading, isError } = useEnterUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  return (
    <div className="p-12 flex justify-center items-center bg-black h-screen">
      <div className="fixed top-4 right-4 p-4 text-white font-semibold">
        채팅을 입력하려면 <span style={{ fontFamily: 'initial' }}>'/'</span>를
        입력하세요.
      </div>

      <main className="min-w-6xl max-w-7xl flex gap-4 h-full items-center">
        <CanvasStage />

        <div className="flex flex-col flex-1 h-full max-h-[600px]">
          {/* 캐릭터 수정 섹션 */}
          <UserInfo />
          <Guestbooks />
        </div>
      </main>
    </div>
  );
}
