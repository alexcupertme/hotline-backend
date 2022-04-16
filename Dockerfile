#
# ---- Base Node ----
ARG port

FROM mhart/alpine-node:latest as base
RUN apk add nodejs-current tini
WORKDIR /root/backend

ENTRYPOINT ["/sbin/tini", "--"]

RUN npm i -g pnpm@latest
COPY . .

RUN pnpm i

RUN pnpm run build

EXPOSE /tcp
CMD ["pnpm", "run", "prod"]
