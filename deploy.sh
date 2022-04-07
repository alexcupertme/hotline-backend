forever stop backend
npm run build
forever start -c "npm run prod" ./ --uid backend
