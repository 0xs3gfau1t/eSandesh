FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install
RUN apk add --no-cache ffmpeg

COPY . .

CMD ["npm", "run", "start"]
