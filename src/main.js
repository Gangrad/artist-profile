import './style.css';
import galleryData from './gallery.json';
import booksData from './books.json';

const app = document.querySelector('#app');

// Функция для инициализации галереи
function initGallery() {
  const galleryContainer = document.querySelector('.gallery-grid');
  
  // Очищаем и рендерим карточки из JSON
  galleryContainer.innerHTML = galleryData.map(item => `
    <div class="gallery-item ${item.aspect}" data-category="${item.category}" data-id="${item.id}">
      <img src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="item-overlay">
        <span>${item.title}</span>
      </div>
    </div>
  `).join('');

  // Навешиваем клик для открытия панели
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-id');
      const data = galleryData.find(d => d.id === id);
      showDetails(data);
    });
  });

  document.querySelector('.side-panel').addEventListener('click', (e) => {
    if (e.target.classList.contains('side-panel')) {
      closePanel();
    }
  });
}

// Функция показа деталей
function showDetails(data) {
const panel = document.querySelector('.side-panel');
  const content = document.querySelector('.panel-content');

  // 1. Сбрасываем скролл в самый верх у обоих контейнеров
  panel.scrollTop = 0;
  if (content) content.scrollTop = 0;

  // 2. Наполняем контентом
  content.innerHTML = `
    <img src="${data.image}" alt="${data.title}">
    <div class="panel-text-content">
      <p class="category-label" data-type="${data.category}">${data.category}</p>
      <h2 class="book-title">${data.title}</h2>
      <p>${data.description}</p>
    </div>
    <button class="close-btn">&times;</button>
  `;
  
  // 3. Показываем панель и блокируем скролл сайта
  panel.classList.add('active');
  document.body.style.overflow = 'hidden';

  // 4. Важно: так как мы перезаписали innerHTML, нужно заново найти кнопку закрытия
  content.querySelector('.close-btn').addEventListener('click', closePanel);
}

function closePanel() {
  const sidePanel = document.querySelector('.side-panel');
  sidePanel.classList.remove('active');
  
  // Возвращаем скролл основной странице
  document.body.style.overflow = '';
}

// Запускаем при загрузке
document.addEventListener('DOMContentLoaded', initGallery);

// Обработка фильтров
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Меняем активную кнопку
    document.querySelector('.filter-btn.active').classList.remove('active');
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');
    const items = document.querySelectorAll('.gallery-item');

    items.forEach(item => {
      const category = item.getAttribute('data-category');
      if (filter === 'all' || category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

function initNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const targetSection = link.getAttribute('data-section');

      // 1. Меняем активный класс у ссылок
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      // 2. Показываем нужную секцию, скрываем остальные
      sections.forEach(section => {
        if (section.id === targetSection) {
          section.classList.remove('hidden');
        } else {
          section.classList.add('hidden');
        }
      });

      // 3. Закрываем боковую панель галереи при переключении
      document.querySelector('.side-panel').classList.remove('active');
    });
  });
}

function initBooks() {
  const container = document.querySelector('#books-list');
  
  container.innerHTML = booksData.map(book => `
    <div class="book-item-wrapper">
      <div class="book-card">
        <div class="book-cover">
          <img src="${book.image}" alt="${book.title}">
        </div>
        <div class="book-info">
          <h3 class="book-title">${book.title}</h3>
          <p class="book-description">${book.description}</p>
        </div>
      </div>
    </div>
  `).join('');
}

// Вставьте вызов initBooks() в обработчик DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initBooks(); // Добавили инициализацию книг
  initNavigation();
});

// Глобальный слушатель нажатия клавиш
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    const sidePanel = document.querySelector('.side-panel');
    if (sidePanel.classList.contains('active')) {
      closePanel(); // Вызываем вашу функцию закрытия
    }
  }
});