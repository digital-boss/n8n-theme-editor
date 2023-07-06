image:
	docker build -t n8n-theme-editor:latest .

up:
ifdef PROFILE
	docker compose -f docker-compose.yaml -f docker-compose.$(PROFILE).yaml up -d $(SERVICES)
else
	docker compose up -d $(SERVICES)
endif

# "rm -f": Because httpd from busybox doesn't handle SIGTERM and when you try to stop container, 
# finaly it stops with SIGKILL after timeout. So we just speed it up with explicit "rm -f". 
down:
	docker rm -f n8nthemes-editor & docker stop n8nthemes-n8n n8nthemes-nginx

restart: down up
