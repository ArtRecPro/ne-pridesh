# Техническая документация

HTML/CSS/JS паттерны и компоненты питч-сайта.

---

## Структура проекта

```
project/
├── index.html          # Главная страница
├── styles.css          # Все стили
├── script.js           # JavaScript
├── images/             # Изображения
│   ├── hero-bg.jpg     # Фон Hero
│   ├── [секция]/       # Папки по секциям
│   └── storyboard/     # Раскадровка
├── materials/          # PDF файлы
│   ├── screenplay.pdf
│   └── synopsis.pdf
└── docs/               # Документация
```

---

## HTML-структура

### Базовый шаблон страницы

```html
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Название проекта</title>

    <!-- Шрифты -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">

    <!-- Стили (с версией для сброса кеша) -->
    <link rel="stylesheet" href="styles.css?v=1">
</head>
<body>
    <!-- Навигация -->
    <nav class="navbar">...</nav>

    <!-- Hero -->
    <section id="hero" class="hero">...</section>

    <!-- Секции -->
    <section id="story" class="section story">...</section>
    <section id="characters" class="section characters">...</section>
    <!-- ... -->

    <!-- Футер -->
    <footer class="footer">...</footer>

    <!-- Модальные окна -->
    <div id="imageModal" class="modal">...</div>

    <!-- Скрипты (с версией) -->
    <script src="script.js?v=1"></script>
</body>
</html>
```

### Навигация

```html
<nav class="navbar">
    <div class="nav-container">
        <div class="logo">НАЗВАНИЕ</div>
        <ul class="nav-menu">
            <li><a href="#hero">Главная</a></li>
            <li><a href="#story">История</a></li>
            <li><a href="#characters">Герои</a></li>
            <li><a href="#visual">Визуальный язык</a></li>
            <li><a href="#rhythm">Ритм и эмоция</a></li>
            <li><a href="#vision">Режиссёр</a></li>
            <li><a href="#production">Производство</a></li>
            <li><a href="#contacts">Контакты</a></li>
        </ul>
        <div class="hamburger">
            <span></span>
            <span></span>
            <span></span>
        </div>
    </div>
</nav>
```

### Hero секция

```html
<section id="hero" class="hero">
    <div class="hero-overlay"></div>
    <div class="hero-content">
        <h1 class="hero-title">НАЗВАНИЕ<br>ПРОЕКТА</h1>
        <p class="hero-tagline">Слоган проекта</p>
        <p class="hero-format">Жанр / Количество серий × Хронометраж</p>
    </div>
</section>
```

### Секция с контентом

```html
<section id="story" class="section story">
    <div class="container">
        <h2 class="section-title">История</h2>
        <p class="section-subtitle">Подзаголовок</p>

        <div class="story-content">
            <!-- Контент секции -->
        </div>
    </div>
</section>
```

### Карточка персонажа

```html
<div class="character-card">
    <div class="character-image">
        <img src="images/character.jpg" alt="Имя">
    </div>
    <div class="character-info">
        <h3>ИМЯ, ВОЗРАСТ</h3>
        <p class="actor-name">в исполнении Актёра</p>
        <p class="character-type">Профессия/типаж</p>
        <p class="character-description">Описание персонажа...</p>
        <p class="character-arc"><strong>Арка:</strong> Путь героя</p>
    </div>
</div>
```

### Карточка локации (кликабельная)

```html
<div class="location-card" onclick="openLocationSlider('location_key')">
    <div class="location-image">
        <img src="images/location/1.jpg" alt="Локация">
    </div>
    <div class="location-info">
        <h4>Название локации</h4>
        <p>Описание локации...</p>
        <span class="slides-count">X фото</span>
    </div>
</div>
```

### Модальное окно для изображений

```html
<div id="imageModal" class="modal">
    <span class="modal-close">&times;</span>
    <img class="modal-content" id="modalImage">
    <div id="modalCaption"></div>
</div>
```

### Модальное окно со слайдером

```html
<div id="storyboardModal" class="storyboard-modal">
    <div class="storyboard-modal-content">
        <span class="storyboard-close" onclick="closeStoryboard()">&times;</span>
        <div class="storyboard-slider">
            <button class="slider-arrow slider-prev" onclick="changeSlide(-1)">&#10094;</button>
            <div class="slider-container">
                <img id="storyboardImage" src="" alt="Слайд">
            </div>
            <button class="slider-arrow slider-next" onclick="changeSlide(1)">&#10095;</button>
        </div>
        <div class="slider-counter">
            <span id="currentSlide">1</span> / <span id="totalSlides">18</span>
        </div>
    </div>
</div>
```

