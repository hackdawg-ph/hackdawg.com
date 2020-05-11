#!/bin/sh

### Start nginx with daemon off as our main pid
sed "s/{{NGINX_HOST}}/${DOMAIN}/g" /etc/nginx/conf.d/nginx.conf.tmpl > /etc/nginx/conf.d/nginx.conf && nginx -g 'daemon off;'
