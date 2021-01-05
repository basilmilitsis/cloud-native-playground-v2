# Variable needed for Kafka in docker-compose
export DOCKER_HOST_IP=127.0.0.1

docker-compose -f docker-compose.yml \
               -f docker-compose.postgres.yml \
               up \
               -d \
               --build \
               --scale consumer-web=2