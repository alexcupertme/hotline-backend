envault --constructive --force
cd hotline-backend
envault --constructive --force
docker build . -t vzlomed/hotlinebackend

cd ..
docker-compose --env-file .env restart -d backend
