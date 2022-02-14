FROM node:14-alpine AS development

WORKDIR /usr/app

COPY ["package.json", "yarn.lock", "./"]

RUN yarn install

COPY . .

CMD ["yarn", "start:dev"]