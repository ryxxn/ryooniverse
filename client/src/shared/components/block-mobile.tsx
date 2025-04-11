const BlockMobile = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Ryooniverse</h1>
      <p className="mt-8 text-lg">류니버스는 <strong>PC 환경</strong>에서만 이용할 수 있어요!</p>
      <p className="text-sm mt-2 text-gray-200">화면이 작거나 터치 조작이 제한되는 모바일 환경은 아직 지원하지 않습니다.</p>
      <p className="text-sm mt-6 text-gray-300">PC 브라우저에서 접속해주세요 🙏</p>
    </div>
  )
}

export default BlockMobile