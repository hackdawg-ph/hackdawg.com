FROM nginx:alpine

COPY . /var/www/html
COPY deploy/nginx/nginx.production.conf /etc/nginx/conf.d/nginx.conf

EXPOSE 80 443