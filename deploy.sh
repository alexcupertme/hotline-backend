pm2 stop backend
pnpm i
npm run build
pm2 start --name backend npm -- run prod
