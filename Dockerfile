FROM node:10
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY src src

CMD [ "npm", "start" ]