### Модальное окно для видео

```html
<div id="videoModal" class="audition-modal">
    <div class="audition-modal-content">
        <span class="audition-close" onclick="closeVideo()">&times;</span>
        <h3 id="videoTitle" class="audition-title">Заголовок</h3>
        <div class="audition-video-container">
            <iframe id="videoFrame" src="" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        </div>
    </div>
</div>
```

---

## CSS-паттерны

### Сетки

```css
/* Автоадаптивная сетка */
.grid-auto {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
}

/* Фиксированные колонки */
.grid-3 {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
}

@media (max-width: 768px) {
    .grid-3 {
        grid-template-columns: 1fr;
    }
}
```

### Карточки

```css
/* Базовая карточка */
.card {
    background: var(--bg-light);
    border: 1px solid rgba(212, 175, 55, 0.1);
    padding: 30px;
    transition: all 0.3s;
}

.card:hover {
    border-color: var(--primary-color);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);
    transform: translateY(-5px);
}

/* Карточка с фоновым изображением */
.card-with-bg {
    background: linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.75)), url('image.jpg');
    background-size: cover;
    background-position: center;
}
```

### Секции с фоном

```css
.section-with-bg {
    background: linear-gradient(rgba(10, 10, 10, 0.65), rgba(10, 10, 10, 0.65)), url('images/bg.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
}
```

### Видео-контейнер (16:9)

```css
.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    overflow: hidden;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

---

## JavaScript-компоненты

### Мобильное меню

```javascript
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Закрытие при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});
```

### Плавная прокрутка

```javascript
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
```

### Активное состояние навигации

```javascript
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
});
```

### Слайдер изображений

```javascript
// Конфигурация
const sliders = {
    location_key: {
        title: 'Название',
        images: [
            'images/folder/1.jpg',
            'images/folder/2.jpg',
            // ...
        ]
    }
};

let currentIndex = 1;
let currentKey = null;

function openSlider(key) {
    if (!sliders[key]) return;
    currentKey = key;
    currentIndex = 1;

    document.getElementById('sliderTitle').textContent = sliders[key].title;
    document.getElementById('totalSlides').textContent = sliders[key].images.length;
    updateSlide();

    document.getElementById('sliderModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeSlider() {
    document.getElementById('sliderModal').style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeSlide(direction) {
    if (!currentKey) return;
    const total = sliders[currentKey].images.length;
    currentIndex += direction;
    if (currentIndex > total) currentIndex = 1;
    if (currentIndex < 1) currentIndex = total;
    updateSlide();
}

function updateSlide() {
    if (!currentKey) return;
    document.getElementById('sliderImage').src = sliders[currentKey].images[currentIndex - 1];
    document.getElementById('currentSlide').textContent = currentIndex;
}

// Навигация клавишами
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('sliderModal');
    if (modal?.style.display === 'block') {
        if (e.key === 'ArrowRight') changeSlide(1);
        if (e.key === 'ArrowLeft') changeSlide(-1);
        if (e.key === 'Escape') closeSlider();
    }
});

// Закрытие по клику вне
document.getElementById('sliderModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'sliderModal') closeSlider();
});
```

### Модальное окно для видео (YouTube)

```javascript
const videos = {
    video_key: {
        title: 'Название видео',
        url: 'https://www.youtube.com/embed/VIDEO_ID'
    }
};

