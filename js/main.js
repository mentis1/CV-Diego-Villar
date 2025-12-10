// Animación al hacer scroll con mejor rendimiento y soporte móvil
document.addEventListener('DOMContentLoaded', () => {
    // Configurar las secciones inicialmente
    const sections = document.querySelectorAll('.section');
    sections.forEach((sec) => {
        sec.style.opacity = 0;
        sec.style.transform = "translateY(20px)";
    });
    
    // Función para comprobar visibilidad con IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
                // Una vez animado, dejamos de observar
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null, // viewport
        threshold: 0.1, // 10% visible
        rootMargin: '-20px'
    });
    
    // Observar todas las secciones
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Verificar disponibilidad del CV
    const cvButton = document.querySelector('.btn[download]');
    if (cvButton) {
        cvButton.addEventListener('click', (e) => {
            // Verificar disponibilidad en producción
            if (!navigator.onLine) {
                e.preventDefault();
                alert('Parece que no tienes conexión a internet. Por favor, intenta más tarde o contacta con Diego directamente.');
                return;
            }
            
            fetch(cvButton.href, { method: 'HEAD' })
                .then(response => {
                    if (!response.ok) {
                        e.preventDefault();
                        alert('El CV aún no está disponible. Por favor, contacta con Diego para obtenerlo.');
                    }
                })
                .catch(() => {
                    // Permitir que el evento continúe - el navegador manejará errores 404
                });
        });
    }
    
    // Mejorar carga en dispositivos móviles
    if ('ontouchstart' in window) {
        document.body.classList.add('mobile-device');
        
        // Optimizar eventos táctiles para móviles
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
    }
});