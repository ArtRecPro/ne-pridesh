// Мобильное меню
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

// Плавная прокрутка
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const targetPosition = target.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Активное состояние навигации при прокрутке
const sections = document.querySelectorAll('.section, .hero');
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
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

// Модальное окно для галереи
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
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрытие модального окна при клике вне изображения
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Закрытие модального окна клавишей Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// Анимация появления элементов при прокрутке
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
    '.about-item, .video-item, .creative-item, .actor-item, .gallery-item, .contact-item'
);

animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// Кнопка CTA - прокрутка к видео
const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', () => {
        const videoSection = document.getElementById('video');
        if (videoSection) {
            const offset = 80;
            const targetPosition = videoSection.offsetTop - offset;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// Параллакс эффект для hero секции
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.backgroundPositionY = parallax + 'px';
    }
});

// Ленивая загрузка изображений
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

// Слайдер раскадровки
let currentSlideIndex = 1;
const totalSlides = 18;
const storyboardModal = document.getElementById('storyboardModal');
const storyboardImage = document.getElementById('storyboardImage');
const currentSlideEl = document.getElementById('currentSlide');

function openStoryboard() {
    storyboardModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    currentSlideIndex = 1;
    updateSlide();
}

function closeStoryboard() {
    storyboardModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex > totalSlides) currentSlideIndex = 1;
    if (currentSlideIndex < 1) currentSlideIndex = totalSlides;
    updateSlide();
}

function updateSlide() {
    const slideNumber = String(currentSlideIndex).padStart(4, '0');
    storyboardImage.src = `images/storyboard/Раскадровка_page-${slideNumber}.jpg`;
    currentSlideEl.textContent = currentSlideIndex;
}

// Закрытие по клику вне слайдера
storyboardModal?.addEventListener('click', (e) => {
    if (e.target === storyboardModal) {
        closeStoryboard();
    }
});

// Навигация клавишами
document.addEventListener('keydown', (e) => {
    if (storyboardModal?.style.display === 'block') {
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'Escape') closeStoryboard();
    }
});

