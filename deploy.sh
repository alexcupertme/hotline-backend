cd ..
envault --constructive --force
cd hotline-backend
envault --constructive --force

if [ ! -f .env ]
then
  export $(cat .env | xargs)
fi

docker image prune -f
docker build --build-arg port="${BACKEND_PORT}" . -t vzlomed/hotlinebackend

cd ..
docker-compose --env-file .env up -d --force-recreate backend
