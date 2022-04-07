forever stop backend
pnpm i
npm run build
forever start --uid "backend" -c "npm run prod" ./
