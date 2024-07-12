FROM ghcr.io/puppeteer/puppeteer:22.13.0

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
  PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/bin/app

COPY package*.json ./
RUN npm i
COPY . .

CMD ["node", "index.mjs"]


