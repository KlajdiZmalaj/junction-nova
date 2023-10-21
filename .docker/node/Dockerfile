FROM node:16.8.0-alpine AS base

WORKDIR /app

RUN apk update \
      ; yarn add typescript \
    ;

USER node

FROM base as build

COPY . /app

USER root

RUN npm ci \
  ; yarn run build \
  ;

FROM base as built

COPY --from=build /app /app

USER node
CMD yarn run start
