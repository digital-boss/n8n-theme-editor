up:
	docker compose up -d

down:
	docker compose down

restart: down up

build:
	docker build -t n8n-theme-editor:latest .
