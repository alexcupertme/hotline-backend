#
# ---- Base Node ----
FROM mhart/alpine-node:latest as base
RUN apk add nodejs-current tini
WORKDIR /root/backend

ENTRYPOINT ["/sbin/tini", "--"]

RUN npm i -g pnpm@latest
COPY . .

RUN pnpm i

RUN pnpm run build

CMD ["pnpm", "run", "prod"]