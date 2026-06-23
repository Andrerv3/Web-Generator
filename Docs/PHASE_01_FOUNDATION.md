# PHASE_01_FOUNDATION.md - Base del Proyecto

# Objetivo de la fase
Establecer la estructura base del repositorio, configurar el compilador de Astro, integrar Tailwind CSS con soporte para variables CSS de color dinámicas, estructurar la fuente única de verdad (`src/config/business.ts`) y crear el Layout principal que servirá de contenedor general para las páginas.

# Alcance
* Inicialización de Astro en modo estático (SSG por defecto).
* Configuración de TypeScript con alias de rutas (`@/*` para `src/*`).
* Configuración de Tailwind CSS con extensión de tema para colores primarios y secundarios dinámicos.
* Creación de la estructura inicial de carpetas del proyecto.
* Creación del archivo de configuración global de negocio `src/config/business.ts`.
* Creación del archivo de estilos globales `src/styles/global.css`.
* Creación del Layout base `src/layouts/Layout.astro` que inyecta variables CSS dinámicamente.
* Creación de una página de inicio temporal (`src/pages/index.astro`) para validar las variables CSS de color.

# Exclusiones
* No se deben implementar componentes de UI (`Button`, `Card`, etc.) en esta fase.
* No se deben maquetar secciones del sitio (`Hero`, `Services`, `Contact`, etc.).
* No se implementará lógica SEO avanzada ni de Schema.org en los layouts.
* Ningún componente interactivo con JavaScript o hidratación.

# Archivos que se crearán
1. `package.json` - Gestión de scripts y dependencias.
2. `tsconfig.json` - Configuración de TypeScript y aliases.
3. `astro.config.mjs` - Integración de Tailwind CSS.
4. `tailwind.config.mjs` - Configuración de temas y colores CSS dinámicos.
5. `src/config/business.ts` - Tipado e información maestra del negocio local.
6. `src/styles/global.css` - Estilos globales y directivas de Tailwind.
7. `src/layouts/Layout.astro` - Esqueleto HTML básico con inyección de variables CSS inline.
8. `src/pages/index.astro` - Landing de pruebas para comprobar tipografía y colores.
9. `public/images/client/logo.svg` - Marcador de posición para el logo del negocio.

# Dependencias necesarias
* `astro` (última estable recomendada v4)
* `@astrojs/tailwind` (para soporte nativo de Tailwind en Astro)
* `tailwindcss`
* `typescript` (como dependencia de desarrollo)

# Checklist de implementación
- [x] Crear el archivo `package.json` e instalar dependencias básicas.
- [x] Configurar alias de rutas en `tsconfig.json`.
- [x] Agregar la integración de Tailwind en `astro.config.mjs`.
- [x] Configurar colores dinámicos mapeados a variables CSS en `tailwind.config.mjs`.
- [x] Declarar la interfaz estricta `BusinessConfig` y el objeto `business` en `src/config/business.ts`.
- [x] Inyectar `@tailwind` y variables CSS por defecto en `src/styles/global.css`.
- [x] Diseñar el layout `Layout.astro` para recibir props de `title` y `description` y mapear los colores de `business.ts` como variables de estilo en la etiqueta `html`.
- [x] Configurar `index.astro` para validar que el color del botón cambie dinámicamente según lo configurado en `business.ts`.

# Checklist de validación
- [x] El comando `npm install` se ejecuta sin errores.
- [x] Al ejecutar `npm run dev`, el servidor local levanta correctamente.
- [x] El archivo compilado hereda el lenguaje, título y descripción mapeados desde `business.ts`.
- [x] Las clases `bg-primary` y `bg-secondary` responden correctamente al cambiar los colores hexadecimales en `business.ts` sin necesidad de reconstruir manualmente el CSS.
- [x] Ejecutar `npm run build` genera la salida estática sin ningún error de tipado o compilación.

# Riesgos comunes
* **Error de variable indefinida**: Que el color hexadecimal en `business.ts` no esté bien formateado o que falle al inyectarse en el atributo `style` de `<html>`, haciendo que el sitio se renderice completamente transparente o negro.
* **Fallos de TypeScript en el Layout**: No tipar correctamente los props de Astro, provocando warnings o detenciones de build.
* **Problema de caché de Tailwind**: Asegurar que en `tailwind.config.mjs` el array `content` apunte a todas las rutas de archivos de Astro de forma recursiva (`./src/**/*.{astro,html,js,ts}`).

# Definition of Done
Se considera que la Fase 1 está terminada cuando el proyecto es capaz de compilar a producción de forma estática con un comando `npm run build` sin errores, y las variables de estilo configuradas en `src/config/business.ts` tiñen visualmente la página de prueba de forma dinámica.
