FROM node:18-alpine

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

ENV HOST 0.0.0.0

CMD ["npm", "run", "start"]
