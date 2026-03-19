import './style.css';
import galleryData from './gallery.json';

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
}

// Функция показа деталей
function showDetails(data) {
  const panel = document.querySelector('.side-panel');
  const content = document.querySelector('.panel-content');
  
  content.innerHTML = `
    <img src="${data.image}" alt="${data.title}">
    <h2>${data.title}</h2>
    <p class="category-label">${data.category}</p>
    <p>${data.description}</p>
  `;
  
  panel.classList.add('active');
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

// Закрытие панели
document.querySelector('.close-btn').addEventListener('click', () => {
  document.querySelector('.side-panel').classList.remove('active');
});