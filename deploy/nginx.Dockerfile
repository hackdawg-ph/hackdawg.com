FROM nginx:alpine

WORKDIR /opt

COPY deploy/nginx/nginx.conf.tmpl /etc/nginx/conf.d/nginx.conf.tmpl
COPY deploy/nginx/entrypoint.sh nginx-entrypoint.sh
COPY . /var/www/html

RUN chmod +x nginx-entrypoint.sh

ENTRYPOINT ["/opt/nginx-entrypoint.sh"]
