# AI_CONTEXT.md

## Proyecto

Local Business Template

---

# Objetivo del Proyecto

Este proyecto NO es un framework.

Este proyecto NO es un CMS.

Este proyecto NO es un clon de WordPress.

Este proyecto es una plantilla optimizada para generar webs de pequeños negocios locales de forma extremadamente rápida.

El objetivo es poder crear una nueva web en menos de 1-2 horas modificando únicamente configuración e imágenes.

Los tipos de negocio objetivo son:

* Peluquerías
* Barberías
* Clínicas
* Fisioterapeutas
* Restaurantes
* Gimnasios
* Talleres
* Electricistas
* Fontaneros
* Abogados
* Gestorías
* Negocios locales similares

---

# Objetivo Comercial

El propósito principal es vender webs profesionales a pequeños negocios.

Toda decisión técnica debe justificarse mediante alguno de estos beneficios:

* Más velocidad de desarrollo
* Menos mantenimiento
* Más conversiones
* Más facilidad de reutilización
* Mejor SEO local
* Más facilidad para generar nuevas webs

Si una decisión técnica no mejora alguno de estos puntos, probablemente no debe implementarse.

---

# Filosofía del Proyecto

Prioridades:

1. Simplicidad
2. Rapidez de desarrollo
3. Reutilización
4. Conversión
5. SEO Local
6. Rendimiento

NO se optimiza para:

* Arquitecturas empresariales
* Microservicios
* Escalabilidad masiva
* Complejidad innecesaria
* Frameworks internos

---

# Stack Tecnológico

Frontend:

* Astro
* Tailwind CSS
* TypeScript

Hosting:

* Netlify

Formularios:

* Formspree
* Netlify Forms

Conversión:

* WhatsApp

SEO:

* Schema.org
* Open Graph
* Sitemap

---

# Arquitectura General

Estructura simplificada:

local-business-template/

src/

config/
business.ts

components/
ui/
layout/
sections/
seo/

layouts/
Layout.astro

pages/

styles/
global.css

utils/

public/

images/
client/

---

# Fuente Única de Verdad

El proyecto debe depender principalmente de:

src/config/business.ts

Este archivo contiene:

* Branding
* Colores
* Información de contacto
* Horarios
* Servicios
* Textos
* FAQ
* SEO
* Imágenes
* Integraciones

Todo el contenido debe derivarse de este archivo.

---

# Contrato del Sistema

Reglas obligatorias.

## Regla 1

No utilizar contenido hardcodeado en componentes.

Incorrecto:

const title = "Peluquería María";

Correcto:

business.brand.name

---

## Regla 2

Toda la información visible debe provenir de business.ts.

---

## Regla 3

Los componentes deben ser reutilizables.

No crear componentes específicos para un cliente.

---

## Regla 4

No introducir dependencias innecesarias.

---

## Regla 5

Todo debe poder clonarse y configurarse rápidamente.

---

## Regla 6

No crear backend.

---

## Regla 7

No almacenar datos.

---

## Regla 8

No crear sistemas complejos de administración.

---

# Separación de Capas

## Nivel 1 - Negocio

business.ts

Responsabilidad:

* Configuración
* Branding
* SEO
* Textos
* Datos del negocio

No contiene UI.

---

## Nivel 2 - Estructura

Layouts y Sections.

Responsabilidad:

* Organizar contenido
* Componer páginas

No contiene datos hardcodeados.

---

## Nivel 3 - UI

Componentes UI.

Responsabilidad:

* Presentación visual

No contiene lógica de negocio.

---

# Componentes Permitidos

## UI

* Button
* Card
* Container
* Section
* Icon

---

## Layout

* Header
* Footer
* MobileMenu

---

## Sections

* Hero
* Services
* About
* Gallery
* Testimonials
* FAQ
* Contact
* Map
* CTA
* TrustBadges
* WhatsAppFloat

---

# Reglas Astro

## JavaScript

Por defecto:

0 JavaScript.

Solo hidratar cuando sea necesario.

Permitido:

* MobileMenu
* Formularios interactivos
* WhatsApp Float si es necesario

Evitar:

client:load

Preferir:

client:visible

o

HTML estático.

---

# SEO Local

Toda web debe incluir:

* Title
* Meta Description
* Open Graph
* Canonical
* Sitemap
* robots.txt
* LocalBusiness Schema

Cuando aplique:

* FAQ Schema
* Service Schema

---

# Sistema de Imágenes

Las imágenes se almacenan en:

public/images/client/

Ejemplo:

public/images/client/

hero/
gallery/
team/

logo.svg

El cliente solo debe sustituir archivos.

No modificar componentes.

Priorizar simplicidad sobre optimización extrema.

---

# Flujo de Trabajo por Cliente

Paso 1

Clonar repositorio.

Paso 2

Modificar:

src/config/business.ts

Paso 3

Sustituir imágenes.

Paso 4

Probar localmente.

Paso 5

Deploy en Netlify.

Paso 6

Entregar.

---

# Fases de Implementación

## Fase 1

Base del proyecto.

Objetivos:

* Astro
* Tailwind
* Layout
* business.ts

---

## Fase 2

Componentes UI.

Objetivos:

* Button
* Card
* Container
* Section
* Icon

---

## Fase 3

Secciones.

Objetivos:

* Hero
* Services
* About
* Gallery
* Testimonials
* FAQ
* Contact
* CTA

---

## Fase 4

Integraciones.

Objetivos:

* WhatsApp
* Formularios
* Google Maps

---

## Fase 5

SEO.

Objetivos:

* Schema.org
* Open Graph
* Sitemap
* robots.txt

---

## Fase 6

Producción.

Objetivos:

* Netlify
* Optimización
* Deploy

---

# Definition of Done

Una web se considera terminada cuando:

* Responsive funciona correctamente
* Menú móvil funciona
* WhatsApp funciona
* Formulario funciona
* SEO básico implementado
* Schema.org implementado
* Sitemap generado
* Imágenes configuradas
* business.ts completado
* Deploy funcionando
* Lighthouse Performance superior a 90
* Lighthouse SEO superior a 90

No se deben añadir funcionalidades adicionales una vez cumplidos estos requisitos salvo petición expresa del cliente.

---

# Anti-Patrones

Prohibido:

* WordPress
* Backend personalizado
* APIs innecesarias
* Redux
* Zustand
* State managers complejos
* CMS complejos
* Newsletter
* RSS
* Sistemas de membresía
* Dashboards
* Autenticación
* Bases de datos
* Microservicios
* Arquitecturas empresariales

---

# Principio Fundamental

El objetivo del proyecto NO es construir el sistema técnicamente más avanzado.

El objetivo es construir el sistema más rentable, reutilizable y rápido posible para vender webs a negocios locales.

Siempre elegir:

* Menos código
* Menos mantenimiento
* Menos dependencias
* Más reutilización
* Más velocidad

Cuando existan varias soluciones válidas, elegir siempre la más simple.
