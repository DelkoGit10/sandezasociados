# Sandez & Asociados - Estudio Jurídico

Sitio web profesional para el estudio jurídico Sandez & Asociados, ubicado en Corrientes Capital.

## 📋 Características

- **Diseño Responsivo**: Adaptable a todos los dispositivos (móviles, tablets, escritorio)
- **Colores Corporativos**: Dorado (#D4AF37) y blanco como colores principales
- **Secciones Principales**:
  - Hero con presentación del estudio
  - Información sobre la Dra. Norma Beatriz Sandez y el estudio
  - 8 áreas de práctica legal detalladas
  - Sistema de reserva de citas (presencial y virtual)
  - Mapa de ubicación integrado
  - Información de contacto completa

## 🎨 Áreas de Práctica

1. Derecho de Familia
2. Derecho Laboral
3. Accidentes de Tránsito
4. Derecho Inmobiliario
5. Derecho Civil
6. Derecho Comercial
7. Derecho Penal
8. Derecho Sucesorio

## 🚀 Cómo usar

### Opción 1: Abrir directamente
1. Descarga todos los archivos (index.html, styles.css, script.js)
2. Abre `index.html` en tu navegador web preferido

### Opción 2: Servidor local
Para una mejor experiencia (especialmente con el mapa):

**Python:**
```bash
python -m http.server 8000
```

**Node.js:**
```bash
npx serve
```

Luego abre `http://localhost:8000` en tu navegador.

## 📱 Funcionalidades

### Navegación
- Menú fijo en la parte superior
- Menú hamburguesa para dispositivos móviles
- Scroll suave entre secciones
- Indicador de sección activa

### Formulario de Citas
- Validación de campos en tiempo real
- Selección de tipo de cita (presencial o virtual)
- Selección de área legal
- Selección de fecha y hora
- Notificaciones de éxito/error
- Previene selección de fechas pasadas

### Animaciones
- Efectos de entrada para elementos
- Hover effects en tarjetas y botones
- Transiciones suaves
- Botón de scroll to top

## 🎨 Personalización

### Colores
Los colores principales se definen en `styles.css` usando variables CSS:

```css
:root {
    --gold: #D4AF37;
    --gold-dark: #B8962E;
    --gold-light: #E5C158;
    --white: #FFFFFF;
    /* ... más colores */
}
```

### Tipografía
- **Títulos**: Playfair Display (serif)
- **Texto**: Lato (sans-serif)

### Contenido
Para modificar el contenido, edita el archivo `index.html`:
- Servicios: Sección `.services`
- Información de contacto: Sección `.appointment` y `.footer`
- Horarios: En la sección de info-cards

## 📍 Ubicación

**Dirección**: Ñaembe 2850, Corrientes Capital, Corrientes

El mapa está integrado con Google Maps. Para personalizarlo con coordenadas exactas:
1. Busca la dirección en Google Maps
2. Obtén el código de inserción (embed)
3. Reemplaza el iframe en la sección `.map-container`

## 📞 Información de Contacto

Para actualizar la información de contacto:
1. Modifica los números de teléfono en `index.html`
2. Actualiza el email
3. Cambia los horarios de atención según sea necesario

## 🌐 Redes Sociales

Los enlaces a redes sociales están en el footer. Agrega tus URLs reales:
- Facebook
- Instagram
- LinkedIn
- WhatsApp

## 📝 Notas Importantes

### Formulario de Contacto
El formulario actualmente muestra notificaciones en el navegador y registra los datos en la consola. Para un entorno de producción:

1. **Backend necesario**: Implementa un servidor para procesar los envíos
2. **Opciones sugeridas**:
   - PHP con PHPMailer
   - Node.js con Nodemailer
   - Servicios como FormSpree, EmailJS o SendGrid
   - Integración con un CRM

### Mapa
El mapa actual usa coordenadas genéricas de Corrientes. Actualiza con la ubicación exacta de Ñaembe 2850.

## 🔧 Compatibilidad

- ✅ Chrome (últimas 2 versiones)
- ✅ Firefox (últimas 2 versiones)
- ✅ Safari (últimas 2 versiones)
- ✅ Edge (últimas 2 versiones)
- ✅ Dispositivos móviles iOS y Android

## 📦 Dependencias Externas

El sitio utiliza CDNs para:
- **Google Fonts**: Playfair Display y Lato
- **Font Awesome 6.4.0**: Iconos
- **Google Maps**: Mapa de ubicación

Estas librerías se cargan desde CDN, por lo que requieren conexión a internet.

## 🎯 Mejoras Futuras Sugeridas

- [ ] Implementar backend para el formulario de contacto
- [ ] Agregar galería de fotos del estudio
- [ ] Sistema de testimonios de clientes
- [ ] Blog de artículos legales
- [ ] Chat en vivo o WhatsApp Business
- [ ] Sistema de gestión de citas con calendario
- [ ] Versión en inglés
- [ ] SEO optimizado
- [ ] Analytics (Google Analytics)
- [ ] Certificado SSL para producción

## 📄 Estructura de Archivos

```
sandez-y-asociados/
│
├── index.html          # Página principal
├── styles.css          # Estilos CSS
├── script.js           # Funcionalidades JavaScript
└── README.md           # Este archivo
```

## 💼 Licencia y Uso

Este sitio web ha sido desarrollado específicamente para Sandez & Asociados.

---

**Desarrollado con dedicación para brindar una experiencia profesional y moderna.**

Para consultas o soporte técnico, contactar al desarrollador web.


