FROM eclipse-temurin:17-jdk-focal
ARG JAR_FILE=target/cryptomock-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} cryptomock.jar
ENTRYPOINT ["java","-jar", "-Dserver.port=${PORT}", "/cryptomock.jar"]
