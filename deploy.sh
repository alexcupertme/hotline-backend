envault --constructive --force
cd hotline-backend
envault --constructive --force

if [ ! -f .env ]
then
  export $(cat .env | xargs)
fi

docker build --build-arg port="${BACKEND_PORT}" . -t vzlomed/hotlinebackend

cd ..
docker-compose --env-file .env restart -d backend
