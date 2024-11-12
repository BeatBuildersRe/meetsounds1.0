# Usa una imagen base que tenga OpenJDK 17 y Maven
FROM maven:3.8.6-openjdk-17-slim AS builder

# Define el directorio de trabajo
WORKDIR /app

# Copia el contenido del proyecto al contenedor
COPY . /app/

# Construye el JAR usando Maven
RUN mvn clean package -DskipTests

# Usa la imagen base de OpenJDK para la ejecución
FROM openjdk:17

# Copia el archivo JAR desde la imagen builder
COPY --from=builder /app/target/meetsounds-0.0.1-SNAPSHOT.jar /app_meetsounds.jar

# Expón el puerto 8080
EXPOSE 8080

# Define el comando de inicio para ejecutar el JAR
ENTRYPOINT ["java", "-jar", "/app_meetsounds.jar"]