// Слайдер локаций
const locationSliders = {
    perehod: {
        title: 'Подземный переход',
        images: [
            'images/Переход/7202c5c6d948b99b8c964b4a2c447da1.jpg',
            'images/Переход/536aaed60d183b8c09a61bdbb449575d.jpg',
            'images/Переход/63e807e09e40fc75a3ff44f83ab8fba1.jpg',
            'images/Переход/6c02b17e8a24e36a03765187ef8e5ca5.jpg',
            'images/Переход/b514efb2e7fab187dabdf56c5b00251b.jpg',
            'images/Переход/ea55b542d9162e61be23c7e250c5b0b7.jpg',
            'images/Переход/f698188e3a1bfcec6c53b8ed45c88c8e.jpg'
        ]
    },
    jaguar: {
        title: 'Машина (Jaguar XJ)',
        images: [
            'images/jaguar xj/c3321380b96c72738ba94f7732d772ef.jpg',
            'images/jaguar xj/5772081cfe313772a2682d12e6f92d1f.jpg'
        ]
    },
    kvartira: {
        title: 'Квартира Саши',
        images: [
            'images/квартира/a36669e38a8320dfbabc64168e9a5e51.jpg',
            'images/квартира/61b1741a3a907083474ec33fac0c5333.jpg',
            'images/квартира/02379b5c51c21db56db86b090865700c.jpg',
            'images/квартира/17304bc05ffe08214bb07c501e7df1d3.jpg',
            'images/квартира/0ee2262d0b0c35a1fad7073883edbc0b.jpg',
            'images/квартира/9345cd652484984f6055d64057c5c9a9.jpg',
            'images/квартира/29e39533cf06e2934df3caba053bf432.jpg',
            'images/квартира/941c5076956791787267c04cebdf700b.jpg',
            'images/квартира/cd314dde77b38b1b68f27e5ec3665f87.jpg',
            'images/квартира/614b918352e2304c07d875c369e2e86c.jpg',
            'images/квартира/80c968f17b78e6a66830dbb540548b67.jpg',
            'images/квартира/f9872c447f519cdaa06ae8ed684b62fb.jpg',
            'images/квартира/10333b41348d18b50a7ff657ea442914.jpg',
            'images/квартира/92c8e5891cd9d11b42c849a05263d576.jpg',
            'images/квартира/38f20267023cee70459a878310bbe978.jpg',
            'images/квартира/6b195b2b783edf28ab21d435fb2c9e2c.jpg',
            'images/квартира/a0e60b4f49dc75ceb8e12777a2ff50d2.jpg',
            'images/квартира/9d90d95a3ba2e5d47bb9a0fa5e08bf08.jpg'
        ]
    },
    nii: {
        title: 'НИИ',
        images: [
            'images/НИИ/1.jpg',
            'images/НИИ/2.jpg',
            'images/НИИ/3.jpg',
            'images/НИИ/4.jpg',
            'images/НИИ/5.jpg',
            'images/НИИ/6.jpg',
            'images/НИИ/7.jpg',
            'images/НИИ/8.jpg',
            'images/НИИ/9.jpg',
            'images/НИИ/10.jpg',
            'images/НИИ/11.jpg',
            'images/НИИ/12.jpg',
            'images/НИИ/14.jpg',
            'images/НИИ/15.jpg',
            'images/НИИ/16.jpg',
            'images/НИИ/17.jpg',
            'images/НИИ/18.jpg'
        ]
    },
    shkatulka: {
        title: 'Шкатулка',
        images: [
            'images/шкатулка/1a4586317acacca0a9eeb58368e62ca4.jpg',
            'images/шкатулка/1b66804504d948ea7eef6516382e7016.jpg',
            'images/шкатулка/1c94cc1b8744838cd0b0335aa135fb5d.jpg',
            'images/шкатулка/20c903806709e9f749ae28e440b0fb24.jpg',
            'images/шкатулка/d11ff2ca3a0af7cae97512b79301a6f2.jpg'
        ]
    },
    korobka: {
        title: 'Подарок для Кристины',
        images: [
            'images/коробка/71aca138e5367dddd4144269a1f19824.jpg',
            'images/коробка/3348cca7c61043178b2225f32544cf1a.jpg',
            'images/коробка/47b424f229e1d8d410741f1def69e88a.jpg',
            'images/коробка/9f94a1d1d79552593538daae89142de6.jpg',
            'images/коробка/ff0b700ca69ac9bd53a3b1b41de76adf.jpg'
        ]
    },
    sasha_costume: {
        title: 'Костюм Саши',
        images: [
            'images/Саша_костюм/1fcb12f032b6b9c7b3d66b5612d7bd91.jpg',
            'images/Саша_костюм/3453f13127eaa98d70154c83f794f22d.jpg',
            'images/Саша_костюм/41b7bb876b4a050a4c8fadca41be8347.jpg',
            'images/Саша_костюм/54395bcb5956e1dbc64cf56222281fb7.jpg',
            'images/Саша_костюм/5800fc6b34b8b8e832686bad2ab69079.jpg',
            'images/Саша_костюм/82d151b9049512470ab61301cf30c42f.jpg',
            'images/Саша_костюм/abf21a7f9a08ca5c10e99df8b4858c75.jpg',
            'images/Саша_костюм/af1cd61b837dca5d74f73af1fd706229.jpg',
            'images/Саша_костюм/be094f193f5e10c0e3985518f47c5f32.jpg',
            'images/Саша_костюм/fd87600fa2a47eec41e37c64967791da.jpg',
            'images/Саша_костюм/3ea9e696e7e361b4aa57bac9634a1768.jpg',
            'images/Саша_костюм/38eda483036f6e19e4f74ffad3c27c0e.jpg'
        ]
    },
    yura_costume: {
        title: 'Костюм Юры',
        images: [
            'images/Юра_костюм/0e65363f22b478b0f0f4f1fd7c7507e8.jpg',
            'images/Юра_костюм/071cd2ea6501d9851227a62e3b5c1064.jpg',
            'images/Юра_костюм/1499a6c719b05f019740d7d48fabf237.jpg',
            'images/Юра_костюм/1621f5c2b12a7d8d87b24c265731f1a2.jpg',
            'images/Юра_костюм/beff9ad23aad1b2ef94ac1749cba268b.jpg',
            'images/Юра_костюм/c8522aefb7031db9d5df01015be0894a.jpg'
        ]
    },
    kristina_costume: {
        title: 'Костюм Кристины',
        images: [
            'images/Кристина/aa5dd129c039c2d994359b0531409da2.jpg',
            'images/Кристина/7573466e421b9f6d845aac89a18bdf1b.jpg',
            'images/Кристина/cc18f4cffb5ee99186b76853b58ef844.jpg',
            'images/Кристина/f4625562dfc44cf74aa9922819c464b2.jpg',
            'images/Кристина/128d42c89859c8bd1992109b816c8478.jpg',
            'images/Кристина/2bbe0bedc7287d7153f3e8e759903e30.jpg'
        ]
    }
};

