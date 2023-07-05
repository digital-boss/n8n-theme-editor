FROM node:18.16.1-alpine as builder
WORKDIR /app
RUN npm install -g pnpm
COPY pnpm-lock.yaml package.json index.html .
COPY src ./src
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
