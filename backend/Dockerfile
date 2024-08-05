FROM node:20

WORKDIR /usr/bin/app

COPY package*.json ./
RUN npm ci
COPY . .

CMD ["node", "index.js"]
