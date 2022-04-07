forever stop backend
pnpm i
npm run build
forever start -c "npm run prod" ./ --uid backend
