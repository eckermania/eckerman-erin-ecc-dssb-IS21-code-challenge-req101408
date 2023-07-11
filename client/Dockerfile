FROM nginx:stable-alpine
COPY /build/ /usr/share/nginx/html
RUN rm etc/nginx/nginx.conf
COPY nginx.conf /etc/nginx
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]