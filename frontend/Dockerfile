FROM nginx:1.27-alpine

ARG THEME=winter
ARG DEPLOY_SLOT=blue
ARG BUILD_TAG=dev

RUN apk add --no-cache sed

COPY shared/index.html /usr/share/nginx/html/index.html
COPY shared/app.js /usr/share/nginx/html/app.js
COPY themes/${THEME}/styles.css /usr/share/nginx/html/styles.css
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN sed -i "s|<head>|<head><script>window.__HOTEL_THEME__='${THEME}';window.__DEPLOY_SLOT__='${DEPLOY_SLOT}';window.__BUILD_TAG__='${BUILD_TAG}';</script>|" \
    /usr/share/nginx/html/index.html

EXPOSE 8080