let currentLocationSlideIndex = 1;
let currentLocationKey = null;
const locationModal = document.getElementById('locationModal');
const locationImage = document.getElementById('locationImage');
const locationTitle = document.getElementById('locationTitle');
const currentLocationSlideEl = document.getElementById('currentLocationSlide');
const totalLocationSlidesEl = document.getElementById('totalLocationSlides');

function openLocationSlider(key) {
    if (!locationSliders[key]) return;
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

// Навигация клавишами для локаций
document.addEventListener('keydown', (e) => {
    if (locationModal?.style.display === 'block') {
        if (e.key === 'ArrowRight') changeLocationSlide(1);
        if (e.key === 'ArrowLeft') changeLocationSlide(-1);
        if (e.key === 'Escape') closeLocationSlider();
    }
});

// =============================================
// ВИДЕО ПРОБЫ АКТЁРОВ
// =============================================

// Конфигурация видео проб
// Замените URL на реальные ссылки YouTube/Vimeo
const auditionVideos = {
    sasha: {
        title: 'Пробы — Саша',
        url: 'https://www.youtube.com/embed/p3cS013JZx4'
    },
    yura: {
        title: 'Пробы — Юра',
        url: 'https://www.youtube.com/embed/D0eImnBBhus'
    },
    kristina: {
        title: 'Пробы — Кристина',
        url: 'https://www.youtube.com/embed/CvRdrte73wU'
    }
};

const auditionModal = document.getElementById('auditionModal');
const auditionVideo = document.getElementById('auditionVideo');
const auditionTitle = document.getElementById('auditionTitle');

function openAuditionVideo(actor) {
    if (!auditionVideos[actor]) return;

    auditionTitle.textContent = auditionVideos[actor].title;
    auditionVideo.src = auditionVideos[actor].url + '?autoplay=1';
    auditionModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeAuditionVideo() {
    auditionModal.style.display = 'none';
    auditionVideo.src = ''; // Останавливаем видео
    document.body.style.overflow = 'auto';
}

// Закрытие по клику вне видео
auditionModal?.addEventListener('click', (e) => {
    if (e.target === auditionModal) {
        closeAuditionVideo();
    }
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (auditionModal?.style.display === 'block' && e.key === 'Escape') {
        closeAuditionVideo();
    }
});

// =============================================
// СЛАЙДЕР МУЗЫКИ
// =============================================

const musicTracks = [
    'vQZor0RYDGw',
    'E1NXesFLSTE',
    '1ap3p1lBsVM',
    'QmkwdaHrsg8',
    'YtNXJqaRyLA',
    'a2MesmRollI',
    'HJqU2O1szSU',
    'Y47jfot7WBg'
];

let currentMusicIndex = 0;
const musicCover = document.getElementById('musicCover');
const currentMusicEl = document.getElementById('currentMusic');
const totalMusicEl = document.getElementById('totalMusic');
const musicModal = document.getElementById('musicModal');
const musicVideo = document.getElementById('musicVideo');

if (totalMusicEl) {
    totalMusicEl.textContent = musicTracks.length;
}

function updateMusicSlide() {
    const videoId = musicTracks[currentMusicIndex];
    musicCover.src = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    currentMusicEl.textContent = currentMusicIndex + 1;
}

function changeMusicSlide(direction) {
    currentMusicIndex += direction;
    if (currentMusicIndex >= musicTracks.length) currentMusicIndex = 0;
    if (currentMusicIndex < 0) currentMusicIndex = musicTracks.length - 1;
    updateMusicSlide();
}

function openMusicVideo() {
    const videoId = musicTracks[currentMusicIndex];
    musicVideo.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    musicModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeMusicVideo() {
    musicModal.style.display = 'none';
    musicVideo.src = '';
    document.body.style.overflow = 'auto';
}

// Закрытие по клику вне видео
musicModal?.addEventListener('click', (e) => {
    if (e.target === musicModal) {
        closeMusicVideo();
    }
});

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (musicModal?.style.display === 'block' && e.key === 'Escape') {
        closeMusicVideo();
    }
});

console.log('Сайт "Не придешь" загружен успешно!');
