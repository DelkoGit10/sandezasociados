// ========================================
// Navigation & Mobile Menu
// ========================================
const navbar = document.getElementById('navbar');
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const navLinks = document.getElementById('nav-links');

// Mobile menu toggle
mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Navbar scroll effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ========================================
// Smooth Scrolling for Navigation Links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll to Top Button
// ========================================
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================================
// EmailJS Configuration
// ========================================
// Tus credenciales de EmailJS
const EMAILJS_PUBLIC_KEY = '8GVGsyP4DDiea3uPB';
const EMAILJS_SERVICE_ID = 'service_opkfqbq';
const EMAILJS_TEMPLATE_ID = 'template_n77e6jl';

// Inicializar EmailJS
emailjs.init(EMAILJS_PUBLIC_KEY);

// ========================================
// Appointment Form Handling
// ========================================
const appointmentForm = document.getElementById('appointment-form');

appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const formData = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value,
        tipoCita: document.getElementById('tipo-cita').value,
        fecha: document.getElementById('fecha').value,
        hora: document.getElementById('hora').value,
        mensaje: document.getElementById('mensaje').value
    };
    
    // Validate form
    if (!validateForm(formData)) {
        return;
    }
    
    // Show loading state
    const submitButton = appointmentForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Procesando...';
    
    // Check if it's a virtual consultation
    if (formData.tipoCita === 'virtual') {
        // For virtual consultations: Save data and redirect to payment first
        // Email will be sent AFTER successful payment
        localStorage.setItem('pendingAppointment', JSON.stringify(formData));
        
        // Show payment notification
        showNotification('Redirigiendo a pago', 'Ahora será redirigido a Mercado Pago para completar el pago de su consulta virtual.', 'success');
        
        // Redirect to Mercado Pago payment link after 1.5 seconds
        setTimeout(() => {
            window.location.href = 'https://mpago.la/2mHVpDf';
        }, 1500);
    } else {
        // For presential appointments: Send email immediately
        const tipoCitaTexto = 'Presencial en el estudio';
        
        const templateParams = {
            to_email: 'delkosandezz@gmail.com',
            from_name: formData.nombre,
            from_email: formData.email,
            telefono: formData.telefono,
            tipo_cita: tipoCitaTexto,
            fecha: formData.fecha,
            hora: formData.hora,
            mensaje: formData.mensaje
        };
        
        // Send email using EmailJS
        emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
            .then(function(response) {
                console.log('✅ Email enviado exitosamente!', response.status, response.text);
                
                // Show success message
                showNotification('¡Solicitud enviada con éxito!', 'Su cita ha sido registrada. Nos pondremos en contacto con usted dentro de las 24 horas para confirmar. Gracias por confiar en Sandez & Asociados.', 'success');
                
                // Redirect to thank you page after 2 seconds
                setTimeout(() => {
                    window.location.href = 'gracias.html';
                }, 2000);
                
                // Reset form
                appointmentForm.reset();
            }, function(error) {
                console.error('❌ Error al enviar email:', error);
                
                // Show error message
                showNotification('Error al enviar', 'Hubo un problema al enviar su solicitud. Por favor, intente nuevamente o contáctenos por teléfono.', 'error');
                
                // Restore button
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            });
    }
});

// Form validation
function validateForm(data) {
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Error', 'Por favor ingrese un email válido.', 'error');
        return false;
    }
    
    // Phone validation (simple)
    if (!data.telefono || data.telefono.length < 8) {
        showNotification('Error', 'Por favor ingrese un teléfono válido.', 'error');
        return false;
    }
    
    // Date validation (must be in the future)
    const selectedDate = new Date(data.fecha);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
        showNotification('Error', 'Por favor seleccione una fecha futura.', 'error');
        return false;
    }
    
    return true;
}

// Notification system
function showNotification(title, message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <div class="notification-icon">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            </div>
            <div class="notification-text">
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Add styles if not already added
    if (!document.getElementById('notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: white;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                z-index: 10000;
                max-width: 400px;
                animation: slideInRight 0.5s ease;
            }
            
            @keyframes slideInRight {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
            
            .notification-content {
                display: flex;
                gap: 15px;
                align-items: start;
            }
            
            .notification-icon {
                font-size: 1.5rem;
                flex-shrink: 0;
            }
            
            .notification-success .notification-icon {
                color: #4CAF50;
            }
            
            .notification-error .notification-icon {
                color: #f44336;
            }
            
            .notification-text h4 {
                margin: 0 0 5px 0;
                font-size: 1.125rem;
                color: #333;
            }
            
            .notification-text p {
                margin: 0;
                font-size: 0.95rem;
                color: #666;
                line-height: 1.5;
            }
            
            .notification-close {
                background: none;
                border: none;
                font-size: 1.25rem;
                color: #999;
                cursor: pointer;
                padding: 0;
                margin-left: auto;
                flex-shrink: 0;
            }
            
            .notification-close:hover {
                color: #333;
            }
            
            @media (max-width: 768px) {
                .notification {
                    left: 20px;
                    right: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(styles);
    }
    
    // Add to page
    document.body.appendChild(notification);
    
    // Close button functionality
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    });
    
    // Auto remove after 8 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOutRight 0.5s ease';
            setTimeout(() => notification.remove(), 500);
        }
    }, 8000);
}

