FROM amazoncorretto:24-alpine-jdk
LABEL authors="Emilio"
COPY target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar", "--server.port=8443"]
