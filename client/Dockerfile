FROM ubuntu

ENV PROJ_DIR "/usr/project"
ENV CLIENT_DIR "${PROJ_DIR}/client"

RUN apt-get update \
    && apt install sudo -y \
    && sudo apt install curl -y \
    && curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash - \
    && sudo apt install nodejs

WORKDIR ${PROJ_DIR}

COPY . .

WORKDIR ${CLIENT_DIR}

RUN npm i \
    && npm audit fix

CMD ["npm", "run", "start"]

EXPOSE 3000
