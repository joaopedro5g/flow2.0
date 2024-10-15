FROM node:20.17.0-alpine3.20

WORKDIR /usr/app

COPY package.json .
COPY yarn.lock .

RUN yarn

COPY . .

EXPOSE 3000