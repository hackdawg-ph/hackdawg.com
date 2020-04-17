FROM nginx:alpine

RUN apk add inotify-tools certbot curl openssl

WORKDIR /opt

COPY deploy/nginx/nginx.conf.tmpl /etc/nginx/conf.d/nginx.conf.tmpl
COPY deploy/nginx/entrypoint.sh nginx-entrypoint.sh
COPY deploy/nginx/certbot.sh nginx-certbot.sh

COPY . /var/www/html

RUN chmod +x nginx-entrypoint.sh && \
    chmod +x nginx-certbot.sh

ENTRYPOINT [ "/opt/nginx-entrypoint.sh" ]