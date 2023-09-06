FROM node:18 as base

WORKDIR /app

COPY ./package.json .

RUN npm install -g pnpm

RUN pnpm install

COPY . .

RUN npx prisma generate

FROM node:18 as deploy

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/scripts ./scripts
COPY --from=base /app/package.json ./
COPY --from=base /app/pnpm-lock.yaml ./

ENV NODE_ENV prod

EXPOSE 8080

CMD ["./scripts/migrate-and-start.sh"]
