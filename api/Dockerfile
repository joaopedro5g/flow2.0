FROM node:22-alpine3.19

WORKDIR /usr/app

COPY package.json .

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:dev" ]