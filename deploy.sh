forever stop backend
npm run build
forever start --uid backend -c "npm run prod" ./
