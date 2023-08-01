FROM --platform=$BUILDPLATFORM node:alpine AS build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH
RUN yarn global add @angular/cli

COPY package.json /app/package.json
COPY . /app

RUN --mount=type=cache,target=/app/node_modules \
    yarn install && \
    ng build --output-path=dist

FROM --platform=$TARGETPLATFORM nginx:alpine

COPY --from=build /app/dist /openlid
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

VOLUME /openlid/assets/configuration.json
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
