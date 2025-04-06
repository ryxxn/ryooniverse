import { useEnterUser } from '../../shared/apis/users/enter';
import CanvasStage from './components/canvas';
import Guestbooks from './components/guestbook';
import UserInfo from './components/user-info';

export default function HomePage() {
  const { isLoading, isError } = useEnterUser();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error occurred</div>;

  return (
    <div className="p-12 flex justify-center items-center gap-4 bg-black h-screen">
      <CanvasStage />

      <div className="flex flex-col flex-1 h-full max-h-[600px]">
        {/* 캐릭터 수정 섹션 */}
        <UserInfo />
        <Guestbooks />
      </div>
    </div>
  );
}
