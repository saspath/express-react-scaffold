FROM node:14-alpine

ARG BUNDLE_ASSETS
ENV USE_STATIC_MIDDLEWARE=$BUNDLE_ASSETS


WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

COPY ./server ./server
COPY ./client ./client

RUN echo runner $CMD_RUNNER
RUN if [ "$BUNDLE_ASSETS" != "true" ] ; then rm -rf ./client ; fi
RUN npm install

EXPOSE 3000

CMD ["node", "./server"]
