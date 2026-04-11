// ===========================
// NEWS CAROUSEL - app_carousel.js
// ===========================

document.addEventListener('DOMContentLoaded', function () {
    const carouselInner = document.getElementById('carousel-inner');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');

    if (!carouselInner || !prevBtn || !nextBtn) return;

    const cards = Array.from(carouselInner.querySelectorAll('.news_card'));
    if (cards.length === 0) return;

    let currentIndex = 0;
    let cardsPerView = getCardsPerView();
    let autoplayTimer = null;
    let isAnimating = false;

    function getCardsPerView() {
        if (window.innerWidth >= 992) return 2;
        return 1;
    }

    function getMaxIndex() {
        return Math.max(0, cards.length - cardsPerView);
    }

    function updateCarousel(animate = true) {
        if (isAnimating && animate) return;
        isAnimating = true;

        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(cards[0]).marginRight || 0);
        const offset = -currentIndex * cardWidth;

        carouselInner.style.transition = animate ? 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none';
        carouselInner.style.transform = `translateX(${offset}px)`;

        // Update button states
        prevBtn.style.opacity = currentIndex === 0 ? '0.4' : '1';
        prevBtn.style.cursor = currentIndex === 0 ? 'not-allowed' : 'pointer';
        nextBtn.style.opacity = currentIndex >= getMaxIndex() ? '0.4' : '1';
        nextBtn.style.cursor = currentIndex >= getMaxIndex() ? 'not-allowed' : 'pointer';

        // Update dots
        updateDots();

        setTimeout(() => { isAnimating = false; }, 450);
    }

    function goNext() {
        if (currentIndex < getMaxIndex()) {
            currentIndex++;
        } else {
            currentIndex = 0; // loop back
        }
        updateCarousel();
    }

    function goPrev() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = getMaxIndex(); // loop to end
        }
        updateCarousel();
    }

    // Dots indicator
    function createDots() {
        const existing = document.querySelector('.carousel-dots');
        if (existing) existing.remove();

        const dotsWrapper = document.createElement('div');
        dotsWrapper.className = 'carousel-dots';

        const totalDots = getMaxIndex() + 1;
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('span');
            dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
                resetAutoplay();
            });
            dotsWrapper.appendChild(dot);
        }

        const carousel = document.getElementById('carousel');
        if (carousel) carousel.appendChild(dotsWrapper);
    }

    function updateDots() {
        const dots = document.querySelectorAll('.carousel-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }

    // Autoplay
    function startAutoplay() {
        autoplayTimer = setInterval(() => { goNext(); }, 4000);
    }

    function resetAutoplay() {
        clearInterval(autoplayTimer);
        startAutoplay();
    }

    // Buttons
    nextBtn.addEventListener('click', () => { goNext(); resetAutoplay(); });
    prevBtn.addEventListener('click', () => { goPrev(); resetAutoplay(); });

    // Pause on hover
    const carouselEl = document.getElementById('carousel');
    if (carouselEl) {
        carouselEl.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
        carouselEl.addEventListener('mouseleave', () => startAutoplay());
    }

    // Touch/swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    carouselInner.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
    carouselInner.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goNext(); else goPrev();
            resetAutoplay();
        }
    });

    // Responsive
    window.addEventListener('resize', () => {
        const newCPV = getCardsPerView();
        if (newCPV !== cardsPerView) {
            cardsPerView = newCPV;
            currentIndex = Math.min(currentIndex, getMaxIndex());
            createDots();
            updateCarousel(false);
        }
    });

    // Init
    carouselInner.style.display = 'flex';
    carouselInner.style.transition = 'transform 0.45s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    createDots();
    updateCarousel(false);
    startAutoplay();
});