# PHASE_03_SECTIONS.md - Secciones de la Página

# Objetivo de la fase
Desarrollar y componer las secciones estructurales de la landing page (Nivel 2). Estas secciones estructuran y organizan la información en pantalla importando la configuración directamente de `business.ts` y haciendo uso exclusivo de los componentes primitivos de UI construidos en la Fase 2.

# Alcance
Construcción de los siguientes componentes contenedores bajo `src/components/sections/`:
* **Hero**: Portada de impacto con título, eslogan y botones primario y secundario de llamado a la acción.
* **Services**: Grilla con las tarjetas (`Card`) de servicios ofrecidos, con precios opcionales.
* **About**: Información, historia, diferenciadores o descripción del equipo de trabajo.
* **Gallery**: Galería de imágenes estática y optimizada.
* **Testimonials**: Carrusel estático de testimonios y valoraciones con estrellas (`Icon name="star"`).
* **FAQ**: Preguntas frecuentes organizadas de forma limpia.
* **Contact**: Formulario de contacto integrado con datos físicos del negocio (teléfono, horario, dirección).
* **CTA**: Franja de conversión final para impulsar la acción (agendar cita o contactar por WhatsApp).

# Exclusiones
* No se debe configurar lógica de envío de datos del formulario (esto pertenece a la Fase 4).
* No se integrará el mapa interactivo de Google Maps ni el botón flotante de WhatsApp.
* No se crearán páginas secundarias (todo el contenido debe vivir en una única landing page `index.astro`).

# Archivos que se crearán
* `src/components/sections/Hero.astro`
* `src/components/sections/Services.astro`
* `src/components/sections/About.astro`
* `src/components/sections/Gallery.astro`
* `src/components/sections/Testimonials.astro`
* `src/components/sections/FAQ.astro`
* `src/components/sections/Contact.astro`
* `src/components/sections/CTA.astro`

# Dependencias necesarias
Ninguna librería externa. Todos los componentes deben ser puros (HTML/CSS estáticos utilizando Astro y Tailwind CSS).

---

# Datos consumidos desde `business.ts` y Composición

Cada sección es responsable de consultar los datos específicos de `business.ts`. A continuación, se detalla qué datos consume cada sección, sus dependencias de componentes UI internos, y el orden sugerido para el armado de la página:

### 1. Hero.astro
* **Datos consumidos**: `business.brand.name`, `business.brand.slogan`, `business.contact.whatsapp`.
* **Componentes UI**: `Section`, `Container`, `Button`.

### 2. Services.astro
* **Datos consumidos**: `business.services` (Este array debe crearse y tiparse en `business.ts` con propiedades de nombre, descripción, precio e imagen).
* **Componentes UI**: `Section`, `Container`, `Card`, `Button`.

### 3. About.astro
* **Datos consumidos**: `business.brand` y datos sobre la historia o el equipo que se agreguen en `business.ts`.
* **Componentes UI**: `Section`, `Container`.

### 4. Gallery.astro
* **Datos consumidos**: `business.gallery` (Colección de imágenes locales ubicadas en `public/images/client/gallery/`).
* **Componentes UI**: `Section`, `Container`, `Card`.

### 5. Testimonials.astro
* **Datos consumidos**: `business.testimonials` (Array de testimonios con nombre, valoración de 1 a 5, y comentario).
* **Componentes UI**: `Section`, `Container`, `Card`, `Icon`.

### 6. FAQ.astro
* **Datos consumidos**: `business.faq` (Preguntas y respuestas más habituales).
* **Componentes UI**: `Section`, `Container`.
* *Nota de JS*: Se prefiere una aproximación nativa pura usando etiquetas `<details>` y `<summary>` para evitar el uso de JS en el despliegue del acordeón.

### 7. Contact.astro
* **Datos consumidos**: `business.contact` (Teléfono, correo electrónico, dirección física) y `business.schedule` (Días y horarios de atención).
* **Componentes UI**: `Section`, `Container`, `Icon`, `Button`.

### 8. CTA.astro
* **Datos consumidos**: `business.brand.name`, `business.contact.whatsapp`.
* **Componentes UI**: `Section`, `Container`, `Button`.

---

# Orden de Composición Recomendado (`src/pages/index.astro`)
Para maximizar el embudo de conversión y guiar al usuario a la acción de forma natural, el orden sugerido para la estructura de la landing page es:
1. `Hero` (Impacto y valor inicial)
2. `Services` (Qué solucionamos/ofrecemos)
3. `About` (Quiénes somos, autoridad y confianza)
4. `Gallery` (Prueba de calidad visual)
5. `Testimonials` (Prueba social)
6. `FAQ` (Resolución de dudas antes de actuar)
7. `Contact` (Facilidad para encontrarnos y agendar de forma física)
8. `CTA` (Recordatorio final de conversión rápida)

# Checklist de implementación
- [ ] Enriquecer el objeto de `business.ts` con arrays estructurados para `services`, `testimonials`, `gallery` y `faq`.
- [ ] Maquetar la sección `Hero` garantizando legibilidad en pantallas pequeñas.
- [ ] Implementar la sección de `Services` con formato de grilla responsiva (usando clases de Tailwind como `grid-cols-1 md:grid-cols-3`).
- [ ] Diseñar la sección `About` con soporte para una o dos columnas.
- [ ] Crear la galería de imágenes estática (grilla optimizada responsiva).
- [ ] Crear el panel de testimonios con soporte visual para valoraciones en estrellas mediante `Icon name="star"`.
- [ ] Desarrollar `FAQ` usando acordeones HTML puros basados en `<details>` y `<summary>`.
- [ ] Maquetar la sección `Contact` integrando el formulario de contacto visual y los datos de teléfono, correo y horarios de atención.
- [ ] Construir la franja final `CTA` de cierre rápido.
- [ ] Componer la landing page completa importando y ordenando las secciones dentro de `src/pages/index.astro`.

# Checklist de validación
- [ ] El diseño se adapta perfectamente a dispositivos móviles y pantallas de escritorio (100% responsivo).
- [ ] Al dar clic en un botón de ancla (ej: `#contacto`), la página realiza una transición suave hacia la sección correspondiente (validando la regla CSS `scroll-behavior: smooth`).
- [ ] El acordeón de preguntas frecuentes se abre y se cierra correctamente en dispositivos móviles sin necesidad de frameworks JS.
- [ ] Ejecutar `npm run build` compila con éxito las nuevas dependencias de sección en archivos estáticos HTML optimizados.

# Riesgos comunes
* **Falta de datos en business.ts**: Tratar de renderizar un servicio o testimonio sin validar primero si el array existe en `business.ts`, causando errores de ejecución `undefined.map()`.
* **Uso ineficiente de imágenes**: El tamaño de las imágenes cargadas por el cliente puede ralentizar la carga inicial. Es crucial aconsejar el uso de formatos modernos (como `.webp` o `.jpg` optimizados) dentro de la documentación destinada al cliente final.

# Definition of Done
La Fase 3 se considera terminada cuando todas las secciones estructurales han sido implementadas, consultan los datos dinámicos desde `business.ts`, están integradas y ordenadas en la página principal, el sitio es 100% responsivo y compila limpiamente para producción.
