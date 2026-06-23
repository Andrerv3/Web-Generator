export interface BusinessConfig {
  brand: {
    name: string;
    slogan: string;
    logo: string;
  };
  colors: {
    primary: string;
    primaryHover: string;
    primaryLight: string;
    secondary: string;
    secondaryHover: string;
    secondaryLight: string;
    neutralDark: string;
    neutralLight: string;
  };
  contact: {
    phone: string;
    whatsapp: string;
    whatsappMessage: string;
    email: string;
    address: string;
    googleMapsLink: string;
    googleMapsEmbed: string;
  };
  schedule: Array<{
    days: string;
    hours: string;
  }>;
  services: Array<{
    name: string;
    description: string;
    price?: string;
    image?: string;
  }>;
  about: {
    title: string;
    description1: string;
    description2?: string;
    image?: string;
  };
  gallery: Array<string>;
  testimonials: Array<{
    name: string;
    comment: string;
    rating: number;
  }>;
  faq: Array<{
    question: string;
    answer: string;
  }>;
  seo: {
    titleTemplate: string;
    defaultTitle: string;
    defaultDescription: string;
    lang: string;
    siteUrl: string;
    ogImage: string;
  };
  integrations: {
    formspreeId: string;
    useNetlifyForms: boolean;
  };
}

export const business: BusinessConfig = {
  brand: {
    name: "Barbería Tradición",
    slogan: "Cortes clásicos y estilo moderno en el corazón de la ciudad",
    logo: "/images/client/logo.svg"
  },
  colors: {
    primary: "#1e293b",       // slate-800
    primaryHover: "#0f172a",  // slate-900
    primaryLight: "#f1f5f9",  // slate-100
    secondary: "#b45309",     // amber-700
    secondaryHover: "#92400e", // amber-800
    secondaryLight: "#fef3c7", // amber-100
    neutralDark: "#0f172a",   // slate-900
    neutralLight: "#fafafa"   // slate-50
  },
  contact: {
    phone: "+34 600 000 000",
    whatsapp: "+34600000000",
    whatsappMessage: "¡Hola! Me gustaría reservar una cita en Barbería Tradición.",
    email: "info@barberiatradicion.com",
    address: "Calle de la Tradición, 12, 28001 Madrid",
    googleMapsLink: "https://maps.google.com/...",
    googleMapsEmbed: "https://www.google.com/maps/embed/..."
  },
  schedule: [
    { days: "Lunes a Viernes", hours: "10:00 - 20:00" },
    { days: "Sábados", hours: "09:00 - 14:00" },
    { days: "Domingos", hours: "Cerrado" }
  ],
  services: [
    { name: "Corte de Pelo", description: "Corte clásico o moderno personalizado.", price: "20€" },
    { name: "Afeitado Tradicional", description: "Afeitado con toalla caliente y navaja.", price: "15€" },
    { name: "Pack Completo", description: "Corte de pelo y afeitado tradicional.", price: "30€" }
  ],
  about: {
    title: "Más de 20 años de experiencia",
    description1: "En Barbería Tradición, combinamos la maestría de la barbería clásica con las últimas tendencias en peluquería masculina.",
    description2: "Nuestro compromiso es ofrecer un espacio donde el cliente se sienta como en casa mientras recibe un servicio de primera calidad."
  },
  gallery: [
    "/images/client/gallery/1.jpg",
    "/images/client/gallery/2.jpg",
    "/images/client/gallery/3.jpg",
    "/images/client/gallery/4.jpg"
  ],
  testimonials: [
    { name: "Juan Pérez", comment: "Excelente servicio, muy profesional.", rating: 5 },
    { name: "María García", comment: "Gran atención al detalle.", rating: 5 }
  ],
  faq: [
    { question: "¿Necesito cita previa?", answer: "Sí, recomendamos reservar con antelación." },
    { question: "¿Aceptan tarjeta?", answer: "Sí, aceptamos todas las tarjetas." }
  ],
  seo: {
    titleTemplate: "%s | Barbería Tradición",
    defaultTitle: "Barbería Tradición - Barbería clásica en Madrid",
    defaultDescription: "Ofrecemos los mejores cortes de pelo y afeitados tradicionales en Madrid. Reserva tu cita online.",
    lang: "es",
    siteUrl: "https://barberiatradicion.com",
    ogImage: "/images/client/og-image.jpg"
  },
  integrations: {
    formspreeId: "your-id",
    useNetlifyForms: true
  }
};
