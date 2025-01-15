# WePlot API

Este es el backend de la aplicación WePlot, desarrollado en NestJS y utilizando PostgreSQL como base de datos. La base de datos se gestiona a través de Docker para facilitar el despliegue y la configuración.

## Tabla de Contenidos

- [Descripción](#descripción)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)

## Descripción

WePlot permite gestionar preferencias de usuario y viene con un sistema de roles que otorga privilegios administrativos a ciertos usuarios. El backend se encarga de manejar las operaciones del CRUD, autenticación y autorización.

## Requisitos Previos

Antes de empezar, asegúrate de tener Docker y Docker Compose instalados en tu máquina. Además, necesitarás Yarn para manejar las dependencias de Node.js.

- **Docker & Docker Compose**: [Descargar e instalar Docker](https://docs.docker.com/get-docker/)
- **Yarn**: [Descargar e instalar Yarn](https://classic.yarnpkg.com/en/docs/install)

## Instalación

Sigue estos pasos para instalar y configurar el proyecto:

1. Clona el repositorio:
    ```bash
    git clone https://github.com/AlejandroChing11/admin_dashboard
    ```

2. Entra en el directorio del proyecto:
    ```bash
    cd admin-dashboard.api
    ```

3. Instala las dependencias del proyecto:
    ```bash
    yarn install
    ```

4. Configura el archivo `.env`:
   - Crea y edita un archivo `.env` con las configuraciones necesarias para tu entorno:

     ```plaintext
     DATABASE_HOST=localhost
     DATABASE_PORT=5432
     DATABASE_USER=postgres
     DATABASE_PASSWORD=postgres
     DATABASE_NAME=weplot
     JWT_SECRET=tu_secreto_jwt
     ```

5. Levanta la base de datos usando Docker:
    ```bash
    docker-compose up -d
    ```

   Esto creará y correrá una instancia de PostgreSQL según la configuración en el archivo `docker-compose.yml`.

## Uso

Para iniciar el servidor de desarrollo, ejecuta:

```bash
yarn start:dev
```

## Estructura del proyecto
/src                        # Código fuente del proyecto
  /modules                  # Módulos de NestJS
  /services                 # Servicios para lógica de negocio
  /controllers              # Controladores para manejar rutas HTTP
  /entities                 # Definiciones de entidades (ORM)
  /dto                      # Data Transfer Objects
/statics                    # Datos estaticos

