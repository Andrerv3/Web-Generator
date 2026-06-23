# PHASE_04_INTEGRATIONS.md - Integraciones de Conversión

# Objetivo de la fase
Implementar los canales de conversión y geolocalización de la web de forma 100% estática (sin backend ni servidores de base de datos personalizados). Esto incluye la integración de un botón flotante de WhatsApp, un formulario funcional procesado por terceros, y un mapa embebido de Google Maps.

# Alcance
* Creación de un botón flotante de WhatsApp estático y permanente en pantalla.
* Integración de un mapa interactivo (iframe) de Google Maps basado en las configuraciones de `business.ts`.
* Configuración dinámica de formularios utilizando **Formspree** o **Netlify Forms** como procesadores de correo (según configuración de `business.ts`), sin codificar endpoints ni almacenar datos localmente.

# Exclusiones
* **Prohibido crear backend**: No se permite crear servidores personalizados en Express, Node u otros lenguajes.
* No se deben almacenar datos de clientes en bases de datos locales (MySQL, MongoDB, PostgreSQL, etc.).
* No integrar servicios de mensajería complejos que no sean WhatsApp directo (por ejemplo, chats en vivo complejos de terceros que degraden el rendimiento).

# Archivos que se crearán
* `src/components/ui/WhatsAppFloat.astro` - Botón flotante de WhatsApp.
* `src/components/sections/Map.astro` - Sección del mapa interactivo.
* Actualización de `src/components/sections/Contact.astro` para soportar las integraciones de formularios.

# Dependencias necesarias
Ninguna dependencia externa requerida de npm para las integraciones. Se utilizan servicios HTTP directos e iframes seguros.

---

# Configuración e Integraciones

### 1. WhatsApp Float (`WhatsAppFloat.astro`)
* **Propósito**: Permitir que el usuario contacte con un solo clic desde cualquier parte del sitio web.
* **Configuración en `business.ts`**:
  * `business.contact.whatsapp`: Número con formato internacional sin espacios (ej: `+34600000000` o `34600000000`).
  * `business.contact.whatsappMessage`: Mensaje predeterminado de saludo (codificado para URL).
* **Ejemplo de Implementación**:
  ```astro
  ---
  import { business } from '@/config/business';
  import Icon from '@/components/ui/Icon.astro';

  const { whatsapp, whatsappMessage } = business.contact;
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${whatsapp}?text=${encodedMessage}`;
  ---
  <a 
    href={whatsappUrl} 
    target="_blank" 
    rel="noopener noreferrer" 
    class="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-200 z-50 flex items-center justify-center"
    aria-label="Contactar por WhatsApp"
  >
    <Icon name="whatsapp" class="w-7 h-7" />
  </a>
  ```

### 2. Formularios de Contacto Dinámicos
* **Propósito**: Capturar clientes potenciales y enviarlos de forma automática al correo electrónico del dueño del negocio.
* **Opciones del Procesador**:
  * **Opción A: Formspree**: Se utiliza si la web se aloja fuera de Netlify o se prefiere una cuenta centralizada. Consume la variable `business.integrations.formspreeId`.
  * **Opción B: Netlify Forms**: Solución ideal y recomendada al hospedar el sitio en Netlify. Funciona simplemente añadiendo atributos declarativos HTML en el formulario.
* **Ejemplo de Maquetación Condicional**:
  ```astro
  ---
  import { business } from '@/config/business';
  const { formspreeId, useNetlifyForms } = business.integrations;
  const actionUrl = useNetlifyForms ? undefined : `https://formspree.io/f/${formspreeId}`;
  ---
  <form 
    action={actionUrl} 
    method="POST" 
    data-netlify={useNetlifyForms ? "true" : undefined}
    name="contact-form"
    class="space-y-4"
  >
    <input type="text" name="name" required placeholder="Tu nombre" class="w-full p-3 border rounded" />
    <input type="email" name="email" required placeholder="Tu correo electrónico" class="w-full p-3 border rounded" />
    <textarea name="message" required placeholder="¿En qué podemos ayudarte?" class="w-full p-3 border rounded"></textarea>
    <button type="submit" class="bg-primary text-white px-6 py-3 rounded">Enviar Mensaje</button>
  </form>
  ```

### 3. Google Maps (`Map.astro`)
* **Propósito**: Mostrar de manera clara la localización física del negocio para maximizar las visitas locales.
* **Configuración en `business.ts`**:
  * `business.contact.googleMapsEmbed`: URL completa del mapa de inserción (extraída del iframe de compartir en Google Maps).
  * `business.contact.googleMapsLink`: URL directa a la app de Google Maps para navegación.
* **Ejemplo de Integración**:
  ```astro
  ---
  import { business } from '@/config/business';
  import Section from '@/components/ui/Section.astro';
  import Container from '@/components/ui/Container.astro';
  import Button from '@/components/ui/Button.astro';

  const { googleMapsEmbed, googleMapsLink } = business.contact;
  ---
  <Section id="ubicacion" background="light">
    <Container size="lg" class="flex flex-col items-center">
      <div class="w-full h-96 rounded-xl overflow-hidden shadow-sm mb-6 border border-neutral-light/20">
        <iframe 
          src={googleMapsEmbed} 
          width="100%" 
          height="100%" 
          style="border:0;" 
          allowfullscreen="" 
          loading="lazy" 
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Button variant="outline" href={googleMapsLink} target="_blank" rel="noopener noreferrer">
        Abrir en Google Maps
      </Button>
    </Container>
  </Section>
  ```

---

# Checklist de implementación
- [ ] Crear el componente `WhatsAppFloat.astro` y verificar que genera el link de forma dinámica según el teléfono guardado en `business.ts`.
- [ ] Incorporar el componente `WhatsAppFloat.astro` en la parte inferior de `Layout.astro` para asegurar su visualización en todas las páginas.
- [ ] Implementar la sección `Map.astro` con soporte para iframe dinámico e incluirla en la maquetación de `src/pages/index.astro`.
- [ ] Configurar el formulario en `Contact.astro` para cambiar dinámicamente su estructura si se selecciona Formspree o Netlify Forms.

# Checklist de validación
- [ ] Al presionar el botón de WhatsApp desde un teléfono inteligente, se abre la aplicación nativa o web de WhatsApp con el número cargado y el texto del saludo preconfigurado.
- [ ] El mapa de Google Maps se visualiza correctamente, escala responsivamente y muestra el pin de ubicación de forma idéntica en pantallas móviles y desktop.
- [ ] Si se utiliza Netlify Forms, el formulario contiene las etiquetas `data-netlify="true"` y `name="contact-form"`.
- [ ] El comando `npm run build` compila con éxito.

# Riesgos comunes
* **Número de WhatsApp mal estructurado**: Ingresar el número con símbolos de suma (+), guiones o espacios en `business.ts` puede romper la API de redirección rápida de `wa.me`. Debe guardarse limpio de caracteres no numéricos.
* **Inseguridad de iframes**: No agregar el atributo `loading="lazy"` en el iframe de Google Maps puede perjudicar enormemente el rendimiento inicial (First Contentful Paint) de la web.

# Definition of Done
La Fase 4 se considera terminada cuando el botón flotante de WhatsApp, el mapa dinámico interactivo y el formulario de contacto con selector dinámico Formspree/Netlify Forms han sido implementados y funcionan correctamente, completándose el compilado de producción sin advertencias.
