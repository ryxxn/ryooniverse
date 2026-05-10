FROM node:20-slim

WORKDIR /usr/src/ryooniverse/server

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod

# 로컬에서 빌드한 결과물만 복사
COPY dist ./dist

EXPOSE 8777

CMD ["pnpm", "start:prod"]
