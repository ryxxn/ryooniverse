# 멀티스테이지 — 이미지 안에서 빌드 (dist/prisma-generated는 gitignore라 CI에 없음)
# ---- builder ----
FROM node:20-alpine AS builder
RUN corepack enable && corepack prepare pnpm@10.7.1 --activate
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
# prisma.config.ts 가 env(DATABASE_URL) 평가 → 더미로 충분(실제 연결 없음)
ENV DATABASE_URL=postgresql://ci:ci@localhost:5432/ci
RUN pnpm exec prisma generate && pnpm build

# ---- runner ----
FROM node:20-alpine AS runner
RUN corepack enable && corepack prepare pnpm@10.7.1 --activate
WORKDIR /app
ENV NODE_ENV=production

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma/generated ./prisma/generated

EXPOSE 8777
CMD ["node", "dist/src/main"]