// Add slideOutRight animation
const slideOutStyle = document.createElement('style');
slideOutStyle.textContent = `
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(slideOutStyle);

// ========================================
// Set minimum date for appointment form
// ========================================
const dateInput = document.getElementById('fecha');
const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const minDate = tomorrow.toISOString().split('T')[0];
dateInput.setAttribute('min', minDate);

// ========================================
// Scroll animations for elements
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .info-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ========================================
// Active navigation link on scroll
// ========================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// Add active state styling
const activeNavStyle = document.createElement('style');
activeNavStyle.textContent = `
    .nav-links a.active {
        color: var(--gold) !important;
    }
    
    .nav-links a.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(activeNavStyle);

// ========================================
// Console welcome message
// ========================================
console.log('%c🏛️ Sandez & Asociados', 'font-size: 20px; font-weight: bold; color: #D4AF37;');
console.log('%cEstudio Jurídico de Excelencia', 'font-size: 14px; color: #666;');
console.log('%cDesarrollado con dedicación para brindar la mejor experiencia a nuestros clientes.', 'font-size: 12px; color: #999;');

/*
========================================
INSTRUCCIONES PARA CONFIGURAR EMAILJS
========================================

Para que el formulario de contacto envíe emails a delkosandezz@gmail.com, 
sigue estos pasos:

PASO 1: Crear cuenta en EmailJS
--------------------------------
1. Ve a: https://www.emailjs.com/
2. Haz clic en "Sign Up" (Registrarse)
3. Crea una cuenta gratuita (permite 200 emails/mes gratis)

PASO 2: Configurar servicio de email
------------------------------------
1. Una vez dentro, ve a "Email Services"
2. Haz clic en "Add New Service"
3. Selecciona Gmail
4. Conecta tu cuenta de Gmail (delkosandezz@gmail.com)
5. Copia el SERVICE ID que aparece (ejemplo: "service_abc1234")

PASO 3: Crear plantilla de email
---------------------------------
1. Ve a "Email Templates"
2. Haz clic en "Create New Template"
3. Usa este contenido para la plantilla:

   Subject (Asunto):
   Nueva Solicitud de Cita - {{from_name}}

   Content (Contenido):
   Nueva solicitud de cita recibida:

   Nombre: {{from_name}}
   Email: {{from_email}}
   Teléfono: {{telefono}}
   Tipo de Cita: {{tipo_cita}}
   Tema: {{tema}}
   Fecha solicitada: {{fecha}}
   Hora solicitada: {{hora}}

   Mensaje:
   {{mensaje}}

   ---
   Email recibido desde el sitio web de Sandez & Asociados

4. En "To Email" pon: {{to_email}}
5. Guarda el template y copia el TEMPLATE ID (ejemplo: "template_xyz5678")

PASO 4: Obtener tu Public Key
------------------------------
1. Ve a "Account" en el menú
2. Copia tu PUBLIC KEY (ejemplo: "abcdefg12345678")

PASO 5: Actualizar el código
-----------------------------
Reemplaza las siguientes líneas al inicio de este archivo (líneas 79-81):

const EMAILJS_PUBLIC_KEY = 'TU_PUBLIC_KEY'; 
const EMAILJS_SERVICE_ID = 'TU_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'TU_TEMPLATE_ID';

Por tus valores reales:

const EMAILJS_PUBLIC_KEY = 'tu_public_key_real'; 
const EMAILJS_SERVICE_ID = 'tu_service_id_real';
const EMAILJS_TEMPLATE_ID = 'tu_template_id_real';

PASO 6: ¡Listo!
---------------
Guarda el archivo y recarga la página. Ahora cuando alguien envíe el formulario,
recibirás un email en delkosandezz@gmail.com con toda la información.

NOTAS IMPORTANTES:
- El plan gratuito permite 200 emails al mes
- Los emails pueden tardar 1-2 minutos en llegar
- Revisa la carpeta de spam si no ves los emails
- Puedes personalizar la plantilla de email como quieras

¿Necesitas ayuda? Visita: https://www.emailjs.com/docs/

========================================
*/


