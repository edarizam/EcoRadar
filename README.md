# EcoRadar

EcoRadar es una plataforma web desarrollada con Spring Boot para la visualización y gestión de datos sobre energías renovables (hidroeléctrica, eólica, solar y bioenergía), incluyendo producción, consumo, capacidad instalada y participación en el mix energético de distintos países y regiones.

## Requisitos previos

- **Java JDK 17 o superior**  
  [Descargar Java](https://adoptium.net/)

- **WAMP Server (incluye MySQL y Apache)**  
  [Descargar WAMP](https://www.wampserver.com/)

- **Maven** (opcional, puedes usar el wrapper incluido)

- **Git** (opcional, para clonar el repositorio)

## Instalación y configuración

### 1. Clona el repositorio

```sh
git clone https://github.com/tu-usuario/EcoRadar.git
cd EcoRadar/EcoRadar
```

O descarga el ZIP y descomprímelo.

### 2. Instala y configura WAMP

- Instala WAMP y asegúrate de que el servidor MySQL esté corriendo.
- Abre **phpMyAdmin** en [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
- Crea una base de datos llamada, por ejemplo, `ecoradar`.
- Importa las tablas y datos necesarios usando los scripts SQL que vienen en el proyecto (si existen, normalmente en la carpeta `DataTrabajoFinal` o en un archivo `.sql`).

### 3. Configura la conexión a la base de datos

Edita el archivo:

```
src/main/resources/application.properties
```

Y coloca tus datos de conexión, por ejemplo:

```
spring.datasource.url=jdbc:mysql://localhost:3306/ecoradar
spring.datasource.username=root
spring.datasource.password=TU_CONTRASEÑA
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### 4. Compila y ejecuta el proyecto

En la raíz del proyecto, ejecuta:

**En Windows:**
```sh
mvnw.cmd spring-boot:run
```

**En Mac/Linux:**
```sh
./mvnw spring-boot:run
```

Esto descargará las dependencias y levantará el servidor en [http://localhost:8080](http://localhost:8080).

### 5. Accede a la aplicación

Abre tu navegador y entra a:

[http://localhost:8080](http://localhost:8080)

## Estructura del proyecto

- `src/main/java` — Código fuente Java (controladores, servicios, modelos)
- `src/main/resources/templates` — Vistas HTML (Thymeleaf)
- `src/main/resources/static` — Archivos estáticos (imágenes, CSS, JS)
- `src/main/resources/application.properties` — Configuración de Spring Boot

## Notas

- Si necesitas importar datos desde archivos CSV, revisa los scripts o notebooks en la carpeta `DataTrabajoFinal`.
- Si cambias el puerto de MySQL o el usuario/contraseña, actualízalo también en `application.properties`.
- Si tienes problemas con dependencias, ejecuta:
  ```sh
  mvnw.cmd clean install
  ```
  o
  ```sh
  ./mvnw clean install
  ```

## Créditos

Desarrollado por: Edinson Andrés Ariza Mendoza, Mayra Alejandra Toro Saavedra, Juan José Cañas Torres, María Manuela Salamanca Murcia.

---

¿Dudas o problemas? Abre un issue o contacta al equipo de desarrollo.