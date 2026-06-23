# PHASE_05_SEO.md - Optimización para Motores de Búsqueda y SEO Local

# Objetivo de la fase
Garantizar la visibilidad y el posicionamiento orgánico del negocio local en motores de búsqueda (principalmente Google). Esto se logra mediante la inyección automatizada de meta etiquetas de SEO, tarjetas de Open Graph (para compartir en redes sociales), sitemaps declarativos, un archivo robots.txt adecuado y, fundamentalmente, la estructura semántica de datos de Schema.org para negocios locales (`LocalBusiness`).

# Alcance
* Configuración de meta-etiquetas estándar (`title`, `description`, `canonical`, `viewport`, `charset`) en `Layout.astro`.
* Configuración de etiquetas Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`) en la cabecera del documento.
* Generación dinámica del mapa del sitio web (`sitemap.xml`) usando herramientas oficiales de Astro.
* Creación de un archivo `robots.txt` estandarizado para permitir el correcto rastreo.
* Creación de un componente inyectable de datos estructurados (`LocalBusiness` Schema) en formato JSON-LD, extrayendo los datos de `business.ts`.

# Exclusiones
* No se crearán campañas publicitarias (SEM).
* No se asocia analítica de terceros pesada (Google Analytics/Tag Manager) en el código nativo de la plantilla para no comprometer el rendimiento en Lighthouse. (Se documentará para que el usuario pueda agregarlo si lo desea de forma externa).

# Archivos que se crearán o modificarán
* `src/components/seo/LocalBusinessSchema.astro` - Componente generador del script JSON-LD de Schema.org.
* `src/layouts/Layout.astro` - Actualización de la etiqueta `<head>` para recibir e inyectar el SEO dinámicamente.
* `public/robots.txt` - Configuración de indexación y enlace al sitemap.
* `astro.config.mjs` - Integración de sitemap de Astro.

# Dependencias necesarias
* `@astrojs/sitemap` (módulo de Astro para la autogeneración del archivo `sitemap.xml` en cada build).

---

# Datos Requeridos, Estructuración y Validación

### 1. Datos Requeridos en `business.ts`
El SEO depende por completo de la integridad de los datos de negocio:
* `siteUrl`: URL donde estará alojado el proyecto final (ej: `https://barberiatradicion.com`). Requerido para construir enlaces canónicos absolutos.
* `brand.name` y `brand.slogan`.
* `seo.defaultTitle` y `seo.defaultDescription`.
* `seo.ogImage`: Imagen representativa de 1200x630 píxeles para previsualizaciones en WhatsApp y redes sociales.
* `contact.address`, `contact.phone`, `contact.email`, `schedule`.

### 2. Estructuración de `LocalBusinessSchema.astro`
Este componente se encarga de estructurar la información maestra en el lenguaje que los rastreadores de Google entienden mejor.

```astro
---
import { business } from '@/config/business';

const { brand, contact, schedule, seo } = business;

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": brand.name,
  "image": `${seo.siteUrl}${brand.logo}`,
  "@id": seo.siteUrl,
  "url": seo.siteUrl,
  "telephone": contact.phone,
  "email": contact.email,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": contact.address,
    "addressLocality": "Madrid", // Esto puede desglosarse en business.ts si es necesario
    "addressRegion": "Madrid",
    "postalCode": "28001",
    "addressCountry": "ES"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 40.416775, // Opcional, puede agregarse a business.ts
    "longitude": -3.703790
  },
  "openingHoursSpecification": schedule.map(item => ({
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": item.days.split(' a '), // O procesamiento similar
    "opens": "10:00",
    "closes": "20:00"
  }))
};
---

<script type="application/ld+json" set:html={JSON.stringify(schema)} />
```

### 3. Validación de SEO y Rendimiento (Checklist Lighthouse)
Para cumplir con la **Definition of Done** del proyecto (Lighthouse superior a 90), se debe validar la configuración utilizando la suite de auditorías de Chrome Developer Tools:
* **Fácil indexación**: Comprobar que todas las páginas devuelvan un código de estado HTTP 200 y que no contengan cabeceras noindex no deseadas.
* **Etiqueta Alt de Imágenes**: Todas las etiquetas `<img>` del sitio web deben contar con un atributo `alt` semántico derivado de `business.ts` (por ejemplo, `alt={servicio.name}`).
* **Tamaño mínimo de fuentes y botones**: Los enlaces e iconos interactivos deben tener un área de pulsación de al menos 48x48 píxeles para evitar penalizaciones por usabilidad móvil.

---

# Checklist de implementación
- [ ] Instalar la dependencia oficial `@astrojs/sitemap` y registrarla en `astro.config.mjs`.
- [ ] Completar la configuración del `site` en `astro.config.mjs` con la URL del cliente.
- [ ] Crear el componente `LocalBusinessSchema.astro` y verificar que los datos JSON-LD se compilan sin corromper el marcado HTML.
- [ ] Incorporar el componente de Schema y los meta tags canónicos y Open Graph en la cabecera `<head>` de `Layout.astro`.
- [ ] Escribir el archivo estático `public/robots.txt` enlazando dinámicamente al sitemap de producción.

# Checklist de validación
- [ ] Ejecutar un build de producción (`npm run build`) y verificar que se genera automáticamente el archivo `dist/sitemap-index.xml`.
- [ ] Utilizar la herramienta oficial "Google Rich Results Test" en modo local o posterior al deploy para validar que el marcado de `LocalBusiness` sea 100% válido y libre de advertencias críticas.
- [ ] Abrir el código fuente del sitio generado y constatar que existan meta-etiquetas únicas y canónicas absolutas que apunten a la URL definitiva del sitio.

# Riesgos comunes
* **URL Canónica Incorrecta**: Usar rutas relativas en la etiqueta canonical (`href="/servicios"`) en lugar de URLs absolutas (`href="https://midominio.com/servicios"`). Esto confunde a los motores de búsqueda y genera problemas de indexación y contenido duplicado.
* **Logo en formato inválido**: Google Schema exige que la imagen de identidad del negocio sea una URL absoluta en formatos estándar (`.png`, `.jpg`, `.svg`).

# Definition of Done
La Fase 5 se considera terminada cuando las meta etiquetas de SEO, las tarjetas Open Graph, el componente Local Business Schema JSON-LD, el archivo robots.txt y la autogeneración de sitemaps han sido implementados y comprobados con éxito a través de las suites de validación locales, superando la métrica de 90 en el apartado SEO de Google Lighthouse.