function openVideo(key) {
    if (!videos[key]) return;

    document.getElementById('videoTitle').textContent = videos[key].title;
    document.getElementById('videoFrame').src = videos[key].url + '?autoplay=1';
    document.getElementById('videoModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeVideo() {
    document.getElementById('videoModal').style.display = 'none';
    document.getElementById('videoFrame').src = ''; // Останавливаем видео
    document.body.style.overflow = 'auto';
}
```

### Анимация при скролле

```javascript
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

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
```

### Ленивая загрузка изображений

```javascript
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
```

---

## Версионирование файлов

Для сброса кеша браузера используй параметр версии:

```html
<link rel="stylesheet" href="styles.css?v=62">
<script src="script.js?v=19"></script>
```

Увеличивай номер версии при каждом изменении файла.

---

## Оптимизация изображений

### Рекомендуемые размеры:
- Hero фон: 1920×1080px
- Фото персонажей: 600×800px (портрет)
- Карточки локаций: 800×600px
- Постеры референсов: 400×600px
- Превью: 300×200px

### Форматы:
- JPG — фотографии
- PNG — изображения с прозрачностью
- WEBP — для современных браузеров (опционально)

### Сжатие:
- Качество JPG: 80-85%
- Использовать TinyPNG/TinyJPG для оптимизации

---

## Адаптивность (ВАЖНО!)

### Breakpoints

| Устройство | Ширина | Описание |
|------------|--------|----------|
| Десктоп | >1024px | Базовые стили, параллакс-фоны |
| Планшет (ландшафт) | ≤1024px | Фоны scroll, сетки 2 колонки |
| Планшет (портрет) | ≤768px | Гамбургер-меню, сетки 1 колонка |
| Телефон | ≤480px | Компактные элементы, меньше шрифты |
| Маленький телефон | ≤360px | Минимальные размеры |

### Обязательные медиа-запросы

```css
/* Планшет */
@media (max-width: 1024px) {
    /* Отключить fixed фоны (не работают на iOS!) */
    .hero, .story, .visual, .characters, .rhythm, .vision, .production, .contacts {
        background-attachment: scroll !important;
        background-size: cover;
        background-position: center center;
    }
}

/* Планшет портрет / большие телефоны */
@media (max-width: 768px) {
    /* Мобильное меню */
    .nav-menu {
        position: fixed;
        left: -100%;
        top: 70px;
        flex-direction: column;
        background-color: rgba(10, 10, 10, 0.98);
        width: 100%;
        text-align: center;
        transition: 0.3s;
    }

    .nav-menu.active { left: 0; }
    .hamburger { display: flex; }

    /* Все сетки в 1 колонку */
    .characters-grid,
    .locations-grid,
    .emotion-grid,
    .production-grid,
    .visual-accents,
    .camera-grid,
    .color-scheme {
        grid-template-columns: 1fr;
    }

    /* Постеры 2x2 */
    .posters-grid.posters-4 {
        grid-template-columns: repeat(2, 1fr);
    }

    /* Постеры в 1 колонку */
    .posters-grid.posters-2,
    .posters-grid.posters-1 {
        grid-template-columns: 1fr;
    }

    /* Адаптивные размеры постеров */
    .poster-image {
        width: 100%;
        height: auto;
        aspect-ratio: 7/10;
    }

    /* Уменьшить заголовки */
    .hero-title {
        font-size: 60px;
        letter-spacing: 10px;
    }

    .section-title { font-size: 36px; }
    .subsection-title { font-size: 24px; }
}

/* Телефоны */
@media (max-width: 480px) {
    /* Заголовок Hero - НЕ ДОЛЖЕН ОБРЕЗАТЬСЯ! */
    .hero-title {
        font-size: 32px;
        letter-spacing: 2px;
        padding: 0 10px;
        word-wrap: break-word;
    }

    /* Постеры в 1 колонку */
    .posters-grid.posters-4 {
        grid-template-columns: 1fr;
    }

    /* Уменьшить отступы */
    .section { padding: 60px 0; }
    .container { padding: 0 15px; }
}

/* Очень маленькие телефоны */
@media (max-width: 360px) {
    .hero-title {
        font-size: 26px;
        letter-spacing: 1px;
    }
}
```

### Критические правила адаптивности

1. **background-attachment: fixed НЕ РАБОТАЕТ на iOS!**
   - Обязательно отключать для всех устройств ≤1024px
   - Использовать `background-attachment: scroll !important`

2. **Заголовок Hero не должен обрезаться**
   - Уменьшать font-size и letter-spacing для маленьких экранов
   - Добавлять padding по краям
   - Тестировать на реальном телефоне

3. **Все сетки должны быть в 1 колонку на телефонах**
   - `grid-template-columns: 1fr`

4. **Гамбургер-меню обязательно**
   - Скрывать nav-menu по умолчанию на ≤768px
   - Показывать hamburger

5. **Слайдеры должны работать**
   - Уменьшать размер стрелок
   - Уменьшать max-height изображений

### Тестирование

Проверять на:
- iPhone SE (375px) — маленький телефон
- iPhone 14 (390px) — средний телефон
- iPad (768px) — планшет портрет
- iPad ландшафт (1024px) — планшет ландшафт
- MacBook (1440px) — ноутбук
- iMac (1920px+) — десктоп

---

## Хостинг на GitHub Pages

### Настройка:
1. Создать репозиторий на GitHub
2. Settings → Pages → Source: Deploy from branch (main)
3. Дождаться деплоя

### Структура для GitHub Pages:
```
repository/
├── index.html      # Обязательно в корне
├── styles.css
├── script.js
├── images/
└── materials/
```

### URL:
```
https://username.github.io/repository-name/
```
