FROM node:18.16.1-alpine as builder
WORKDIR /app
RUN npm install -g pnpm
COPY . .
COPY src ./src
RUN pnpm install --frozen-lockfile
RUN pnpm run build

FROM alpine:latest
COPY --from=builder /app/dist /var/www/html
RUN apk add --no-cache busybox busybox-extras
ENV PORT=80
EXPOSE $PORT
CMD httpd -f -p $PORT -h /var/www/html
