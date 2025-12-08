/* ========================================
   PITCH SITE TEMPLATE - JAVASCRIPT
   ======================================== */

// ========================================
// МОБИЛЬНОЕ МЕНЮ
// ========================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ========================================
// ПЛАВНАЯ ПРОКРУТКА
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80; // Высота навбара
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// АКТИВНОЕ СОСТОЯНИЕ НАВИГАЦИИ
// ========================================
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Изменение фона навбара при прокрутке
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
    }
});

// ========================================
// МОДАЛЬНОЕ ОКНО ДЛЯ ИЗОБРАЖЕНИЙ
// ========================================
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.modal-close');

// Открытие модального окна при клике на изображение
document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', function() {
        modal.style.display = 'block';
        modalImg.src = this.src;
        const caption = this.nextElementSibling;
        if (caption && caption.classList.contains('gallery-caption')) {
            modalCaption.textContent = caption.textContent;
        }
    });
});

// Закрытие модального окна
closeModal?.addEventListener('click', () => {
    modal.style.display = 'none';
});

modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// ========================================
// АНИМАЦИЯ ПРИ СКРОЛЛЕ
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

// Применение анимации к элементам
const animateElements = document.querySelectorAll(
    '.character-card, .emotion-card, .production-card, .location-card, .accent-item'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ========================================
// ПАРАЛЛАКС ЭФФЕКТ ДЛЯ HERO
// ========================================
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.backgroundPositionY = parallax + 'px';
    }
});

// ========================================
// ЛЕНИВАЯ ЗАГРУЗКА ИЗОБРАЖЕНИЙ
// ========================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ========================================
// СЛАЙДЕР ЛОКАЦИЙ
// ========================================

/*
 * НАСТРОЙКА СЛАЙДЕРОВ
 * Добавьте свои локации по примеру ниже:
 */
const locationSliders = {
    // Пример:
    // location1: {
    //     title: 'Название локации',
    //     images: [
    //         'images/location1/1.jpg',
    //         'images/location1/2.jpg',
    //         'images/location1/3.jpg'
    //     ]
    // },
    // location2: {
    //     title: 'Другая локация',
    //     images: [
    //         'images/location2/1.jpg',
    //         'images/location2/2.jpg'
    //     ]
    // }
};

let currentLocationSlideIndex = 1;
let currentLocationKey = null;
const locationModal = document.getElementById('locationModal');
const locationImage = document.getElementById('locationImage');
const locationTitle = document.getElementById('locationTitle');
const currentLocationSlideEl = document.getElementById('currentLocationSlide');
const totalLocationSlidesEl = document.getElementById('totalLocationSlides');

function openLocationSlider(key) {
    if (!locationSliders[key]) {
        console.warn(`Слайдер "${key}" не найден. Добавьте его в locationSliders.`);
        return;
    }
    currentLocationKey = key;
    currentLocationSlideIndex = 1;
    locationTitle.textContent = locationSliders[key].title;
    totalLocationSlidesEl.textContent = locationSliders[key].images.length;
    updateLocationSlide();
    locationModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeLocationSlider() {
    locationModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeLocationSlide(direction) {
    if (!currentLocationKey) return;
    const total = locationSliders[currentLocationKey].images.length;
    currentLocationSlideIndex += direction;
    if (currentLocationSlideIndex > total) currentLocationSlideIndex = 1;
    if (currentLocationSlideIndex < 1) currentLocationSlideIndex = total;
    updateLocationSlide();
}

function updateLocationSlide() {
    if (!currentLocationKey) return;
    locationImage.src = locationSliders[currentLocationKey].images[currentLocationSlideIndex - 1];
    currentLocationSlideEl.textContent = currentLocationSlideIndex;
}

// Закрытие по клику вне слайдера
locationModal?.addEventListener('click', (e) => {
    if (e.target === locationModal) {
        closeLocationSlider();
    }
});

// Навигация клавишами
document.addEventListener('keydown', (e) => {
    if (locationModal?.style.display === 'block') {
        if (e.key === 'ArrowRight') changeLocationSlide(1);
        if (e.key === 'ArrowLeft') changeLocationSlide(-1);
        if (e.key === 'Escape') closeLocationSlider();
    }
});

// ========================================
// МОДАЛЬНОЕ ОКНО ДЛЯ ВИДЕО (YouTube)
// ========================================

/*
 * НАСТРОЙКА ВИДЕО
 * Добавьте свои видео по примеру ниже:
 */
const videos = {
    // Пример:
    // video1: {
    //     title: 'Название видео',
    //     url: 'https://www.youtube.com/embed/VIDEO_ID'
    // },
    // audition_actor1: {
    //     title: 'Пробы — Актёр 1',
    //     url: 'https://www.youtube.com/embed/VIDEO_ID'
    // }
};

// Для модального окна видео добавьте в HTML:
// <div id="videoModal" class="audition-modal">
//     <div class="audition-modal-content">
//         <span class="audition-close" onclick="closeVideo()">&times;</span>
//         <h3 id="videoTitle" class="audition-title">Видео</h3>
//         <div class="audition-video-container">
//             <iframe id="videoFrame" src="" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
//         </div>
//     </div>
// </div>

const videoModal = document.getElementById('videoModal');
const videoFrame = document.getElementById('videoFrame');
const videoTitle = document.getElementById('videoTitle');

function openVideo(key) {
    if (!videos[key]) {
        console.warn(`Видео "${key}" не найдено. Добавьте его в videos.`);
        return;
    }
    if (!videoModal) {
        console.warn('Модальное окно видео не найдено в HTML.');
        return;
    }

    videoTitle.textContent = videos[key].title;
    videoFrame.src = videos[key].url + '?autoplay=1';
    videoModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    if (!videoModal) return;
    videoModal.style.display = 'none';
    videoFrame.src = ''; // Останавливаем видео
    document.body.style.overflow = 'auto';
}

// Закрытие по клику вне видео
videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        closeVideo();
    }
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (videoModal?.style.display === 'block' && e.key === 'Escape') {
        closeVideo();
    }
});

// ========================================
// ИНИЦИАЛИЗАЦИЯ
// ========================================
console.log('Pitch site loaded successfully!');
