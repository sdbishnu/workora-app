FROM node:22-alpine

WORKDIR /workora

ENV NODE_ENV=development

COPY package.json package-lock.json ./
COPY apps ./apps
COPY packages ./packages

RUN npm ci

RUN npx tsc -p apps/core-api/tsconfig.json --noEmit false --outDir /workora/dist

CMD ["node", "/workora/dist/index.js"]
