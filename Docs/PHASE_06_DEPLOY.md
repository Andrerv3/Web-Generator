# PHASE_06_DEPLOY.md - Despliegue, Optimización Final y Puesta en Producción

# Objetivo de la fase
Automatizar y optimizar el proceso de empaquetado final y publicación de la plantilla en producción a través de la plataforma de hosting recomendada: **Netlify**. El objetivo comercial es asegurar un proceso de entrega que demore menos de 5 minutos una vez que la configuración del cliente ha sido cargada, garantizando un rendimiento excelente de carga y visualización inmediata.

# Alcance
* Configuración de la automatización de la integración y entrega continuas (CI/CD) vinculando el repositorio de Git a Netlify.
* Definición de configuraciones de empaquetado para producción (`astro build`).
* Gestión de caché y optimizaciones de entrega en la red CDN de Netlify.
* Verificación previa y posterior al despliegue para garantizar la calidad final del producto entregado.

# Exclusiones
* No se asocian integraciones de servidores o proxies inversos personalizados fuera del entorno Serverless/estático de Netlify.
* No se crean APIs o funciones Lambda complejas si no son para dar soporte a integraciones básicas del formulario.

# Archivos que se crearán o modificarán
* `netlify.toml` - Archivo maestro de configuración de despliegue de Netlify que define los directorios de salida, comandos de construcción y cabeceras de caché HTTP.

# Dependencias necesarias
Ninguna dependencia adicional de Node.js. Netlify interpreta la configuración de Astro nativamente en su entorno de build.

---

# Proceso de Despliegue y Optimización en Netlify

Al compilar un sitio web con Astro, se generan archivos estáticos HTML, CSS y JS optimizados de manera nativa. El archivo de configuración `netlify.toml` se encarga de instruir al servidor cómo procesar y servir estos recursos con la mayor velocidad posible.

### Archivo `netlify.toml` de Ejemplo
```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.processing]
  skip_processing = false

[build.processing.css]
  bundle = true
  minify = true

[build.processing.html]
  pretty_urls = true
  minify = true

[build.processing.images]
  compress = true

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "no-referrer-when-downgrade"
    Content-Security-Policy = "default-src 'self' 'unsafe-inline' https://www.google.com https://maps.google.com https://formspree.io; img-src 'self' data: https:; frame-src https://www.google.com https://maps.google.com;"

# Configuración de caché avanzada para activos estáticos de producción
[[headers]]
  for = "/_astro/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

---

# Checklist Previo a Producción
Antes de conectar el sitio a Netlify, realiza la siguiente lista de control local:
- [ ] ¿El archivo `src/config/business.ts` contiene la información correcta del cliente final sin rastros de la barbería de pruebas?
- [ ] ¿Se han reemplazado todas las imágenes del sitio dentro de `public/images/client/` por los activos reales del negocio en formatos optimizados (como `.webp` de preferencia)?
- [ ] ¿El favicon o `logo.svg` fue reemplazado por la marca real del negocio?
- [ ] ¿La URL definitiva del cliente (`siteUrl`) está correctamente ingresada tanto en `business.ts` como en `astro.config.mjs`?
- [ ] ¿Se ejecutó una prueba de compilación en local (`npm run build`) de forma limpia?

---

# Checklist Posterior al Deploy (Puesta en Marcha)
Una vez que el build ha finalizado con éxito en el panel de Netlify, ejecuta los siguientes pasos:
- [ ] **Configurar Dominio**: Vincular el dominio propio del cliente (ej: `www.barberiamadrid.com`) y verificar que Netlify asigne y configure automáticamente el certificado de seguridad SSL (HTTPS) de Let's Encrypt de forma gratuita.
- [ ] **Verificar Redirecciones de WhatsApp**: Visitar el sitio en vivo desde un dispositivo móvil real y probar que el botón flotante abra la aplicación de WhatsApp correctamente.
- [ ] **Probar Envío de Formulario**: Enviar un mensaje de prueba a través del formulario de contacto para validar la llegada del correo de confirmación al buzón del cliente.
- [ ] **Ejecutar Auditoría Lighthouse**: Abrir una pestaña de navegación de incógnito, acceder al dominio oficial del cliente y realizar la prueba de rendimiento de Lighthouse en la pestaña "Rendimiento" del navegador. Asegurar puntuaciones superiores a 90 tanto en *Performance* como en *SEO*.

---

# Riesgos comunes
* **Falta de Minificación**: Desactivar por error el minificado de CSS o HTML en la compilación de Astro, lo que aumentará el tamaño de transferencia y penalizará la puntuación de carga móvil en Lighthouse.
* **Fallas en la CDN de imágenes**: No optimizar las dimensiones de las imágenes antes de cargarlas. Si un usuario sube una fotografía directa de una cámara profesional de 10 MB para la galería, la velocidad de carga de la web se desplomará de inmediato.
* **Configuración del formulario desvinculada**: Olvidar configurar la variable `formspreeId` en producción o no activar la funcionalidad en Netlify Forms, lo que provocará que las solicitudes de contacto de los clientes se pierdan por completo sin aviso alguno.

# Definition of Done
La Fase 6 se considera terminada cuando la web de plantilla se despliega de manera exitosa en el servidor de producción de Netlify, el dominio SSL propio del cliente está asociado y responde bajo protocolo HTTPS, las pruebas de envío de correos y WhatsApp son funcionales en vivo, y las puntuaciones de la auditoría de rendimiento de Google Lighthouse en producción superan los 90 puntos en Performance y SEO de manera sostenida.
