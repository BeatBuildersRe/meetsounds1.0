# Usa una imagen base de OpenJDK 17 con Alpine Linux
FROM openjdk:17-alpine AS build

# Establece el directorio de trabajo en /app
WORKDIR /app

# Actualiza los certificados del sistema
RUN apk update && apk add --no-cache ca-certificates

# Instala Maven usando apk (gestor de paquetes para Alpine)
RUN apk add --no-cache maven

# Copia el archivo pom.xml
COPY pom.xml .

# Instala las dependencias necesarias sin construir el proyecto
RUN mvn dependency:go-offline

# Copia todo el contenido del directorio actual (backend) al contenedor
COPY . /app

# Ejecuta el comando de Maven para compilar y empaquetar la aplicación
RUN mvn clean package -DskipTests

# Usa la imagen de OpenJDK como entorno de ejecución
FROM openjdk:17

# Establece el puerto en el que tu aplicación se ejecutará
EXPOSE 8080

# Copia el archivo JAR desde la etapa de construcción
COPY --from=build /app/target/meetsounds-0.0.1-SNAPSHOT.jar app_meetsounds.jar

# Comando para ejecutar la aplicación
ENTRYPOINT ["java", "-jar", "app_meetsounds.jar"]
