# AoT RPG

AOT-RPG es un juego de rol por turnos inspirado en el universo de Attack on Titan

## Instalación

### Clona el repositorio

```bash
git clone <https://github.com/facusbrr/POO-RPG.git>
cd POO-RPG
```

### Instala las dependencias

```bash
npm install
```

### Ejecución

Para iniciar el juego ejecuta:

```bash
node index.js
```

Sigue las instrucciones en pantalla para crear tu personaje y participar en las batallas.

## Diagrama de clases

[Ver diagrama en Miro](https://miro.com/app/board/uXjVJS7irHk=/)

## Estructura del proyecto

- index.js: Punto de entrada, maneja el flujo principal del juego.
- /utils/CLI.js: Interfaz de usuario por consola.
- /servicios/: Lógica de negocio (gestión de batallas, mercado, etc).
- /titanes/: Definición de los distintos tipos de titanes.
- /equipamiento/: Objetos de inventario, pociones, cuchillas, etc.
- Soldado.js, EntidadDeCombate.js: Clases principales de dominio.
