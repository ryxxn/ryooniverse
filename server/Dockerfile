FROM node:20-alpine AS deps

WORKDIR /usr/src/ryooniverse/server

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --prod \
    && rm -rf \
        node_modules/.pnpm/prisma@* \
        node_modules/.pnpm/@prisma+studio-core* \
        node_modules/.pnpm/@electric-sql+pglite* \
        node_modules/.pnpm/typescript@* \
        node_modules/.pnpm/react@* \
        node_modules/.pnpm/react-dom@* \
        node_modules/.pnpm/@types+react* \
        node_modules/.pnpm/@types+react-dom* \
    && pnpm store prune || true


FROM node:20-alpine

WORKDIR /usr/src/ryooniverse/server

COPY --from=deps /usr/src/ryooniverse/server/node_modules ./node_modules
COPY package.json ./
COPY dist ./dist

EXPOSE 8777

CMD ["node", "dist/src/main"]
