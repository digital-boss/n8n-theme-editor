FROM node:18.16.1-alpine
WORKDIR /app
RUN npm install -g pnpm@8.6.1
COPY pnpm-lock.yaml package.json index.html .
COPY src ./src
RUN pnpm install --frozen-lockfile
RUN pnpm run build
