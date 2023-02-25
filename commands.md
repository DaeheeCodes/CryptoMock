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