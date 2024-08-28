# Guía de Contribución
¡Gracias por tu interés en contribuir a MeetSounds! La participación es valiosa y ayuda a hacer de MeetSounds una mejor plataforma para todos. A continuación, se ofrece una guía para ayudarte a contribuir de manera efectiva.

## Cómo Contribuir
### 1. Fork del Proyecto
Haz un fork del repositorio desde GitHub.

### 2. Clonar el Repositorio
Clona tu fork a tu máquina local:

```bash
git clone https://github.com/beatbuilders/meetsounds.git
cd meetsounds
```
GitBash te pedirá inicio de sesión. En caso de obtener el siguiente error:
```bash
$ git clone https://github.com/beatbuilders/meetsounds.git
Cloning into 'meetsounds'...
remote: Invalid username or password.
fatal: Authentication failed for 'https://github.com/beatbuilders/meetsounds.git/'
```
Puedes usar tu token de acceso personal (PAT)
Para clonar un repositorio de GitHub usando tu token de acceso personal (PAT), sigue estos pasos:

Genera un token de acceso personal (PAT):
1. Ve a GitHub y accede a tu cuenta.
2. Dirígete a Settings (Configuración) > Developer settings (Configuración de desarrollador) > Personal access tokens (Tokens de acceso personal).
3. Haz clic en Generate new token (Generar nuevo token), selecciona los permisos necesarios y copia el token generado.
4. Abre Git Bash en tu computadora.
5. Navega al directorio donde quieres clonar el repositorio usando el comando cd. Por ejemplo:
```bash
cd /ruta/a/tu/directorio
```

Clona el repositorio usando el comando git clone con la URL del repositorio y tu token. La URL debe tener el siguiente formato:
```bash
git clone https://<TU_TOKEN>@github.com/beatbuilders/meetsounds.git
```
Reemplaza <TOKEN> con tu token de acceso personal, usuario con tu nombre de usuario de GitHub y repositorio con el nombre del repositorio que deseas clonar.
Por ejemplo:
```bash
git clone https://ghp_1234567890abcdef1234567890abcdef12xz4ads678@github.com/beatbuilders/meetsounds.git
```

Cambia a la rama main si no se selecciona automáticamente:
```bash
cd repositorio
git checkout main
```
¡Y eso es todo! Ahora tendrás una copia local del repositorio en tu compu.

### 3. Crear una Rama Nueva (Actualmente solo trabajamos con la main)
Crea una nueva rama para trabajar en tu característica o corrección:
```bash
git checkout -b feature/nueva-caracteristica
```
### 4. Subir los cambios a la rama `main` en GitHub
#### 1. Verifica los cambios usando `git status`.
```bash
git status
```
#### 2. Hacer Cambios y Realizar Commits
Realiza tus cambios en la nueva rama. Asegúrate de que tus cambios estén bien probados y cumplan con las normas de código. Luego, realiza commits descriptivos:
```bash
git add .
git commit -m "[Tipo de commit]: descripción breve del cambio"
```
#### Tipos de commits:
| TIPO | Descripción |
|----------|----------|
| `feat` |  para nuevas funcionalidades |
| `fix` | para correcciones de errores |
| `docs` | para cambios en la documentación |
| `refactor` | para cambios en el código que no afectan su comportamiento externo |
| `test` | para añadir o modificar pruebas |

#### 3. Sube tus cambios a tu fork en GitHub:
En caso de que subas los cambios al main
```bash
git push origin main 
```
En caso de que subas los cambios de una rama
```bash
git push origin feature/nueva-caracteristica
```