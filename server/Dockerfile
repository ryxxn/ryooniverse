# Node 기반 이미지
FROM node:20

# 작업 디렉토리 설정
WORKDIR /usr/src/ryooniverse/server

# pnpm 설치
RUN npm install -g pnpm

# 의존성 설치용 파일 복사
COPY package.json pnpm-lock.yaml ./

# 의존성 설치
RUN pnpm install

# 전체 소스 복사
COPY . .

# Nest 빌드
# RUN pnpm build

# 포트 노출
EXPOSE 8777

# 서버 실행
CMD ["pnpm", "start:prod"]
