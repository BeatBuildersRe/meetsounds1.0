# meetsounds
MeetSounds es una red social innovadora diseñada para conectar a personas apasionadas por la música, músicos y bandas. Nuestra plataforma proporciona un espacio único para colaborar, interactuar y crecer dentro del mundo de la música.
# MeetSounds 🎶

MeetSounds es una red social diseñada para conectar a personas apasionadas por la música, músicos y bandas. La plataforma facilita la colaboración musical, la formación de bandas y la búsqueda de lugares para presentarse en vivo.

## Características

- **Registro y autenticación de usuarios**: Los usuarios pueden registrarse e iniciar sesión.
- **Perfiles de usuario**: Cada usuario tiene un perfil donde puede mostrar sus habilidades musicales, intereses y proyectos.
- **Búsqueda de músicos**: Los usuarios pueden buscar otros músicos por instrumento, género musical, y ubicación.
- **Mensajería**: Los usuarios pueden enviar mensajes directos para coordinar ensayos y colaboraciones.
- **Publicaciones y comentarios**: Los usuarios pueden publicar actualizaciones y comentar en las publicaciones de otros.

## Tecnologías Utilizadas

- **Backend**: Spring Boot
- **Frontend**: React, Vite
- **Base de Datos**: MongoDB
- **Autenticación**: JWT (JSON Web Tokens)
- **Despliegue**: Docker

## Instalación

1. Clona el repositorio:
    ```bash
    git clone https://github.com/beatbuilders/meetsounds.git
    cd meetsounds
    ```

2. Configura las variables de entorno:
    ```bash
    cp .env.example .env
    ```

3. Inicia el backend:
    ```bash
    cd backend
    ./mvnw spring-boot:run
    ```

4. Inicia el frontend:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

## Contribuir

¡Las contribuciones son bienvenidas! Por favor, sigue estos pasos para contribuir:

1. Haz un fork del proyecto.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz commit (`git commit -m 'Añadir nueva característica'`).
4. Sube tus cambios (`git push origin feature/nueva-caracteristica`).
5. Abre un Pull Request.

## Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo LICENSE para más detalles.
