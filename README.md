# Instalación del proyecto

Una vez se haya realizado la clonación del proyecto, se debe configurar la base de datos, para lo cual es necesario tener Postgres en su última versión, el nombre actual de la base de datos que usa el proyecto es `hoteles`.

Se debe configuara el archivo `.env` que es una copia de el archivo `.env.example` y se modifican las siguientes lineas con las de configuración de la base de datos:

```
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=hoteles
DB_USERNAME=postgres
DB_PASSWORD=
```

Luego es necesario obtener las dependencias del servidor por lo que debemos tener composer actualizado, el comando a ejecutar es `composer install`

Se realizan las migraciones a la base de datos, para crear las tablas necesarias para la aplicación con el comando `php artisan migrate`

Una vez configurada la base de datos se debe correr el comando `php artisan serve` para iniciar el servidor de desarollo que por defecto escucha en la dirección `127.0.0.1:8000`

Para que se pueda visualizar el contenido, es necesario compilar los archivos de javascript que usan el último estandar de EcmaScript. Para lo cual es necesario tener NodeJs en su última versión, y algún gestor de paquetes como 'NPM', 'Yarn' o 'Bower'. Actualmente uso 'Yarn' para gestionar paquetes de NodeJs. Así que nos dirijimos a la carpeta `resources/js/frontend` y ejecutamos el comando `yarn` para instalar las dependencias.

Una vez todas las dependencias han sido instaladas, se corre el comando `yarn start`, el cual es el encargado de inicializar el segundo servidor con hot-reload, y automáticamente se abrirá una nueva pestaña en el navegador.
