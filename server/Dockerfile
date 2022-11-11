FROM node:14

ENV SERVER_DIR "$/app/server"
#
#RUN apt-get update \
#    && apt install sudo -y \
#    && sudo apt install curl -y \
#    && curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - \
#    && sudo apt install nodejs

WORKDIR ${SERVER_DIR}

COPY package.json ./

RUN npm i \
    && npm audit fix

COPY . .

EXPOSE 4000

CMD ["npm", "run", "prod"]
