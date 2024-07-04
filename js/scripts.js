document.addEventListener('DOMContentLoaded', function() {
    const dots = document.querySelectorAll('.dots .dot');
    const slides = document.querySelectorAll('#slider figure header');
    const figure = document.querySelector('#slider figure');

    let touchStartX = 0;
    let touchEndX = 0;

    function handleTouchStart(event) {
        touchStartX = event.touches[0].clientX;
    }

    function handleTouchMove(event) {
        touchEndX = event.touches[0].clientX;
    }

    function handleTouchEnd() {
        if (touchStartX - touchEndX > 50) {
            // Swiped left, move to the next slide
            currentIndex = (currentIndex + 1) % slides.length;
        } else if (touchEndX - touchStartX > 50) {
            // Swiped right, move to the previous slide
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        }

        updateSliderPosition(currentIndex);
        updateActiveDot(currentIndex);
    }

    figure.addEventListener('touchstart', handleTouchStart, false);
    figure.addEventListener('touchmove', handleTouchMove, false);
    figure.addEventListener('touchend', handleTouchEnd, false);

    function updateSliderPosition(index) {
        const slideWidth = slides[0].clientWidth;
        figure.style.left = `-${index * slideWidth}px`;
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            // Remove active class from all dots
            dots.forEach(d => d.classList.remove('active'));
            // Add active class to the clicked dot
            dot.classList.add('active');
            // Move the slider to the corresponding slide
            currentIndex = index;
            updateSliderPosition(currentIndex);
        });
    });

    function updateActiveDot(index) {
        // Remove active class from all dots
        dots.forEach(dot => dot.classList.remove('active'));
        // Add active class to the corresponding dot
        dots[index].classList.add('active');
    }

    let currentIndex = 0;
    setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSliderPosition(currentIndex);
        updateActiveDot(currentIndex);
    }, 5000); // Change slide every 5 seconds

    window.addEventListener('resize', () => {
        updateSliderPosition(currentIndex);
    });
});


window.addEventListener('DOMContentLoaded', event => {

    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});
