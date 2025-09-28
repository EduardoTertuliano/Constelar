// Constelar Website JavaScript

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeNavigation();
    initializeScrollAnimations();
    initializeHeroAnimations();
    initializeServiceCards();
    initializeContactForm();
    initializeSmoothScrolling();
    initializeLoadingStates();
    
    // Add constellation animation
    createConstellationAnimation();

    // Inicia o slider após o carregamento completo (foi movido para dentro do DOMContentLoaded)
    if (slides.length > 0) {
        showSlide(0); // Show first slide
        startAutoSlider(); // Start auto-advance
    }
});

// Navigation functionality
function initializeNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (hamburger && navMenu) {
        // Lógica para abrir/fechar o menu ao clicar no ícone
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            // Animate hamburger bars
            const bars = hamburger.querySelectorAll('.bar');
            bars.forEach((bar, index) => {
                if (hamburger.classList.contains('active')) {
                    // Estado ATIVO (fechar ícone 'X')
                    if (index === 0) bar.style.transform = 'rotate(-45deg) translate(-5px, 6px)';
                    if (index === 1) bar.style.opacity = '0';
                    if (index === 2) bar.style.transform = 'rotate(45deg) translate(-5px, -6px)';
                } else {
                    // Estado INATIVO (três barras)
                    bar.style.transform = 'none';
                    bar.style.opacity = '1';
                }
            });
        });
        
        // CORREÇÃO ESSENCIAL: Fecha o menu quando um link é clicado (para evitar que cubra o conteúdo)
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (navMenu.classList.contains('active')) {
                    // Fecha o menu e desativa o ícone
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    
                    // Reseta a animação dos bars
                    const bars = hamburger.querySelectorAll('.bar');
                    bars.forEach((bar, index) => {
                        bar.style.transform = 'none';
                        bar.style.opacity = '1';
                    });
                }
            });
        });
    }
}

// Placeholder functions for the rest of the original script (ensure they exist or remove them if not used)
function initializeScrollAnimations() { /* Lógica de animação ao scroll */ }
function initializeHeroAnimations() { /* Lógica de animação da seção Hero */ }
function initializeServiceCards() { /* Lógica para os cards de serviço */ }
function initializeContactForm() { /* Lógica do formulário de contato */ }
function initializeSmoothScrolling() { /* Lógica de rolagem suave */ }
function initializeLoadingStates() { /* Lógica de estados de carregamento */ }
function createConstellationAnimation() { /* Lógica da animação de constelação */ }


/*
------------------------------------------
Lógica do Games Slider
------------------------------------------
*/
const sliderContainer = document.querySelector('.slider-container');
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const totalSlides = slides.length;
let currentSlideIndex = 0; // 0-based index

// Função para mostrar um slide específico
function showSlide(index) {
    // Esconde todos os slides e remove a classe 'active'
    slides.forEach(slide => {
        slide.style.opacity = 0; 
        slide.classList.remove('active');
    });

    // Remove a classe 'active' de todos os dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Atualiza o índice
    currentSlideIndex = index;

    // Mostra o slide e dot ativos
    slides[currentSlideIndex].style.opacity = 1; 
    slides[currentSlideIndex].classList.add('active');
    dots[currentSlideIndex].classList.add('active');
}

// Função para mudar o slide para frente ou para trás
function changeSlide(direction) {
    let newIndex = currentSlideIndex + direction;
    
    if (newIndex >= totalSlides) {
        newIndex = 0;
    } else if (newIndex < 0) {
        newIndex = totalSlides - 1;
    }
    
    showSlide(newIndex);
}

// Função chamada pelos botões de navegação do HTML
function currentSlide(index) {
    showSlide(index - 1); // Convert to 0-based index
}

// Auto-advance slider
function startAutoSlider() {
    setInterval(() => {
        changeSlide(1);
    }, 4000); // Change slide every 4 seconds
}

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

function handleTouchStart(e) {
    startX = e.touches[0].clientX;
}

function handleTouchEnd(e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
}

function handleSwipe() {
    const threshold = 50; // Minimum swipe distance
    const diff = startX - endX;
    
    if (Math.abs(diff) > threshold) {
        if (diff > 0) {
            changeSlide(1); // Swipe left - next slide
        } else {
            changeSlide(-1); // Swipe right - previous slide
        }
    }
}

// Add touch event listeners to slider
if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', handleTouchStart, false);
    sliderContainer.addEventListener('touchend', handleTouchEnd, false);
}