# Ryooniverse

반가워요  
`ryooniverse`는 ryoon + universe로  
저의 **홈서버 세상**입니다.

![image](https://github.com/user-attachments/assets/950fb0d8-f8dc-4363-a850-649a9b9ed5a2)

---

## Client

- **React** + vite
- zustand
- websocket

## Server

- **Nestjs** + pnpm
- Postgresql - 방명록, 방문 로그 저장
- redis - 실시간 채팅, 접속자 정보
- websocket - 실시간 채팅, 실시간 위치

---

1️⃣ NestJS + Docker + Redis + PostgreSQL 기본 세팅  
2️⃣ WebSocket 기반 캐릭터 시스템  
3️⃣ 실시간 채팅 (Redis Pub/Sub 활용, DB 저장 없음)  
4️⃣ 방명록 (PostgreSQL 저장, REST API 연동)  
5️⃣ 접속자 리스트 관리 (Redis 활용, 현재 접속자 표시)  

---

## Convention

커밋 메시지는
`[client] feat: 작업내용`
과 같이 작성한다.

---

## Deployment

배포는 `production` 브랜치에 커밋하여 배포한다.
