# 1. Node.js 기반 이미지 사용
FROM node:18

# 2. 작업 디렉토리 설정
WORKDIR /ryooniverse/server

# 3. 의존성 설치를 위한 파일 복사
COPY package.json pnpm-lock.yaml ./

# 4. pnpm 설치
RUN npm install -g pnpm

# 5. 의존성 설치
RUN pnpm install

# 6. 나머지 소스 복사
COPY . .

# 7. 빌드 (선택: build 스크립트가 있으면)
RUN pnpm build

# 8. 포트 노출 (NestJS 실행 포트)
EXPOSE 8777

# 9. NestJS 서버 실행
CMD ["pnpm", "start:prod"]
