FROM node:20-slim as base
WORKDIR /app
COPY . .
RUN npm install
RUN /app/node_modules/.bin/rollup --config
ENTRYPOINT ["/app/node_modules/.bin/workerd", "serve", "/app/demo.capnp"]
EXPOSE 8080