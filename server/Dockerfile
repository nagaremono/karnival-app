FROM node:22-alpine AS base

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn

FROM base AS builder

WORKDIR /usr/src/app
COPY . .
RUN yarn build

FROM node:22-alpine

WORKDIR /usr/src/app
ENV NODE_ENV=production
RUN chown node:node .
USER node

COPY package.json ./
COPY yarn.lock ./
COPY --from=builder /usr/src/app/node_modules/ node_modules
COPY --from=builder /usr/src/app/dist/ dist
COPY --from=builder /usr/src/app/.env.example .env.example

EXPOSE 8080

CMD [ "node", "dist/index.js" ]
