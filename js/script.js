document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // 1. Funcionalidade do Menu Hambúrguer (Mobile Navigation)
    // ------------------------------------------------------------------
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Função para alternar o menu
    const toggleMenu = () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    };

    hamburger.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em um link de navegação (para mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // ------------------------------------------------------------------
    // 2. Funcionalidade do Slider de Jogos (Games Slider)
    // ------------------------------------------------------------------
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    const showSlide = (n) => {
        // Encontra o novo índice, garantindo que ele circule
        if (n >= slides.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = n;
        }

        // Remove a classe 'active' de todos os slides e dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Adiciona a classe 'active' ao slide e dot atual
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    };

    // Navegação por botões (‹ e ›)
    window.changeSlide = (n) => {
        showSlide(currentSlide + n);
    };

    // Navegação por dots
    window.currentSlide = (n) => {
        showSlide(n - 1); // Subtrai 1 pois o array começa em 0
    };

    // Inicia o slider
    if (slides.length > 0) {
        showSlide(currentSlide);

        // Adiciona funcionalidade de auto-avanço a cada 5 segundos
        setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
});

// Adicionando um listener para animações de scroll
document.addEventListener('scroll', () => {
    document.querySelectorAll('.scroll-animate').forEach(element => {
        // Verifica se o elemento está na viewport
        if (element.getBoundingClientRect().top < window.innerHeight - 100) {
            element.classList.add('animate');
        }
    });
});