# Ryooniverse

반가워요  
`ryooniverse`는 ryoon + universe로 저의 **홈서버 세상**입니다.  


<img src="https://github.com/user-attachments/assets/42202ee9-87b6-465e-a681-45155399e14f" alt="play-screenshot" width="100%"></img>


> 사용자 멀티가 가능하며 5초 지속 휘발성 채팅도 가능해요  
채팅은 DB에 저장되지 않지만, 욕설 및 폭언은 삼가 부탁 드립니다 ㅎㅎ  

---

## Client

- **React** + vite
- zustand
- websocket
  
---

- 캐릭터 이동은 `throttling`으로 다량 소켓 요청을 줄인다.
- 캐릭터 변경은 `debouncing`으로 다량 API 요청을 줄인다.

---

## Server

- **Nestjs** + pnpm
- Postgresql - 방명록, 방문 로그 저장
- redis - 접속자 정보
- websocket - 실시간 채팅, 실시간 위치

---

## Convention

커밋 메시지는
`[client] feat: 작업내용`
과 같이 작성한다.

---

## Deployment

배포는 `production` 브랜치에 커밋하여 배포한다.
