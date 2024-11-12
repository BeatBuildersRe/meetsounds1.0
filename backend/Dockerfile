FROM openjdk:17
ARG JAR_FILE=target/meetsounds-0.0.1-SNAPSHOT.jar
COPY ${JAR_FILE} app_meetsounds.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app_meetsounds.jar"]