# Development mode
FROM node:19.6.0 as development

WORKDIR /usr/src/app
COPY src src
COPY package.json tsconfig.json ./
RUN npm install
COPY . .
RUN npm run build




