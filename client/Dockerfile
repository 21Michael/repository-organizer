#FROM node:14.18.3 as build
FROM ubuntu as build

ENV PROJ_DIR "/app"
ENV CLIENT_DIR "${PROJ_DIR}/client"

RUN apt-get update \
    && apt install sudo -y \
    && sudo apt install curl -y \
    && curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - \
    && sudo apt install nodejs

WORKDIR ${CLIENT_DIR}

COPY . .

#WORKDIR ${CLIENT_DIR}

RUN npm install --silent
RUN npm install react-scripts@1.1.1 -g --silent

RUN npm run build

#CMD ["npm", "run", "start"]

#EXPOSE 3000

# production environment
FROM nginx:1.13.9-alpine

#RUN rm /etc/nginx/default.conf

COPY ./nginx/nginx.config etc/nginx/nginx.config
COPY --from=build /app/client/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
