# PHASE_02_UI.md - Componentes UI Reutilizables

# Objetivo de la fase
Crear el catálogo de componentes base del nivel visual (Nivel 3). Estos componentes deben ser puros, altamente reutilizables, libres de lógica de negocio, y diseñados para acoplarse dinámicamente al sistema de colores y estilos globales cargados desde `business.ts`.

# Alcance
Desarrollo de los 5 componentes UI primitivos especificados:
1. **Button**: Botón polimórfico (se comporta como `<a>` o `<button>`).
2. **Card**: Bloque contenedor estilizado con sombras y transiciones suaves para destacar contenido.
3. **Container**: Delimitador responsivo de ancho máximo de pantalla.
4. **Section**: Envoltura de sección semántica con relleno vertical y fondos preconfigurados.
5. **Icon**: Motor de iconos vectoriales ligero y centralizado sin librerías pesadas.

# Exclusiones
* No crear bloques complejos de página (Hero, Formulario de contacto completo, FAQ interactivo).
* No implementar lógica de consulta directa a `business.ts` dentro de estos componentes (los componentes UI deben recibir parámetros genéricos a través de `Props`).
* No utilizar frameworks interactivos de UI (React, Vue, Svelte) ni dependencias externas de iconos.

# Archivos que se crearán
* `src/components/ui/Button.astro`
* `src/components/ui/Card.astro`
* `src/components/ui/Container.astro`
* `src/components/ui/Section.astro`
* `src/components/ui/Icon.astro`

# Dependencias necesarias
Ninguna dependencia externa. Se prioriza el desarrollo nativo con Astro y clases puras de Tailwind CSS.

---

# Responsabilidades, Props y Ejemplos de Uso

### 1. Button.astro
* **Responsabilidad**: Interacción principal, redirecciones internas o externas.
* **Props**:
  * `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' (Estilo visual).
  * `size`: 'sm' | 'md' | 'lg' (Acolchado y fuente).
  * `href`: string (Opcional, convierte el botón en un elemento de ancla `<a>`).
  * `class`: string (Opcional, clases CSS extra).
* **Ejemplo de Uso**:
  ```astro
  ---
  import Button from '@/components/ui/Button.astro';
  ---
  <Button variant="primary" href="#contacto">Escríbenos</Button>
  <Button variant="outline" type="submit">Enviar Formulario</Button>
  ```

### 2. Card.astro
* **Responsabilidad**: Enmarcar bloques lógicos como servicios individuales, testimonios o preguntas frecuentes.
* **Props**:
  * `class`: string (Clases CSS extra).
  * `hover`: boolean (Activa o desactiva la animación al pasar el cursor, por defecto `true`).
* **Ejemplo de Uso**:
  ```astro
  ---
  import Card from '@/components/ui/Card.astro';
  ---
  <Card hover={true} class="p-6">
    <h3 class="text-xl font-bold">Servicio 1</h3>
    <p>Descripción detallada del servicio.</p>
  </Card>
  ```

### 3. Container.astro
* **Responsabilidad**: Unificar el centrado del contenido a lo largo de toda la página para un aspecto profesional y alineado.
* **Props**:
  * `size`: 'sm' | 'md' | 'lg' | 'xl' | 'full' (Ancho máximo preestablecido).
  * `class`: string (Clases CSS extra).
* **Ejemplo de Uso**:
  ```astro
  ---
  import Container from '@/components/ui/Container.astro';
  ---
  <Container size="lg">
    <p>Este texto no superará la alineación estricta de la rejilla principal.</p>
  </Container>
  ```

### 4. Section.astro
* **Responsabilidad**: Agrupar bloques funcionales asignándoles espaciado vertical homogéneo y color de fondo estandarizado.
* **Props**:
  * `id`: string (Opcional, para enlaces internos o navegación de anclas).
  * `background`: 'light' | 'dark' | 'primary-light' | 'white' (Fondo de sección).
  * `class`: string (Clases CSS extra).
* **Ejemplo de Uso**:
  ```astro
  ---
  import Section from '@/components/ui/Section.astro';
  ---
  <Section id="servicios" background="light">
    <h2>Nuestros Servicios</h2>
  </Section>
  ```

### 5. Icon.astro
* **Responsabilidad**: Renderizado de elementos vectoriales (SVG) de alto rendimiento para conversiones locales (WhatsApp, teléfono, correo, etc.).
* **Props**:
  * `name`: Selector estricto de iconos (`'phone' | 'whatsapp' | 'email' | 'map-pin' | 'clock' | 'chevron-right' | 'chevron-down' | 'check' | 'star' | 'facebook' | 'instagram' | 'menu' | 'close' | 'arrow-right'`).
  * `class`: string (Clases de Tailwind CSS para definir color y tamaño, ej: `w-6 h-6 text-primary`).
  * `size`: string | number (Opcional, para forzar tamaño en píxeles).
* **Ejemplo de Uso**:
  ```astro
  ---
  import Icon from '@/components/ui/Icon.astro';
  ---
  <Icon name="whatsapp" class="text-green-500 w-8 h-8" />
  ```

---

# Reglas de Reutilización
* **Independencia Total**: Un componente UI no debe importar `src/config/business.ts`. Toda información de textos, URLs o rutas debe ser inyectada por el componente contenedor a través de props o slots.
* **Extensibilidad**: Todos los componentes deben aceptar y propagar la propiedad `class` (o `class:list` de Astro) para permitir pequeños ajustes contextuales (márgenes, displays, etc.) desde las capas superiores.
* **Pureza de Estilos**: Usar clases abstractas de Tailwind como `bg-primary` en lugar de hexadecimales duros o referencias específicas del cliente.

# Checklist de implementación
- [x] Crear componente de botón polimórfico `Button.astro`.
- [x] Crear contenedor de bloques `Card.astro` con soporte para animaciones opcionales.
- [x] Crear delimitador responsivo de anchos `Container.astro`.
- [x] Crear envoltura de sección semántica `Section.astro`.
- [x] Crear motor de renderizado SVG inline `Icon.astro` con catálogo básico para negocios locales.

# Checklist de validación
- [x] El componente `Button.astro` renderiza correctamente un botón físico (`<button>`) o enlace ancla (`<a>`) según las propiedades suministradas.
- [x] Los componentes aceptan inyección de clases externas mediante la propiedad `class`.
- [x] `Icon.astro` se muestra correctamente en pantalla sin descargar archivos externos ni requerir librerías pesadas en tiempo de carga.
- [x] La compilación en producción (`npm run build`) termina con éxito y cero advertencias.

# Riesgos comunes
* **Pérdida de flexibilidad polimórfica en Button**: No propagar correctamente los atributos con `{...rest}` puede romper eventos de formularios como `type="submit"` o el redireccionamiento en anclas.
* **Crecimiento desordenado de Icon.astro**: El catálogo de SVGs en `Icon.astro` debe limitarse estrictamente a los requeridos por la plantilla. No se deben añadir iconos específicos que pertenezcan exclusivamente a un diseño de cliente singular.

# Definition of Done
La Fase 2 se considera finalizada cuando los 5 componentes visuales reutilizables están completamente desarrollados y testeados, y el sitio web compila limpiamente para producción.
