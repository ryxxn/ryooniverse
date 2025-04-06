/**
 * 현재 구상 중인 캐릭터 asset 수는 5개임.
 * 따라서 1 ~ 5까지 랜덤 숫자 생성 후 반환하는 함수
 * 추후 ENUM 값이 될 수도 있기 때문에 string 형태로 반환함.
 */
export const generateCharacter = () => {
  const randomIndex = Math.floor(Math.random() * 5) + 1; // 1 ~ 5
  return randomIndex.toString();
};
