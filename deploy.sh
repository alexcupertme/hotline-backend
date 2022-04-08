pm2 stop backend
pnpm i
envault --constructive --force
npm run build
pm2 start --name backend npm -- run prod
