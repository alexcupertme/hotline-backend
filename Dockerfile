#
# ---- Base Node ----
FROM mhart/alpine-node:latest as base
RUN apk add nodejs-current tini
WORKDIR /root/backend

ENTRYPOINT ["/sbin/tini", "--"]

COPY . .
RUN npm run build

CMD ["npm", "run", "prod"]