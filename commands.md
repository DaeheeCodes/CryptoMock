Backend
./mvnw clean package



Docker
docker pull mongo

docker run -d --name mongo-on-docker -p 27017:27017 mongo
docker build -t cryptomock-ui -f src/main/js/Dockerfile .
docker build -t cryptomock -f src/main/java/Dockerfile . 
docker run -d --name cryptomock-on-docker -p 8080:8080 cryptomock-ui
docker run -d --name cryptomock-ui-on-docker -p 8080:8080 cryptomock
docker-compose up

docker hub

docker tag 6b311b19d982 hwk613/cryptomock-ui:latest
docker tag c995e58dff38 hwk613/cryptomock:latest
docker tag a440572ac3c1 hwk613/mongo:latest
docker push hwk613/cryptomock-ui:latest
docker push hwk613/cryptomock:latest
docker push hwk613/mongo:latest


docker tag 6b311b19d982 registry.heroku.com/cryptomock/frontend
docker push registry.heroku.com/cryptomock/frontend

docker tag dc30d88c358e registry.heroku.com/cryptomock/backend
docker push registry.heroku.com/cryptomock/backend

docker tag a440572ac3c1 registry.heroku.com/cryptomock/mongo
docker push registry.heroku.com/cryptomock/mongo

cryptomock-ui   latest    6b311b19d982   8 days ago    924MB
cryptomock      latest    c995e58dff38   8 days ago    533MB
mongo           latest    a440572ac3c1   3 weeks ago   639MB