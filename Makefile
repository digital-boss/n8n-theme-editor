up:
	docker compose up -d

down:
	docker compose down

restart: down up

build:
	docker build --no-cache -t n8n-theme-editor:latest .

debug/build:
	docker build -f $(TARGET).Dockerfile -t n8n-theme-editor:builder .

debug/test:
	docker run --rm --name app n8n-theme-editor:builder sh -c "cat /app/dist/assets/index*.js | grep React.createElement"

debug/attach:
	docker run --rm -ti n8n-theme-editor:builder sh

debug/local-check:
	pnpm i
	pnpm run build
	cat ./dist/assets/index*.js | grep React.createElement

