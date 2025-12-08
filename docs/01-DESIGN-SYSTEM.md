# Дизайн-система питч-сайта

Кинематографичный тёмный стиль с золотыми акцентами. Премиальный, но не кричащий.

---

## Цветовая палитра

### CSS-переменные

```css
:root {
    --primary-color: #d4af37;      /* Золотой — акценты, заголовки, кнопки */
    --secondary-color: #1a1a1a;    /* Тёмный фон секций */
    --text-color: #ffffff;         /* Основной текст */
    --text-secondary: #cccccc;     /* Вторичный текст */
    --bg-dark: #0a0a0a;           /* Самый тёмный фон */
    --bg-medium: #1a1a1a;         /* Фон секций */
    --bg-light: #2a2a2a;          /* Карточки, блоки */
    --accent-color: #c9a959;       /* Мягкий золотой для подзаголовков */
}
```

### Применение цветов

| Элемент | Цвет | Переменная |
|---------|------|------------|
| Заголовки секций | Золотой | `--primary-color` |
| Основной текст | Белый | `--text-color` |
| Описания, подписи | Серый | `--text-secondary` |
| Фон страницы | Почти чёрный | `--bg-dark` |
| Фон секций | Тёмно-серый | `--bg-medium` |
| Карточки | Серый | `--bg-light` |
| Бордеры | Золотой с прозрачностью | `rgba(212, 175, 55, 0.1-0.3)` |

---

## Типографика

### Шрифты

```css
/* Заголовок Hero */
font-family: 'Bebas Neue', sans-serif;

/* Всё остальное */
font-family: 'Helvetica Neue', Arial, sans-serif;
```

### Подключение шрифтов

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap" rel="stylesheet">
```

### Размеры и стили

| Элемент | Desktop | Mobile | Стиль |
|---------|---------|--------|-------|
| Hero заголовок | 96px | 40-60px | Bebas Neue, letter-spacing: 20px |
| Заголовок секции | 48px | 36px | uppercase, letter-spacing: 5px |
| Подзаголовок | 32px | 24px | letter-spacing: 3px |
| Основной текст | 18px | 16px | line-height: 1.8 |
| Подписи | 14px | 14px | uppercase, letter-spacing: 1px |

### Паттерны текста

```css
/* Заголовок секции */
.section-title {
    font-size: 48px;
    text-align: center;
    margin-bottom: 60px;
    color: var(--primary-color);
    letter-spacing: 5px;
    text-transform: uppercase;
}

/* Подзаголовок секции */
.section-subtitle {
    text-align: center;
    font-size: 18px;
    color: var(--text-secondary);
    margin-top: -40px;
    margin-bottom: 60px;
    letter-spacing: 2px;
}

/* Заголовок с декоративными линиями */
.title-decorated {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.title-decorated::before,
.title-decorated::after {
    content: '';
    height: 1px;
    width: 80px;
    background: linear-gradient(90deg, transparent, var(--primary-color));
}

.title-decorated::after {
    background: linear-gradient(90deg, var(--primary-color), transparent);
}
```

---

## Компоненты

### Кнопки

```css
/* Основная кнопка (CTA) */
.cta-button {
    padding: 15px 40px;
    font-size: 16px;
    background: transparent;
    color: var(--primary-color);
    border: 2px solid var(--primary-color);
    cursor: pointer;
    letter-spacing: 2px;
    text-transform: uppercase;
    transition: all 0.3s;
}

.cta-button:hover {
    background: var(--primary-color);
    color: var(--bg-dark);
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
}

/* Вторичная кнопка */
.download-btn {
    padding: 12px 30px;
    background: transparent;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    text-decoration: none;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 14px;
    transition: all 0.3s;
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

/* Карточка с изображением */
.card-image {
    background: rgba(42, 42, 42, 0.5);
    overflow: hidden;
}

/* Карточка с фоновым изображением */
.card-bg {
    background: linear-gradient(rgba(10, 10, 10, 0.75), rgba(10, 10, 10, 0.75)), url('image.jpg');
    background-size: cover;
    background-position: center;
}
```

### Секции с фоном

```css
/* Секция с фоновым изображением */
.section-with-bg {
    background: linear-gradient(rgba(10, 10, 10, 0.65), rgba(10, 10, 10, 0.65)), url('images/bg.jpg');
    background-size: cover;
    background-position: center;
    background-attachment: fixed; /* Параллакс на десктопе */
}
```

### Блок с акцентной линией слева

```css
.accent-block {
    padding: 30px;
    background: var(--bg-light);
    border-left: 3px solid var(--primary-color);
}
```

---

## Анимации

### Базовые переходы

```css
/* Стандартный transition */
transition: all 0.3s;
transition: all 0.3s ease;

/* Для появления элементов */
transition: opacity 0.6s ease-out, transform 0.6s ease-out;
```

### Keyframe анимации

```css
/* Плавное появление */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Появление снизу */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### Intersection Observer для анимации при скролле

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

// Применение
document.querySelectorAll('.animate-on-scroll').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});
```

---

## Эффекты

### Тени

```css
/* Тень при наведении на карточку */
box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);

/* Тень для Hero заголовка */
text-shadow: 0 0 30px rgba(212, 175, 55, 0.5);

/* Тень для кнопки */
box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3);
```

### Размытие (Blur)

```css
/* Навбар */
backdrop-filter: blur(10px);
background: rgba(10, 10, 10, 0.95);
```

### Параллакс

```javascript
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.backgroundPositionY = parallax + 'px';
    }
});
```

---

## Адаптивность

### Брейкпоинты

```css
/* Планшет */
@media (max-width: 768px) { }

/* Телефон */
@media (max-width: 480px) { }
```

### Сетки

```css
/* Автоадаптивная сетка */
display: grid;
grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
gap: 30px;

/* 3 колонки -> 1 колонка на мобильном */
@media (max-width: 768px) {
    grid-template-columns: 1fr;
}
```

---

## Иконки

Используются Unicode-символы вместо иконочных шрифтов:

```
🎹 — музыка/пианино
🎤 — хип-хоп
⚡ — электроника/энергия
⏱ — время/хронометраж
🎬 — кинематограф
✓ — галочка
◀ ▶ — стрелки навигации
× — закрытие
```

---

## Модальные окна

```css
.modal {
    display: none;
    position: fixed;
    z-index: 2000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.95);
    animation: fadeIn 0.3s;
}

.modal-close {
    position: absolute;
    top: 30px;
    right: 50px;
    color: var(--primary-color);
    font-size: 50px;
    cursor: pointer;
}
```
